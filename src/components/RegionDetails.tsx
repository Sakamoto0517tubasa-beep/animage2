import type { PrefectureInfo } from "@/data/prefectureData";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy/5 py-2 text-sm">
      <span className="text-navy-muted">{label}</span>
      <span className="font-medium text-navy">{value}</span>
    </div>
  );
}

export default function RegionDetails({ detail }: { detail: PrefectureInfo }) {
  return (
    <div className="glass-card px-8 py-8 sm:px-10">
      <h2 className="section-heading mb-6">地域の詳細情報</h2>
      <InfoRow label="地域の特徴" value={detail.characteristic} />
      <InfoRow label="外国人住民比率" value={detail.foreignResidentRatio} />
      <InfoRow label="多言語対応サービス" value={detail.multilingualSupport} />
      <InfoRow label="冬の寒さ" value={detail.winterSeverity} />
      <InfoRow label="公共交通機関" value={detail.publicTransport} />
      <InfoRow label="外国人コミュニティ" value={detail.foreignCommunity} />
      <div className="mt-4 rounded-xl bg-gold/10 p-4">
        <p className="text-sm font-semibold text-navy">おすすめポイント</p>
        <p className="mt-1 text-sm text-navy-muted">{detail.recommendation}</p>
      </div>
      <div className="mt-3 rounded-xl border border-navy/10 p-4">
        <p className="text-sm font-semibold text-navy">注意点</p>
        <p className="mt-1 text-sm text-navy-muted">{detail.caution}</p>
      </div>
    </div>
  );
}
