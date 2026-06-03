import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) return {};
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = { ...loadEnv(), ...process.env };
const accessKey = env.UNSPLASH_ACCESS_KEY;

const keywords = JSON.parse(
  readFileSync(join(__dirname, "thumbnail-keywords.json"), "utf8"),
);
const overrides = JSON.parse(
  readFileSync(join(__dirname, "photo-by-query.json"), "utf8"),
);
const urlsPath = join(__dirname, "thumbnail-urls.json");

let cached = {};
if (existsSync(urlsPath)) {
  cached = JSON.parse(readFileSync(urlsPath, "utf8"));
}

function toUrl(photoId) {
  const id = photoId.startsWith("photo-") ? photoId : `photo-${photoId}`;
  return `https://images.unsplash.com/${id}?w=400&q=80`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyUrl(url) {
  const res = await fetch(url, { method: "HEAD" });
  return res.ok;
}

async function searchViaApi(query) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "landscape");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo?.urls?.regular) throw new Error("No API results");
  const match = photo.urls.regular.match(/photo-[a-zA-Z0-9-]+/);
  if (!match) throw new Error("Could not parse API URL");
  return match[0];
}

async function searchViaDuckDuckGo(query) {
  const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(
    `site:images.unsplash.com ${query}`,
  )}`;
  const res = await fetch(searchUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`DDG ${res.status}`);
  const html = await res.text();
  const matches = [...html.matchAll(/photo-[0-9]+-[a-f0-9]+/g)].map((m) => m[0]);
  if (!matches.length) throw new Error("No DDG results");
  return matches[0];
}

async function resolvePhotoId(query) {
  if (overrides[query]) return overrides[query];

  if (accessKey) {
    try {
      return await searchViaApi(query);
    } catch {
      // fall through to DDG
    }
  }

  return searchViaDuckDuckGo(query);
}

const results = { ...cached };
let fetched = 0;
let skipped = 0;
const failed = [];

for (const [location, query] of Object.entries(keywords)) {
  if (results[location]) {
    skipped++;
    continue;
  }

  try {
    let photoId = await resolvePhotoId(query);
    let url = toUrl(photoId);
    if (!(await verifyUrl(url))) {
      photoId = await searchViaDuckDuckGo(`${query} japan`);
      url = toUrl(photoId);
      if (!(await verifyUrl(url))) throw new Error("Verified URL not found");
    }
    results[location] = url;
    fetched++;
    console.log(`OK: ${location}`);
  } catch (err) {
    failed.push({ location, query, error: err.message });
    console.error(`FAIL: ${location} — ${err.message}`);
  }

  await sleep(accessKey ? 1100 : 800);
}

writeFileSync(urlsPath, JSON.stringify(results, null, 2) + "\n", "utf8");
console.log(
  `\nSaved ${Object.keys(results).length} URLs (${fetched} fetched, ${skipped} cached, ${failed.length} failed)`,
);
if (failed.length) {
  writeFileSync(
    join(__dirname, "thumbnail-fetch-errors.json"),
    JSON.stringify(failed, null, 2),
    "utf8",
  );
}
