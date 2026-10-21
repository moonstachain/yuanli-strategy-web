"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, BrandSymbol } from "./site-icons";

const links = [
  { href: "/start", label: "从问题开始" }, { href: "/work", label: "跟着明哥学商业" },
  { href: "/method", label: "原力方法" }, { href: "/work-with-ray", label: "合作方式" }, { href: "/ray", label: "关于明哥" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  function active(href: string) { return pathname === href || (href === "/work" && (pathname.startsWith("/work/") || pathname === "/practice")); }
  return <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } }}>
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="原力战略首页"><BrandSymbol /><span><span className="brand-name">原力战略</span><span className="brand-caption">YUANLI STRATEGY · RAY</span></span></Link>
      <nav className="desktop-nav" aria-label="主要导航">
        {links.map((link) => <Link key={link.href} href={link.href} className="nav-link" aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}
        <Link href="/contact" className="button header-contact">带来一个问题 <Arrow /></Link>
      </nav>
      <button ref={button} className="mobile-menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? "关闭" : "菜单"}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
    </div>
    <nav id="mobile-navigation" className="mobile-menu" hidden={!open} aria-label="手机导航"><div className="container">
      {links.map((link) => <Link key={link.href} href={link.href} className="nav-link" aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}
      <Link href="/contact" className="button">带来一个问题 <Arrow /></Link>
    </div></nav>
  </header>;
}
