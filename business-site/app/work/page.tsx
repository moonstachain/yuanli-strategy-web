import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { ClosingInvitation } from "@/components/closing-invitation";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("跟着明哥学商业", "从一个经营问题读起：看增长取舍、客户选择与创始人接续，完成并带走自己的第一张问题卡。", "/work");

export default function WorkPage() {
  return <main className="light-page">
    <header className="container page-intro learning-intro"><span className="eyebrow">LEARN WITH MINGGE / 跟着明哥学商业</span><h1>从一个商业问题读起，<br />把理解变成下一步。</h1><p className="intro-copy">明哥（RAY）用原力战略，把复杂问题翻译成可以比较的选择。这里先学会一件事：分清事实、解释与未知，写下值得验证的下一步。</p><div className="button-row"><a href="#choose-a-reading" className="button button-dark">选一篇，与我有关的内容 <Arrow /></a><Link href="/practice" className="text-link">打开我的问题卡 <Arrow /></Link></div><p className="learning-intro-note">无需注册或留下联系方式。阅读与练习可独立完成，合作入口始终由你选择。</p></header>
    <div className="container">
      <section className="learning-sequence" aria-label="第一次学习的三个步骤">
        <div><span>01 / 读一次判断</span><h2>先看清，为什么这样选。</h2><p>从下面三种处境中选一篇。留意支持判断的证据，以及改变判断的条件。</p></div>
        <div><span>02 / 写自己的问题</span><h2>留下一张能继续用的卡。</h2><p>把事实、未知、候选解释和下一项证据写下来。示例留在文章里，你从空白开始。</p></div>
        <div><span>03 / 带走，再回来</span><h2>让下一次有据可接。</h2><p>在本浏览器保存草稿，或导出文本。取得新信息后回来修改，记录判断怎样变化。</p></div>
      </section>
      <section id="choose-a-reading" aria-labelledby="reading-heading">
        <div className="section-head"><div><span className="eyebrow">CHOOSE A QUESTION / 选择一个切口</span><h2 id="reading-heading" className="section-title">先读与你有关的那一篇。</h2></div><Link href="/start" className="text-link">还不确定？从问题导航开始 <Arrow /></Link></div>
        <article className="featured-work">
          <div className="work-feature-copy"><span className="tag">完整方法演示 · 非真实客户成果</span><h2>增长为什么停了？<br />先找到真正的约束。</h2><p>扩大触达、聚焦品类、改善交付：三条看起来都正确的路径，如何做出有依据的选择？</p><p><strong>读完要做：</strong>写出自己的两种候选解释，找出最值得先补的一项证据。</p><Link href="/work/growth-choices" className="text-link">阅读完整拆解 <Arrow /></Link></div>
          <div className="work-feature-visual" aria-hidden="true"><div className="work-route"><div className="work-route-head">ONE QUESTION / THREE PATHS</div><div className="work-route-row"><span>A</span>扩大有效触达<span>机会</span></div><div className="work-route-row"><span>B</span>聚焦客户与品类<span>选择</span></div><div className="work-route-row"><span>C</span>改善交付承接<span>容量</span></div><p className="work-route-foot">先辨认约束，再安排资源。</p></div></div>
        </article>
        <div className="short-readings">
          <article className="short-reading" id="customer-choice"><span className="tiny-label">02 / 方法短文 · 客户选择</span><h2>客户说不错，<br />为什么仍没有选择你？</h2><p>从一句“很专业”继续追问：客户究竟要完成什么、在比较什么，以及合作范围是否清楚。</p><p className="learning-task"><strong>读完要做：</strong>回到一次真实沟通，把客户的原话与自己的解释分开。</p><Link href="/work/customer-choice" className="text-link">阅读客户选择短文 <Arrow /></Link></article>
          <article className="short-reading" id="founder-judgment"><span className="tiny-label">03 / 方法短文 · 创始人接续</span><h2>哪些判断必须保留，<br />哪些工作可以交出去？</h2><p>回到一项反复找你审核的任务，分清资料、质量标准、授权与重要取舍。</p><p className="learning-task"><strong>读完要做：</strong>选一项可交接的任务，写清起点、升级条件和回看方式。</p><Link href="/work/founder-judgment" className="text-link">阅读工作接续短文 <Arrow /></Link></article>
        </div>
      </section>
      <section className="learning-practice" aria-labelledby="practice-heading"><div><span className="eyebrow">YOUR FIRST OUTPUT / 留下自己的第一份产物</span><h2 id="practice-heading">一张问题卡，<br />让模糊的困扰有了下一步。</h2><p>不必一次想清楚全部。先写一件事、一个解释，以及什么证据会让你重新考虑。保存或导出后，再带着新观察回来。</p><p className="small-note">草稿只保存在当前浏览器，不会自动提交联系请求。清除浏览器数据会移除草稿；重要内容请自行导出。</p></div><Link href="/practice" className="button button-dark">开始／继续我的问题卡 <Arrow /></Link></section>
      <div className="learning-context"><p>这里的文章按原力方法整理，用于学习与练习；模拟情境均明确标注。三部曲与十二模块可随时回查，无需按模块顺序读完才能开始。</p><div className="inline-links"><Link href="/method" className="text-link">回查原力方法 <Arrow /></Link><Link href="/ray" className="text-link">认识明哥的判断方式 <Arrow /></Link></div></div>
    </div>
    <div className="section-space" />
    <ClosingInvitation title="有一个需要共同推敲的决定？" />
  </main>;
}
