"use client";

import { useLang } from "@/components/i18n/LanguageProvider";

// サーバーコンポーネント内でも使える翻訳テキスト。
// <T k="spot.route" /> / 数値補間は <T k="spot.photosCount" n={photos.length} />
export default function T({ k, n }: { k: string; n?: number }) {
  const { t, tn } = useLang();
  return <>{n != null ? tn(k, { n }) : t(k)}</>;
}
