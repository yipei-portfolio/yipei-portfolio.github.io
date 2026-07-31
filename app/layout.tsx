import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yipei-portfolio.github.io"),
  title: "李忆沛 · Stay curious",
  description: "李忆沛的个人主页：数据、产品、AI、合唱与 ChorusPrep。",
  openGraph: {
    title: "李忆沛 · Stay curious",
    description: "Stay curious. Make things clear.",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1729, height: 910, alt: "Yipei Li personal portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "李忆沛 · Stay curious",
    description: "Stay curious. Make things clear.",
    images: ["/og-v2.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="theme-color" content="#f8f7f5" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
