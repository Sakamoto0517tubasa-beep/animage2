const LS_KEY = "local_favorites";

export function getLocalFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function isLocalFavorited(spotId: string): boolean {
  return getLocalFavoriteIds().includes(spotId);
}

/** Returns new favorited state */
export function toggleLocalFavorite(spotId: string): boolean {
  const ids = getLocalFavoriteIds();
  const idx = ids.indexOf(spotId);
  if (idx === -1) {
    ids.push(spotId);
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
    return true;
  } else {
    ids.splice(idx, 1);
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
    return false;
  }
}

export function getLocalFavoriteCount(): number {
  return getLocalFavoriteIds().length;
}
