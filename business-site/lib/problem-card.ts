export const PROBLEM_CARD_STORAGE_KEY = "yuanli.problem-card.v1";
export type ProblemTopic = "direction" | "value" | "continuity" | "assets";
export type ProblemCard = {
  question: string;
  facts: string;
  unknowns: string;
  explanation: string;
  nextEvidence: string;
  revisitDate: string;
};
export type ProblemCardDocument = { version: 1; savedAt: string; topic: ProblemTopic; card: ProblemCard };
export type CardStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export type RestoredProblemCard =
  | { status: "saved"; document: ProblemCardDocument }
  | { status: "empty" | "invalid" | "unsupported" | "unavailable" };

export const CARD_FIELD_LIMITS: Record<keyof ProblemCard, number> = {
  question: 500, facts: 2000, unknowns: 2000, explanation: 2000, nextEvidence: 2000, revisitDate: 10,
};

export const PROBLEM_TOPICS: Record<ProblemTopic, { title: string; prompt: string; readHref: string; readLabel: string }> = {
  direction: { title: "方向与增长", prompt: "有几个方向都值得做时，先写清这次必须决定什么。", readHref: "/work/growth-choices", readLabel: "回看增长取舍的完整示范" },
  value: { title: "客户与价值", prompt: "先记录客户如何选择，再解释他们为什么选择。", readHref: "/work/customer-choice", readLabel: "阅读客户选择的判断方法" },
  continuity: { title: "组织与接续", prompt: "从最近一件必须找你才能推进的事开始。", readHref: "/work/founder-judgment", readLabel: "阅读创始人判断如何被接续" },
  assets: { title: "独特价值", prompt: "选择一件你反复做成的事，分清你的贡献与当时的条件。", readHref: "/method#assets", readLabel: "回查原力资产的四个模块" },
};

export function problemTopic(value: string | null | undefined): ProblemTopic {
  return isTopic(value) ? value : "direction";
}

export function exportProblemCard(card: ProblemCard, topic: ProblemTopic, exportedAt: string): string {
  const sections: [keyof ProblemCard, string][] = [
    ["question", "01 · 我需要做的决定"], ["facts", "02 · 已经观察到的事实"],
    ["unknowns", "03 · 仍待确认的事"], ["explanation", "04 · 候选解释"],
    ["nextEvidence", "05 · 下一项证据与行动"], ["revisitDate", "回看日期"],
  ];
  const body = sections.map(([key, title]) => {
    const answer = card[key].trim() ? card[key].replace(/\r\n?/g, "\n") : "（尚未填写）";
    return `## ${title}\n\n${answer.split("\n").map(line => `    ${line}`).join("\n")}`;
  }).join("\n\n");
  return `# 我的原力问题卡\n\n方向：${PROBLEM_TOPICS[topic].title}\n导出时间：${exportedAt}\n\n${body}\n\n## 回看时检查\n\n- 哪些是可核实的事实，哪些仍是解释？\n- 新证据支持了什么，又推翻了什么？\n- 下一步继续、调整，还是停止？\n\n这是一份个人练习，不代表自动诊断或合作申请。\n`;
}

function isTopic(value: unknown): value is ProblemTopic {
  return value === "direction" || value === "value" || value === "continuity" || value === "assets";
}

function isCard(value: unknown): value is ProblemCard {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const fields = value as Record<string, unknown>;
  return Object.entries(CARD_FIELD_LIMITS).every(([key, limit]) => typeof fields[key] === "string" && fields[key].length <= limit) && validRevisitDate(fields.revisitDate as string);
}

function validRevisitDate(value: string): boolean {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function inspectProblemCard(card: ProblemCard) {
  const required = ["question", "facts", "unknowns", "explanation", "nextEvidence"] as const;
  const missing = required.filter(key => !card[key].trim());
  const dateValid = validRevisitDate(card.revisitDate);
  return { complete: missing.length === 0 && dateValid, filled: required.length - missing.length, missing, dateValid };
}

export function emptyProblemCard(): ProblemCard {
  return { question: "", facts: "", unknowns: "", explanation: "", nextEvidence: "", revisitDate: "" };
}

export function clearProblemCard(storage: CardStorage | null): boolean {
  try {
    if (!storage) return false;
    storage.removeItem(PROBLEM_CARD_STORAGE_KEY);
    return true;
  } catch { return false; }
}

export function saveProblemCard(storage: CardStorage | null, card: ProblemCard, topic: ProblemTopic, savedAt: string): boolean {
  try {
    if (!storage || !isCard(card) || !isTopic(topic) || !Number.isFinite(Date.parse(savedAt))) return false;
    storage.setItem(PROBLEM_CARD_STORAGE_KEY, JSON.stringify({ version: 1, savedAt, topic, card }));
    return true;
  } catch { return false; }
}

export function loadProblemCard(storage: CardStorage | null): RestoredProblemCard {
  let raw: string | null;
  try {
    if (!storage) return { status: "unavailable" };
    raw = storage.getItem(PROBLEM_CARD_STORAGE_KEY);
  } catch { return { status: "unavailable" }; }
  if (raw === null) return { status: "empty" };
  if (raw.length > 50000) return { status: "invalid" };
  try {
    const document: unknown = JSON.parse(raw);
    if (!document || typeof document !== "object" || Array.isArray(document)) return { status: "invalid" };
    const data = document as Record<string, unknown>;
    if (typeof data.version === "number" && data.version !== 1) return { status: "unsupported" };
    if (data.version !== 1 || typeof data.savedAt !== "string" || !Number.isFinite(Date.parse(data.savedAt)) || !isTopic(data.topic) || !isCard(data.card)) return { status: "invalid" };
    const card = Object.fromEntries(Object.keys(CARD_FIELD_LIMITS).map(key => [key, (data.card as ProblemCard)[key as keyof ProblemCard]])) as ProblemCard;
    return { status: "saved", document: { version: 1, savedAt: data.savedAt, topic: data.topic, card } };
  } catch { return { status: "invalid" }; }
}
