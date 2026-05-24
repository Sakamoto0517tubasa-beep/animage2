import { formatManYen } from "@/data/simulationData";
import type { calculateSimulation } from "@/data/simulationData";

type SimulationResult = ReturnType<typeof calculateSimulation>;

type FinancialRowProps = {
  label: string;
  value: string;
  note?: string;
  large?: boolean;
};

function FinancialRow({ label, value, note, large }: FinancialRowProps) {
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

type ResultBreakdownProps = {
  result: SimulationResult;
};

export default function ResultBreakdown({ result }: ResultBreakdownProps) {
  const { income, expenses, savings } = result;
  const takeHomePercent = Math.round(income.takeHomeRate * 100);

  return (
    <div className="glass-card overflow-hidden">
      {/* 収入 */}
      <div className="px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">収入</h2>
        <FinancialRow
          label="月収目安（基本給）"
          value={`約${formatManYen(income.baseSalary)}`}
        />
        <FinancialRow
          label="残業代目安"
          value={`約${formatManYen(income.overtime)}`}
          note="月20時間の残業を想定"
        />
        <div className="mt-4 border-t border-navy/8 pt-6">
          <p className="financial-label mb-2">手取り月収</p>
          <p className="stat-value">約{formatManYen(income.takeHome)}</p>
          <p className="financial-note mt-2">
            社会保険・税金引後（総支給の約{takeHomePercent}%）
          </p>
        </div>
      </div>

      {/* 支出 */}
      <div className="px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">支出の詳細</h2>
        <FinancialRow
          label="家賃"
          value={`約${formatManYen(expenses.rent)}`}
          note={expenses.rentNote}
        />
        <FinancialRow
          label="食費（自炊想定）"
          value={`約${formatManYen(expenses.foodSelfCook)}`}
        />
        <FinancialRow
          label="食費（外食多め）"
          value={`約${formatManYen(expenses.foodEatingOut)}`}
        />
        <FinancialRow
          label="通信費（格安SIM）"
          value={`約${formatManYen(expenses.communicationBudget)}`}
        />
        <FinancialRow
          label="通信費（大手キャリア）"
          value={`約${formatManYen(expenses.communicationMajor)}`}
        />
        <FinancialRow
          label="交通費"
          value={`約${formatManYen(expenses.transport)}`}
          note="通勤定期代"
        />
        <FinancialRow
          label="光熱費（夏・冬）"
          value={`約${formatManYen(expenses.utilitiesSummerWinter)}`}
        />
        <FinancialRow
          label="光熱費（春・秋）"
          value={`約${formatManYen(expenses.utilitiesSpringFall)}`}
        />
        <FinancialRow
          label="日用品・雑費"
          value={`約${formatManYen(expenses.dailyGoods)}`}
        />
        <FinancialRow
          label="国民健康保険"
          value={
            expenses.healthInsuranceEstimate === 0
              ? "加入済み"
              : `約${formatManYen(expenses.healthInsuranceEstimate)}`
          }
          note={expenses.healthInsuranceNote}
        />
        <div className="mt-4 border-t border-navy/8 pt-6">
          <p className="financial-label mb-2">月間支出合計（生活スタイル反映）</p>
          <p className="stat-value">約{formatManYen(expenses.totalExpenses)}</p>
        </div>
      </div>

      {/* 貯金シミュレーション */}
      <div className="bg-navy/5 px-8 py-8 sm:px-10">
        <h2 className="section-heading mb-6">貯金シミュレーション</h2>
        <FinancialRow
          label="月の貯金額"
          value={`約${formatManYen(savings.monthlySavings)}`}
          large
        />
        <FinancialRow
          label="1年後の貯金額"
          value={`約${formatManYen(savings.savingsOneYear)}`}
          large
        />
        <FinancialRow
          label={`${savings.workYearsNum}年後の貯金額`}
          value={`約${formatManYen(savings.savingsTargetYears)}`}
          note="「何年働きたいか」の入力値に基づく"
          large
        />
        <div className="mt-4 border-t border-gold/20 pt-6">
          <p className="financial-label mb-2">母国への送金可能額目安</p>
          <p className="stat-value">約{formatManYen(savings.remittanceAmount)}</p>
          <p className="financial-note mt-2">
            月の貯金額の約{Math.round(savings.remittanceRate * 100)}%を送金想定
          </p>
        </div>
      </div>
    </div>
  );
}
