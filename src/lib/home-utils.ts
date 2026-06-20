export const CITIES = [
  "すべて",
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
] as const;

export type CityFilter = (typeof CITIES)[number];

/**
 * スコア 1〜10 を色に変換
 *  1 点 → 赤   (#F44336)
 *  5〜6 点 → 橙・黄
 * 10 点 → 青緑  (#00ACC1)
 * HSL で hue を 0°(赤) → 195°(青緑) へ線形補間
 */
export function getScoreBadgeColor(score: number | null | undefined): string {
  if (score == null) return "#9CA3AF"; // gray

  const clamped = Math.min(10, Math.max(1, score));
  const t = (clamped - 1) / 9; // 0.0 〜 1.0

  // hue: 0 (red) → 128 (dark green)
  const hue = Math.round(t * 128);
  // saturation: 中間(黄)で少し落ちる
  const sat = Math.round(82 - Math.sin(t * Math.PI) * 12);
  // lightness: 緑側を暗めに（t=0: 46%, t=0.5: 49%, t=1: 36%）
  const light = Math.round(46 + Math.sin(t * Math.PI) * 6 - t * 10);

  return `hsl(${hue}, ${sat}%, ${light}%)`;
}
