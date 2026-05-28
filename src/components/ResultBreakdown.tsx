import { formatManYen } from "@/data/simulationData";
import type { calculateSimulation } from "@/data/simulationCalc";

type SimulationResult = ReturnType<typeof calculateSimulation>;

function Row({
  label,
  value,
  note,
  large,
}: {
  label: string;
  value: string;
  note?: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="financial-label">{label}</p>
        {note && <p className="financial-note">{note}</p>}
      </div>
      <p className={large ? "stat-value-sm shrink-0" : "text-lg font-semibold text-navy shrink-0"}>
        {value}
      </p>
    </div>
  );
}

export default function ResultBreakdown({ result }: { result: SimulationResult }) {
  const { income, expenses, savings } = result;

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">収入シミュレーション</h2>
        <Row label="基本給（月収）" value={`約${formatManYen(income.baseSalary)}`} />
        <Row label="残業代" value={`約${formatManYen(income.overtime)}`} note="月20時間・時給×1.25×20時間" />
        <Row label="交通費支給（会社負担）" value={`約${formatManYen(income.commuteAllowance)}`} note="月1〜3万円の目安" />
        <Row label="総支給額" value={`約${formatManYen(income.grossMonthly)}`} note="基本給＋残業代" large />
        <Row label="健康保険（4.99%）" value={`約${formatManYen(income.healthIns)}`} />
        <Row label="厚生年金（9.15%）" value={`約${formatManYen(income.pension)}`} />
        <Row label="雇用保険（0.6%）" value={`約${formatManYen(income.employmentIns)}`} />
        <Row label="社会保険料合計" value={`約${formatManYen(income.socialInsurance)}`} note="約14.7%" />
        <Row label="所得税" value={`約${formatManYen(income.incomeTax)}`} note="課税所得に応じて5〜20%" />
        <Row label="住民税" value={`約${formatManYen(income.residentTax)}`} note="初年度は0円" />
        <div className="mt-4 border-t border-navy/8 pt-6">
          <p className="financial-label mb-2">手取り月収</p>
          <p className="stat-value">約{formatManYen(income.takeHome)}</p>
        </div>
      </div>

      <div className="px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">支出シミュレーション（詳細）</h2>
        <Row label="家賃" value={`約${formatManYen(expenses.rent)}`} note={expenses.rentNote} />
        <Row label="食費" value={`約${formatManYen(expenses.food)}`} />
        <Row label="光熱費（電気・ガス・水道）" value={`約${formatManYen(expenses.utilities)}`} />
        <Row label="通信費" value={`約${formatManYen(expenses.communication)}`} />
        <Row label="交通費（通勤）" value={`約${formatManYen(expenses.transport)}`} />
        <Row label="車関連費用" value={`約${formatManYen(expenses.car)}`} />
        <Row label="日用品・雑費" value={`約${formatManYen(expenses.dailyGoods)}`} />
        <Row label="娯楽・交際費" value={`約${formatManYen(expenses.entertainment)}`} />
        <Row label="家族追加費用" value={`約${formatManYen(expenses.familyCost)}`} />
        <Row
          label="国民健康保険"
          value={expenses.healthInsuranceEstimate === 0 ? "加入済み" : `約${formatManYen(expenses.healthInsuranceEstimate)}`}
          note={expenses.healthInsuranceNote}
        />
        <div className="mt-4 border-t border-navy/8 pt-6">
          <p className="financial-label mb-2">月の総支出</p>
          <p className="stat-value">約{formatManYen(expenses.totalExpenses)}</p>
        </div>
      </div>

      <div className="bg-navy/5 px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">手元に残る金額の内訳</h2>
        <Row label="月の手取り" value={`約${formatManYen(savings.takeHome)}`} large />
        <Row label="月の総支出" value={`約${formatManYen(savings.totalExpenses)}`} large />
        <Row label="月の貯金額" value={`約${formatManYen(savings.monthlySavings)}`} large />
        <Row label="年間貯金額" value={`約${formatManYen(savings.savingsOneYear)}`} large />
        <Row label="1年後の総資産" value={`約${formatManYen(savings.assetsOneYear)}`} note="現在の貯金＋年間貯金" />
        <Row label="3年後の総資産" value={`約${formatManYen(savings.assetsThreeYears)}`} />
        <Row label="5年後の総資産" value={`約${formatManYen(savings.assetsFiveYears)}`} />
        <Row label="母国への送金可能額" value={`約${formatManYen(savings.remittanceAmount)}`} note="月の貯金の50%と仮定" />
        <div className="mt-4 rounded-xl bg-gold/10 p-4">
          <p className="text-sm font-semibold text-navy">目的別アドバイス</p>
          <p className="mt-2 text-sm leading-relaxed text-navy-muted">{savings.purposeAdvice}</p>
        </div>
      </div>
    </div>
  );
}
