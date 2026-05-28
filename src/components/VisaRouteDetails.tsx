import type { VisaRouteDetail } from "@/data/simulationData";

export default function VisaRouteDetails({ routes }: { routes: VisaRouteDetail[] }) {
  const eligible = routes.filter((r) => r.eligible);
  const others = routes.filter((r) => !r.eligible);

  return (
    <div className="glass-card px-8 py-8 sm:px-10">
      <h2 className="section-heading mb-6">来日ルート詳細判定</h2>
      {eligible.length > 0 ? (
        <div className="space-y-6">
          {eligible.map((route) => (
            <div key={route.id} className="rounded-xl border border-gold/30 bg-gold/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="tag-gold">{route.name}</span>
                <span className="text-xs font-medium text-green-700">該当</span>
              </div>
              <p className="text-sm text-navy-muted"><span className="font-medium text-navy">条件：</span>{route.conditions}</p>
              <p className="mt-2 text-sm text-navy-muted"><span className="font-medium text-navy">メリット：</span>{route.merits}</p>
              <p className="mt-2 text-sm text-navy-muted"><span className="font-medium text-navy">デメリット：</span>{route.demerits}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-navy-muted">現時点で該当する来日ルートが見つかりませんでした。</p>
      )}
      {others.length > 0 && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm font-medium text-navy-muted">その他のルート（参考）</summary>
          <div className="mt-4 space-y-4">
            {others.map((route) => (
              <div key={route.id} className="rounded-xl border border-navy/10 p-4 opacity-70">
                <p className="font-medium text-navy">{route.name}</p>
                <p className="mt-1 text-sm text-navy-muted">{route.conditions}</p>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
