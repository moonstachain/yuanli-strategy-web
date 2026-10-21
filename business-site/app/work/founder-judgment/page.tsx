import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("哪些判断必须保留，哪些工作可以交出去？", "从一项反复审核的任务开始，分清资料、标准与授权，让工作在真实行动中接续。", "/work/founder-judgment");

export default function FounderJudgmentPage() {
  return <main className="light-page">
    <header className="container page-intro editorial-divider"><Link className="reading-back" href="/work">← 跟着明哥学商业</Link><span className="eyebrow">JUDGMENT NOTE / 003 · 创始人接续</span><h1>哪些判断必须保留，<br />哪些工作可以交出去？</h1><p className="intro-copy">先选一项反复需要你介入的任务，找出真正的分歧点。让准备、执行与反馈有清楚的责任，也让重要判断有明确的边界。</p><div className="article-meta"><span className="tag">方法短文 · 教学整理</span><span>整理版本 2026.10</span><span>练习产物：一张自己的问题卡</span></div></header>
    <div className="container short-article-shell">
      <aside className="judgment-summary"><p className="eyebrow">先记住一个判断</p><h2>“离不开我”，要落到一项任务上看。</h2><p>你是在补资料、反复解释质量标准、处理授权不清，还是作出尚无先例的重要取舍？原因不同，交接方式也应不同。</p><Link href="/practice?topic=continuity" className="text-link">已有任务？直接写自己的问题卡 <Arrow /></Link></aside>
      <article className="prose short-article">
        <section><h2>01 / 先还原最近一次“又得我来”。</h2><p>选择最近一次反复修改的任务，保留起始要求、过程版本、修改意见和最终产物。把每次介入写具体：谁在什么时候遇到什么问题，你补上了什么，下一步才得以发生？</p><p>如果只留下“团队能力不够”，很难安排下一步。若能写成“接手人没有看到上次被接受的样例”或“客户新增范围后，不知道谁能确认”，就有了可以核查的交接缺口。这些表述是观察模板，不代表已经查明你的组织原因。</p></section>
        <section><h2>02 / 把四种缺口分开。</h2><dl className="reading-questions"><div><dt>资料缺口</dt><dd>开始工作所需的输入、历史决定或客户要求，没有及时到达接手人。</dd></div><div><dt>标准缺口</dt><dd>有任务要求，却缺少可比较的质量样例和验收条件，修改只能靠猜。</dd></div><div><dt>授权缺口</dt><dd>例外发生时，谁可决定、何时升级、什么必须暂停，没有共同确认。</dd></div><div><dt>重要取舍</dt><dd>涉及事业方向、关键关系、价值底线或重大承诺，需要有相应授权的人参与判断。</dd></div></dl><p>同一项任务可能同时有几种缺口。先处理最早阻止工作推进的那一处。团队与 AI 可以协助准备材料、形成候选、执行已授权的工作；工具本身不会替你决定哪些权力可以交出。</p></section>
        <section><h2>03 / 交接一次有边界的工作。</h2><p>与接手人共同确认一项任务的起点、输入、质量样例、权限和升级条件。选择能够及时回看的范围，约定谁验收结果，也约定出现什么情况先停下来询问。</p><div className="quiet-callout"><h3>一份最小交接说明</h3><p>这次要完成什么；从哪里取材料；什么样的结果可被接受；可以自行决定什么；什么情况找谁确认；结果何时交给谁；修改与观察留在哪里。</p></div><p>第一次交接不追求立即消除所有协助。记录接手人在哪一处仍需要支持，是信息没找到、标准不清，还是新的例外；下一轮据此修正。</p></section>
        <section><h2>04 / 用下一次任务检验是否接住。</h2><p>文档写完表示准备已完成。工作是否接续，要继续看产物是否被接受、重要边界是否被守住、仍需要哪些协助，以及后续任务能否找到并使用这次经验。</p><ul><li>卡片里有没有一项具体任务，而不是笼统的“提高团队能力”？</li><li>留下的事实是否足以区分资料、标准、授权与重要取舍？</li><li>下一步有没有接手人、观察方式和回看节点？</li></ul><p>在原力 OS 中，一纸文脉保留边界，一个大脑提供证据，一张地图帮助安排能力与责任，一条链路承接行动、结果和下一次使用。它们围绕具体任务协作。</p></section>
        <div className="article-end learning-article-end"><span className="eyebrow">现在，换成你的问题</span><h3>把一次重复介入，变成一项可验证的交接。</h3><p>写下实际卡点、自己的解释，以及一次小范围交接需要补上的证据。回来时，用实际产物修正这张卡。</p><Link href="/practice?topic=continuity" className="button">填写工作接续问题卡 <Arrow /></Link></div>
        <nav className="reading-next" aria-label="继续阅读"><div><span>方法参考</span><Link href="/method#os">看原力 OS 四模块如何配合 →</Link></div><div><span>下一篇</span><Link href="/work/growth-choices#options">检查交付是否已成为增长约束 →</Link></div></nav>
        <p className="article-sources">材料性质：基于原力战略的方法性教学整理，没有引用真实客户项目或效果数据。<Link href="/work">返回「跟着明哥学商业」</Link>，或在需要共同推敲时<Link href="/work-with-ray">了解合作方式</Link>。</p>
      </article>
    </div>
  </main>;
}
