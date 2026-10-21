import Link from "next/link";
import { BrandSymbol } from "./site-icons";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><Link href="/" className="brand"><BrandSymbol /><span><span className="brand-name">原力战略</span><span className="brand-caption">YUANLI STRATEGY · RAY</span></span></Link><p className="footer-description">RAY（明哥）· 商业翻译官<br />跟着明哥学商业，让理解进入自己的行动。</p></div>
      <div><p className="footer-nav-title">EXPLORE / 探索</p><nav className="footer-links" aria-label="方法与内容"><Link href="/start">从问题开始</Link><Link href="/work">跟着明哥学商业</Link><Link href="/practice">我的问题卡</Link><Link href="/method">原力方法</Link></nav></div>
      <div><p className="footer-nav-title">CONNECT / 建立联系</p><nav className="footer-links" aria-label="合作与联系"><Link href="/work-with-ray">合作方式</Link><Link href="/ray">关于明哥</Link><Link href="/contact">带来一个问题</Link><Link href="/privacy">隐私与联系</Link></nav></div>
    </div>
    <div className="footer-bottom"><span>© 2026 RAY · 原力战略</span><span>独特价值 / 战略取舍 / 现实行动</span></div>
  </div></footer>;
}
