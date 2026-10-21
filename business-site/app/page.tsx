import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { ClosingInvitation } from "@/components/closing-invitation";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("战略判断与事业系统设计", "面向成熟企业家与专家型创业者，从真实经营问题出发，看清关键约束，做出战略取舍，让独特价值进入可持续的事业。", "/");

export default function Home() {
  return <main>
    <section className="home-hero"><div className="container">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">RAY / 战略判断与事业系统设计</span>
          <h1><span>把你的独特价值，</span><span className="hero-emphasis">变成可持续的事业。</span></h1>
          <p className="hero-description">面向成熟企业家与专家型创业者。<br />从真实经营问题出发，看清关键约束，做出战略取舍，让有效经验进入团队与系统。</p>
          <div className="button-row"><Link href="/contact" className="button">带来一个问题 <Arrow /></Link><Link href="/work/growth-choices" className="button button-secondary">看一次战略拆解 <Arrow diagonal /></Link></div>
          <p className="hero-small">从一个重要的决定，开始一段有边界的合作。</p>
        </div>
        <article className="judgment-note" aria-label="增长为什么停了，战略判断样张">
          <div className="note-topline"><span className="tiny-label">STRATEGY NOTE / 001</span><span className="tag">方法演示</span></div>
          <h2>增长为什么停了？</h2><p className="note-question">同一个增长问题，可能需要三种完全不同的下一步。</p>
          <div className="note-options"><div className="note-option"><span className="note-option-letter">A</span><span>扩大有效触达</span><small>机会是否太少？</small></div><div className="note-option"><span className="note-option-letter">B</span><span>聚焦客户与品类</span><small>选择理由清楚吗？</small></div><div className="note-option"><span className="note-option-letter">C</span><span>改善交付承接</span><small>需求接得住吗？</small></div></div>
          <div className="note-decision"><p>先找到真正的约束，<br />再决定把资源投向哪里。</p><span>下一步：用一项小范围行动获取证据。</span></div>
          <div className="note-footer"><Link href="/work/growth-choices">展开完整判断 <Arrow /></Link><span className="tiny-label">非真实客户成果</span></div>
        </article>
      </div>
      <div className="hero-baseline"><p><span>原力资产</span><span>原力创业</span><span>原力 OS</span></p><a href="#questions" className="hero-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
    </div></section>

    <section id="questions" className="paper section-space"><div className="container">
      <div className="section-head"><div><span className="eyebrow">01 / RECOGNISE THE QUESTION</span><h2 className="section-title">从你真实的处境开始。</h2></div><p>已有事业与积累，仍有一些重要的事，需要重新想清楚。</p></div>
      <div className="problem-list">
        <Link className="problem-row" href="/start#direction"><span className="problem-number">01</span><h3>方向很多，<br />先投哪一处？</h3><p>看清外部变化与内部约束，把机会变成有理由的资源取舍。</p><Arrow diagonal /></Link>
        <Link className="problem-row" href="/start#value"><span className="problem-number">02</span><h3>客户说不错，<br />为何难以选择我？</h3><p>找到独特价值进入市场的方式，让专业积累形成清楚的选择理由。</p><Arrow diagonal /></Link>
        <Link className="problem-row" href="/start#continuity"><span className="problem-number">03</span><h3>团队越大，<br />为何仍离不开我？</h3><p>辨认必须保留的判断，与能够被团队和系统持续接住的工作。</p><Arrow diagonal /></Link>
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
      <div className="section-head"><div><span className="eyebrow">04 / SOMETHING TO WORK WITH</span><h2 className="section-title">把讨论，留下来。</h2></div><p>共同工作需要具体产物，让关键判断可以被讨论、被执行，也被下一次工作找回。</p></div>
      <div className="deliverable-grid"><article className="deliverable"><span className="deliverable-index">01 / FRAME</span><h3>一页问题框架</h3><p>当前处境、关键约束、已知事实与待补证据。</p></article><article className="deliverable"><span className="deliverable-index">02 / DECISION</span><h3>一页战略决策</h3><p>选择什么、暂缓什么、为什么，以及何时改变。</p></article><article className="deliverable"><span className="deliverable-index">03 / ACTION</span><h3>一个验证动作</h3><p>由谁开始、观察什么、什么时候回来一起看。</p></article><article className="deliverable"><span className="deliverable-index">04 / CONTINUITY</span><h3>一张后续行动图</h3><p>将资源、责任和顺序接起来，让行动有下一步。</p></article></div>
      <div className="deliverable-bottom"><p>具体交付以共同确认的问题与范围为准。先完成一次对焦，也可以成为有效的合作。</p><Link href="/work-with-ray" className="text-link">了解合作方式 <Arrow /></Link></div>
    </div></section>

    <section className="section-space"><div className="container ray-intro-grid"><div className="ray-type" aria-hidden="true"><strong>RAY</strong><span>原力战略 · 明哥</span></div><div className="ray-home-copy"><span className="eyebrow">05 / THE PERSON BEHIND THE JUDGMENT</span><h2 className="section-title">从复杂信息中找到主线，<br />再一起走进现实。</h2><p>RAY 关注的是：怎样在保护创始人独特性的同时，让价值可以被放大、被接续，并在长期工作中积累。</p><p>关键判断由人负责。研究与准备可以由团队和 AI 协作，经营决定始终属于客户。</p><Link href="/ray" className="text-link">认识 RAY 的工作方式 <Arrow /></Link></div></div></section>
    <ClosingInvitation />
  </main>;
}
