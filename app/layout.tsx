import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "清水亮研究会 | 慶應義塾大学SFC",
  description:
    "清水亮研究会（慶應義塾大学湘南藤沢キャンパス）の公式サイトです。AI・テクノロジーと社会の接点を探求しています。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
