"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertCircle, Camera, Loader2, X } from "lucide-react";
import ScoreInput from "@/components/ScoreInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Spot } from "@/types/supabase";

const MAX_PHOTOS = 3;
const MAX_SIZE_MB = 10;

type ReviewFormProps = {
  spot: Spot;
};

export default function ReviewForm({ spot }: ReviewFormProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [scores, setScores] = useState({
    reenactment: 8,
    accessibility: 8,
    satisfaction: 8,
    photo: 8,
    crowding: 5,
    overall: 8,
  });
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // プレビューURLのクリーンアップ
  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter((f) => {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`${f.name} は${MAX_SIZE_MB}MB以上のため追加できません`);
        return false;
      }
      return true;
    });
    const next = [...photoFiles, ...valid].slice(0, MAX_PHOTOS);
    setPhotoFiles(next);
    setPreviews((prev) => {
      prev.forEach(URL.revokeObjectURL);
      return next.map(URL.createObjectURL);
    });
    // 同じファイルを再選択できるようにリセット
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(idx: number) {
    URL.revokeObjectURL(previews[idx]);
    setPhotoFiles((p) => p.filter((_, i) => i !== idx));
    setPreviews((p) => p.filter((_, i) => i !== idx));
  }

  const canSubmit = !submitting && isSupabaseConfigured();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      // レビューを API Route 経由で投稿（ログイン不要・RLS バイパス）
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spot_id: spot.id,
          nickname: nickname.trim() || undefined,
          score_reenactment: scores.reenactment,
          score_accessibility: scores.accessibility,
          score_satisfaction: scores.satisfaction,
          score_photo: scores.photo,
          score_crowding: scores.crowding,
          score_overall: scores.overall,
          comment: comment.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "投稿に失敗しました");
      }

      // 写真アップロード（任意・失敗しても続行）
      if (photoFiles.length > 0) {
        const supabase = createClient();
        const uploadedUrls: string[] = [];

        for (const file of photoFiles) {
          const ext = file.name.split(".").pop() ?? "jpg";
          const path = `${spot.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from("spot-photos")
            .upload(path, file, { contentType: file.type, upsert: false });

          if (uploadError) {
            console.warn("Photo upload failed:", uploadError.message);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from("spot-photos")
            .getPublicUrl(path);

          uploadedUrls.push(publicUrl);
        }

        if (uploadedUrls.length > 0) {
          await supabase.from("photos").insert(
            uploadedUrls.map((url) => ({
              spot_id: spot.id,
              user_id: "",
              url,
              caption: "",
            })),
          );
        }
      }

      router.refresh();
      router.push(`/spots/${spot.id}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "エラーが発生しました。もう一度お試しください。",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {!isSupabaseConfigured() && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">
            Supabaseが設定されていません。環境変数を追加するとレビューを投稿できます。
          </p>
        </div>
      )}

      <div>
        <label htmlFor="nickname" className="mb-2 block text-sm font-medium text-gray-700">
          ニックネーム <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <Input
          id="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="匿名"
          className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
        />
        <p className="mt-2 text-xs text-gray-400">
          空欄の場合は匿名で投稿されます。
        </p>
      </div>

      <div className="space-y-6">
        <ScoreInput
          label="再現度"
          value={scores.reenactment}
          onChange={(value) => setScores((current) => ({ ...current, reenactment: value }))}
        />
        <ScoreInput
          label="アクセス"
          value={scores.accessibility}
          onChange={(value) => setScores((current) => ({ ...current, accessibility: value }))}
        />
        <ScoreInput
          label="写真映え"
          value={scores.photo}
          onChange={(value) => setScores((current) => ({ ...current, photo: value }))}
        />
        <ScoreInput
          label="混雑度"
          value={scores.crowding}
          onChange={(value) => setScores((current) => ({ ...current, crowding: value }))}
        />
        <ScoreInput
          label="総合"
          value={scores.overall}
          onChange={(value) => setScores((current) => ({ ...current, overall: value }))}
        />
      </div>

      <div>
        <label htmlFor="comment" className="mb-2 block text-sm font-medium text-gray-700">
          コメント <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="この聖地での体験を共有しよう...（省略可）"
          className="min-h-28 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* 写真アップロード */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          写真 <span className="text-gray-400 font-normal text-xs">（任意・最大{MAX_PHOTOS}枚・{MAX_SIZE_MB}MB以下）</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoSelect}
        />
        <div className="flex flex-wrap gap-3">
          {previews.map((src, idx) => (
            <div key={idx} className="relative size-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`写真${idx + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70"
                aria-label="写真を削除"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
          {photoFiles.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500"
            >
              <Camera className="size-5" />
              <span className="text-xs">写真を追加</span>
            </button>
          )}
        </div>
        {photoFiles.length > 0 && (
          <p className="mt-1.5 text-xs text-gray-400">{photoFiles.length}/{MAX_PHOTOS}枚選択中</p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-[#E53935] hover:bg-[#D32F2F] disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            送信中...
          </>
        ) : (
          "レビューを投稿する"
        )}
      </Button>
    </form>
  );
}
