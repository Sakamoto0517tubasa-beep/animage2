"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { type Locale, isLocale, translate } from "@/lib/i18n/dictionaries";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue>({
  locale: "ja",
  setLocale: () => {},
  t: (k) => translate("ja", k),
});

const STORAGE_KEY = "animeji-locale";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSRは常にjaで描画→ハイドレーション後にlocalStorageの言語へ切替（不一致回避）
  const [locale, setLocaleState] = useState<Locale>("ja");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLocale(saved)) setLocaleState(saved);
    } catch {
      // localStorage不可（プライベートモード等）→ jaのまま
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // 保存不可でも画面上の切替は有効
    }
    // <html lang> も更新（アクセシビリティ・ブラウザ翻訳の判定用）
    try {
      document.documentElement.lang = l === "zh-CN" ? "zh" : l;
    } catch {
      // noop
    }
  }, []);

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// 文言だけ欲しいとき用のショートカット
export function useT() {
  return useContext(LangContext).t;
}
