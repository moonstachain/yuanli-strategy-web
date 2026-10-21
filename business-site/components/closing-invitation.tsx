import Link from "next/link";
import { Arrow } from "./site-icons";

export function ClosingInvitation({ title = "带来一个，值得认真想清楚的问题。", description = "无需先写一份完整的商业计划。说说你的处境，以及你正准备做出的一个决定。", href = "/contact" }: { title?: string; description?: string; href?: string }) {
  return <section className="paper closing-section"><div className="container closing-grid"><div><span className="eyebrow">BEGIN WITH A QUESTION</span><h2>{title}</h2><p>{description}</p></div><Link href={href} className="button button-dark">带来一个问题 <Arrow /></Link></div></section>;
}
