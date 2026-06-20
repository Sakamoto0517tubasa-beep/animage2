"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_DISMISSED = "pwa_install_dismissed";

export default function PWAProvider() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Service Worker 登録
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => console.warn("SW registration failed:", err));
    }

    // インストールプロンプトをキャプチャ
    const handler = (e: Event) => {
      e.preventDefault();
      const dismissed = localStorage.getItem(LS_DISMISSED);
      if (!dismissed) {
        setInstallPrompt(e as BeforeInstallPromptEvent);
        setShowBanner(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
      setInstallPrompt(null);
    }
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem(LS_DISMISSED, "1");
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-3 right-3 z-50 mx-auto max-w-lg">
      <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-black/10">
        <Image src="/icon.svg" alt="Anigri" width={40} height={40} className="size-10 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900">Anigri をインストール</p>
          <p className="text-xs text-gray-500">ホーム画面に追加して快適に使おう</p>
        </div>
        <button
          onClick={handleInstall}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#E53935] px-3 py-2 text-xs font-bold text-white"
        >
          <Download className="size-3.5" />
          追加
        </button>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="閉じる"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
