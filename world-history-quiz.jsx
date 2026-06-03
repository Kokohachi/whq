import { useState, useEffect, useCallback, useRef } from "react";

const EVENTS = EVENTS = [
  { year: -7000000, desc: "直立歩行する人類の出現", region: "アフリカ", date: 0000, rating: 2 },
  { year: -4500000, desc: "ラミダス猿人の出現", region: "アフリカ", date: 0000, rating: 2 },
  { year: -4200000, desc: "アウストラロピテクス（猿人）の出現", region: "アフリカ", date: 0000, rating: 3 },
  { year: -2500000, desc: "旧石器時代・打製石器の使用", region: "世界各地", date: 0000, rating: 3 },
  { year: -1900000, desc: "ホモ＝エレクトゥス（原人）が出現", region: "アフリカ・ユーラシア", date: 0000, rating: 3 },
  { year: -1000000, desc: "ジャワ原人の出現", region: "アジア", date: 0000, rating: 3 },
  { year: -600000, desc: "ハイデルベルク人（旧人）の出現", region: "ユーラシア", date: 0000, rating: 2 },
  { year: -500000, desc: "北京原人の出現・火の使用", region: "アジア", date: 0000, rating: 3 },
  { year: -200000, desc: "ネアンデルタール人の拡散", region: "ユーラシア", date: 0000, rating: 3 },
  { year: -200000, desc: "ホモ＝サピエンス（新人）のアフリカ出現", region: "アフリカ", date: 0000, rating: 4 },
  { year: -160000, desc: "クロマニョン人の出現", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -100000, desc: "現生人類（ホモ＝サピエンス）の拡散", region: "世界各地", date: 0000, rating: 3 },
  { year: -18000, desc: "アルタミラやラスコーなど洞穴絵画", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -14000, desc: "人類がベーリング海峡を渡りアメリカ大陸へ", region: "アメリカ", date: 0000, rating: 2 },
  { year: -13500, desc: "アメリカ大陸で旧石器文化", region: "アメリカ", date: 0000, rating: 2 },
  { year: -10000, desc: "新石器革命（農耕・牧畜の始まり）", region: "西アジア", date: 0000, rating: 5 },
  { year: -10000, desc: "長江中流域で稲作農業開始", region: "アジア", date: 0000, rating: 4 },
  { year: -7000, desc: "肥沃な三日月地帯に農耕広がる・メソポタミア文明興る", region: "西アジア", date: 0000, rating: 5 },
  { year: -6000, desc: "潅漑農業・文明の形成（金属器、都市、文字）", region: "西アジア", date: 0000, rating: 5 },
  { year: -5000, desc: "黄河文明（仰韶文化）成立", region: "アジア", date: 0000, rating: 4 },
  { year: -5000, desc: "長江文明（河姆渡遺跡）成立", region: "アジア", date: 0000, rating: 4 },
  { year: -5000, desc: "ナイル川流域で農耕始まる", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -5000, desc: "メキシコでトウモロコシ栽培開始", region: "アメリカ", date: 0000, rating: 3 },
  { year: -4000, desc: "ティグリス・ユーフラテス川流域に都市文明成立", region: "西アジア", date: 0000, rating: 5 },
  { year: -3300, desc: "長江下流に良渚文化成立", region: "アジア", date: 0000, rating: 3 },
  { year: -3000, desc: "シュメール人による都市国家建設・シュメール文化", region: "西アジア", date: 0000, rating: 5 },
  { year: -3000, desc: "エジプト文明の形成", region: "北アフリカ", date: 0000, rating: 5 },
  { year: -3000, desc: "竜山文化（黒陶・灰陶）", region: "アジア", date: 0000, rating: 3 },
  { year: -3000, desc: "エーゲ文明興る", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -2650, desc: "エジプト古王国時代（都メンフィス）", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -2530, desc: "クフ王らのピラミッド造営", region: "北アフリカ", date: 0000, rating: 5 },
  { year: -2500, desc: "インダス文明生まれる", region: "アジア", date: 0000, rating: 5 },
  { year: -2300, desc: "インダス文明の都市文明（モエンジョ＝ダーロ）", region: "アジア", date: 0000, rating: 5 },
  { year: -2300, desc: "アッカド人のサルゴン1世によるメソポタミア統一", region: "西アジア", date: 0000, rating: 4 },
  { year: -2100, desc: "ウル第3王朝・シュメール法典", region: "西アジア", date: 0000, rating: 4 },
  { year: -2040, desc: "エジプト中王国（都テーベ）", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -2000, desc: "クレタ文明生まれる", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -2000, desc: "二里頭文化", region: "アジア", date: 0000, rating: 3 },
  { year: -1900, desc: "バビロン第1王朝（都バビロン）", region: "西アジア", date: 0000, rating: 4 },
  { year: -1800, desc: "インダス文明の衰退始まる", region: "アジア", date: 0000, rating: 4 },
  { year: -1800, desc: "アカイア人らの南下", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -1792, desc: "ハンムラビ王即位", region: "西アジア", date: 0000, rating: 5 },
  { year: -1759, desc: "バビロン第1王朝によるメソポタミア統一", region: "西アジア", date: 0000, rating: 4 },
  { year: -1680, desc: "ヒッタイト建国・鉄器使用", region: "西アジア", date: 0000, rating: 5 },
  { year: -1650, desc: "ヒクソスによるエジプト第15王朝", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -1600, desc: "ミケーネ文明興る", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -1600, desc: "線文字Bの使用", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -1595, desc: "ヒッタイトによるバビロン第1王朝滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -1600, desc: "殷（商）興る（甲骨文字）", region: "アジア", date: 0000, rating: 5 },
  { year: -1550, desc: "カッシートによるメソポタミア南部の王国建設", region: "西アジア", date: 0000, rating: 3 },
  { year: -1542, desc: "エジプト新王国によるヒクソス撃退", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -1500, desc: "アーリヤ人のインド移動・ヴェーダ時代の始まり", region: "アジア", date: 0000, rating: 5 },
  { year: -1486, desc: "トトメス3世による領土拡大", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -1440, desc: "ミタンニの繁栄", region: "西アジア", date: 0000, rating: 3 },
  { year: -1400, desc: "殷の都が殷墟へ", region: "アジア", date: 0000, rating: 4 },
  { year: -1364, desc: "アマルナ革命（アメンホテプ4世）", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -1346, desc: "ツタンカーメン王即位", region: "北アフリカ", date: 0000, rating: 3 },
  { year: -1300, desc: "ヘブライ人の出エジプト", region: "西アジア", date: 0000, rating: 4 },
  { year: -1300, desc: "トロイア戦争", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -1286, desc: "カデシュの戦い（最古の講和条約）", region: "西アジア", date: 0000, rating: 5 },
  { year: -1200, desc: "アラム人の定住（アラム文字）", region: "西アジア", date: 0000, rating: 4 },
  { year: -1200, desc: "フェニキア人の都市建設", region: "西アジア", date: 0000, rating: 5 },
  { year: -1200, desc: "海の民の侵攻とエーゲ文明の衰退", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -1200, desc: "ヒッタイトの滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -1200, desc: "オルメカ文明成立", region: "アメリカ", date: 0000, rating: 3 },
  { year: -1200, desc: "ギリシアの暗黒時代", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -1200, desc: "ペリシテ人のパレスチナ流入", region: "西アジア", date: 0000, rating: 3 },
  { year: -1155, desc: "エラム人によるカッシート王国滅亡", region: "西アジア", date: 0000, rating: 3 },
  { year: -1100, desc: "ドーリア人の南下定住", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -1069, desc: "エジプト新王国の滅亡", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -1100, desc: "フェニキア人のアルファベット実用化", region: "西アジア", date: 0000, rating: 5 },
  { year: -1024, desc: "周による殷の滅亡（封建制）", region: "アジア", date: 0000, rating: 5 },
  { year: -1003, desc: "ヘブライ王国（ダヴィデ王即位）", region: "西アジア", date: 0000, rating: 4 },
  { year: -1000, desc: "アーリヤ人のガンジス川流域進出", region: "アジア", date: 0000, rating: 4 },
  { year: -1000, desc: "チャビン文化（アンデス文明の始まり）", region: "アメリカ", date: 0000, rating: 3 },
  { year: -997, desc: "ヘブライ王国の都イェルサレム建設", region: "西アジア", date: 0000, rating: 4 },
  { year: -960, desc: "ソロモン王の栄華", region: "西アジア", date: 0000, rating: 4 },
  { year: -922, desc: "ヘブライ王国の分裂", region: "西アジア", date: 0000, rating: 4 },
  { year: -900, desc: "アッシリアの台頭", region: "西アジア", date: 0000, rating: 4 },
  { year: -814, desc: "カルタゴの建設", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -800, desc: "ヴァルナ制・カースト制度の成立", region: "アジア", date: 0000, rating: 5 },
  { year: -800, desc: "バラモン教の定着", region: "アジア", date: 0000, rating: 4 },
  { year: -800, desc: "ギリシアでのポリス形成", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -800, desc: "アテネの建設", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -800, desc: "ホメロスの叙事詩成立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -776, desc: "最初の古代オリンピック", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -770, desc: "周の東遷（春秋時代の始まり）", region: "アジア", date: 0000, rating: 5 },
  { year: -753, desc: "ローマの建国（伝承）", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -733, desc: "シラクサ建設", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -732, desc: "アッシリアのティグラト＝ピラセル3世の進出", region: "西アジア", date: 0000, rating: 4 },
  { year: -729, desc: "アッシリアによるメソポタミア統一", region: "西アジア", date: 0000, rating: 4 },
  { year: -722, desc: "『春秋』の記述開始", region: "アジア", date: 0000, rating: 4 },
  { year: -722, desc: "イスラエル王国の滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -700, desc: "ヘシオドスの著作", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -700, desc: "ギリシアの植民活動", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -700, desc: "スパルタの軍国主義形成", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -683, desc: "アテネでの貴族政共和政化", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -679, desc: "斉の桓公が覇者となる", region: "アジア", date: 0000, rating: 4 },
  { year: -668, desc: "アッシュール＝バニパル王即位（都ニネヴェ）", region: "西アジア", date: 0000, rating: 4 },
  { year: -668, desc: "ビザンティオン建設", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -663, desc: "アッシリアによるオリエント統一（世界帝国）", region: "西アジア", date: 0000, rating: 5 },
  { year: -659, desc: "秦の穆公の勢力拡大", region: "アジア", date: 0000, rating: 4 },
  { year: -637, desc: "宋の襄王の敗北", region: "アジア", date: 0000, rating: 3 },
  { year: -632, desc: "晋の文公が覇者となる", region: "アジア", date: 0000, rating: 4 },
  { year: -632, desc: "キュロンの僭主化失敗", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -621, desc: "アテネでのドラコン立法", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -616, desc: "ローマでの王政開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -612, desc: "アッシリア帝国滅亡", region: "西アジア", date: 0000, rating: 5 },
  { year: -604, desc: "ネブカドネザル2世即位", region: "西アジア", date: 0000, rating: 4 },
  { year: -600, desc: "リディア王国で貨幣使用開始", region: "西アジア", date: 0000, rating: 4 },
  { year: -600, desc: "諸子百家の活動開始", region: "アジア", date: 0000, rating: 5 },
  { year: -597, desc: "楚の荘王の中原進出", region: "アジア", date: 0000, rating: 4 },
  { year: -594, desc: "ソロンの改革", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -586, desc: "バビロン捕囚・ユダヤ教成立", region: "西アジア", date: 0000, rating: 5 },
  { year: -585, desc: "タレースの科学的予測", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -563, desc: "仏教の興隆", region: "アジア", date: 0000, rating: 5 },
  { year: -559, desc: "アケメネス朝ペルシア成立", region: "西アジア", date: 0000, rating: 5 },
  { year: -552, desc: "孔子の誕生", region: "アジア", date: 0000, rating: 5 },
  { year: -550, desc: "キュロス2世によるメディア王国滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -549, desc: "ジャイナ教の興隆", region: "アジア", date: 0000, rating: 4 },
  { year: -546, desc: "ペイシストラトスの僭主政", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -546, desc: "アケメネス朝によるリディア滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -540, desc: "クシュ王国（都メロエ）", region: "北アフリカ", date: 0000, rating: 3 },
  { year: -538, desc: "ユダヤ人のバビロン捕囚からの解放", region: "西アジア", date: 0000, rating: 4 },
  { year: -525, desc: "アケメネス朝によるエジプト征服", region: "西アジア", date: 0000, rating: 4 },
  { year: -522, desc: "ダレイオス1世即位（ペルセポリス造営）", region: "西アジア", date: 0000, rating: 5 },
  { year: -509, desc: "ローマ共和政開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -508, desc: "クレイステネスの改革", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -500, desc: "ペルシア戦争の始まり", region: "ユーラシア", date: 0000, rating: 5 },
  { year: -500, desc: "マガダ国の発展", region: "アジア", date: 0000, rating: 4 },
  { year: -500, desc: "ウパニシャッド哲学の完成", region: "アジア", date: 0000, rating: 4 },
  { year: -500, desc: "枢軸時代（ヤスパース）", region: "ユーラシア", date: 0000, rating: 4 },
  { year: -500, desc: "ドンソン文化の栄える", region: "アジア", date: 0000, rating: 3 },
  { year: -494, desc: "呉の覇権", region: "アジア", date: 0000, rating: 3 },
  { year: -494, desc: "聖山事件（ローマ）", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -492, desc: "第1回ペルシア戦争", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -490, desc: "マラトンの戦い", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -480, desc: "墨子の誕生", region: "アジア", date: 0000, rating: 3 },
  { year: -480, desc: "第3回ペルシア戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -480, desc: "サラミスの海戦", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -479, desc: "プラタイアの戦い", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -478, desc: "デロス同盟結成", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -473, desc: "呉の滅亡", region: "アジア", date: 0000, rating: 3 },
  { year: -453, desc: "晋の分裂（戦国時代の始まり）", region: "アジア", date: 0000, rating: 5 },
  { year: -451, desc: "アテネの市民権法制定", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -450, desc: "十二表法制定", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -449, desc: "カリアスの和約", region: "ユーラシア", date: 0000, rating: 4 },
  { year: -443, desc: "ペリクレス時代（民主政全盛期）", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -432, desc: "パルテノン神殿再建", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -431, desc: "ペロポネソス戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -429, desc: "ペリクレス死去", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -413, desc: "シラクサ遠征", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -404, desc: "ペロポネソス戦争終結・アテネ敗北", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -403, desc: "戦国時代の本格化", region: "アジア", date: 0000, rating: 5 },
  { year: -400, desc: "ソクラテス死去", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -395, desc: "コリント戦争", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -387, desc: "アカデメイア開設", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -386, desc: "大王の和約", region: "西アジア", date: 0000, rating: 4 },
  { year: -371, desc: "テーベの覇権", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -367, desc: "リキニウス・セクスティウス法", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -359, desc: "商鞅の改革（秦）", region: "アジア", date: 0000, rating: 5 },
  { year: -350, desc: "ナンダ朝の成立", region: "アジア", date: 0000, rating: 4 },
  { year: -338, desc: "カイロネイアの戦い", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -334, desc: "アレクサンドロス大王の東方遠征", region: "ユーラシア", date: 0000, rating: 5 },
  { year: -331, desc: "アルベラの戦い（ペルシア帝国の実質的滅亡）", region: "西アジア", date: 0000, rating: 5 },
  { year: -323, desc: "アレクサンドロス大王の死", region: "西アジア", date: 0000, rating: 5 },
  { year: -317, desc: "マウリヤ朝成立", region: "アジア", date: 0000, rating: 5 },
  { year: -312, desc: "セレウコス朝シリア建国", region: "西アジア", date: 0000, rating: 4 },
  { year: -304, desc: "プトレマイオス朝エジプト自立", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -300, desc: "ヘレニズム時代の発展", region: "ユーラシア", date: 0000, rating: 5 },
  { year: -290, desc: "サムニウム戦争終結（ローマの半島統一へ）", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -287, desc: "ホルテンシウス法", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -279, desc: "ピュロスの勝利", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: -276, desc: "アンティゴノス朝マケドニア建国", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -272, desc: "ローマのイタリア半島統一", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -268, desc: "アショーカ王即位", region: "アジア", date: 0000, rating: 5 },
  { year: -264, desc: "第1回ポエニ戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -260, desc: "長平の戦い", region: "アジア", date: 0000, rating: 4 },
  { year: -256, desc: "周の滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: -247, desc: "パルティア建国", region: "西アジア", date: 0000, rating: 4 },
  { year: -227, desc: "シチリアの属州化", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -221, desc: "秦の中国統一", region: "アジア", date: 0000, rating: 5 },
  { year: -218, desc: "第2回ポエニ戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -214, desc: "万里の長城の修築", region: "アジア", date: 0000, rating: 4 },
  { year: -213, desc: "焚書・坑儒", region: "アジア", date: 0000, rating: 4 },
  { year: -209, desc: "陳勝・呉広の乱", region: "アジア", date: 0000, rating: 5 },
  { year: -206, desc: "秦の滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: -202, desc: "漢の統一", region: "アジア", date: 0000, rating: 5 },
  { year: -202, desc: "ザマの戦い", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -200, desc: "匈奴との衝突", region: "アジア", date: 0000, rating: 4 },
  { year: -195, desc: "衛氏朝鮮の建国", region: "アジア", date: 0000, rating: 3 },
  { year: -180, desc: "マウリヤ朝の滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: -171, desc: "パルティアの全盛期（ミトラダテス1世）", region: "西アジア", date: 0000, rating: 4 },
  { year: -168, desc: "マケドニア王国の滅亡", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -154, desc: "呉楚七国の乱", region: "アジア", date: 0000, rating: 4 },
  { year: -149, desc: "第3回ポエニ戦争", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -146, desc: "ローマによるカルタゴ破壊", region: "北アフリカ", date: 0000, rating: 5 },
  { year: -141, desc: "漢の武帝即位", region: "アジア", date: 0000, rating: 5 },
  { year: -139, desc: "張騫の西域派遣", region: "アジア", date: 0000, rating: 5 },
  { year: -136, desc: "五経博士の設置", region: "アジア", date: 0000, rating: 4 },
  { year: -133, desc: "グラックス兄弟の改革", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -121, desc: "霍去病の匈奴討伐", region: "アジア", date: 0000, rating: 4 },
  { year: -119, desc: "均輸法・平準法の実施", region: "アジア", date: 0000, rating: 4 },
  { year: -111, desc: "南越の滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: -108, desc: "衛氏朝鮮の滅亡（四郡設置）", region: "アジア", date: 0000, rating: 4 },
  { year: -107, desc: "マリウスの兵制改革", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -104, desc: "大宛遠征", region: "アジア", date: 0000, rating: 4 },
  { year: -91, desc: "『史記』完成", region: "アジア", date: 0000, rating: 5 },
  { year: -91, desc: "イタリア同盟市戦争", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -87, desc: "武帝の死去", region: "アジア", date: 0000, rating: 4 },
  { year: -82, desc: "スラの独裁", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: -73, desc: "スパルタクスの反乱", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -64, desc: "セレウコス朝の滅亡", region: "西アジア", date: 0000, rating: 4 },
  { year: -60, desc: "第1回三頭政治", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -59, desc: "西域都護の設置", region: "アジア", date: 0000, rating: 4 },
  { year: -58, desc: "カエサルのガリア遠征", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -53, desc: "カルラエの戦い", region: "西アジア", date: 0000, rating: 4 },
  { year: -49, desc: "ルビコン渡河", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -48, desc: "アレクサンドリアの焼き討ち", region: "北アフリカ", date: 0000, rating: 4 },
  { year: -44, desc: "カエサル暗殺", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -43, desc: "第2回三頭政治", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -31, desc: "アクティウムの海戦", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -30, desc: "プトレマイオス朝滅亡", region: "北アフリカ", date: 0000, rating: 5 },
  { year: -27, desc: "アウグストゥスによる元首政（ローマ帝国）", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: -7, desc: "イエスの誕生", region: "西アジア", date: 0000, rating: 5 },
  { year: 6, desc: "パレスチナの属州化", region: "西アジア", date: 0000, rating: 4 },
  { year: 8, desc: "新の建国（王莽）", region: "アジア", date: 0000, rating: 4 },
  { year: 9, desc: "トイトブルクの戦い", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 25, desc: "後漢の建国", region: "アジア", date: 0000, rating: 5 },
  { year: 30, desc: "キリストの処刑", region: "西アジア", date: 0000, rating: 5 },
  { year: 43, desc: "ブリタニアの征服", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 57, desc: "倭国王の奴国王遣使（金印）", region: "アジア", date: 0000, rating: 5 },
  { year: 64, desc: "キリスト教徒迫害（ネロ）", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 66, desc: "ユダヤ戦争", region: "西アジア", date: 0000, rating: 4 },
  { year: 70, desc: "イェルサレム破壊", region: "西アジア", date: 0000, rating: 5 },
  { year: 80, desc: "コロッセウム完成", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 96, desc: "五賢帝時代始まる", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 98, desc: "ローマ帝国領の最大化", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 101, desc: "トラヤヌスのダキア遠征", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 105, desc: "製紙法の発明（蔡倫）", region: "アジア", date: 0000, rating: 5 },
  { year: 107, desc: "倭国王帥升の朝貢", region: "アジア", date: 0000, rating: 4 },
  { year: 114, desc: "トラヤヌスの東方遠征", region: "西アジア", date: 0000, rating: 4 },
  { year: 121, desc: "説文解字完成", region: "アジア", date: 0000, rating: 3 },
  { year: 122, desc: "ハドリアヌスの長城", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 166, desc: "大秦王安敦の使者来訪", region: "アジア", date: 0000, rating: 4 },
  { year: 166, desc: "党錮の禁", region: "アジア", date: 0000, rating: 4 },
  { year: 184, desc: "黄巾の乱", region: "アジア", date: 0000, rating: 5 },
  { year: 208, desc: "赤壁の戦い", region: "アジア", date: 0000, rating: 5 },
  { year: 212, desc: "アントニヌス勅令（万民法）", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 220, desc: "後漢滅亡（三国時代）", region: "アジア", date: 0000, rating: 5 },
  { year: 226, desc: "ササン朝ペルシア成立", region: "西アジア", date: 0000, rating: 5 },
  { year: 239, desc: "卑弥呼の遣使", region: "アジア", date: 0000, rating: 5 },
  { year: 265, desc: "晋（西晋）の建国", region: "アジア", date: 0000, rating: 4 },
  { year: 280, desc: "晋の統一", region: "アジア", date: 0000, rating: 4 },
  { year: 284, desc: "ディオクレティアヌス即位（専制君主政）", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 290, desc: "八王の乱", region: "アジア", date: 0000, rating: 4 },
  { year: 304, desc: "五胡十六国時代始まる", region: "アジア", date: 0000, rating: 5 },
  { year: 311, desc: "永嘉の乱", region: "アジア", date: 0000, rating: 4 },
  { year: 313, desc: "ミラノ勅令", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 320, desc: "グプタ朝成立", region: "アジア", date: 0000, rating: 5 },
  { year: 325, desc: "ニケーア公会議", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 330, desc: "コンスタンティノープル遷都", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 376, desc: "ゲルマン人の大移動", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 380, desc: "キリスト教の国教化", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 383, desc: "淝水の戦い", region: "アジア", date: 0000, rating: 4 },
  { year: 386, desc: "北魏の建国", region: "アジア", date: 0000, rating: 4 },
  { year: 395, desc: "ローマ帝国東西分裂", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 406, desc: "ゲルマン人諸部族のライン渡河", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 410, desc: "ローマ略奪", region: "ヨーロッパ", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 420, desc: "南北朝時代始まる", region: "アジア", date: 0000, rating: 5 },
  { year: 439, desc: "北魏の華北統一", region: "アジア", date: 0000, rating: 4 },
  { year: 451, desc: "カルケドン公会議", region: "ユーラシア", date: 0000, rating: 4 },
  { year: 476, desc: "西ローマ帝国滅亡", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 481, desc: "フランク王国建国", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 485, desc: "均田制（北魏）", region: "アジア", date: 0000, rating: 5 },
  { year: 493, desc: "北魏の洛陽遷都", region: "アジア", date: 0000, rating: 4 },
  { year: 527, desc: "ユスティニアヌス帝即位", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 529, desc: "ベネディクト派修道会", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 538, desc: "日本への仏教伝来", region: "アジア", date: 0000, rating: 4 },
  { year: 552, desc: "突厥の独立", region: "アジア", date: 0000, rating: 4 },
  { year: 581, desc: "隋の建国", region: "アジア", date: 0000, rating: 5 },
  { year: 589, desc: "隋の統一", region: "アジア", date: 0000, rating: 5 },
  { year: 590, desc: "グレゴリウス1世教皇就任", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 607, desc: "遣隋使", region: "アジア", date: 0000, rating: 4 },
  { year: 610, desc: "イスラーム教創始", region: "西アジア", date: 0000, rating: 5 },
  { year: 618, desc: "唐の建国", region: "アジア", date: 0000, rating: 5 },
  { year: 622, desc: "ヒジュラ（聖遷）", region: "西アジア", date: 0000, rating: 5 },
  { year: 630, desc: "東突厥の服属", region: "アジア", date: 0000, rating: 4 },
  { year: 632, desc: "ムハンマド死去", region: "西アジア", date: 0000, rating: 4 },
  { year: 645, desc: "大化の改新", region: "アジア", date: 0000, rating: 5 },
  { year: 661, desc: "ウマイヤ朝成立", region: "西アジア", date: 0000, rating: 5 },
  { year: 663, desc: "白村江の戦い", region: "アジア", date: 0000, rating: 4 },
  { year: 668, desc: "高句麗滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: 676, desc: "新羅による朝鮮統一", region: "アジア", date: 0000, rating: 4 },
  { year: 698, desc: "渤海の建国", region: "アジア", date: 0000, rating: 4 },
  { year: 710, desc: "平城京遷都", region: "アジア", date: 0000, rating: 4 },
  { year: 711, desc: "イスラーム軍のイベリア進出", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 732, desc: "トゥール＝ポワティエ間の戦い", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 750, desc: "アッバース朝成立", region: "西アジア", date: 0000, rating: 5 },
  { year: 751, desc: "タラス河畔の戦い", region: "アジア", date: 0000, rating: 5 },
  { year: 751, desc: "カロリング朝創始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 755, desc: "安史の乱", region: "アジア", date: 0000, rating: 5 },
  { year: 780, desc: "両税法", region: "アジア", date: 0000, rating: 5 },
  { year: 800, desc: "カールの戴冠", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 843, desc: "ヴェルダン条約", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 845, desc: "会昌の廃仏", region: "アジア", date: 0000, rating: 4 },
  { year: 870, desc: "メルセン条約", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 875, desc: "黄巣の乱", region: "アジア", date: 0000, rating: 4 },
  { year: 894, desc: "遣唐使停止", region: "アジア", date: 0000, rating: 4 },
  { year: 907, desc: "唐滅亡（五代十国）", region: "アジア", date: 0000, rating: 5 },
  { year: 910, desc: "クリュニー修道院創建", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 918, desc: "高麗建国", region: "アジア", date: 0000, rating: 4 },
  { year: 936, desc: "オットー1世即位", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 939, desc: "平将門の乱", region: "アジア", date: 0000, rating: 3 },
  { year: 960, desc: "宋建国", region: "アジア", date: 0000, rating: 5 },
  { year: 962, desc: "神聖ローマ帝国の成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1000, desc: "ハンガリー王国建国", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1004, desc: "澶淵の盟", region: "アジア", date: 0000, rating: 4 },
  { year: 1054, desc: "キリスト教教会の東西分裂", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1066, desc: "ウィリアムのイングランド征服", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1070, desc: "王安石の新法", region: "アジア", date: 0000, rating: 5 },
  { year: 1077, desc: "カノッサの屈辱", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1085, desc: "レコンキスタ（トレド奪還）", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1095, desc: "十字軍派遣決定", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1099, desc: "イェルサレム王国建設", region: "西アジア", date: 0000, rating: 5 },
  { year: 1122, desc: "ヴォルムス協約", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1127, desc: "靖康の変（北宋滅亡）", region: "アジア", date: 0000, rating: 5 },
  { year: 1142, desc: "紹興の和", region: "アジア", date: 0000, rating: 4 },
  { year: 1154, desc: "プランタジネット朝開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1167, desc: "アイルランド遠征（ヘンリ2世）", region: "ヨーロッパ", date: 0000, rating: 3 },
  { year: 1180, desc: "鎌倉幕府成立", region: "アジア", date: 0000, rating: 5 },
  { year: 1187, desc: "サラーフ＝アッディーンによる十字軍撃破", region: "西アジア", date: 0000, rating: 5 },
  { year: 1192, desc: "源頼朝、征夷大将軍に", region: "アジア", date: 0000, rating: 5 },
  { year: 1204, desc: "第4回十字軍（ラテン帝国）", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1206, desc: "モンゴル帝国成立（チンギス＝ハン）", region: "アジア", date: 0000, rating: 5 },
  { year: 1206, desc: "デリー＝スルタン朝始まる", region: "アジア", date: 0000, rating: 4 },
  { year: 1215, desc: "マグナ＝カルタ", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1221, desc: "承久の乱", region: "アジア", date: 0000, rating: 5 },
  { year: 1234, desc: "金の滅亡", region: "アジア", date: 0000, rating: 4 },
  { year: 1240, desc: "キエフ公国滅亡（タタールのくびき）", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1250, desc: "マムルーク朝樹立", region: "西アジア", date: 0000, rating: 4 },
  { year: 1258, desc: "アッバース朝滅亡", region: "西アジア", date: 0000, rating: 5 },
  { year: 1265, desc: "模範議会（モンフォール議会）", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1271, desc: "元と改称", region: "アジア", date: 0000, rating: 5 },
  { year: 1274, desc: "文永の役", region: "アジア", date: 0000, rating: 5 },
  { year: 1279, desc: "南宋滅亡", region: "アジア", date: 0000, rating: 5 },
  { year: 1281, desc: "弘安の役", region: "アジア", date: 0000, rating: 5 },
  { year: 1291, desc: "十字軍の最後（アッコン陥落）", region: "西アジア", date: 0000, rating: 5 },
  { year: 1291, desc: "スイス盟約者同盟成立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1299, desc: "オスマン帝国建国", region: "西アジア", date: 0000, rating: 5 },
  { year: 1302, desc: "フランス三部会召集", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1309, desc: "教皇のバビロン捕囚", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1333, desc: "鎌倉幕府滅亡", region: "アジア", date: 0000, rating: 5 },
  { year: 1337, desc: "百年戦争開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1348, desc: "黒死病の流行", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1356, desc: "金印勅書制定", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1368, desc: "明建国", region: "アジア", date: 0000, rating: 5 },
  { year: 1370, desc: "ティムール朝建国", region: "アジア", date: 0000, rating: 4 },
  { year: 1378, desc: "教会大分裂", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1381, desc: "ワット＝タイラーの乱", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1392, desc: "朝鮮王朝建国", region: "アジア", date: 0000, rating: 4 },
  { year: 1392, desc: "南北朝統一", region: "アジア", date: 0000, rating: 4 },
  { year: 1402, desc: "明の永楽帝即位", region: "アジア", date: 0000, rating: 5 },
  { year: 1404, desc: "勘合貿易開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1405, desc: "鄭和の遠征開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1415, desc: "フスの火刑", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1417, desc: "教会大分裂の終結", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1429, desc: "ジャンヌ＝ダルクの活躍", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1434, desc: "メディチ家支配始まる", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1449, desc: "土木の変", region: "アジア", date: 0000, rating: 4 },
  { year: 1453, desc: "コンスタンティノープル陥落", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1453, desc: "百年戦争終結", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1455, desc: "バラ戦争開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1455, desc: "グーテンベルクの活版印刷術", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1467, desc: "応仁の乱", region: "アジア", date: 0000, rating: 5 },
  { year: 1479, desc: "スペイン王国成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1480, desc: "タタールのくびき終わる", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1485, desc: "テューダー朝開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1488, desc: "喜望峰到達", region: "アフリカ", date: 0000, rating: 5 },
  { year: 1492, desc: "レコンキスタ完了", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1492, desc: "コロンブスの新大陸到達", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1494, desc: "トルデシリャス条約", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1498, desc: "ヴァスコ＝ダ＝ガマのインド航路開拓", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1500, desc: "カブラルのブラジル到達", region: "アメリカ", date: 0000, rating: 4 },
  { year: 1501, desc: "サファヴィー朝成立", region: "西アジア", date: 0000, rating: 4 },
  { year: 1510, desc: "ゴア占領", region: "アジア", date: 0000, rating: 4 },
  { year: 1511, desc: "マラッカ占領", region: "アジア", date: 0000, rating: 4 },
  { year: 1517, desc: "宗教改革開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1519, desc: "マゼランの世界周航開始", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1521, desc: "アステカ王国滅亡", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1526, desc: "ムガル帝国成立", region: "アジア", date: 0000, rating: 5 },
  { year: 1527, desc: "ローマの劫略", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1529, desc: "第1回ウィーン包囲", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1533, desc: "インカ帝国滅亡", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1534, desc: "イギリス国教会成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1534, desc: "イエズス会結成", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1543, desc: "鉄砲伝来", region: "アジア", date: 0000, rating: 5 },
  { year: 1545, desc: "ポトシ銀山採掘", region: "アメリカ", date: 0000, rating: 4 },
  { year: 1545, desc: "トリエント公会議", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1549, desc: "ザビエルの日本布教", region: "アジア", date: 0000, rating: 4 },
  { year: 1555, desc: "アウクスブルクの和議", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1559, desc: "カトー＝カンブレジ条約", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1562, desc: "ユグノー戦争開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1568, desc: "ネーデルラント独立戦争開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1571, desc: "レパントの海戦", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1572, desc: "サンバルテルミの虐殺", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1575, desc: "長篠の戦い", region: "アジア", date: 0000, rating: 4 },
  { year: 1580, desc: "スペインのポルトガル併合", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1581, desc: "ネーデルラント連邦共和国独立宣言", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1582, desc: "本能寺の変", region: "アジア", date: 0000, rating: 4 },
  { year: 1582, desc: "グレゴリウス暦制定", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1587, desc: "バテレン追放令", region: "アジア", date: 0000, rating: 4 },
  { year: 1588, desc: "無敵艦隊の敗北", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1589, desc: "ブルボン朝開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1592, desc: "豊臣秀吉の朝鮮侵略", region: "アジア", date: 0000, rating: 5 },
  { year: 1598, desc: "ナントの王令", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1600, desc: "関ヶ原の戦い", region: "アジア", date: 0000, rating: 5 },
  { year: 1600, desc: "イギリス東インド会社設立", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1602, desc: "オランダ東インド会社設立", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1603, desc: "江戸幕府開く", region: "アジア", date: 0000, rating: 5 },
  { year: 1603, desc: "ステュアート朝開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1609, desc: "琉球武力制圧", region: "アジア", date: 0000, rating: 3 },
  { year: 1609, desc: "オランダ事実上の独立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1613, desc: "ロマノフ朝開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1618, desc: "三十年戦争開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1620, desc: "ピルグリム＝ファーザーズの移住", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1623, desc: "アンボイナ事件", region: "アジア", date: 0000, rating: 4 },
  { year: 1624, desc: "鎖国政策の開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1628, desc: "権利の請願", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1636, desc: "清建国", region: "アジア", date: 0000, rating: 5 },
  { year: 1637, desc: "朝鮮の降伏", region: "アジア", date: 0000, rating: 4 },
  { year: 1639, desc: "鎖国政策の完成", region: "アジア", date: 0000, rating: 5 },
  { year: 1640, desc: "ポルトガル独立回復", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1642, desc: "ピューリタン革命開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1644, desc: "明滅亡", region: "アジア", date: 0000, rating: 5 },
  { year: 1648, desc: "ウェストファリア条約", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1649, desc: "チャールズ1世処刑", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1651, desc: "航海法", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1660, desc: "王政復古", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1661, desc: "清の康煕帝親政開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1664, desc: "英蘭戦争開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1673, desc: "三藩の乱", region: "アジア", date: 0000, rating: 4 },
  { year: 1679, desc: "人身保護法", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1682, desc: "ヴェルサイユ宮殿執務開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1683, desc: "第2次ウィーン包囲", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1683, desc: "台湾征服（清）", region: "アジア", date: 0000, rating: 4 },
  { year: 1685, desc: "ナントの王令廃止", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1687, desc: "『プリンキピア』発表", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1688, desc: "名誉革命", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1689, desc: "権利の章典", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1689, desc: "ネルチンスク条約", region: "ユーラシア", date: 0000, rating: 4 },
  { year: 1690, desc: "『統治二論』", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1701, desc: "プロイセン王国昇格", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1701, desc: "スペイン継承戦争", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1707, desc: "大ブリテン王国成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1713, desc: "ユトレヒト条約", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1714, desc: "ハノーヴァー朝成立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1721, desc: "ウォルポール内閣発足", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1729, desc: "軍機処設置", region: "アジア", date: 0000, rating: 4 },
  { year: 1735, desc: "乾隆帝即位", region: "アジア", date: 0000, rating: 5 },
  { year: 1740, desc: "オーストリア継承戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1756, desc: "七年戦争開始", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1757, desc: "プラッシーの戦い", region: "アジア", date: 0000, rating: 5 },
  { year: 1763, desc: "パリ条約", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1765, desc: "印紙法", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1772, desc: "第1回ポーランド分割", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1773, desc: "ボストン茶会事件", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1775, desc: "アメリカ独立戦争開始", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1776, desc: "アメリカ独立宣言", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1776, desc: "『諸国民の富』刊行", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1783, desc: "パリ条約（アメリカ独立承認）", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1787, desc: "アメリカ合衆国憲法制定", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1789, desc: "フランス革命開始", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1789, desc: "人権宣言", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1791, desc: "1791年憲法", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1792, desc: "フランス第一共和政", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1793, desc: "ルイ16世処刑", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1794, desc: "テルミドールのクーデタ", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1799, desc: "ブリュメール18日のクーデタ", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1801, desc: "グレートブリテンおよびアイルランド連合王国成立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1804, desc: "ナポレオン1世即位", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1804, desc: "ナポレオン法典", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1805, desc: "トラファルガーの海戦", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1806, desc: "ライン同盟", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1812, desc: "ナポレオンのロシア遠征", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1814, desc: "ウィーン会議", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1815, desc: "ワーテルローの戦い", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1819, desc: "ピータールー事件", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1823, desc: "モンロー教書", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1830, desc: "七月革命", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1832, desc: "第1回選挙法改正", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1834, desc: "ドイツ関税同盟", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1837, desc: "ヴィクトリア即位", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1840, desc: "アヘン戦争開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1842, desc: "南京条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1848, desc: "二月革命", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1848, desc: "『共産党宣言』", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1851, desc: "太平天国建国", region: "アジア", date: 0000, rating: 5 },
  { year: 1853, desc: "ペリー来航", region: "アジア", date: 0000, rating: 5 },
  { year: 1853, desc: "クリミア戦争開始", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1854, desc: "日米和親条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1857, desc: "インド大反乱開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1858, desc: "日米修好通商条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1858, desc: "イギリスによるインド直接統治開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1860, desc: "北京条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1861, desc: "ロシア農奴解放令", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1861, desc: "南北戦争開始", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1863, desc: "奴隷解放宣言", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1864, desc: "第一インターナショナル", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1867, desc: "カナダ自治領成立", region: "アメリカ", date: 0000, rating: 4 },
  { year: 1867, desc: "北ドイツ連邦成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1868, desc: "明治維新開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1869, desc: "スエズ運河開通", region: "北アフリカ", date: 0000, rating: 5 },
  { year: 1870, desc: "普仏戦争", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1871, desc: "ドイツ帝国成立", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1871, desc: "パリ＝コミューン成立", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 1878, desc: "ベルリン会議", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1882, desc: "三国同盟", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1884, desc: "ベルリン会議（アフリカ分割）", region: "アフリカ", date: 0000, rating: 5 },
  { year: 1885, desc: "インド国民会議結成", region: "アジア", date: 0000, rating: 5 },
  { year: 1889, desc: "大日本帝国憲法公布", region: "アジア", date: 0000, rating: 5 },
  { year: 1894, desc: "日清戦争開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1895, desc: "下関条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1896, desc: "アドワの戦い", region: "アフリカ", date: 0000, rating: 4 },
  { year: 1898, desc: "米西戦争", region: "アメリカ", date: 0000, rating: 5 },
  { year: 1899, desc: "門戸開放宣言", region: "アジア", date: 0000, rating: 5 },
  { year: 1900, desc: "義和団事件", region: "アジア", date: 0000, rating: 5 },
  { year: 1901, desc: "北京議定書", region: "アジア", date: 0000, rating: 4 },
  { year: 1902, desc: "日英同盟", region: "アジア", date: 0000, rating: 5 },
  { year: 1904, desc: "日露戦争開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1905, desc: "血の日曜日事件", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1905, desc: "ポーツマス条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1907, desc: "英露協商", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1908, desc: "青年トルコ革命", region: "西アジア", date: 0000, rating: 4 },
  { year: 1910, desc: "韓国併合", region: "アジア", date: 0000, rating: 5 },
  { year: 1911, desc: "辛亥革命開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1912, desc: "中華民国発足", region: "アジア", date: 0000, rating: 5 },
  { year: 1914, desc: "第一次世界大戦開始", region: "世界", date: 0000, rating: 5 },
  { year: 1915, desc: "二十一カ条の要求", region: "アジア", date: 0000, rating: 5 },
  { year: 1917, desc: "ロシア革命", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1918, desc: "第一次世界大戦終結", region: "世界", date: 0000, rating: 5 },
  { year: 1919, desc: "ヴェルサイユ条約", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1919, desc: "五・四運動", region: "アジア", date: 0000, rating: 5 },
  { year: 1920, desc: "国際連盟発足", region: "世界", date: 0000, rating: 5 },
  { year: 1921, desc: "中国共産党結成", region: "アジア", date: 0000, rating: 5 },
  { year: 1922, desc: "ソ連成立", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 1924, desc: "第1次国共合作", region: "アジア", date: 0000, rating: 5 },
  { year: 1925, desc: "治安維持法成立", region: "アジア", date: 0000, rating: 5 },
  { year: 1927, desc: "上海クーデタ", region: "アジア", date: 0000, rating: 5 },
  { year: 1928, desc: "不戦条約", region: "世界", date: 0000, rating: 5 },
  { year: 1929, desc: "世界恐慌開始", region: "世界", date: 0000, rating: 5 },
  { year: 1931, desc: "満州事変開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1932, desc: "五・一五事件", region: "アジア", date: 0000, rating: 4 },
  { year: 1933, desc: "全権委任法", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1933, desc: "日本の国際連盟脱退", region: "世界", date: 0000, rating: 5 },
  { year: 1935, desc: "ニュルンベルク法制定", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1936, desc: "二・二六事件", region: "アジア", date: 0000, rating: 4 },
  { year: 1937, desc: "日中戦争開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1938, desc: "ミュンヘン会談", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1939, desc: "第二次世界大戦開始", region: "世界", date: 0000, rating: 5 },
  { year: 1940, desc: "日独伊三国同盟", region: "世界", date: 0000, rating: 5 },
  { year: 1941, desc: "太平洋戦争開始", region: "世界", date: 0000, rating: 5 },
  { year: 1943, desc: "カイロ宣言", region: "世界", date: 0000, rating: 5 },
  { year: 1945, desc: "ポツダム宣言", region: "世界", date: 0000, rating: 5 },
  { year: 1945, desc: "終戦", region: "世界", date: 0000, rating: 5 },
  { year: 1945, desc: "国際連合発足", region: "世界", date: 0000, rating: 5 },
  { year: 1946, desc: "日本国憲法公布", region: "アジア", date: 0000, rating: 5 },
  { year: 1947, desc: "インド・パキスタン分離独立", region: "アジア", date: 0000, rating: 5 },
  { year: 1948, desc: "イスラエル独立", region: "西アジア", date: 0000, rating: 5 },
  { year: 1949, desc: "ＮＡＴＯ発足", region: "世界", date: 0000, rating: 5 },
  { year: 1949, desc: "中華人民共和国成立", region: "アジア", date: 0000, rating: 5 },
  { year: 1950, desc: "朝鮮戦争開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1951, desc: "サンフランシスコ平和条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1955, desc: "アジア＝アフリカ会議", region: "アジア", date: 0000, rating: 5 },
  { year: 1956, desc: "日ソ共同宣言", region: "世界", date: 0000, rating: 5 },
  { year: 1960, desc: "アフリカの年", region: "アフリカ", date: 0000, rating: 5 },
  { year: 1962, desc: "キューバ危機", region: "世界", date: 0000, rating: 5 },
  { year: 1964, desc: "東京オリンピック", region: "アジア", date: 0000, rating: 4 },
  { year: 1965, desc: "ベトナム戦争本格化", region: "アジア", date: 0000, rating: 5 },
  { year: 1966, desc: "文化大革命開始", region: "アジア", date: 0000, rating: 5 },
  { year: 1967, desc: "第3次中東戦争", region: "西アジア", date: 0000, rating: 5 },
  { year: 1968, desc: "プラハの春", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1972, desc: "沖縄返還", region: "アジア", date: 0000, rating: 5 },
  { year: 1972, desc: "日中共同声明", region: "アジア", date: 0000, rating: 5 },
  { year: 1973, desc: "第1次石油危機", region: "世界", date: 0000, rating: 5 },
  { year: 1975, desc: "ベトナム戦争終結", region: "世界", date: 0000, rating: 5 },
  { year: 1978, desc: "日中平和友好条約", region: "アジア", date: 0000, rating: 5 },
  { year: 1979, desc: "イラン革命", region: "西アジア", date: 0000, rating: 5 },
  { year: 1979, desc: "ソ連軍のアフガニスタン侵攻", region: "アジア", date: 0000, rating: 5 },
  { year: 1985, desc: "プラザ合意", region: "世界", date: 0000, rating: 5 },
  { year: 1989, desc: "天安門事件", region: "アジア", date: 0000, rating: 5 },
  { year: 1989, desc: "ベルリンの壁開放", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1990, desc: "ドイツ統一", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1991, desc: "ソ連邦解体", region: "世界", date: 0000, rating: 5 },
  { year: 1993, desc: "ＥＵ発足", region: "ヨーロッパ", date: 0000, rating: 5 },
  { year: 1997, desc: "香港返還", region: "アジア", date: 0000, rating: 5 },
  { year: 1999, desc: "ユーロ使用開始", region: "ヨーロッパ", date: 0000, rating: 4 },
  { year: 2001, desc: "9.11同時多発テロ", region: "世界", date: 0000, rating: 5 },
  { year: 2003, desc: "イラク戦争開始", region: "西アジア", date: 0000, rating: 5 },
  { year: 2008, desc: "リーマン＝ショック", region: "世界", date: 0000, rating: 5 },
  { year: 2011, desc: "東日本大震災", region: "アジア", date: 0000, rating: 5 },
  { year: 2020, desc: "新型コロナパンデミック", region: "世界", date: 0000, rating: 5 },
  { year: 2022, desc: "ロシアのウクライナ侵攻", region: "ユーラシア", date: 0000, rating: 5 },
  { year: 2026, desc: "アメリカ軍によるイラン最高指導者殺害", region: "西アジア", date: 0000, rating: 5 }
]

const REGIONS = ["全地域", ...Array.from(new Set(EVENTS.map(e => e.region))).sort()];

const formatYear = (y) => {
  if (y <= -1000000) return `${Math.abs(y / 10000)}万年前`;
  if (y < -999) return `前${Math.abs(Math.floor(y / 1000))}千${Math.abs(y % 1000) > 0 ? Math.abs(y % 1000) : ""}年${y < 0 ? "ごろ" : ""}`;
  if (y < 0) return `前${Math.abs(y)}年`;
  return `${y}年`;
};

const centuryLabel = (y) => {
  if (y < -999999) return "数百万年前";
  if (y < 0) {
    const c = Math.ceil(Math.abs(y) / 100);
    return `前${c}世紀`;
  }
  if (y === 0) return "1世紀";
  const c = Math.ceil(y / 100);
  return `${c}世紀`;
};

const getCenturies = () => {
  const s = new Set();
  EVENTS.forEach(e => s.add(centuryLabel(e.year)));
  return ["全時代", ...Array.from(s)];
};

const eventKey = (e) => `${e.year}__${e.desc}`;
const EMPTY_LAST_ATTEMPT = { correct: null, prompt: "", answer: "" };

const filterEvents = (events, yearRange, region, keyword = "") => {
  const q = keyword.trim().toLowerCase();
  return events.filter(e => {
    const inRange = e.year >= yearRange[0] && e.year <= yearRange[1];
    const inRegion = region === "全地域" || e.region === region;
    const inKeyword = q === "" || e.desc.toLowerCase().includes(q) || e.region.toLowerCase().includes(q) || String(e.year).includes(q);
    return inRange && inRegion && inKeyword;
  });
};

const pickChoices = (correct, pool, count = 4) => {
  const nearish = [...pool]
    .filter(e => e !== correct)
    .sort((a, b) => Math.abs(a.year - correct.year) - Math.abs(b.year - correct.year));
  const near = nearish.slice(0, Math.min(6, nearish.length));
  const far = nearish.slice(Math.min(6, nearish.length));
  const candidates = [...near.sort(() => Math.random() - 0.5).slice(0, count - 1),
    ...far.sort(() => Math.random() - 0.5).slice(0, Math.max(0, count - 1 - near.length))];
  const choices = [correct, ...candidates.slice(0, count - 1)];
  return choices.sort(() => Math.random() - 0.5);
};

const YearRangeSlider = ({ min, max, value, onChange }) => {
  const yearRange = [
    { label: "有史以前", val: -5000000 }, { label: "前3000年", val: -3000 },
    { label: "前2000年", val: -2000 }, { label: "前1000年", val: -1000 },
    { label: "前500年", val: -500 }, { label: "元年", val: 1 },
    { label: "500年", val: 500 }, { label: "1000年", val: 1000 },
    { label: "1500年", val: 1500 }, { label: "1700年", val: 1700 },
    { label: "1900年", val: 1900 }, { label: "現代", val: 2010 },
  ];
  const toIdx = (v) => {
    let best = 0;
    yearRange.forEach((r, i) => { if (Math.abs(r.val - v) < Math.abs(yearRange[best].val - v)) best = i; });
    return best;
  };
  const toVal = (i) => yearRange[i].val;
  const [fromIdx, toIdx2] = [toIdx(value[0]), toIdx(value[1])];
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>開始: {yearRange[fromIdx].label}</label>
        <input type="range" min={0} max={yearRange.length - 1} value={fromIdx}
          onChange={e => { const ni = Number(e.target.value); if (ni < toIdx2) onChange([toVal(ni), value[1]]); }}
          style={{ width: "100%" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <label style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>終了: {yearRange[toIdx2].label}</label>
        <input type="range" min={0} max={yearRange.length - 1} value={toIdx2}
          onChange={e => { const ni = Number(e.target.value); if (ni > fromIdx) onChange([value[0], toVal(ni)]); }}
          style={{ width: "100%" }} />
      </div>
    </div>
  );
};

const Settings = ({ yearRange, setYearRange, region, setRegion, keyword, setKeyword, onClose }) => (
  <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", marginBottom: "1rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
      <span style={{ fontWeight: 500, fontSize: 15 }}>出題範囲の設定</span>
      <button onClick={onClose} style={{ fontSize: 14 }}>閉じる</button>
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>年代の範囲</div>
      <YearRangeSlider min={-5000000} max={2010} value={yearRange} onChange={setYearRange} />
    </div>
    <div>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>地域</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {REGIONS.map(r => (
          <button key={r} onClick={() => setRegion(r)}
            style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: r === region ? "var(--color-background-info)" : "var(--color-background-secondary)", color: r === region ? "var(--color-text-info)" : "var(--color-text-primary)", border: r === region ? "1px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)" }}>
            {r}
          </button>
        ))}
      </div>
    </div>
    <div style={{ marginTop: "1rem" }}>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6 }}>キーワード検索</div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="例: ローマ / 前221 / 革命"
        style={{ width: "100%", fontSize: 14 }}
      />
    </div>
  </div>
);

const useStorage = () => {
  const load = (key, def) => {
    try { const v = localStorage.getItem(key); return v != null ? JSON.parse(v) : def; } catch { return def; }
  };
  const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
  return { load, save };
};

const RecordBadge = ({ correct, total }) => {
  if (total === 0) return null;
  const pct = Math.round((correct / total) * 100);
  const color = pct >= 80 ? "var(--color-background-success)" : pct >= 50 ? "var(--color-background-warning)" : "var(--color-background-danger)";
  const textColor = pct >= 80 ? "var(--color-text-success)" : pct >= 50 ? "var(--color-text-warning)" : "var(--color-text-danger)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>正解率</span>
      <span style={{ background: color, color: textColor, borderRadius: 20, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>{pct}% ({correct}/{total})</span>
    </div>
  );
};

const ModeSelector = ({ mode, setMode }) => {
  const modes = [
    { id: "input", label: "年号入力", icon: "ti-keyboard" },
    { id: "multi", label: "4択", icon: "ti-list-check" },
    { id: "sort", label: "並べ替え", icon: "ti-arrows-sort" },
  ];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
      {modes.map(m => (
        <button key={m.id} onClick={() => setMode(m.id)}
          style={{ flex: 1, padding: "10px 8px", fontWeight: m.id === mode ? 500 : 400, background: m.id === mode ? "var(--color-background-info)" : "var(--color-background-primary)", color: m.id === mode ? "var(--color-text-info)" : "var(--color-text-primary)", border: m.id === mode ? "1px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", fontSize: 14 }}>
          <i className={`ti ${m.icon}`} aria-hidden style={{ marginRight: 4 }} />{m.label}
        </button>
      ))}
    </div>
  );
};

const InputMode = ({ events, onRecord }) => {
  const [q, setQ] = useState(null);
  const [ans, setAns] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const next = useCallback(() => {
    if (events.length === 0) return;
    setQ(events[Math.floor(Math.random() * events.length)]);
    setAns("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [events]);

  useEffect(() => { next(); }, [next]);

  const check = () => {
    if (!q || ans === "") return;
    const userYear = parseInt(ans.replace("前", "-").replace("年", ""), 10);
    const isCorrect = userYear === q.year || (ans.startsWith("前") && -parseInt(ans.replace("前", "")) === q.year);
    setResult({ correct: isCorrect, year: q.year });
    onRecord(isCorrect, [q], { prompt: q.desc, answer: formatYear(q.year) });
  };

  const handleKey = (e) => { if (e.key === "Enter") result ? next() : check(); };

  if (!q) return <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)" }}>出題範囲に該当するイベントがありません</div>;

  return (
    <div>
      <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", padding: "1.5rem", marginBottom: "1rem", minHeight: 100 }}>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 }}><i className="ti ti-map-pin" aria-hidden style={{ marginRight: 4 }} />{q.region}</div>
        <div style={{ fontSize: 16, lineHeight: 1.7 }}>{q.desc}</div>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8 }}>{centuryLabel(q.year)}</div>
      </div>
      {!result ? (
        <div style={{ display: "flex", gap: 8 }}>
          <input ref={inputRef} type="text" placeholder="例: 1453 または 前221" value={ans}
            onChange={e => setAns(e.target.value)} onKeyDown={handleKey}
            style={{ flex: 1, fontSize: 16 }} />
          <button onClick={check} style={{ whiteSpace: "nowrap" }}>確認</button>
        </div>
      ) : (
        <div>
          <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", marginBottom: "0.75rem", background: result.correct ? "var(--color-background-success)" : "var(--color-background-danger)", color: result.correct ? "var(--color-text-success)" : "var(--color-text-danger)", fontWeight: 500 }}>
            {result.correct ? "✓ 正解！" : `✗ 不正解　正解: ${formatYear(result.year)}`}
          </div>
          <button onClick={next} style={{ width: "100%" }}>次の問題 →</button>
        </div>
      )}
    </div>
  );
};

const MultiMode = ({ events, onRecord, direction }) => {
  const [q, setQ] = useState(null);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const next = useCallback(() => {
    if (events.length < 4) return;
    const correct = events[Math.floor(Math.random() * events.length)];
    setQ(correct);
    setChoices(pickChoices(correct, events));
    setSelected(null);
    setResult(null);
  }, [events]);

  useEffect(() => { next(); }, [next]);

  const choose = useCallback((e) => {
    if (result) return;
    setSelected(e);
    const isCorrect = e === q;
    setResult({ correct: isCorrect });
    onRecord(isCorrect, [q], {
      prompt: direction === "year-to-desc" ? formatYear(q.year) : q.desc,
      answer: direction === "year-to-desc" ? q.desc : formatYear(q.year),
    });
  }, [direction, q, result, onRecord]);

  useEffect(() => {
    const onKeyDown = (ev) => {
      if (result || choices.length === 0) return;
      const idx = Number(ev.key) - 1;
      if (!Number.isNaN(idx) && idx >= 0 && idx < choices.length) {
        ev.preventDefault();
        choose(choices[idx]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [choices, result, choose]);

  if (!q) return <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)" }}>出題には4件以上のイベントが必要です</div>;

  return (
    <div>
      <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", padding: "1.5rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 }}><i className="ti ti-map-pin" aria-hidden style={{ marginRight: 4 }} />{q.region}</div>
        {direction === "year-to-desc"
          ? <div style={{ fontSize: 20, fontWeight: 500 }}>{formatYear(q.year)}</div>
          : <div style={{ fontSize: 16, lineHeight: 1.7 }}>{q.desc}</div>
        }
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8 }}>{centuryLabel(q.year)}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {choices.map((c, i) => {
          let bg = "var(--color-background-primary)";
          let borderColor = "var(--color-border-tertiary)";
          let textColor = "var(--color-text-primary)";
          if (result) {
            if (c === q) { bg = "var(--color-background-success)"; borderColor = "var(--color-border-success)"; textColor = "var(--color-text-success)"; }
            else if (c === selected && !result.correct) { bg = "var(--color-background-danger)"; borderColor = "var(--color-border-danger)"; textColor = "var(--color-text-danger)"; }
          }
          return (
            <button key={i} onClick={() => choose(c)}
              style={{ textAlign: "left", padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", background: bg, color: textColor, border: `0.5px solid ${borderColor}`, fontSize: 14, lineHeight: 1.6 }}>
              {direction === "year-to-desc" ? c.desc : formatYear(c.year)}
            </button>
          );
        })}
      </div>
      {result && (
        <div style={{ marginTop: "0.75rem" }}>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 8 }}>
            {direction === "year-to-desc"
              ? `正解: ${q.desc}`
              : `正解: ${formatYear(q.year)}`}
          </div>
          <button onClick={next} style={{ width: "100%" }}>次の問題 →</button>
        </div>
      )}
    </div>
  );
};

const SortMode = ({ events, onRecord, count }) => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(null);
  const touchDragging = useRef(null);

  const generate = useCallback(() => {
    if (events.length < count) return;
    const MAX_SPAN_CENTURIES = 5;
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    let chosen = null;
    for (let i = 0; i < shuffled.length; i++) {
      const anchor = shuffled[i];
      const nearby = events.filter(e => {
        const diff = Math.abs(e.year - anchor.year) / 100;
        return diff <= MAX_SPAN_CENTURIES && e !== anchor;
      });
      if (nearby.length >= count - 1) {
        const pool = [anchor, ...nearby.sort(() => Math.random() - 0.5).slice(0, count - 1)];
        chosen = pool.sort(() => Math.random() - 0.5);
        break;
      }
    }
    if (!chosen) chosen = shuffled.slice(0, count).sort(() => Math.random() - 0.5);
    setItems(chosen);
    setOrder(chosen);
    setSubmitted(false);
  }, [events, count]);

  useEffect(() => { generate(); }, [generate]);

  const move = (from, to) => {
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrder(next);
  };

  const submit = () => {
    const correct = [...items].sort((a, b) => a.year - b.year);
    const isCorrect = order.every((e, i) => e === correct[i]);
    setSubmitted(true);
    onRecord(isCorrect, items, {
      prompt: items.map(e => e.desc).join(" / "),
      answer: correct.map(e => `${formatYear(e.year)} ${e.desc}`).join(" → "),
    });
  };

  const correct = [...items].sort((a, b) => a.year - b.year);

  const handleDragStart = (e, idx) => { setDragging(idx); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e, idx) => { e.preventDefault(); if (dragging !== null && dragging !== idx) move(dragging, idx); setDragging(idx); };
  const handleDrop = () => setDragging(null);
  const handleTouchStart = (idx) => { touchDragging.current = idx; setDragging(idx); };
  const handleTouchMove = (e) => {
    const from = touchDragging.current;
    if (from === null) return;
    const touch = e.touches[0];
    if (!touch) return;
    const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest("[data-sort-idx]");
    if (!target) return;
    const to = Number(target.getAttribute("data-sort-idx"));
    if (Number.isNaN(to) || to === from) return;
    move(from, to);
    touchDragging.current = to;
    setDragging(to);
    e.preventDefault();
  };
  const handleTouchEnd = () => { touchDragging.current = null; setDragging(null); };

  if (events.length < count) return <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)" }}>並べ替えには{count}件以上のイベントが必要です</div>;

  return (
    <div>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "0.75rem" }}>
        <i className="ti ti-arrows-sort" aria-hidden style={{ marginRight: 4 }} />ドラッグして古い順（上）から新しい順（下）に並べ替えてください
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: "1rem" }}>
        {order.map((e, i) => {
          let borderLeft = "3px solid var(--color-border-tertiary)";
          let bg = "var(--color-background-primary)";
          if (submitted) {
            const correctIdx = correct.indexOf(e);
            if (correctIdx === i) { borderLeft = "3px solid #1D9E75"; bg = "var(--color-background-success)"; }
            else { borderLeft = "3px solid #E24B4A"; bg = "var(--color-background-danger)"; }
          }
          return (
            <div key={e.desc} draggable={!submitted}
              data-sort-idx={i}
              onDragStart={ev => handleDragStart(ev, i)}
              onDragOver={ev => handleDragOver(ev, i)}
              onDrop={handleDrop}
              onTouchStart={() => handleTouchStart(i)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              style={{ padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", background: bg, border: "0.5px solid var(--color-border-tertiary)", borderLeft, cursor: submitted ? "default" : "grab", display: "flex", alignItems: "center", gap: 8, touchAction: submitted ? "auto" : "none", userSelect: "none", WebkitUserSelect: "none" }}>
              {!submitted && <i className="ti ti-grip-vertical" aria-hidden style={{ color: "var(--color-text-tertiary)", fontSize: 16 }} />}
              <div style={{ flex: 1, fontSize: 14, lineHeight: 1.6 }}>{e.desc}</div>
              {submitted && <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>{formatYear(e.year)}</div>}
            </div>
          );
        })}
      </div>
      {!submitted ? (
        <button onClick={submit} style={{ width: "100%" }}>答え合わせ</button>
      ) : (
        <div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 8 }}>
            正しい順序: {correct.map(e => formatYear(e.year)).join(" → ")}
          </div>
          <button onClick={generate} style={{ width: "100%" }}>次の問題 →</button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const { load, save } = useStorage();
  const [mode, setMode] = useState("multi");
  const [showSettings, setShowSettings] = useState(false);
  const [yearRange, setYearRange] = useState([-3000, 2010]);
  const [region, setRegion] = useState("全地域");
  const [keyword, setKeyword] = useState("");
  const [multiDir, setMultiDir] = useState("desc-to-year");
  const [sortCount, setSortCount] = useState(5);
  const [record, setRecord] = useState(() => load("wh_record", { correct: 0, total: 0 }));
  const [streak, setStreak] = useState(() => load("wh_streak", { current: 0, best: 0 }));
  const [wrongBook, setWrongBook] = useState(() => load("wh_wrong_events", []));
  const [reviewOnly, setReviewOnly] = useState(false);
  const [lastAttempt, setLastAttempt] = useState(EMPTY_LAST_ATTEMPT);

  const handleRecord = (isCorrect, targets = [], attempt = EMPTY_LAST_ATTEMPT) => {
    setLastAttempt({
      correct: isCorrect,
      prompt: attempt.prompt ?? "",
      answer: attempt.answer ?? "",
    });
    const next = { correct: record.correct + (isCorrect ? 1 : 0), total: record.total + 1 };
    setRecord(next);
    save("wh_record", next);
    const nextStreak = isCorrect
      ? { current: streak.current + 1, best: Math.max(streak.best, streak.current + 1) }
      : { current: 0, best: streak.best };
    setStreak(nextStreak);
    save("wh_streak", nextStreak);

    const ids = targets.map(eventKey);
    const nextWrong = isCorrect
      ? wrongBook.filter((id) => !ids.includes(id))
      : Array.from(new Set([...wrongBook, ...ids]));
    setWrongBook(nextWrong);
    save("wh_wrong_events", nextWrong);
  };

  const resetRecord = () => {
    const next = { correct: 0, total: 0 };
    setRecord(next);
    save("wh_record", next);
    const reset = { current: 0, best: 0 };
    setStreak(reset);
    save("wh_streak", reset);
    setLastAttempt(EMPTY_LAST_ATTEMPT);
  };

  const filtered = filterEvents(EVENTS, yearRange, region, keyword);
  const reviewPool = filtered.filter((e) => wrongBook.includes(eventKey(e)));
  const activeEvents = reviewOnly ? reviewPool : filtered;
  const accuracy = record.total > 0 ? Math.round((record.correct / record.total) * 100) : 0;
  let lastAnswerStyle = { background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" };
  let lastAnswerLabel = "未回答";
  if (lastAttempt.correct === true) {
    lastAnswerStyle = { background: "var(--color-background-success)", color: "var(--color-text-success)" };
    lastAnswerLabel = "✓ 正解";
  } else if (lastAttempt.correct === false) {
    lastAnswerStyle = { background: "var(--color-background-danger)", color: "var(--color-text-danger)" };
    lastAnswerLabel = "✗ 不正解";
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
        世界史年号学習サイト
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 18 }}>世界史年号学習</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
              出題数: {activeEvents.length}件{reviewOnly ? "（復習）" : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <RecordBadge correct={record.correct} total={record.total} />
          <button onClick={() => { if (window.confirm("学習記録をリセットしますか？")) resetRecord(); }}
            style={{ fontSize: 12, padding: "4px 8px" }}>リセット</button>
          <button onClick={() => setShowSettings(v => !v)}>
            <i className="ti ti-settings" aria-hidden />
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginBottom: "0.75rem" }}>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>正解率</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{accuracy}%</div>
        </div>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>連続正解</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{streak.current}</div>
        </div>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>復習候補</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{reviewPool.length}</div>
        </div>
      </div>

      <div style={{ marginBottom: "0.75rem", padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", fontWeight: 600, ...lastAnswerStyle }}>
        直前の結果: {lastAnswerLabel}
        {lastAttempt.prompt && (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>問題</div>
            <div style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.6 }}>{lastAttempt.prompt}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8 }}>正答</div>
            <div style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.6 }}>{lastAttempt.answer}</div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "0.75rem", display: "flex", gap: 8 }}>
        <button
          onClick={() => setReviewOnly(v => !v)}
          style={{
            flex: 1,
            fontSize: 13,
            padding: "8px 0",
            background: reviewOnly ? "var(--color-background-warning)" : "var(--color-background-primary)",
            color: reviewOnly ? "var(--color-text-warning)" : "var(--color-text-primary)",
            border: reviewOnly ? "1px solid var(--color-border-warning)" : "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-md)"
          }}
        >
          {reviewOnly ? "復習モードON" : "復習モードOFF"}
        </button>
        <button
          onClick={() => { setReviewOnly(false); setKeyword(""); setRegion("全地域"); setYearRange([-3000, 2010]); }}
          style={{ fontSize: 13, padding: "8px 12px" }}
        >
          フィルター解除
        </button>
      </div>

      {showSettings && (
        <Settings
          yearRange={yearRange}
          setYearRange={setYearRange}
          region={region}
          setRegion={setRegion}
          keyword={keyword}
          setKeyword={setKeyword}
          onClose={() => setShowSettings(false)}
        />
      )}

      <ModeSelector mode={mode} setMode={setMode} />

      {mode === "multi" && (
        <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
          <button onClick={() => setMultiDir("desc-to-year")}
            style={{ flex: 1, fontSize: 13, padding: "6px 0", background: multiDir === "desc-to-year" ? "var(--color-background-secondary)" : "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)" }}>
            説明 → 年号
          </button>
          <button onClick={() => setMultiDir("year-to-desc")}
            style={{ flex: 1, fontSize: 13, padding: "6px 0", background: multiDir === "year-to-desc" ? "var(--color-background-secondary)" : "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)" }}>
            年号 → 説明
          </button>
        </div>
      )}

      {mode === "sort" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>出題数:</span>
          {[3, 4, 5, 6].map(n => (
            <button key={n} onClick={() => setSortCount(n)}
              style={{ padding: "4px 12px", fontSize: 13, borderRadius: 20, background: sortCount === n ? "var(--color-background-info)" : "var(--color-background-primary)", color: sortCount === n ? "var(--color-text-info)" : "var(--color-text-primary)", border: sortCount === n ? "1px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)" }}>
              {n}件
            </button>
          ))}
        </div>
      )}

      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem" }}>
        {mode === "input" && <InputMode events={activeEvents} onRecord={handleRecord} />}
        {mode === "multi" && <MultiMode key={multiDir} events={activeEvents} onRecord={handleRecord} direction={multiDir} />}
        {mode === "sort" && <SortMode events={activeEvents} onRecord={handleRecord} count={sortCount} />}
      </div>
    </div>
  );
}
