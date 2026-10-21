import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { ClosingInvitation } from "@/components/closing-invitation";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("合作方式：战略对焦与战略共创", "从一个关键问题开始，选择战略对焦、战略共创，或在方向明确后评估落地共建。了解投入、交付与合作边界。", "/work-with-ray");
function topic(value: string) { return `/contact?topic=${encodeURIComponent(value)}`; }

export default function WorkWithRayPage() {
  return <main className="light-page">
    <div className="container page-intro"><span className="eyebrow">WORK WITH RAY / A CLEAR SCOPE</span><h1>从一个重要问题，<br />开始一段有边界的合作。</h1><p className="intro-copy">先看清需要决定什么，再共同选择合适的工作深度。每一轮都有具体产物、双方投入和复看的节点。</p><p className="service-intro-note">以下是当前可讨论的合作提案与建议节奏。具体范围、费用、参与方式和时间，在了解问题后共同确认。</p></div>
    <div className="container">
      <div className="service-grid">
        <article className="service-card"><span className="eyebrow">01 / STRATEGIC FOCUS</span><h2>战略对焦</h2><p className="service-summary">问题很重要，但还没有被说清楚。先用一轮聚焦工作，找到值得继续推进的决定。</p><div className="service-detail"><h3>适合的处境</h3><p>有一个真实经营问题，已有必要材料，决策者能够参与讨论。</p></div><div className="service-detail"><h3>共同完成</h3><p>一页问题框架、关键约束、少量候选路径，以及下一步需要的证据或动作。</p></div><div className="service-detail"><h3>建议节奏</h3><p>一次 60–90 分钟深谈，配合必要材料研究，约一周完成一轮；按实际范围确定。</p></div><div className="service-detail"><h3>怎样算完成</h3><p>双方能说清本次要决定什么、缺什么证据，以及是否需要进入更深入的工作。</p></div><Link href={topic("我希望先做一次战略对焦，当前最重要的问题是：")} className="button button-dark">了解是否适合对焦 <Arrow /></Link></article>
        <article className="service-card featured"><span className="eyebrow">02 / STRATEGIC CO-CREATION</span><h2>战略共创</h2><p className="service-summary">已有一个重要业务选择，需要把方向、客户、模式与资源放到一起，形成能够推进的路径。</p><div className="service-detail"><h3>适合的处境</h3><p>目标与业务资料可讨论，有决策参与者，也有能够开始行动的负责人。</p></div><div className="service-detail"><h3>共同完成</h3><p>战略一页纸、客户与价值结构、路径取舍、90 天行动图，以及首个验证动作。</p></div><div className="service-detail"><h3>建议节奏</h3><p>以四周为首轮工作周期，按问题深度、资料与实际推进条件共同调整。</p></div><div className="service-detail"><h3>怎样算完成</h3><p>客户知道做什么、暂不做什么、由谁开始，以及什么信号出现时应修正。</p></div><Link href={topic("我想讨论战略共创，希望一起明确的业务选择是：")} className="button">讨论共创范围 <Arrow /></Link></article>
      </div>
      <section className="service-extension"><div><span className="eyebrow">WHEN THE DIRECTION IS CLEAR</span><h2>按需要，进入落地共建。</h2></div><div><p>方向明确之后，再评估需要哪些组织、资料与系统支持。可以从一条真实业务流程开始，逐项明确责任、操作、异常与复盘安排。</p><p>原力 OS 随具体问题进入工作；本项不是默认开通整套平台，也不把工具安装当作经营成果。</p><Link href={topic("方向已经较清楚，我想讨论一条业务流程如何落地共建：")} className="text-link">带着具体流程来讨论 <Arrow /></Link></div></section>
    </div>

    <section className="section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">A POSSIBLE FOUR-WEEK RHYTHM</span><h2 className="section-title">四周共创，如何推进？</h2></div><p>这是一个建议节奏。每一步以材料、判断与实际行动的完成情况接续。</p></div><div className="service-timeline">
      <article className="service-week"><span>WEEK 01</span><h3>看清处境</h3><p>定义问题、梳理独特价值与关键矛盾。记录证据缺口，以及必须保护的品质与边界。</p></article>
      <article className="service-week"><span>WEEK 02</span><h3>比较路径</h3><p>将客户、品类、模式与资源放在一起，比较有实质差异的选项及其代价。</p></article>
      <article className="service-week"><span>WEEK 03</span><h3>作出取舍</h3><p>形成客户确认的决策卡，开始一个范围明确的真实动作，约定观察方式。</p></article>
      <article className="service-week"><span>WEEK 04</span><h3>接续行动</h3><p>回看早期反馈，调整战略页与 90 天行动图，确定下一次复看日期。</p></article>
    </div></div></section>

    <section className="paper-soft section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">FIT / MUTUAL COMMITMENT</span><h2 className="section-title">好的合作，需要双方在场。</h2></div></div><div className="fit-grid"><div><h3>可以从这里开始</h3><ul><li>能够说清一项真实问题，以及它为何重要。</li><li>愿意带来必要材料，分清事实与假设。</li><li>决策者参与，团队有推进验证的资源。</li><li>愿意在不同路径之间选择，也接受暂缓。</li></ul></div><div><h3>先把这些期待讲清楚</h3><ul><li>合作提供判断、行动设计与约定支持。</li><li>经营决定、投入与重要承诺由客户确认。</li><li>报告完成、客户采用和经营改善分别观察。</li><li>如只需要对焦，无需为了完整而扩大项目。</li></ul></div></div></div></section>

    <section className="section-space"><div className="container service-faq"><div className="section-head"><div><span className="eyebrow">BEFORE WE BEGIN</span><h2 className="section-title">开始之前，你可能想知道。</h2></div></div>
      <details className="evidence-details"><summary>如何确定费用？</summary><div><p>对焦按明确的问题范围讨论；共创按项目范围讨论。报价应说明双方投入、修改轮次、交付范围与必要费用。后续共建的初始工作、持续支持与新增范围分别确认。</p></div></details>
      <details className="evidence-details"><summary>第一次联系需要准备什么？</summary><div><p>说明你的业务或专业领域、正在面对的处境，以及接下来需要决定的一件事即可。详细材料在确认需要与接收范围后再提供，首次联系不需要上传内部文件。</p></div></details>
      <details className="evidence-details"><summary>RAY、团队与 AI 分别做什么？</summary><div><p>RAY 参与关键问题定义、选项取舍与重要判断。团队与 AI 可以协助研究、整理、比较和准备草案。参与人员与责任按具体项目确认，客户保留经营决定。</p></div></details>
      <details className="evidence-details"><summary>四周之后，是否一定能看到增长？</summary><div><p>四周是建议工作周期，便于形成判断、开始行动并观察早期信号。经营结果受项目条件与外部变化影响，需要合适的观察窗口，不能以固定周期保证。</p></div></details>
    </div></section>
    <ClosingInvitation title="先把你的问题，放到桌面上。" />
  </main>;
}
