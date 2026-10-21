"use client";

import { useState, type FormEvent } from "react";

const routes = {
  unsure: { title: "先把最近一次卡住的事情写清楚", method: "从真实问题开始 / 先观察，再判断", read: "先阅读完整增长拆解，看看问题如何从一个感受变成几条可比较的路径。也可以回到上方八个问题，找一个最接近的入口。", material: "记录最近一次卡住的具体情境、你采取过的行动，以及仍不知道的事情。" },
  direction: { title: "先把增长选择放在一起比较", method: "原力创业 / 原力借势、品类独创", read: "重点看“增长为什么停了？”中的三条路径：触达、客户与品类、交付承接。", material: "整理近期成交与未成交记录、现有资源，以及你愿意承担的投入。" },
  value: { title: "从被认可，走向被选择", method: "原力资产 × 原力创业 / 显化原力、品类独创", read: "重点看样板中如何识别客户的选择理由，再回到方法页梳理你的独特价值。", material: "准备三件你做成的具体事情，以及客户愿意付费和放弃合作的原因。" },
  continuity: { title: "找到真正需要创始人的环节", method: "原力 OS / 一纸文脉、一张地图、一条链路", read: "重点看样板中的交付约束，区分判断、执行和反馈各自该由谁承担。", material: "选一条真实业务流程，记录卡点、责任人，以及最近一次结果。" },
};

export function ProblemNavigator() {
  const [goal, setGoal] = useState<keyof typeof routes>("unsure");
  const [basis, setBasis] = useState("early");
  const [decision, setDecision] = useState("unsure");
  const [result, setResult] = useState<{ goal: keyof typeof routes; basis: string; decision: string } | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setResult({ goal, basis, decision }); }
  return <div className="navigator-layout"><form className="navigator-form" onSubmit={submit}>
    <div className="form-field"><label htmlFor="nav-goal">01 / 你现在最想改变什么？</label><select id="nav-goal" value={goal} onChange={e => setGoal(e.target.value as keyof typeof routes)}><option value="unsure">暂不清楚，先看看怎样梳理问题</option><option value="direction">看清方向，找到下一步增长选择</option><option value="value">让独特价值更清楚地被客户选择</option><option value="continuity">让团队能够承接，减少对自己的依赖</option></select></div>
    <div className="form-field"><label htmlFor="nav-basis">02 / 已经具备哪些基础？</label><select id="nav-basis" value={basis} onChange={e => setBasis(e.target.value)}><option value="running">已有真实业务、客户和交付记录</option><option value="expertise">已有专业积累，正在形成业务</option><option value="early">还在探索，资料不完整</option></select></div>
    <div className="form-field"><label htmlFor="nav-decision">03 / 接下来要作出什么决定？</label><select id="nav-decision" value={decision} onChange={e => setDecision(e.target.value)}><option value="unsure">还不确定，先把问题说清楚</option><option value="choose">比较几条路径，决定先做哪一条</option><option value="validate">验证一个想法是否值得继续投入</option><option value="handoff">明确分工，让一项工作可以被接续</option></select></div>
    <button type="submit" className="button">生成我的阅读路径 <span aria-hidden="true">↗</span></button>
    <a className="text-link" href="/work/growth-choices">跳过导航，直接看完整拆解 ↗</a>
  </form><div className="navigator-result" aria-live="polite">{result ? <><p className="eyebrow">YOUR READING PATH / 你的阅读路径</p><h3>{routes[result.goal].title}</h3><p>{routes[result.goal].read}</p><p className="method-reference">{routes[result.goal].method}</p><p><strong>准备材料：</strong>{routes[result.goal].material}</p><p>{result.basis === "early" ? "资料还不完整时，先记录真实观察与待验证问题，不急于做完整方案。" : result.basis === "expertise" ? "从亲自做成的事情入手，区分可重复能力与偶然机会。" : "优先用已有客户与交付记录检验解释，避免只凭印象做决定。"}</p><p>{result.decision === "unsure" ? "下一步：把一个困扰写成具体情境，并注明哪些信息还不确定。" : result.decision === "validate" ? "下一步：把一个判断变成可以观察结果的小实验。" : result.decision === "handoff" ? "下一步：明确一项任务的判断边界、交接材料和回看方式。" : "下一步：列出两至三条实质不同的路径，写明代价与放弃项。"}</p><a className="text-link" href="/work/growth-choices">开始阅读完整拆解 ↗</a><a className="text-link" href={"/contact?topic=" + encodeURIComponent(routes[result.goal].title)}>带着主题联系 ↗</a><p className="small-note">这是依据你的选择生成的阅读导航。具体战略判断仍需结合真实材料与讨论。</p></> : <><span className="navigator-symbol" aria-hidden="true">↗</span><h3>让问题变得更具体，<br />下一步才会更清楚。</h3><p>选择左侧三项，我们会为你整理一条阅读路径。你的选择只在当前页面中使用。</p></>}</div></div>;
}
