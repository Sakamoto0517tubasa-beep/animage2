import Link from "next/link";
import JobTypeIcon from "@/components/JobTypeIcon";
import AffiliateBanner2 from "@/components/AffiliateBanner2";
import PageContainer from "@/components/PageContainer";
import RakutenAffiliateBanner from "@/components/RakutenAffiliateBanner";
import RegionBanner from "@/components/RegionBanner";
import ResultBreakdown from "@/components/ResultBreakdown";
import {
  calculateSimulation,
  parseSimulationInput,
} from "@/data/simulationData";

type SearchParams = {
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
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const input = parseSimulationInput(params);

  if (!input) {
    return (
      <PageContainer>
        <div className="glass-card p-10 text-center">
          <p className="mb-6 text-navy-muted">
            入力データが不足しています。最初からやり直してください。
          </p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">
            入力画面に戻る
          </Link>
        </div>
      </PageContainer>
    );
  }

  const result = calculateSimulation(input);

  return (
    <PageContainer>
      <div className="space-y-12">
        <div>
          <div className="mb-8 flex items-start gap-4">
            <JobTypeIcon jobType={input.jobType} />
            <div>
              <h1 className="section-title">
                あなたが{input.region}の{input.jobType}で働いた場合
              </h1>
              <div className="gold-accent-line" />
              <p className="section-subtitle">
                {input.nationality}・{input.age}歳・日本語{input.japaneseLevel}
                ・{input.familyStatus}・{input.housing}・{input.lifestyle}
              </p>
            </div>
          </div>
          <RegionBanner region={input.region} />
        </div>

        <ResultBreakdown result={result} />

        <RakutenAffiliateBanner />

        <div className="glass-card px-8 py-8 sm:px-10">
          <h2 className="section-heading mb-3">必要な日本語レベル</h2>
          <p className="stat-value-sm">{result.requiredJapanese}</p>
        </div>

        <div className="glass-card px-8 py-8 sm:px-10">
          <h2 className="section-heading mb-4">向いている来日ルート</h2>
          {result.visaRoutes.length > 0 ? (
            <ul className="flex flex-wrap gap-3">
              {result.visaRoutes.map((route) => (
                <li key={route} className="tag-gold">
                  {route}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-navy-muted">
              該当するルートが見つかりませんでした。条件を見直してください。
            </p>
          )}
        </div>

        <AffiliateBanner2 />

        <div className="glass-card px-8 py-8 sm:px-10">
          <h2 className="section-heading mb-3">休日の過ごし方</h2>
          <p className="leading-relaxed text-navy-muted">
            {input.region}のおすすめスポット:{" "}
            <span className="font-medium text-navy">{result.spots}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn-secondary flex-1 px-6 py-4 text-center tracking-wide"
          >
            条件を変更する
          </Link>
          <Link
            href="/compare"
            className="btn-primary flex-1 px-6 py-4 text-center tracking-wide"
          >
            地域を比較する
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
