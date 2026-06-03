// AnimAge Service Worker v3
const CACHE_VERSION = "animage-v3";
const STATIC_CACHE  = `${CACHE_VERSION}-static`;
const IMAGE_CACHE   = `${CACHE_VERSION}-images`;
const PAGE_CACHE    = `${CACHE_VERSION}-pages`;

const PRECACHE_URLS = [
  "/",
  "/offline",
  "/reviews",
  "/anime",
  "/community",
];

// ── インストール：シェルをプリキャッシュ ──
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {/* ページが存在しなくても続行 */})
    )
  );
  self.skipWaiting();
});

// ── アクティベート：古いキャッシュを削除 ──
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── フェッチ戦略 ──
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // GET のみ処理
  if (request.method !== "GET") return;

  // chrome-extension などはスキップ
  if (!url.protocol.startsWith("http")) return;

  // クロスオリジンの外部画像（anitabi など）: キャッシュ優先
  if (url.origin !== location.origin) {
    if (request.destination === "image") {
      event.respondWith(cacheFirstImage(request));
    }
    return;
  }

  // Next.js 静的アセット (_next/static): キャッシュ優先（immutable）
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 画像
  if (request.destination === "image") {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  // API ルート: ネットワーク優先（失敗時はキャッシュ）
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // ページ: Stale-While-Revalidate
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
    return;
  }

  // その他: ネットワーク優先
  event.respondWith(networkFirst(request));
});

// ── キャッシュ優先（static assets） ──
async function cacheFirst(request, cacheName = STATIC_CACHE) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Network error", { status: 503 });
  }
}

// ── 画像キャッシュ（LRU 風に 200 件上限） ──
async function cacheFirstImage(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok && response.status === 200) {
      const cache = await caches.open(IMAGE_CACHE);
      const keys = await cache.keys();
      if (keys.length >= 200) {
        cache.delete(keys[0]);
      }
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 503 });
  }
}

// ── ネットワーク優先（API） ──
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached ?? new Response(JSON.stringify({ error: "offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ── Stale-While-Revalidate（ページ） ──
async function staleWhileRevalidate(request, cacheName = PAGE_CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    // キャッシュがあればすぐ返しつつバックグラウンドで更新
    networkPromise; // fire and forget
    return cached;
  }

  // キャッシュなし → ネットワーク待機
  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;

  // オフライン → フォールバックページ
  const offline = await cache.match("/offline");
  return offline ?? new Response("Offline", { status: 503 });
}
