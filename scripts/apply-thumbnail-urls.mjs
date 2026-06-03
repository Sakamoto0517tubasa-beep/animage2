import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlsPath = join(__dirname, "thumbnail-urls.json");
const seedPath = join(__dirname, "..", "src", "data", "seed-spots.ts");

if (!existsSync(urlsPath)) {
  console.error("Run fetch-unsplash-thumbnails.mjs first");
  process.exit(1);
}

const urls = JSON.parse(readFileSync(urlsPath, "utf8"));
let content = readFileSync(seedPath, "utf8");
let updated = 0;
const missing = [];

content = content.replace(
  /location_name: "([^"]+)",[\s\S]*?thumbnail_url:\n      "([^"]+)"/g,
  (block, location, oldUrl) => {
    const nextUrl = urls[location];
    if (!nextUrl) {
      missing.push(location);
      return block;
    }
    if (oldUrl === nextUrl) return block;
    updated++;
    return block.replace(oldUrl, nextUrl);
  },
);

writeFileSync(seedPath, content, "utf8");
console.log(`Updated ${updated} thumbnail URLs`);
if (missing.length) {
  console.log(`Missing URLs for ${missing.length} spots:`, missing.join(", "));
}
