import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("信息用途说明", "了解联系表单收集的信息、用途和更正方式。", "/privacy");

export default function PrivacyPage() {
  return <main className="light-page"><header className="container page-intro"><p className="eyebrow">PRIVACY / 信息用途说明</p><h1>只为这一次，<br />有意义的对话。</h1><p className="intro-copy">请在提出问题前，了解信息如何被接收与使用。</p></header><article className="container prose privacy-copy">
    <h2>谁接收这些信息？</h2><p>表单用于 RAY｜原力战略的合作沟通，由本网站负责人查看和处理。当前网站为私有体验版，尚未面向公众开放咨询。</p>
    <h2>会收集什么？</h2><p>称呼、业务或专业的一句话介绍、希望解决的问题，以及你选择的一种联系方式。系统另外保存提交时间、回执编号和处理状态；已登录访问时，记录与本次提交关联的站内身份。</p>
    <h2>如何使用和保存？</h2><p>这些信息用于理解你的处境、判断合作适配、联系你并处理本次请求。内容保存在网站的服务端接收记录中，接收入口经过身份校验。表单内容不会显示在公开页面，也不会自动用于制作案例或发布文章。</p>
    <h2>哪些资料暂时不用提交？</h2><p>首次只需问题概况。请先保留合同、账户密码、身份证件、客户名单以及未经授权的第三方资料。需要更多材料时，双方另行约定范围与传递方式。</p>
    <h2>如何更正或请求删除？</h2><p>可以通过同一表单注明原回执编号，以及希望更正或删除的内容。负责人核对身份后处理。当前未设自动删除期限；正式公开接收前，将明确实际的保存期限和联系责任。</p>
    <h2>浏览与测量</h2><p>当前版本不接入广告追踪，也不安装第三方行为分析脚本。网站托管服务可能为运行、安全和身份验证处理必要的技术信息。</p>
    <p className="small-note">版本日期：2026 年 10 月 21 日。后续如调整用途，会先更新本说明。</p><a className="button" href="/contact">回到问题表单 <span aria-hidden="true">↗</span></a>
  </article></main>;
}
