import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "日本移住・就労シミュレーター",
  description: "日本での就労・生活をシミュレーションするツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
