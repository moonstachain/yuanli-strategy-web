import Link from "next/link";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("增长为什么停了？一次完整的战略拆解", "用一个清楚标注的模拟情境，比较触达、品类与交付三条路径。包含问题框架、决策卡、七天实验和复盘模板。", "/work/growth-choices");

const chapters = [
  ["context", "处境"], ["evidence", "证据"], ["options", "选项"], ["tradeoff", "取舍"],
  ["decision", "决策"], ["experiment", "七日动作"], ["review", "观察与复盘"],
];
const contact = `/contact?topic=${encodeURIComponent("读过「增长为什么停了？」后，我想讨论自己的增长约束：")}`;

export default function GrowthChoicesPage() {
  return <main className="light-page">
    <div className="container page-intro editorial-divider">
      <span className="eyebrow">STRATEGY NOTE / 001</span>
      <h1>增长为什么停了？<br />先找到真正的约束。</h1>
      <p className="intro-copy">同样是增长放缓，下一步可能是扩大触达、聚焦品类，也可能是改善交付。重要的，是知道什么证据支持哪种选择。</p>
      <div className="article-meta"><span className="tag">方法演示 · 非真实客户成果</span><span>演示版本 2026.10</span><span>四份可读工作样张</span></div>
    </div>
    <div className="container section-space article-layout">
      <nav className="article-nav" aria-label="本篇目录"><span className="article-nav-label">IN THIS NOTE / 阅读顺序</span>{chapters.map(([id, label], index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{label}</a>)}</nav>
      <article className="prose">
        <aside className="article-note"><strong>阅读前的说明</strong>以下是一家创始人主导的专业服务组织的模拟情境，用来演示判断过程。人物、处境与行动均用于说明方法，页面没有引用真实客户的经营数据或成果。</aside>

        <section id="context" className="article-section">
          <span className="eyebrow">01 / CONTEXT</span><h2>先明确，需要做出的决定。</h2>
          <p>一家专业服务组织已有业务与客户，近期却感觉增长变慢。团队提出了三个建议：增加传播投入、重新包装产品，或者先把交付标准化。</p>
          <p>在这个模拟情境里，询盘仍然出现，但不同客户的需求差异很大。团队经常为每位客户重写方案；失单原因没有统一记录，创始人投入了多少审核与返工时间，也没有完整底账。</p>
          <p>现在要决定的是：<strong>下一阶段有限的时间与资源，应该优先投向哪一个环节？</strong></p>
          <div className="decision-sheet">
            <div className="decision-sheet-header"><h3>问题框架</h3><span>WORKSHEET 01</span></div>
            <dl>
              <div className="decision-row"><dt>要决定什么</dt><dd>下一阶段优先扩大触达、聚焦客户与品类，还是改善交付。</dd></div>
              <div className="decision-row"><dt>必须保护</dt><dd>已有客户的交付质量，以及创始人无法被替代的关键判断。</dd></div>
              <div className="decision-row"><dt>可用资源</dt><dd>现有询盘与方案记录、客户沟通材料、团队复核时间。实际数量待盘点。</dd></div>
              <div className="decision-row"><dt>已知条件</dt><dd>需求差异较大、方案反复改写；这些是本次模拟设定。</dd></div>
              <div className="decision-row"><dt>尚缺证据</dt><dd>适配询盘数量、选择与失单理由、完整交付工时、未兑现承诺。</dd></div>
              <div className="decision-row"><dt>本轮边界</dt><dd>先确认主要约束，不在第一轮同时改动渠道、价格、产品和组织。</dd></div>
            </dl>
          </div>
        </section>

        <section id="evidence" className="article-section">
          <span className="eyebrow">02 / EVIDENCE</span><h2>把感觉，变成可以核对的材料。</h2>
          <p>“客户不够”“定位不清”“老板太忙”都可以作为线索。进入取舍之前，需要把它们放回同一批次、同一时间范围的业务记录。</p>
          <ul><li><strong>看机会：</strong>哪些询盘属于希望服务的对象？他们从哪里来，是否有真实需求与决策条件？</li><li><strong>看选择：</strong>客户比较过哪些替代方案？最终选择、暂缓或拒绝，理由是什么？</li><li><strong>看承接：</strong>从沟通、准备、交付到修改，团队与创始人各花了多少时间？</li></ul>
          <details className="evidence-details"><summary>展开一份证据记录样张</summary><div><p>每条记录保留：匿名编号、发生日期、需求原话、客户阶段、讨论过的范围、最终状态、原因原话、对应产物、总投入与信息来源。</p><p>不知道的字段写“待核对”。客户称赞、表达兴趣、同意报价、实际付款与交付采用，应分别记录。不同阶段不能混在一起计算。</p><p>这份表先支持本轮问题，范围无需扩大成一次全公司数据治理。</p></div></details>
        </section>

        <section id="options" className="article-section">
          <span className="eyebrow">03 / OPTIONS</span><h2>三条路径，各自需要什么证据？</h2>
          <p>每条路径都有成立条件。把它们放在一起，能够避免因某一种做法最熟悉，就直接把资源投进去。</p>
          <div className="comparison-scroll" role="region" aria-label="三条增长路径比较，可横向滚动" tabIndex={0}>
            <table className="comparison-table"><thead><tr><th scope="col">候选方向</th><th scope="col">支持它的证据</th><th scope="col">先防止的误判</th></tr></thead><tbody>
              <tr><td><span className="table-option">PATH A</span><strong>扩大有效触达</strong></td><td>适配客户理解价值，选择与交付相对稳定；主要缺少接触这类客户的机会。</td><td>把选择理由或交付问题，当作单纯的流量不足。</td></tr>
              <tr><td><span className="table-option">PATH B</span><strong>聚焦客户与品类</strong></td><td>客群需求差异大，客户替代比较不清，报价与交付范围持续变化。</td><td>把少量赞美当作付费意愿，或只换一句宣传口号。</td></tr>
              <tr><td><span className="table-option">PATH C</span><strong>改善交付承接</strong></td><td>需求已经出现，但质量、周期或关键审核依赖创始人，容量成为约束。</td><td>在承接尚不稳定时，继续增加对外承诺。</td></tr>
            </tbody></table>
          </div>
          <p>这些条件可能同时存在。要进一步判断：哪一项最先限制下一步，哪一项可以在当前资源内验证，以及先做它会给其他环节带来什么影响。</p>
        </section>

        <section id="tradeoff" className="article-section">
          <span className="eyebrow">04 / TRADE-OFF</span><h2>在这个情境中，先检验路径 B。</h2>
          <p>模拟材料中，已经出现的是客群需求差异与方案反复变化；“适配机会太少”和“交付容量已到上限”仍缺少同等具体的记录。因此，首个动作可以先检验：<strong>是否存在一类客户、一种重要问题，能够形成更清楚的选择与交付范围。</strong></p>
          <p>本轮先集中复核已有记录，暂缓新增大规模投放和同时推出更多产品。这样做的代价，是短期内少追一些泛化机会；换来的，是下一次投入有更具体的依据。</p>
          <details className="evidence-details"><summary>哪些事实会改变这个选择？</summary><div><p>如果记录显示，适配客户理解价值、转化与交付都较稳定，只是机会很少，那么应优先回看路径 A。</p><p>如果稳定需求已经存在，未交付承诺、返工与创始人审核持续排队，那么应优先处理路径 C。</p><p>如果三条路径都缺少可靠材料，本轮结论就是继续补证据，而不是强行选出一个“战略答案”。</p></div></details>
        </section>

        <section id="decision" className="article-section">
          <span className="eyebrow">05 / DECISION</span><h2>让选择成为一张可以复看的决策卡。</h2>
          <p>决策卡把判断的适用条件一起留下。后续人员可以知道当时为什么这样做，也能判断现在是否仍然成立。</p>
          <div className="decision-sheet">
            <div className="decision-sheet-header"><h3>本轮决策</h3><span>WORKSHEET 02</span></div>
            <dl>
              <div className="decision-row"><dt>当前选择</dt><dd>先检验路径 B：聚焦一类客户与一种重要问题。</dd></div>
              <div className="decision-row"><dt>选择依据</dt><dd>模拟设定中，需求差异与方案改写已出现；触达与容量的约束仍待核。</dd></div>
              <div className="decision-row"><dt>暂缓事项</dt><dd>新增大规模投放、扩大服务品类，以及未经验证的长期收益承诺。</dd></div>
              <div className="decision-row"><dt>负责角色</dt><dd>业务负责人确认范围，研究或交付角色整理材料，创始人参与关键取舍。角色为演示安排。</dd></div>
              <div className="decision-row"><dt>观察内容</dt><dd>客户需求是否集中，选择理由是否清楚，服务范围是否能够稳定说明。</dd></div>
              <div className="decision-row"><dt>修正条件</dt><dd>材料显示主要约束属于触达或交付，或当前客户聚焦假设被反证。</dd></div>
              <div className="decision-row"><dt>复看时间</dt><dd>第七天先看行动与早期反馈；经营结果另设适合的观察窗口。</dd></div>
            </dl>
          </div>
        </section>

        <section id="experiment" className="article-section">
          <span className="eyebrow">06 / A SEVEN-DAY EXPERIMENT</span><h2>七天，完成一个能够开始的实验。</h2>
          <p>这七天用于获取判断所需的材料和早期反馈。实验不预设一定得出正向结论，也不把七天当成营收改善的保证。</p>
          <div className="quiet-callout"><h3>实验问题</h3><p>如果把目标客户、关键问题与交付范围说得更具体，客户能否更准确地理解服务，并说明它与现有替代方案的差异？</p></div>
          <div className="experiment-list">
            <div className="experiment-item"><span>DAY 01–02</span><div><h3>确定同一批记录</h3><p>圈定一个明确时间范围，整理询盘、已完成方案与交付记录。保留已选、未选和暂缓的情况，避免只看成功片段。</p></div></div>
            <div className="experiment-item"><span>DAY 03</span><div><h3>提出一个聚焦假设</h3><p>选一类有材料支持的客户，写明其重要问题、原有替代方案、我们的可交付结果与服务边界。只形成一个可比较版本。</p></div></div>
            <div className="experiment-item"><span>DAY 04–05</span><div><h3>请真实对象复述和比较</h3><p>在获得沟通同意后，邀请适配对象阅读同一份说明。询问“你理解会拿到什么”“什么情况下会选择”“还缺什么信息”，记录原话和反对意见。</p></div></div>
            <div className="experiment-item"><span>DAY 06</span><div><h3>把反馈与交付放在一起</h3><p>比较理解偏差、替代选择和实际承接代价。区分“表达清楚了”与“客户愿意推进”，也检查范围是否增加了隐形工作。</p></div></div>
            <div className="experiment-item"><span>DAY 07</span><div><h3>决定继续、修改或停止</h3><p>回看假设，保留支持和反证。明确下一动作、负责人、资源投入与复看日期；资料不足时，写清还缺哪一项。</p></div></div>
          </div>
          <details className="evidence-details"><summary>把实验交给团队，需要填写哪些字段？</summary><div><p><strong>WORKSHEET 03：</strong>实验问题；假设；样本与时间范围；本次改变的因素；保持不变的条件；负责人；可用时间；资料接收范围；观察记录；继续、修改和停止条件；复看日期。</p><p>本例改变的是客户与价值表达的具体程度。若同时调整价格、渠道、承诺和交付方式，反馈的解释会更困难。需要把实际变更一并记录。</p></div></details>
        </section>

        <section id="review" className="article-section">
          <span className="eyebrow">07 / OBSERVATION & REVIEW</span><h2>把“做了”与“有效”，分别看清。</h2>
          <div className="observation-grid"><div className="observation-item"><h3>行动发生</h3><p>记录是否整理、说明是否完成、沟通是否按计划进行。</p></div><div className="observation-item"><h3>早期信号</h3><p>客户如何理解、比较与反对，团队是否更清楚承接范围。</p></div><div className="observation-item"><h3>经营结果</h3><p>实际合作、采用、交付负担与后续使用，按相应周期继续观察。</p></div></div>
          <p>没有结果不等于结果为零。观察窗口未到，就保留“待观察”；出现变化，也要回看还有哪些因素同时发生。</p>
          <div className="decision-sheet">
            <div className="decision-sheet-header"><h3>一份可复用的复盘模板</h3><span>WORKSHEET 04</span></div>
            <dl>
              <div className="decision-row"><dt>原假设</dt><dd>我们原先认为哪件事成立？它对应哪条决策？</dd></div>
              <div className="decision-row"><dt>实际行动</dt><dd>谁做了什么？和计划有什么差别？证据在哪里？</dd></div>
              <div className="decision-row"><dt>看到什么</dt><dd>出现了哪些支持、反证和无法解释的信息？</dd></div>
              <div className="decision-row"><dt>实际代价</dt><dd>准备、沟通、修改、审核与后续支持分别用了多少资源？</dd></div>
              <div className="decision-row"><dt>判断变化</dt><dd>保留、修改或放弃什么？哪些结论仍只适用于当前情境？</dd></div>
              <div className="decision-row"><dt>下一步</dt><dd>下一项动作、负责角色、资源上限和复看日期是什么？</dd></div>
              <div className="decision-row"><dt>经验接续</dt><dd>以后遇到什么问题时，应当重新找到这份记录？</dd></div>
            </dl>
          </div>
          <p>这份演示最后留下的，是一个能够接着工作的判断结构。它的价值需要在真实情境中继续核验。</p>
        </section>
        <div className="article-end"><h3>你的增长问题，卡在哪一环？</h3><p>你可以带着目前的处境和已尝试的做法，先把本次真正需要决定的事讲清楚。</p><Link href={contact} className="button">带着这个问题联系 <Arrow /></Link></div>
        <p className="article-sources">材料性质：原力战略方法演示。本文为说明判断过程而编写，四份工作样张供理解合作方式；不构成对具体企业的诊断。<Link href="/method">了解方法结构</Link>，或返回<Link href="/work">战略拆解</Link>。</p>
      </article>
    </div>
  </main>;
}
