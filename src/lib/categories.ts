// クライアント・サーバー両方から安全にインポートできる定数
export const CATEGORIES = ["聖地巡礼レポ", "アニメ感想", "旅行計画", "質問", "雑談"] as const;
export type Category = (typeof CATEGORIES)[number];
