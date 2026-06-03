import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { commentId } = await req.json();
    if (!commentId) return NextResponse.json({ error: "commentId required" }, { status: 400 });

    const supabase = createAdminSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: current } = await (supabase as any)
      .from("post_comments")
      .select("upvotes")
      .eq("id", commentId)
      .single();

    if (!current) return NextResponse.json({ error: "not found" }, { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("post_comments")
      .update({ upvotes: (current.upvotes ?? 0) + 1 })
      .eq("id", commentId)
      .select("upvotes")
      .single();

    return NextResponse.json({ upvotes: data?.upvotes ?? current.upvotes + 1 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
