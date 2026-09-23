// スポット名から場所の種別を推定し、種別に応じた注意書きを返す。
// （撮影禁止等の個別データが無いため、名称の手がかりから配慮を促す。
//  将来 spots テーブルに個別の caution 列を持たせたら、そちらを優先する設計）

type Rule = { keywords: string[]; caution: string };

// 上から順に判定し、最初に一致したものを返す（危険度・具体性の高い順）
const RULES: Rule[] = [
  {
    keywords: ["駅", "踏切", "ホーム", "鉄道", "線路"],
    caution:
      "駅・線路の近くです。ホームや踏切での撮影は運行や他の利用者の妨げになり危険です。安全な場所から短時間で撮影してください。",
  },
  {
    keywords: ["小学校", "中学校", "高校", "高等学校", "学園", "学院", "学校"],
    caution:
      "学校の敷地です。無断で立ち入らず、授業や登下校の妨げにならないよう、児童・生徒の撮影は避けてください。",
  },
  {
    keywords: ["病院", "クリニック", "診療所", "医院"],
    caution:
      "医療施設です。患者や関係者のプライバシー・通行に最大限配慮してください。",
  },
  {
    keywords: ["神社", "神宮", "大社", "稲荷", "八幡", "天満宮", "寺", "寺院", "大師", "御堂", "観音"],
    caution:
      "参拝者のいる神聖な場所です。静かに参拝し、撮影は他の参拝者や社殿・仏像への配慮を忘れずに。",
  },
  {
    keywords: ["住宅", "団地", "アパート", "マンション", "民家"],
    caution:
      "住宅地です。住民の生活とプライバシーに十分配慮し、私有地には立ち入らないでください。",
  },
];

export function deriveSpotCaution(locationName: string | null | undefined): string | null {
  if (!locationName) return null;
  for (const rule of RULES) {
    if (rule.keywords.some((k) => locationName.includes(k))) return rule.caution;
  }
  return null;
}
