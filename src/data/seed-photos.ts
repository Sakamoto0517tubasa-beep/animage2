import type { Photo } from "@/types/supabase";

export const SEED_PHOTOS: Photo[] = [
  {
    id: "p0000001-0001-4001-8001-000000000001",
    spot_id: "b3000001-0001-4001-8001-000000000000001",
    user_id: "u0000001-0001-4001-8001-000000000001",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&q=80",
    caption: "Blue hour at Suga Shrine",
    created_at: "2024-05-20T18:00:00.000Z",
  },
  {
    id: "p0000002-0001-4001-8001-000000000002",
    spot_id: "b3000026-0001-4001-8001-000000000000026",
    user_id: "u0000002-0001-4001-8001-000000000002",
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&q=80",
    caption: "Morning at the crossing",
    created_at: "2024-06-10T08:35:00.000Z",
  },
];
