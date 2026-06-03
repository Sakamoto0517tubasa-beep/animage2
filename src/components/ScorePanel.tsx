import { cn } from "@/lib/utils";
import type { SpotScores } from "@/lib/reviews";
import { getScoreBadgeColor } from "@/lib/home-utils";

type ScorePanelProps = {
  scores: SpotScores;
  reviewCount: number;
  className?: string;
};

const SCORE_ITEMS: { key: keyof SpotScores; label: string }[] = [
  { key: "reenactment",   label: "再現度" },
  { key: "accessibility", label: "アクセス" },
  { key: "photo",         label: "写真映え" },
  { key: "crowding",      label: "混雑度" },
];

// ── レーダーチャート（SVG, 4軸 ダイヤモンド配置） ──
function RadarChart({ scores }: { scores: SpotScores }) {
  const cx = 70, cy = 70, r = 52;

  // 各軸の角度（上=再現度、右=アクセス、下=写真映え、左=混雑度）
  const axes = [
    { key: "reenactment"   as keyof SpotScores, label: "再現度",   angle: -Math.PI / 2 },
    { key: "accessibility" as keyof SpotScores, label: "アクセス", angle: 0 },
    { key: "photo"         as keyof SpotScores, label: "写真映え", angle: Math.PI / 2 },
    { key: "crowding"      as keyof SpotScores, label: "混雑度",   angle: Math.PI },
  ];

  // データポリゴン
  const dataPoints = axes.map(({ key, angle }) => {
    const value = scores[key] ?? 0;
    const t = value / 10;
    return { x: cx + r * t * Math.cos(angle), y: cy + r * t * Math.sin(angle) };
  });
  const polygon = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // グリッド線（25% / 50% / 75% / 100%）
  const grids = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg viewBox="0 0 140 140" className="w-full max-w-[160px]" aria-hidden>
      {/* グリッド */}
      {grids.map((g) => {
        const gPts = axes.map(({ angle }) => ({
          x: cx + r * g * Math.cos(angle),
          y: cy + r * g * Math.sin(angle),
        }));
        return (
          <polygon
            key={g}
            points={gPts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        );
      })}

      {/* 軸線 */}
      {axes.map(({ angle, label }) => (
        <line
          key={label}
          x1={cx}
          y1={cy}
          x2={(cx + r * Math.cos(angle)).toFixed(1)}
          y2={(cy + r * Math.sin(angle)).toFixed(1)}
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      ))}

      {/* データ塗り */}
      <polygon
        points={polygon}
        fill="#E53935"
        fillOpacity="0.15"
        stroke="#E53935"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* データ点 */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3" fill="#E53935" />
      ))}

      {/* ラベル */}
      {axes.map(({ angle, label }) => {
        const lx = cx + (r + 14) * Math.cos(angle);
        const ly = cy + (r + 14) * Math.sin(angle);
        const anchor = Math.abs(angle) < 0.1 ? "start" : Math.abs(Math.abs(angle) - Math.PI) < 0.1 ? "end" : "middle";
        return (
          <text key={label} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor={anchor} dominantBaseline="middle" fontSize="8" fill="#6B7280" fontFamily="sans-serif">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

function ScoreBar({ value, color }: { value: number | null; color: string }) {
  const pct = value !== null ? (value / 10) * 100 : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function ScorePanel({ scores, reviewCount, className }: ScorePanelProps) {
  if (reviewCount === 0) {
    return (
      <div className={cn("rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center", className)}>
        <p className="text-sm font-medium text-gray-600">まだレビューがありません - 最初にレビューを書こう！</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-gray-100 bg-white p-4 shadow-sm", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">スコア詳細</p>

      <div className="flex items-center gap-4">
        {/* レーダーチャート */}
        <div className="flex shrink-0 flex-col items-center">
          <RadarChart scores={scores} />
          {scores.overall !== null && (
            <div className="mt-1 text-center">
              <span className="text-xl font-extrabold tabular-nums" style={{ color: getScoreBadgeColor(scores.overall) }}>
                {scores.overall.toFixed(1)}
              </span>
              <span className="ml-0.5 text-[10px] text-gray-400">/10</span>
            </div>
          )}
        </div>

        {/* スコアバー */}
        <div className="flex-1 space-y-2.5">
          {SCORE_ITEMS.map(({ key, label }) => {
            const value = scores[key];
            const color = getScoreBadgeColor(value);
            return (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">{label}</span>
                  <span className="text-xs font-bold tabular-nums" style={{ color }}>
                    {value !== null ? value.toFixed(1) : "—"}
                  </span>
                </div>
                <ScoreBar value={value} color={color} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
