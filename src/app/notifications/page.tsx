"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Bell, MapPin, MessageSquare, Star } from "lucide-react";
import type { Notification } from "@/app/api/notifications/route";

const LS_KEY = "notif_last_seen";

function getLastSeen(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(LS_KEY) ?? "0", 10);
}

function markAllRead() {
  localStorage.setItem(LS_KEY, Date.now().toString());
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  <  1) return "たった今";
  if (mins  < 60) return `${mins}分前`;
  if (hours < 24) return `${hours}時間前`;
  return `${days}日前`;
}

function NotifItem({ n, isNew }: { n: Notification; isNew: boolean }) {
  if (n.type === "review") {
    return (
      <Link
        href={`/spots/${n.spot_id}`}
        className={`flex items-start gap-3 px-4 py-3.5 active:bg-gray-100 ${isNew ? "bg-red-50/60" : "bg-white"}`}
      >
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
          <Star className="size-4 text-[#E53935]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug text-gray-900">
            <span className="font-semibold">{n.reviewer_name}</span>
            さんがお気に入りの
            <span className="font-semibold">「{n.spot_name}」</span>
            にレビューを投稿しました
            {n.score != null && (
              <span className="ml-1 font-bold text-[#E53935]">({n.score}/10)</span>
            )}
          </p>
          <p className="mt-0.5 text-[10px] text-[#E53935] font-medium truncate">{n.anime_title}</p>
          <p className="mt-1 text-[10px] text-gray-400">{relativeTime(n.created_at)}</p>
        </div>
        {isNew && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#E53935]" />}
      </Link>
    );
  }

  return (
    <Link
      href={`/community/${n.post_id}`}
      className={`flex items-start gap-3 px-4 py-3.5 active:bg-gray-100 ${isNew ? "bg-red-50/60" : "bg-white"}`}
    >
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-100">
        <MessageSquare className="size-4 text-purple-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-gray-900">
          <span className="font-semibold">{n.commenter_name}</span>
          さんがあなたの投稿
          <span className="font-semibold">「{n.post_title}」</span>
          にコメントしました
        </p>
        {n.comment_body && (
          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{n.comment_body}</p>
        )}
        <p className="mt-1 text-[10px] text-gray-400">{relativeTime(n.created_at)}</p>
      </div>
      {isNew && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#E53935]" />}
    </Link>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading]             = useState(true);
  const [lastSeen, setLastSeen]           = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/notifications");
      const json = await res.json() as { notifications: Notification[] };
      setNotifications(json.notifications);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLastSeen(getLastSeen());
    load();
    // ページを開いたら既読にする（少し遅延して「新着バッジ」を見せる）
    const t = setTimeout(() => {
      markAllRead();
      setLastSeen(Date.now());
    }, 2000);
    return () => clearTimeout(t);
  }, [load]);

  const newCount = notifications.filter(
    (n) => new Date(n.created_at).getTime() > lastSeen
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">通知</h1>
            {newCount > 0 && (
              <p className="text-[11px] text-[#E53935] font-medium">{newCount}件の新着</p>
            )}
            {!loading && newCount === 0 && (
              <p className="text-[11px] text-gray-400">新着通知はありません</p>
            )}
          </div>
          <Bell className="size-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="mt-2 divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white mx-3 shadow-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5">
              <div className="size-9 animate-pulse rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-gray-200" />
                <div className="h-2.5 w-1/4 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-28 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-gray-100">
            <Bell className="size-9 text-gray-300" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-700">通知はありません</p>
            <p className="mt-1 text-xs text-gray-400">
              お気に入りスポットに新しいレビューが届くと
              <br />ここに表示されます
            </p>
          </div>
          <div className="mt-2 flex flex-col gap-2 w-full max-w-xs px-6">
            <Link
              href="/spots"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#E53935] text-sm font-bold text-white"
            >
              <MapPin className="size-4" />
              聖地を探す
            </Link>
            <Link
              href="/community"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
            >
              <MessageSquare className="size-4" />
              掲示板を見る
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-2 divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white mx-3 shadow-sm">
          {notifications.map((n) => (
            <NotifItem
              key={n.id}
              n={n}
              isNew={new Date(n.created_at).getTime() > lastSeen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
