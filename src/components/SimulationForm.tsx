"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  jobTypeGroups,
  prefectures,
  type CommunicationPreference,
  type Education,
  type FamilyComposition,
  type Gender,
  type HousingPreference,
  type JapaneseLevel,
  type JapaneseStudyHistory,
  type JobType,
  type Lifestyle,
  type Nationality,
  type PcSkill,
  type Purpose,
  type Qualification,
  type Savings,
  type WorkExperience,
  type WorkYears,
  type CarNeed,
} from "@/data/simulationData";

const nationalities: Nationality[] = [
  "中国", "ベトナム", "フィリピン", "インドネシア", "ネパール", "その他",
];
const educations: Education[] = ["中学", "高校", "専門学校", "大学", "大学院"];
const japaneseLevels: JapaneseLevel[] = ["なし", "N5", "N4", "N3", "N2", "N1"];
const japaneseStudyOptions: JapaneseStudyHistory[] = [
  "なし", "6ヶ月未満", "6ヶ月〜1年", "1〜2年", "2年以上",
];
const workExperienceOptions: WorkExperience[] = [
  "なし", "1年未満", "1〜3年", "3〜5年", "5年以上",
];
const qualificationOptions: Qualification[] = [
  "普通自動車免許", "大型自動車免許", "フォークリフト免許", "介護福祉士",
  "調理師免許", "溶接技能者", "電気工事士", "ITパスポート",
  "基本情報技術者", "英語（TOEIC 600点以上）", "特になし",
];
const pcSkills: PcSkill[] = ["なし", "基本操作", "Excel/Word", "プログラミング可"];
const savingsOptions: Savings[] = ["50万円未満", "50〜100万", "100〜200万", "200万以上"];
const communicationOptions: CommunicationPreference[] = [
  "格安SIM約0.3万円", "大手キャリア約0.8万円",
];
const familyOptions: FamilyComposition[] = [
  "単身", "配偶者のみ", "子供1人", "子供2人以上",
];
const housingOptions: HousingPreference[] = [
  "会社寮", "シェアハウス", "自分で賃貸を探す",
];
const lifestyleOptions: Lifestyle[] = ["節約重視", "バランス", "充実重視"];
const carOptions: CarNeed[] = ["不要", "中古車購入予定", "新車購入予定"];
const workYearsOptions: WorkYears[] = ["1年", "3年", "5年", "10年以上"];
const purposeOptions: Purpose[] = [
  "稼いで母国に送金", "日本に定住", "スキルアップ", "日本語習得", "その他",
];
const genders: Gender[] = ["男性", "女性", "回答しない"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 border-b border-navy/10 pb-2 text-sm font-semibold tracking-widest text-navy/60">
      {children}
    </p>
  );
}

export default function SimulationForm() {
  const router = useRouter();
  const [nationality, setNationality] = useState<Nationality>("ベトナム");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<Gender>("回答しない");
  const [education, setEducation] = useState<Education>("高校");
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>("N4");
  const [japaneseStudyHistory, setJapaneseStudyHistory] =
    useState<JapaneseStudyHistory>("6ヶ月〜1年");
  const [jobType, setJobType] = useState<JobType>("介護");
  const [workExperience, setWorkExperience] = useState<WorkExperience>("1〜3年");
  const [qualifications, setQualifications] = useState<Qualification[]>(["特になし"]);
  const [pcSkill, setPcSkill] = useState<PcSkill>("基本操作");
  const [prefecture, setPrefecture] = useState<(typeof prefectures)[number]>("東京都");
  const [desiredSalary, setDesiredSalary] = useState(300);
  const [savings, setSavings] = useState<Savings>("50〜100万");
  const [communicationPreference, setCommunicationPreference] =
    useState<CommunicationPreference>("格安SIM約0.3万円");
  const [familyComposition, setFamilyComposition] =
    useState<FamilyComposition>("単身");
  const [housing, setHousing] = useState<HousingPreference>("自分で賃貸を探す");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("バランス");
  const [carNeed, setCarNeed] = useState<CarNeed>("不要");
  const [workYears, setWorkYears] = useState<WorkYears>("3年");
  const [purpose, setPurpose] = useState<Purpose>("スキルアップ");

  function toggleQualification(q: Qualification) {
    if (q === "特になし") {
      setQualifications(["特になし"]);
      return;
    }
    setQualifications((prev) => {
      const filtered = prev.filter((item) => item !== "特になし");
      return filtered.includes(q)
        ? filtered.filter((item) => item !== q)
        : [...filtered, q];
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      nationality,
      age: String(age),
      gender,
      education,
      japaneseLevel,
      japaneseStudyHistory,
      jobType,
      workExperience,
      qualifications: qualifications.join(","),
      pcSkill,
      prefecture,
      desiredSalary: String(desiredSalary),
      savings,
      communicationPreference,
      familyComposition,
      housing,
      lifestyle,
      carNeed,
      workYears,
      purpose,
    });
    router.push(`/result?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <SectionTitle>基本情報</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="nationality" className="label-dark">国籍</label>
            <select id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value as Nationality)} className="input-dark">
              {nationalities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="age" className="label-dark">年齢</label>
            <input id="age" type="number" min={18} max={65} value={age} onChange={(e) => setAge(Number(e.target.value))} className="input-dark" required />
          </div>
          <div>
            <label htmlFor="gender" className="label-dark">性別</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="input-dark">
              {genders.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="education" className="label-dark">学歴</label>
            <select id="education" value={education} onChange={(e) => setEducation(e.target.value as Education)} className="input-dark">
              {educations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="japaneseLevel" className="label-dark">日本語レベル</label>
            <select id="japaneseLevel" value={japaneseLevel} onChange={(e) => setJapaneseLevel(e.target.value as JapaneseLevel)} className="input-dark">
              {japaneseLevels.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="japaneseStudyHistory" className="label-dark">日本語学習歴</label>
            <select id="japaneseStudyHistory" value={japaneseStudyHistory} onChange={(e) => setJapaneseStudyHistory(e.target.value as JapaneseStudyHistory)} className="input-dark">
              {japaneseStudyOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>職歴・スキル</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="jobType" className="label-dark">希望職種</label>
            <select id="jobType" value={jobType} onChange={(e) => setJobType(e.target.value as JobType)} className="input-dark">
              {jobTypeGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.jobs.map((item) => <option key={item} value={item}>{item}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="workExperience" className="label-dark">現在の職種・経験年数</label>
            <select id="workExperience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value as WorkExperience)} className="input-dark">
              {workExperienceOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="pcSkill" className="label-dark">PCスキル</label>
            <select id="pcSkill" value={pcSkill} onChange={(e) => setPcSkill(e.target.value as PcSkill)} className="input-dark">
              {pcSkills.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <p className="label-dark">保有資格（複数選択可）</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {qualificationOptions.map((q) => (
              <label key={q} className="flex cursor-pointer items-center gap-2 text-sm text-navy">
                <input
                  type="checkbox"
                  checked={qualifications.includes(q)}
                  onChange={() => toggleQualification(q)}
                  className="accent-gold"
                />
                {q}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>生活条件</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="prefecture" className="label-dark">希望地域（都道府県）</label>
            <select id="prefecture" value={prefecture} onChange={(e) => setPrefecture(e.target.value as typeof prefecture)} className="input-dark">
              {prefectures.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="desiredSalary" className="label-dark">
              希望年収: <span className="font-bold text-gold">{desiredSalary}万円</span>
            </label>
            <input id="desiredSalary" type="range" min={100} max={1200} step={10} value={desiredSalary} onChange={(e) => setDesiredSalary(Number(e.target.value))} className="mt-3 w-full accent-gold" />
            <div className="mt-2 flex justify-between text-xs text-navy-muted"><span>100万円</span><span>1200万円</span></div>
          </div>
          <div>
            <label htmlFor="savings" className="label-dark">貯金額</label>
            <select id="savings" value={savings} onChange={(e) => setSavings(e.target.value as Savings)} className="input-dark">
              {savingsOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="communicationPreference" className="label-dark">通信費の希望</label>
            <select id="communicationPreference" value={communicationPreference} onChange={(e) => setCommunicationPreference(e.target.value as CommunicationPreference)} className="input-dark">
              {communicationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="familyComposition" className="label-dark">家族構成</label>
            <select id="familyComposition" value={familyComposition} onChange={(e) => setFamilyComposition(e.target.value as FamilyComposition)} className="input-dark">
              {familyOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="housing" className="label-dark">住居の希望</label>
            <select id="housing" value={housing} onChange={(e) => setHousing(e.target.value as HousingPreference)} className="input-dark">
              {housingOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lifestyle" className="label-dark">生活スタイル</label>
            <select id="lifestyle" value={lifestyle} onChange={(e) => setLifestyle(e.target.value as Lifestyle)} className="input-dark">
              {lifestyleOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="carNeed" className="label-dark">車の必要性</label>
            <select id="carNeed" value={carNeed} onChange={(e) => setCarNeed(e.target.value as CarNeed)} className="input-dark">
              {carOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <p className="mt-1 text-xs text-navy-muted">※地方では車が必要な場合が多いです</p>
          </div>
          <div>
            <label htmlFor="workYears" className="label-dark">何年働きたいか</label>
            <select id="workYears" value={workYears} onChange={(e) => setWorkYears(e.target.value as WorkYears)} className="input-dark">
              {workYearsOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="purpose" className="label-dark">日本に来る目的</label>
            <select id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value as Purpose)} className="input-dark">
              {purposeOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full px-6 py-4 text-base tracking-widest">
        シミュレーション開始
      </button>
    </form>
  );
}
