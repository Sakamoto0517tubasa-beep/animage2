// スポット名から場所の種別を推定し、種別に応じた注意書きの「翻訳キー」を返す。
// （撮影禁止等の個別データが無いため、名称の手がかりから配慮を促す。
//  文言は多言語辞書 caution.* で管理。将来 spots.caution 列があればそちらを優先する設計）

type Rule = { keywords: string[]; key: string };

// 上から順に判定し、最初に一致したものを返す（危険度・具体性の高い順）
const RULES: Rule[] = [
  { keywords: ["駅", "踏切", "ホーム", "鉄道", "線路"], key: "caution.station" },
  { keywords: ["小学校", "中学校", "高校", "高等学校", "学園", "学院", "学校"], key: "caution.school" },
  { keywords: ["病院", "クリニック", "診療所", "医院"], key: "caution.hospital" },
  { keywords: ["神社", "神宮", "大社", "稲荷", "八幡", "天満宮", "寺", "寺院", "大師", "御堂", "観音"], key: "caution.shrine" },
  { keywords: ["住宅", "団地", "アパート", "マンション", "民家"], key: "caution.residential" },
];

// 注意書きの翻訳キーを返す（該当なければ null）
export function deriveSpotCautionKey(locationName: string | null | undefined): string | null {
  if (!locationName) return null;
  for (const rule of RULES) {
    if (rule.keywords.some((k) => locationName.includes(k))) return rule.key;
  }
  return null;
}
