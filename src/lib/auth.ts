import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    username:
      (user.user_metadata?.username as string | undefined) ??
      user.email?.split("@")[0] ??
      "User",
  };
}

export async function requireUser(redirectTo = "/auth/login") {
  const user = await getCurrentUser();
  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect(redirectTo);
  }
  return user;
}
