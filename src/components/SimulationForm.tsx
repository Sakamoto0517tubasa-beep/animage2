"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  jobTypeGroups,
  type Education,
  type FamilyStatus,
  type HousingPreference,
  type JapaneseLevel,
  type JobType,
  type Lifestyle,
  type Nationality,
  type Region,
  type Savings,
  type WorkYears,
} from "@/data/simulationData";

const nationalities: Nationality[] = [
  "中国",
  "ベトナム",
  "フィリピン",
  "インドネシア",
  "ネパール",
  "その他",
];

const educations: Education[] = [
  "中学",
  "高校",
  "専門学校",
  "大学",
  "大学院",
];

const japaneseLevels: JapaneseLevel[] = [
  "なし",
  "N5",
  "N4",
  "N3",
  "N2",
  "N1",
];

const regions: Region[] = ["東京", "神奈川", "長野", "福岡", "北海道"];

const savingsOptions: Savings[] = [
  "50万円未満",
  "50〜100万",
  "100〜200万",
  "200万以上",
];

const workYearsOptions: WorkYears[] = ["1年", "3年", "5年", "10年以上"];

const familyOptions: FamilyStatus[] = ["単身", "家族帯同"];

const housingOptions: HousingPreference[] = ["会社寮", "自分で探す"];

const lifestyleOptions: Lifestyle[] = ["節約重視", "普通", "充実重視"];

export default function SimulationForm() {
  const router = useRouter();
  const [nationality, setNationality] = useState<Nationality>("ベトナム");
  const [age, setAge] = useState(25);
  const [education, setEducation] = useState<Education>("高校");
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>("N4");
  const [jobType, setJobType] = useState<JobType>("介護");
  const [region, setRegion] = useState<Region>("東京");
  const [desiredSalary, setDesiredSalary] = useState(250);
  const [savings, setSavings] = useState<Savings>("50〜100万");
  const [workYears, setWorkYears] = useState<WorkYears>("3年");
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>("単身");
  const [housing, setHousing] = useState<HousingPreference>("自分で探す");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("普通");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      nationality,
      age: String(age),
      education,
      japaneseLevel,
      jobType,
      region,
      desiredSalary: String(desiredSalary),
      savings,
      workYears,
      familyStatus,
      housing,
      lifestyle,
    });

    router.push(`/result?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="nationality" className="label-dark">
            国籍
          </label>
          <select
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value as Nationality)}
            className="input-dark"
          >
            {nationalities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="age" className="label-dark">
            年齢
          </label>
          <input
            id="age"
            type="number"
            min={18}
            max={65}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="input-dark"
            required
          />
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="education" className="label-dark">
            学歴
          </label>
          <select
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value as Education)}
            className="input-dark"
          >
            {educations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="japaneseLevel" className="label-dark">
            日本語レベル
          </label>
          <select
            id="japaneseLevel"
            value={japaneseLevel}
            onChange={(e) => setJapaneseLevel(e.target.value as JapaneseLevel)}
            className="input-dark"
          >
            {japaneseLevels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="jobType" className="label-dark">
            希望職種
          </label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value as JobType)}
            className="input-dark"
          >
            {jobTypeGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.jobs.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="region" className="label-dark">
            希望地域
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="input-dark"
          >
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="desiredSalary" className="label-dark">
          希望年収:{" "}
          <span className="font-bold text-gold">{desiredSalary}万円</span>
        </label>
        <input
          id="desiredSalary"
          type="range"
          min={150}
          max={400}
          step={10}
          value={desiredSalary}
          onChange={(e) => setDesiredSalary(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-2 flex justify-between text-xs tracking-wide text-navy-muted">
          <span>150万円</span>
          <span>400万円</span>
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="savings" className="label-dark">
            貯金額
          </label>
          <select
            id="savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value as Savings)}
            className="input-dark"
          >
            {savingsOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="workYears" className="label-dark">
            何年働きたいか
          </label>
          <select
            id="workYears"
            value={workYears}
            onChange={(e) => setWorkYears(e.target.value as WorkYears)}
            className="input-dark"
          >
            {workYearsOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-navy/8 pt-7">
        <p className="mb-5 text-sm font-semibold tracking-widest text-navy/60">
          生活条件
        </p>
        <div className="grid gap-7 sm:grid-cols-3">
          <div>
            <label htmlFor="familyStatus" className="label-dark">
              家族の有無
            </label>
            <select
              id="familyStatus"
              value={familyStatus}
              onChange={(e) =>
                setFamilyStatus(e.target.value as FamilyStatus)
              }
              className="input-dark"
            >
              {familyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="housing" className="label-dark">
              住居の希望
            </label>
            <select
              id="housing"
              value={housing}
              onChange={(e) => setHousing(e.target.value as HousingPreference)}
              className="input-dark"
            >
              {housingOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lifestyle" className="label-dark">
              生活スタイル
            </label>
            <select
              id="lifestyle"
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value as Lifestyle)}
              className="input-dark"
            >
              {lifestyleOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary mt-4 w-full px-6 py-4 text-base tracking-widest"
      >
        シミュレーション開始
      </button>
    </form>
  );
}
