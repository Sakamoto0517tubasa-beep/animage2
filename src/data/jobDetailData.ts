export type JobDetail = {
  description: string;
  physicalDemand: string;
  hasShift: string;
  hasNightShift: string;
  careerGrowth: string;
  foreignHiring: string;
  japaneseUsage: string;
};

export const jobDetails: Record<string, JobDetail> = {
  介護: {
    description:
      "高齢者や障がいのある方の日常生活を支援する仕事です。入浴・食事・排泄の介助や見守りが中心となります。施設や訪問介護など働き方の選択肢もあります。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "医療（病院事務）": {
    description:
      "病院の受付・会計・カルテ管理など、診療を支える事務業務を担います。患者対応や保険請求の手続きも行います。医療現場のルールや用語の習得が求められます。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  看護助手: {
    description:
      "看護師の補助として、患者の身の回りの世話やベッドメイク、食事介助などを行います。病棟や介護施設などで活躍する現場職です。チーム医療の一員として働きます。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  保育: {
    description:
      "乳幼児や学童の保育・教育を行う仕事です。遊びの提供、食事・午睡の世話、保護者との連絡が主な業務です。子どもの安全と発達を見守る責任があります。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  福祉施設: {
    description:
      "障がい者や高齢者が利用する施設での生活支援や活動の補助を行います。入所者の見守りやレクリエーションの企画なども担当します。地域の福祉ニーズに応える仕事です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "外食・飲食店": {
    description:
      "レストランや居酒屋などで接客・調理補助・洗い場などの業務を行います。ピーク時は忙しく、チームで動くことが多いです。ホールとキッチンの両方に携わる場合もあります。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "宿泊・ホテル": {
    description:
      "フロント対応、客室清掃、朝食サービスなど宿泊施設の運営を支えます。国内外のゲストへの接客が中心です。マナーと丁寧な対応が重視されます。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "カフェ・喫茶": {
    description:
      "カフェでの接客、ドリンク作成、軽食の提供を行います。比較的落ち着いた雰囲気の店舗が多く、常連客との会話も楽しみの一つです。清掃や仕込みも日常業務に含まれます。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  料理人: {
    description:
      "飲食店や給食施設などで調理の専門職として働きます。メニュー開発や仕込み、衛生管理も担当します。経験を積むと板長や料理長へのステップアップも可能です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  製造業: {
    description:
      "工場での組立・検査・梱包など、製品づくりの現場業務を行います。ライン作業や機械操作が中心です。技能実習や特定技能で就労する外国人も多い分野です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  "建設・土木": {
    description:
      "建築現場や土木工事で、資材運搬・型枠・コンクリート打設などの作業を行います。屋外での肉体労働が多く、安全確認が欠かせません。天候や工期の影響を受けやすい仕事です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "普通",
  },
  電気工事: {
    description:
      "建物や設備の配線・電気設備の施工・保守を行う専門職です。資格（第二種電工など）の取得がキャリアアップに直結します。現場と図面の読み取りが日常業務です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  塗装: {
    description:
      "建築物や鉄骨などの塗装作業を担当します。下地処理から仕上げまで、品質と耐久性が求められます。高所や屋外での作業が多い現場職です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  溶接: {
    description:
      "金属部品の溶接・加工を行い、製造や建設現場で活躍します。技能の習得が収入や評価に直結しやすい職種です。保護具と安全管理が重要です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  農業: {
    description:
      "作物の栽培・収穫・出荷準備など、農場での生産活動を行います。季節や天候に左右される作業が多く、早朝・長時間労働になることもあります。地方での就労機会が豊富です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "普通",
  },
  漁業: {
    description:
      "漁船での操業や水揚げ、加工の補助など、水産業の現場で働きます。早朝出港や長時間の海上作業が伴うことが多いです。体力とチームワークが求められます。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  畜産: {
    description:
      "家畜の飼育管理、餌やり、清掃、出荷準備などを行います。酪農・養豚・養鶏など施設によって業務内容が異なります。動物の健康管理にも関わる仕事です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "普通",
  },
  林業: {
    description:
      "造林、間伐、伐採・運搬など森林の管理・利用に携わります。山間部での屋外作業が中心で、機械操作のスキルも身につきます。自然環境と向き合う現場職です。",
    physicalDemand: "高",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "低",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  "物流・倉庫": {
    description:
      "倉庫内でのピッキング、仕分け、梱包、在庫管理などを行います。フォークリフト操作の資格があると有利です。EC需要の増加で人手需要も高い分野です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  トラック運転手: {
    description:
      "トラックで荷物の集配・長距離輸送を行う職種です。大型・中型免許の取得が必要です。配送ルートの管理や荷物の積み下ろしも業務に含まれます。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  "配送・デリバリー": {
    description:
      "自転車やバイク、軽自動車で荷物や食品を配達します。ルート配送やフードデリバリーなど形態は多様です。時間に追われることが多い一方、単身で動ける点も魅力です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  ITエンジニア: {
    description:
      "システム開発、インフラ構築、保守運用などIT分野の技術職です。プログラミングやクラウドの知識が求められます。リモートワークの選択肢も比較的多い職種です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  Web制作: {
    description:
      "Webサイトのデザイン・コーディング・更新運用を行います。クライアントの要望を形にする制作職です。フリーランスや小規模チームで働くケースも多くあります。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  データ入力: {
    description:
      "書類やデータのパソコン入力、整理、ファイリングなどを行う事務的な仕事です。正確さとスピードが重視されます。在宅や派遣での就労も見られます。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "普通",
  },
  コールセンター: {
    description:
      "電話やチャットで顧客対応、問い合わせ受付、案内を行います。スクリプトに沿った対応が基本です。シフト制で働くことが多く、日本語の聞き取り・話し方が重要になります。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "販売・小売": {
    description:
      "店舗での接客、レジ業務、商品陳列・在庫補充を行います。アパレル、家電、スーパーなど業態は多様です。お客様とのコミュニケーションが仕事の中心です。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "多い",
  },
  "清掃・ビルメンテナンス": {
    description:
      "オフィスビルや商業施設の清掃、設備の簡易点検・保守を行います。早朝や夜間の作業が多いこともあります。チームで効率よく作業を進める現場職です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "多い",
    japaneseUsage: "少ない",
  },
  警備: {
    description:
      "施設や工事現場、イベント会場などの警備・誘導を担当します。巡回や出入り管理が主な業務です。資格（警備業務検定など）の取得が就職に有利です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "あり",
    careerGrowth: "低",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  "美容・理容": {
    description:
      "美容院や理容店でカット、カラー、パーマなどの技術サービスを提供します。国家資格の取得が不可欠な専門職です。接客と技術の両方が評価されます。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  日本語教師: {
    description:
      "外国人向けに日本語を教える教育職です。語学学校や企業研修などで活躍します。教材作成や進路指導も担当することがあります。日本語能力と指導スキルが求められます。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  塾講師: {
    description:
      "学習塾で小中高生への授業や進路相談を行います。科目指導のほか、テスト対策や宿題のフォローも担当します。夕方以降の勤務が中心となることが多いです。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  "通訳・翻訳": {
    description:
      "会議や商談の通訳、文書の翻訳など言語の専門職として働きます。ビジネス・医療・技術など分野特化の需要もあります。高度な日本語と母語の両方が必要です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  教育補助: {
    description:
      "学校や学習支援施設で、教員の補助や児童生徒の見守り、教材準備を行います。外国にルーツを持つ子どもの支援ニーズも高まっています。教育現場のチームの一員として働きます。",
    physicalDemand: "低",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  "金融・銀行": {
    description:
      "銀行窓口での取引、融資・為替の相談、内部事務などを担当します。高い信頼性と正確な業務処理が求められます。資格取得や内部研修によるキャリア形成が一般的です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  保険: {
    description:
      "生命保険・損害保険の提案、契約手続き、事故対応のサポートを行います。営業要素と事務要素の両方を持つ職種です。資格（生保・損保の募集人など）があると有利です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  一般事務: {
    description:
      "電話・メール対応、書類作成、データ管理などオフィス全般の事務を行います。多くの業種で需要があり、入門しやすい職種の一つです。PCスキルと正確さが重視されます。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  "経理・会計": {
    description:
      "仕訳入力、請求書処理、決算補助など会計・経理業務を担当します。簿記や会計ソフトの知識が求められます。数字の正確性と期限管理が仕事の要です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  営業: {
    description:
      "商品やサービスの提案、見積・契約、既存顧客のフォローを行います。目標達成が評価に直結する職種です。対外折衝と社内調整の両方が日常業務に含まれます。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  "エンジニア（機械）": {
    description:
      "機械・装置の設計、製図、試作、品質管理などを行う技術職です。製造業やメーカーでの就労が中心です。CADや専門知識の習得がキャリアの鍵となります。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
  研究職: {
    description:
      "大学や企業の研究所で実験・分析・論文執筆など研究活動に従事します。高度な専門知識と学位が求められることが多いです。成果が評価やキャリアに大きく影響します。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  コンサルタント: {
    description:
      "企業の経営課題や業務改善について調査・分析し、提案を行う専門職です。プロジェクト単位でクライアント先に常駐することもあります。高いコミュニケーション力と論理思考が求められます。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "高",
    foreignHiring: "少ない",
    japaneseUsage: "多い",
  },
  デザイナー: {
    description:
      "グラフィック、UI、プロダクトなどのデザイン制作を行います。クライアントの要望を視覚的に表現する創造的な仕事です。ポートフォリオとツールの習熟が就職・昇進に重要です。",
    physicalDemand: "低",
    hasShift: "なし",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "多い",
  },
  その他: {
    description:
      "上記のカテゴリに当てはまらない職種全般を指します。業務内容や労働条件は雇用先によって大きく異なります。契約内容と就労条件を事前に確認することが重要です。",
    physicalDemand: "中",
    hasShift: "あり",
    hasNightShift: "なし",
    careerGrowth: "中",
    foreignHiring: "普通",
    japaneseUsage: "普通",
  },
};

export function getJobDetail(jobType: string): JobDetail {
  return jobDetails[jobType] ?? jobDetails["その他"];
}
