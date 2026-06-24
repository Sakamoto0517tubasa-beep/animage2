"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";

const LANGS = [
  { code: "ja",    label: "日本語" },
  { code: "en",    label: "English" },
  { code: "zh-CN", label: "中文" },
  { code: "ko",    label: "한국어" },
  { code: "es",    label: "Español" },
];

function getCurrentLang(): string {
  if (typeof document === "undefined") return "ja";
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "ja";
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("ja");
  const initialized = useRef(false);

  useEffect(() => {
    setCurrent(getCurrentLang());
  }, []);

  function loadTranslateScript() {
    if (initialized.current) return;
    initialized.current = true;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "ja", includedLanguages: "en,zh-CN,ko,es,ja", autoDisplay: false },
          "google_translate_element",
        );
      }
    };

    const id = "google-translate-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(s);
    }
  }

  function setLang(code: string) {
    const host = location.hostname;
    const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (code === "ja") {
      // 元の日本語に戻す → googtrans cookie を削除
      document.cookie = `googtrans=; ${expire}; path=/`;
      document.cookie = `googtrans=; ${expire}; path=/; domain=${host}`;
      document.cookie = `googtrans=; ${expire}; path=/; domain=.${host}`;
    } else {
      const val = `/ja/${code}`;
      document.cookie = `googtrans=${val}; path=/`;
      document.cookie = `googtrans=${val}; path=/; domain=${host}`;
      document.cookie = `googtrans=${val}; path=/; domain=.${host}`;
    }
    location.reload();
  }

  const currentLabel = LANGS.find((l) => l.code === current)?.label ?? "日本語";

  return (
    <>
      {/* Google翻訳の隠しコンテナ */}
      <div id="google_translate_element" className="hidden" />

      <div className="notranslate fixed right-2 top-2 z-[60]" translate="no">
        <button
          onClick={() => { loadTranslateScript(); setOpen((o) => !o); }}
          className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm active:bg-black/60"
          aria-label="言語を選択"
        >
          <Globe className="size-3.5" />
          {currentLabel}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
            <div className="absolute right-0 mt-1 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setOpen(false); setLang(l.code); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                >
                  {l.label}
                  {current === l.code && <Check className="size-3.5 text-[#E53935]" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
