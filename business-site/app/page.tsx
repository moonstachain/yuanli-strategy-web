import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { ClosingInvitation } from "@/components/closing-invitation";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("RAY（明哥）的原力战略", "跟着明哥学商业，从一个真实经营问题读起。理解原力战略，完成自己的问题卡，让独特价值进入可持续的事业。", "/");

export default function Home() {
  return <main>
    <section className="home-hero"><div className="container">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-persona">RAY（明哥）｜商业翻译官</span>
          <h1><span>把你的独特价值，</span><span className="hero-emphasis">变成可持续的事业。</span></h1>
          <p className="hero-description">面向成熟企业家与专家型创业者。<br />让客户知道为什么选择你，让团队接得住你的判断，让今天的经验成为明天的起点。</p>
          <div className="button-row"><Link href="/contact" className="button">带来一个问题 <Arrow /></Link><Link href="/work/growth-choices" className="button button-secondary">看一次战略拆解 <Arrow diagonal /></Link></div>
          <p className="hero-small hero-learning-link"><Link href="/work">跟着明哥学商业 <span aria-hidden="true">↗</span></Link><span>先读懂一个问题，再做自己的选择。</span></p>
        </div>
        <article className="judgment-note" aria-label="增长为什么停了，战略判断样张">
          <div className="note-topline"><span className="tiny-label">STRATEGY NOTE / 001</span><span className="tag">方法演示</span></div>
          <h2>增长为什么停了？</h2><p className="note-question">同一个增长问题，可能需要三种完全不同的下一步。</p>
          <div className="note-options"><div className="note-option"><span className="note-option-letter">A</span><span>扩大有效触达</span><small>机会是否太少？</small></div><div className="note-option"><span className="note-option-letter">B</span><span>聚焦客户与品类</span><small>选择理由清楚吗？</small></div><div className="note-option"><span className="note-option-letter">C</span><span>改善交付承接</span><small>需求接得住吗？</small></div></div>
          <div className="note-decision"><p>先找到真正的约束，<br />再决定把资源投向哪里。</p><span>下一步：用一项小范围行动获取证据。</span></div>
          <div className="note-footer"><Link href="/work/growth-choices">展开完整判断 <Arrow /></Link><span className="note-disclosure">模拟情境 · 非客户成果</span></div>
        </article>
      </div>
      <div className="hero-baseline"><p><span>原力资产</span><span>原力创业</span><span>原力 OS</span></p><a href="#questions" className="hero-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
    </div></section>

    <section id="questions" className="paper section-space"><div className="container">
      <div className="section-head"><div><span className="eyebrow">01 / RECOGNISE THE QUESTION</span><h2 className="section-title">从你真实的处境开始。</h2></div><p>已有事业与积累，仍有一些重要的事，需要重新想清楚。</p></div>
      <div className="problem-list">
        <Link className="problem-row" href="/work/growth-choices"><span className="problem-number">01</span><h3>方向很多，<br />先投哪一处？</h3><p>看清外部变化与内部约束，把机会变成有理由的资源取舍。</p><Arrow diagonal /></Link>
        <Link className="problem-row" href="/work/customer-choice"><span className="problem-number">02</span><h3>客户说不错，<br />为何难以选择我？</h3><p>找到独特价值进入市场的方式，让专业积累形成清楚的选择理由。</p><Arrow diagonal /></Link>
        <Link className="problem-row" href="/work/founder-judgment"><span className="problem-number">03</span><h3>团队越大，<br />为何仍离不开我？</h3><p>辨认必须保留的判断，与能够被团队和系统持续接住的工作。</p><Arrow diagonal /></Link>
      </div>
      <div className="after-list"><Link href="/start" className="text-link">找到适合自己的问题入口 <Arrow /></Link></div>
    </div></section>

    <section className="judgment-section section-space"><div className="container judgment-grid">
      <div><span className="eyebrow">02 / SEE THE REASONING</span><h2 className="section-title">一个判断，<br />应该经得起追问。</h2><p className="section-subcopy">答案的价值，在于你能看见它从哪里来、依赖什么条件，以及什么事实会让我们改变主意。</p><Link href="/work/growth-choices" className="text-link">阅读「增长为什么停了？」 <Arrow /></Link></div>
      <div className="judgment-steps"><div className="judgment-step"><span>01</span><div><h3>先把问题问对</h3><p>增长慢是表面现象。需要区分机会不足、客户不选择，还是交付已到极限。</p></div></div><div className="judgment-step"><span>02</span><div><h3>把实质不同的路径放在一起</h3><p>比较每条路径所需的证据、资源与代价，也讲清暂时不做什么。</p></div></div><div className="judgment-step"><span>03</span><div><h3>让现实来检验判断</h3><p>选择一个能够开始的动作，约定观察什么、何时回看、怎样修正。</p></div></div></div>
    </div></section>

    <section className="paper section-space"><div className="container">
      <div className="section-head"><div><span className="eyebrow">03 / THE YUANLI METHOD</span><h2 className="section-title">保留你的独特，<br />让事业能够向前。</h2></div><Link href="/method" className="text-link">理解三部曲与十二模块 <Arrow /></Link></div>
      <div className="method-trilogy"><article className="method-part"><div className="method-part-index">I</div><h3>原力资产</h3><p>找到持续生成独特价值的能力，让它被训练、被表达，也被现实验证。</p><span className="tiny-label">找到原力 / A1—A4</span></article><article className="method-part"><div className="method-part-index">II</div><h3>原力创业</h3><p>让独特价值进入市场，回答谁需要、为什么选择，以及怎样持续经营。</p><span className="tiny-label">进入世界 / B1—B4</span></article><article className="method-part"><div className="method-part-index">III</div><h3>原力 OS</h3><p>保留判断边界、相关记忆、能力取舍与行动结果，让以后能够接着做。</p><span className="tiny-label">形成复利 / C1—C4</span></article></div>
    </div></section>

    <section className="paper-soft section-space"><div className="container">
      <div className="section-head"><div><span className="eyebrow">04 / TRY IT ON YOUR OWN QUESTION</span><h2 className="section-title">读懂之后，<br />写下你自己的问题。</h2></div><p>从一张问题卡开始。把事实、猜测与下一步分开，就有了一份能继续讨论的起点。</p></div>
      <div className="home-practice-grid">
        <div className="home-practice-sheet" aria-label="问题卡包含的四个部分"><span className="tiny-label">我的第一张问题卡</span><ol><li><span>01</span><div><h3>我正面临什么决定？</h3><p>选一个具体处境，写清想改变什么。</p></div></li><li><span>02</span><div><h3>哪些是已经发生的事实？</h3><p>把观察到的事，与自己的解释分开。</p></div></li><li><span>03</span><div><h3>还有什么需要弄清？</h3><p>留出未知，也留下另一种可能。</p></div></li><li><span>04</span><div><h3>下一步怎样获取证据？</h3><p>确定一个小行动，以及何时回来复看。</p></div></li></ol></div>
        <div className="home-practice-copy"><span className="eyebrow">跟着明哥学商业 / 第一次练习</span><h3>留下一份，<br />真正属于你的判断起点。</h3><p>无需注册，也无需留下联系方式。填写后可保存在当前浏览器，或导出一份文件；下次回来，可以继续补充。</p><Link href="/practice" className="button button-dark">开始我的问题卡 <Arrow /></Link><p className="small-note">练习内容由你保管，不会自动提交给 RAY。共用设备建议只导出，不保存。</p></div>
      </div>
      <div className="deliverable-bottom"><p>当一个问题需要共同推敲，可以从战略对焦开始，再按实际需要进入共创或落地共建。</p><Link href="/work-with-ray" className="text-link">了解合作范围与交付 <Arrow /></Link></div>
    </div></section>

    <section className="section-space"><div className="container ray-intro-grid">
      <figure className="ray-voice-card"><span className="eyebrow">RAY（明哥）/ 公开文脉</span><blockquote>“我会从复杂信息、跨域知识和人生经历中发现隐藏主线。”</blockquote><figcaption>摘自公开文脉 v2 · 2026.07</figcaption></figure>
      <div className="ray-home-copy"><span className="eyebrow">05 / THE PERSON BEHIND THE JUDGMENT</span><h2 className="section-title">商业翻译官，<br />也是一起推敲问题的人。</h2><p>「跟着明哥学商业」从具体的人与事讲起；「原力战略」进一步把理解变成可讨论的选择、可执行的行动，以及能够接续的事业系统。</p><p>明哥关心的是：你的独特价值如何在放大的同时被保留下来。研究与准备可以由团队和 AI 协作，关键判断需要人参与，经营决定始终属于你。</p><Link href="/ray" className="text-link">认识明哥与他的判断原则 <Arrow /></Link></div>
    </div></section>
    <ClosingInvitation />
  </main>;
}
