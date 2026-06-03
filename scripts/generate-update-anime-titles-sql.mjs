import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "src/data/seed-spots.ts"), "utf8");

const re = /id: "([^"]+)",[\s\S]*?anime_title: "((?:\\.|[^"\\])*)"/g;
const lines = [];
let m;
while ((m = re.exec(src)) !== null) {
  const id = m[1];
  const title = JSON.parse(`"${m[2]}"`).replace(/'/g, "''");
  lines.push(`UPDATE spots SET anime_title = '${title}' WHERE id = '${id}';`);
}

const out = [
  "-- Update anime_title for all spots from seed-spots.ts",
  `-- Generated: ${new Date().toISOString()}`,
  `-- Total: ${lines.length} rows`,
  "",
  ...lines,
  "",
].join("\n");

const outPath = path.join(
  root,
  "supabase/migrations/20250529120000_update_anime_titles.sql",
);
fs.writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${lines.length} UPDATE statements to ${outPath}`);
