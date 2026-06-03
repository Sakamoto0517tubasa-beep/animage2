"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { isLocalFavorited, toggleLocalFavorite } from "@/lib/local-favorites";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  spotId: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
};

export default function FavoriteButton({
  spotId,
  initialFavorited,
  isLoggedIn,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [animating, setAnimating] = useState(false);
  const [pending, startTransition] = useTransition();

  // ゲストの場合はlocalStorageから初期状態を読み込む
  useEffect(() => {
    if (!isLoggedIn) {
      setFavorited(isLocalFavorited(spotId));
    }
    function onChanged(e: Event) {
      const { spotId: id, favorited: v } = (e as CustomEvent).detail;
      if (id === spotId) setFavorited(v);
    }
    window.addEventListener("local-favorite-changed", onChanged);
    return () => window.removeEventListener("local-favorite-changed", onChanged);
  }, [isLoggedIn, spotId]);

  function handleToggle() {
    if (!isLoggedIn) {
      // ゲスト：localStorageに保存
      const next = toggleLocalFavorite(spotId);
      setFavorited(next);
      if (next) {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
      }
      window.dispatchEvent(
        new CustomEvent("local-favorite-changed", { detail: { spotId, favorited: next } })
      );
      return;
    }

    // ログイン済み：Supabaseに保存
    startTransition(async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (favorited) {
        await supabase
          .from("favorites")
          .delete()
          .eq("spot_id", spotId)
          .eq("user_id", user.id);
        setFavorited(false);
      } else {
        await supabase.from("favorites").insert({
          spot_id: spotId,
          user_id: user.id,
        });
        setFavorited(true);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
      }
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleToggle}
      disabled={pending}
      className={cn(
        "border-gray-200 bg-white hover:bg-gray-50 transition-all",
        favorited && "border-[#E53935]/40 bg-red-50 text-[#E53935]",
        animating && "scale-125",
      )}
      aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <Heart className={cn("size-4 transition-all", favorited && "fill-current", animating && "scale-110")} />
    </Button>
  );
}
