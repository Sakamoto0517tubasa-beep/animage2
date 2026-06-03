"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, MapPin, Sparkles, User } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import type { AuthUser } from "@/lib/auth";

type HeaderNavProps = {
  user: AuthUser | null;
};

export default function HeaderNav({ user }: HeaderNavProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/spots/map"
        className="hidden items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white sm:flex"
      >
        <MapPin className="size-4" />
        Explore Map
      </Link>

      {user ? (
        <>
          <Link
            href="/profile"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">{user.username}</span>
          </Link>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-white/15 bg-transparent text-white/80 hover:bg-white/5"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
}

export function HeaderLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-lg bg-violet-600/20 ring-1 ring-violet-500/40">
        <Sparkles className="size-5 text-violet-400" />
      </div>
      <LogoWordmark className="text-white group-hover:text-violet-300" />
    </Link>
  );
}
