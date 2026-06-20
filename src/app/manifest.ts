import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Animeji — アニメ聖地巡礼",
    short_name: "Animeji",
    description: "全国のアニメ聖地を探して、訪問した感想をレビュー。",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#E53935",
    categories: ["entertainment", "travel", "lifestyle"],
    lang: "ja",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    screenshots: [],
    shortcuts: [
      {
        name: "聖地を探す",
        url: "/spots",
        description: "アニメ聖地を検索・閲覧",
      },
      {
        name: "ランキング",
        url: "/reviews",
        description: "人気の聖地ランキング",
      },
      {
        name: "マップ",
        url: "/spots/map",
        description: "地図で聖地を探す",
      },
    ],
  };
}
