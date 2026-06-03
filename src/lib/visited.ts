const LS_KEY = "visited_spots";

export function getVisitedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function isVisited(spotId: string): boolean {
  return getVisitedIds().includes(spotId);
}

export function toggleVisited(spotId: string): boolean {
  const ids = getVisitedIds();
  const idx = ids.indexOf(spotId);
  if (idx === -1) {
    ids.push(spotId);
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
    return true; // 訪問済みに追加
  } else {
    ids.splice(idx, 1);
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
    return false; // 訪問済みから削除
  }
}

export function getVisitedCount(): number {
  return getVisitedIds().length;
}
