import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  let body: {
    spot_id: string;
    nickname?: string;
    score_reenactment: number;
    score_accessibility: number;
    score_satisfaction: number;
    score_photo: number;
    score_crowding: number;
    score_overall: number;
    comment?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.spot_id) {
    return NextResponse.json({ error: "spot_id is required" }, { status: 400 });
  }

  // ログイン済みならそのユーザーIDを使う
  let userId: string | null = null;
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    // 未ログインでも続行
  }

  // admin クライアントで RLS をバイパスして insert
  const admin = createAdminSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (admin as any).from("reviews").insert({
    spot_id: body.spot_id,
    user_id: userId,
    nickname: body.nickname?.trim() || null,
    score_reenactment: body.score_reenactment,
    score_accessibility: body.score_accessibility,
    score_satisfaction: body.score_satisfaction,
    score_photo: body.score_photo,
    score_crowding: body.score_crowding,
    score_overall: body.score_overall,
    comment: body.comment?.trim() || "",
  }).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id }, { status: 201 });
}
