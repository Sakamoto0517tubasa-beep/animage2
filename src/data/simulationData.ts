export type Nationality =
  | "中国"
  | "ベトナム"
  | "フィリピン"
  | "インドネシア"
  | "ネパール"
  | "その他";

export type Education =
  | "中学"
  | "高校"
  | "専門学校"
  | "大学"
  | "大学院";

export type JapaneseLevel =
  | "なし"
  | "N5"
  | "N4"
  | "N3"
  | "N2"
  | "N1";

export type JobType =
  | "介護"
  | "医療（病院事務）"
  | "看護助手"
  | "保育"
  | "福祉施設"
  | "外食・飲食店"
  | "宿泊・ホテル"
  | "カフェ・喫茶"
  | "料理人"
  | "製造業"
  | "建設・土木"
  | "電気工事"
  | "塗装"
  | "溶接"
  | "農業"
  | "漁業"
  | "畜産"
  | "林業"
  | "物流・倉庫"
  | "トラック運転手"
  | "配送・デリバリー"
  | "ITエンジニア"
  | "Web制作"
  | "データ入力"
  | "コールセンター"
  | "販売・小売"
  | "清掃・ビルメンテナンス"
  | "警備"
  | "美容・理容"
  | "日本語教師"
  | "塾講師"
  | "通訳・翻訳"
  | "教育補助"
  | "金融・銀行"
  | "保険"
  | "一般事務"
  | "経理・会計"
  | "営業"
  | "エンジニア（機械）"
  | "研究職"
  | "コンサルタント"
  | "デザイナー"
  | "その他";

export type Region = "東京" | "神奈川" | "長野" | "福岡" | "北海道";

export type Savings =
  | "50万円未満"
  | "50〜100万"
  | "100〜200万"
  | "200万以上";

export type WorkYears = "1年" | "3年" | "5年" | "10年以上";

export type FamilyStatus = "単身" | "家族帯同";

export type HousingPreference = "会社寮" | "自分で探す";

export type Lifestyle = "節約重視" | "普通" | "充実重視";

export type SimulationInput = {
  nationality: Nationality;
  age: number;
  education: Education;
  japaneseLevel: JapaneseLevel;
  jobType: JobType;
  region: Region;
  desiredSalary: number;
  savings: Savings;
  workYears: WorkYears;
  familyStatus: FamilyStatus;
  housing: HousingPreference;
  lifestyle: Lifestyle;
};

export const jobTypeGroups: { label: string; jobs: JobType[] }[] = [
  {
    label: "医療・福祉",
    jobs: ["介護", "医療（病院事務）", "看護助手", "保育", "福祉施設"],
  },
  {
    label: "飲食・宿泊",
    jobs: ["外食・飲食店", "宿泊・ホテル", "カフェ・喫茶", "料理人"],
  },
  {
    label: "製造・建設",
    jobs: ["製造業", "建設・土木", "電気工事", "塗装", "溶接"],
  },
  {
    label: "農業・漁業",
    jobs: ["農業", "漁業", "畜産", "林業"],
  },
  {
    label: "物流・運輸",
    jobs: ["物流・倉庫", "トラック運転手", "配送・デリバリー"],
  },
  {
    label: "IT・テクノロジー",
    jobs: ["ITエンジニア", "Web制作", "データ入力", "コールセンター"],
  },
  {
    label: "販売・サービス",
    jobs: ["販売・小売", "清掃・ビルメンテナンス", "警備", "美容・理容"],
  },
  {
    label: "教育・語学",
    jobs: ["日本語教師", "塾講師", "通訳・翻訳", "教育補助"],
  },
  {
    label: "金融・事務",
    jobs: ["金融・銀行", "保険", "一般事務", "経理・会計", "営業"],
  },
  {
    label: "専門職",
    jobs: ["エンジニア（機械）", "研究職", "コンサルタント", "デザイナー"],
  },
  {
    label: "その他",
    jobs: ["その他"],
  },
];

export const allJobTypes: JobType[] = jobTypeGroups.flatMap((g) => g.jobs);

export const jobSalaryData: Record<JobType, Record<Region, number>> = {
  介護: { 東京: 22, 神奈川: 21, 長野: 18, 福岡: 18, 北海道: 17 },
  "医療（病院事務）": { 東京: 23, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 18 },
  看護助手: { 東京: 23, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 18 },
  保育: { 東京: 22, 神奈川: 21, 長野: 18, 福岡: 18, 北海道: 17 },
  福祉施設: { 東京: 21, 神奈川: 20, 長野: 18, 福岡: 17, 北海道: 17 },
  "外食・飲食店": { 東京: 20, 神奈川: 19, 長野: 17, 福岡: 17, 北海道: 16 },
  "宿泊・ホテル": { 東京: 21, 神奈川: 20, 長野: 19, 福岡: 18, 北海道: 18 },
  "カフェ・喫茶": { 東京: 19, 神奈川: 18, 長野: 16, 福岡: 16, 北海道: 16 },
  料理人: { 東京: 24, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 19 },
  製造業: { 東京: 22, 神奈川: 21, 長野: 19, 福岡: 18, 北海道: 18 },
  "建設・土木": { 東京: 26, 神奈川: 24, 長野: 21, 福岡: 20, 北海道: 20 },
  電気工事: { 東京: 27, 神奈川: 25, 長野: 22, 福岡: 21, 北海道: 21 },
  塗装: { 東京: 24, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 19 },
  溶接: { 東京: 26, 神奈川: 24, 長野: 21, 福岡: 20, 北海道: 20 },
  農業: { 東京: 18, 神奈川: 17, 長野: 17, 福岡: 16, 北海道: 17 },
  漁業: { 東京: 20, 神奈川: 19, 長野: 17, 福岡: 18, 北海道: 20 },
  畜産: { 東京: 19, 神奈川: 18, 長野: 18, 福岡: 17, 北海道: 18 },
  林業: { 東京: 19, 神奈川: 18, 長野: 19, 福岡: 17, 北海道: 18 },
  "物流・倉庫": { 東京: 22, 神奈川: 21, 長野: 19, 福岡: 18, 北海道: 18 },
  トラック運転手: { 東京: 26, 神奈川: 24, 長野: 21, 福岡: 21, 北海道: 21 },
  "配送・デリバリー": { 東京: 22, 神奈川: 21, 長野: 18, 福岡: 18, 北海道: 18 },
  ITエンジニア: { 東京: 35, 神奈川: 32, 長野: 25, 福岡: 27, 北海道: 25 },
  Web制作: { 東京: 30, 神奈川: 28, 長野: 24, 福岡: 24, 北海道: 23 },
  データ入力: { 東京: 20, 神奈川: 19, 長野: 17, 福岡: 17, 北海道: 16 },
  コールセンター: { 東京: 22, 神奈川: 21, 長野: 18, 福岡: 18, 北海道: 18 },
  "販売・小売": { 東京: 21, 神奈川: 20, 長野: 17, 福岡: 17, 北海道: 16 },
  "清掃・ビルメンテナンス": { 東京: 20, 神奈川: 19, 長野: 17, 福岡: 17, 北海道: 16 },
  警備: { 東京: 21, 神奈川: 20, 長野: 18, 福岡: 17, 北海道: 17 },
  "美容・理容": { 東京: 23, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 18 },
  日本語教師: { 東京: 25, 神奈川: 23, 長野: 20, 福岡: 20, 北海道: 19 },
  塾講師: { 東京: 24, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 18 },
  "通訳・翻訳": { 東京: 28, 神奈川: 26, 長野: 22, 福岡: 22, 北海道: 21 },
  教育補助: { 東京: 21, 神奈川: 20, 長野: 17, 福岡: 17, 北海道: 17 },
  "金融・銀行": { 東京: 35, 神奈川: 32, 長野: 26, 福岡: 27, 北海道: 25 },
  保険: { 東京: 30, 神奈川: 28, 長野: 24, 福岡: 24, 北海道: 23 },
  一般事務: { 東京: 23, 神奈川: 22, 長野: 19, 福岡: 19, 北海道: 18 },
  "経理・会計": { 東京: 28, 神奈川: 26, 長野: 22, 福岡: 22, 北海道: 21 },
  営業: { 東京: 30, 神奈川: 28, 長野: 23, 福岡: 24, 北海道: 22 },
  "エンジニア（機械）": { 東京: 32, 神奈川: 30, 長野: 26, 福岡: 25, 北海道: 24 },
  研究職: { 東京: 38, 神奈川: 35, 長野: 28, 福岡: 28, 北海道: 27 },
  コンサルタント: { 東京: 45, 神奈川: 40, 長野: 30, 福岡: 32, 北海道: 28 },
  デザイナー: { 東京: 28, 神奈川: 26, 長野: 22, 福岡: 22, 北海道: 21 },
  その他: { 東京: 20, 神奈川: 19, 長野: 17, 福岡: 17, 北海道: 16 },
};

export const regionData: Record<
  Region,
  { rent: number; food: number; transport: number; spots: string }
> = {
  東京: { rent: 9, food: 5, transport: 1.0, spots: "新宿・渋谷・上野・お台場" },
  神奈川: { rent: 7, food: 4.5, transport: 0.8, spots: "横浜・鎌倉・江の島" },
  長野: { rent: 4, food: 3.5, transport: 0.5, spots: "松本城・上高地・白馬" },
  福岡: { rent: 5, food: 4, transport: 0.6, spots: "博多・太宰府・糸島" },
  北海道: { rent: 4, food: 3.5, transport: 0.5, spots: "札幌・函館・富良野" },
};

export const jobJapaneseLevel: Record<JobType, string> = {
  介護: "N3程度",
  "医療（病院事務）": "N2程度",
  看護助手: "N3程度",
  保育: "N3程度",
  福祉施設: "N3程度",
  "外食・飲食店": "N4程度",
  "宿泊・ホテル": "N3程度",
  "カフェ・喫茶": "N4程度",
  料理人: "N4程度",
  製造業: "N4〜N3程度",
  "建設・土木": "N4〜N3程度",
  電気工事: "N4〜N3程度",
  塗装: "N4程度",
  溶接: "N4程度",
  農業: "N5〜N4程度",
  漁業: "N5〜N4程度",
  畜産: "N5〜N4程度",
  林業: "N5程度",
  "物流・倉庫": "N4程度",
  トラック運転手: "N3程度",
  "配送・デリバリー": "N4程度",
  ITエンジニア: "N2〜N1程度",
  Web制作: "N2程度",
  データ入力: "N3程度",
  コールセンター: "N2〜N1程度",
  "販売・小売": "N3程度",
  "清掃・ビルメンテナンス": "N4程度",
  警備: "N3程度",
  "美容・理容": "N3程度",
  日本語教師: "N1程度",
  塾講師: "N2〜N1程度",
  "通訳・翻訳": "N2〜N1程度",
  教育補助: "N3程度",
  "金融・銀行": "N2〜N1程度",
  保険: "N2程度",
  一般事務: "N2程度",
  "経理・会計": "N2程度",
  営業: "N2〜N1程度",
  "エンジニア（機械）": "N3〜N2程度",
  研究職: "N2〜N1程度",
  コンサルタント: "N1程度",
  デザイナー: "N2程度",
  その他: "N4程度",
};

export const dormAvailableJobs: JobType[] = [
  "介護",
  "看護助手",
  "福祉施設",
  "外食・飲食店",
  "宿泊・ホテル",
  "製造業",
  "建設・土木",
  "電気工事",
  "塗装",
  "溶接",
  "農業",
  "漁業",
  "畜産",
  "林業",
  "物流・倉庫",
  "配送・デリバリー",
];

const traineeJobs: JobType[] = [
  "製造業",
  "農業",
  "介護",
  "漁業",
  "畜産",
  "林業",
];

const employeeInsuranceJobs: JobType[] = [
  "外食・飲食店",
  "ITエンジニア",
  "Web制作",
  "コールセンター",
  "金融・銀行",
  "保険",
  "一般事務",
  "経理・会計",
  "営業",
  "エンジニア（機械）",
  "研究職",
  "コンサルタント",
  "デザイナー",
  "通訳・翻訳",
  "医療（病院事務）",
];

const jobRentModifier: Record<JobType, number> = {
  介護: 1.0,
  "医療（病院事務）": 1.05,
  看護助手: 1.0,
  保育: 1.0,
  福祉施設: 0.95,
  "外食・飲食店": 0.95,
  "宿泊・ホテル": 0.95,
  "カフェ・喫茶": 0.95,
  料理人: 0.95,
  製造業: 0.9,
  "建設・土木": 0.9,
  電気工事: 0.9,
  塗装: 0.9,
  溶接: 0.9,
  農業: 0.85,
  漁業: 0.85,
  畜産: 0.85,
  林業: 0.85,
  "物流・倉庫": 0.9,
  トラック運転手: 0.95,
  "配送・デリバリー": 0.95,
  ITエンジニア: 1.2,
  Web制作: 1.15,
  データ入力: 1.0,
  コールセンター: 1.0,
  "販売・小売": 1.0,
  "清掃・ビルメンテナンス": 0.95,
  警備: 0.95,
  "美容・理容": 1.05,
  日本語教師: 1.1,
  塾講師: 1.05,
  "通訳・翻訳": 1.15,
  教育補助: 1.0,
  "金融・銀行": 1.2,
  保険: 1.15,
  一般事務: 1.05,
  "経理・会計": 1.1,
  営業: 1.1,
  "エンジニア（機械）": 1.15,
  研究職: 1.2,
  コンサルタント: 1.25,
  デザイナー: 1.1,
  その他: 1.0,
};

export const regionComparisonData: {
  region: Region;
  rent: string;
  livingCost: string;
  jobAvailability: string;
  livability: string;
}[] = [
  {
    region: "東京",
    rent: "高い(8〜12万)",
    livingCost: "高い",
    jobAvailability: "多い",
    livability: "都会志向向け",
  },
  {
    region: "神奈川",
    rent: "やや高い(6〜9万)",
    livingCost: "やや高い",
    jobAvailability: "多い",
    livability: "都市と自然のバランス",
  },
  {
    region: "長野",
    rent: "安い(3〜5万)",
    livingCost: "普通",
    jobAvailability: "宿泊・観光系に強い",
    livability: "地方生活向け",
  },
  {
    region: "福岡",
    rent: "普通(4〜6万)",
    livingCost: "普通",
    jobAvailability: "外食・ITもあり",
    livability: "住みやすい",
  },
  {
    region: "北海道",
    rent: "普通(3〜5万)",
    livingCost: "普通",
    jobAvailability: "宿泊・農業系に強い",
    livability: "自然好き向け",
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80";

export const regionImages: Record<Region, string> = {
  東京: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
  神奈川:
    "https://images.unsplash.com/photo-1576675784201-0e142b423952?w=800&q=80",
  長野: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
  福岡: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
  北海道:
    "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&q=80",
};

const img = {
  care: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=80",
  food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80",
  factory: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80",
  farm: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&q=80",
  it: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80",
  office: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80",
  construction: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80",
  truck: "https://images.unsplash.com/photo-1601584115193-04ecc0da31d7?w=200&q=80",
  retail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
  education: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&q=80",
  finance: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80",
  beauty: "https://images.unsplash.com/photo-1560066984-138d9834dfe5?w=200&q=80",
  chef: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&q=80",
  fishing: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80",
};

export const jobTypeImages: Record<JobType, string> = {
  介護: img.care,
  "医療（病院事務）": img.office,
  看護助手: img.care,
  保育: img.care,
  福祉施設: img.care,
  "外食・飲食店": img.food,
  "宿泊・ホテル": img.hotel,
  "カフェ・喫茶": img.food,
  料理人: img.chef,
  製造業: img.factory,
  "建設・土木": img.construction,
  電気工事: img.construction,
  塗装: img.construction,
  溶接: img.construction,
  農業: img.farm,
  漁業: img.fishing,
  畜産: img.farm,
  林業: img.farm,
  "物流・倉庫": img.truck,
  トラック運転手: img.truck,
  "配送・デリバリー": img.truck,
  ITエンジニア: img.it,
  Web制作: img.it,
  データ入力: img.office,
  コールセンター: img.office,
  "販売・小売": img.retail,
  "清掃・ビルメンテナンス": img.office,
  警備: img.office,
  "美容・理容": img.beauty,
  日本語教師: img.education,
  塾講師: img.education,
  "通訳・翻訳": img.education,
  教育補助: img.education,
  "金融・銀行": img.finance,
  保険: img.finance,
  一般事務: img.office,
  "経理・会計": img.finance,
  営業: img.office,
  "エンジニア（機械）": img.factory,
  研究職: img.office,
  コンサルタント: img.office,
  デザイナー: img.design,
  その他: img.office,
};

export const regionImageAlt: Record<Region, string> = {
  東京: "東京の都市景観",
  神奈川: "神奈川の風景",
  長野: "長野の山岳風景",
  福岡: "福岡の街並み",
  北海道: "北海道の自然",
};

export const jobTypeImageAlt: Record<JobType, string> = {
  介護: "介護の仕事",
  "医療（病院事務）": "医療・病院事務の仕事",
  看護助手: "看護助手の仕事",
  保育: "保育の仕事",
  福祉施設: "福祉施設の仕事",
  "外食・飲食店": "外食・飲食店の仕事",
  "宿泊・ホテル": "宿泊・ホテルの仕事",
  "カフェ・喫茶": "カフェ・喫茶の仕事",
  料理人: "料理人の仕事",
  製造業: "製造業の仕事",
  "建設・土木": "建設・土木の仕事",
  電気工事: "電気工事の仕事",
  塗装: "塗装の仕事",
  溶接: "溶接の仕事",
  農業: "農業の仕事",
  漁業: "漁業の仕事",
  畜産: "畜産の仕事",
  林業: "林業の仕事",
  "物流・倉庫": "物流・倉庫の仕事",
  トラック運転手: "トラック運転手の仕事",
  "配送・デリバリー": "配送・デリバリーの仕事",
  ITエンジニア: "ITエンジニアの仕事",
  Web制作: "Web制作の仕事",
  データ入力: "データ入力の仕事",
  コールセンター: "コールセンターの仕事",
  "販売・小売": "販売・小売の仕事",
  "清掃・ビルメンテナンス": "清掃・ビルメンテナンスの仕事",
  警備: "警備の仕事",
  "美容・理容": "美容・理容の仕事",
  日本語教師: "日本語教師の仕事",
  塾講師: "塾講師の仕事",
  "通訳・翻訳": "通訳・翻訳の仕事",
  教育補助: "教育補助の仕事",
  "金融・銀行": "金融・銀行の仕事",
  保険: "保険の仕事",
  一般事務: "一般事務の仕事",
  "経理・会計": "経理・会計の仕事",
  営業: "営業の仕事",
  "エンジニア（機械）": "機械エンジニアの仕事",
  研究職: "研究職の仕事",
  コンサルタント: "コンサルタントの仕事",
  デザイナー: "デザイナーの仕事",
  その他: "その他の仕事",
};

export function isValidJobType(value: string): value is JobType {
  return allJobTypes.includes(value as JobType);
}

export function getVisaRoutes(
  japaneseLevel: JapaneseLevel,
  education: Education,
  jobType: JobType
): string[] {
  const routes: string[] = [];

  if (
    ["N4", "N3", "N2", "N1"].includes(japaneseLevel) &&
    ["高校", "専門学校", "大学", "大学院"].includes(education)
  ) {
    routes.push("特定技能");
  }
  if (["なし", "N5", "N4"].includes(japaneseLevel)) {
    routes.push("日本語学校経由");
  }
  if (["専門学校", "大学", "大学院"].includes(education)) {
    routes.push("専門学校経由");
  }
  if (traineeJobs.includes(jobType)) {
    routes.push("技能実習");
  }

  return routes;
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function workYearsToNumber(workYears: WorkYears): number {
  const map: Record<WorkYears, number> = {
    "1年": 1,
    "3年": 3,
    "5年": 5,
    "10年以上": 10,
  };
  return map[workYears];
}

export function calculateSimulation(input: SimulationInput) {
  const region = regionData[input.region];
  const baseSalary = jobSalaryData[input.jobType][input.region];
  const overtime = round(baseSalary * 0.12);
  const grossMonthly = round(baseSalary + overtime);

  const takeHomeRate =
    baseSalary >= 30
      ? 0.75
      : input.familyStatus === "家族帯同"
        ? 0.77
        : 0.78;
  const takeHome = round(grossMonthly * takeHomeRate);

  let rent = region.rent * jobRentModifier[input.jobType];
  let rentNote = "自分で借りる場合の目安";

  if (input.housing === "会社寮" && dormAvailableJobs.includes(input.jobType)) {
    rent = round(rent * 0.5);
    rentNote = "会社寮利用（通常家賃の半額）";
  } else if (input.housing === "会社寮") {
    rentNote = "この職種は会社寮が少ないため、一般家賃で計算";
  }

  if (input.familyStatus === "家族帯同") rent = round(rent * 1.6);
  if (input.lifestyle === "充実重視" && input.housing === "自分で探す") {
    rent = round(rent * 1.1);
  }
  if (input.lifestyle === "節約重視" && input.housing === "自分で探す") {
    rent = round(rent * 0.9);
  }

  const lifestyleFoodMult: Record<Lifestyle, number> = {
    節約重視: 0.85,
    普通: 1.0,
    充実重視: 1.2,
  };
  const familyFoodMult = input.familyStatus === "家族帯同" ? 1.7 : 1.0;
  const foodMult = lifestyleFoodMult[input.lifestyle] * familyFoodMult;

  const foodSelfCook = round(region.food * 0.75 * foodMult);
  const foodEatingOut = round(region.food * 1.35 * foodMult);
  const foodActive =
    input.lifestyle === "節約重視"
      ? foodSelfCook
      : input.lifestyle === "充実重視"
        ? foodEatingOut
        : round((foodSelfCook + foodEatingOut) / 2);

  const communicationBudget = 0.3;
  const communicationMajor = 0.8;
  const communicationActive =
    input.lifestyle === "節約重視"
      ? communicationBudget
      : input.lifestyle === "充実重視"
        ? communicationMajor
        : 0.5;

  const transport = round(
    region.transport + (input.familyStatus === "家族帯同" ? 0.3 : 0)
  );

  const utilityFamilyMult = input.familyStatus === "家族帯同" ? 1.3 : 1.0;
  const utilitiesSummerWinter = round(1.0 * utilityFamilyMult);
  const utilitiesSpringFall = round(0.6 * utilityFamilyMult);
  const utilitiesAverage = round(
    (utilitiesSummerWinter + utilitiesSpringFall) / 2
  );

  const lifestyleDailyMult: Record<Lifestyle, number> = {
    節約重視: 0.8,
    普通: 1.0,
    充実重視: 1.3,
  };
  const dailyGoods = round(
    0.5 *
      (input.familyStatus === "家族帯同" ? 1.4 : 1.0) *
      lifestyleDailyMult[input.lifestyle]
  );

  const healthInsuranceEstimate = round(
    employeeInsuranceJobs.includes(input.jobType) ? 0 : 1.5
  );
  const healthInsuranceNote =
    healthInsuranceEstimate === 0
      ? "社会保険加入想定（手取りに反映済み）"
      : "未加入の場合の自己負担目安";

  const totalExpenses = round(
    rent +
      foodActive +
      communicationActive +
      transport +
      utilitiesAverage +
      dailyGoods +
      healthInsuranceEstimate
  );

  const monthlySavings = round(takeHome - totalExpenses);
  const workYearsNum = workYearsToNumber(input.workYears);
  const savingsOneYear = round(monthlySavings * 12);
  const savingsTargetYears = round(monthlySavings * 12 * workYearsNum);
  const remittanceRate = input.familyStatus === "家族帯同" ? 0.5 : 0.3;
  const remittanceAmount =
    monthlySavings > 0 ? round(monthlySavings * remittanceRate) : 0;

  const requiredJapanese = jobJapaneseLevel[input.jobType];
  const visaRoutes = getVisaRoutes(
    input.japaneseLevel,
    input.education,
    input.jobType
  );

  return {
    income: {
      baseSalary,
      overtime,
      grossMonthly,
      takeHomeRate,
      takeHome,
    },
    expenses: {
      rent,
      rentNote,
      foodSelfCook,
      foodEatingOut,
      foodActive,
      communicationBudget,
      communicationMajor,
      communicationActive,
      transport,
      utilitiesSummerWinter,
      utilitiesSpringFall,
      utilitiesAverage,
      dailyGoods,
      healthInsuranceEstimate,
      healthInsuranceNote,
      totalExpenses,
    },
    savings: {
      monthlySavings,
      savingsOneYear,
      savingsTargetYears,
      workYearsNum,
      remittanceAmount,
      remittanceRate,
    },
    requiredJapanese,
    visaRoutes,
    spots: region.spots,
  };
}

export function formatManYen(value: number): string {
  const prefix = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  return `${prefix}${abs.toFixed(1).replace(/\.0$/, "")}万円`;
}

export function parseSimulationInput(params: {
  nationality?: string;
  age?: string;
  education?: string;
  japaneseLevel?: string;
  jobType?: string;
  region?: string;
  desiredSalary?: string;
  savings?: string;
  workYears?: string;
  familyStatus?: string;
  housing?: string;
  lifestyle?: string;
}): SimulationInput | null {
  const {
    nationality,
    age,
    education,
    japaneseLevel,
    jobType,
    region,
    desiredSalary,
    savings,
    workYears,
    familyStatus,
    housing,
    lifestyle,
  } = params;

  if (
    !nationality ||
    !age ||
    !education ||
    !japaneseLevel ||
    !jobType ||
    !region ||
    !desiredSalary ||
    !savings ||
    !workYears
  ) {
    return null;
  }

  if (!isValidJobType(jobType)) {
    return null;
  }

  const parsedAge = Number(age);
  const parsedSalary = Number(desiredSalary);

  if (Number.isNaN(parsedAge) || Number.isNaN(parsedSalary)) {
    return null;
  }

  return {
    nationality: nationality as Nationality,
    age: parsedAge,
    education: education as Education,
    japaneseLevel: japaneseLevel as JapaneseLevel,
    jobType,
    region: region as Region,
    desiredSalary: parsedSalary,
    savings: savings as Savings,
    workYears: workYears as WorkYears,
    familyStatus: (familyStatus as FamilyStatus) || "単身",
    housing: (housing as HousingPreference) || "自分で探す",
    lifestyle: (lifestyle as Lifestyle) || "普通",
  };
}
