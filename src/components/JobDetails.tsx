import type { JobDetail } from "@/data/jobDetailData";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy/5 py-2 text-sm">
      <span className="text-navy-muted">{label}</span>
      <span className="font-medium text-navy">{value}</span>
    </div>
  );
}

export default function JobDetails({ detail, jobType }: { detail: JobDetail; jobType: string }) {
  return (
    <div className="glass-card px-8 py-8 sm:px-10">
      <h2 className="section-heading mb-3">職種別詳細情報（{jobType}）</h2>
      <p className="mb-6 leading-relaxed text-navy-muted">{detail.description}</p>
      <InfoRow label="必要な体力" value={detail.physicalDemand} />
      <InfoRow label="シフト制" value={detail.hasShift} />
      <InfoRow label="夜勤" value={detail.hasNightShift} />
      <InfoRow label="キャリアアップ可能性" value={detail.careerGrowth} />
      <InfoRow label="外国人採用実績" value={detail.foreignHiring} />
      <InfoRow label="日本語使用頻度" value={detail.japaneseUsage} />
    </div>
  );
}
