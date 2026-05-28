import { getDetailedVisaRoutes } from "./visaRouteData";
import { getJobDetail } from "./jobDetailData";
import {
  prefectureInfo,
  type Prefecture,
  getCalculationRegion,
} from "./prefectureData";
import type {
  SimulationInput,
  JobType,
  Savings,
  WorkYears,
} from "./simulationData";
import {
  jobSalaryData,
  regionData,
  jobJapaneseLevel,
  dormAvailableJobs,
  jobRentModifier,
  employeeInsuranceJobs,
} from "./simulationData";

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

function savingsToAmount(savings: Savings): number {
  const map: Record<Savings, number> = {
    "50万円未満": 25,
    "50〜100万": 75,
    "100〜200万": 150,
    "200万以上": 250,
  };
  return map[savings];
}

function incomeTaxRate(monthlyTaxable: number): number {
  const annual = monthlyTaxable * 12;
  if (annual >= 1200) return 0.2;
  if (annual >= 900) return 0.15;
  if (annual >= 600) return 0.1;
  return 0.05;
}

function transportAllowance(calcRegion: string): number {
  if (calcRegion === "東京") return 2.5;
  if (calcRegion === "神奈川") return 2.0;
  if (calcRegion === "福岡") return 1.5;
  if (calcRegion === "北海道") return 1.5;
  return 1.0;
}

function hasFamilyMembers(family: SimulationInput["familyComposition"]): boolean {
  return family !== "単身";
}

function familyExtraCost(family: SimulationInput["familyComposition"]): number {
  if (family === "配偶者のみ") return 3;
  if (family === "子供1人") return 5;
  if (family === "子供2人以上") return 8;
  return 0;
}

function purposeAdvice(
  purpose: SimulationInput["purpose"],
  workYearsNum: number,
  monthlySavings: number,
  remittanceAmount: number,
  jobType: JobType,
  prefecture: Prefecture
): string {
  const annualRemittance = remittanceAmount * 12;
  const totalRemittance = annualRemittance * workYearsNum;

  switch (purpose) {
    case "稼いで母国に送金":
      return `${workYearsNum}年で約${Math.max(0, Math.round(totalRemittance))}万円の送金が可能な見込みです。`;
    case "日本に定住":
      return `${workYearsNum}年後に永住権申請の目安（10年居住）に向けて、${prefecture}での継続就労が鍵となります。`;
    case "スキルアップ":
      return `${prefecture}の${jobType}はキャリアアップ${jobType.includes("IT") || jobType.includes("研究") ? "の可能性が高い" : "は着実に積み上げられる"}分野です。`;
    case "日本語習得":
      return `${prefecture}での生活と職場経験を通じ、実務日本語力の向上が期待できます。`;
    default:
      return "目的に合わせて、収支と在留ルートを継続的に見直すことをおすすめします。";
  }
}

export function calculateSimulation(input: SimulationInput) {
  const pref = prefectureInfo[input.prefecture];
  const calcRegion = getCalculationRegion(input.prefecture);
  const region = regionData[calcRegion];

  const baseSalary = jobSalaryData[input.jobType][calcRegion];
  const hourlyRate = baseSalary / 160;
  const overtime = round(hourlyRate * 1.25 * 20);
  const commuteAllowance = transportAllowance(calcRegion);
  const grossMonthly = round(baseSalary + overtime);

  const socialInsurance = round(grossMonthly * 0.147);
  const healthIns = round(grossMonthly * 0.0499);
  const pension = round(grossMonthly * 0.0915);
  const employmentIns = round(grossMonthly * 0.006);

  const taxableMonthly = grossMonthly - socialInsurance;
  const incomeTax = round(taxableMonthly * incomeTaxRate(taxableMonthly));
  const residentTax = 0;
  const takeHome = round(grossMonthly - socialInsurance - incomeTax - residentTax);

  let baseRent =
    region.rent * jobRentModifier[input.jobType] * pref.rentModifier;
  let rentNote = "賃貸（100%）";

  if (input.housing === "会社寮") {
    if (dormAvailableJobs.includes(input.jobType)) {
      baseRent = round(baseRent * 0.5);
      rentNote = "会社寮（基本家賃×50%）";
    } else {
      rentNote = "会社寮希望だが該当少ないため賃貸想定";
    }
  } else if (input.housing === "シェアハウス") {
    baseRent = round(baseRent * 0.7);
    rentNote = "シェアハウス（基本家賃×70%）";
  } else {
    rentNote = "賃貸（基本家賃×100%）";
  }
  const rent = baseRent;

  const lifestyleFoodMult: Record<SimulationInput["lifestyle"], number> = {
    節約重視: 0.8,
    バランス: 1.0,
    充実重視: 1.3,
  };
  const food = round(region.food * lifestyleFoodMult[input.lifestyle]);

  const utilities = hasFamilyMembers(input.familyComposition) ? 1.5 : 0.8;

  const communication =
    input.communicationPreference === "格安SIM約0.3万円" ? 0.3 : 0.8;

  const transport = round(region.transport);

  const carCost: Record<SimulationInput["carNeed"], number> = {
    不要: 0,
    中古車購入予定: 3,
    新車購入予定: 5,
  };
  const car = carCost[input.carNeed];

  const dailyGoods = 0.5;

  const entertainmentMult: Record<SimulationInput["lifestyle"], number> = {
    節約重視: 0.5,
    バランス: 1.5,
    充実重視: 3.0,
  };
  const entertainment = entertainmentMult[input.lifestyle];

  const familyCost = familyExtraCost(input.familyComposition);

  const hasEmployeeInsurance = employeeInsuranceJobs.includes(input.jobType);
  const healthInsuranceEstimate = hasEmployeeInsurance ? 0 : 1.5;
  const healthInsuranceNote = hasEmployeeInsurance
    ? "社会保険加入想定（手取り計算に反映済み）"
    : "未加入の場合の自己負担目安（月1〜2万円）";

  const totalExpenses = round(
    rent +
      food +
      utilities +
      communication +
      transport +
      car +
      dailyGoods +
      entertainment +
      familyCost +
      healthInsuranceEstimate
  );

  const monthlySavings = round(takeHome - totalExpenses);
  const currentSavings = savingsToAmount(input.savings);
  const savingsOneYear = round(monthlySavings * 12);
  const assetsOneYear = round(currentSavings + savingsOneYear);
  const assetsThreeYears = round(currentSavings + monthlySavings * 12 * 3);
  const assetsFiveYears = round(currentSavings + monthlySavings * 12 * 5);
  const workYearsNum = workYearsToNumber(input.workYears);
  const remittanceAmount =
    monthlySavings > 0 ? round(monthlySavings * 0.5) : 0;

  const visaRoutes = getDetailedVisaRoutes({
    japaneseLevel: input.japaneseLevel,
    education: input.education,
    jobType: input.jobType,
    age: input.age,
    savings: input.savings,
    workExperience: input.workExperience,
    desiredSalary: input.desiredSalary,
    purpose: input.purpose,
  });

  const jobDetail = getJobDetail(input.jobType);
  const prefectureDetail = pref;

  return {
    income: {
      baseSalary,
      hourlyRate: round(hourlyRate),
      overtime,
      commuteAllowance,
      grossMonthly,
      healthIns,
      pension,
      employmentIns,
      socialInsurance,
      incomeTax,
      residentTax,
      takeHome,
    },
    expenses: {
      rent,
      rentNote,
      food,
      utilities,
      communication,
      transport,
      car,
      dailyGoods,
      entertainment,
      familyCost,
      healthInsuranceEstimate,
      healthInsuranceNote,
      totalExpenses,
    },
    savings: {
      takeHome,
      totalExpenses,
      monthlySavings,
      savingsOneYear,
      currentSavings,
      assetsOneYear,
      assetsThreeYears,
      assetsFiveYears,
      workYearsNum,
      remittanceAmount,
      purposeAdvice: purposeAdvice(
        input.purpose,
        workYearsNum,
        monthlySavings,
        remittanceAmount,
        input.jobType,
        input.prefecture
      ),
    },
    requiredJapanese: jobJapaneseLevel[input.jobType],
    visaRoutes,
    jobDetail,
    prefectureDetail,
    calcRegion,
    spots: pref.spots,
  };
}
