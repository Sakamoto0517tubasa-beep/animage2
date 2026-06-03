import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase";

export type Notification = {
  id: string;
  type: "review" | "comment";
  created_at: string;
  // review
  spot_id?: string;
  spot_name?: string;
  anime_title?: string;
  reviewer_name?: string;
  score?: number | null;
  // comment
  post_id?: string;
  post_title?: string;
  commenter_name?: string;
  comment_body?: string;
};

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ notifications: [] });
  }

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ notifications: [] });
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // 30日以内

  // ── ① お気に入りスポットへの新レビュー ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: favReviews } = await (supabase as any)
    .from("reviews")
    .select(`
      id, created_at, score_overall, nickname, spot_id,
      spots!inner(location_name, anime_title),
      favorites!inner(user_id)
    `)
    .eq("favorites.user_id", user.id)
    .neq("user_id", user.id)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(20);

  // ── ② 自分の投稿へのコメント ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: myPostComments } = await (supabase as any)
    .from("post_comments")
    .select(`
      id, created_at, body, nickname,
      posts!inner(id, title, user_id)
    `)
    .eq("posts.user_id", user.id)
    .neq("user_id", user.id)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(20);

  const notifications: Notification[] = [];

  for (const r of (favReviews ?? [])) {
    notifications.push({
      id: `review-${r.id}`,
      type: "review",
      created_at: r.created_at,
      spot_id: r.spot_id,
      spot_name: r.spots?.location_name ?? "スポット",
      anime_title: r.spots?.anime_title ?? "",
      reviewer_name: r.nickname ?? "匿名",
      score: r.score_overall,
    });
  }

  for (const c of (myPostComments ?? [])) {
    notifications.push({
      id: `comment-${c.id}`,
      type: "comment",
      created_at: c.created_at,
      post_id: c.posts?.id,
      post_title: c.posts?.title ?? "投稿",
      commenter_name: c.nickname ?? "匿名",
      comment_body: c.body,
    });
  }

  // 日時降順でマージ
  notifications.sort((a, b) => b.created_at.localeCompare(a.created_at));

  return NextResponse.json({ notifications });
}
