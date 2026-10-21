import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { ClosingInvitation } from "@/components/closing-invitation";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("战略拆解", "看见问题如何被澄清、选择如何形成，以及下一步怎样验证。阅读完整方法演示与两篇判断短文。", "/work");

export default function WorkPage() {
  return <main className="light-page">
    <div className="container page-intro"><span className="eyebrow">WORK / THE REASONING, OPENED</span><h1>看见一个判断，<br />如何形成。</h1><p className="intro-copy">把处境、证据、选项与行动放在同一页。你可以理解每一步，也可以带着自己的问题继续追问。</p></div>
    <div className="container">
      <article className="featured-work">
        <div className="work-feature-copy"><span className="tag">完整方法演示 · 非真实客户成果</span><h2>增长为什么停了？<br />先找到真正的约束。</h2><p>扩大触达、聚焦品类、改善交付：三条看起来都正确的路径，如何做出有依据的选择？</p><p>从一个模拟处境开始，读完问题框架、决策卡、七天实验和复盘模板。</p><Link href="/work/growth-choices" className="text-link">阅读完整拆解 <Arrow /></Link></div>
        <div className="work-feature-visual" aria-hidden="true"><div className="work-route"><div className="work-route-head">ONE QUESTION / THREE PATHS</div><div className="work-route-row"><span>A</span>扩大有效触达<span>机会</span></div><div className="work-route-row"><span>B</span>聚焦客户与品类<span>选择</span></div><div className="work-route-row"><span>C</span>改善交付承接<span>容量</span></div><p className="work-route-foot">判断的起点：哪一环，真正限制了下一步？</p></div></div>
      </article>
      <div className="section-head"><div><span className="eyebrow">SHORT READINGS / 判断短文</span><h2 className="section-title">继续追问两个问题。</h2></div><p>下面是方法性讨论，帮助你整理观察；具体结论仍从自己的材料出发。</p></div>
      <div className="short-readings">
        <article className="short-reading" id="customer-choice"><span className="tiny-label">01 / CUSTOMER CHOICE</span><h2>客户说不错，<br />为什么仍没有选择你？</h2><p>“认可”之后，还需要看见客户实际在比较什么，以及他为何愿意为一个确定结果付出代价。</p><details className="evidence-details"><summary>展开全文</summary><div className="prose"><p>一句“很专业”可能是在评价能力，也可能只是表达礼貌。把它直接当成购买信号，容易跳过三个问题：客户现在究竟要完成什么，他还有哪些替代选择，选择你需要承担什么成本。</p><p>可以先回到一次真实沟通。让客户用自己的话复述：合作结束时会拿到什么？哪些变化对他有意义？如果不选你，他会怎样继续？这些回答能帮助区分表达不清、需求不急与替代方案更合适。</p><p>接着检查服务边界。客户需要知道自己要提供哪些材料、参与哪些判断、投入多少时间，以及哪些事项不在本次范围内。范围越模糊，客户越难比较，交付也越容易反复。</p><p>一个可开始的动作，是选一类已有记录支持的客户，把同一个重要问题与具体产物写成一页说明。请适配对象复述和比较，保留不理解与反对的原话。先检验选择理由，再决定是否扩大传播。</p><p>这个动作不保证成交。它让下一次讨论更具体：是价值没有被理解，还是还没有形成足够重要的选择理由？</p><Link href={`/contact?topic=${encodeURIComponent("我想讨论：客户认可我的专业，却仍没有选择我。")}`} className="text-link">带着这个问题联系 <Arrow /></Link></div></details></article>
        <article className="short-reading" id="founder-judgment"><span className="tiny-label">02 / FOUNDER JUDGMENT</span><h2>哪些判断必须保留，<br />哪些工作可以交出去？</h2><p>先找出真正需要创始人参与的分歧点，再让准备、执行与经验接续拥有清楚的责任。</p><details className="evidence-details"><summary>展开全文</summary><div className="prose"><p>“团队离不开我”需要落到一条具体任务上看。创始人究竟在补资料、反复解释标准、修改结果，还是在处理尚无先例的重要取舍？这些工作看似都叫审核，却需要不同的安排。</p><p>选择最近一次反复修改的任务，记录每个关键节点。哪些信息没有及时出现？哪些判断标准只存在于创始人脑中？哪些例外确实需要本人决定？把答案与实际产物放在一起，才能看到交接缺口。</p><p>可以先交出的，往往是有明确输入、质量样例与升级条件的准备和执行。需要保留的，是涉及事业方向、重要关系、价值底线或重大承诺的判断。具体边界应由当事人确认，并在真实任务中调整。</p><p>第一次交接的目标，是让下一位操作者完成一项范围明确的任务：知道从哪里开始、怎样判断质量、遇到什么情况停下来询问，以及结果交给谁。把修改意见留下，下一次才有机会减少重复解释。</p><p>文档写完只是准备完成。是否能够接续，要看真实操作者的产出是否被接受、仍需要多少协助，以及后续任务能否重新用上这段经验。</p><Link href="/method#os" className="text-link">看看原力 OS 如何接续工作 <Arrow /></Link></div></details></article>
      </div>
    </div>
    <div className="section-space" />
    <ClosingInvitation title="从一个判断，回到你的真实问题。" />
  </main>;
}
