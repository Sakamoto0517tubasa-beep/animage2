"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, ChevronDown, ChevronUp, X, MapPin, Train,
  Star, RotateCcw, Send, Clock, Clapperboard, Frown,
} from "lucide-react";
import { getScoreBadgeColor } from "@/lib/home-utils";
import type { RecommendedSpot } from "@/app/api/recommend/route";

// ── 重視ポイント ──
const PRIORITIES = [
  { key: "reenactment",   label: "再現度",   emoji: "🎬" },
  { key: "accessibility", label: "アクセス",  emoji: "🚃" },
  { key: "photo",         label: "写真映え",  emoji: "📷" },
  { key: "uncrowded",     label: "穴場・静か", emoji: "🌿" },
] as const;

// ── 移動時間プリセット ──
const TRAVEL_PRESETS = [
  { label: "5分",  value: 5 },
  { label: "10分", value: 10 },
  { label: "20分", value: 20 },
  { label: "30分", value: 30 },
  { label: "60分", value: 60 },
  { label: "制限なし", value: null },
] as const;

// ── スコアバー ──
function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (score == null) return null;
  const color = getScoreBadgeColor(score);
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-14 shrink-0 text-[9px] text-gray-400">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(score / 10) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-6 text-right text-[9px] font-semibold tabular-nums" style={{ color }}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// ── 推薦スポットカード ──
function RecommendCard({ spot, rank }: { spot: RecommendedSpot; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const img = spot.thumbnail_url;
  const color = spot.overall_score != null ? getScoreBadgeColor(spot.overall_score) : "#9CA3AF";

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* ヘッダー */}
      <Link href={`/spots/${spot.id}`} className="block">
        <div className="relative">
          {img ? (
            <div className="relative h-32 w-full bg-gray-100">
              <Image src={img} alt={spot.location_name} fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          ) : (
            <div className="h-20 bg-gradient-to-br from-red-50 to-orange-50" />
          )}

          {/* 順位バッジ */}
          <div className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-[#E53935] text-xs font-black text-white shadow-md">
            {rank}
          </div>

          {/* スコア */}
          {spot.overall_score != null && (
            <div className="absolute right-3 top-3 rounded-xl bg-black/50 px-2.5 py-1 backdrop-blur-sm">
              <span className="text-sm font-black tabular-nums" style={{ color }}>
                {spot.overall_score.toFixed(1)}
              </span>
            </div>
          )}

          {/* タイトルオーバーレイ */}
          <div className={`px-3 pb-2 pt-3 ${img ? "absolute bottom-0 left-0 right-0" : ""}`}>
            <p className={`truncate text-[10px] font-semibold ${img ? "text-white/80" : "text-[#E53935]"}`}>
              {spot.anime_title}
            </p>
            <p className={`truncate text-sm font-bold ${img ? "text-white" : "text-gray-900"}`}>
              {spot.location_name}
            </p>
          </div>
        </div>
      </Link>

      {/* 詳細エリア */}
      <div className="p-3 space-y-2.5">
        {/* メタ情報 */}
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          {spot.city && <span className="flex items-center gap-0.5"><MapPin className="size-2.5" />{spot.city}</span>}
          {spot.train_minutes != null && (
            <span className="flex items-center gap-0.5"><Train className="size-2.5" />{spot.train_minutes}分</span>
          )}
          {spot.review_count > 0 && (
            <span className="flex items-center gap-0.5"><Star className="size-2.5" />{spot.review_count}件</span>
          )}
        </div>

        {/* AI推薦理由 */}
        <div className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 p-2.5">
          <div className="flex items-center gap-1 mb-1">
            <Sparkles className="size-3 text-violet-500" />
            <span className="text-[9px] font-bold text-violet-600">AI推薦理由</span>
          </div>
          <p className={`text-xs leading-relaxed text-gray-700 ${!expanded ? "line-clamp-2" : ""}`}>
            {spot.reason}
          </p>
          {spot.reason.length > 60 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 flex items-center gap-0.5 text-[9px] font-semibold text-violet-500"
            >
              {expanded ? <><ChevronUp className="size-3" />閉じる</> : <><ChevronDown className="size-3" />もっと見る</>}
            </button>
          )}
        </div>

        {/* スコアバー */}
        <div className="space-y-1">
          <ScoreBar label="再現度" score={spot.score_reenactment} />
          <ScoreBar label="アクセス" score={spot.score_accessibility} />
          <ScoreBar label="写真映え" score={spot.score_photo} />
          <ScoreBar label="混雑度" score={spot.score_crowding} />
        </div>

        {/* 詳細ボタン */}
        <Link
          href={`/spots/${spot.id}`}
          className="flex h-9 w-full items-center justify-center rounded-xl bg-[#E53935] text-xs font-bold text-white hover:bg-[#D32F2F]"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}

// ── アニメ入力タグ ──
function AnimeTagInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");
  const composingRef = useRef(false); // IME変換中フラグ

  const add = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  return (
    <div className="space-y-2">
      {/* タグ一覧 */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700"
            >
              {v}
              <button onClick={() => onChange(values.filter((x) => x !== v))} className="text-violet-400 hover:text-violet-600">
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* 入力行 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => { composingRef.current = true; }}
          onCompositionEnd={(e) => {
            composingRef.current = false;
            setInput(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !composingRef.current) {
              e.preventDefault();
              add(input);
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-400 placeholder:text-gray-400 transition-colors"
        />
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); add(input); }}
          className="shrink-0 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-600"
        >
          決定
        </button>
      </div>
    </div>
  );
}

// ── メイン ──
export default function RecommendClient() {
  const [favoriteAnime, setFavoriteAnime]   = useState<string[]>([]);
  const [maxTravel, setMaxTravel]           = useState<number | null>(null);
  const [priorities, setPriorities]         = useState<string[]>([]);
  const [prefecture, setPrefecture]         = useState("");
  const [freeText, setFreeText]             = useState("");
  const [loading, setLoading]               = useState(false);
  const [results, setResults]               = useState<RecommendedSpot[] | null>(null);
  const [error, setError]                   = useState<string | null>(null);
  const resultsRef                          = useRef<HTMLDivElement>(null);

  const togglePriority = (key: string) => {
    setPriorities((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favoriteAnime,
          maxTravelMinutes: maxTravel,
          priorities,
          prefecture: prefecture || null,
          freeText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "エラーが発生しました");
        return;
      }

      setResults(data.spots);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResults(null);
    setError(null);
    setFavoriteAnime([]);
    setMaxTravel(null);
    setPriorities([]);
    setPrefecture("");
    setFreeText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ── 入力フォーム ── */}
      {!results && (
        <div className="p-4 space-y-5">
          {/* イントロ */}
          <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-white shadow-lg shadow-violet-200">
            <Sparkles className="size-6 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-base">AIが聖地をレコメンド</p>
              <p className="mt-0.5 text-xs text-white/80 leading-relaxed">
                好みを入力するだけで、あなたにぴったりのアニメ聖地をAIが厳選して提案します
              </p>
            </div>
          </div>

          {/* 好きなアニメ */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
              <Clapperboard className="size-4 text-violet-500" />
              好きなアニメ
              <span className="text-xs font-normal text-gray-400">（入力して決定を押す）</span>
            </label>
            <AnimeTagInput
              values={favoriteAnime}
              onChange={setFavoriteAnime}
              placeholder="例: 君の名は。、進撃の巨人…"
            />
          </div>

          {/* 移動時間 */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
              <Clock className="size-4 text-violet-500" />
              駅からの移動時間（上限）
            </label>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_PRESETS.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => setMaxTravel(value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    maxTravel === value
                      ? "bg-violet-500 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-violet-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 重視ポイント */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">重視ポイント（複数選択可）</label>
            <div className="grid grid-cols-2 gap-2">
              {PRIORITIES.map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => togglePriority(key)}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-semibold transition-all ${
                    priorities.includes(key)
                      ? "border-violet-400 bg-violet-50 text-violet-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-violet-200"
                  }`}
                >
                  <span className="text-base">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* エリア */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
              <MapPin className="size-4 text-violet-500" />
              エリア
              <span className="text-xs font-normal text-gray-400">（任意）</span>
            </label>
            <input
              type="text"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              placeholder="例: 東京、京都、北海道…"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-400 placeholder:text-gray-400 transition-colors"
            />
          </div>

          {/* 自由記述 */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">
              その他の希望
              <span className="ml-1.5 text-xs font-normal text-gray-400">（任意）</span>
            </label>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="例: 海が見える場所が好き、階段シーンに憧れている、一人でも行きやすい場所…"
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-400 placeholder:text-gray-400 resize-none transition-colors"
            />
          </div>

          {/* 送信ボタン */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <>
                <Sparkles className="size-4 animate-pulse" />
                分析中…
              </>
            ) : (
              <>
                <Send className="size-4" />
                AIにおすすめを聞く
              </>
            )}
          </button>

          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{error}</p>
          )}
        </div>
      )}

      {/* ── 結果 ── */}
      {results && (
        <div ref={resultsRef}>
          {/* 結果ヘッダー */}
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="size-5" />
                <div>
                  <p className="font-bold">AI推薦スポット</p>
                  <p className="text-xs text-white/70">{results.length}件をピックアップしました</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/30"
              >
                <RotateCcw className="size-3.5" />
                やり直す
              </button>
            </div>
          </div>

          {/* 条件サマリー */}
          <div className="flex flex-wrap gap-1.5 border-b border-gray-100 bg-white px-4 py-2.5">
            {favoriteAnime.map((a) => (
              <span key={a} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                🎬 {a}
              </span>
            ))}
            {maxTravel != null && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                🚃 {maxTravel}分以内
              </span>
            )}
            {priorities.map((p) => {
              const found = PRIORITIES.find((pr) => pr.key === p);
              return found ? (
                <span key={p} className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                  {found.emoji} {found.label}
                </span>
              ) : null;
            })}
            {prefecture && (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                📍 {prefecture}
              </span>
            )}
          </div>

          {/* 結果なし */}
          {results.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <Frown className="size-12 text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-500">条件に合うスポットが見つかりませんでした</p>
              <p className="mt-1 text-xs text-gray-400">移動時間やエリアの条件を緩めてみてください</p>
              <button
                onClick={reset}
                className="mt-4 flex items-center gap-1.5 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600"
              >
                <RotateCcw className="size-4" />
                やり直す
              </button>
            </div>
          )}

          {/* スポットカード */}
          <div className="p-4 space-y-4">
            {results.map((spot, i) => (
              <RecommendCard key={spot.id} spot={spot} rank={i + 1} />
            ))}
          </div>

          <div className="pb-4 text-center">
            <button
              onClick={reset}
              className="flex mx-auto items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm"
            >
              <RotateCcw className="size-4" />
              条件を変えて再検索
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
