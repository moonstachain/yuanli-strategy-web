import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("客户说不错，为什么仍没有选择你？", "把认可与选择分开，核对客户任务、替代方案与合作范围，再完成自己的问题卡。", "/work/customer-choice");

export default function CustomerChoicePage() {
  return <main className="light-page">
    <header className="container page-intro editorial-divider"><Link className="reading-back" href="/work">← 跟着明哥学商业</Link><span className="eyebrow">JUDGMENT NOTE / 002 · 客户选择</span><h1>客户说不错，<br />为什么仍没有选择你？</h1><p className="intro-copy">把“认可我的能力”与“愿意为这次合作投入”分开，才能知道下一步该调整表达、选择对象，还是重新核对价值。</p><div className="article-meta"><span className="tag">方法短文 · 教学整理</span><span>整理版本 2026.10</span><span>练习产物：一张自己的问题卡</span></div></header>
    <div className="container short-article-shell">
      <aside className="judgment-summary"><p className="eyebrow">先记住一个判断</p><h2>赞美是线索，选择需要具体理由。</h2><p>先回到一次真实沟通，核对客户要完成的任务、原有替代方案和本次合作边界。哪一项缺少证据，就先补哪一项。</p><Link href="/practice?topic=value" className="text-link">已有材料？直接写自己的问题卡 <Arrow /></Link></aside>
      <article className="prose short-article">
        <section><h2>01 / 一句“很专业”，留下了哪些未知？</h2><p>“很专业”可以是对能力的评价，也可能只是礼貌回应。仅凭这句话，仍不知道客户是否有迫切任务、是否愿意推进，以及是否有决策与投入条件。</p><p>先把一次沟通分成两栏：一栏是客户确实说过、做过什么；另一栏是自己的解释。“客户说方案有启发”属于可核对的记录，“所以他会购买”仍是推断。下一步的价值，就是找出能支持或改变这个推断的事实。</p></section>
        <section><h2>02 / 把选择放回客户的处境里。</h2><p>可以围绕同一项任务追问三个问题。目的在于听清选择条件，不是把对话变成一套说服话术。</p><dl className="reading-questions"><div><dt>他要完成什么？</dt><dd>这件事为何现在重要？如果暂时不处理，会发生什么？保留对方的具体说法。</dd></div><div><dt>他还可以怎样做？</dt><dd>可能是自己处理、交给团队、找另一类服务，或先不行动。比较这些选择各自的结果与代价。</dd></div><div><dt>这次合作究竟包含什么？</dt><dd>交付产物、客户投入、重要判断与范围边界，能否被对方准确复述？</dd></div></dl><p>如果客户理解得很清楚，却仍没有推进，下一步要核对重要性、时机、信任或条件。如果理解本身就有偏差，则先把具体产物与边界说清楚。不能把所有未成交，都归为传播不够。</p></section>
        <section><h2>03 / 做一个能获取证据的小动作。</h2><p>选一类已有记录支持的客户，把一个重要问题与具体产物写成一页说明。经对方同意后，请适配对象复述与比较：“你理解会拿到什么？”“哪些部分对你有用？”“如果不采用，你会怎样继续？”</p><p>保留不理解、反对和暂缓的原话，也记录对方是否采取了下一步行动。表达清楚、愿意继续讨论、同意范围与实际合作，分别观察。这个动作帮助辨认选择理由，不保证成交。</p><aside className="article-note"><strong>示例只说明区分方式</strong>“对方称赞方案”可以记入事实；“对方已经认同报价”需要额外记录支持。这是教学示例，不是客户项目记录。</aside></section>
        <section><h2>04 / 写下来后，检查三件事。</h2><ul><li>事实里是否保留了可以核对的原话或行动？</li><li>解释里是否同时保留另一种可能，而不是只写“客户不懂价值”？</li><li>下一步是否明确要找谁、看什么材料，或观察什么行动？</li></ul><p>如果其中一项还答不出来，就把它记为未知。卡片的作用是帮助继续调查，不是为了填满而制造确定性。</p></section>
        <div className="article-end learning-article-end"><span className="eyebrow">现在，换成你的问题</span><h3>把一次客户沟通，写成自己的问题卡。</h3><p>先写事实与解释，再选一项能区分不同解释的证据。草稿可在本浏览器保存，也可导出带走。</p><Link href="/practice?topic=value" className="button">填写客户选择问题卡 <Arrow /></Link></div>
        <nav className="reading-next" aria-label="继续阅读"><div><span>下一篇</span><Link href="/work/growth-choices">把客户选择放回增长全局 →</Link></div><div><span>方法参考</span><Link href="/method#b2">B2 品类独创 →</Link></div></nav>
        <p className="article-sources">材料性质：基于原力战略的方法性教学整理，不构成对具体企业的诊断。<Link href="/work">返回「跟着明哥学商业」</Link>，或在需要共同推敲时<Link href="/work-with-ray">了解合作方式</Link>。</p>
      </article>
    </div>
  </main>;
}
