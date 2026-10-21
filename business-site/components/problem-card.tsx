"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_FIELD_LIMITS, PROBLEM_TOPICS, clearProblemCard, emptyProblemCard, exportProblemCard, inspectProblemCard, loadProblemCard, problemTopic, saveProblemCard } from "@/lib/problem-card";
import type { CardStorage, ProblemCard, ProblemTopic } from "@/lib/problem-card";

const fields: { key: Exclude<keyof ProblemCard, "revisitDate">; title: string; hint: string; placeholder: string; rows: number }[] = [
  { key: "question", title: "我需要做的决定", hint: "把范围缩小到一次具体选择：谁需要在什么时候决定什么？", placeholder: "用自己的处境写下一句话。", rows: 3 },
  { key: "facts", title: "已经观察到的事实", hint: "写实际发生过的行为、时间与结果。把“我觉得”先留给候选解释。", placeholder: "有什么可以回查的记录或具体事件？", rows: 4 },
  { key: "unknowns", title: "仍待确认的事", hint: "哪项信息一旦不同，就可能改变你的选择？", placeholder: "现在还不能确定什么？", rows: 3 },
  { key: "explanation", title: "候选解释", hint: "提出一种解释，再想一种可能。先保留“也许”，让证据有机会推翻它。", placeholder: "目前的解释是什么？还有没有别的解释？", rows: 4 },
  { key: "nextEvidence", title: "下一项证据与行动", hint: "写清由谁、做什么、观察什么。把动作缩小到可以真实开始。", placeholder: "下一步怎么获得证据？什么结果会让你改变主意？", rows: 4 },
];

function browserStorage(): CardStorage | null {
  try { return window.localStorage; } catch { return null; }
}

function savedTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export function ProblemCardEditor() {
  const [card, setCard] = useState<ProblemCard>(emptyProblemCard);
  const [topic, setTopic] = useState<ProblemTopic>("direction");
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [storageIssue, setStorageIssue] = useState<"invalid" | "unsupported" | "unavailable" | null>(null);
  const [message, setMessage] = useState("正在检查本机草稿……");
  const [checked, setChecked] = useState(false);
  const [clearPending, setClearPending] = useState(false);
  const [replacePending, setReplacePending] = useState(false);
  const [preparedExport, setPreparedExport] = useState<{ text: string; url: string | null; filename: string } | null>(null);
  const review = useRef<HTMLDivElement>(null);
  const exportArea = useRef<HTMLDivElement>(null);
  const exportText = useRef<HTMLTextAreaElement>(null);
  const inspection = inspectProblemCard(card);

  useEffect(() => {
    const requestedTopic = problemTopic(new URLSearchParams(window.location.search).get("topic"));
    const restored = loadProblemCard(browserStorage());
    setTopic(requestedTopic);
    if (restored.status === "saved") {
      setCard(restored.document.card); setTopic(restored.document.topic); setSavedAt(restored.document.savedAt);
      setMessage("已恢复上次保存在本机的问题卡。继续修改后，请再次保存。");
    } else if (restored.status === "empty") {
      setMessage("还没有本机草稿。填写后可以保存，也可以直接下载。");
    } else {
      setStorageIssue(restored.status);
      setMessage(restored.status === "unavailable" ? "浏览器暂时无法读取本机草稿。仍可填写与下载；离开前请下载保留。" : "发现一份当前版本无法读取的草稿，原内容已保留。你可以继续填写；保存新内容前会再次确认覆盖。");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [dirty]);

  useEffect(() => {
    if (!preparedExport) return;
    exportArea.current?.focus();
    return () => { if (preparedExport.url) URL.revokeObjectURL(preparedExport.url); };
  }, [preparedExport]);

  function changeField(key: keyof ProblemCard, value: string) {
    setCard(current => ({ ...current, [key]: value })); setDirty(true); setChecked(false); setClearPending(false); setReplacePending(false); setPreparedExport(null);
    setMessage("有新的修改尚未保存到本机。离开前请保存或下载。");
  }

  function save() {
    if (!inspection.dateValid) { setChecked(true); setMessage("请填写有效的回看日期，或将日期留空。"); document.getElementById("card-revisitDate")?.focus(); return; }
    const now = new Date().toISOString();
    if (saveProblemCard(browserStorage(), card, topic, now)) {
      setSavedAt(now); setDirty(false); setStorageIssue(null); setReplacePending(false); setMessage("已保存到当前浏览器。下次在同一浏览器打开本页，可以继续填写。");
    } else {
      setStorageIssue("unavailable"); setMessage("保存没有成功，当前输入仍在。请先下载问题卡；浏览器可能禁用了本地存储或空间不足。");
    }
  }

  function requestSave() {
    if (storageIssue === "invalid" || storageIssue === "unsupported") { setReplacePending(true); setClearPending(false); }
    else save();
  }

  function prepareExport() {
    const now = new Date().toISOString();
    const text = exportProblemCard(card, topic, now);
    let url: string | null = null;
    try {
      url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
    } catch { /* The complete text remains available when Blob downloads are unavailable. */ }
    setPreparedExport({ text, url, filename: `原力问题卡-${now.slice(0, 10)}.md` });
    setMessage(url ? "导出内容已准备好。请使用下方下载链接，或复制完整文本到自己的文档。" : "导出文本已准备好，但当前浏览器无法提供下载链接。请复制下方完整文本保留。");
  }

  function selectExportText() {
    exportText.current?.focus(); exportText.current?.select();
    setMessage("完整导出文本已选中。请使用键盘复制，或长按选中的文字复制到自己的文档。");
  }

  async function copyExportText() {
    if (!preparedExport) return;
    try {
      if (!navigator.clipboard?.writeText) { selectExportText(); return; }
      await navigator.clipboard.writeText(preparedExport.text);
      setMessage("完整问题卡已复制到剪贴板，可以粘贴到自己的文档中。");
    } catch { selectExportText(); }
  }

  function clear() {
    if (!clearProblemCard(browserStorage())) { setMessage("未能清除本机草稿，当前输入仍保留。可在浏览器的网站数据设置中清除本站数据。"); return; }
    setCard(emptyProblemCard()); setSavedAt(null); setDirty(false); setChecked(false); setClearPending(false); setReplacePending(false); setStorageIssue(null); setPreparedExport(null);
    setMessage("本机草稿与当前输入已清除。已经下载的文件不会被删除。");
  }

  function check() {
    setChecked(true);
    if (inspection.missing.length) {
      setMessage("还有未填写的部分。可以先保存草稿，下次再继续。");
      document.getElementById(`card-${inspection.missing[0]}`)?.focus();
    } else if (!inspection.dateValid) {
      setMessage("请调整回看日期，或先留空。"); document.getElementById("card-revisitDate")?.focus();
    } else { setMessage("五项内容已写齐。请用下方三个问题再核对一次，填写齐全不代表判断已经验证。"); review.current?.focus(); }
  }

  return <div className="practice-workspace">
    <aside className="practice-guide" aria-label="练习说明与示例">
      <p className="eyebrow">ONE DECISION / 一次真实选择</p><h2>先写一版，<br />再交给现实。</h2>
      <ol className="practice-steps"><li>选一个正在面对的决定。</li><li>把事实、未知与解释分开。</li><li>用一个小动作取得新证据。</li></ol>
      <details className="practice-example"><summary>先看一个简短示例 <span aria-hidden="true">＋</span></summary><div>
        <p className="practice-example-label">教学示例 · 非真实客户成果</p>
        <dl><dt>决定</dt><dd>下周先增加获客投入，还是核对客户选择的理由？</dd><dt>事实</dt><dd>最近三次询价都未成交，尚未询问对方最终选择了谁。</dd><dt>未知</dt><dd>未成交主要因为预算、需求，还是选择理由不清楚？</dd><dt>解释</dt><dd>也许价值表达不足；也可能这些客户原本就不适配。</dd><dt>行动</dt><dd>由负责人回访这三位询价者，记录他们比较的方案与决定原因，再决定投入方向。</dd></dl>
        <p>这段示例不会填入你的问题卡。请写自己的事实。</p>
      </div></details>
      <p className="practice-device-note">本机只保留一份草稿。换设备、无痕窗口或清除网站数据后，草稿可能不可用。长期保留请下载；重新开始前也可先下载上一张。</p>
    </aside>
    <section className="practice-editor" aria-labelledby="my-card-title">
      <div className="practice-card-top"><div><p className="eyebrow">MY QUESTION / 我的问题卡</p><h2 id="my-card-title">从这一个问题开始。</h2></div><span className="practice-progress" aria-label={`五项内容中已填写 ${inspection.filled} 项`}>{inspection.filled} / 5 项</span></div>
      <div className="practice-status" role="status" aria-live="polite"><p>{message}</p>{savedAt && <small>最近本机保存：{savedTime(savedAt)}{dirty ? " · 有未保存修改" : ""}</small>}</div>
      <form onSubmit={event => { event.preventDefault(); check(); }} noValidate>
        <fieldset disabled={!ready} className="practice-fields"><legend className="sr-only">填写自己的问题卡</legend>
          <div className="practice-topic"><label htmlFor="card-topic">这次关注</label><select id="card-topic" value={topic} onChange={event => { setTopic(problemTopic(event.target.value)); setDirty(true); setPreparedExport(null); setMessage("问题方向已调整，请保存这次修改。"); }}>{Object.entries(PROBLEM_TOPICS).map(([key, value]) => <option key={key} value={key}>{value.title}</option>)}</select><p>{PROBLEM_TOPICS[topic].prompt}</p></div>
          {fields.map((field, index) => <div className="practice-field" key={field.key}>
            <label htmlFor={`card-${field.key}`}><span>{String(index + 1).padStart(2, "0")}</span>{field.title}</label>
            <p id={`card-${field.key}-hint`}>{field.hint}</p>
            <textarea id={`card-${field.key}`} value={card[field.key]} onChange={event => changeField(field.key, event.target.value)} maxLength={CARD_FIELD_LIMITS[field.key]} rows={field.rows} placeholder={field.placeholder} aria-required="true" aria-invalid={checked && !card[field.key].trim() || undefined} aria-describedby={`card-${field.key}-hint${checked && !card[field.key].trim() ? ` card-${field.key}-error` : ""}`} />
            <div className="practice-field-foot">{checked && !card[field.key].trim() ? <span className="practice-field-error" id={`card-${field.key}-error`}>这一项还没有写下自己的内容。</span> : <span>可先写要点，不必一次写完。</span>}<span>{card[field.key].length} / {CARD_FIELD_LIMITS[field.key]}</span></div>
          </div>)}
          <div className="practice-date"><label htmlFor="card-revisitDate">什么时候回来看看？<span>选填</span></label><input type="date" id="card-revisitDate" value={card.revisitDate} onChange={event => changeField("revisitDate", event.target.value)} aria-invalid={checked && !inspection.dateValid || undefined} aria-describedby="card-revisitDate-hint" /><p id="card-revisitDate-hint">写下一个回看日期。这里不会自动发送提醒。</p></div>
          <div className="practice-actions"><button type="submit" className="button button-dark">检查我的问题卡 <span aria-hidden="true">↗</span></button><button type="button" className="button button-secondary" onClick={requestSave}>保存到本机</button><button type="button" className="button button-secondary" onClick={prepareExport} disabled={inspection.filled === 0}>导出问题卡</button></div>
        </fieldset>
      </form>
      {preparedExport && <div ref={exportArea} tabIndex={-1} className="practice-export" aria-labelledby="practice-export-title">
        <h3 id="practice-export-title">把这一版问题卡带走。</h3>
        <p id="practice-export-help">导出内容已准备好。下载或复制由你选择；这些内容不会上传，也不会替代本机保存。修改答案后，请重新导出最新一版。</p>
        <div className="practice-export-actions">{preparedExport.url && <a className="button button-dark" href={preparedExport.url} download={preparedExport.filename} aria-describedby="practice-export-help">下载问题卡 .md</a>}<button type="button" className="button button-secondary" onClick={copyExportText}>复制完整文本</button><button type="button" className="button button-secondary" onClick={selectExportText}>选中文本，手动复制</button></div>
        <label htmlFor="practice-export-text">完整导出文本</label>
        <textarea ref={exportText} id="practice-export-text" value={preparedExport.text} readOnly rows={12} spellCheck={false} aria-describedby="practice-export-fallback" />
        <p id="practice-export-fallback">如果浏览器未出现下载，请检查下载记录，或使用文本复制方式保留。</p>
      </div>}
      {replacePending && <div className="practice-confirm" role="group" aria-label="确认覆盖旧草稿"><p>保存将覆盖当前无法读取的旧草稿。这一步无法撤销。确认要用当前输入替换吗？</p><div className="button-row"><button type="button" className="button button-dark" onClick={save}>覆盖旧草稿并保存</button><button type="button" className="button button-secondary" onClick={() => setReplacePending(false)}>保留旧草稿</button></div></div>}
      <div className="practice-clear"><button type="button" onClick={() => { setClearPending(true); setReplacePending(false); }} disabled={!ready}>清除本机草稿与当前输入</button>{clearPending && <div className="practice-confirm" role="group" aria-label="确认清除问题卡"><p>确认清除？这会删除当前浏览器中的这一份草稿，无法恢复。需要保留时，请先下载。</p><div className="button-row"><button type="button" className="button button-dark" onClick={clear}>确认清除</button><button type="button" className="button button-secondary" onClick={() => setClearPending(false)}>继续保留</button></div></div>}</div>
      <div ref={review} tabIndex={-1} className={`practice-review${checked && inspection.complete ? " is-ready" : ""}`}>
        <p className="eyebrow">BEFORE YOU ACT / 行动前再问三句</p><h3>{checked && inspection.complete ? "第一版写齐了，再核对一次。" : "写完以后，用这三句自检。"}</h3>
        <ol><li>另一个人能分清哪些是事实，哪些只是我的解释吗？</li><li>下一步的动作是否足够小、有人负责，也有可以观察的结果？</li><li>如果结果与预想相反，我会调整哪一个判断？</li></ol>
        <p>这张卡帮助你组织思考。判断是否成立，需要新的事实来检验。回看时更新原卡，再保存或下载，留下自己的变化。</p>
        <div className="practice-next-links"><Link className="text-link" href={PROBLEM_TOPICS[topic].readHref}>{PROBLEM_TOPICS[topic].readLabel} ↗</Link><Link className="text-link" href="/work">选择下一篇学习内容 ↗</Link></div>
      </div>
      <div className="practice-contact"><h3>这件事，值得一起深入想一想？</h3><p>如果它关系到重要的资源取舍，可以另行提出合作问题。练习内容不会自动带入联系表单，由你决定分享哪些信息。</p><Link href="/contact" className="text-link">带来一个问题 ↗</Link></div>
    </section>
  </div>;
}
