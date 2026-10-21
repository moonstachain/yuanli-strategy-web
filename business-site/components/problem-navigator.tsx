"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { readingPath, type ReadingGoal, type NextDecision } from "@/lib/problem-paths";

export function ProblemNavigator() {
  const [goal, setGoal] = useState<ReadingGoal>("unsure");
  const [basis, setBasis] = useState("early");
  const [decision, setDecision] = useState<NextDecision>("unsure");
  const [result, setResult] = useState<{ goal: ReadingGoal; basis: string; decision: NextDecision } | null>(null);
  const path = result ? readingPath(result.goal, result.decision) : null;
  const changed = result && (goal !== result.goal || basis !== result.basis || decision !== result.decision);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ goal, basis, decision });
  }

  return <div className="navigator-layout">
    <form className="navigator-form" onSubmit={submit}>
      <div className="form-field"><label htmlFor="nav-goal">01 / 你现在最想改变什么？</label><select id="nav-goal" value={goal} onChange={event => setGoal(event.target.value as ReadingGoal)}>
        <option value="unsure">暂不清楚，先看看怎样梳理问题</option>
        <option value="direction">看清方向，找到下一步增长选择</option>
        <option value="value">让独特价值更清楚地被客户选择</option>
        <option value="continuity">让团队能够承接，减少对自己的依赖</option>
        <option value="assets">从已有经历中，辨认自己的独特能力</option>
      </select></div>
      <div className="form-field"><label htmlFor="nav-basis">02 / 已经具备哪些基础？</label><select id="nav-basis" value={basis} onChange={event => setBasis(event.target.value)}>
        <option value="running">已有真实业务、客户和交付记录</option><option value="expertise">已有专业积累，正在形成业务</option><option value="early">还在探索，资料不完整</option>
      </select></div>
      <div className="form-field"><label htmlFor="nav-decision">03 / 接下来要作出什么决定？</label><select id="nav-decision" value={decision} onChange={event => setDecision(event.target.value as NextDecision)}>
        <option value="unsure">还不确定，先把问题说清楚</option><option value="choose">比较几条路径，决定先做哪一条</option><option value="validate">验证一个想法是否值得继续投入</option><option value="handoff">明确分工，让一项工作可以被接续</option>
      </select></div>
      <button type="submit" className="button">{changed ? "更新我的阅读路径" : "生成我的阅读路径"} <span aria-hidden="true">↗</span></button>
      <Link className="text-link" href="/work">直接进入「跟着明哥学商业」 ↗</Link>
    </form>
    <div className="navigator-result" aria-live="polite">{result && path ? <>
      <p className="eyebrow">YOUR READING PATH / 你的阅读路径</p>
      {changed && <p className="navigator-update-note">选择已改变。点击“更新我的阅读路径”，查看对应建议。</p>}
      <h3>{path.title}</h3><p>{path.read}</p><p className="method-reference">{path.method}</p>
      <p><strong>先带上：</strong>{path.material}</p>
      <p>{result.basis === "early" ? "资料还不完整时，先记录真实观察与待验证问题。下一张卡可以诚实地保留未知。" : result.basis === "expertise" ? "从亲自做成的事情入手，区分可重复能力与偶然机会。把你的具体贡献与产物一起留下。" : "优先用已有客户与交付记录检验解释。保留成功与未成功的情况，避免只凭印象做决定。"}</p>
      <p><strong>第一项动作：</strong>{result.decision === "unsure" ? "写下一个具体情境，并注明还不确定的事情。" : result.decision === "validate" ? "在卡片中写出一个解释，以及什么事实会让你改变它。" : result.decision === "handoff" ? "选一项任务，写清判断边界、交接材料与要观察的结果。" : "比较两条实质不同的路径，写出决定先后所缺的证据。"}</p>
      <div className="navigator-path-links"><Link className="text-link" href={path.href}>{path.label} ↗</Link>{path.href !== path.practice && <Link className="text-link" href={path.practice}>填写自己的问题卡 ↗</Link>}</div>
      <p className="small-note">导航只根据本页选择推荐阅读。问题卡由你填写，不会自动提交给明哥；具体战略判断仍需真实材料。</p>
    </> : <><span className="navigator-symbol" aria-hidden="true">↗</span><h3>让问题变得更具体，<br />下一步才会更清楚。</h3><p>三项选择将决定首读内容、准备材料和第一项动作。你的选择只在当前页面中使用。</p></>}</div>
  </div>;
}
