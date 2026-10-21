import Link from "next/link";
import { ClosingInvitation } from "@/components/closing-invitation";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("原力方法：三部曲与十二模块", "原力资产、原力创业、原力OS：找到独特价值的来源，让世界理解与选择，并把真实经验留给下一次工作。", "/method");

const parts = [
  { anchor: "assets", letter: "A", title: "原力资产", description: "差异价值从哪里产生？把隐性的生成能力，训练成可以调用、验证和继续发展的原力资产。", modules: [
    { id: "A1", name: "发现母体", question: "什么持续生成我的不同？", input: "具体经历、重复出现的注意与判断、创作及行动样本。", output: "有证据支撑的母体候选：哪些生成方式跨情境持续出现。", boundary: "从真实行为形成可追问的假设，不用一个性格标签代替理解。" },
    { id: "A2", name: "回到母体", question: "哪些真正属于我，哪些只是外界塑造？", input: "母体候选、当前选择、外部期待、长期承诺与现实约束。", output: "整理注意、品味、能力、经历与承诺，形成保留、停止和调整的边界。", boundary: "取舍需要与真实生活和事业相互校验，不能把所有外部要求一概排除。" },
    { id: "A3", name: "获得原力", question: "如何把潜在生成结构训练成真实能力？", input: "已识别的生成方式、任务样本、反馈和持续练习条件。", output: "原力能力包：可调用的判断、表达、创造与行动方法，以及质量样例。", boundary: "能力是否形成，靠任务产物和真实反馈验证。" },
    { id: "A4", name: "显化原力", question: "进入真实世界后，是否真正创造价值？", input: "能力包、可能需要它的人、具体问题与可展示的产物。", output: "创业输入包：价值线索、现实反馈、可进入下一轮验证的问题。", boundary: "这里承担市场验证与创业接口；完整商业化由原力创业继续展开。" },
  ]},
  { anchor: "startup", letter: "B", title: "原力创业", description: "差异价值如何被世界接受与放大？进入时代、客户选择、商业模式和价值控制，形成真实交换。", modules: [
    { id: "B1", name: "原力借势", question: "这个时代为什么现在需要我？", input: "原力资产、技术与需求变化、目标客户处境、可接近的入口。", output: "势能地图：哪些变化与自身能力同向，什么机会值得进一步验证。", boundary: "热度可以提供线索，客户的实际需要与行动才支撑投入。" },
    { id: "B2", name: "品类独创", question: "市场如何认得我？", input: "用户问题、现有替代选择、独特能力与可交付结果。", output: "新品类定义：服务谁、解决什么、为何值得选择，以及怎样被理解。", boundary: "命名必须能帮助用户判断，并由真实价值支撑。" },
    { id: "B3", name: "模式升维", question: "如何持续赚钱、可复制？", input: "价值交换、收入与成本、完整交付负担、资源与协作关系。", output: "利润与运行结构：收费依据、交付方式、资源投入与持续成立的条件。", boundary: "纳入准备、审核、返工与支持代价，不能只看收入变化。" },
    { id: "B4", name: "壁垒锁定", question: "如何守住价值，不被轻易拿走？", input: "已产生的优势、关键关系、知识与数据积累、价值控制点。", output: "优势的累积机制与控制点安排，识别哪些条件决定长期价值能否保留。", boundary: "优势是否持续成立，需要在变化中的市场反复检验。" },
  ]},
  { anchor: "os", letter: "C", title: "原力 OS", description: "已经产生的价值如何穿越时间？让身份与边界、证据与记忆、能力与取舍、行动与结果彼此接续。", modules: [
    { id: "C1", name: "一纸文脉", question: "必须坚持什么，谁有权决定什么？", input: "经当事人确认的身份、意图、长期承诺、品味、边界与授权。", output: "本次任务需要的最小上下文，让参与者知道不能牺牲什么、何时需要升级判断。", boundary: "不把一次项目经验直接改写成人的永久身份，也不保存全部历史。" },
    { id: "C2", name: "一个大脑", question: "已经知道什么，证据有多可靠？", input: "事实、知识、案例、失败、决策、结果及其来源与版本。", output: "可供当前决策使用的证据包，并能继续检索、评价和更新。", boundary: "知道一件事，不自动获得采取行动的授权。" },
    { id: "C3", name: "一张地图", question: "事业需要哪些能力，先改变哪一个？", input: "战略目标、能力分布、责任、成熟度、控制点与瓶颈。", output: "以事业能力为基础的地图与决策记录，指导优先级和资源取舍。", boundary: "一张地图要能够指导建设和行动；普通信息分类图不能代替它。" },
    { id: "C4", name: "一条链路", question: "如何从判断进入行动，让下一次更强？", input: "有文脉约束、证据支持和明确选择的真实任务，以及相应授权。", output: "行动、结果、学习与下一任务的使用记录，形成可以接续的现实工作。", boundary: "生成建议或文件不等于行动完成；写出经验也不等于后续已复用。" },
  ]},
];

export default function MethodPage() {
  return <main className="light-page">
    <div className="container page-intro"><span className="eyebrow">METHOD / SELF × WORLD × TIME</span><h1>找到原力。进入世界。<br />形成复利。</h1><p className="intro-copy">原力战略三部曲：原力资产 × 原力创业 × 原力 OS。它们分别回答价值从哪里来、如何被选择，以及怎样让下一次工作站在已有经验之上。</p></div>
    <div className="container">
      <div className="method-opening"><h2 className="method-mother-question">如何既不把自己做平，<br />又不让事业<br />永远依赖自己？</h2><div><p>事业越有独特价值，关键判断就越容易集中在创始人身上。追求复制时，又需要小心保护原本值得被选择的品质。</p><p>原力战略围绕这一问题展开：如何在不牺牲创始人独特性的前提下，实现价值的放大、复制与长期复利？</p><p>十二模块为真实问题提供不同视角。实际工作可以跨模块展开，先处理当前需要作出的决定。</p></div></div>
      <section className="method-learning-route" aria-labelledby="method-learning-title"><div><span className="eyebrow">USE THE METHOD / 带着一个问题来用</span><h2 id="method-learning-title">先完成一次，再回来查地图。</h2><p>选一篇对应阅读，写自己的问题卡，再根据缺口回查模块。三部曲提供相互衔接的视角，实际学习从你最需要决定的事情开始。</p></div><div className="method-reading-links"><Link href="/work/growth-choices"><strong>方向与增长</strong><span>比较三条路径，找到先补的证据 ↗</span></Link><Link href="/work/customer-choice"><strong>客户与选择</strong><span>分开客户原话与自己的解释 ↗</span></Link><Link href="/work/founder-judgment"><strong>团队与接续</strong><span>还原一项任务，辨认交接缺口 ↗</span></Link></div></section>
      {parts.map((part) => <section key={part.letter} id={part.anchor} className="method-chapter">
        <div className="method-chapter-head"><span className="chapter-letter">{part.letter}</span><h2>{part.title}</h2><p>{part.description}</p></div>
        <div className="module-list">{part.modules.map((module) => <details className="module" id={module.id.toLowerCase()} key={module.id}>
          <summary><span className="module-code">{module.id}</span><span className="module-name">{module.name}</span><span className="module-question">{module.question}</span><span className="module-toggle" aria-hidden="true">+</span></summary>
          <div className="module-content"><dl><div><dt>从哪里开始</dt><dd>{module.input}</dd></div><div><dt>形成什么</dt><dd>{module.output}</dd></div><div><dt>应用边界</dt><dd>{module.boundary}</dd></div></dl></div>
        </details>)}</div>
      </section>)}
      <div className="method-note reading-width prose"><h2>每一次输出，都能成为下一次输入。</h2><p>从真实行动得到反馈，再更新理解、证据、选择与工作方式。这个过程贯穿三部曲，而不是末尾新增的一个步骤。</p><p>这里介绍的是方法与合作逻辑。具体项目采用哪些模块、使用哪些工具，取决于问题、材料与承接条件。</p><div className="inline-links"><Link href="/work" className="text-link">从对应阅读开始学一次 <Arrow /></Link><Link href="/practice" className="text-link">把自己的问题写下来 <Arrow /></Link></div><p className="article-sources">本页保留《原力战略概念宪法 v1.2》的三部曲与十二模块名称；输入、产物与边界以面向访客的语言说明。</p></div>
    </div>
    <div className="section-space" />
    <ClosingInvitation title="先找出，最值得推进的那个问题。" />
  </main>;
}
