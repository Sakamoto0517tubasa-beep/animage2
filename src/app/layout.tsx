import type { Metadata, Viewport } from "next";
import { Cinzel, Geist, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MobileShell from "@/components/mobile/MobileShell";
import PWAProvider from "@/components/PWAProvider";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-logo",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://animage.app";

export const viewport: Viewport = {
  themeColor: "#E53935",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "AnimAge — アニメ聖地巡礼レビュー",
    template: "%s | AnimAge",
  },
  description: "全国のアニメ聖地を探して、訪問した感想をレビュー。ファンのリアルな評価で聖地巡礼をもっと楽しく。",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "AnimAge",
    title: "AnimAge — アニメ聖地巡礼レビュー",
    description: "全国のアニメ聖地を探して、訪問した感想をレビュー。ファンのリアルな評価で聖地巡礼をもっと楽しく。",
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimAge — アニメ聖地巡礼レビュー",
    description: "全国のアニメ聖地を探して、訪問した感想をレビュー。",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AnimAge",
  },
  applicationName: "AnimAge",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={cn("font-sans", geist.variable, playfair.variable, cinzel.variable)}>
      <body suppressHydrationWarning className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <MobileShell>{children}</MobileShell>
        <PWAProvider />
        <Analytics />
      </body>
    </html>
  );
}
