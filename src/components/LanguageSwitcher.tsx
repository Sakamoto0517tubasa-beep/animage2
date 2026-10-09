"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/dictionaries";
import { useLang } from "@/components/i18n/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-2 top-2 z-[60]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm active:bg-black/60"
        aria-label="Language"
      >
        <Globe className="size-3.5" />
        {LOCALE_LABELS[locale]}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            {LOCALES.map((code: Locale) => (
              <button
                key={code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
              >
                {LOCALE_LABELS[code]}
                {locale === code && <Check className="size-3.5 text-[#E53935]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
