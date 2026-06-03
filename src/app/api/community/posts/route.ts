import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { CATEGORIES } from "@/lib/categories";

const BUCKET = "spot-photos";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title    = (formData.get("title")    as string | null)?.trim();
    const body     = (formData.get("body")     as string | null)?.trim() || null;
    const category = (formData.get("category") as string | null);
    const nickname = (formData.get("nickname") as string | null)?.trim() || "匿名";
    const imageFile = formData.get("image") as File | null;

    // バリデーション
    if (!title || title.length < 2) {
      return NextResponse.json({ error: "タイトルが短すぎます" }, { status: 400 });
    }
    if (!category || !CATEGORIES.includes(category as never)) {
      return NextResponse.json({ error: "カテゴリが無効です" }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();

    // 画像アップロード
    let image_url: string | null = null;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_SIZE) {
        return NextResponse.json({ error: "画像は5MB以下にしてください" }, { status: 400 });
      }

      const ext  = imageFile.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `community/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: imageFile.type, upsert: false });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        // 画像エラーは致命的でないため続行
      } else {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        image_url = urlData.publicUrl;
      }
    }

    // 投稿作成
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("posts")
      .insert({ title, body, category, nickname, image_url })
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("Post insert error:", error);
      return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
