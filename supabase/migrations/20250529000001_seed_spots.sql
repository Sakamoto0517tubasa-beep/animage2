-- Seed pilgrimage spots (matches src/data/seed-spots.ts UUIDs)
-- Reviews and photos require real auth.users rows; those remain app seed fallbacks
-- until users post content.

insert into public.spots (
  id,
  anime_title,
  location_name,
  address,
  lat,
  lng,
  description,
  created_at
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'SLAM DUNK',
    'Kamakura High School Crossing',
    '2-chome Kamakura, Kamakura, Kanagawa 248-0012, Japan',
    35.3314,
    139.5467,
    'The iconic railroad crossing featured in the opening of SLAM DUNK. A must-visit for basketball anime fans visiting Kamakura.',
    '2024-01-15T00:00:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Your Name',
    'Suga Shrine Stairs',
    '5-6 Sugasawara, Shinjuku City, Tokyo 160-0016, Japan',
    35.6855,
    139.7246,
    'The stone staircase where Taki and Mitsuha meet in Your Name. Best visited at dusk when city lights glow behind the steps.',
    '2024-01-20T00:00:00+00'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Tari Tari',
    'Enoshima Shrine',
    '2-3-8 Enoshima, Fujisawa, Kanagawa 251-0036, Japan',
    35.3258,
    139.4823,
    'A coastal shrine on Enoshima island with sweeping ocean views, featured throughout Tari Tari and many other anime.',
    '2024-02-01T00:00:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Bocchi the Rock!',
    'Shimokitazawa Station Area',
    'Kitazawa, Setagaya City, Tokyo 155-0031, Japan',
    35.6618,
    139.6669,
    'The indie music neighborhood that inspired Bocchi the Rock! Explore live houses, vintage shops, and cozy backstreets.',
    '2024-02-10T00:00:00+00'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Evangelion',
    'Hakone Loop Road Viewpoint',
    'Hakone, Ashigarashimo District, Kanagawa 250-0521, Japan',
    35.2327,
    139.1069,
    'A scenic overlook near Hakone where Evangelion fans gather for dramatic mountain and lake views reminiscent of the series.',
    '2024-02-15T00:00:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'Love Live! Superstar!!',
    'Harajuku Takeshita Street',
    '1 Jingumae, Shibuya City, Tokyo 150-0001, Japan',
    35.6717,
    139.7036,
    'The vibrant heart of Harajuku fashion culture, closely tied to Love Live! Superstar!! and idol pilgrimage routes.',
    '2024-03-01T00:00:00+00'
  )
on conflict (id) do nothing;
