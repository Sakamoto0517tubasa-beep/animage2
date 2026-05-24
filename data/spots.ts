export type SpotReview = {
  id: string;
  userName: string;
  rating: number;
  body: string;
};

export type SpotDetail = {
  id: string;
  imageUri: string;
  heroUri: string;
  spotName: string;
  workTitle: string;
  score: number;
  trainMinutes: number;
  likesLabel: string;
  ratings: {
    photoScore: number;
    accessibility: number;
    accuracy: number;
    crowdLevel: number;
  };
  bestTime: {
    title: string;
    detail: string;
  };
  howToGetThere: string;
  reviews: SpotReview[];
};

export const SPOTS: SpotDetail[] = [
  {
    id: '1',
    imageUri:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop&q=80',
    heroUri:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop&q=80',
    spotName: 'Kamakura High School Crossing',
    workTitle: 'SLAM DUNK',
    score: 9.2,
    trainMinutes: 18,
    likesLabel: '12.4K',
    ratings: {
      photoScore: 9.4,
      accessibility: 8.8,
      accuracy: 9.6,
      crowdLevel: 7.2,
    },
    bestTime: {
      title: 'Early morning 6–8am',
      detail: 'Soft light and fewer buses at the crossing. Weekends get busy fast.',
    },
    howToGetThere:
      'JR Yokosuka Line to Kamakura Station (about 55 min from Tokyo). Change to Enoden and ride 2 stops to Kita-Kamakura, or walk from Kamakura Station in ~15 min. The crossing is a short walk from Kamakura High School.',
    reviews: [
      {
        id: 'r1-1',
        userName: 'mitsui_fan',
        rating: 5,
        body: 'Goosebumps standing where the opening happens. Bring a wide lens for the gate.',
      },
      {
        id: 'r1-2',
        userName: 'hanamichi',
        rating: 4,
        body: 'Crowded by 10am but still worth it. Respect local traffic rules.',
      },
    ],
  },
  {
    id: '2',
    imageUri:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop&q=80',
    heroUri:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop&q=80',
    spotName: 'Suga Shrine Stairs',
    workTitle: 'Your Name',
    score: 9.5,
    trainMinutes: 28,
    likesLabel: '48.1K',
    ratings: {
      photoScore: 9.8,
      accessibility: 8.2,
      accuracy: 9.4,
      crowdLevel: 8.1,
    },
    bestTime: {
      title: 'Blue hour 5:30–7pm',
      detail: 'City lights behind the stairs match the film mood. Mornings are quieter for portraits.',
    },
    howToGetThere:
      'JR Chuo Line to Yotsuya Station. Exit at Suga Shrine gate and follow signs—about 8 minutes uphill. Wear comfortable shoes; the stone steps are steep.',
    reviews: [
      {
        id: 'r2-1',
        userName: 'mizuha',
        rating: 5,
        body: 'Iconic angle from the landing. Tripod friendly after dusk.',
      },
      {
        id: 'r2-2',
        userName: 'taki_wannabe',
        rating: 5,
        body: 'Busy but magical. Weekday evenings felt calmer than Saturday.',
      },
      {
        id: 'r2-3',
        userName: 'shrine_walker',
        rating: 4,
        body: 'Respect worshippers—keep voices low near the main hall.',
      },
    ],
  },
  {
    id: '3',
    imageUri:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=400&fit=crop&q=80',
    heroUri:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop&q=80',
    spotName: 'Enoshima Shrine',
    workTitle: 'Tari Tari',
    score: 7.9,
    trainMinutes: 48,
    likesLabel: '3.2K',
    ratings: {
      photoScore: 8.6,
      accessibility: 7.5,
      accuracy: 7.8,
      crowdLevel: 6.4,
    },
    bestTime: {
      title: 'Weekday late afternoon',
      detail: 'Golden light on the approach. Summer weekends are packed with beachgoers.',
    },
    howToGetThere:
      'Odakyu Line from Shinjuku to Fujisawa (~1 hr), then Enoden to Enoshima. Walk the bridge and follow the shopping street to the shrine approach.',
    reviews: [
      {
        id: 'r3-1',
        userName: 'choir_travel',
        rating: 4,
        body: 'Windy but beautiful. The anime captures the coastal vibe perfectly.',
      },
      {
        id: 'r3-2',
        userName: 'shonan_daytrip',
        rating: 4,
        body: 'Pair with the island loop walk. Hydrate—lots of stairs.',
      },
    ],
  },
  {
    id: '4',
    imageUri:
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=400&h=400&fit=crop&q=80',
    heroUri:
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&h=800&fit=crop&q=80',
    spotName: 'Sakuragaoka School',
    workTitle: 'Bocchi the Rock',
    score: 8.6,
    trainMinutes: 22,
    likesLabel: '9.8K',
    ratings: {
      photoScore: 8.9,
      accessibility: 8.4,
      accuracy: 8.7,
      crowdLevel: 5.8,
    },
    bestTime: {
      title: 'School holidays / weekends 9–11am',
      detail: 'Exterior shots only—do not enter campus. Respect students and staff.',
    },
    howToGetThere:
      'Keio Line to Shimo-Kitazawa, then Inokashira Line to Shin-Daita (about 22 min from Shibuya area). The school exterior is a short walk—stay on public sidewalks.',
    reviews: [
      {
        id: 'r4-1',
        userName: 'kessoku_band',
        rating: 5,
        body: 'Quiet neighborhood. The fence angles match several shots from the show.',
      },
      {
        id: 'r4-2',
        userName: 'gotoh_snapshot',
        rating: 4,
        body: 'Please keep distance and do not block the gate. Fans were respectful when I visited.',
      },
    ],
  },
];

export function getSpotById(id: string): SpotDetail | undefined {
  return SPOTS.find((s) => s.id === id);
}
