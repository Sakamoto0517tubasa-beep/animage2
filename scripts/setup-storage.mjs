/**
 * Supabase Storage セットアップスクリプト
 * spot-photos バケットを作成し、公開アクセスポリシーを設定します。
 *
 * 使い方:
 *   1. .env.local に SUPABASE_SERVICE_ROLE_KEY を追加
 *   2. node scripts/setup-storage.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local を手動パース
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
    const env = {};
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
    }
    return env;
  } catch {
    return {};
  }
}

const env = { ...process.env, ...loadEnv() };

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ 環境変数が不足しています。");
  console.error("   .env.local に以下を追加してください:");
  console.error("   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>");
  console.error("");
  console.error("   Service Role Key の取得場所:");
  console.error("   Supabase Dashboard → プロジェクト → Settings → API → service_role");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  apikey: SERVICE_ROLE_KEY,
};

async function request(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { ok: res.ok, status: res.status, body: json };
}

async function main() {
  console.log("🪣  spot-photos バケットを作成中...");

  // バケット作成
  const create = await request("POST", "/bucket", {
    id: "spot-photos",
    name: "spot-photos",
    public: true,
    file_size_limit: 10 * 1024 * 1024, // 10 MB
    allowed_mime_types: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  });

  if (create.ok) {
    console.log("✅ バケット作成成功");
  } else if (create.status === 409 || create.body?.error === "Duplicate") {
    console.log("ℹ️  バケットは既に存在します（スキップ）");
  } else {
    console.error("❌ バケット作成失敗:", JSON.stringify(create.body));
    process.exit(1);
  }

  // ストレージ RLS ポリシーを SQL で追加
  console.log("🔒  RLS ポリシーを設定中...");

  const sql = `
    -- 公開読み取り
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage' AND tablename = 'objects'
          AND policyname = 'spot-photos public read'
      ) THEN
        CREATE POLICY "spot-photos public read"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'spot-photos');
      END IF;
    END $$;

    -- 誰でもアップロード可
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage' AND tablename = 'objects'
          AND policyname = 'spot-photos public insert'
      ) THEN
        CREATE POLICY "spot-photos public insert"
        ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'spot-photos');
      END IF;
    END $$;
  `;

  const rls = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: sql }),
  });

  // /rpc/exec_sql が存在しない場合は Management API へフォールバック
  if (!rls.ok) {
    console.log("⚠️  RLS ポリシーは Supabase ダッシュボードの SQL Editor で手動設定が必要な場合があります。");
    console.log("   以下の SQL を実行してください:\n");
    console.log(sql);
  } else {
    console.log("✅ RLS ポリシー設定完了");
  }

  console.log("");
  console.log("🎉 セットアップ完了！写真アップロードが有効になりました。");
}

main().catch((e) => {
  console.error("エラー:", e);
  process.exit(1);
});
