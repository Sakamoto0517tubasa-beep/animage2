"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckCircle, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (authError) {
      setError(
        authError.message.includes("already registered")
          ? "このメールアドレスは既に登録されています"
          : "登録に失敗しました。もう一度お試しください",
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => { router.push(redirectTo); router.refresh(); }, 2000);
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      {/* ブランドヘッダー */}
      <div className="flex flex-col items-center justify-center bg-[#E53935] px-6 py-10">
        <h1 className="font-cinzel text-3xl font-bold tracking-widest text-white">
          <span className="opacity-80">A</span>NIM<span className="opacity-80">A</span>GE
        </h1>
        <p className="mt-2 text-sm text-white/70">アニメ聖地巡礼プラットフォーム</p>
      </div>

      {/* フォームカード */}
      <div className="flex flex-1 flex-col bg-gray-50 px-4 py-8">
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">新規登録</h2>
          <p className="mt-1 text-sm text-gray-500">
            アカウントを作成してレビューやお気に入りを記録しよう
          </p>

          {success ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-8 text-center">
              <CheckCircle className="size-10 text-green-500" />
              <p className="font-semibold text-green-800">登録が完了しました！</p>
              <p className="text-sm text-green-600">確認メールをご確認ください</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* ユーザー名 */}
              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  ユーザー名
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={2}
                    autoComplete="username"
                    placeholder="ニックネームを入力"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E53935] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="example@email.com"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E53935] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* パスワード */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  パスワード <span className="font-normal text-gray-400">（6文字以上）</span>
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E53935] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E53935] text-sm font-bold text-white shadow-sm shadow-red-200 hover:bg-[#D32F2F] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    登録中...
                  </>
                ) : (
                  "アカウントを作成"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-sm text-gray-500">
              すでにアカウントをお持ちの方は{" "}
              <Link
                href={`/auth/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
                className="font-semibold text-[#E53935]"
              >
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
