import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title}｜RAY 原力战略`, description, url: path,
      siteName: "原力战略", locale: "zh_CN", type: "website",
      images: [{ url: "/share-card.png", width: 1200, height: 630, alt: "RAY 原力战略：把你的独特价值，变成可持续的事业。" }],
    },
    twitter: { card: "summary_large_image", title: `${title}｜RAY 原力战略`, description, images: ["/share-card.png"] },
  };
}
