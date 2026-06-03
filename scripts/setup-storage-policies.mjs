/**
 * Supabase Storage RLS ポリシー設定スクリプト
 * Management API を使って spot-photos バケットのポリシーを設定します。
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_REF  = SUPABASE_URL?.match(/https:\/\/([^.]+)\./)?.[1];

const sql = `
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND policyname='spot-photos public read'
  ) THEN
    CREATE POLICY "spot-photos public read"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'spot-photos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND policyname='spot-photos public insert'
  ) THEN
    CREATE POLICY "spot-photos public insert"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'spot-photos');
  END IF;
END $$;
`;

async function tryManagementApi(token) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    },
  );
  return { ok: res.ok, status: res.status, body: await res.text() };
}

async function main() {
  console.log("🔒  RLS ポリシーを設定中...\n");

  // まずサービスロールキーで試す
  const r1 = await tryManagementApi(SERVICE_KEY);
  if (r1.ok) {
    console.log("✅ ポリシー設定完了（service role キー使用）");
    return;
  }

  console.log("ℹ️  Management API は Personal Access Token が必要です。");
  console.log("   以下の SQL を Supabase SQL Editor に貼り付けて実行してください:\n");
  console.log("━".repeat(60));
  console.log(sql.trim());
  console.log("━".repeat(60));
  console.log(`\n   SQL Editor URL:`);
  console.log(`   https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
}

main().catch(console.error);
