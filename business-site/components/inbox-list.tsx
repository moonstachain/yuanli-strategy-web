"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Inquiry } from "@/lib/contact-service";

const statusNames: Record<string, string> = { new: "待处理", in_progress: "跟进中", closed: "已关闭" };
const dateTime = (value: string) => new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });

function InquiryItem({ row, onSaved, onDeleted }: { row: Inquiry; onSaved: (value: Inquiry) => void; onDeleted: (id: string) => void }) {
  const [status, setStatus] = useState(row.status);
  const [nextAction, setNextAction] = useState(row.nextAction ?? "");
  const [followUpAt, setFollowUpAt] = useState(row.followUpAt ?? "");
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const deleteButton = useRef<HTMLButtonElement>(null);

  async function change(method: "PATCH" | "DELETE") {
    if (busy) return;
    setBusy(true); setError(""); setNotice("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/inquiries", { method, headers: { "Content-Type": "application/json" }, signal: controller.signal, body: JSON.stringify({ id: row.id, expectedUpdatedAt: row.updatedAt ?? "", ...(method === "DELETE" ? { confirm: true } : { status, nextAction, followUpAt }) }) });
      const result = await response.json() as { error?: string; saved?: boolean; deleted?: boolean; inquiry?: Inquiry };
      if (!response.ok) { setError(result.error ?? "操作未完成，请稍后重试。"); return; }
      if (method === "DELETE" && result.deleted === true) { onDeleted(row.id); return; }
      if (method === "PATCH" && result.saved === true && result.inquiry) {
        onSaved(result.inquiry);
        setNextAction(result.inquiry.nextAction ?? "");
        setFollowUpAt(result.inquiry.followUpAt ?? "");
        setNotice("处理记录已保存。尚未发送任何消息。");
      } else setError("尚未确认保存结果，请刷新核对后再操作。");
    } catch { setError("连接未完成，结果尚未确认。请保留输入并刷新核对后再试。"); }
    finally { clearTimeout(timeout); setBusy(false); }
  }

  function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void change("PATCH"); }

  return <article className="inbox-item">
    <div className="inbox-meta"><span className="inbox-status">{statusNames[row.status] ?? row.status}</span><time dateTime={row.createdAt}>收到于 {dateTime(row.createdAt)}</time></div>
    <h2>{row.name}</h2><p>{row.business}</p><p className="inbox-question">{row.question}</p>
    <dl><div><dt>{({ email: "邮箱", wechat: "微信", phone: "电话" } as Record<string, string>)[row.contactType]}</dt><dd>{row.contactValue}</dd></div><div><dt>回执</dt><dd>{row.id}</dd></div>{row.updatedAt && <div><dt>更新于</dt><dd><time dateTime={row.updatedAt}>{dateTime(row.updatedAt)}</time></dd></div>}</dl>
    <form onSubmit={save} className="inbox-editor">
      <fieldset disabled={busy} className="form-controls">
        <legend className="inbox-editor-title">人工接续记录</legend>
        <div className="inbox-editor-row"><div className="form-field"><label htmlFor={`${row.id}-status`}>处理状态</label><select id={`${row.id}-status`} value={status} onChange={event => setStatus(event.target.value)}><option value="new">待处理</option><option value="in_progress">跟进中</option><option value="closed">已关闭</option></select></div><div className="form-field"><label htmlFor={`${row.id}-date`}>复看日期<span>选填</span></label><input id={`${row.id}-date`} type="date" value={followUpAt} onChange={event => setFollowUpAt(event.target.value)} /></div></div>
        <div className="form-field"><label htmlFor={`${row.id}-action`}>下一动作<span>{status === "in_progress" ? "跟进中必填" : "选填"}</span></label><textarea id={`${row.id}-action`} value={nextAction} onChange={event => setNextAction(event.target.value)} maxLength={600} required={status === "in_progress"} placeholder="例如：核对问题范围后，通过对方留下的方式联系。" /><p className="field-hint">只记录必要的处理安排。复看日期不会触发自动提醒；状态变更不表示预约或合作已成立。</p></div>
        <button className="button button-dark" type="submit">{busy ? "正在处理…" : "保存处理记录"}</button>
      </fieldset>
    </form>
    {error && <p className="form-error" role="alert">{error} <a href="/inbox" className="inline-link">刷新接收记录</a></p>}
    <p className="inbox-notice" role="status">{notice}</p>
    <div className="inbox-delete">
      {!confirming ? <button ref={deleteButton} type="button" className="text-link" disabled={busy} onClick={() => setConfirming(true)}>删除这条联系记录</button> : <div className="inbox-delete-confirm"><h3>确认删除 {row.name} 的联系记录？</h3><p>请先核实更正或删除诉求与提交者身份。删除会移除这条请求的内容、联系方式和处理记录，无法在网站内恢复。</p><div className="button-row"><button type="button" className="button button-secondary" disabled={busy} onClick={() => { setConfirming(false); setTimeout(() => deleteButton.current?.focus(), 0); }}>取消</button><button type="button" className="button button-danger" disabled={busy} onClick={() => void change("DELETE")}>确认删除此记录</button></div></div>}
    </div>
  </article>;
}

export function InboxList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [rows, setRows] = useState(initialInquiries);
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  return <section className="container inbox-list" aria-labelledby="inbox-list-heading">
    <h2 id="inbox-list-heading" ref={heading} tabIndex={-1} className="inbox-list-heading">当前载入 {rows.length} 条记录</h2><p role="status" className="small-note">{notice}</p>
    {rows.length === 0 ? <div className="receipt-panel"><h2>当前没有联系记录。</h2><p>测试时请使用明确标注的合成资料，记录回执后再核对保存与接续。</p><a className="button" href="/contact">打开问题表单 ↗</a></div> : rows.map(row => <InquiryItem key={row.id} row={row} onSaved={saved => setRows(current => current.map(item => item.id === saved.id ? saved : item))} onDeleted={id => { setRows(current => current.filter(item => item.id !== id)); setNotice("所选联系记录已删除。"); heading.current?.focus(); }} />)}
  </section>;
}
