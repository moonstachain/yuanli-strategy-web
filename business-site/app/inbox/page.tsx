import { headers } from "next/headers";
import { env } from "cloudflare:workers";
import { handleInbox } from "@/lib/contact-service";
import { requireChatGPTUser } from "@/app/chatgpt-auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "问题接收记录", robots: { index: false, follow: false } };

type Inquiry = { id: string; name: string; business: string; question: string; contactType: string; contactValue: string; createdAt: string; status: string };

export default async function InboxPage() {
  await requireChatGPTUser("/inbox");
  const response = await handleInbox(new Request("https://inbox.internal/api/inquiries", { headers: new Headers(await headers()) }), { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
  const data = await response.json() as { error?: string; inquiries: Inquiry[] };
  if (!response.ok) return <main className="light-page"><section className="container page-intro"><p className="eyebrow">PRIVATE / 接收记录</p><h1>暂时无法查看</h1><p>{data.error}</p></section></main>;
  return <main className="light-page"><section className="container page-intro"><p className="eyebrow">PRIVATE / 接收记录</p><h1>每一个问题，<br />都有一个起点。</h1><p className="intro-copy">最近 100 条接收记录，仅网站负责人可见。此处查看资料不会自动发送消息或确认合作。</p><a className="text-link" href="/inbox">刷新接收记录 ↻</a></section><section className="container inbox-list">{data.inquiries.length === 0 ? <div className="receipt-panel"><h2>还没有收到问题。</h2><p>可以先用明确标注的测试内容走一次联系流程。</p><a className="button" href="/contact">打开问题表单 ↗</a></div> : data.inquiries.map((row: Inquiry) => <article className="inbox-item" key={row.id}><div className="inbox-meta"><span>{row.status === "new" ? "新请求" : row.status}</span><time dateTime={row.createdAt}>{new Date(row.createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}</time></div><h2>{row.name}</h2><p>{row.business}</p><p className="inbox-question">{row.question}</p><dl><div><dt>{({ email: "邮箱", wechat: "微信", phone: "电话" } as Record<string, string>)[row.contactType]}</dt><dd>{row.contactValue}</dd></div><div><dt>回执</dt><dd>{row.id}</dd></div></dl></article>)}</section></main>;
}
