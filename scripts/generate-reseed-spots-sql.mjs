import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  join(__dirname, "..", "src", "data", "seed-spots.ts"),
  "utf8",
);

function sqlEscape(value) {
  return value.replace(/'/g, "''");
}

function asciiOnly(value) {
  return value
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*/g, " / ")
    .trim();
}

function hasNonAscii(value) {
  return /[^\x00-\x7F]/.test(value);
}

function parseSpots(ts) {
  const spots = [];
  const blockRe =
    /\{\s*id:\s*"([^"]+)",\s*anime_title:\s*"((?:\\.|[^"\\])*)",\s*location_name:\s*"((?:\\.|[^"\\])*)",\s*address:\s*"((?:\\.|[^"\\])*)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+),\s*description:\s*\n\s*"((?:\\.|[^"\\])*)",\s*created_at:\s*"([^"]+)",[\s\S]*?city:\s*"((?:\\.|[^"\\])*)",/gs;

  let match;
  while ((match = blockRe.exec(ts)) !== null) {
    spots.push({
      id: match[1],
      lat: Number(match[5]),
      lng: Number(match[6]),
      description: match[7].replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
      created_at: match[8],
      city: match[9].replace(/\\"/g, '"').replace(/\\\\/g, "\\"),
    });
  }

  return spots;
}

function extractLinkedAnime(description) {
  const match = description.match(/linked to (.+?)\. Located/);
  if (!match) return "Various anime";

  const cleaned = asciiOnly(match[1])
    .replace(/\s+\/\s+/g, " / ")
    .replace(/^\/+|\/+$/g, "")
    .trim();

  return cleaned || "Various anime";
}

function extractLocatedIn(description, city) {
  const match = description.match(/Located in (.+?), fans/);
  if (match) return match[1].trim();
  return city || "Japan";
}

function toEnglishSpot(spot, index) {
  const locatedIn = extractLocatedIn(spot.description, spot.city);
  const anime = extractLinkedAnime(spot.description);
  const spotNum = String(index + 1).padStart(3, "0");

  const locationName = `${locatedIn} - Site ${spotNum}`;
  const address = `${locatedIn}, Japan`;
  const description =
    `Real-world anime pilgrimage site linked to ${anime}. ` +
    `Located in ${locatedIn}, Japan. ` +
    "Fans visit to compare the scenery with iconic scenes from the series. " +
    "It is a popular stop for photographers and travelers exploring sacred anime locations.";

  return {
    id: spot.id,
    anime_title: anime,
    location_name: locationName,
    address,
    lat: spot.lat,
    lng: spot.lng,
    description,
    created_at: spot.created_at,
  };
}

const spots = parseSpots(source).map(toEnglishSpot);

if (spots.length === 0) {
  console.error("No spots parsed from seed-spots.ts");
  process.exit(1);
}

for (const [index, spot] of spots.entries()) {
  for (const [field, value] of Object.entries(spot)) {
    if (typeof value === "string" && hasNonAscii(value)) {
      console.error(`Non-ASCII in spot ${index + 1} field ${field}: ${value}`);
      process.exit(1);
    }
  }
}

const rows = spots.map((spot, index) => {
  const suffix = index === spots.length - 1 ? "" : ",";
  return `  (
    '${sqlEscape(spot.id)}',
    '${sqlEscape(spot.anime_title)}',
    '${sqlEscape(spot.location_name)}',
    '${sqlEscape(spot.address)}',
    ${spot.lat},
    ${spot.lng},
    '${sqlEscape(spot.description)}',
    '${sqlEscape(spot.created_at)}'
  )${suffix}`;
});

const sql = `-- Reseed all pilgrimage spots from src/data/seed-spots.ts (${spots.length} rows)
-- ASCII-only text for Supabase SQL Editor compatibility

TRUNCATE TABLE public.reviews CASCADE;
TRUNCATE TABLE public.spots CASCADE;

INSERT INTO public.spots (
  id,
  anime_title,
  location_name,
  address,
  lat,
  lng,
  description,
  created_at
) VALUES
${rows.join("\n")}
ON CONFLICT (id) DO UPDATE SET
  anime_title   = EXCLUDED.anime_title,
  location_name = EXCLUDED.location_name,
  address       = EXCLUDED.address,
  lat           = EXCLUDED.lat,
  lng           = EXCLUDED.lng,
  description   = EXCLUDED.description,
  created_at    = EXCLUDED.created_at;
`;

const outPath = join(
  __dirname,
  "..",
  "supabase",
  "migrations",
  "20250529000002_reseed_spots.sql",
);

writeFileSync(outPath, sql, { encoding: "utf8" });
console.log(`Wrote ${spots.length} ASCII-only spots to ${outPath}`);
