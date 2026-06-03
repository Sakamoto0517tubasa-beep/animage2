import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mapping = JSON.parse(
  readFileSync(join(__dirname, "anime-title-mapping.json"), "utf8"),
);
const seedPath = join(__dirname, "..", "src", "data", "seed-spots.ts");
let content = readFileSync(seedPath, "utf8");

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

let updated = 0;
const missing = [];

content = content.replace(
  /(\{\n    id: "[^"]+",\n    anime_title: ")[^"]*(",\n    location_name: "([^"]+)")/g,
  (match, prefix, suffix, location) => {
    const title = mapping[location];
    if (!title) {
      missing.push(location);
      return match;
    }
    updated++;
    return `${prefix}${esc(title)}${suffix}`;
  },
);

writeFileSync(seedPath, content, "utf8");
console.log(`Updated ${updated} spots`);
if (missing.length) {
  console.log(`Unmapped (${missing.length}): ${missing.join(", ")}`);
}
