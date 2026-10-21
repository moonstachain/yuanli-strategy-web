import { pageMetadata } from "@/lib/page-metadata";
import { ContactForm } from "@/components/contact-form";

export const metadata = pageMetadata("带来一个问题", "从一个真实经营问题开始，先判断适配，再约定范围与合作方式。", "/contact");

export default function ContactPage() {
  return <main className="light-page">
    <section className="container page-intro">
      <p className="eyebrow">START A CONVERSATION / 从一个问题开始</p>
      <h1>把眼下最重要的<br />那个问题带来。</h1>
      <p className="intro-copy">不必把一切都想清楚。说说你在做什么、什么让你停下来，以及你正面临怎样的选择。</p>
    </section>
    <section className="container contact-layout section-space">
      <ContactForm />
      <aside className="contact-aside">
        <p className="eyebrow">WHAT HAPPENS NEXT</p>
        <h2>先理解问题，再确定合作。</h2>
        <ol className="process-list">
          <li><strong>01 / 留下问题</strong><p>提交后获得一份真实的保存回执。</p></li>
          <li><strong>02 / 判断适配</strong><p>核对问题、必要资料与决策参与方式。</p></li>
          <li><strong>03 / 约定下一步</strong><p>如适合进一步讨论，再明确范围、投入与费用。</p></li>
        </ol>
        <p className="small-note">提交问题不等于预约成功或合作成立。首次沟通无需上传合同、客户名单或其他敏感资料。</p>
        <a className="text-link" href="/work/growth-choices">还不确定？先看一次战略拆解 <span aria-hidden="true">↗</span></a>
      </aside>
    </section>
  </main>;
}
