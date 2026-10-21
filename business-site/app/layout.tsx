import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import "./utility-pages.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ray-yuanli-strategy.ardentsugar8.chatgpt.site"),
  title: { default: "RAY｜原力战略 — 战略判断与事业系统设计", template: "%s｜RAY 原力战略" },
  description: "面向成熟企业家与专家型创业者，从真实经营问题出发，看清关键约束，做出战略取舍，让独特价值进入可持续的事业。",
  robots: { index: false, follow: false },
  openGraph: { title: "RAY｜原力战略", description: "把你的独特价值，变成可持续的事业。看见判断如何形成，从一个真实问题开始。", locale: "zh_CN", type: "website", siteName: "原力战略", images: [{ url: "/share-card.png", width: 1200, height: 630, alt: "RAY 原力战略：把你的独特价值，变成可持续的事业。" }] },
  twitter: { card: "summary_large_image", title: "RAY｜原力战略", description: "把你的独特价值，变成可持续的事业。", images: ["/share-card.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><a className="skip-link" href="#main-content">跳到正文</a><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter /></body></html>;
}
