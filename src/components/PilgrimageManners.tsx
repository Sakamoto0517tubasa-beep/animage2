"use client";

import { HandHeart, Ban, Camera, Volume2, Trash2, TriangleAlert } from "lucide-react";
import { useT } from "@/components/i18n/LanguageProvider";

// 全スポット共通の聖地巡礼マナー（アイコン＋翻訳キー）
const MANNERS: { icon: typeof Ban; key: string }[] = [
  { icon: Ban,           key: "manners.private" },
  { icon: Camera,        key: "manners.photo" },
  { icon: TriangleAlert, key: "manners.safety" },
  { icon: Volume2,       key: "manners.noise" },
  { icon: Trash2,        key: "manners.trash" },
];

type PilgrimageMannersProps = {
  // スポット個別の注意書きの翻訳キー（撮影禁止・立入禁止など）。あれば最上部に強調表示
  cautionKey?: string | null;
};

export default function PilgrimageManners({ cautionKey }: PilgrimageMannersProps) {
  const t = useT();
  return (
    <section className="px-4 mt-8">
      <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
        <div className="flex items-center gap-2">
          <HandHeart className="size-5 text-amber-600" />
          <h3 className="text-sm font-bold text-gray-900">{t("manners.title")}</h3>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">{t("manners.intro")}</p>

        {/* スポット個別の注意（キーがある場合のみ） */}
        {cautionKey && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
            <p className="text-xs font-semibold leading-relaxed text-red-700">{t(cautionKey)}</p>
          </div>
        )}

        <ul className="mt-3 space-y-2">
          {MANNERS.map(({ icon: Icon, key }) => (
            <li key={key} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
                <Icon className="size-3.5" />
              </span>
              <span className="text-xs leading-relaxed text-gray-700">{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
