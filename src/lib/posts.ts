import { createServerSupabaseClient } from "@/lib/supabase/server";
export { CATEGORIES, type Category } from "@/lib/categories";

export type Post = {
  id: string;
  title: string;
  body: string | null;
  category: string;
  nickname: string | null;
  user_id: string | null;
  upvotes: number;
  comment_count: number;
  created_at: string;
  image_url?: string | null;
};

export type PostComment = {
  id: string;
  post_id: string;
  parent_id: string | null;
  body: string;
  nickname: string | null;
  user_id: string | null;
  upvotes: number;
  created_at: string;
};


export async function getPosts(category?: string): Promise<Post[]> {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (category) query = query.eq("category", category);

  const { data } = await query;
  return data ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).single();
  return data ?? null;
}

export async function getCommentsByPostId(postId: string): Promise<PostComment[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  return data ?? [];
}
