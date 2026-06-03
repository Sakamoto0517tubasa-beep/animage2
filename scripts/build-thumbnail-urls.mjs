import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

const keywords = JSON.parse(
  readFileSync(join(__dirname, "thumbnail-keywords.json"), "utf8"),
);

/** HEAD-verified Unsplash photo IDs (Japan / landmarks) */
const VERIFIED_PHOTOS = [
  "photo-1545569341-9eb8b30979d9",
  "photo-1493976040374-85c8e12f0c0e",
  "photo-1528164344705-47542687000d",
  "photo-1490806843957-31f4c9a91c65",
  "photo-1542051841857-5f90071e7989",
  "photo-1549692520-acc6669e2f0c",
  "photo-1528360983277-13d401cdc186",
  "photo-1540959733332-eab4deabeeaf",
  "photo-1680969716791-2d93c6d60c1f",
  "photo-1758754092064-96446afb0f13",
  "photo-1661495897577-dca2d44276c9",
  "photo-1540999758994-161f2ee6e1c8",
  "photo-1701941583703-f8bbea63ee71",
  "photo-1775340812894-fd92e1f49044",
  "photo-1767951444055-27fbd5b6f039",
  "photo-1573416033034-e42e14b545d2",
  "photo-1491884662610-dfcd28f30cfb",
  "photo-1666426524204-935ec4f3e7ce",
  "photo-1744192792740-39c935e54966",
  "photo-1759746334715-fae30ec56600",
  "photo-1723042292737-731b51df0d74",
  "photo-1563282653-57d1e6f6896d",
  "photo-1616666720306-c1067db00277",
  "photo-1575887984548-ada6d061f1ce",
  "photo-1626275515418-ae406fa3da38",
  "photo-1704026438453-fde2ceb923ad",
  "photo-1765458478821-4d7fc7c197a1",
  "photo-1763312276718-a5dd72680466",
  "photo-1758470476152-3c20807e40c4",
  "photo-1769321149727-0df7333c7e22",
  "photo-1774550933344-80a5a418315e",
  "photo-1590677147861-622ec92a60f6",
  "photo-1681419762429-cf7074e50d0e",
  "photo-1660322297182-2c685ea977d3",
  "photo-1653047022944-8f60bf31d804",
  "photo-1585208798174-6cedd86e019a",
  "photo-1560755816-db429744a31e",
  "photo-1611486212557-88be5ff6f941",
  "photo-1648470583561-7e9638584948",
  "photo-1730325559860-6c6ba1453222",
  "photo-1737382670991-98957247678f",
  "photo-1653961187606-f90b707fd4e6",
  "photo-1653961186720-13b126f45713",
  "photo-1700323491240-72938887f43f",
  "photo-1694945080807-6c0adb216a03",
  "photo-1767589565053-d484d5859b60",
];

/** Priority overrides from user keyword list + verified search results */
const PHOTO_BY_QUERY = {
  "shinjuku shrine stairs japan": "photo-1545569341-9eb8b30979d9",
  "shinjuku gyoen garden japan": "photo-1680969716791-2d93c6d60c1f",
  "shibuya crossing tokyo japan": "photo-1542051841857-5f90071e7989",
  "sensoji temple tokyo japan": "photo-1528164344705-47542687000d",
  "tokyo tower japan": "photo-1549692520-acc6669e2f0c",
  "tokyo skytree japan": "photo-1549692520-acc6669e2f0c",
  "kamakura crossing japan": "photo-1758754092064-96446afb0f13",
  "enoshima island japan": "photo-1661495897577-dca2d44276c9",
  "hakone japan": "photo-1490806843957-31f4c9a91c65",
  "lake ashi hakone japan": "photo-1490806843957-31f4c9a91c65",
  "shirakawa-go japan": "photo-1775340812894-fd92e1f49044",
  "arashiyama bamboo kyoto": "photo-1540999758994-161f2ee6e1c8",
  "fushimi inari kyoto": "photo-1701941583703-f8bbea63ee71",
  "kinkakuji kyoto": "photo-1493976040374-85c8e12f0c0e",
  "kiyomizudera kyoto": "photo-1493976040374-85c8e12f0c0e",
  "uji bridge japan": "photo-1493976040374-85c8e12f0c0e",
  "kamo river kyoto": "photo-1540999758994-161f2ee6e1c8",
  "lake suwa nagano japan": "photo-1490806843957-31f4c9a91c65",
  "lake motosu fuji japan": "photo-1490806843957-31f4c9a91c65",
  "kawaguchiko fuji japan": "photo-1490806843957-31f4c9a91c65",
  "mount fuji japan": "photo-1490806843957-31f4c9a91c65",
  "itsukushima shrine miyajima": "photo-1528164344705-47542687000d",
  "dogo onsen matsuyama": "photo-1545569341-9eb8b30979d9",
  "izumo taisha shrine": "photo-1528164344705-47542687000d",
  "hashima island nagasaki japan": "photo-1540959733332-eab4deabeeaf",
  "ginzan onsen yamagata japan": "photo-1767951444055-27fbd5b6f039",
  "matsushima miyagi japan": "photo-1490806843957-31f4c9a91c65",
  "kenrokuen garden kanazawa": "photo-1680969716791-2d93c6d60c1f",
  "higashi chaya kanazawa japan": "photo-1616666720306-c1067db00277",
  "kanazawa japan traditional": "photo-1616666720306-c1067db00277",
  "himeji castle japan": "photo-1573416033034-e42e14b545d2",
  "osaka castle japan": "photo-1666426524204-935ec4f3e7ce",
  "dotonbori osaka japan": "photo-1744192792740-39c935e54966",
  "shuri castle okinawa": "photo-1575887984548-ada6d061f1ce",
  "oarai shrine ibaraki japan": "photo-1528164344705-47542687000d",
  "oarai beach ibaraki japan": "photo-1490806843957-31f4c9a91c65",
  "numazu port japan": "photo-1490806843957-31f4c9a91c65",
  "chichibu japan": "photo-1490806843957-31f4c9a91c65",
  "takehara hiroshima japan": "photo-1616666720306-c1067db00277",
  "onomichi hiroshima japan": "photo-1616666720306-c1067db00277",
  "takachiho gorge miyazaki japan": "photo-1490806843957-31f4c9a91c65",
  "sakurajima volcano kagoshima": "photo-1490806843957-31f4c9a91c65",
  "yakushima island japan": "photo-1704026438453-fde2ceb923ad",
  "beppu onsen japan": "photo-1545569341-9eb8b30979d9",
  "yufuin onsen japan": "photo-1767951444055-27fbd5b6f039",
  "hitoyoshi kumamoto japan": "photo-1563282653-57d1e6f6896d",
  "sakaiminato tottori japan": "photo-1545569341-9eb8b30979d9",
  "toyosato elementary school japan": "photo-1616666720306-c1067db00277",
  "hida furukawa japan": "photo-1775340812894-fd92e1f49044",
  "takayama japan old town": "photo-1775340812894-fd92e1f49044",
};

function hashPick(key, pool) {
  const hash = createHash("md5").update(key).digest("hex");
  const index = parseInt(hash.slice(0, 8), 16) % pool.length;
  return pool[index];
}

function toUrl(photoId) {
  return `https://images.unsplash.com/${photoId}?w=400&q=80`;
}

function resolveQuery(query) {
  if (PHOTO_BY_QUERY[query]) return PHOTO_BY_QUERY[query];
  return hashPick(query, VERIFIED_PHOTOS);
}

const photoByQueryOut = { ...PHOTO_BY_QUERY };
const thumbnailUrls = {};

for (const [location, query] of Object.entries(keywords)) {
  const photoId = resolveQuery(query);
  photoByQueryOut[query] = photoId;
  thumbnailUrls[location] = toUrl(photoId);
}

writeFileSync(
  join(__dirname, "photo-by-query.json"),
  JSON.stringify(photoByQueryOut, null, 2) + "\n",
  "utf8",
);
writeFileSync(
  join(__dirname, "thumbnail-urls.json"),
  JSON.stringify(thumbnailUrls, null, 2) + "\n",
  "utf8",
);

const unique = new Set(Object.values(thumbnailUrls)).size;
console.log(`Built ${Object.keys(thumbnailUrls).length} thumbnail URLs (${unique} unique)`);
