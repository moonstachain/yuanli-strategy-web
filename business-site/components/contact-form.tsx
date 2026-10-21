"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

function newRequestKey() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // getRandomValues also works in the managed HTTP development preview.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [contactType, setContactType] = useState("wechat");
  const [question, setQuestion] = useState("");
  const request = useRef({ fingerprint: "", key: "" });

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic) setQuestion(topic.slice(0, 2000));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    const payload = { name: data.get("name"), business: data.get("business"), question: data.get("question"), contactType, contactValue: data.get("contactValue"), consent: data.get("consent") === "on", website: data.get("website") };
    const fingerprint = JSON.stringify(payload);
    setState("sending");
    setError("");
    try {
      if (request.current.fingerprint !== fingerprint) request.current = { fingerprint, key: newRequestKey() };
      const result = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(20000), body: JSON.stringify({ ...payload, requestKey: request.current.key }) });
      const body = await result.json() as { saved?: boolean; reference?: string; error?: string };
      if (!result.ok || body.saved !== true || typeof body.reference !== "string") throw new Error(body.error || "保存未成功，请稍后重试。");
      setReference(body.reference);
      setState("saved");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "连接暂时中断。请保留页面内容，稍后重试。");
      setState("error");
    }
  }

  if (state === "saved") return <div className="receipt-panel" role="status">
    <span className="receipt-mark" aria-hidden="true">✓</span>
    <p className="eyebrow">RECEIVED / 已保存</p>
    <h2>你的问题，已经留下。</h2>
    <p>请求已进入网站接收记录。后续沟通将先核对问题与合作范围，再安排下一步。</p>
    <div className="receipt-reference"><span>请保留回执编号</span><code>{reference}</code></div>
    <p className="small-note">这是一份提交回执，尚未建立预约或合作。</p>
    <a className="button" href="/work/growth-choices">阅读一次完整战略拆解 <span aria-hidden="true">↗</span></a>
  </div>;

  return <form className="contact-form" onSubmit={submit} aria-busy={state === "sending"}><fieldset className="form-controls" disabled={state === "sending"}><legend className="sr-only">你的问题与联系方式</legend>
    <div className="form-field"><label htmlFor="contact-name">怎么称呼你 <span>必填</span></label><input id="contact-name" name="name" autoComplete="name" maxLength={80} required placeholder="你的名字" /></div>
    <div className="form-field"><label htmlFor="contact-business">一句话介绍你的业务或专业 <span>必填</span></label><input id="contact-business" name="business" maxLength={240} required placeholder="例如：我经营一家为制造企业提供服务的设计公司" /></div>
    <div className="form-field"><label htmlFor="contact-question">眼下，最想解决的一个问题 <span>必填</span></label><textarea id="contact-question" name="question" rows={5} maxLength={2000} value={question} onChange={event => setQuestion(event.target.value)} required placeholder="你遇到了什么？接下来需要做出什么决定？" /><p className="field-hint">具体的处境，比完整的方案更有帮助。最多 2,000 字。带入的主题可以修改或清除。</p></div>
    <fieldset className="contact-method"><legend>留下一种联系方式 <span>必填</span></legend><div className="contact-options">{[["wechat", "微信"], ["email", "邮箱"], ["phone", "电话"]].map(([value, label]) => <label key={value} className={contactType === value ? "selected" : ""}><input type="radio" name="contactType" value={value} checked={contactType === value} onChange={() => setContactType(value)} />{label}</label>)}</div><label className="sr-only" htmlFor="contact-value">{contactType === "email" ? "邮箱地址" : contactType === "phone" ? "电话号码" : "微信号"}</label><input id="contact-value" name="contactValue" type={contactType === "email" ? "email" : contactType === "phone" ? "tel" : "text"} autoComplete={contactType === "email" ? "email" : contactType === "phone" ? "tel" : "off"} maxLength={120} required placeholder={contactType === "email" ? "you@example.com" : contactType === "phone" ? "方便联系的电话号码" : "请填写微信号"} /></fieldset>
    <div className="honeypot" aria-hidden="true"><label htmlFor="company-site">Website</label><input id="company-site" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="consent-row"><input type="checkbox" name="consent" required /><span>我同意将以上信息用于判断本次咨询是否适配并与我联系，已阅读<a href="/privacy">信息用途说明</a>。</span></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "正在保存…" : "提交我的问题"}<span aria-hidden="true">↗</span></button>
    <p className="small-note">只在实际保存成功后显示回执。发送失败时，已填写的内容会保留在此页面。</p>
  </fieldset></form>;
}
