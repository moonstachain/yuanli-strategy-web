import { headers } from "next/headers";
import { env } from "cloudflare:workers";
import { handleInbox, type Inquiry } from "@/lib/contact-service";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { InboxList } from "@/components/inbox-list";

export const dynamic = "force-dynamic";
export const metadata = { title: "问题接收记录", robots: { index: false, follow: false } };

export default async function InboxPage() {
  await requireChatGPTUser("/inbox");
  const response = await handleInbox(new Request("https://inbox.internal/api/inquiries", { headers: new Headers(await headers()) }), { db: env.DB, ownerEmail: env.INBOX_OWNER_EMAIL });
  const data = await response.json() as { error?: string; inquiries: Inquiry[] };
  if (!response.ok) return <main className="light-page"><section className="container page-intro"><p className="eyebrow">PRIVATE / 接收记录</p><h1>暂时无法查看</h1><p>{data.error}</p></section></main>;
  return <main className="light-page"><section className="container page-intro"><p className="eyebrow">PRIVATE / 负责人接收记录</p><h1>每一个问题，<br />都有一个下一步。</h1><p className="intro-copy">最近 100 条接收记录，仅网站负责人可见。记录处理状态、下一动作与复看日期；此处不会自动发送消息、提醒或确认合作。</p><a className="text-link" href="/inbox">刷新接收记录 ↻</a></section><InboxList initialInquiries={data.inquiries} /></main>;
}
