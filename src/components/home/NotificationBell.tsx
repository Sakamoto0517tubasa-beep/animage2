"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

const LS_KEY = "notif_last_seen";

export default function NotificationBell() {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res  = await fetch("/api/notifications");
        if (!res.ok) return;
        const { notifications } = await res.json() as { notifications: { created_at: string }[] };
        const lastSeen = parseInt(localStorage.getItem(LS_KEY) ?? "0", 10);
        const count = notifications.filter(
          (n) => new Date(n.created_at).getTime() > lastSeen
        ).length;
        setUnread(count);
      } catch {
        // ignore
      }
    }
    fetchCount();
  }, []);

  return (
    <Link
      href="/notifications"
      className="relative flex size-9 items-center justify-center rounded-full text-white hover:bg-white/15"
      aria-label="通知"
    >
      <Bell className="size-5" />
      {unread > 0 && (
        <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-extrabold text-[#E53935] shadow">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </Link>
  );
}
