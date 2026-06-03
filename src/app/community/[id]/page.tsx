import { getPostById, getCommentsByPostId } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageSquare, MapPin, Tv, Plane, HelpCircle, Coffee } from "lucide-react";
import UpvoteButton from "@/components/community/UpvoteButton";
import CommentSection from "@/components/community/CommentSection";
import { formatDistanceToNow } from "@/lib/time-utils";

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "聖地巡礼レポ": { icon: MapPin,    color: "#E53935", bg: "#FFF0F0" },
  "アニメ感想":   { icon: Tv,        color: "#7C3AED", bg: "#F5F0FF" },
  "旅行計画":     { icon: Plane,     color: "#0EA5E9", bg: "#F0F9FF" },
  "質問":         { icon: HelpCircle,color: "#D97706", bg: "#FFFBEB" },
  "雑談":         { icon: Coffee,    color: "#16A34A", bg: "#F0FDF4" },
};

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-sm font-bold text-gray-600">
      {name[0]}
    </div>
  );
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPostById(id), getCommentsByPostId(id)]);

  if (!post) notFound();

  const meta = CATEGORY_META[post.category];
  const Icon = meta?.icon ?? MessageSquare;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <Link href="/community" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="size-5" />
        </Link>
        <span
          className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
          style={{ color: meta?.color ?? "#E53935", backgroundColor: meta?.bg ?? "#FFF0F0" }}
        >
          <Icon className="size-2.5" />
          {post.category}
        </span>
      </div>

      {/* 投稿本文 */}
      <div className="mx-3 mt-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold leading-snug text-gray-900">{post.title}</h2>
        {post.image_url && (
          <Image
            src={post.image_url}
            alt=""
            width={800}
            height={450}
            className="mt-3 w-full rounded-xl object-cover max-h-72"
          />
        )}
        {post.body && (
          <p className="mt-3 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{post.body}</p>
        )}

        <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3">
          <Avatar name={post.nickname ?? "匿名"} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-800">{post.nickname ?? "匿名"}</p>
            <p className="text-[10px] text-gray-400">{formatDistanceToNow(post.created_at)}</p>
          </div>
          <div className="flex items-center gap-3">
            <UpvoteButton postId={post.id} upvotes={post.upvotes} />
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <MessageSquare className="size-3.5" />
              {comments.length}
            </span>
          </div>
        </div>
      </div>

      {/* インタラクティブなコメントセクション */}
      <CommentSection postId={post.id} initialComments={comments} />
    </div>
  );
}
