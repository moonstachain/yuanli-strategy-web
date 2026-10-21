import { pageMetadata } from "@/lib/page-metadata";
import { ProblemNavigator } from "@/components/problem-navigator";

export const metadata = pageMetadata("从问题开始", "从方向与增长、价值与选择、组织与接续，找到值得深入的经营问题。", "/start");

const groups = [
  { id: "direction", no: "01", title: "方向与增长", line: "变化很多，先确定什么值得下注。", doors: [
    { id: "change", title: "外面变化太快，什么该跟，什么不该跟？", clue: "把外部变化与自己的真实能力放在一起，看机会是否值得投入。", modules: "B1 原力借势", prepare: "近期观察到的变化、已有业务基础，以及最想试的一个机会。" },
    { id: "competition", title: "市场越来越卷，我到底该借什么势？", clue: "区分市场热度与属于自己的进入条件，找到能验证的小切口。", modules: "B1 原力借势 · B2 品类独创", prepare: "客户变化、替代方案、过去有效的成交路径。" },
  ]},
  { id: "value", no: "02", title: "价值与选择", line: "有人认可你，下一步是形成真实选择。", doors: [
    { id: "unique", title: "我真正不可复制的东西，到底是什么？", clue: "回到你反复做成的具体事情，分辨独特能力与暂时的资源优势。", modules: "A1 发现母体 · A4 显化原力", prepare: "三件亲自参与并做成的事，以及其中真正由你贡献的判断。" },
    { id: "choice", title: "用户为什么觉得我不错，却没有“非我不可”？", clue: "看用户为什么选择、为什么放弃，而不只看他们说了什么。", modules: "B2 品类独创", prepare: "近期成交与未成交的各几次对话、客户最终选择的理由。" },
    { id: "model", title: "营收在长，为什么公司没有越来越轻、越来越值钱？", clue: "把收入、完整交付成本和创始人的参与放到同一张图上。", modules: "B3 模式升维 · C3 一张地图", prepare: "产品与报价结构、交付步骤、团队与创始人的实际投入。" },
    { id: "advantage", title: "优势已经做出来了，为什么还是守不住？", clue: "检查优势依赖谁、控制在哪里、被模仿后还剩下什么。", modules: "B4 壁垒锁定", prepare: "竞争者的替代方式、客户续约原因、关键资源的归属。" },
  ]},
  { id: "continuity", no: "03", title: "组织与接续", line: "把重要判断留下，让下一次可以接着做。", doors: [
    { id: "founder", title: "为什么公司越大，反而越离不开我？", clue: "区分必须由你承担的判断，与可以逐步交给团队的工作。", modules: "C1 一纸文脉 · C3 一张地图", prepare: "最近一周必须找你才能推进的事项，以及每次卡住的原因。" },
    { id: "learning", title: "怎样让公司离开我，也能继续变聪明？", clue: "让资料、决策、行动与反馈能被下一位接手的人找到和使用。", modules: "C2 一个大脑 · C4 一条链路", prepare: "一条反复发生的业务流程、关键判断及最近一次复盘。" },
  ]},
];

export default function StartPage() {
  return <main className="light-page"><header className="container page-intro"><p className="eyebrow">START WITH A QUESTION / 问题是入口</p><h1>从你正面对的<br />那件事开始。</h1><p className="intro-copy">不必先理解整套方法。找到一个与你相近的问题，看看可以从哪里着手。</p></header><section className="container problem-groups">{groups.map(group => <section className="problem-group" id={group.id} key={group.id}><div className="problem-group-title"><p className="eyebrow">{group.no} / {group.title}</p><h2>{group.line}</h2></div><div>{group.doors.map(door => <details className="problem-door" id={door.id} key={door.id}><summary><span>{door.title}</span><span aria-hidden="true">＋</span></summary><div className="problem-door-body"><p>{door.clue}</p><p className="method-reference">可深入：{door.modules}</p><p><strong>先准备：</strong>{door.prepare}</p><div className="inline-links"><a className="text-link" href="/work/growth-choices">看一次判断过程 ↗</a><a className="text-link" href={"/contact?topic=" + encodeURIComponent(door.title)}>带着这个问题联系 ↗</a></div></div></details>)}</div></section>)}</section><section className="navigator-section"><div className="container"><p className="eyebrow">FIND YOUR NEXT READ / 三步阅读导航</p><h2 className="section-title">还没有找到切口？</h2><p>回答三个简单问题，获得一条阅读路径与准备材料。无需留下联系方式。</p><ProblemNavigator /></div></section></main>;
}
