import type {
  Education,
  JapaneseLevel,
  JobType,
  Savings,
  WorkExperience,
} from "./simulationData";

export type VisaPurpose =
  | "稼いで母国に送金"
  | "日本に定住"
  | "スキルアップ"
  | "日本語習得"
  | "その他";

export type VisaRouteDetail = {
  id: string;
  name: string;
  conditions: string;
  merits: string;
  demerits: string;
  eligible: boolean;
};

export type DetailedVisaRouteInput = {
  japaneseLevel: JapaneseLevel;
  education: Education;
  jobType: JobType;
  age: number;
  savings: Savings;
  workExperience: WorkExperience;
  desiredSalary: number;
  purpose: VisaPurpose;
};

const SPECIFIED_SKILL_1_JOBS: JobType[] = [
  "介護",
  "外食・飲食店",
  "カフェ・喫茶",
  "料理人",
  "製造業",
  "宿泊・ホテル",
  "農業",
  "建設・土木",
  "電気工事",
  "塗装",
  "溶接",
  "漁業",
  "畜産",
  "林業",
  "物流・倉庫",
];

const TRAINEE_JOBS: JobType[] = [
  "製造業",
  "農業",
  "介護",
  "建設・土木",
  "電気工事",
  "塗装",
  "溶接",
  "漁業",
  "料理人",
  "畜産",
];

const HIGHLY_SKILLED_JOBS: JobType[] = [
  "ITエンジニア",
  "Web制作",
  "研究職",
  "金融・銀行",
  "保険",
  "コンサルタント",
  "エンジニア（機械）",
  "経理・会計",
  "通訳・翻訳",
];

const JAPANESE_LEVEL_RANK: Record<JapaneseLevel, number> = {
  なし: 0,
  N5: 1,
  N4: 2,
  N3: 3,
  N2: 4,
  N1: 5,
};

const SAVINGS_RANK: Record<Savings, number> = {
  "50万円未満": 0,
  "50〜100万": 1,
  "100〜200万": 2,
  "200万以上": 3,
};

const WORK_EXPERIENCE_RANK: Record<WorkExperience, number> = {
  なし: 0,
  "1年未満": 0.5,
  "1〜3年": 2,
  "3〜5年": 4,
  "5年以上": 6,
};

function hasJapaneseLevel(
  level: JapaneseLevel,
  minimum: JapaneseLevel
): boolean {
  return JAPANESE_LEVEL_RANK[level] >= JAPANESE_LEVEL_RANK[minimum];
}

function hasSavings(savings: Savings, minimum: Savings): boolean {
  return SAVINGS_RANK[savings] >= SAVINGS_RANK[minimum];
}

function hasWorkExperience(
  workExperience: WorkExperience,
  minimumYears: number
): boolean {
  return WORK_EXPERIENCE_RANK[workExperience] >= minimumYears;
}

const visaRouteTemplates: Omit<VisaRouteDetail, "eligible">[] = [
  {
    id: "specified-skilled-worker-1",
    name: "特定技能1号",
    conditions:
      "N4以上・対象分野の技能試験または評価試験合格・18歳以上。在留期間は最長5年。",
    merits:
      "比較的取得しやすく、同分野内での転職も可能。日本語と技能を活かしてすぐ働き始められる。",
    demerits:
      "家族帯同は原則不可。在留期間に上限があり、長期定住には次のステップが必要。",
  },
  {
    id: "specified-skilled-worker-2",
    name: "特定技能2号",
    conditions:
      "N3以上・実務経験3年以上・特定技能2号試験合格。1号からのステップアップが一般的。",
    merits:
      "在留期間の上限なし（無期限更新可能）。家族帯同も可能で、定住を見据えやすい。",
    demerits:
      "試験難易度が高く、評価試験と実務実績の両方が求められる。",
  },
  {
    id: "technical-intern-training",
    name: "技能実習",
    conditions:
      "対象は製造・農業・介護・建設・漁業・食品製造など。日本語はN5程度からスタート可能。",
    merits:
      "日本語のハードルが比較的低く、住居提供や生活サポートがあるケースが多い。",
    demerits:
      "原則転職不可。在留期間は3〜5年が目安で、技能と日本語の習得が主目的。",
  },
  {
    id: "japanese-language-school",
    name: "日本語学校経由",
    conditions:
      "N3未満でも申し込み可能。就学・生活費として貯金100万円以上が推奨される。",
    merits:
      "日本語を学びながら就職活動や進学先を探せる。希望職種に合わせた準備期間を確保できる。",
    demerits:
      "年間100〜150万円程度の学費・生活費がかかる。就労ビザ取得まで時間がかかる。",
  },
  {
    id: "vocational-university",
    name: "専門学校・大学経由",
    conditions:
      "高校卒以上。N2以上と貯金200万円以上が推奨。専門分野の入学試験・面接あり。",
    merits:
      "専門スキルと日本語を体系的に学べ、就職・高度人材ルートへの道が開きやすい。",
    demerits:
      "学費・生活費の負担が大きく、卒業まで2〜4年程度かかる。",
  },
  {
    id: "highly-skilled-professional",
    name: "高度専門職",
    conditions:
      "大学卒以上。IT・研究・金融など高度専門分野でN2以上・年収400万円以上見込み。",
    merits:
      "最短1年で永住権申請の目安に到達可能。家族帯同もしやすく、キャリア自由度が高い。",
    demerits:
      "高い学歴・専門性・年収が必要。ポイント計算や書類準備のハードルが高い。",
  },
  {
    id: "business-manager",
    name: "経営管理ビザ",
    conditions:
      "500万円以上の資本金または2名以上の常勤雇用・事業計画書・事業所の確保が必要。",
    merits:
      "自分の事業を日本で運営できる。法人設立や店舗経営など独立の選択肢がある。",
    demerits:
      "初期資金と事業経験が必要。継続的な経営実績が求められ、更新審査も厳しい。",
  },
];

function isSpecifiedSkill1Eligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 18 &&
    hasJapaneseLevel(input.japaneseLevel, "N4") &&
    SPECIFIED_SKILL_1_JOBS.includes(input.jobType)
  );
}

function isSpecifiedSkill2Eligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 18 &&
    hasJapaneseLevel(input.japaneseLevel, "N3") &&
    hasWorkExperience(input.workExperience, 3) &&
    SPECIFIED_SKILL_1_JOBS.includes(input.jobType)
  );
}

function isTraineeEligible(input: DetailedVisaRouteInput): boolean {
  return input.age >= 18 && TRAINEE_JOBS.includes(input.jobType);
}

function isLanguageSchoolEligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 18 &&
    !hasJapaneseLevel(input.japaneseLevel, "N3") &&
    (hasSavings(input.savings, "100〜200万") ||
      input.purpose === "日本語習得" ||
      input.purpose === "スキルアップ")
  );
}

function isVocationalUniversityEligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 18 &&
    ["高校", "専門学校", "大学", "大学院"].includes(input.education) &&
    (hasJapaneseLevel(input.japaneseLevel, "N2") ||
      hasSavings(input.savings, "200万以上") ||
      input.purpose === "スキルアップ" ||
      input.purpose === "日本に定住")
  );
}

function isHighlySkilledEligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 18 &&
    ["大学", "大学院"].includes(input.education) &&
    hasJapaneseLevel(input.japaneseLevel, "N2") &&
    input.desiredSalary >= 400 &&
    HIGHLY_SKILLED_JOBS.includes(input.jobType)
  );
}

function isBusinessManagerEligible(input: DetailedVisaRouteInput): boolean {
  return (
    input.age >= 20 &&
    hasSavings(input.savings, "200万以上") &&
    (input.purpose === "その他" ||
      input.purpose === "日本に定住" ||
      input.purpose === "スキルアップ")
  );
}

const eligibilityChecks: Record<
  string,
  (input: DetailedVisaRouteInput) => boolean
> = {
  "specified-skilled-worker-1": isSpecifiedSkill1Eligible,
  "specified-skilled-worker-2": isSpecifiedSkill2Eligible,
  "technical-intern-training": isTraineeEligible,
  "japanese-language-school": isLanguageSchoolEligible,
  "vocational-university": isVocationalUniversityEligible,
  "highly-skilled-professional": isHighlySkilledEligible,
  "business-manager": isBusinessManagerEligible,
};

export function getDetailedVisaRoutes(
  input: DetailedVisaRouteInput
): VisaRouteDetail[] {
  return visaRouteTemplates.map((route) => ({
    ...route,
    eligible: eligibilityChecks[route.id]?.(input) ?? false,
  }));
}
