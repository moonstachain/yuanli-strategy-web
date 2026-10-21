type Statement = { bind(...values: (string | number | null)[]): Statement; first<T = Record<string, unknown>>(): Promise<T | null>; all<T = Record<string, unknown>>(): Promise<{ results: T[] }>; run(): Promise<unknown> };
type Database = { prepare(query: string): Statement };
export type ContactEnvironment = { db?: Database; ownerEmail?: string };
function json(value: unknown, status = 200) {
  return Response.json(value, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
function authorized(request: Request, environment: ContactEnvironment) {
  const email = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return Boolean(request.headers.get("oai-authenticated-user-id") && environment.ownerEmail && email === environment.ownerEmail.trim().toLowerCase());
}
export async function handleInbox(request: Request, environment: ContactEnvironment) {
  if (!request.headers.get("oai-authenticated-user-id")) return json({ error: "请先登录后查看。" }, 401);
  if (!authorized(request, environment)) return json({ error: "此入口仅向网站负责人开放。" }, 403);
  if (!environment.db) return json({ error: "接收服务暂时不可用，请稍后重试。" }, 503);
  try {
    const rows = await environment.db.prepare("SELECT id,name,business,question,contact_type AS contactType,contact_value AS contactValue,created_at AS createdAt,status FROM inquiries ORDER BY created_at DESC,id DESC LIMIT 100").all();
    return json({ inquiries: rows.results });
  } catch { return json({ error: "暂时无法读取请求，请稍后重试。" }, 503); }
}
export async function handleContact(request: Request, environment: ContactEnvironment) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return json({ error: "请在本站表单中提交。" }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "不支持的提交格式。" }, 415);
  let raw: unknown;
  try { const text = await request.text(); if (text.length > 16000) return json({ error: "内容过长，请精简后重试。" }, 413); raw = JSON.parse(text); }
  catch { return json({ error: "内容格式不完整，请重新提交。" }, 400); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return json({ error: "请完整填写必要信息。" }, 400);
  const input = raw as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const key of ["name", "business", "question", "contactType", "contactValue", "requestKey"]) fields[key] = typeof input[key] === "string" ? input[key].trim() : "";
  const { name, business, question, contactType, contactValue, requestKey } = fields;
  if (!name || name.length > 80 || !business || business.length > 240 || !question || question.length > 2000 || !contactValue || contactValue.length > 120 || !["email", "wechat", "phone"].includes(contactType) || input.consent !== true || (typeof input.website === "string" && input.website.length > 0) || !/^[a-f0-9-]{36}$/i.test(requestKey)) return json({ error: "请检查称呼、业务介绍、问题与联系方式，并同意信息用途说明。" }, 400);
  if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) return json({ error: "请填写有效的电子邮箱。" }, 400);
  if (contactType === "phone" && (!/^[+()\d\s-]{7,25}$/.test(contactValue) || contactValue.replace(/\D/g, "").length < 7)) return json({ error: "请填写有效的电话号码。" }, 400);
  if (!environment.db) return json({ error: "接收服务暂时不可用。你的问题尚未保存，请稍后重试。" }, 503);
  const normalized = JSON.stringify({ name, business, question, contactType, contactValue });
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized)))).map(x => x.toString(16).padStart(2, "0")).join("");
  const existing = async () => environment.db!.prepare("SELECT id,payload_hash FROM inquiries WHERE request_key = ?").bind(requestKey).first<{ id: string; payload_hash: string }>();
  const receipt = (row: { id: string; payload_hash: string }) => row.payload_hash === hash ? json({ reference: row.id, saved: true, duplicate: true }) : json({ error: "这次提交的内容已变化，请刷新页面后重新填写。" }, 409);
  try {
    const prior = await existing();
    if (prior) return receipt(prior);
    const now = new Date();
    const since = new Date(now.getTime() - 3600000).toISOString();
    const reference = "YL-" + crypto.randomUUID();
    await environment.db.prepare("INSERT INTO inquiries (id,request_key,payload_hash,name,business,question,contact_type,contact_value,created_at,status,submitted_by) SELECT ?,?,?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM inquiries WHERE contact_value = ? AND created_at > ?) < 5").bind(reference, requestKey, hash, name, business, question, contactType, contactValue, now.toISOString(), "new", request.headers.get("oai-authenticated-user-id"), contactValue, since).run();
    const persisted = await existing();
    if (!persisted) return json({ error: "这段时间的提交较多，请一小时后再试。" }, 429);
    if (persisted.id !== reference) return receipt(persisted);
    return json({ reference, saved: true }, 201);
  } catch {
    try { const prior = await existing(); if (prior) return receipt(prior); } catch { /* Keep persistence failures opaque to visitors. */ }
    return json({ error: "保存未成功。请保留页面内容并稍后重试；目前没有建立预约。" }, 503);
  }
}
