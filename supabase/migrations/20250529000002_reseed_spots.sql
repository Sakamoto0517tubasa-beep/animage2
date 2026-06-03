-- Reseed all pilgrimage spots from src/data/seed-spots.ts (262 rows)
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
  (
    'b3000001-0001-4001-8001-000000000001',
    'Your Name',
    'Shinjuku, Tokyo - Site 001',
    'Shinjuku, Tokyo, Japan',
    35.6851,
    139.7195,
    'Real-world anime pilgrimage site linked to Your Name. Located in Shinjuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-01T00:00:00.000Z'
  ),
  (
    'b3000002-0001-4001-8001-000000000002',
    'The Garden of Words',
    'Shinjuku, Tokyo - Site 002',
    'Shinjuku, Tokyo, Japan',
    35.6852,
    139.71,
    'Real-world anime pilgrimage site linked to The Garden of Words. Located in Shinjuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-02T00:00:00.000Z'
  ),
  (
    'b3000003-0001-4001-8001-000000000003',
    'Weathering With You',
    'Shinjuku, Tokyo - Site 003',
    'Shinjuku, Tokyo, Japan',
    35.6702,
    139.7016,
    'Real-world anime pilgrimage site linked to Weathering With You. Located in Shinjuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-03T00:00:00.000Z'
  ),
  (
    'b3000004-0001-4001-8001-000000000004',
    'Steins;Gate',
    'Akihabara, Tokyo - Site 004',
    'Akihabara, Tokyo, Japan',
    35.6984,
    139.7731,
    'Real-world anime pilgrimage site linked to Steins;Gate. Located in Akihabara, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-04T00:00:00.000Z'
  ),
  (
    'b3000005-0001-4001-8001-000000000005',
    'Durarara!!',
    'Ikebukuro, Tokyo - Site 005',
    'Ikebukuro, Tokyo, Japan',
    35.7295,
    139.7195,
    'Real-world anime pilgrimage site linked to Durarara!!. Located in Ikebukuro, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-05T00:00:00.000Z'
  ),
  (
    'b3000006-0001-4001-8001-000000000006',
    '/ Princess Mononoke / / /',
    'Mitaka, Tokyo - Site 006',
    'Mitaka, Tokyo, Japan',
    35.6963,
    139.5702,
    'Real-world anime pilgrimage site linked to / Princess Mononoke / / /. Located in Mitaka, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-06T00:00:00.000Z'
  ),
  (
    'b3000007-0001-4001-8001-000000000007',
    'Spirited Away /',
    'Koganei, Tokyo - Site 007',
    'Koganei, Tokyo, Japan',
    35.7115,
    139.5434,
    'Real-world anime pilgrimage site linked to Spirited Away /. Located in Koganei, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-07T00:00:00.000Z'
  ),
  (
    'b3000008-0001-4001-8001-000000000008',
    'Durarara!! / / / NANA / / 8.0',
    'Shibuya, Tokyo - Site 008',
    'Shibuya, Tokyo, Japan',
    35.6595,
    139.7004,
    'Real-world anime pilgrimage site linked to Durarara!! / / / NANA / / 8.0. Located in Shibuya, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-08T00:00:00.000Z'
  ),
  (
    'b3000009-0001-4001-8001-000000000009',
    'Love Live!',
    'Harajuku, Tokyo - Site 009',
    'Harajuku, Tokyo, Japan',
    35.6699,
    139.7054,
    'Real-world anime pilgrimage site linked to Love Live!. Located in Harajuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-09T00:00:00.000Z'
  ),
  (
    'b3000010-0001-4001-8001-000000000010',
    'The Garden of Words / Your Name /',
    'Shibuya, Tokyo - Site 010',
    'Shibuya, Tokyo, Japan',
    35.6717,
    139.6955,
    'Real-world anime pilgrimage site linked to The Garden of Words / Your Name /. Located in Shibuya, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-10T00:00:00.000Z'
  ),
  (
    'b3000011-0001-4001-8001-000000000011',
    '8.0',
    'Ueno, Tokyo - Site 011',
    'Ueno, Tokyo, Japan',
    35.7141,
    139.7741,
    'Real-world anime pilgrimage site linked to 8.0. Located in Ueno, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-11T00:00:00.000Z'
  ),
  (
    'b3000012-0001-4001-8001-000000000012',
    'Demon Slayer / /',
    'Asakusa, Tokyo - Site 012',
    'Asakusa, Tokyo, Japan',
    35.7111,
    139.7966,
    'Real-world anime pilgrimage site linked to Demon Slayer / /. Located in Asakusa, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-12T00:00:00.000Z'
  ),
  (
    'b3000013-0001-4001-8001-000000000013',
    'Madoka Magica / 8.0 /',
    'Minato, Tokyo - Site 013',
    'Minato, Tokyo, Japan',
    35.6586,
    139.7454,
    'Real-world anime pilgrimage site linked to Madoka Magica / 8.0 /. Located in Minato, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-13T00:00:00.000Z'
  ),
  (
    'b3000014-0001-4001-8001-000000000014',
    '/ Love Live!',
    'Sumida, Tokyo - Site 014',
    'Sumida, Tokyo, Japan',
    35.7101,
    139.8107,
    'Real-world anime pilgrimage site linked to / Love Live!. Located in Sumida, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-14T00:00:00.000Z'
  ),
  (
    'b3000015-0001-4001-8001-000000000015',
    'Mobile Suit Gundam / STEINS;GATE / Love Live! Sunshine!!',
    'Koto, Tokyo - Site 015',
    'Koto, Tokyo, Japan',
    35.6253,
    139.7756,
    'Real-world anime pilgrimage site linked to Mobile Suit Gundam / STEINS;GATE / Love Live! Sunshine!!. Located in Koto, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-15T00:00:00.000Z'
  ),
  (
    'b3000016-0001-4001-8001-000000000016',
    'Your Name',
    'Meguro, Tokyo - Site 016',
    'Meguro, Tokyo, Japan',
    35.6443,
    139.7006,
    'Real-world anime pilgrimage site linked to Your Name. Located in Meguro, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-16T00:00:00.000Z'
  ),
  (
    'b3000017-0001-4001-8001-000000000017',
    'Madoka Magica',
    'Suginami, Tokyo - Site 017',
    'Suginami, Tokyo, Japan',
    35.7047,
    139.6241,
    'Real-world anime pilgrimage site linked to Madoka Magica. Located in Suginami, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-17T00:00:00.000Z'
  ),
  (
    'b3000018-0001-4001-8001-000000000018',
    '/',
    'Shinjuku, Tokyo - Site 018',
    'Shinjuku, Tokyo, Japan',
    35.7033,
    139.739,
    'Real-world anime pilgrimage site linked to /. Located in Shinjuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-18T00:00:00.000Z'
  ),
  (
    'b3000019-0001-4001-8001-000000000019',
    'Your Name / Love Live! / NANA',
    'Harajuku, Tokyo - Site 019',
    'Harajuku, Tokyo, Japan',
    35.6763,
    139.6993,
    'Real-world anime pilgrimage site linked to Your Name / Love Live! / NANA. Located in Harajuku, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-19T00:00:00.000Z'
  ),
  (
    'b3000020-0001-4001-8001-000000000020',
    'GATE / Madoka Magica',
    'Tachikawa, Tokyo - Site 020',
    'Tachikawa, Tokyo, Japan',
    35.7003,
    139.4006,
    'Real-world anime pilgrimage site linked to GATE / Madoka Magica. Located in Tachikawa, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-20T00:00:00.000Z'
  ),
  (
    'b3000021-0001-4001-8001-000000000021',
    'GeGeGe no Kitaro',
    'Chofu, Tokyo - Site 021',
    'Chofu, Tokyo, Japan',
    35.6514,
    139.5462,
    'Real-world anime pilgrimage site linked to GeGeGe no Kitaro. Located in Chofu, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-21T00:00:00.000Z'
  ),
  (
    'b3000022-0001-4001-8001-000000000022',
    'PSYCHO-PASS /',
    'Minato, Tokyo - Site 022',
    'Minato, Tokyo, Japan',
    35.6604,
    139.7292,
    'Real-world anime pilgrimage site linked to PSYCHO-PASS /. Located in Minato, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-22T00:00:00.000Z'
  ),
  (
    'b3000023-0001-4001-8001-000000000023',
    '3 /',
    'Suginami, Tokyo - Site 023',
    'Suginami, Tokyo, Japan',
    35.7068,
    139.6494,
    'Real-world anime pilgrimage site linked to 3 /. Located in Suginami, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-23T00:00:00.000Z'
  ),
  (
    'b3000024-0001-4001-8001-000000000024',
    'Various anime',
    'Arakawa, Tokyo - Site 024',
    'Arakawa, Tokyo, Japan',
    35.7278,
    139.7706,
    'Real-world anime pilgrimage site linked to Various anime. Located in Arakawa, Tokyo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-24T00:00:00.000Z'
  ),
  (
    'b3000025-0001-4001-8001-000000000025',
    'Kancolle /',
    'Yokosuka, Kanagawa - Site 025',
    'Yokosuka, Kanagawa, Japan',
    35.2825,
    139.6724,
    'Real-world anime pilgrimage site linked to Kancolle /. Located in Yokosuka, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-25T00:00:00.000Z'
  ),
  (
    'b3000026-0001-4001-8001-000000000026',
    'SLAM DUNK',
    'Kamakura, Kanagawa - Site 026',
    'Kamakura, Kanagawa, Japan',
    35.3085,
    139.4981,
    'Real-world anime pilgrimage site linked to SLAM DUNK. Located in Kamakura, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-26T00:00:00.000Z'
  ),
  (
    'b3000027-0001-4001-8001-000000000027',
    'SLAM DUNK / Bocchi the Rock!',
    'Fujisawa, Kanagawa - Site 027',
    'Fujisawa, Kanagawa, Japan',
    35.2996,
    139.4822,
    'Real-world anime pilgrimage site linked to SLAM DUNK / Bocchi the Rock!. Located in Fujisawa, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-27T00:00:00.000Z'
  ),
  (
    'b3000028-0001-4001-8001-000000000028',
    'Bocchi the Rock!',
    'Setagaya, Kanagawa - Site 028',
    'Setagaya, Kanagawa, Japan',
    35.6613,
    139.668,
    'Real-world anime pilgrimage site linked to Bocchi the Rock!. Located in Setagaya, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-28T00:00:00.000Z'
  ),
  (
    'b3000029-0001-4001-8001-000000000029',
    'Neon Genesis Evangelion',
    'Hakone, Kanagawa - Site 029',
    'Hakone, Kanagawa, Japan',
    35.2352,
    139.1069,
    'Real-world anime pilgrimage site linked to Neon Genesis Evangelion. Located in Hakone, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-01T00:00:00.000Z'
  ),
  (
    'b3000030-0001-4001-8001-000000000030',
    'Neon Genesis Evangelion',
    'Hakone, Kanagawa - Site 030',
    'Hakone, Kanagawa, Japan',
    35.196,
    139.0247,
    'Real-world anime pilgrimage site linked to Neon Genesis Evangelion. Located in Hakone, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-02T00:00:00.000Z'
  ),
  (
    'b3000031-0001-4001-8001-000000000031',
    'Neon Genesis Evangelion',
    'Hakone, Kanagawa - Site 031',
    'Hakone, Kanagawa, Japan',
    35.245,
    139.024,
    'Real-world anime pilgrimage site linked to Neon Genesis Evangelion. Located in Hakone, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-03T00:00:00.000Z'
  ),
  (
    'b3000032-0001-4001-8001-000000000032',
    'SLAM DUNK /',
    'Kamakura, Kanagawa - Site 032',
    'Kamakura, Kanagawa, Japan',
    35.3167,
    139.5357,
    'Real-world anime pilgrimage site linked to SLAM DUNK /. Located in Kamakura, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-04T00:00:00.000Z'
  ),
  (
    'b3000033-0001-4001-8001-000000000033',
    'Detective Conan / / NANA',
    'Yokohama, Kanagawa - Site 033',
    'Yokohama, Kanagawa, Japan',
    35.4437,
    139.6425,
    'Real-world anime pilgrimage site linked to Detective Conan / / NANA. Located in Yokohama, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-05T00:00:00.000Z'
  ),
  (
    'b3000034-0001-4001-8001-000000000034',
    'CLANNAD / Detective Conan / / / NANA',
    'Yokohama, Kanagawa - Site 034',
    'Yokohama, Kanagawa, Japan',
    35.4567,
    139.6317,
    'Real-world anime pilgrimage site linked to CLANNAD / Detective Conan / / / NANA. Located in Yokohama, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-06T00:00:00.000Z'
  ),
  (
    'b3000035-0001-4001-8001-000000000035',
    'SLAM DUNK / Bocchi the Rock! / diary',
    'Kamakura, Kanagawa - Site 035',
    'Kamakura, Kanagawa, Japan',
    35.3042,
    139.5227,
    'Real-world anime pilgrimage site linked to SLAM DUNK / Bocchi the Rock! / diary. Located in Kamakura, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-07T00:00:00.000Z'
  ),
  (
    'b3000036-0001-4001-8001-000000000036',
    'SLAM DUNK / diary /',
    'Kamakura, Kanagawa - Site 036',
    'Kamakura, Kanagawa, Japan',
    35.3317,
    139.5427,
    'Real-world anime pilgrimage site linked to SLAM DUNK / diary /. Located in Kamakura, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-08T00:00:00.000Z'
  ),
  (
    'b3000037-0001-4001-8001-000000000037',
    'Your Name',
    'Hida, Gifu - Site 037',
    'Hida, Gifu, Japan',
    36.2447,
    137.1883,
    'Real-world anime pilgrimage site linked to Your Name. Located in Hida, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-09T00:00:00.000Z'
  ),
  (
    'b3000038-0001-4001-8001-000000000038',
    'Your Name',
    'Hida, Gifu - Site 038',
    'Hida, Gifu, Japan',
    36.2476,
    137.1875,
    'Real-world anime pilgrimage site linked to Your Name. Located in Hida, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-10T00:00:00.000Z'
  ),
  (
    'b3000039-0001-4001-8001-000000000039',
    'Your Name',
    'Hida, Gifu - Site 039',
    'Hida, Gifu, Japan',
    36.243,
    137.1855,
    'Real-world anime pilgrimage site linked to Your Name. Located in Hida, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-11T00:00:00.000Z'
  ),
  (
    'b3000040-0001-4001-8001-000000000040',
    'A Silent Voice',
    'Ogaki, Gifu - Site 040',
    'Ogaki, Gifu, Japan',
    35.3598,
    136.6197,
    'Real-world anime pilgrimage site linked to A Silent Voice. Located in Ogaki, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-12T00:00:00.000Z'
  ),
  (
    'b3000041-0001-4001-8001-000000000041',
    'A Silent Voice',
    'Ogaki, Gifu - Site 041',
    'Ogaki, Gifu, Japan',
    35.3712,
    136.6089,
    'Real-world anime pilgrimage site linked to A Silent Voice. Located in Ogaki, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-13T00:00:00.000Z'
  ),
  (
    'b3000042-0001-4001-8001-000000000042',
    'A Silent Voice',
    'Ogaki, Gifu - Site 042',
    'Ogaki, Gifu, Japan',
    35.3621,
    136.6218,
    'Real-world anime pilgrimage site linked to A Silent Voice. Located in Ogaki, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-14T00:00:00.000Z'
  ),
  (
    'b3000043-0001-4001-8001-000000000043',
    'Hyouka',
    'Takayama, Gifu - Site 043',
    'Takayama, Gifu, Japan',
    36.1462,
    137.2552,
    'Real-world anime pilgrimage site linked to Hyouka. Located in Takayama, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-15T00:00:00.000Z'
  ),
  (
    'b3000044-0001-4001-8001-000000000044',
    'Hyouka',
    'Takayama, Gifu - Site 044',
    'Takayama, Gifu, Japan',
    36.1404,
    137.2527,
    'Real-world anime pilgrimage site linked to Hyouka. Located in Takayama, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-16T00:00:00.000Z'
  ),
  (
    'b3000045-0001-4001-8001-000000000045',
    'various anime',
    'Shirakawa, Gifu - Site 045',
    'Shirakawa, Gifu, Japan',
    36.2572,
    136.9056,
    'Real-world anime pilgrimage site linked to various anime. Located in Shirakawa, Gifu, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-17T00:00:00.000Z'
  ),
  (
    'b3000046-0001-4001-8001-000000000046',
    'Demon Slayer / The Eccentric Family /',
    'Kyoto, Kyoto - Site 046',
    'Kyoto, Kyoto, Japan',
    35.0167,
    135.6718,
    'Real-world anime pilgrimage site linked to Demon Slayer / The Eccentric Family /. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-18T00:00:00.000Z'
  ),
  (
    'b3000047-0001-4001-8001-000000000047',
    'Demon Slayer /',
    'Kyoto, Kyoto - Site 047',
    'Kyoto, Kyoto, Japan',
    35.1134,
    135.7478,
    'Real-world anime pilgrimage site linked to Demon Slayer /. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-19T00:00:00.000Z'
  ),
  (
    'b3000048-0001-4001-8001-000000000048',
    'Demon Slayer / Spirited Away / / The Eccentric Family',
    'Fushimi, Kyoto - Site 048',
    'Fushimi, Kyoto, Japan',
    34.9671,
    135.7727,
    'Real-world anime pilgrimage site linked to Demon Slayer / Spirited Away / / The Eccentric Family. Located in Fushimi, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-20T00:00:00.000Z'
  ),
  (
    'b3000049-0001-4001-8001-000000000049',
    'Sound! Euphonium /',
    'Uji, Kyoto - Site 049',
    'Uji, Kyoto, Japan',
    34.8864,
    135.8008,
    'Real-world anime pilgrimage site linked to Sound! Euphonium /. Located in Uji, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-21T00:00:00.000Z'
  ),
  (
    'b3000050-0001-4001-8001-000000000050',
    'Sound! Euphonium',
    'Uji, Kyoto - Site 050',
    'Uji, Kyoto, Japan',
    34.8893,
    135.8099,
    'Real-world anime pilgrimage site linked to Sound! Euphonium. Located in Uji, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-22T00:00:00.000Z'
  ),
  (
    'b3000051-0001-4001-8001-000000000051',
    'The Eccentric Family / K-ON! / / Sound! Euphonium',
    'Kyoto, Kyoto - Site 051',
    'Kyoto, Kyoto, Japan',
    35.0371,
    135.7733,
    'Real-world anime pilgrimage site linked to The Eccentric Family / K-ON! / / Sound! Euphonium. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-23T00:00:00.000Z'
  ),
  (
    'b3000052-0001-4001-8001-000000000052',
    'The Eccentric Family / / Demon Slayer',
    'Kyoto, Kyoto - Site 052',
    'Kyoto, Kyoto, Japan',
    35.0038,
    135.774,
    'Real-world anime pilgrimage site linked to The Eccentric Family / / Demon Slayer. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-24T00:00:00.000Z'
  ),
  (
    'b3000053-0001-4001-8001-000000000053',
    'The Eccentric Family / / Demon Slayer',
    'Kyoto, Kyoto - Site 053',
    'Kyoto, Kyoto, Japan',
    34.9948,
    135.785,
    'Real-world anime pilgrimage site linked to The Eccentric Family / / Demon Slayer. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-25T00:00:00.000Z'
  ),
  (
    'b3000054-0001-4001-8001-000000000054',
    'The Eccentric Family',
    'Kyoto, Kyoto - Site 054',
    'Kyoto, Kyoto, Japan',
    35.0394,
    135.7292,
    'Real-world anime pilgrimage site linked to The Eccentric Family. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-26T00:00:00.000Z'
  ),
  (
    'b3000055-0001-4001-8001-000000000055',
    'Demon Slayer',
    'Kyoto, Kyoto - Site 055',
    'Kyoto, Kyoto, Japan',
    35.0158,
    135.7101,
    'Real-world anime pilgrimage site linked to Demon Slayer. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-27T00:00:00.000Z'
  ),
  (
    'b3000056-0001-4001-8001-000000000056',
    'K-ON!',
    'Toyosato, Shiga - Site 056',
    'Toyosato, Shiga, Japan',
    35.2005,
    136.2164,
    'Real-world anime pilgrimage site linked to K-ON!. Located in Toyosato, Shiga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-28T00:00:00.000Z'
  ),
  (
    'b3000057-0001-4001-8001-000000000057',
    'Various anime',
    'Hikone, Shiga - Site 057',
    'Hikone, Shiga, Japan',
    35.2763,
    136.2505,
    'Real-world anime pilgrimage site linked to Various anime. Located in Hikone, Shiga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-01T00:00:00.000Z'
  ),
  (
    'b3000058-0001-4001-8001-000000000058',
    'Sound! Euphonium',
    'Omihachiman, Shiga - Site 058',
    'Omihachiman, Shiga, Japan',
    35.1267,
    136.0998,
    'Real-world anime pilgrimage site linked to Sound! Euphonium. Located in Omihachiman, Shiga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-02T00:00:00.000Z'
  ),
  (
    'b3000059-0001-4001-8001-000000000059',
    'Various anime',
    'Nagahama, Shiga - Site 059',
    'Nagahama, Shiga, Japan',
    35.4572,
    136.133,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nagahama, Shiga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-03T00:00:00.000Z'
  ),
  (
    'b3000060-0001-4001-8001-000000000060',
    'The Melancholy of Haruhi Suzumiya',
    'Nishinomiya, Hyogo - Site 060',
    'Nishinomiya, Hyogo, Japan',
    34.7578,
    135.3571,
    'Real-world anime pilgrimage site linked to The Melancholy of Haruhi Suzumiya. Located in Nishinomiya, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-04T00:00:00.000Z'
  ),
  (
    'b3000061-0001-4001-8001-000000000061',
    'The Melancholy of Haruhi Suzumiya',
    'Nishinomiya, Hyogo - Site 061',
    'Nishinomiya, Hyogo, Japan',
    34.7517,
    135.3511,
    'Real-world anime pilgrimage site linked to The Melancholy of Haruhi Suzumiya. Located in Nishinomiya, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-05T00:00:00.000Z'
  ),
  (
    'b3000062-0001-4001-8001-000000000062',
    'The Melancholy of Haruhi Suzumiya',
    'Nishinomiya, Hyogo - Site 062',
    'Nishinomiya, Hyogo, Japan',
    34.7424,
    135.3625,
    'Real-world anime pilgrimage site linked to The Melancholy of Haruhi Suzumiya. Located in Nishinomiya, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-06T00:00:00.000Z'
  ),
  (
    'b3000063-0001-4001-8001-000000000063',
    'The Melancholy of Haruhi Suzumiya',
    'Nishinomiya, Hyogo - Site 063',
    'Nishinomiya, Hyogo, Japan',
    34.7613,
    135.375,
    'Real-world anime pilgrimage site linked to The Melancholy of Haruhi Suzumiya. Located in Nishinomiya, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-07T00:00:00.000Z'
  ),
  (
    'b3000064-0001-4001-8001-000000000064',
    'Various anime',
    'Kobe, Hyogo - Site 064',
    'Kobe, Hyogo, Japan',
    34.6999,
    135.1858,
    'Real-world anime pilgrimage site linked to Various anime. Located in Kobe, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-08T00:00:00.000Z'
  ),
  (
    'b3000065-0001-4001-8001-000000000065',
    'Yuru Camp',
    'Kobe, Hyogo - Site 065',
    'Kobe, Hyogo, Japan',
    34.7975,
    135.2453,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Kobe, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-09T00:00:00.000Z'
  ),
  (
    'b3000066-0001-4001-8001-000000000066',
    'Various anime',
    'Himeji, Hyogo - Site 066',
    'Himeji, Hyogo, Japan',
    34.8394,
    134.6939,
    'Real-world anime pilgrimage site linked to Various anime. Located in Himeji, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-10T00:00:00.000Z'
  ),
  (
    'b3000067-0001-4001-8001-000000000067',
    'The Rose of Versailles',
    'Takarazuka, Hyogo - Site 067',
    'Takarazuka, Hyogo, Japan',
    34.7996,
    135.3571,
    'Real-world anime pilgrimage site linked to The Rose of Versailles. Located in Takarazuka, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-11T00:00:00.000Z'
  ),
  (
    'b3000068-0001-4001-8001-000000000068',
    'various anime',
    'Asago, Hyogo - Site 068',
    'Asago, Hyogo, Japan',
    35.2969,
    134.8352,
    'Real-world anime pilgrimage site linked to various anime. Located in Asago, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-12T00:00:00.000Z'
  ),
  (
    'b3000069-0001-4001-8001-000000000069',
    'Anohana',
    'Chichibu, Saitama - Site 069',
    'Chichibu, Saitama, Japan',
    35.9919,
    139.0851,
    'Real-world anime pilgrimage site linked to Anohana. Located in Chichibu, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-13T00:00:00.000Z'
  ),
  (
    'b3000070-0001-4001-8001-000000000070',
    'Anohana',
    'Chichibu, Saitama - Site 070',
    'Chichibu, Saitama, Japan',
    35.9949,
    139.0862,
    'Real-world anime pilgrimage site linked to Anohana. Located in Chichibu, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-14T00:00:00.000Z'
  ),
  (
    'b3000071-0001-4001-8001-000000000071',
    'Anohana',
    'Nagatoro, Saitama - Site 071',
    'Nagatoro, Saitama, Japan',
    36.1093,
    139.1232,
    'Real-world anime pilgrimage site linked to Anohana. Located in Nagatoro, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-15T00:00:00.000Z'
  ),
  (
    'b3000072-0001-4001-8001-000000000072',
    'Anohana',
    'Chichibu, Saitama - Site 072',
    'Chichibu, Saitama, Japan',
    36.0234,
    139.1124,
    'Real-world anime pilgrimage site linked to Anohana. Located in Chichibu, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-16T00:00:00.000Z'
  ),
  (
    'b3000073-0001-4001-8001-000000000073',
    'Anohana',
    'Chichibu, Saitama - Site 073',
    'Chichibu, Saitama, Japan',
    35.979,
    139.0763,
    'Real-world anime pilgrimage site linked to Anohana. Located in Chichibu, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-17T00:00:00.000Z'
  ),
  (
    'b3000074-0001-4001-8001-000000000074',
    'various anime',
    'Saitama, Saitama - Site 074',
    'Saitama, Saitama, Japan',
    35.9064,
    139.6297,
    'Real-world anime pilgrimage site linked to various anime. Located in Saitama, Saitama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-18T00:00:00.000Z'
  ),
  (
    'b3000075-0001-4001-8001-000000000075',
    'Love Live! Sunshine!!',
    'Numazu, Shizuoka - Site 075',
    'Numazu, Shizuoka, Japan',
    35.0966,
    138.8631,
    'Real-world anime pilgrimage site linked to Love Live! Sunshine!!. Located in Numazu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-19T00:00:00.000Z'
  ),
  (
    'b3000076-0001-4001-8001-000000000076',
    'Love Live! Sunshine!!',
    'Numazu, Shizuoka - Site 076',
    'Numazu, Shizuoka, Japan',
    35.0213,
    138.9018,
    'Real-world anime pilgrimage site linked to Love Live! Sunshine!!. Located in Numazu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-20T00:00:00.000Z'
  ),
  (
    'b3000077-0001-4001-8001-000000000077',
    'Love Live! Sunshine!!',
    'Numazu, Shizuoka - Site 077',
    'Numazu, Shizuoka, Japan',
    35.0118,
    138.8838,
    'Real-world anime pilgrimage site linked to Love Live! Sunshine!!. Located in Numazu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-21T00:00:00.000Z'
  ),
  (
    'b3000078-0001-4001-8001-000000000078',
    'Love Live! Sunshine!!',
    'Izu, Shizuoka - Site 078',
    'Izu, Shizuoka, Japan',
    34.9195,
    138.7738,
    'Real-world anime pilgrimage site linked to Love Live! Sunshine!!. Located in Izu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-22T00:00:00.000Z'
  ),
  (
    'b3000079-0001-4001-8001-000000000079',
    'Love Live! Sunshine!!',
    'Numazu, Shizuoka - Site 079',
    'Numazu, Shizuoka, Japan',
    35.0935,
    138.8628,
    'Real-world anime pilgrimage site linked to Love Live! Sunshine!!. Located in Numazu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-23T00:00:00.000Z'
  ),
  (
    'b3000080-0001-4001-8001-000000000080',
    'Yuru Camp',
    'Gotemba, Shizuoka - Site 080',
    'Gotemba, Shizuoka, Japan',
    35.3083,
    138.9348,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Gotemba, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-24T00:00:00.000Z'
  ),
  (
    'b3000081-0001-4001-8001-000000000081',
    'various anime',
    'Atami, Shizuoka - Site 081',
    'Atami, Shizuoka, Japan',
    35.1009,
    139.0734,
    'Real-world anime pilgrimage site linked to various anime. Located in Atami, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-25T00:00:00.000Z'
  ),
  (
    'b3000082-0001-4001-8001-000000000082',
    'various anime',
    'Izu, Shizuoka - Site 082',
    'Izu, Shizuoka, Japan',
    34.9716,
    138.9267,
    'Real-world anime pilgrimage site linked to various anime. Located in Izu, Shizuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-26T00:00:00.000Z'
  ),
  (
    'b3000083-0001-4001-8001-000000000083',
    'Your Name',
    'Suwa, Nagano - Site 083',
    'Suwa, Nagano, Japan',
    36.0274,
    138.0823,
    'Real-world anime pilgrimage site linked to Your Name. Located in Suwa, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-27T00:00:00.000Z'
  ),
  (
    'b3000084-0001-4001-8001-000000000084',
    'various anime',
    'Suwa, Nagano - Site 084',
    'Suwa, Nagano, Japan',
    36.0387,
    138.0742,
    'Real-world anime pilgrimage site linked to various anime. Located in Suwa, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-28T00:00:00.000Z'
  ),
  (
    'b3000085-0001-4001-8001-000000000085',
    'Demon Slayer',
    'Shiojiri, Nagano - Site 085',
    'Shiojiri, Nagano, Japan',
    35.9334,
    137.8667,
    'Real-world anime pilgrimage site linked to Demon Slayer. Located in Shiojiri, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-01T00:00:00.000Z'
  ),
  (
    'b3000086-0001-4001-8001-000000000086',
    'Summer Wars',
    'Ueda, Nagano - Site 086',
    'Ueda, Nagano, Japan',
    36.4036,
    138.2492,
    'Real-world anime pilgrimage site linked to Summer Wars. Located in Ueda, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-02T00:00:00.000Z'
  ),
  (
    'b3000087-0001-4001-8001-000000000087',
    'Summer Wars',
    'Ueda, Nagano - Site 087',
    'Ueda, Nagano, Japan',
    36.3487,
    138.1736,
    'Real-world anime pilgrimage site linked to Summer Wars. Located in Ueda, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-03T00:00:00.000Z'
  ),
  (
    'b3000088-0001-4001-8001-000000000088',
    'CLANNAD / / various anime',
    'Matsumoto, Nagano - Site 088',
    'Matsumoto, Nagano, Japan',
    36.2381,
    137.9723,
    'Real-world anime pilgrimage site linked to CLANNAD / / various anime. Located in Matsumoto, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-04T00:00:00.000Z'
  ),
  (
    'b3000089-0001-4001-8001-000000000089',
    'various anime',
    'Azumino, Nagano - Site 089',
    'Azumino, Nagano, Japan',
    36.306,
    137.8795,
    'Real-world anime pilgrimage site linked to various anime. Located in Azumino, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-05T00:00:00.000Z'
  ),
  (
    'b3000090-0001-4001-8001-000000000090',
    'Yuru Camp',
    'Minobu, Yamanashi - Site 090',
    'Minobu, Yamanashi, Japan',
    35.4687,
    138.5785,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Minobu, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-06T00:00:00.000Z'
  ),
  (
    'b3000091-0001-4001-8001-000000000091',
    'Yuru Camp',
    'Fujikawaguchiko, Yamanashi - Site 091',
    'Fujikawaguchiko, Yamanashi, Japan',
    35.5065,
    138.7673,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Fujikawaguchiko, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-07T00:00:00.000Z'
  ),
  (
    'b3000092-0001-4001-8001-000000000092',
    'Yuru Camp',
    'Fujikawaguchiko, Yamanashi - Site 092',
    'Fujikawaguchiko, Yamanashi, Japan',
    35.4795,
    138.6147,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Fujikawaguchiko, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-08T00:00:00.000Z'
  ),
  (
    'b3000093-0001-4001-8001-000000000093',
    'Yuru Camp',
    'Minobu, Yamanashi - Site 093',
    'Minobu, Yamanashi, Japan',
    35.3706,
    138.4356,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Minobu, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-09T00:00:00.000Z'
  ),
  (
    'b3000094-0001-4001-8001-000000000094',
    'Yuru Camp',
    'Yamanakako, Yamanashi - Site 094',
    'Yamanakako, Yamanashi, Japan',
    35.4184,
    138.8706,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Yamanakako, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-10T00:00:00.000Z'
  ),
  (
    'b3000095-0001-4001-8001-000000000095',
    'Yuru Camp',
    'Oshino, Yamanashi - Site 095',
    'Oshino, Yamanashi, Japan',
    35.4566,
    138.8268,
    'Real-world anime pilgrimage site linked to Yuru Camp. Located in Oshino, Yamanashi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-11T00:00:00.000Z'
  ),
  (
    'b3000096-0001-4001-8001-000000000096',
    'Girls und Panzer',
    'Oarai, Ibaraki - Site 096',
    'Oarai, Ibaraki, Japan',
    36.3133,
    140.5763,
    'Real-world anime pilgrimage site linked to Girls und Panzer. Located in Oarai, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-12T00:00:00.000Z'
  ),
  (
    'b3000097-0001-4001-8001-000000000097',
    'Girls und Panzer',
    'Oarai, Ibaraki - Site 097',
    'Oarai, Ibaraki, Japan',
    36.3084,
    140.5717,
    'Real-world anime pilgrimage site linked to Girls und Panzer. Located in Oarai, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-13T00:00:00.000Z'
  ),
  (
    'b3000098-0001-4001-8001-000000000098',
    'Girls und Panzer',
    'Oarai, Ibaraki - Site 098',
    'Oarai, Ibaraki, Japan',
    36.3122,
    140.5772,
    'Real-world anime pilgrimage site linked to Girls und Panzer. Located in Oarai, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-14T00:00:00.000Z'
  ),
  (
    'b3000099-0001-4001-8001-000000000099',
    'Girls und Panzer',
    'Oarai, Ibaraki - Site 099',
    'Oarai, Ibaraki, Japan',
    36.2969,
    140.5754,
    'Real-world anime pilgrimage site linked to Girls und Panzer. Located in Oarai, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-15T00:00:00.000Z'
  ),
  (
    'b3000100-0001-4001-8001-000000000100',
    'various anime',
    'Mito, Ibaraki - Site 100',
    'Mito, Ibaraki, Japan',
    36.3778,
    140.4648,
    'Real-world anime pilgrimage site linked to various anime. Located in Mito, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-16T00:00:00.000Z'
  ),
  (
    'b3000101-0001-4001-8001-000000000101',
    'various anime',
    'Tsukuba, Ibaraki - Site 101',
    'Tsukuba, Ibaraki, Japan',
    36.2254,
    140.1005,
    'Real-world anime pilgrimage site linked to various anime. Located in Tsukuba, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-17T00:00:00.000Z'
  ),
  (
    'b3000102-0001-4001-8001-000000000102',
    'Spirited Away',
    'Matsuyama, Ehime - Site 102',
    'Matsuyama, Ehime, Japan',
    33.8517,
    132.7865,
    'Real-world anime pilgrimage site linked to Spirited Away. Located in Matsuyama, Ehime, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-18T00:00:00.000Z'
  ),
  (
    'b3000103-0001-4001-8001-000000000103',
    'various anime',
    'Matsuyama, Ehime - Site 103',
    'Matsuyama, Ehime, Japan',
    33.8434,
    132.7661,
    'Real-world anime pilgrimage site linked to various anime. Located in Matsuyama, Ehime, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-19T00:00:00.000Z'
  ),
  (
    'b3000104-0001-4001-8001-000000000104',
    'various anime',
    'Imabari, Ehime - Site 104',
    'Imabari, Ehime, Japan',
    34.102,
    133.1848,
    'Real-world anime pilgrimage site linked to various anime. Located in Imabari, Ehime, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-20T00:00:00.000Z'
  ),
  (
    'b3000105-0001-4001-8001-000000000105',
    'various anime',
    'Uwajima, Ehime - Site 105',
    'Uwajima, Ehime, Japan',
    33.2238,
    132.5607,
    'Real-world anime pilgrimage site linked to various anime. Located in Uwajima, Ehime, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-21T00:00:00.000Z'
  ),
  (
    'b3000106-0001-4001-8001-000000000106',
    'GeGeGe no Kitaro',
    'Sakaiminato, Tottori - Site 106',
    'Sakaiminato, Tottori, Japan',
    35.5421,
    133.2356,
    'Real-world anime pilgrimage site linked to GeGeGe no Kitaro. Located in Sakaiminato, Tottori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-22T00:00:00.000Z'
  ),
  (
    'b3000107-0001-4001-8001-000000000107',
    'GeGeGe no Kitaro',
    'Sakaiminato, Tottori - Site 107',
    'Sakaiminato, Tottori, Japan',
    35.5406,
    133.2321,
    'Real-world anime pilgrimage site linked to GeGeGe no Kitaro. Located in Sakaiminato, Tottori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-23T00:00:00.000Z'
  ),
  (
    'b3000108-0001-4001-8001-000000000108',
    'Various anime',
    'Tottori, Tottori - Site 108',
    'Tottori, Tottori, Japan',
    35.5394,
    134.228,
    'Real-world anime pilgrimage site linked to Various anime. Located in Tottori, Tottori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-24T00:00:00.000Z'
  ),
  (
    'b3000109-0001-4001-8001-000000000109',
    'Various anime',
    'Daisen, Tottori - Site 109',
    'Daisen, Tottori, Japan',
    35.367,
    133.5476,
    'Real-world anime pilgrimage site linked to Various anime. Located in Daisen, Tottori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-25T00:00:00.000Z'
  ),
  (
    'b3000110-0001-4001-8001-000000000110',
    'Kamisama Kiss / Rin: Daughters of Mnemosyne',
    'Izumo, Shimane - Site 110',
    'Izumo, Shimane, Japan',
    35.4015,
    132.6851,
    'Real-world anime pilgrimage site linked to Kamisama Kiss / Rin: Daughters of Mnemosyne. Located in Izumo, Shimane, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-26T00:00:00.000Z'
  ),
  (
    'b3000111-0001-4001-8001-000000000111',
    'Kamisama Kiss',
    'Izumo, Shimane - Site 111',
    'Izumo, Shimane, Japan',
    35.407,
    132.6683,
    'Real-world anime pilgrimage site linked to Kamisama Kiss. Located in Izumo, Shimane, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-27T00:00:00.000Z'
  ),
  (
    'b3000112-0001-4001-8001-000000000112',
    'IS / Kamisama Kiss',
    'Matsue, Shimane - Site 112',
    'Matsue, Shimane, Japan',
    35.474,
    133.0503,
    'Real-world anime pilgrimage site linked to IS / Kamisama Kiss. Located in Matsue, Shimane, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-28T00:00:00.000Z'
  ),
  (
    'b3000113-0001-4001-8001-000000000113',
    'Kamisama Kiss',
    'Matsue, Shimane - Site 113',
    'Matsue, Shimane, Japan',
    35.428,
    132.9987,
    'Real-world anime pilgrimage site linked to Kamisama Kiss. Located in Matsue, Shimane, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-01T00:00:00.000Z'
  ),
  (
    'b3000114-0001-4001-8001-000000000114',
    'Tamayura',
    'Takehara, Hiroshima - Site 114',
    'Takehara, Hiroshima, Japan',
    34.3421,
    132.9175,
    'Real-world anime pilgrimage site linked to Tamayura. Located in Takehara, Hiroshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-02T00:00:00.000Z'
  ),
  (
    'b3000115-0001-4001-8001-000000000115',
    'Kamichu! /',
    'Onomichi, Hiroshima - Site 115',
    'Onomichi, Hiroshima, Japan',
    34.4082,
    133.2013,
    'Real-world anime pilgrimage site linked to Kamichu! /. Located in Onomichi, Hiroshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-03T00:00:00.000Z'
  ),
  (
    'b3000116-0001-4001-8001-000000000116',
    'Kamichu!',
    'Onomichi, Hiroshima - Site 116',
    'Onomichi, Hiroshima, Japan',
    34.3896,
    133.2147,
    'Real-world anime pilgrimage site linked to Kamichu!. Located in Onomichi, Hiroshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-04T00:00:00.000Z'
  ),
  (
    'b3000117-0001-4001-8001-000000000117',
    'Hanasaku Iroha /',
    'Hatsukaichi, Hiroshima - Site 117',
    'Hatsukaichi, Hiroshima, Japan',
    34.2959,
    132.3196,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha /. Located in Hatsukaichi, Hiroshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-05T00:00:00.000Z'
  ),
  (
    'b3000118-0001-4001-8001-000000000118',
    'Various anime',
    'Hiroshima, Hiroshima - Site 118',
    'Hiroshima, Hiroshima, Japan',
    34.3953,
    132.4525,
    'Real-world anime pilgrimage site linked to Various anime. Located in Hiroshima, Hiroshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-06T00:00:00.000Z'
  ),
  (
    'b3000119-0001-4001-8001-000000000119',
    'Attack on Titan',
    'Nagasaki, Nagasaki - Site 119',
    'Nagasaki, Nagasaki, Japan',
    32.6277,
    129.7387,
    'Real-world anime pilgrimage site linked to Attack on Titan. Located in Nagasaki, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-07T00:00:00.000Z'
  ),
  (
    'b3000120-0001-4001-8001-000000000120',
    'Various anime',
    'Nagasaki, Nagasaki - Site 120',
    'Nagasaki, Nagasaki, Japan',
    32.7278,
    129.868,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nagasaki, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-08T00:00:00.000Z'
  ),
  (
    'b3000121-0001-4001-8001-000000000121',
    'Various anime',
    'Nagasaki, Nagasaki - Site 121',
    'Nagasaki, Nagasaki, Japan',
    32.7459,
    129.8817,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nagasaki, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-09T00:00:00.000Z'
  ),
  (
    'b3000122-0001-4001-8001-000000000122',
    'Mobile Suit Gundam / various anime',
    'Sasebo, Nagasaki - Site 122',
    'Sasebo, Nagasaki, Japan',
    33.0873,
    129.9241,
    'Real-world anime pilgrimage site linked to Mobile Suit Gundam / various anime. Located in Sasebo, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-10T00:00:00.000Z'
  ),
  (
    'b3000123-0001-4001-8001-000000000123',
    'Attack on Titan',
    'Hita, Oita - Site 123',
    'Hita, Oita, Japan',
    33.3218,
    130.9415,
    'Real-world anime pilgrimage site linked to Attack on Titan. Located in Hita, Oita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-11T00:00:00.000Z'
  ),
  (
    'b3000124-0001-4001-8001-000000000124',
    'Demon Slayer',
    'Beppu, Oita - Site 124',
    'Beppu, Oita, Japan',
    33.2841,
    131.4912,
    'Real-world anime pilgrimage site linked to Demon Slayer. Located in Beppu, Oita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-12T00:00:00.000Z'
  ),
  (
    'b3000125-0001-4001-8001-000000000125',
    'Demon Slayer / various anime',
    'Yufu, Oita - Site 125',
    'Yufu, Oita, Japan',
    33.2584,
    131.3665,
    'Real-world anime pilgrimage site linked to Demon Slayer / various anime. Located in Yufu, Oita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-13T00:00:00.000Z'
  ),
  (
    'b3000126-0001-4001-8001-000000000126',
    'various anime',
    'Nakatsu, Oita - Site 126',
    'Nakatsu, Oita, Japan',
    33.371,
    131.1243,
    'Real-world anime pilgrimage site linked to various anime. Located in Nakatsu, Oita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-14T00:00:00.000Z'
  ),
  (
    'b3000127-0001-4001-8001-000000000127',
    'Natsume''s Book of Friends',
    'Hitoyoshi, Kumamoto - Site 127',
    'Hitoyoshi, Kumamoto, Japan',
    32.2127,
    130.8082,
    'Real-world anime pilgrimage site linked to Natsume''s Book of Friends. Located in Hitoyoshi, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-15T00:00:00.000Z'
  ),
  (
    'b3000128-0001-4001-8001-000000000128',
    'Natsume''s Book of Friends /',
    'Kumamoto, Kumamoto - Site 128',
    'Kumamoto, Kumamoto, Japan',
    32.8062,
    130.7061,
    'Real-world anime pilgrimage site linked to Natsume''s Book of Friends /. Located in Kumamoto, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-16T00:00:00.000Z'
  ),
  (
    'b3000129-0001-4001-8001-000000000129',
    'Natsume''s Book of Friends',
    'Aso, Kumamoto - Site 129',
    'Aso, Kumamoto, Japan',
    32.8843,
    131.0991,
    'Real-world anime pilgrimage site linked to Natsume''s Book of Friends. Located in Aso, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-17T00:00:00.000Z'
  ),
  (
    'b3000130-0001-4001-8001-000000000130',
    'various anime',
    'Amakusa, Kumamoto - Site 130',
    'Amakusa, Kumamoto, Japan',
    32.4598,
    130.1975,
    'Real-world anime pilgrimage site linked to various anime. Located in Amakusa, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-18T00:00:00.000Z'
  ),
  (
    'b3000131-0001-4001-8001-000000000131',
    'various anime',
    'Dazaifu, Fukuoka - Site 131',
    'Dazaifu, Fukuoka, Japan',
    33.5215,
    130.5332,
    'Real-world anime pilgrimage site linked to various anime. Located in Dazaifu, Fukuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-19T00:00:00.000Z'
  ),
  (
    'b3000132-0001-4001-8001-000000000132',
    'various anime',
    'Kitakyushu, Fukuoka - Site 132',
    'Kitakyushu, Fukuoka, Japan',
    33.9452,
    130.9747,
    'Real-world anime pilgrimage site linked to various anime. Located in Kitakyushu, Fukuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-20T00:00:00.000Z'
  ),
  (
    'b3000133-0001-4001-8001-000000000133',
    'various anime',
    'Fukuoka, Fukuoka - Site 133',
    'Fukuoka, Fukuoka, Japan',
    33.5953,
    130.3536,
    'Real-world anime pilgrimage site linked to various anime. Located in Fukuoka, Fukuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-21T00:00:00.000Z'
  ),
  (
    'b3000134-0001-4001-8001-000000000134',
    'various anime',
    'Yanagawa, Fukuoka - Site 134',
    'Yanagawa, Fukuoka, Japan',
    33.1635,
    130.4028,
    'Real-world anime pilgrimage site linked to various anime. Located in Yanagawa, Fukuoka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-22T00:00:00.000Z'
  ),
  (
    'b3000135-0001-4001-8001-000000000135',
    'Princess Mononoke / various anime',
    'Takachiho, Miyazaki - Site 135',
    'Takachiho, Miyazaki, Japan',
    32.7089,
    131.3036,
    'Real-world anime pilgrimage site linked to Princess Mononoke / various anime. Located in Takachiho, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-23T00:00:00.000Z'
  ),
  (
    'b3000136-0001-4001-8001-000000000136',
    'various anime',
    'Miyazaki, Miyazaki - Site 136',
    'Miyazaki, Miyazaki, Japan',
    31.8687,
    131.4756,
    'Real-world anime pilgrimage site linked to various anime. Located in Miyazaki, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-24T00:00:00.000Z'
  ),
  (
    'b3000137-0001-4001-8001-000000000137',
    'various anime',
    'Nichinan, Miyazaki - Site 137',
    'Nichinan, Miyazaki, Japan',
    31.6143,
    131.3981,
    'Real-world anime pilgrimage site linked to various anime. Located in Nichinan, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-25T00:00:00.000Z'
  ),
  (
    'b3000138-0001-4001-8001-000000000138',
    'NANA / various anime',
    'Kagoshima, Kagoshima - Site 138',
    'Kagoshima, Kagoshima, Japan',
    31.5808,
    130.6575,
    'Real-world anime pilgrimage site linked to NANA / various anime. Located in Kagoshima, Kagoshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-26T00:00:00.000Z'
  ),
  (
    'b3000139-0001-4001-8001-000000000139',
    'Princess Mononoke',
    'Yakushima, Kagoshima - Site 139',
    'Yakushima, Kagoshima, Japan',
    30.3662,
    130.5435,
    'Real-world anime pilgrimage site linked to Princess Mononoke. Located in Yakushima, Kagoshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-27T00:00:00.000Z'
  ),
  (
    'b3000140-0001-4001-8001-000000000140',
    'various anime',
    'Kirishima, Kagoshima - Site 140',
    'Kirishima, Kagoshima, Japan',
    31.8821,
    130.864,
    'Real-world anime pilgrimage site linked to various anime. Located in Kirishima, Kagoshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-28T00:00:00.000Z'
  ),
  (
    'b3000141-0001-4001-8001-000000000141',
    'Yuru Camp / various anime',
    'Ibusuki, Kagoshima - Site 141',
    'Ibusuki, Kagoshima, Japan',
    31.2484,
    130.638,
    'Real-world anime pilgrimage site linked to Yuru Camp / various anime. Located in Ibusuki, Kagoshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-01T00:00:00.000Z'
  ),
  (
    'b3000142-0001-4001-8001-000000000142',
    '/ various anime',
    'Naha, Okinawa - Site 142',
    'Naha, Okinawa, Japan',
    26.2172,
    127.7197,
    'Real-world anime pilgrimage site linked to / various anime. Located in Naha, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-02T00:00:00.000Z'
  ),
  (
    'b3000143-0001-4001-8001-000000000143',
    'various anime',
    'Nakijin, Okinawa - Site 143',
    'Nakijin, Okinawa, Japan',
    26.6589,
    128.0335,
    'Real-world anime pilgrimage site linked to various anime. Located in Nakijin, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-03T00:00:00.000Z'
  ),
  (
    'b3000144-0001-4001-8001-000000000144',
    'various anime',
    'Motobu, Okinawa - Site 144',
    'Motobu, Okinawa, Japan',
    26.6941,
    127.8778,
    'Real-world anime pilgrimage site linked to various anime. Located in Motobu, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-04T00:00:00.000Z'
  ),
  (
    'b3000145-0001-4001-8001-000000000145',
    'various anime',
    'Nakijin, Okinawa - Site 145',
    'Nakijin, Okinawa, Japan',
    26.6887,
    127.9133,
    'Real-world anime pilgrimage site linked to various anime. Located in Nakijin, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-05T00:00:00.000Z'
  ),
  (
    'b3000146-0001-4001-8001-000000000146',
    'STEINS;GATE / / / NANA',
    'Osaka, Osaka - Site 146',
    'Osaka, Osaka, Japan',
    34.6687,
    135.5013,
    'Real-world anime pilgrimage site linked to STEINS;GATE / / / NANA. Located in Osaka, Osaka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-06T00:00:00.000Z'
  ),
  (
    'b3000147-0001-4001-8001-000000000147',
    'Various anime',
    'Osaka, Osaka - Site 147',
    'Osaka, Osaka, Japan',
    34.6523,
    135.5063,
    'Real-world anime pilgrimage site linked to Various anime. Located in Osaka, Osaka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-07T00:00:00.000Z'
  ),
  (
    'b3000148-0001-4001-8001-000000000148',
    'CLANNAD',
    'Osaka, Osaka - Site 148',
    'Osaka, Osaka, Japan',
    34.7062,
    135.4901,
    'Real-world anime pilgrimage site linked to CLANNAD. Located in Osaka, Osaka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-08T00:00:00.000Z'
  ),
  (
    'b3000149-0001-4001-8001-000000000149',
    'Various anime',
    'Osaka, Osaka - Site 149',
    'Osaka, Osaka, Japan',
    34.6873,
    135.5261,
    'Real-world anime pilgrimage site linked to Various anime. Located in Osaka, Osaka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-09T00:00:00.000Z'
  ),
  (
    'b3000150-0001-4001-8001-000000000150',
    'CLANNAD',
    'Osaka, Osaka - Site 150',
    'Osaka, Osaka, Japan',
    34.6126,
    135.4932,
    'Real-world anime pilgrimage site linked to CLANNAD. Located in Osaka, Osaka, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-10T00:00:00.000Z'
  ),
  (
    'b3000151-0001-4001-8001-000000000151',
    'Various anime',
    'Nara, Nara - Site 151',
    'Nara, Nara, Japan',
    34.6851,
    135.843,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nara, Nara, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-11T00:00:00.000Z'
  ),
  (
    'b3000152-0001-4001-8001-000000000152',
    'Various anime',
    'Nara, Nara - Site 152',
    'Nara, Nara, Japan',
    34.6814,
    135.8493,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nara, Nara, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-12T00:00:00.000Z'
  ),
  (
    'b3000153-0001-4001-8001-000000000153',
    'various anime',
    'Nara, Nara - Site 153',
    'Nara, Nara, Japan',
    34.6888,
    135.8398,
    'Real-world anime pilgrimage site linked to various anime. Located in Nara, Nara, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-13T00:00:00.000Z'
  ),
  (
    'b3000154-0001-4001-8001-000000000154',
    'Demon Slayer / / Kamisama Kiss',
    'Nachikatsuura, Wakayama - Site 154',
    'Nachikatsuura, Wakayama, Japan',
    33.6681,
    135.887,
    'Real-world anime pilgrimage site linked to Demon Slayer / / Kamisama Kiss. Located in Nachikatsuura, Wakayama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-14T00:00:00.000Z'
  ),
  (
    'b3000155-0001-4001-8001-000000000155',
    'Kamisama Kiss / / Demon Slayer',
    'Tanabe, Wakayama - Site 155',
    'Tanabe, Wakayama, Japan',
    33.8403,
    135.7868,
    'Real-world anime pilgrimage site linked to Kamisama Kiss / / Demon Slayer. Located in Tanabe, Wakayama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-15T00:00:00.000Z'
  ),
  (
    'b3000156-0001-4001-8001-000000000156',
    'Demon Slayer /',
    'Koya, Wakayama - Site 156',
    'Koya, Wakayama, Japan',
    34.2126,
    135.5849,
    'Real-world anime pilgrimage site linked to Demon Slayer /. Located in Koya, Wakayama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-16T00:00:00.000Z'
  ),
  (
    'b3000157-0001-4001-8001-000000000157',
    'Kamisama Kiss / / Demon Slayer',
    'Ise, Mie - Site 157',
    'Ise, Mie, Japan',
    34.4554,
    136.7254,
    'Real-world anime pilgrimage site linked to Kamisama Kiss / / Demon Slayer. Located in Ise, Mie, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-17T00:00:00.000Z'
  ),
  (
    'b3000158-0001-4001-8001-000000000158',
    'Kamisama Kiss',
    'Ise, Mie - Site 158',
    'Ise, Mie, Japan',
    34.455,
    136.7244,
    'Real-world anime pilgrimage site linked to Kamisama Kiss. Located in Ise, Mie, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-18T00:00:00.000Z'
  ),
  (
    'b3000159-0001-4001-8001-000000000159',
    '/ various anime',
    'Nagoya, Aichi - Site 159',
    'Nagoya, Aichi, Japan',
    35.1855,
    136.899,
    'Real-world anime pilgrimage site linked to / various anime. Located in Nagoya, Aichi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-19T00:00:00.000Z'
  ),
  (
    'b3000160-0001-4001-8001-000000000160',
    'various anime',
    'Nagoya, Aichi - Site 160',
    'Nagoya, Aichi, Japan',
    35.1586,
    136.9014,
    'Real-world anime pilgrimage site linked to various anime. Located in Nagoya, Aichi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-20T00:00:00.000Z'
  ),
  (
    'b3000161-0001-4001-8001-000000000161',
    '/ various anime',
    'Inuyama, Aichi - Site 161',
    'Inuyama, Aichi, Japan',
    35.3832,
    136.9438,
    'Real-world anime pilgrimage site linked to / various anime. Located in Inuyama, Aichi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-21T00:00:00.000Z'
  ),
  (
    'b3000162-0001-4001-8001-000000000162',
    'Tamayura',
    'Kurashiki, Okayama - Site 162',
    'Kurashiki, Okayama, Japan',
    34.5938,
    133.7726,
    'Real-world anime pilgrimage site linked to Tamayura. Located in Kurashiki, Okayama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-22T00:00:00.000Z'
  ),
  (
    'b3000163-0001-4001-8001-000000000163',
    'various anime',
    'Okayama, Okayama - Site 163',
    'Okayama, Okayama, Japan',
    34.6622,
    133.9368,
    'Real-world anime pilgrimage site linked to various anime. Located in Okayama, Okayama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-23T00:00:00.000Z'
  ),
  (
    'b3000164-0001-4001-8001-000000000164',
    'Mobile Suit Gundam / various anime',
    'Iwakuni, Yamaguchi - Site 164',
    'Iwakuni, Yamaguchi, Japan',
    34.1501,
    132.1742,
    'Real-world anime pilgrimage site linked to Mobile Suit Gundam / various anime. Located in Iwakuni, Yamaguchi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-24T00:00:00.000Z'
  ),
  (
    'b3000165-0001-4001-8001-000000000165',
    'NANA / Love Live! Sunshine!!',
    'Shimonoseki, Yamaguchi - Site 165',
    'Shimonoseki, Yamaguchi, Japan',
    34.351,
    130.8834,
    'Real-world anime pilgrimage site linked to NANA / Love Live! Sunshine!!. Located in Shimonoseki, Yamaguchi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-25T00:00:00.000Z'
  ),
  (
    'b3000166-0001-4001-8001-000000000166',
    'Various anime',
    'Hagi, Yamaguchi - Site 166',
    'Hagi, Yamaguchi, Japan',
    34.4085,
    131.3996,
    'Real-world anime pilgrimage site linked to Various anime. Located in Hagi, Yamaguchi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-26T00:00:00.000Z'
  ),
  (
    'b3000167-0001-4001-8001-000000000167',
    'various anime',
    'Naoshima, Kagawa - Site 167',
    'Naoshima, Kagawa, Japan',
    34.461,
    133.999,
    'Real-world anime pilgrimage site linked to various anime. Located in Naoshima, Kagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-27T00:00:00.000Z'
  ),
  (
    'b3000168-0001-4001-8001-000000000168',
    'various anime',
    'Kotohira, Kagawa - Site 168',
    'Kotohira, Kagawa, Japan',
    34.2148,
    133.8143,
    'Real-world anime pilgrimage site linked to various anime. Located in Kotohira, Kagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-28T00:00:00.000Z'
  ),
  (
    'b3000169-0001-4001-8001-000000000169',
    'Various anime',
    'Shodoshima, Kagawa - Site 169',
    'Shodoshima, Kagawa, Japan',
    34.4793,
    134.2879,
    'Real-world anime pilgrimage site linked to Various anime. Located in Shodoshima, Kagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-01T00:00:00.000Z'
  ),
  (
    'b3000170-0001-4001-8001-000000000170',
    'Various anime',
    'Miyoshi, Tokushima - Site 170',
    'Miyoshi, Tokushima, Japan',
    33.8561,
    133.8841,
    'Real-world anime pilgrimage site linked to Various anime. Located in Miyoshi, Tokushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-02T00:00:00.000Z'
  ),
  (
    'b3000171-0001-4001-8001-000000000171',
    'various anime',
    'Miyoshi, Tokushima - Site 171',
    'Miyoshi, Tokushima, Japan',
    33.8441,
    133.8641,
    'Real-world anime pilgrimage site linked to various anime. Located in Miyoshi, Tokushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-03T00:00:00.000Z'
  ),
  (
    'b3000172-0001-4001-8001-000000000172',
    'various anime',
    'Kochi, Kochi - Site 172',
    'Kochi, Kochi, Japan',
    33.4898,
    133.5758,
    'Real-world anime pilgrimage site linked to various anime. Located in Kochi, Kochi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-04T00:00:00.000Z'
  ),
  (
    'b3000173-0001-4001-8001-000000000173',
    'various anime',
    'Shimanto, Kochi - Site 173',
    'Shimanto, Kochi, Japan',
    33.1025,
    132.9311,
    'Real-world anime pilgrimage site linked to various anime. Located in Shimanto, Kochi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-05T00:00:00.000Z'
  ),
  (
    'b3000174-0001-4001-8001-000000000174',
    'Spirited Away',
    'Obanazawa, Yamagata - Site 174',
    'Obanazawa, Yamagata, Japan',
    38.5513,
    140.5284,
    'Real-world anime pilgrimage site linked to Spirited Away. Located in Obanazawa, Yamagata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-06T00:00:00.000Z'
  ),
  (
    'b3000175-0001-4001-8001-000000000175',
    'various anime',
    'Yamagata, Yamagata - Site 175',
    'Yamagata, Yamagata, Japan',
    38.324,
    140.4463,
    'Real-world anime pilgrimage site linked to various anime. Located in Yamagata, Yamagata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-07T00:00:00.000Z'
  ),
  (
    'b3000176-0001-4001-8001-000000000176',
    'Hanasaku Iroha / / various anime',
    'Matsushima, Miyagi - Site 176',
    'Matsushima, Miyagi, Japan',
    38.3682,
    141.0669,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / / various anime. Located in Matsushima, Miyagi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-08T00:00:00.000Z'
  ),
  (
    'b3000177-0001-4001-8001-000000000177',
    'DATE A LIVE',
    'Sendai, Miyagi - Site 177',
    'Sendai, Miyagi, Japan',
    38.2535,
    140.8597,
    'Real-world anime pilgrimage site linked to DATE A LIVE. Located in Sendai, Miyagi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-09T00:00:00.000Z'
  ),
  (
    'b3000178-0001-4001-8001-000000000178',
    'various anime',
    'Hirosaki, Aomori - Site 178',
    'Hirosaki, Aomori, Japan',
    40.6073,
    140.4648,
    'Real-world anime pilgrimage site linked to various anime. Located in Hirosaki, Aomori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-10T00:00:00.000Z'
  ),
  (
    'b3000179-0001-4001-8001-000000000179',
    'various anime',
    'Towada, Aomori - Site 179',
    'Towada, Aomori, Japan',
    40.5191,
    140.922,
    'Real-world anime pilgrimage site linked to various anime. Located in Towada, Aomori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-11T00:00:00.000Z'
  ),
  (
    'b3000180-0001-4001-8001-000000000180',
    'various anime',
    'Tono, Iwate - Site 180',
    'Tono, Iwate, Japan',
    39.3279,
    141.5285,
    'Real-world anime pilgrimage site linked to various anime. Located in Tono, Iwate, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-12T00:00:00.000Z'
  ),
  (
    'b3000181-0001-4001-8001-000000000181',
    'Night on the Galactic Railroad',
    'Hanamaki, Iwate - Site 181',
    'Hanamaki, Iwate, Japan',
    39.4375,
    141.1286,
    'Real-world anime pilgrimage site linked to Night on the Galactic Railroad. Located in Hanamaki, Iwate, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-13T00:00:00.000Z'
  ),
  (
    'b3000182-0001-4001-8001-000000000182',
    'Demon Slayer / various anime',
    'Hiraizumi, Iwate - Site 182',
    'Hiraizumi, Iwate, Japan',
    38.9872,
    141.1129,
    'Real-world anime pilgrimage site linked to Demon Slayer / various anime. Located in Hiraizumi, Iwate, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-14T00:00:00.000Z'
  ),
  (
    'b3000183-0001-4001-8001-000000000183',
    'Madoka Magica / various anime',
    'Kakunodate, Akita - Site 183',
    'Kakunodate, Akita, Japan',
    39.5972,
    140.5644,
    'Real-world anime pilgrimage site linked to Madoka Magica / various anime. Located in Kakunodate, Akita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-15T00:00:00.000Z'
  ),
  (
    'b3000184-0001-4001-8001-000000000184',
    'various anime',
    'Semboku, Akita - Site 184',
    'Semboku, Akita, Japan',
    39.7228,
    140.6605,
    'Real-world anime pilgrimage site linked to various anime. Located in Semboku, Akita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-16T00:00:00.000Z'
  ),
  (
    'b3000185-0001-4001-8001-000000000185',
    '/ various anime',
    'Aizu-Wakamatsu, Fukushima - Site 185',
    'Aizu-Wakamatsu, Fukushima, Japan',
    37.4942,
    139.9303,
    'Real-world anime pilgrimage site linked to / various anime. Located in Aizu-Wakamatsu, Fukushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-17T00:00:00.000Z'
  ),
  (
    'b3000186-0001-4001-8001-000000000186',
    'various anime',
    'Shimogo, Fukushima - Site 186',
    'Shimogo, Fukushima, Japan',
    37.3214,
    139.8574,
    'Real-world anime pilgrimage site linked to various anime. Located in Shimogo, Fukushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-18T00:00:00.000Z'
  ),
  (
    'b3000187-0001-4001-8001-000000000187',
    'various anime',
    'Kitashiobara, Fukushima - Site 187',
    'Kitashiobara, Fukushima, Japan',
    37.6678,
    140.1106,
    'Real-world anime pilgrimage site linked to various anime. Located in Kitashiobara, Fukushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-19T00:00:00.000Z'
  ),
  (
    'b3000188-0001-4001-8001-000000000188',
    '/ various anime',
    'Nikko, Tochigi - Site 188',
    'Nikko, Tochigi, Japan',
    36.758,
    139.599,
    'Real-world anime pilgrimage site linked to / various anime. Located in Nikko, Tochigi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-20T00:00:00.000Z'
  ),
  (
    'b3000189-0001-4001-8001-000000000189',
    'Re: / various anime',
    'Kusatsu, Gunma - Site 189',
    'Kusatsu, Gunma, Japan',
    36.6205,
    138.5962,
    'Real-world anime pilgrimage site linked to Re: / various anime. Located in Kusatsu, Gunma, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-21T00:00:00.000Z'
  ),
  (
    'b3000190-0001-4001-8001-000000000190',
    'Yuru Camp / various anime',
    'Shibukawa, Gunma - Site 190',
    'Shibukawa, Gunma, Japan',
    36.54,
    138.9207,
    'Real-world anime pilgrimage site linked to Yuru Camp / various anime. Located in Shibukawa, Gunma, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-22T00:00:00.000Z'
  ),
  (
    'b3000191-0001-4001-8001-000000000191',
    'School Days / Angel Beats / CLANNAD / Madoka Magica',
    'Otaru, Hokkaido - Site 191',
    'Otaru, Hokkaido, Japan',
    43.1907,
    140.9947,
    'Real-world anime pilgrimage site linked to School Days / Angel Beats / CLANNAD / Madoka Magica. Located in Otaru, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-23T00:00:00.000Z'
  ),
  (
    'b3000192-0001-4001-8001-000000000192',
    'various anime',
    'Hakodate, Hokkaido - Site 192',
    'Hakodate, Hokkaido, Japan',
    41.759,
    140.7005,
    'Real-world anime pilgrimage site linked to various anime. Located in Hakodate, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-24T00:00:00.000Z'
  ),
  (
    'b3000193-0001-4001-8001-000000000193',
    'Yuru Camp / various anime',
    'Furano, Hokkaido - Site 193',
    'Furano, Hokkaido, Japan',
    43.342,
    142.3835,
    'Real-world anime pilgrimage site linked to Yuru Camp / various anime. Located in Furano, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-25T00:00:00.000Z'
  ),
  (
    'b3000194-0001-4001-8001-000000000194',
    'various anime',
    'Toyako, Hokkaido - Site 194',
    'Toyako, Hokkaido, Japan',
    42.5481,
    140.8143,
    'Real-world anime pilgrimage site linked to various anime. Located in Toyako, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-26T00:00:00.000Z'
  ),
  (
    'b3000195-0001-4001-8001-000000000195',
    'various anime',
    'Shari, Hokkaido - Site 195',
    'Shari, Hokkaido, Japan',
    44.0635,
    144.9001,
    'Real-world anime pilgrimage site linked to various anime. Located in Shari, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-27T00:00:00.000Z'
  ),
  (
    'b3000196-0001-4001-8001-000000000196',
    'various anime',
    'Niseko, Hokkaido - Site 196',
    'Niseko, Hokkaido, Japan',
    42.8062,
    140.6865,
    'Real-world anime pilgrimage site linked to various anime. Located in Niseko, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-28T00:00:00.000Z'
  ),
  (
    'b3000197-0001-4001-8001-000000000197',
    'Hanasaku Iroha / various anime',
    'Kanazawa, Ishikawa - Site 197',
    'Kanazawa, Ishikawa, Japan',
    36.5725,
    136.6592,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / various anime. Located in Kanazawa, Ishikawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-01T00:00:00.000Z'
  ),
  (
    'b3000198-0001-4001-8001-000000000198',
    'Hanasaku Iroha / / various anime',
    'Kanazawa, Ishikawa - Site 198',
    'Kanazawa, Ishikawa, Japan',
    36.5619,
    136.6623,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / / various anime. Located in Kanazawa, Ishikawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-02T00:00:00.000Z'
  ),
  (
    'b3000199-0001-4001-8001-000000000199',
    'Hanasaku Iroha',
    'Hakui, Ishikawa - Site 199',
    'Hakui, Ishikawa, Japan',
    36.8086,
    136.6744,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha. Located in Hakui, Ishikawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-03T00:00:00.000Z'
  ),
  (
    'b3000200-0001-4001-8001-000000000200',
    'Hanasaku Iroha',
    'Nanao, Ishikawa - Site 200',
    'Nanao, Ishikawa, Japan',
    37.0558,
    136.9969,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha. Located in Nanao, Ishikawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-04T00:00:00.000Z'
  ),
  (
    'b3000201-0001-4001-8001-000000000201',
    'Demon Slayer / various anime',
    'Eiheiji, Fukui - Site 201',
    'Eiheiji, Fukui, Japan',
    36.0931,
    136.5396,
    'Real-world anime pilgrimage site linked to Demon Slayer / various anime. Located in Eiheiji, Fukui, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-05T00:00:00.000Z'
  ),
  (
    'b3000202-0001-4001-8001-000000000202',
    'various anime',
    'Sakai, Fukui - Site 202',
    'Sakai, Fukui, Japan',
    36.236,
    136.1767,
    'Real-world anime pilgrimage site linked to various anime. Located in Sakai, Fukui, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-06T00:00:00.000Z'
  ),
  (
    'b3000203-0001-4001-8001-000000000203',
    'various anime',
    'Tsubame, Niigata - Site 203',
    'Tsubame, Niigata, Japan',
    37.698,
    138.8291,
    'Real-world anime pilgrimage site linked to various anime. Located in Tsubame, Niigata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-07T00:00:00.000Z'
  ),
  (
    'b3000204-0001-4001-8001-000000000204',
    'various anime',
    'Sado, Niigata - Site 204',
    'Sado, Niigata, Japan',
    37.9867,
    138.3706,
    'Real-world anime pilgrimage site linked to various anime. Located in Sado, Niigata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-08T00:00:00.000Z'
  ),
  (
    'b3000205-0001-4001-8001-000000000205',
    'various anime',
    'Kurobe, Toyama - Site 205',
    'Kurobe, Toyama, Japan',
    36.8753,
    137.5745,
    'Real-world anime pilgrimage site linked to various anime. Located in Kurobe, Toyama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-09T00:00:00.000Z'
  ),
  (
    'b3000206-0001-4001-8001-000000000206',
    'various anime',
    'Takaoka, Toyama - Site 206',
    'Takaoka, Toyama, Japan',
    36.7477,
    137.0255,
    'Real-world anime pilgrimage site linked to various anime. Located in Takaoka, Toyama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-10T00:00:00.000Z'
  ),
  (
    'b3000207-0001-4001-8001-000000000207',
    'various anime',
    'Yoshinogari, Saga - Site 207',
    'Yoshinogari, Saga, Japan',
    33.321,
    130.3964,
    'Real-world anime pilgrimage site linked to various anime. Located in Yoshinogari, Saga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-11T00:00:00.000Z'
  ),
  (
    'b3000208-0001-4001-8001-000000000208',
    'various anime',
    'Karatsu, Saga - Site 208',
    'Karatsu, Saga, Japan',
    33.4579,
    129.9699,
    'Real-world anime pilgrimage site linked to various anime. Located in Karatsu, Saga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-12T00:00:00.000Z'
  ),
  (
    'b3000209-0001-4001-8001-000000000209',
    'various anime',
    'Nagasaki, Nagasaki - Site 209',
    'Nagasaki, Nagasaki, Japan',
    32.7748,
    129.864,
    'Real-world anime pilgrimage site linked to various anime. Located in Nagasaki, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-13T00:00:00.000Z'
  ),
  (
    'b3000210-0001-4001-8001-000000000210',
    'various anime',
    'Goto, Nagasaki - Site 210',
    'Goto, Nagasaki, Japan',
    32.6854,
    128.8316,
    'Real-world anime pilgrimage site linked to various anime. Located in Goto, Nagasaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-14T00:00:00.000Z'
  ),
  (
    'b3000211-0001-4001-8001-000000000211',
    'various anime',
    'Nichinan, Miyazaki - Site 211',
    'Nichinan, Miyazaki, Japan',
    31.6524,
    131.4561,
    'Real-world anime pilgrimage site linked to various anime. Located in Nichinan, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-15T00:00:00.000Z'
  ),
  (
    'b3000212-0001-4001-8001-000000000212',
    'Hanasaku Iroha / Q',
    'Toyooka, Hyogo - Site 212',
    'Toyooka, Hyogo, Japan',
    35.6192,
    134.8129,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / Q. Located in Toyooka, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-16T00:00:00.000Z'
  ),
  (
    'b3000213-0001-4001-8001-000000000213',
    'various anime',
    'Awaji, Hyogo - Site 213',
    'Awaji, Hyogo, Japan',
    34.5248,
    134.9278,
    'Real-world anime pilgrimage site linked to various anime. Located in Awaji, Hyogo, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-17T00:00:00.000Z'
  ),
  (
    'b3000214-0001-4001-8001-000000000214',
    'Various anime',
    'Nagahama, Shiga - Site 214',
    'Nagahama, Shiga, Japan',
    35.369,
    136.2714,
    'Real-world anime pilgrimage site linked to Various anime. Located in Nagahama, Shiga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-18T00:00:00.000Z'
  ),
  (
    'b3000215-0001-4001-8001-000000000215',
    'Sound! Euphonium',
    'Uji, Kyoto - Site 215',
    'Uji, Kyoto, Japan',
    34.8841,
    135.8001,
    'Real-world anime pilgrimage site linked to Sound! Euphonium. Located in Uji, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-19T00:00:00.000Z'
  ),
  (
    'b3000216-0001-4001-8001-000000000216',
    'The Eccentric Family / / Sound! Euphonium',
    'Kyoto, Kyoto - Site 216',
    'Kyoto, Kyoto, Japan',
    35.014,
    135.6783,
    'Real-world anime pilgrimage site linked to The Eccentric Family / / Sound! Euphonium. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-20T00:00:00.000Z'
  ),
  (
    'b3000217-0001-4001-8001-000000000217',
    'The Eccentric Family / / Sound! Euphonium',
    'Kyoto, Kyoto - Site 217',
    'Kyoto, Kyoto, Japan',
    35.0159,
    135.7826,
    'Real-world anime pilgrimage site linked to The Eccentric Family / / Sound! Euphonium. Located in Kyoto, Kyoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-21T00:00:00.000Z'
  ),
  (
    'b3000218-0001-4001-8001-000000000218',
    'various anime',
    'Mine, Yamaguchi - Site 218',
    'Mine, Yamaguchi, Japan',
    34.2367,
    131.2972,
    'Real-world anime pilgrimage site linked to various anime. Located in Mine, Yamaguchi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-22T00:00:00.000Z'
  ),
  (
    'b3000219-0001-4001-8001-000000000219',
    'various anime',
    'Naruto, Tokushima - Site 219',
    'Naruto, Tokushima, Japan',
    34.2534,
    134.6422,
    'Real-world anime pilgrimage site linked to various anime. Located in Naruto, Tokushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-23T00:00:00.000Z'
  ),
  (
    'b3000220-0001-4001-8001-000000000220',
    'various anime',
    'Takamatsu, Kagawa - Site 220',
    'Takamatsu, Kagawa, Japan',
    34.3443,
    134.0517,
    'Real-world anime pilgrimage site linked to various anime. Located in Takamatsu, Kagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-24T00:00:00.000Z'
  ),
  (
    'b3000221-0001-4001-8001-000000000221',
    'various anime',
    'Uchiko, Ehime - Site 221',
    'Uchiko, Ehime, Japan',
    33.5381,
    132.6627,
    'Real-world anime pilgrimage site linked to various anime. Located in Uchiko, Ehime, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-25T00:00:00.000Z'
  ),
  (
    'b3000222-0001-4001-8001-000000000222',
    'various anime',
    'Muroto, Kochi - Site 222',
    'Muroto, Kochi, Japan',
    33.253,
    134.1663,
    'Real-world anime pilgrimage site linked to various anime. Located in Muroto, Kochi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-26T00:00:00.000Z'
  ),
  (
    'b3000223-0001-4001-8001-000000000223',
    'various anime',
    'Takeo, Saga - Site 223',
    'Takeo, Saga, Japan',
    33.1895,
    130.0239,
    'Real-world anime pilgrimage site linked to various anime. Located in Takeo, Saga, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-27T00:00:00.000Z'
  ),
  (
    'b3000224-0001-4001-8001-000000000224',
    'various anime',
    'Yamato, Kumamoto - Site 224',
    'Yamato, Kumamoto, Japan',
    32.7056,
    131.0099,
    'Real-world anime pilgrimage site linked to various anime. Located in Yamato, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-28T00:00:00.000Z'
  ),
  (
    'b3000225-0001-4001-8001-000000000225',
    'various anime',
    'Usuki, Oita - Site 225',
    'Usuki, Oita, Japan',
    33.1191,
    131.8025,
    'Real-world anime pilgrimage site linked to various anime. Located in Usuki, Oita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-01T00:00:00.000Z'
  ),
  (
    'b3000226-0001-4001-8001-000000000226',
    'various anime',
    'Miyakonojo, Miyazaki - Site 226',
    'Miyakonojo, Miyazaki, Japan',
    31.7236,
    131.0653,
    'Real-world anime pilgrimage site linked to various anime. Located in Miyakonojo, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-02T00:00:00.000Z'
  ),
  (
    'b3000227-0001-4001-8001-000000000227',
    'various anime',
    'Minamisatsuma, Kagoshima - Site 227',
    'Minamisatsuma, Kagoshima, Japan',
    31.3633,
    130.4426,
    'Real-world anime pilgrimage site linked to various anime. Located in Minamisatsuma, Kagoshima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-03T00:00:00.000Z'
  ),
  (
    'b3000228-0001-4001-8001-000000000228',
    'various anime',
    'Taketomi, Okinawa - Site 228',
    'Taketomi, Okinawa, Japan',
    24.3247,
    124.1003,
    'Real-world anime pilgrimage site linked to various anime. Located in Taketomi, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-04T00:00:00.000Z'
  ),
  (
    'b3000229-0001-4001-8001-000000000229',
    'various anime',
    'Nakijin, Okinawa - Site 229',
    'Nakijin, Okinawa, Japan',
    26.6887,
    127.9133,
    'Real-world anime pilgrimage site linked to various anime. Located in Nakijin, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-05T00:00:00.000Z'
  ),
  (
    'b3000230-0001-4001-8001-000000000230',
    'various anime',
    'Hirosaki, Aomori - Site 230',
    'Hirosaki, Aomori, Japan',
    40.6034,
    140.4624,
    'Real-world anime pilgrimage site linked to various anime. Located in Hirosaki, Aomori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-06T00:00:00.000Z'
  ),
  (
    'b3000231-0001-4001-8001-000000000231',
    'various anime',
    'Towada, Aomori - Site 231',
    'Towada, Aomori, Japan',
    40.472,
    140.8813,
    'Real-world anime pilgrimage site linked to various anime. Located in Towada, Aomori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-07T00:00:00.000Z'
  ),
  (
    'b3000232-0001-4001-8001-000000000232',
    'Natsume''s Book of Friends',
    'Ichinoseki, Iwate - Site 232',
    'Ichinoseki, Iwate, Japan',
    38.9512,
    141.0818,
    'Real-world anime pilgrimage site linked to Natsume''s Book of Friends. Located in Ichinoseki, Iwate, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-08T00:00:00.000Z'
  ),
  (
    'b3000233-0001-4001-8001-000000000233',
    'Hanasaku Iroha / / various anime',
    'Matsushima, Miyagi - Site 233',
    'Matsushima, Miyagi, Japan',
    38.3794,
    141.073,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / / various anime. Located in Matsushima, Miyagi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-09T00:00:00.000Z'
  ),
  (
    'b3000234-0001-4001-8001-000000000234',
    'GeGeGe no Kitaro / various anime',
    'Oga, Akita - Site 234',
    'Oga, Akita, Japan',
    40.0123,
    139.9267,
    'Real-world anime pilgrimage site linked to GeGeGe no Kitaro / various anime. Located in Oga, Akita, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-10T00:00:00.000Z'
  ),
  (
    'b3000235-0001-4001-8001-000000000235',
    'various anime',
    'Yamagata, Yamagata - Site 235',
    'Yamagata, Yamagata, Japan',
    38.1435,
    140.4517,
    'Real-world anime pilgrimage site linked to various anime. Located in Yamagata, Yamagata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-11T00:00:00.000Z'
  ),
  (
    'b3000236-0001-4001-8001-000000000236',
    'various anime',
    'Tsuruoka, Yamagata - Site 236',
    'Tsuruoka, Yamagata, Japan',
    38.7477,
    139.8073,
    'Real-world anime pilgrimage site linked to various anime. Located in Tsuruoka, Yamagata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-12T00:00:00.000Z'
  ),
  (
    'b3000237-0001-4001-8001-000000000237',
    'various anime',
    'Inawashiro, Fukushima - Site 237',
    'Inawashiro, Fukushima, Japan',
    37.5201,
    140.1058,
    'Real-world anime pilgrimage site linked to various anime. Located in Inawashiro, Fukushima, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-13T00:00:00.000Z'
  ),
  (
    'b3000238-0001-4001-8001-000000000238',
    'Girls und Panzer / various anime',
    'Daigo, Ibaraki - Site 238',
    'Daigo, Ibaraki, Japan',
    36.6475,
    140.3993,
    'Real-world anime pilgrimage site linked to Girls und Panzer / various anime. Located in Daigo, Ibaraki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-14T00:00:00.000Z'
  ),
  (
    'b3000239-0001-4001-8001-000000000239',
    'Yuru Camp / various anime',
    'Nasu, Tochigi - Site 239',
    'Nasu, Tochigi, Japan',
    37.1136,
    140.0487,
    'Real-world anime pilgrimage site linked to Yuru Camp / various anime. Located in Nasu, Tochigi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-15T00:00:00.000Z'
  ),
  (
    'b3000240-0001-4001-8001-000000000240',
    'various anime',
    'Nikko, Tochigi - Site 240',
    'Nikko, Tochigi, Japan',
    36.7614,
    139.5059,
    'Real-world anime pilgrimage site linked to various anime. Located in Nikko, Tochigi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-16T00:00:00.000Z'
  ),
  (
    'b3000241-0001-4001-8001-000000000241',
    'Demon Slayer / various anime',
    'Tomioka, Gunma - Site 241',
    'Tomioka, Gunma, Japan',
    36.258,
    138.8881,
    'Real-world anime pilgrimage site linked to Demon Slayer / various anime. Located in Tomioka, Gunma, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-17T00:00:00.000Z'
  ),
  (
    'b3000242-0001-4001-8001-000000000242',
    'Yuru Camp / various anime',
    'Minakami, Gunma - Site 242',
    'Minakami, Gunma, Japan',
    36.739,
    138.9968,
    'Real-world anime pilgrimage site linked to Yuru Camp / various anime. Located in Minakami, Gunma, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-18T00:00:00.000Z'
  ),
  (
    'b3000243-0001-4001-8001-000000000243',
    'various anime',
    'Choshi, Chiba - Site 243',
    'Choshi, Chiba, Japan',
    35.7354,
    140.8269,
    'Real-world anime pilgrimage site linked to various anime. Located in Choshi, Chiba, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-19T00:00:00.000Z'
  ),
  (
    'b3000244-0001-4001-8001-000000000244',
    'Demon Slayer / various anime',
    'Narita, Chiba - Site 244',
    'Narita, Chiba, Japan',
    35.796,
    140.317,
    'Real-world anime pilgrimage site linked to Demon Slayer / various anime. Located in Narita, Chiba, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-20T00:00:00.000Z'
  ),
  (
    'b3000245-0001-4001-8001-000000000245',
    'Bocchi the Rock! / various anime',
    'Miura, Kanagawa - Site 245',
    'Miura, Kanagawa, Japan',
    35.2105,
    139.6175,
    'Real-world anime pilgrimage site linked to Bocchi the Rock! / various anime. Located in Miura, Kanagawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-21T00:00:00.000Z'
  ),
  (
    'b3000246-0001-4001-8001-000000000246',
    'Inazuma Eleven',
    'Toyota, Aichi - Site 246',
    'Toyota, Aichi, Japan',
    35.0837,
    137.1561,
    'Real-world anime pilgrimage site linked to Inazuma Eleven. Located in Toyota, Aichi, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-22T00:00:00.000Z'
  ),
  (
    'b3000247-0001-4001-8001-000000000247',
    'various anime',
    'Nagano, Nagano - Site 247',
    'Nagano, Nagano, Japan',
    36.6627,
    138.1884,
    'Real-world anime pilgrimage site linked to various anime. Located in Nagano, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-23T00:00:00.000Z'
  ),
  (
    'b3000248-0001-4001-8001-000000000248',
    'Super Cub',
    'Minamimaki, Nagano - Site 248',
    'Minamimaki, Nagano, Japan',
    35.9299,
    138.4752,
    'Real-world anime pilgrimage site linked to Super Cub. Located in Minamimaki, Nagano, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-24T00:00:00.000Z'
  ),
  (
    'b3000249-0001-4001-8001-000000000249',
    'Hanasaku Iroha / various anime',
    'Tonami, Toyama - Site 249',
    'Tonami, Toyama, Japan',
    36.6474,
    136.974,
    'Real-world anime pilgrimage site linked to Hanasaku Iroha / various anime. Located in Tonami, Toyama, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-25T00:00:00.000Z'
  ),
  (
    'b3000250-0001-4001-8001-000000000250',
    'various anime',
    'Takahama, Fukui - Site 250',
    'Takahama, Fukui, Japan',
    35.5303,
    135.5453,
    'Real-world anime pilgrimage site linked to various anime. Located in Takahama, Fukui, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-26T00:00:00.000Z'
  ),
  (
    'b3000251-0001-4001-8001-000000000251',
    'various anime',
    'Sado, Niigata - Site 251',
    'Sado, Niigata, Japan',
    37.9867,
    138.3706,
    'Real-world anime pilgrimage site linked to various anime. Located in Sado, Niigata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-11-27T00:00:00.000Z'
  ),
  (
    'b3000252-0001-4001-8001-000000000252',
    'various anime',
    'Yuzawa, Niigata - Site 252',
    'Yuzawa, Niigata, Japan',
    36.9301,
    138.8196,
    'Real-world anime pilgrimage site linked to various anime. Located in Yuzawa, Niigata, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-12-28T00:00:00.000Z'
  ),
  (
    'b3000253-0001-4001-8001-000000000253',
    'various anime',
    'Asahikawa, Hokkaido - Site 253',
    'Asahikawa, Hokkaido, Japan',
    43.771,
    142.3648,
    'Real-world anime pilgrimage site linked to various anime. Located in Asahikawa, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-01-01T00:00:00.000Z'
  ),
  (
    'b3000254-0001-4001-8001-000000000254',
    'Super Cub',
    'Wakkanai, Hokkaido - Site 254',
    'Wakkanai, Hokkaido, Japan',
    45.4161,
    141.6739,
    'Real-world anime pilgrimage site linked to Super Cub. Located in Wakkanai, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-02-02T00:00:00.000Z'
  ),
  (
    'b3000255-0001-4001-8001-000000000255',
    'various anime',
    'Shari, Hokkaido - Site 255',
    'Shari, Hokkaido, Japan',
    44.0635,
    144.9001,
    'Real-world anime pilgrimage site linked to various anime. Located in Shari, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-03-03T00:00:00.000Z'
  ),
  (
    'b3000256-0001-4001-8001-000000000256',
    'various anime',
    'Hakodate, Hokkaido - Site 256',
    'Hakodate, Hokkaido, Japan',
    41.7731,
    140.7283,
    'Real-world anime pilgrimage site linked to various anime. Located in Hakodate, Hokkaido, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-04-04T00:00:00.000Z'
  ),
  (
    'b3000257-0001-4001-8001-000000000257',
    'various anime',
    'Aomori, Aomori - Site 257',
    'Aomori, Aomori, Japan',
    40.7007,
    140.6954,
    'Real-world anime pilgrimage site linked to various anime. Located in Aomori, Aomori, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-05-05T00:00:00.000Z'
  ),
  (
    'b3000258-0001-4001-8001-000000000258',
    'various anime',
    'Amakusa, Kumamoto - Site 258',
    'Amakusa, Kumamoto, Japan',
    32.196,
    130.0281,
    'Real-world anime pilgrimage site linked to various anime. Located in Amakusa, Kumamoto, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-06-06T00:00:00.000Z'
  ),
  (
    'b3000259-0001-4001-8001-000000000259',
    'Various anime',
    'Takachiho, Miyazaki - Site 259',
    'Takachiho, Miyazaki, Japan',
    32.7099,
    131.3044,
    'Real-world anime pilgrimage site linked to Various anime. Located in Takachiho, Miyazaki, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-07-07T00:00:00.000Z'
  ),
  (
    'b3000260-0001-4001-8001-000000000260',
    'various anime',
    'Yonaguni, Okinawa - Site 260',
    'Yonaguni, Okinawa, Japan',
    24.4673,
    122.9981,
    'Real-world anime pilgrimage site linked to various anime. Located in Yonaguni, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-08-08T00:00:00.000Z'
  ),
  (
    'b3000261-0001-4001-8001-000000000261',
    'various anime',
    'Ishigaki, Okinawa - Site 261',
    'Ishigaki, Okinawa, Japan',
    24.4012,
    124.1552,
    'Real-world anime pilgrimage site linked to various anime. Located in Ishigaki, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-09-09T00:00:00.000Z'
  ),
  (
    'b3000262-0001-4001-8001-000000000262',
    'various anime',
    'Miyako, Okinawa - Site 262',
    'Miyako, Okinawa, Japan',
    24.8058,
    125.2811,
    'Real-world anime pilgrimage site linked to various anime. Located in Miyako, Okinawa, Japan. Fans visit to compare the scenery with iconic scenes from the series. It is a popular stop for photographers and travelers exploring sacred anime locations.',
    '2024-10-10T00:00:00.000Z'
  )
ON CONFLICT (id) DO UPDATE SET
  anime_title   = EXCLUDED.anime_title,
  location_name = EXCLUDED.location_name,
  address       = EXCLUDED.address,
  lat           = EXCLUDED.lat,
  lng           = EXCLUDED.lng,
  description   = EXCLUDED.description,
  created_at    = EXCLUDED.created_at;
