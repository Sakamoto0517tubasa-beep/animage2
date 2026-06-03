import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ error: "missing postId" }, { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { data: post } = await supabase
    .from("posts")
    .select("upvotes")
    .eq("id", postId)
    .single();

  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });

  await supabase
    .from("posts")
    .update({ upvotes: post.upvotes + 1 })
    .eq("id", postId);

  return NextResponse.json({ ok: true });
}
