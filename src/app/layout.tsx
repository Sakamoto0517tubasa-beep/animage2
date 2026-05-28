import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUSUBI",
  description: "外国人のための相談・サポート",
  verification: {
    google: "eaCm7o9NZQHZ0d14ePYDAC-3CwZ8Od0ZePqoR28ht5s",
  },
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
