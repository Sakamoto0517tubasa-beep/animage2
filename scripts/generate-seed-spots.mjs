import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const titleMapping = JSON.parse(
  readFileSync(join(__dirname, "anime-title-mapping.json"), "utf8"),
);
const thumbnailKeywords = JSON.parse(
  readFileSync(join(__dirname, "thumbnail-keywords.json"), "utf8"),
);

const GENRE_PHOTOS = {
  shrine: "photo-1528360983277-13d401cdc186",
  city: "photo-1540959733332-eab4deabeeaf",
  nature: "photo-1490806843957-31f4c9a91c65",
  station: "photo-1578662996442-48f60103fc96",
  coast: "photo-1480796927426-f609979314bd",
  school: "photo-1580582932707-520aed937b7b",
  shopping: "photo-1513407030348-c983a97b98d8",
  park: "photo-1534430480872-3498386e7856",
};

function detectThumbnailGenre(locationName, keywords) {
  const text = `${locationName} ${keywords}`.toLowerCase();

  if (/踏切|駅|station|railway|鉄道/.test(text)) return "station";
  if (/小学校|校舎|elementary school|school/.test(text)) return "school";
  if (/高校/.test(text)) return "school";
  if (/beach|coast|port|harbor|harbour|marine|island|海岸|浜|海|島|港/.test(text)) {
    return "coast";
  }
  if (/shrine|temple|torii|神社|寺|神宮|大社|雷門|鳥居|稲荷|宮/.test(text)) {
    return "shrine";
  }
  if (/park|公園|御苑|gyoen/.test(text)) return "park";
  if (
    /shopping|street|通り|商店街|赤レンガ|warehouse|crossing|akihabara|harajuku|takeshita|gion|本町|宿|warehouse|red brick/.test(
      text,
    )
  ) {
    return "shopping";
  }
  if (
    /lake|mountain|onsen|温泉|山|湖|峡|雪|snow|forest|bamboo|竹林|滝|nature|garden|hakone|fuji|ropeway|谷|高原|国立公園|草原|ruins|castle|城|滝/.test(
      text,
    )
  ) {
    return "nature";
  }

  return "city";
}

function genreThumbnailUrl(locationName) {
  const keywords = thumbnailKeywords[locationName] ?? "";
  const genre = detectThumbnailGenre(locationName, keywords);
  const photoId = GENRE_PHOTOS[genre];
  return `https://images.unsplash.com/${photoId}?w=400&q=80`;
}
const rawLines = readFileSync(join(__dirname, "spot-input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const seen = new Set();
const input = rawLines.filter((line) => {
  const [location_name, , , , lat, lng] = line.split("|");
  const key = `${location_name}|${lat}|${lng}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

const PREF_JP = {
  Tokyo: "東京都",
  Kanagawa: "神奈川県",
  Gifu: "岐阜県",
  Kyoto: "京都府",
  Shiga: "滋賀県",
  Hyogo: "兵庫県",
  Saitama: "埼玉県",
  Shizuoka: "静岡県",
  Nagano: "長野県",
  Yamanashi: "山梨県",
  Ibaraki: "茨城県",
  Ehime: "愛媛県",
  Tottori: "鳥取県",
  Shimane: "島根県",
  Hiroshima: "広島県",
  Nagasaki: "長崎県",
  Oita: "大分県",
  Kumamoto: "熊本県",
  Fukuoka: "福岡県",
  Miyazaki: "宮崎県",
  Kagoshima: "鹿児島県",
  Okinawa: "沖縄県",
  Osaka: "大阪府",
  Nara: "奈良県",
  Wakayama: "和歌山県",
  Mie: "三重県",
  Aichi: "愛知県",
  Okayama: "岡山県",
  Yamaguchi: "山口県",
  Kagawa: "香川県",
  Tokushima: "徳島県",
  Kochi: "高知県",
  Yamagata: "山形県",
  Miyagi: "宮城県",
  Aomori: "青森県",
  Iwate: "岩手県",
  Akita: "秋田県",
  Fukushima: "福島県",
  Tochigi: "栃木県",
  Gunma: "群馬県",
  Hokkaido: "北海道",
  Ishikawa: "石川県",
  Fukui: "福井県",
  Niigata: "新潟県",
  Toyama: "富山県",
  Saga: "佐賀県",
  Chiba: "千葉県",
};

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524413836757-9caf775564fb?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1574263867129-7a0e8b3f3c08?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1478437388847-6e194bf2e826?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492571350159-32a274813404?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&q=80",
];

function trainMinutes(city, pref) {
  const urban = ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Fukuoka", "Yokohama", "Kobe", "Sapporo"];
  const nearTokyo = ["Kanagawa", "Saitama", "Chiba", "Ibaraki", "Tochigi", "Gunma", "Yamanashi"];
  if (pref === "Tokyo" || urban.some((c) => city.includes(c) || c === city)) {
    return 5 + (city.length % 20);
  }
  if (nearTokyo.includes(pref) || pref === "Kanagawa") return 25 + (city.length % 45);
  if (["Hokkaido", "Okinawa", "Kagoshima"].includes(pref)) return 90 + (city.length % 120);
  return 35 + (city.length % 75);
}

function englishAnime(anime) {
  const map = {
    "君の名は": "Your Name",
    "言の葉の庭": "The Garden of Words",
    "天気の子": "Weathering With You",
    "シュタインズ・ゲート": "Steins;Gate",
    "デュラララ!!": "Durarara!!",
    "各種ジブリ作品": "Studio Ghibli films",
    "千と千尋の神隠し": "Spirited Away",
    "複数作品": "various anime",
    "ラブライブ！": "Love Live!",
    "魔法少女まどか☆マギカ": "Madoka Magica",
    "機動戦士ガンダム": "Mobile Suit Gundam",
    "ゲゲゲの鬼太郎": "GeGeGe no Kitaro",
    "艦隊これくしょん": "Kancolle",
    "SLAM DUNK": "SLAM DUNK",
    "ぼっち・ざ・ろっく": "Bocchi the Rock!",
    "新世紀エヴァンゲリオン": "Neon Genesis Evangelion",
    "名探偵コナン": "Detective Conan",
    "聲の形": "A Silent Voice",
    "氷菓": "Hyouka",
    "鬼滅の刃": "Demon Slayer",
    "響け！ユーフォニアム": "Sound! Euphonium",
    "有頂天家族": "The Eccentric Family",
    "けいおん！": "K-ON!",
    "涼宮ハルヒの憂鬱": "The Melancholy of Haruhi Suzumiya",
    "ベルサイユのばら": "The Rose of Versailles",
    "あの日見た花の名前を僕達はまだ知らない": "Anohana",
    "ラブライブ！サンシャイン!!": "Love Live! Sunshine!!",
    "ゆるキャン△": "Yuru Camp",
    "サマーウォーズ": "Summer Wars",
    "ガールズ&パンツァー": "Girls und Panzer",
    "神様はじめました": "Kamisama Kiss",
    "たまゆら": "Tamayura",
    "かみちゅ！": "Kamichu!",
    "進撃の巨人": "Attack on Titan",
    "夏目友人帳": "Natsume's Book of Friends",
    "もののけ姫": "Princess Mononoke",
    "銀河鉄道の夜": "Night on the Galactic Railroad",
    "花咲くいろは": "Hanasaku Iroha",
    "イナズマイレブン": "Inazuma Eleven",
    "スーパーカブ": "Super Cub",
  };
  if (map[anime]) return map[anime];
  if (anime.includes(" / ")) {
    return anime.split(" / ").map((part) => map[part.trim()] || part.trim()).join(" / ");
  }
  return anime;
}

function description(name, anime, city, pref) {
  const enAnime = englishAnime(anime);
  const prefEn = pref;
  return `${name} is a real-world anime pilgrimage site linked to ${enAnime}. Located in ${city}, ${prefEn}, fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring Japan's sacred anime locations.`;
}

function filterCity(city, prefecture) {
  const map = {
    Tokyo: "Tokyo",
    Kyoto: "Kyoto",
    Osaka: "Osaka",
    Kanagawa: "Kamakura",
    Gifu: "Gifu",
    Nagano: "Nagano",
    Hiroshima: "Hiroshima",
    Nagasaki: "Nagasaki",
    Oita: "Oita",
    Hyogo: "Hyogo",
    Nara: "Nara",
    Shiga: "Shiga",
    Saitama: "Saitama",
    Shizuoka: "Shizuoka",
    Yamanashi: "Yamanashi",
    Ibaraki: "Ibaraki",
    Ehime: "Ehime",
    Tottori: "Tottori",
    Shimane: "Shimane",
    Kumamoto: "Kumamoto",
    Fukuoka: "Fukuoka",
    Miyazaki: "Miyazaki",
    Kagoshima: "Kagoshima",
    Okinawa: "Okinawa",
    Wakayama: "Wakayama",
    Mie: "Mie",
    Aichi: "Aichi",
    Okayama: "Okayama",
    Yamaguchi: "Yamaguchi",
    Kagawa: "Kagawa",
    Tokushima: "Tokushima",
    Kochi: "Kochi",
    Yamagata: "Yamagata",
    Miyagi: "Miyagi",
    Aomori: "Aomori",
    Iwate: "Iwate",
    Akita: "Akita",
    Fukushima: "Fukushima",
    Tochigi: "Tochigi",
    Gunma: "Gunma",
    Hokkaido: "Hokkaido",
    Ishikawa: "Ishikawa",
    Fukui: "Fukui",
    Niigata: "Niigata",
    Toyama: "Toyama",
    Saga: "Saga",
    Chiba: "Chiba",
  };
  if (city === "Hakone") return "Hakone";
  return map[prefecture] || prefecture;
}

function uuid(i) {
  const n = String(i + 1).padStart(4, "0");
  const tail = String(i + 1).padStart(12, "0");
  return `b300${n}-0001-4001-8001-${tail}`;
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const spots = input.map((line, i) => {
  const [location_name, inputAnime, city, prefecture, lat, lng] = line.split("|");
  const anime_title = titleMapping[location_name] ?? inputAnime;
  const prefJp = PREF_JP[prefecture] || `${prefecture}`;
  const address = `${prefJp}${location_name}`;
  const tm = trainMinutes(city, prefecture);

  return {
    id: uuid(i),
    anime_title,
    location_name,
    address,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    description: description(location_name, anime_title, city, prefecture),
    city: filterCity(city, prefecture),
    train_minutes: tm,
    review_count: 0,
    thumbnail_url: genreThumbnailUrl(location_name),
    created_at: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}T00:00:00.000Z`,
    overall_score: null,
  };
});

const out = `import type { SpotWithStats } from "@/types/supabase";

/** ${spots.length} real-world anime pilgrimage spots (auto-generated from catalog) */
export const SEED_SPOTS: SpotWithStats[] = ${JSON.stringify(spots, null, 2)
  .replace(/"([^"]+)":/g, "$1:")
  .replace(/"([^"]*)"/g, '"$1"')};

export const SEED_SPOT_BY_ID = new Map(SEED_SPOTS.map((spot) => [spot.id, spot]));
`;

// Fix JSON to TS format properly - use manual generation instead
let ts = `import type { SpotWithStats } from "@/types/supabase";

/** ${spots.length} real-world anime pilgrimage spots */
export const SEED_SPOTS: SpotWithStats[] = [\n`;

for (const s of spots) {
  ts += `  {\n`;
  ts += `    id: "${s.id}",\n`;
  ts += `    anime_title: "${esc(s.anime_title)}",\n`;
  ts += `    location_name: "${esc(s.location_name)}",\n`;
  ts += `    address: "${esc(s.address)}",\n`;
  ts += `    lat: ${s.lat},\n`;
  ts += `    lng: ${s.lng},\n`;
  ts += `    description:\n      "${esc(s.description)}",\n`;
  ts += `    created_at: "${s.created_at}",\n`;
  ts += `    overall_score: null,\n`;
  ts += `    review_count: 0,\n`;
  ts += `    city: "${esc(s.city)}",\n`;
  ts += `    train_minutes: ${s.train_minutes},\n`;
  ts += `    thumbnail_url:\n      "${s.thumbnail_url}",\n`;
  ts += `  },\n`;
}

ts += `];\n\nexport const SEED_SPOT_BY_ID = new Map(SEED_SPOTS.map((spot) => [spot.id, spot]));\n`;

writeFileSync(join(__dirname, "..", "src", "data", "seed-spots.ts"), ts, "utf8");
console.log(`Generated ${spots.length} spots (${rawLines.length} input lines, ${rawLines.length - input.length} duplicates skipped)`);
