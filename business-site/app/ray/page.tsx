import Link from "next/link";
import { ClosingInvitation } from "@/components/closing-invitation";
import { Arrow } from "@/components/site-icons";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("认识明哥：商业翻译官 RAY", "从跟着明哥学商业，到原力战略。了解 RAY（明哥）如何从复杂中找到主线，让理解进入选择、行动与事业系统。", "/ray");

const principles = [
  ["主体性", "先回到自己，再看外部期待", "人的独特判断与长期承诺需要被理解。外部机会和期待进入讨论，也要看它们是否与事业主线一致。"],
  ["真实行为", "从具体经历里找证据", "理解一个人的能力，要看他反复注意什么、怎样行动、产出什么，以及真实反馈如何出现。"],
  ["长期正确", "让长期信任进入当下选择", "把长期信任与价值积累放进决策，同时清楚计算当下投入和放弃的代价。"],
  ["经验接续", "让输出成为下一次输入", "把判断、行动和结果留下，使后续工作能找回依据，并从已有经验继续推进。"],
  ["现实验证", "让独特价值被看见", "能力需要通过内容、方法、产品与真实使用显现。表达清楚之后，继续看世界如何回应。"],
  ["人的独特性", "让 AI 放大人的判断", "让工具承担适合的重复与准备工作，给深度创作、重要关系和关键问题留下人的参与。"],
];

export default function RayPage() {
  return <main className="light-page">
    <div className="container page-intro"><span className="eyebrow">RAY（明哥）｜商业翻译官</span><h1>从复杂中找到主线，<br />把判断带进现实。</h1><p className="intro-copy">「跟着明哥学商业」背后的明哥，也是原力战略与事业系统的设计者。</p></div>
    <div className="container"><div className="ray-opening ray-opening-with-voice">
      <figure className="ray-voice-card"><span className="eyebrow">一段关于工作的自述</span><blockquote>“我会从复杂信息、跨域知识和人生经历中发现隐藏主线，将其抽象成可解释的结构，再翻译成企业家能够理解、选择和执行的战略系统。”</blockquote><figcaption>RAY · 公开文脉 v2 · 2026.07</figcaption></figure>
      <div className="prose"><h2>独特价值值得被看见，<br />也需要经得起现实。</h2><p>明哥长期关注已有事业积累的企业家与资深专家：他们拥有自己的经验与判断，也常常卡在客户选择、业务取舍，或团队接续的具体问题上。</p><p>「跟着明哥学商业」从这些问题出发，帮助读者看清一次判断是怎样形成的。「原力战略」提供进一步共同工作的结构：发现独特价值，让它进入市场，再让有效经验被团队与系统接住。</p><p>贯穿其中的问题是：如何既不把自己做平，又不让事业永远依赖自己？</p><Link href="/work" className="text-link">从一篇商业问题开始认识明哥 <Arrow /></Link></div>
    </div></div>

    <section className="paper-soft section-space"><div className="container">
      <div className="section-head"><div><span className="eyebrow">A QUESTION, TRANSLATED</span><h2 className="section-title">把一句难题，<br />翻译成能够讨论的选择。</h2></div><p>以下是方法演示，用来说明提问方式。它不是客户经历，也不代表实际经营结果。</p></div>
      <div className="ray-translation"><div className="ray-translation-question"><span className="tiny-label">从一句常见困惑开始</span><h3>“事情越来越多，<br />为什么还都要我来拍板？”</h3><p>直接回答“多招人”或“上 AI”，还不足以决定下一步。</p></div><ol className="ray-translation-steps"><li><span>01</span><div><h3>先找反复回到你手里的决定</h3><p>是信息没有留下、标准没有说清，还是这次判断本来就需要你负责？</p></div></li><li><span>02</span><div><h3>分清哪些可以接续，哪些需要保留</h3><p>写清可交接的依据与边界，让团队知道什么时候推进、什么时候回来讨论。</p></div></li><li><span>03</span><div><h3>只选一条真实工作来验证</h3><p>看看下一次能否按约定完成，再把偏差与新判断留下。</p></div></li></ol></div>
      <div className="after-list"><Link href="/work/founder-judgment" className="text-link">继续读：让团队接住创始人的判断 <Arrow /></Link></div>
    </div></section>

    <section className="section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">PRINCIPLES / HOW JUDGMENT IS MADE</span><h2 className="section-title">六项持续的判断原则。</h2></div><p>原则要进入具体选择，才能成为工作的一部分。</p></div><div className="principles">{principles.map(([label, title, text], index) => <article className="principle" key={label}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="paper-soft section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">WORKING TOGETHER / CLEAR RESPONSIBILITY</span><h2 className="section-title">共同工作，各自负责。</h2></div></div><div className="role-grid">
      <article className="role-item"><span className="tiny-label">RAY / 关键判断</span><h3>看清主线与取舍</h3><p>进入重要问题、形成可讨论的结构，参与关键选项与边界判断。具体参与范围在项目开始时明确。</p></article>
      <article className="role-item"><span className="tiny-label">TEAM & AI / 研究准备</span><h3>让证据与工作接得上</h3><p>协助研究、整理、比较与草案准备，在明确授权和质量要求下承接适合的执行。</p></article>
      <article className="role-item"><span className="tiny-label">CLIENT / 经营主体</span><h3>决定真正要走的路</h3><p>提供必要处境和材料，参与取舍，确认经营决定与资源投入，并让现实反馈进入后续讨论。</p></article>
    </div></div></section>

    <section className="section-space"><div className="container reading-width prose"><span className="eyebrow">YOUR NEXT QUESTION</span><h2>先留下一个你自己的问题。</h2><p>你可以先阅读、先练习，再决定是否共同工作。一张写清事实、未知与下一步的问题卡，就是一个有用的开始。</p><p>如果这个选择已经牵动重要资源，我们再一起确认讨论范围、双方投入，以及怎样用现实反馈检验判断。</p><div className="inline-links"><Link href="/practice" className="text-link">写下我的问题卡 <Arrow /></Link><Link href="/work-with-ray" className="text-link">了解如何一起工作 <Arrow /></Link></div><p className="article-sources">人物定位、原文引语与六项原则依据 RAY 公开文脉 v2（2026.07）；页面中的方法演示为编辑整理。</p></div></section>
    <ClosingInvitation title="你的事业，正遇到哪一个重要问题？" />
  </main>;
}
