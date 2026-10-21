import Link from "next/link";
import { ProblemCardEditor } from "@/components/problem-card";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("写下自己的第一张问题卡", "从一个真实决定开始，区分事实与解释，写下一项可验证的行动。草稿只保存在你的浏览器，可下载带走。", "/practice");

export default function PracticePage() {
  return <main className="light-page practice-page">
    <header className="container page-intro practice-intro">
      <Link href="/work" className="practice-breadcrumb">跟着明哥学商业 / 第一项练习</Link>
      <h1>把眼前的事，<br />写成一个能推进的问题。</h1>
      <p className="intro-copy">先花几分钟，写下自己的第一版。不急着找到答案，先分清已经知道什么、还缺什么，以及下一步可以验证什么。</p>
      <p className="practice-privacy">无需留联系方式。草稿只在你选择保存后写入当前浏览器；不会提交给 RAY。请避免填写客户姓名、账户和未经授权的资料。</p>
    </header>
    <div className="container"><ProblemCardEditor /></div>
  </main>;
}
