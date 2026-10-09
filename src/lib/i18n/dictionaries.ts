// Animeji 多言語辞書（UI文言）。スポット名・レビュー等の動的コンテンツは対象外（固有名詞のため）。
export const LOCALES = ["ja", "en", "zh-CN", "ko", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  "zh-CN": "中文",
  ko: "한국어",
  es: "Español",
};

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

type Dict = Record<string, string>;

const ja: Dict = {
  // ナビ
  "nav.ranking": "ランキング",
  "nav.map": "マップ",
  "nav.search": "検索",
  "nav.community": "掲示板",
  "nav.profile": "マイページ",
  // ホーム
  "home.popular": "人気スポット",
  "home.featured": "注目スポット",
  "home.byAnime": "アニメから探す",
  "home.seeMore": "もっと見る",
  "home.searchAll": "すべての聖地を探す",
  "home.stats.spots": "聖地スポット",
  "home.stats.anime": "アニメ作品",
  "home.stats.pref": "都道府県",
  "home.spotCountSuffix": "スポット",
  // 言語スイッチャ
  "lang.label": "言語",
  // マナー
  "manners.title": "聖地巡礼のマナー",
  "manners.intro": "地元の方の暮らしがある場所です。一人ひとりの配慮が、この聖地を未来に残します。",
  "manners.private": "私有地・立入禁止の場所には入らない",
  "manners.photo": "撮影は周囲に配慮（住居・表札・人の顔などを写さない）",
  "manners.safety": "道路や線路での撮影・長時間の滞在はしない（危険・通行の妨げ）",
  "manners.noise": "大きな声を出さず、静かに楽しむ",
  "manners.trash": "ゴミは必ず持ち帰る",
  // スポット個別の注意（種別判定）
  "caution.station": "駅・線路の近くです。ホームや踏切での撮影は運行や他の利用者の妨げになり危険です。安全な場所から短時間で撮影してください。",
  "caution.school": "学校の敷地です。無断で立ち入らず、授業や登下校の妨げにならないよう、児童・生徒の撮影は避けてください。",
  "caution.hospital": "医療施設です。患者や関係者のプライバシー・通行に最大限配慮してください。",
  "caution.shrine": "参拝者のいる神聖な場所です。静かに参拝し、撮影は他の参拝者や社殿・仏像への配慮を忘れずに。",
  "caution.residential": "住宅地です。住民の生活とプライバシーに十分配慮し、私有地には立ち入らないでください。",
};

const en: Dict = {
  "nav.ranking": "Ranking",
  "nav.map": "Map",
  "nav.search": "Search",
  "nav.community": "Community",
  "nav.profile": "My Page",
  "home.popular": "Popular Spots",
  "home.featured": "Featured Spots",
  "home.byAnime": "Browse by Anime",
  "home.seeMore": "See more",
  "home.searchAll": "Explore all spots",
  "home.stats.spots": "Spots",
  "home.stats.anime": "Anime",
  "home.stats.pref": "Prefectures",
  "home.spotCountSuffix": " spots",
  "lang.label": "Language",
  "manners.title": "Pilgrimage Etiquette",
  "manners.intro": "People live here. A little consideration from each visitor keeps these places open for the future.",
  "manners.private": "Do not enter private property or restricted areas",
  "manners.photo": "Be mindful when taking photos (avoid homes, nameplates, and people's faces)",
  "manners.safety": "Do not shoot or linger on roads or railways (dangerous / blocks traffic)",
  "manners.noise": "Keep your voice down and enjoy quietly",
  "manners.trash": "Always take your trash home",
  "caution.station": "This is near a station or railway. Shooting on platforms or at crossings is dangerous and blocks others. Shoot briefly from a safe spot.",
  "caution.school": "This is school grounds. Do not enter without permission, avoid disrupting classes or students' commute, and do not photograph children.",
  "caution.hospital": "This is a medical facility. Give top priority to the privacy and access of patients and staff.",
  "caution.shrine": "This is a sacred place with worshippers. Visit quietly and be considerate of others and the shrine/temple when taking photos.",
  "caution.residential": "This is a residential area. Respect residents' lives and privacy, and do not enter private property.",
};

const zhCN: Dict = {
  "nav.ranking": "排行榜",
  "nav.map": "地图",
  "nav.search": "搜索",
  "nav.community": "论坛",
  "nav.profile": "我的",
  "home.popular": "热门圣地",
  "home.featured": "精选圣地",
  "home.byAnime": "按动画查找",
  "home.seeMore": "查看更多",
  "home.searchAll": "探索全部圣地",
  "home.stats.spots": "圣地",
  "home.stats.anime": "动画作品",
  "home.stats.pref": "都道府县",
  "home.spotCountSuffix": "个圣地",
  "lang.label": "语言",
  "manners.title": "圣地巡礼礼仪",
  "manners.intro": "这里有当地居民的生活。每位访客的一份体谅，都能让圣地长久留存。",
  "manners.private": "请勿进入私人土地或禁止进入的区域",
  "manners.photo": "拍照时请顾及周围（勿拍摄住宅、门牌、他人面孔）",
  "manners.safety": "请勿在道路或铁路上拍摄或久留（危险·妨碍通行）",
  "manners.noise": "请勿大声喧哗，安静地游览",
  "manners.trash": "垃圾请务必带走",
  "caution.station": "这里靠近车站或铁路。在站台或道口拍摄会妨碍运行和他人，十分危险。请在安全处短时间拍摄。",
  "caution.school": "这里是学校用地。请勿擅自进入，勿妨碍上课及上下学，勿拍摄学生。",
  "caution.hospital": "这里是医疗设施。请最大限度顾及患者及相关人员的隐私与通行。",
  "caution.shrine": "这里是有参拜者的神圣场所。请安静参拜，拍摄时顾及他人及殿宇、佛像。",
  "caution.residential": "这里是住宅区。请充分顾及居民生活与隐私，勿进入私人土地。",
};

const ko: Dict = {
  "nav.ranking": "랭킹",
  "nav.map": "지도",
  "nav.search": "검색",
  "nav.community": "게시판",
  "nav.profile": "마이페이지",
  "home.popular": "인기 명소",
  "home.featured": "주목 명소",
  "home.byAnime": "애니메이션으로 찾기",
  "home.seeMore": "더보기",
  "home.searchAll": "모든 성지 둘러보기",
  "home.stats.spots": "성지",
  "home.stats.anime": "애니메이션",
  "home.stats.pref": "도도부현",
  "home.spotCountSuffix": "개 명소",
  "lang.label": "언어",
  "manners.title": "성지순례 매너",
  "manners.intro": "주민들이 생활하는 장소입니다. 한 사람 한 사람의 배려가 이 성지를 미래에 남깁니다.",
  "manners.private": "사유지·출입 금지 장소에는 들어가지 않기",
  "manners.photo": "촬영은 주위를 배려(주택·문패·타인의 얼굴 등을 찍지 않기)",
  "manners.safety": "도로나 선로에서의 촬영·장시간 체류 금지(위험·통행 방해)",
  "manners.noise": "큰 소리를 내지 말고 조용히 즐기기",
  "manners.trash": "쓰레기는 반드시 가져가기",
  "caution.station": "역·선로 근처입니다. 플랫폼이나 건널목에서의 촬영은 운행과 다른 이용자에게 방해가 되어 위험합니다. 안전한 곳에서 짧게 촬영하세요.",
  "caution.school": "학교 부지입니다. 무단으로 들어가지 말고, 수업이나 등하교에 방해가 되지 않도록 학생 촬영은 삼가세요.",
  "caution.hospital": "의료 시설입니다. 환자와 관계자의 프라이버시·통행을 최대한 배려하세요.",
  "caution.shrine": "참배객이 있는 신성한 장소입니다. 조용히 참배하고, 촬영 시 다른 참배객과 신전·불상을 배려하세요.",
  "caution.residential": "주택가입니다. 주민의 생활과 프라이버시를 충분히 배려하고, 사유지에는 들어가지 마세요.",
};

const es: Dict = {
  "nav.ranking": "Ranking",
  "nav.map": "Mapa",
  "nav.search": "Buscar",
  "nav.community": "Foro",
  "nav.profile": "Mi página",
  "home.popular": "Lugares populares",
  "home.featured": "Lugares destacados",
  "home.byAnime": "Buscar por anime",
  "home.seeMore": "Ver más",
  "home.searchAll": "Explorar todos los lugares",
  "home.stats.spots": "Lugares",
  "home.stats.anime": "Animes",
  "home.stats.pref": "Prefecturas",
  "home.spotCountSuffix": " lugares",
  "lang.label": "Idioma",
  "manners.title": "Normas de peregrinación",
  "manners.intro": "Aquí vive gente. La consideración de cada visitante mantiene estos lugares abiertos para el futuro.",
  "manners.private": "No entres en propiedades privadas ni en zonas restringidas",
  "manners.photo": "Ten cuidado al hacer fotos (evita viviendas, placas y rostros de personas)",
  "manners.safety": "No grabes ni te detengas en carreteras o vías (peligroso / obstruye el paso)",
  "manners.noise": "Baja la voz y disfruta en silencio",
  "manners.trash": "Llévate siempre tu basura",
  "caution.station": "Esto está cerca de una estación o vía férrea. Grabar en andenes o pasos a nivel es peligroso y estorba a los demás. Hazlo brevemente desde un lugar seguro.",
  "caution.school": "Esto es un recinto escolar. No entres sin permiso, no interrumpas las clases ni el trayecto del alumnado y no fotografíes a menores.",
  "caution.hospital": "Esto es un centro médico. Da prioridad a la privacidad y el paso de pacientes y personal.",
  "caution.shrine": "Es un lugar sagrado con fieles. Visítalo en silencio y sé respetuoso con los demás y con el santuario o templo al fotografiar.",
  "caution.residential": "Es una zona residencial. Respeta la vida y la privacidad de los vecinos y no entres en propiedades privadas.",
};

export const DICTIONARIES: Record<Locale, Dict> = { ja, en, "zh-CN": zhCN, ko, es };

export function translate(locale: Locale, key: string): string {
  return DICTIONARIES[locale]?.[key] ?? DICTIONARIES.ja[key] ?? key;
}
