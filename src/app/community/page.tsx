import Link from "next/link";
import Image from "next/image";
import { getPosts, CATEGORIES } from "@/lib/posts";
import { formatDistanceToNow } from "@/lib/time-utils";
import { MessageSquare, ChevronUp, Pencil, MapPin, Tv, Plane, HelpCircle, Coffee } from "lucide-react";

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "聖地巡礼レポ": { icon: MapPin,    color: "#E53935", bg: "#FFF0F0" },
  "アニメ感想":   { icon: Tv,        color: "#7C3AED", bg: "#F5F0FF" },
  "旅行計画":     { icon: Plane,     color: "#0EA5E9", bg: "#F0F9FF" },
  "質問":         { icon: HelpCircle,color: "#D97706", bg: "#FFFBEB" },
  "雑談":         { icon: Coffee,    color: "#16A34A", bg: "#F0FDF4" },
};

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getPosts(category);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">掲示板</h1>
            <p className="text-[11px] text-gray-400">聖地巡礼の情報を共有しよう</p>
          </div>
          <Link
            href="/community/new"
            className="flex items-center gap-1.5 rounded-full bg-[#E53935] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-200"
          >
            <Pencil className="size-3.5" />
            投稿する
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <Link
            href="/community"
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              !category
                ? "bg-[#E53935] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            すべて
          </Link>
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta?.icon;
            const isActive = category === cat;
            return (
              <Link
                key={cat}
                href={`/community?category=${encodeURIComponent(cat)}`}
                className={`flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#E53935] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {Icon && <Icon className="size-3" />}
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Post list */}
      <div className="space-y-2 p-3">
        {posts.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-gray-100">
              <MessageSquare className="size-6 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">まだ投稿がありません</p>
            <p className="mt-1 text-xs text-gray-400">最初の投稿をしてみよう！</p>
            <Link
              href="/community/new"
              className="mt-4 rounded-full bg-[#E53935] px-5 py-2 text-sm font-semibold text-white"
            >
              投稿する
            </Link>
          </div>
        ) : (
          posts.map((post) => {
            const meta = CATEGORY_META[post.category];
            const Icon = meta?.icon ?? MessageSquare;
            return (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm active:bg-gray-50"
              >
                {/* カテゴリバッジ */}
                <div className="mb-2 flex items-center gap-1.5">
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{ color: meta?.color ?? "#E53935", backgroundColor: meta?.bg ?? "#FFF0F0" }}
                  >
                    <Icon className="size-2.5" />
                    {post.category}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900 leading-snug">
                      {post.title}
                    </p>
                    {post.body && (
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500 leading-relaxed">
                        {post.body}
                      </p>
                    )}
                  </div>
                  {post.image_url && (
                    <Image
                      src={post.image_url}
                      alt=""
                      width={64}
                      height={64}
                      className="size-16 shrink-0 rounded-xl object-cover"
                    />
                  )}
                </div>

                {/* フッター */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="font-medium text-gray-500">{post.nickname ?? "匿名"}</span>
                    <span>·</span>
                    <span>{formatDistanceToNow(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <ChevronUp className="size-3.5" />
                      {post.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3" />
                      {post.comment_count}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
