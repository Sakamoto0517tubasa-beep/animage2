export const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;

export type Prefecture = (typeof prefectures)[number];

export type CalculationRegion = "東京" | "神奈川" | "長野" | "福岡" | "北海道";

export type PrefectureInfo = {
  calculationRegion: CalculationRegion;
  rentModifier: number;
  characteristic: string;
  foreignResidentRatio: string;
  multilingualSupport: string;
  winterSeverity: string;
  publicTransport: string;
  foreignCommunity: string;
  recommendation: string;
  caution: string;
  spots: string;
};

const regionSpots: Record<CalculationRegion, string> = {
  東京: "新宿・渋谷・上野・お台場",
  神奈川: "横浜・鎌倉・江の島",
  長野: "松本城・上高地・白馬",
  福岡: "博多・太宰府・糸島",
  北海道: "札幌・函館・富良野",
};

type PrefectureEntry = PrefectureInfo & { name: Prefecture };

const prefectureEntries: PrefectureEntry[] = [
  {
    name: "北海道",
    calculationRegion: "北海道",
    rentModifier: 0.88,
    characteristic: "自然豊か・広大な土地・観光と農業が盛ん",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "札幌を中心に外国人支援窓口や就労機会が比較的見つかりやすい。自然と都市のバランスが良い。",
    caution:
      "冬は積雪と低温が厳しく、除雪や暖房費が生活コストに影響する。地方部は車が必要な場合が多い。",
    spots: "札幌・函館・富良野",
  },
  {
    name: "青森県",
    calculationRegion: "長野",
    rentModifier: 0.78,
    characteristic: "りんご産地・津軽文化・豪雪地帯",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "家賃が安く、農業や食品製造の求人がある。日本の伝統文化を体感しやすい環境。",
    caution:
      "冬の寒さが厳しく、公共交通は限られる。多言語対応サービスは都市部より少なめ。",
    spots: regionSpots.長野,
  },
  {
    name: "岩手県",
    calculationRegion: "長野",
    rentModifier: 0.78,
    characteristic: "東北最大の面積・海岸線・農業と漁業",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "盛岡を中心に落ち着いた生活ができ、製造・農業・漁業系の仕事がある。物価は比較的安い。",
    caution:
      "県内移動に車が必要なことが多い。外国人向け情報は首都圏ほど充実していない。",
    spots: "盛岡・平泉・浄土ヶ浜",
  },
  {
    name: "宮城県",
    calculationRegion: "福岡",
    rentModifier: 0.9,
    characteristic: "東北の中心都市・仙台・学都",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "中程度",
    recommendation:
      "仙台は東北最大の都市で、医療・介護・製造の求人が豊富。生活しやすさと仕事のバランスが良い。",
    caution:
      "中心部以外は車が必要なエリアもある。冬は雪が降るため防寒対策が必要。",
    spots: "仙台・松島・秋保",
  },
  {
    name: "秋田県",
    calculationRegion: "長野",
    rentModifier: 0.76,
    characteristic: "豪雪地帯・米どころ・温泉",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "全国でもトップクラスに家賃が安く、農業や食品加工の仕事がある。自然と温泉が身近。",
    caution:
      "人口減少地域が多く、冬の生活は厳しい。外国人コミュニティは小さめ。",
    spots: regionSpots.長野,
  },
  {
    name: "山形県",
    calculationRegion: "長野",
    rentModifier: 0.8,
    characteristic: "さくらんぼ・温泉・みちのく文化",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "山形市を中心に農業・製造・宿泊の求人がある。果物や温泉など暮らしの魅力がある。",
    caution:
      "県内の移動は車があると便利。多言語サポートは限定的。",
    spots: "山寺・蔵王・銀山温泉",
  },
  {
    name: "福島県",
    calculationRegion: "長野",
    rentModifier: 0.82,
    characteristic: "東北と関東の結節点・農業・観光",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "会津・いわきなど地域ごとに特色があり、製造・農業・宿泊の仕事がある。家賃は比較的安い。",
    caution:
      "広い県内で求人の偏りがある。復興関連の情報確認が必要なエリアもある。",
    spots: "会津若松・猪苗代・裏磐梯",
  },
  {
    name: "茨城県",
    calculationRegion: "神奈川",
    rentModifier: 0.85,
    characteristic: "関東平野・研究学園都市・農業",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "つくばや水戸から首都圏へのアクセスが良く、製造・物流・研究関連の仕事がある。",
    caution:
      "広い県内で車が必要な場所も多い。中心部以外は外国人支援が限定的。",
    spots: regionSpots.神奈川,
  },
  {
    name: "栃木県",
    calculationRegion: "神奈川",
    rentModifier: 0.84,
    characteristic: "日光・工業地帯・いちご産地",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "宇都宮を中心に製造業の求人が多く、日光など観光資源も豊富。首都圏通勤圏としても選ばれる。",
    caution:
      "観光地と工業地帯で生活環境が異なる。冬は内陸部が冷え込む。",
    spots: "日光・那須・宇都宮",
  },
  {
    name: "群馬県",
    calculationRegion: "長野",
    rentModifier: 0.83,
    characteristic: "温泉・高原・製造業",
    foreignResidentRatio: "普通",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "前橋・高崎を中心に製造・物流の仕事があり、温泉や自然が身近。家賃は首都圏より安い。",
    caution:
      "冬は冷え込みが厳しい内陸地もある。外国人向け情報は都市部ほど多くない。",
    spots: regionSpots.長野,
  },
  {
    name: "埼玉県",
    calculationRegion: "神奈川",
    rentModifier: 1.0,
    characteristic: "ベッドタウン・物流拠点・人口密集",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "東京への通勤圏で求人が多く、外国人コミュニティも大きい。大宮・川口など生活利便性が高い。",
    caution:
      "人気エリアは家賃が上がりやすい。東京同様、満員電車など通勤ストレスがある。",
    spots: regionSpots.神奈川,
  },
  {
    name: "千葉県",
    calculationRegion: "神奈川",
    rentModifier: 0.98,
    characteristic: "成田空港・港湾・ディズニーリゾート",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "空港・港湾・物流の仕事が豊富で、外国人比率も高い。幕張・船橋は首都圏アクセスが良い。",
    caution:
      "湾岸部と内陸部で家賃差が大きい。観光・物流エリアはシフト勤務が多い。",
    spots: "幕張・成田・鋸山",
  },
  {
    name: "東京都",
    calculationRegion: "東京",
    rentModifier: 1.1,
    characteristic: "日本最大の都市・多様な産業・情報集約",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "あらゆる職種の求人があり、外国人支援サービスが最も充実。キャリア形成やスキルアップに向く。",
    caution:
      "家賃・物価が全国最高水準。競争が激しく、初来日では生活コスト管理が重要。",
    spots: regionSpots.東京,
  },
  {
    name: "神奈川県",
    calculationRegion: "神奈川",
    rentModifier: 1.05,
    characteristic: "横浜・川崎・みなとみらい・臨海工業",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "横浜は外国人に人気で、IT・製造・サービス業の求人が豊富。東京よりやや家賃が抑えられる。",
    caution:
      "人気エリアは家賃が高め。東京通勤を前提にすると交通費と時間がかかる。",
    spots: regionSpots.神奈川,
  },
  {
    name: "新潟県",
    calculationRegion: "長野",
    rentModifier: 0.82,
    characteristic: "米どころ・日本海側・雪国",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "新潟市を中心に製造・農業・食品の仕事がある。米や日本酒など食文化が豊か。",
    caution:
      "冬の降雪が多く、除雪や転倒対策が必要。外国人支援は限定的。",
    spots: "佐渡・弥彦・長岡",
  },
  {
    name: "富山県",
    calculationRegion: "長野",
    rentModifier: 0.83,
    characteristic: "北アルプス・医薬品・海の幸",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "製薬・製造業の求人があり、立山連峰など自然が近い。コンパクトな県内で暮らしやすい。",
    caution:
      "冬は雪が多く、多言語対応は都市部より少ない。",
    spots: regionSpots.長野,
  },
  {
    name: "石川県",
    calculationRegion: "長野",
    rentModifier: 0.85,
    characteristic: "金沢・加賀百万石・伝統工芸",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "金沢は観光と文化が魅力で、宿泊・製造・サービス業の求人がある。食と美術の環境が整う。",
    caution:
      "観光シーズンとオフで仕事量に差が出る職種がある。能登方面は交通に注意。",
    spots: "金沢・兼六園・白川郷",
  },
  {
    name: "福井県",
    calculationRegion: "長野",
    rentModifier: 0.82,
    characteristic: "恐竜の化石・メガネ・越前海岸",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "家賃が安く、製造・繊維・食品関連の仕事がある。小さな県で落ち着いた生活ができる。",
    caution:
      "求人の選択肢は限られる。外国人向け情報は少なめ。",
    spots: regionSpots.長野,
  },
  {
    name: "山梨県",
    calculationRegion: "長野",
    rentModifier: 0.84,
    characteristic: "富士山・ぶどう・ワイン",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "中程度",
    recommendation:
      "甲府を中心に製造・農業・宿泊の求人がある。富士山と温泉が身近で、首都圏にも近い。",
    caution:
      "バス・鉄道は限られ、車があると生活しやすい。観光地は季節変動の影響を受けやすい。",
    spots: "富士五湖・昇仙峡・勝沼",
  },
  {
    name: "長野県",
    calculationRegion: "長野",
    rentModifier: 0.88,
    characteristic: "山岳・スキー・精密工業",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "松本・長野市に製造・宿泊・観光の仕事があり、自然と都市のバランスが良い。",
    caution:
      "冬は豪雪地域があり、除雪やスタッドレスが必要。山間部は車必須。",
    spots: regionSpots.長野,
  },
  {
    name: "岐阜県",
    calculationRegion: "長野",
    rentModifier: 0.84,
    characteristic: "飛騨高山・下呂温泉・製造業",
    foreignResidentRatio: "普通",
    multilingualSupport: "少ない",
    winterSeverity: "厳しい",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "岐阜市・各務原に製造・航空関連の求人がある。白川郷など世界遺産も近い。",
    caution:
      "山間部は冬の交通が厳しい。求人は都市部に集中しがち。",
    spots: "高山・下呂・白川郷",
  },
  {
    name: "静岡県",
    calculationRegion: "福岡",
    rentModifier: 0.9,
    characteristic: "富士山・茶・浜松の楽器産業",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "中程度",
    recommendation:
      "浜松・静岡市に製造・物流の大規模求人がある。温暖な気候で暮らしやすい。",
    caution:
      "東西に細長く、県内移動に時間がかかる。沿岸と内陸で気候差がある。",
    spots: "熱海・伊豆・富士山",
  },
  {
    name: "愛知県",
    calculationRegion: "福岡",
    rentModifier: 0.95,
    characteristic: "名古屋・自動車産業・商都",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "トヨタをはじめ製造業の求人が非常に多く、外国人労働者も多い。生活コストは東京より抑えられる。",
    caution:
      "製造業は工場立地により通勤距離が長くなることも。夏は暑さ対策が必要。",
    spots: "名古屋城・豊田・犬山",
  },
  {
    name: "三重県",
    calculationRegion: "長野",
    rentModifier: 0.86,
    characteristic: "伊勢神宮・志摩・珍珠",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "四日市に製造・化学・物流の求人があり、伊勢志摩の観光・宿泊も盛ん。",
    caution:
      "県内は広く、観光地と工業地帯で生活環境が異なる。",
    spots: "伊勢神宮・鳥羽・熊野古道",
  },
  {
    name: "滋賀県",
    calculationRegion: "福岡",
    rentModifier: 0.88,
    characteristic: "琵琶湖・京都大阪の近郊",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "大津・草津を中心に製造・物流の仕事があり、関西へのアクセスも良い。",
    caution:
      "求人は限定的で、大阪・京都通勤を検討する人も多い。",
    spots: "琵琶湖・彦根城・比叡山",
  },
  {
    name: "京都府",
    calculationRegion: "福岡",
    rentModifier: 0.92,
    characteristic: "古都・観光・伝統文化",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "観光・宿泊・サービス業の求人が多く、留学生や外国人も多い。文化体験の機会が豊富。",
    caution:
      "観光地は家賃が高いエリアもある。観光シーズンは仕事が忙しくなる。",
    spots: "清水寺・嵐山・伏見",
  },
  {
    name: "大阪府",
    calculationRegion: "福岡",
    rentModifier: 0.95,
    characteristic: "関西の中心・商業・製造",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "多様な職種の求人と大きな外国人コミュニティがある。東京より家賃を抑えつつ都市生活ができる。",
    caution:
      "人気エリアは競争率が高い。関西弁の生活適応も必要になる場合がある。",
    spots: "道頓堀・大阪城・USJ",
  },
  {
    name: "兵庫県",
    calculationRegion: "福岡",
    rentModifier: 0.93,
    characteristic: "神戸港・阪神工業地帯・但馬",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "神戸・姫路に港湾・製造・サービスの求人が豊富。港町の国際色と都市機能が両立。",
    caution:
      "県内は東西で特色が異なり、通勤圏の選び方が重要。",
    spots: "神戸・姫路城・有馬温泉",
  },
  {
    name: "奈良県",
    calculationRegion: "福岡",
    rentModifier: 0.87,
    characteristic: "古都・大仏・歴史遺産",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "奈良市を中心に観光・宿泊・製造の仕事がある。落ち着いた環境で関西へもアクセス可能。",
    caution:
      "求人は大阪・京都ほど多くない。観光地は季節変動の影響を受けやすい。",
    spots: "奈良公園・吉野・飛鳥",
  },
  {
    name: "和歌山県",
    calculationRegion: "福岡",
    rentModifier: 0.82,
    characteristic: "みかん・高野山・熊野古道",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "和歌山市に物流・製造の仕事があり、自然と温泉が豊か。物価は比較的安い。",
    caution:
      "公共交通は限られ、車があると便利。外国人支援は限定的。",
    spots: "高野山・白浜・那智の滝",
  },
  {
    name: "鳥取県",
    calculationRegion: "長野",
    rentModifier: 0.78,
    characteristic: "砂丘・梨・人口最少クラス",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "家賃が非常に安く、農業・食品・製造の求人がある。のんびりした生活向き。",
    caution:
      "求人の選択肢は限られる。車がないと生活が不便。",
    spots: regionSpots.長野,
  },
  {
    name: "島根県",
    calculationRegion: "長野",
    rentModifier: 0.77,
    characteristic: "出雲大社・石見銀山・日本海",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "全国でも家賃が安く、農業・漁業・製造の仕事がある。歴史と神話の文化が深い。",
    caution:
      "若い世代が少なく、外国人コミュニティは小さい。移動は車が前提。",
    spots: "出雲大社・石見銀山・宍道湖",
  },
  {
    name: "岡山県",
    calculationRegion: "福岡",
    rentModifier: 0.86,
    characteristic: "晴れの国・桃・瀬戸内",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "岡山市に製造・物流・医療の求人があり、瀬戸内の温暖な気候で暮らしやすい。",
    caution:
      "四国・広島方面への移動は交通計画が必要。",
    spots: "岡山後楽園・倉敷・牛窓",
  },
  {
    name: "広島県",
    calculationRegion: "福岡",
    rentModifier: 0.9,
    characteristic: "中国地方の中心・平和記念・マツダ",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "充実",
    foreignCommunity: "中程度",
    recommendation:
      "広島市に製造・サービス・医療の求人が集中。瀬戸内の温暖な気候と都市機能がある。",
    caution:
      "県内は広く、離島部は交通に注意。",
    spots: "宮島・原爆ドーム・尾道",
  },
  {
    name: "山口県",
    calculationRegion: "福岡",
    rentModifier: 0.82,
    characteristic: "本州最西端・下関・化学工業",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "下関・周南に製造・化学・物流の仕事がある。九州への玄関口としても位置する。",
    caution:
      "県内移動に時間がかかる。外国人比率は低め。",
    spots: "下関・錦帯橋・角島",
  },
  {
    name: "徳島県",
    calculationRegion: "長野",
    rentModifier: 0.8,
    characteristic: "阿波踊り・鳴門の渦潮",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "製造・物流・農業の求人があり、四国の中では交通の要。物価は比較的安い。",
    caution:
      "四国内移動は車があると便利。多言語サポートは限定的。",
    spots: regionSpots.長野,
  },
  {
    name: "香川県",
    calculationRegion: "福岡",
    rentModifier: 0.84,
    characteristic: "うどん・瀬戸内・小豆島",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "高松を中心に製造・物流・サービスの仕事がある。温暖でコンパクトな県。",
    caution:
      "島しょ部は交通が限られる。求人は高松周辺に集中。",
    spots: "金刀比羅宮・小豆島・父母ヶ浜",
  },
  {
    name: "愛媛県",
    calculationRegion: "福岡",
    rentModifier: 0.83,
    characteristic: "みかん・道後温泉・坂の町",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "松山・今治に製造・造船・サービスの求人がある。温泉と瀬戸内の温暖な気候。",
    caution:
      "山間部は交通が不便。外国人支援は都市部中心。",
    spots: "道後温泉・松山城・しまなみ海道",
  },
  {
    name: "高知県",
    calculationRegion: "長野",
    rentModifier: 0.78,
    characteristic: "四万十川・カツオ・自然豊か",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "普通",
    publicTransport: "車必須",
    foreignCommunity: "小さい",
    recommendation:
      "漁業・農業・食品関連の仕事があり、自然が豊か。のんびりした地方暮らし向き。",
    caution:
      "公共交通は限られ、台風の影響も受けやすい。求人は少なめ。",
    spots: regionSpots.長野,
  },
  {
    name: "福岡県",
    calculationRegion: "福岡",
    rentModifier: 1.0,
    characteristic: "九州の中心・博多・スタートアップ",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "温暖",
    publicTransport: "充実",
    foreignCommunity: "大きい",
    recommendation:
      "求人が豊富で外国人コミュニティも大きい。温暖な気候と都市機能のバランスが良い。",
    caution:
      "人気上昇で家賃が上がりつつある。博多中心部は競争が激しい。",
    spots: regionSpots.福岡,
  },
  {
    name: "佐賀県",
    calculationRegion: "福岡",
    rentModifier: 0.82,
    characteristic: "有田焼・嬉野温泉・コンパクト",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "福岡近郊で家賃が安く、製造・農業・セラミック関連の仕事がある。",
    caution:
      "福岡通勤圏として選ぶ人が多い。単独での求人は限られる。",
    spots: regionSpots.福岡,
  },
  {
    name: "長崎県",
    calculationRegion: "福岡",
    rentModifier: 0.8,
    characteristic: "港町・出島・離島",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "造船・製造・観光の仕事があり、歴史的な国際港の雰囲気がある。",
    caution:
      "離島や半島部は交通に時間がかかる。",
    spots: "長崎・ハウステンボス・五島列島",
  },
  {
    name: "熊本県",
    calculationRegion: "福岡",
    rentModifier: 0.84,
    characteristic: "熊本城・阿蘇・半導体",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "熊本市に製造・半導体・サービスの求人があり、温暖で暮らしやすい。",
    caution:
      "阿蘇方面は火山活動や交通の確認が必要。",
    spots: "熊本城・阿蘇・天草",
  },
  {
    name: "大分県",
    calculationRegion: "福岡",
    rentModifier: 0.83,
    characteristic: "温泉の名所・湯布院・別府",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "宿泊・観光・製造の仕事があり、温泉が身近。物価は比較的安い。",
    caution:
      "観光業は季節変動の影響を受けやすい。",
    spots: "別府・湯布院・九重",
  },
  {
    name: "宮崎県",
    calculationRegion: "福岡",
    rentModifier: 0.82,
    characteristic: "日向夏・サーフィン・温暖",
    foreignResidentRatio: "低い",
    multilingualSupport: "少ない",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "小さい",
    recommendation:
      "農業・宿泊・製造の求人があり、温暖な気候で暮らしやすい。",
    caution:
      "台風シーズンの備えが必要。求人は都市部に集中。",
    spots: "高千穂・青島・えびの高原",
  },
  {
    name: "鹿児島県",
    calculationRegion: "福岡",
    rentModifier: 0.81,
    characteristic: "桜島・薩摩・離島",
    foreignResidentRatio: "普通",
    multilingualSupport: "普通",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "中程度",
    recommendation:
      "鹿児島市に製造・農業・サービスの仕事がある。温暖な気候と自然が魅力。",
    caution:
      "離島や半島部は交通に時間がかかる。火山灰の影響もある。",
    spots: "桜島・屋久島・指宿",
  },
  {
    name: "沖縄県",
    calculationRegion: "福岡",
    rentModifier: 0.88,
    characteristic: "リゾート・観光・亜熱帯",
    foreignResidentRatio: "高い",
    multilingualSupport: "充実",
    winterSeverity: "温暖",
    publicTransport: "普通",
    foreignCommunity: "大きい",
    recommendation:
      "観宿・サービス・教育の求人が多く、外国人比率も高い。温暖な気候で暮らしやすい。",
    caution:
      "本土より物価が高い面もある。台風シーズンと観光シーズンの影響を考慮。",
    spots: "首里城・美ら海水族館・石垣島",
  },
];

export const prefectureInfo: Record<Prefecture, PrefectureInfo> =
  Object.fromEntries(
    prefectureEntries.map(({ name, ...info }) => [name, info])
  ) as Record<Prefecture, PrefectureInfo>;

export function getCalculationRegion(
  prefecture: Prefecture
): CalculationRegion {
  return prefectureInfo[prefecture].calculationRegion;
}

export function getRentModifier(prefecture: Prefecture): number {
  return prefectureInfo[prefecture].rentModifier;
}
