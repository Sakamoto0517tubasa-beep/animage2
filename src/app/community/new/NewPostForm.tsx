"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, X, MapPin, Tv, Plane, HelpCircle, Coffee, Loader2 } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string; desc: string }> = {
  "聖地巡礼レポ": { icon: MapPin,     color: "#E53935", bg: "#FFF0F0", desc: "訪問した聖地の体験を共有" },
  "アニメ感想":   { icon: Tv,         color: "#7C3AED", bg: "#F5F0FF", desc: "作品の感想・考察など" },
  "旅行計画":     { icon: Plane,      color: "#0EA5E9", bg: "#F0F9FF", desc: "巡礼旅行のプランニング" },
  "質問":         { icon: HelpCircle, color: "#D97706", bg: "#FFFBEB", desc: "聖地や旅行に関する質問" },
  "雑談":         { icon: Coffee,     color: "#16A34A", bg: "#F0FDF4", desc: "自由な話題でおしゃべり" },
};

export default function NewPostForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile]   = useState<File | null>(null);
  const [preview, setPreview]       = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("画像は5MB以下にしてください"); return; }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    if (imageFile) fd.set("image", imageFile);

    try {
      const res = await fetch("/api/community/posts", { method: "POST", body: fd });
      const json = await res.json() as { id?: string; error?: string };
      if (!res.ok || !json.id) throw new Error(json.error ?? "投稿に失敗しました");
      router.push(`/community/${json.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿に失敗しました");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* エラー */}
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-[#E53935]">{error}</div>
      )}

      {/* ニックネーム */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <label className="mb-1.5 block text-xs font-semibold text-gray-700">
          ニックネーム <span className="font-normal text-gray-400">（任意）</span>
        </label>
        <input
          name="nickname"
          type="text"
          placeholder="匿名"
          maxLength={30}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[#E53935] focus:bg-white focus:outline-none"
        />
      </div>

      {/* カテゴリ */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <label className="mb-3 block text-xs font-semibold text-gray-700">
          カテゴリ <span className="text-[#E53935]">*</span>
        </label>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta?.icon;
            return (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50 has-[:checked]:border-[#E53935] has-[:checked]:bg-red-50/50"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  required
                  className="accent-[#E53935]"
                  defaultChecked={cat === CATEGORIES[0]}
                />
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: meta?.bg }}
                >
                  {Icon && <Icon className="size-4" style={{ color: meta?.color }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{cat}</p>
                  <p className="text-[10px] text-gray-400">{meta?.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* タイトル・本文 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            タイトル <span className="text-[#E53935]">*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="タイトルを入力..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[#E53935] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            本文 <span className="font-normal text-gray-400">（任意）</span>
          </label>
          <textarea
            name="body"
            rows={5}
            maxLength={2000}
            placeholder="内容を入力...（任意）"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-[#E53935] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* 画像 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-gray-700">
          画像 <span className="font-normal text-gray-400">（任意・5MB以下）</span>
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        {preview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="プレビュー" className="max-h-64 w-full rounded-xl object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 text-gray-400 hover:border-[#E53935]/40 hover:bg-red-50/20 transition-colors"
          >
            <Camera className="size-7" />
            <span className="text-sm font-medium">タップして画像を選択</span>
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E53935] py-3.5 text-sm font-bold text-white shadow-sm shadow-red-200 hover:bg-[#D32F2F] disabled:opacity-60"
      >
        {submitting && <Loader2 className="size-4 animate-spin" />}
        {submitting ? "投稿中..." : "投稿する"}
      </button>
    </form>
  );
}
