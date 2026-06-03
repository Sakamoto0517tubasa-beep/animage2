"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export async function createPost(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();
  const category = formData.get("category") as string;
  const nickname = (formData.get("nickname") as string)?.trim() || "匿名";

  if (!title || title.length < 2) return;
  if (!CATEGORIES.includes(category as never)) return;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .insert({ title, body: body || null, category, nickname })
    .select("id")
    .single();

  if (data?.id) redirect(`/community/${data.id}`);
  revalidatePath("/community");
}

export async function createComment(formData: FormData) {
  const postId = formData.get("post_id") as string;
  const parentId = (formData.get("parent_id") as string) || null;
  const body = (formData.get("body") as string)?.trim();
  const nickname = (formData.get("nickname") as string)?.trim() || "匿名";

  if (!body || !postId) return;

  const supabase = await createServerSupabaseClient();
  await supabase
    .from("post_comments")
    .insert({ post_id: postId, parent_id: parentId, body, nickname });

  revalidatePath(`/community/${postId}`);
}

export async function upvotePost(postId: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("posts").select("upvotes").eq("id", postId).single();
  if (data) {
    await supabase.from("posts").update({ upvotes: data.upvotes + 1 }).eq("id", postId);
  }
  revalidatePath(`/community/${postId}`);
  revalidatePath("/community");
}
