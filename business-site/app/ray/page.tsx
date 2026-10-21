import Link from "next/link";
import { ClosingInvitation } from "@/components/closing-invitation";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("关于 RAY：从复杂中找到主线", "了解 RAY（明哥）的工作方式：从复杂信息与跨域知识中找到主线，将其转成企业家能够理解、选择与执行的战略结构。", "/ray");

const principles = [
  ["主体性", "先回到真实的自己", "人的独特判断与长期承诺需要被理解。外部机会和期待进入讨论，也要看它们是否与事业主线一致。"],
  ["真实行为", "从具体经历里找证据", "理解一个人的能力，要看他反复注意什么、怎样行动、产出什么，以及真实反馈如何出现。"],
  ["长期正确", "让选择经得起时间", "把长期信任与价值积累放进决策，同时清楚计算当下投入和放弃的代价。"],
  ["经验接续", "让输出成为下一次输入", "把判断、行动和结果留下，使后续工作能找回依据，并从已有经验继续推进。"],
  ["现实验证", "让独特价值被看见", "能力需要通过内容、方法、产品与真实使用显现。表达清楚之后，继续看世界如何回应。"],
  ["人的独特性", "让 AI 放大人的判断", "让工具承担适合的重复与准备工作，给深度创作、重要关系和关键问题留下人的参与。"],
];

export default function RayPage() {
  return <main className="light-page">
    <div className="container page-intro"><span className="eyebrow">ABOUT RAY / THE WORK BEHIND THE WORDS</span><h1>从复杂中找到主线，<br />把判断带进现实。</h1><p className="intro-copy">RAY（明哥）· 原力战略与事业系统设计。</p></div>
    <div className="container"><div className="ray-opening"><div className="ray-type" aria-hidden="true"><strong>RAY</strong><span>独特价值 · 战略判断</span></div><div className="prose"><h2>让不可复制的价值，<br />形成能够接续的事业。</h2><p>RAY 的工作，是从复杂信息、跨域知识与人生经历中发现隐藏主线，将其抽象成可以解释的结构，再翻译成企业家能够理解、选择与执行的战略系统。</p><p>长期关注的对象，是已有事业积累的企业家与资深专家：他们拥有独特价值，也需要让这种价值进入市场、进入组织，并在持续实践中积累。</p><p>原力战略围绕一个核心问题展开：如何保留创始人的独特性，同时让事业能够放大价值、接续工作，并越来越有能力面对下一次变化。</p></div></div></div>

    <section className="section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">PRINCIPLES / HOW JUDGMENT IS MADE</span><h2 className="section-title">六项持续的判断原则。</h2></div><p>原则要进入具体选择，才能成为工作的一部分。</p></div><div className="principles">{principles.map(([label, title, text], index) => <article className="principle" key={label}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="paper-soft section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">WORKING TOGETHER / CLEAR RESPONSIBILITY</span><h2 className="section-title">共同工作，各自负责。</h2></div></div><div className="role-grid">
      <article className="role-item"><span className="tiny-label">RAY / 关键判断</span><h3>看清主线与取舍</h3><p>进入重要问题、形成可讨论的结构，参与关键选项与边界判断。具体参与范围在项目开始时明确。</p></article>
      <article className="role-item"><span className="tiny-label">TEAM & AI / 研究准备</span><h3>让证据与工作接得上</h3><p>协助研究、整理、比较与草案准备，在明确授权和质量要求下承接适合的执行。</p></article>
      <article className="role-item"><span className="tiny-label">CLIENT / 经营主体</span><h3>决定真正要走的路</h3><p>提供必要处境和材料，参与取舍，确认经营决定与资源投入，并让现实反馈进入后续讨论。</p></article>
    </div></div></section>

    <section className="section-space"><div className="container reading-width prose"><span className="eyebrow">A WAY OF WORKING</span><h2>从小切口，进入有纵深的问题。</h2><p>一次合作可以从一个看似具体的难题开始：一个客户为什么迟迟不选、一项业务为什么越做越重、一段交付为什么始终需要本人兜底。</p><p>先理解具体的人与事，再找到影响选择的结构。将判断写成能够讨论的产物，用行动与真实反馈检验，然后把有用经验留给下一次任务。</p><p>网站中的方法演示让你直接看到这种工作方式。是否适合你的处境，可以从一个问题开始讨论。</p><Link href="/work/growth-choices" className="text-link">看一次完整的判断过程 <Arrow /></Link><p className="article-sources">人物定位与原则整理自 RAY 公开文脉 v2（2026.07）。</p></div></section>
    <ClosingInvitation title="你的事业，正遇到哪一个重要问题？" />
  </main>;
}
