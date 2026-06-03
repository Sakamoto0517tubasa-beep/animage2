import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { post_id, parent_id, body, nickname } = await req.json();

    if (!post_id || !body?.trim()) {
      return NextResponse.json({ error: "post_id and body are required" }, { status: 400 });
    }

    const supabase = createAdminSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("post_comments")
      .insert({
        post_id,
        parent_id: parent_id || null,
        body: body.trim(),
        nickname: nickname?.trim() || "匿名",
      })
      .select("id, post_id, parent_id, body, nickname, upvotes, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
