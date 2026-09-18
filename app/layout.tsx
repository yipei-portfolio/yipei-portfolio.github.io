import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://yipei-portfolio.github.io"),
  title: "李忆沛 · 数据、产品与协作",
  description: "李忆沛的个人作品集。从 Ora Coffee 数据分析，到 ChorusGO 产品实践与合唱协作：理解业务，把想法做成工具。",
  openGraph: {
    title: "李忆沛 · 数据、产品与协作",
    description: "Make it clear. 理解业务，把想法做成工具。",
    type: "website",
    images: [{
      url: "/og-v2.png",
      width: 1729,
      height: 910,
      alt: "Yipei Li personal portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "李忆沛 · 数据、产品与协作",
    description: "Make it clear. 理解业务，把想法做成工具。",
    images: ["/og-v2.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="zh-CN">
      <head>
        <meta name="theme-color" content="#f8f7f5" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/photo-motion.css" />
        <link rel="stylesheet" href="/work-index.css" />
        <link rel="stylesheet" href="/case-studies.css" />
        <link rel="stylesheet" href="/case-evidence.css" />
        <link rel="stylesheet" href="/contact-qr.css" />
        <link rel="stylesheet" href="/portfolio-media.css" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>;
}
