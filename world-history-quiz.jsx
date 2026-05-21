import { useState, useEffect, useCallback, useRef } from "react";

const EVENTS = [
  { year: -5000000, desc: "直立歩行する人類の出現", region: "アフリカ" },
  { year: -2500000, desc: "旧石器時代・打製石器の使用開始", region: "世界" },
  { year: -10000, desc: "新石器時代・農耕と牧畜の始まり", region: "世界" },
  { year: -3000, desc: "シュメール人が都市国家を建設（ウル・ウルク）", region: "西アジア" },
  { year: -3000, desc: "エジプト文明の形成", region: "エジプト" },
  { year: -2530, desc: "クフ王らがピラミッドを造営", region: "エジプト" },
  { year: -2300, desc: "アッカド人のサルゴン１世がメソポタミアを統一", region: "西アジア" },
  { year: -1792, desc: "ハンムラビ王即位・ハンムラビ法典を整備", region: "西アジア" },
  { year: -1680, desc: "ヒッタイトがアナトリアに建国・鉄器を使用", region: "西アジア" },
  { year: -1600, desc: "ギリシア本土にミケーネ文明が興る", region: "ギリシア" },
  { year: -1500, desc: "アーリヤ人がパンジャーブに移動・ヴェーダ時代が始まる", region: "インド" },
  { year: -1286, desc: "ラメセス２世とヒッタイトのカデシュの戦い・最古の講和条約", region: "エジプト" },
  { year: -1200, desc: "海の民がギリシアに侵攻・エーゲ文明が衰退", region: "ギリシア" },
  { year: -1200, desc: "ヒッタイト滅亡", region: "西アジア" },
  { year: -1024, desc: "周が殷を倒し、封建制を採用", region: "中国" },
  { year: -814, desc: "フェニキア人がカルタゴを建設", region: "西アジア" },
  { year: -776, desc: "最初の古代オリンピック開催", region: "ギリシア" },
  { year: -770, desc: "周の東遷・春秋時代が始まる", region: "中国" },
  { year: -753, desc: "ロムルスによるローマの建国（伝承）", region: "ローマ" },
  { year: -722, desc: "イスラエル王国がアッシリアに滅ぼされる", region: "西アジア" },
  { year: -663, desc: "アッシリア帝国がエジプトを征服・オリエント統一", region: "西アジア" },
  { year: -621, desc: "アテネでドラコンの立法", region: "ギリシア" },
  { year: -612, desc: "アッシリア帝国滅亡・四国分立時代へ", region: "西アジア" },
  { year: -594, desc: "アテネでソロンの改革・財産政治", region: "ギリシア" },
  { year: -586, desc: "ユダ王国が新バビロニアに滅ぼされる・バビロン捕囚", region: "西アジア" },
  { year: -563, desc: "ガウタマ＝シッダールタ（釈迦）が仏教を興す", region: "インド" },
  { year: -559, desc: "アケメネス朝ペルシア・キュロス２世が即位", region: "西アジア" },
  { year: -552, desc: "孔子が魯で生まれる", region: "中国" },
  { year: -538, desc: "アケメネス朝が新バビロニアを滅ぼす", region: "西アジア" },
  { year: -525, desc: "アケメネス朝がエジプトを征服・オリエント統一", region: "エジプト" },
  { year: -509, desc: "ローマでエトルリア人の王を追放・貴族共和政となる", region: "ローマ" },
  { year: -508, desc: "アテネでクレイステネスの改革・オストラシズムの制度始まる", region: "ギリシア" },
  { year: -500, desc: "イオニアの反乱が起き、ペルシア戦争始まる", region: "ギリシア" },
  { year: -490, desc: "マラトンの戦いでペルシア軍敗れる（第２回ペルシア戦争）", region: "ギリシア" },
  { year: -480, desc: "テルモピュライの戦い・スパルタ軍全滅、サラミスの海戦でアテネ海軍が勝利", region: "ギリシア" },
  { year: -479, desc: "プラタイアの戦いでポリス連合軍が勝利・ペルシア戦争終結", region: "ギリシア" },
  { year: -478, desc: "アテネ中心にデロス同盟結成", region: "ギリシア" },
  { year: -453, desc: "晋が韓・魏・趙に分裂・事実上の戦国時代の始まり", region: "中国" },
  { year: -450, desc: "ローマで十二表法制定", region: "ローマ" },
  { year: -443, desc: "アテネ・ペリクレス時代・アテネの民主政全盛期", region: "ギリシア" },
  { year: -431, desc: "ペロポネソス戦争始まる", region: "ギリシア" },
  { year: -404, desc: "ペロポネソス戦争、アテネの敗北に終わる", region: "ギリシア" },
  { year: -403, desc: "戦国時代の開始・戦国の七雄が富国強兵を競う", region: "中国" },
  { year: -399, desc: "ソクラテスが裁判で死刑となる", region: "ギリシア" },
  { year: -387, desc: "プラトンがアテネにアカデメイアを開設", region: "ギリシア" },
  { year: -338, desc: "フィリッポス２世がカイロネイアの戦いでアテネ・テーベ連合軍を破る", region: "ギリシア" },
  { year: -334, desc: "アレクサンドロスが東方遠征を開始", region: "ギリシア" },
  { year: -323, desc: "アレクサンドロス大王がバビロンで死去", region: "西アジア" },
  { year: -317, desc: "チャンドラグプタがマウリヤ朝を興す", region: "インド" },
  { year: -287, desc: "ローマでホルテンシウス法が制定", region: "ローマ" },
  { year: -268, desc: "マウリヤ朝アショーカ王が即位・仏教保護", region: "インド" },
  { year: -264, desc: "ローマとカルタゴの第１回ポエニ戦争始まる", region: "ローマ" },
  { year: -221, desc: "秦の始皇帝が中国を統一", region: "中国" },
  { year: -218, desc: "第２回ポエニ戦争始まる・ハンニバルがイタリア半島に侵攻", region: "ローマ" },
  { year: -214, desc: "始皇帝が万里の長城を修築", region: "中国" },
  { year: -213, desc: "始皇帝が焚書・坑儒を命じる", region: "中国" },
  { year: -202, desc: "垓下の戦いで劉邦が項羽を破る・前漢建国", region: "中国" },
  { year: -146, desc: "第３回ポエニ戦争終わる・ローマがカルタゴを破壊", region: "ローマ" },
  { year: -133, desc: "ローマでグラックス兄が護民官となり改革始まる", region: "ローマ" },
  { year: -141, desc: "漢の武帝が即位", region: "中国" },
  { year: -108, desc: "漢の武帝が衛氏朝鮮を滅ぼし楽浪郡など四郡を置く", region: "中国" },
  { year: -73, desc: "スパルタクスの反乱が起きる", region: "ローマ" },
  { year: -60, desc: "第１回三頭政治（ポンペイウス・クラッスス・カエサル）", region: "ローマ" },
  { year: -44, desc: "カエサルがブルートゥスらによって暗殺される", region: "ローマ" },
  { year: -31, desc: "アクティウムの海戦でオクタウィアヌスが勝利", region: "ローマ" },
  { year: -30, desc: "プトレマイオス朝エジプトの滅亡・ローマの地中海世界支配", region: "エジプト" },
  { year: -27, desc: "オクタウィアヌスがアウグストゥスとなり元首政が始まる", region: "ローマ" },
  { year: 8, desc: "王莽が帝位を奪い新を建てる", region: "中国" },
  { year: 25, desc: "劉秀が即位して光武帝となり後漢を建てる", region: "中国" },
  { year: 30, desc: "イエスが処刑される・キリスト教の起源", region: "西アジア" },
  { year: 57, desc: "倭人の奴国王が後漢の光武帝に遣使・金印を授かる", region: "東アジア" },
  { year: 64, desc: "ネロがキリスト教徒を迫害・ペテロらが殉教", region: "ローマ" },
  { year: 79, desc: "ポンペイがヴェスヴィオ火山噴火で埋没", region: "ローマ" },
  { year: 80, desc: "ローマのコロッセウム完成", region: "ローマ" },
  { year: 96, desc: "ローマ帝国・五賢帝の時代が始まる", region: "ローマ" },
  { year: 105, desc: "後漢の蔡倫が紙を作ったとされる", region: "中国" },
  { year: 184, desc: "後漢で黄巾の乱が起こる", region: "中国" },
  { year: 220, desc: "後漢の滅亡・曹丕が魏を建国", region: "中国" },
  { year: 226, desc: "アルデシール１世がササン朝ペルシアを建国", region: "西アジア" },
  { year: 235, desc: "ローマ帝国の軍人皇帝時代はじまる・３世紀の危機", region: "ローマ" },
  { year: 239, desc: "邪馬台国の女王卑弥呼が魏に遣使・親魏倭王となる", region: "東アジア" },
  { year: 280, desc: "晋が呉を滅ぼし中国を統一", region: "中国" },
  { year: 284, desc: "ディオクレティアヌス帝即位・専制君主政", region: "ローマ" },
  { year: 313, desc: "コンスタンティヌス大帝がミラノ勅令でキリスト教を公認", region: "ローマ" },
  { year: 316, desc: "西晋が匈奴の族長に降伏し滅亡", region: "中国" },
  { year: 320, desc: "チャンドラグプタ１世がグプタ朝を創始", region: "インド" },
  { year: 325, desc: "ニケーア公会議・アタナシウス派を正統とする", region: "ローマ" },
  { year: 330, desc: "ローマ帝国がコンスタンティノポリスに遷都", region: "ローマ" },
  { year: 376, desc: "西ゴート人がドナウ川を越えてローマに侵入・ゲルマン人の大移動始まる", region: "ヨーロッパ" },
  { year: 380, desc: "テオドシウス帝がキリスト教を国教化", region: "ローマ" },
  { year: 395, desc: "テオドシウスの死によりローマ帝国が東西に分割", region: "ローマ" },
  { year: 476, desc: "オドアケルによって西ローマ帝国が滅ぼされる", region: "ヨーロッパ" },
  { year: 481, desc: "クローヴィス即位・フランク王国のメロヴィング朝創始", region: "ヨーロッパ" },
  { year: 485, desc: "北魏で均田制が実施される", region: "中国" },
  { year: 527, desc: "東ローマ帝国にユスティニアヌス帝が即位", region: "ヨーロッパ" },
  { year: 537, desc: "ユスティニアヌスがハギア＝ソフィア聖堂を再建", region: "ヨーロッパ" },
  { year: 552, desc: "突厥が独立・柔然を滅ぼす", region: "中央アジア" },
  { year: 581, desc: "楊堅が隋を建国・律令を制定", region: "中国" },
  { year: 589, desc: "隋が陳を滅ぼし中国を統一", region: "中国" },
  { year: 610, desc: "メッカのムハンマドがイスラーム教を創始", region: "西アジア" },
  { year: 618, desc: "李淵が即位し唐を建国", region: "中国" },
  { year: 622, desc: "ムハンマドがメディナに移る・ヒジュラ（聖遷）・イスラーム暦元年", region: "西アジア" },
  { year: 626, desc: "李世民が実権を奪い即位（太宗）・貞観の治が始まる", region: "中国" },
  { year: 630, desc: "ムハンマドがメッカを征服", region: "西アジア" },
  { year: 632, desc: "ムハンマド死去・アブー＝バクルがカリフとなり正統カリフ時代始まる", region: "西アジア" },
  { year: 645, desc: "日本で乙巳の変・大化改新が行われる", region: "東アジア" },
  { year: 651, desc: "ササン朝ペルシア滅亡", region: "西アジア" },
  { year: 661, desc: "ダマスクスにウマイヤ朝が成立", region: "西アジア" },
  { year: 676, desc: "新羅が唐軍を撃退して朝鮮を統一", region: "東アジア" },
  { year: 680, desc: "カルバラーの戦い・シーア派形成へ", region: "西アジア" },
  { year: 690, desc: "則天武后が皇帝となり国号を周とする", region: "中国" },
  { year: 710, desc: "日本が平城京に遷都", region: "東アジア" },
  { year: 711, desc: "イスラーム軍がイベリア半島に入る・西ゴート王国滅亡", region: "ヨーロッパ" },
  { year: 712, desc: "唐の玄宗が即位・開元の治が始まる", region: "中国" },
  { year: 732, desc: "カール＝マルテルがトゥール・ポワティエ間の戦いでイスラーム軍を破る", region: "ヨーロッパ" },
  { year: 750, desc: "アッバース朝が成立", region: "西アジア" },
  { year: 751, desc: "タラス河畔の戦い・唐とアッバース朝の衝突・製紙法の西方伝播", region: "中央アジア" },
  { year: 751, desc: "ピピンがカロリング朝を創始", region: "ヨーロッパ" },
  { year: 755, desc: "唐で安史の乱が始まる", region: "中国" },
  { year: 780, desc: "唐で両税法が施行される", region: "中国" },
  { year: 800, desc: "カール大帝のカールの戴冠", region: "ヨーロッパ" },
  { year: 843, desc: "ヴェルダン条約", region: "ヨーロッパ" },
  { year: 875, desc: "唐で黄巣の乱が起こる", region: "中国" },
  { year: 882, desc: "キエフ公国が成立", region: "ヨーロッパ" },
  { year: 907, desc: "唐が滅び五代十国の争乱始まる", region: "中国" },
  { year: 960, desc: "趙匡胤が宋を建国", region: "中国" },
  { year: 962, desc: "オットー１世のローマ皇帝の戴冠・神聖ローマ帝国の始まり", region: "ヨーロッパ" },
  { year: 979, desc: "宋の太宗が中国を統一", region: "中国" },
  { year: 987, desc: "ユーグ＝カペーがフランスのカペー朝を開く", region: "ヨーロッパ" },
  { year: 1004, desc: "遼と宋の間で澶淵の盟", region: "中国" },
  { year: 1038, desc: "セルジューク朝が建国される", region: "西アジア" },
  { year: 1054, desc: "キリスト教会の東西分裂", region: "ヨーロッパ" },
  { year: 1055, desc: "セルジューク朝軍がバグダードに入城", region: "西アジア" },
  { year: 1066, desc: "ノルマンディー公ウィリアムのイングランド征服", region: "ヨーロッパ" },
  { year: 1077, desc: "カノッサの屈辱・ハインリヒ４世が破門を解かれる", region: "ヨーロッパ" },
  { year: 1095, desc: "ウルバヌス２世がクレルモン宗教会議で十字軍派遣を決定", region: "ヨーロッパ" },
  { year: 1096, desc: "ヨーロッパのキリスト教諸侯が第１回十字軍を派遣", region: "ヨーロッパ" },
  { year: 1099, desc: "十字軍がイェルサレム王国を建設", region: "西アジア" },
  { year: 1115, desc: "女真の完顔阿骨打が金を建国", region: "中国" },
  { year: 1122, desc: "ヴォルムス協約が成立・叙任権闘争が収束", region: "ヨーロッパ" },
  { year: 1125, desc: "金が宋と結び遼を滅ぼす", region: "中国" },
  { year: 1127, desc: "靖康の変・北宋が滅び南宋が成立", region: "中国" },
  { year: 1187, desc: "サラーフ＝アッディーンがヒッティーンの戦いで十字軍を破る", region: "西アジア" },
  { year: 1189, desc: "第３回十字軍（リチャード１世・フリードリヒ１世・フィリップ２世が参加）", region: "ヨーロッパ" },
  { year: 1206, desc: "クリルタイでチンギス＝ハンがハンに即位・モンゴル帝国の成立", region: "中央アジア" },
  { year: 1215, desc: "イギリスの議会が大憲章（マグナ＝カルタ）をジョン王に認めさせる", region: "ヨーロッパ" },
  { year: 1227, desc: "チンギス＝ハンが西夏を滅ぼす", region: "中央アジア" },
  { year: 1234, desc: "モンゴル軍の攻撃により金が滅亡", region: "中国" },
  { year: 1241, desc: "ワールシュタットの戦い・モンゴル軍がポーランド・ドイツ連合軍を破る", region: "ヨーロッパ" },
  { year: 1258, desc: "モンゴルのフラグ軍がバグダードを破壊・アッバース朝の滅亡", region: "西アジア" },
  { year: 1271, desc: "フビライが国号を元に改める", region: "中国" },
  { year: 1274, desc: "フビライによる第１回日本遠征（文永の役）", region: "東アジア" },
  { year: 1281, desc: "フビライによる第２回日本遠征（弘安の役）し失敗", region: "東アジア" },
  { year: 1299, desc: "オスマン＝ベイがオスマン帝国を建国", region: "西アジア" },
  { year: 1302, desc: "フランス王フィリップ４世が三部会を召集", region: "ヨーロッパ" },
  { year: 1309, desc: "教皇クレメンス５世がアヴィニョンに移される（教皇のバビロン捕囚）", region: "ヨーロッパ" },
  { year: 1339, desc: "百年戦争が始まる", region: "ヨーロッパ" },
  { year: 1348, desc: "黒死病が全ヨーロッパに広がる", region: "ヨーロッパ" },
  { year: 1351, desc: "紅巾の乱が拡大（白蓮教徒の反乱から）", region: "中国" },
  { year: 1368, desc: "朱元璋が即位し明を建国", region: "中国" },
  { year: 1370, desc: "ティムールがサマルカンドを都にティムール朝を建国", region: "中央アジア" },
  { year: 1392, desc: "李成桂が高麗を倒し朝鮮王朝を建国", region: "東アジア" },
  { year: 1402, desc: "ティムールがアンカラの戦いでオスマン帝国軍を破る", region: "西アジア" },
  { year: 1453, desc: "コンスタンティノープルが陥落・ビザンツ帝国の滅亡", region: "ヨーロッパ" },
  { year: 1453, desc: "百年戦争が終わる", region: "ヨーロッパ" },
  { year: 1455, desc: "グーテンベルクが活版印刷術による聖書を出版", region: "ヨーロッパ" },
  { year: 1488, desc: "バルトロメウ＝ディアスが喜望峰に到達", region: "ヨーロッパ" },
  { year: 1492, desc: "グラナダのナスル朝滅亡・レコンキスタの完了", region: "ヨーロッパ" },
  { year: 1492, desc: "コロンブスがアメリカ大陸に到達", region: "アメリカ" },
  { year: 1498, desc: "ヴァスコ＝ダ＝ガマがインドのカリカットに到達", region: "ヨーロッパ" },
  { year: 1501, desc: "イスマーイール１世がサファヴィー朝を興す", region: "西アジア" },
  { year: 1517, desc: "ルターが九十五ヶ条の論題を発表・宗教改革始まる", region: "ヨーロッパ" },
  { year: 1519, desc: "マゼランが世界周航に出発", region: "ヨーロッパ" },
  { year: 1521, desc: "コルテスによるアステカ王国の滅亡", region: "アメリカ" },
  { year: 1526, desc: "バーブルがムガル帝国を建国", region: "インド" },
  { year: 1534, desc: "ヘンリ８世が首長令を制定し国教会を樹立", region: "ヨーロッパ" },
  { year: 1543, desc: "コペルニクスが地動説を発表", region: "ヨーロッパ" },
  { year: 1545, desc: "トリエント公会議が始まる", region: "ヨーロッパ" },
  { year: 1556, desc: "アクバル大帝がムガル帝国を拡大", region: "インド" },
  { year: 1558, desc: "エリザベス１世がイングランド女王に即位", region: "ヨーロッパ" },
  { year: 1568, desc: "オランダ独立戦争が始まる", region: "ヨーロッパ" },
  { year: 1571, desc: "レパントの海戦でオスマン帝国がキリスト教国連合軍に敗れる", region: "ヨーロッパ" },
  { year: 1582, desc: "グレゴリウス暦が制定される", region: "ヨーロッパ" },
  { year: 1588, desc: "スペインの無敵艦隊（アルマダ）がイングランドに敗れる", region: "ヨーロッパ" },
  { year: 1600, desc: "イギリス東インド会社が設立される", region: "ヨーロッパ" },
  { year: 1602, desc: "オランダ東インド会社が設立される", region: "ヨーロッパ" },
  { year: 1616, desc: "後金（清の前身）がヌルハチによって建国される", region: "中国" },
  { year: 1618, desc: "三十年戦争が始まる", region: "ヨーロッパ" },
  { year: 1644, desc: "李自成の乱で明が滅亡・清が中国を支配", region: "中国" },
  { year: 1648, desc: "ウェストファリア条約・三十年戦争終結・近代国際秩序の成立", region: "ヨーロッパ" },
  { year: 1649, desc: "イギリスでチャールズ１世が処刑され共和政が成立", region: "ヨーロッパ" },
  { year: 1661, desc: "フランスのルイ14世が親政を始める", region: "ヨーロッパ" },
  { year: 1682, desc: "ロシアのピョートル１世が即位", region: "ヨーロッパ" },
  { year: 1688, desc: "イギリスで名誉革命が起きる", region: "ヨーロッパ" },
  { year: 1689, desc: "イギリスで権利の章典が制定される", region: "ヨーロッパ" },
  { year: 1701, desc: "スペイン継承戦争が始まる", region: "ヨーロッパ" },
  { year: 1756, desc: "七年戦争が始まる", region: "ヨーロッパ" },
  { year: 1776, desc: "アメリカ独立宣言", region: "アメリカ" },
  { year: 1783, desc: "アメリカがイギリスから独立を承認される（パリ条約）", region: "アメリカ" },
  { year: 1789, desc: "フランス革命が始まる・バスティーユ牢獄の襲撃", region: "ヨーロッパ" },
  { year: 1799, desc: "ナポレオンがクーデターで権力を握る（ブリュメール18日のクーデター）", region: "ヨーロッパ" },
  { year: 1804, desc: "ナポレオンが皇帝に即位", region: "ヨーロッパ" },
  { year: 1815, desc: "ウィーン会議が終わり・ナポレオンがワーテルローの戦いで敗れる", region: "ヨーロッパ" },
  { year: 1840, desc: "アヘン戦争が始まる", region: "中国" },
  { year: 1842, desc: "南京条約・アヘン戦争終結・香港がイギリスに割譲される", region: "中国" },
  { year: 1848, desc: "フランスで二月革命・マルクス＝エンゲルスが共産党宣言を発表", region: "ヨーロッパ" },
  { year: 1853, desc: "ペリーが浦賀に来航・黒船来航", region: "東アジア" },
  { year: 1856, desc: "アロー戦争が始まる", region: "中国" },
  { year: 1857, desc: "インドでシパーヒーの反乱（インド大反乱）が起きる", region: "インド" },
  { year: 1861, desc: "アメリカで南北戦争が始まる", region: "アメリカ" },
  { year: 1861, desc: "イタリアが統一される", region: "ヨーロッパ" },
  { year: 1863, desc: "リンカーン大統領が奴隷解放宣言を発表", region: "アメリカ" },
  { year: 1868, desc: "日本で明治維新が始まる", region: "東アジア" },
  { year: 1871, desc: "ドイツが統一される（ドイツ帝国の成立）", region: "ヨーロッパ" },
  { year: 1894, desc: "日清戦争が始まる", region: "東アジア" },
  { year: 1895, desc: "下関条約・日清戦争終結・台湾が日本に割譲される", region: "東アジア" },
  { year: 1898, desc: "アメリカがフィリピンを獲得（米西戦争）", region: "アメリカ" },
  { year: 1900, desc: "義和団事件が起きる", region: "中国" },
  { year: 1904, desc: "日露戦争が始まる", region: "東アジア" },
  { year: 1905, desc: "ロシアで血の日曜日事件・第一次ロシア革命", region: "ヨーロッパ" },
  { year: 1911, desc: "中国で辛亥革命が起きる", region: "中国" },
  { year: 1912, desc: "中華民国が成立・清王朝が滅亡", region: "中国" },
  { year: 1914, desc: "サラエボ事件・第一次世界大戦が始まる", region: "ヨーロッパ" },
  { year: 1917, desc: "ロシア革命（二月革命・十月革命）", region: "ヨーロッパ" },
  { year: 1918, desc: "第一次世界大戦が終わる", region: "ヨーロッパ" },
  { year: 1919, desc: "パリ講和会議・ヴェルサイユ条約・朝鮮で三・一独立運動", region: "世界" },
  { year: 1922, desc: "ソヴィエト社会主義共和国連邦（ソ連）が成立", region: "ヨーロッパ" },
  { year: 1929, desc: "ニューヨーク株式市場が大暴落・世界恐慌が始まる", region: "世界" },
  { year: 1931, desc: "満州事変が起きる", region: "東アジア" },
  { year: 1933, desc: "ヒトラーがドイツの首相に就任・ナチス政権が成立", region: "ヨーロッパ" },
  { year: 1937, desc: "日中戦争が始まる・盧溝橋事件", region: "東アジア" },
  { year: 1939, desc: "ドイツがポーランドに侵攻・第二次世界大戦が始まる", region: "ヨーロッパ" },
  { year: 1941, desc: "ドイツがソ連に侵攻・日本が真珠湾を攻撃・太平洋戦争が始まる", region: "世界" },
  { year: 1945, desc: "第二次世界大戦が終わる・国際連合が設立される", region: "世界" },
  { year: 1947, desc: "インドとパキスタンがイギリスから独立", region: "インド" },
  { year: 1948, desc: "イスラエルが建国される", region: "西アジア" },
  { year: 1949, desc: "中華人民共和国が成立・毛沢東が主席となる", region: "中国" },
  { year: 1950, desc: "朝鮮戦争が始まる", region: "東アジア" },
  { year: 1955, desc: "バンドン会議（アジア＝アフリカ会議）が開催される", region: "世界" },
  { year: 1956, desc: "スエズ危機（第二次中東戦争）", region: "西アジア" },
  { year: 1957, desc: "ソ連が人工衛星スプートニク１号を打ち上げる", region: "ヨーロッパ" },
  { year: 1960, desc: "アフリカの年・17カ国が独立", region: "アフリカ" },
  { year: 1961, desc: "ベルリンの壁が建設される", region: "ヨーロッパ" },
  { year: 1962, desc: "キューバ危機", region: "アメリカ" },
  { year: 1965, desc: "アメリカがベトナムに軍事介入を本格化", region: "東南アジア" },
  { year: 1966, desc: "中国で文化大革命が始まる", region: "中国" },
  { year: 1973, desc: "第四次中東戦争・石油危機（オイルショック）", region: "西アジア" },
  { year: 1979, desc: "イラン革命・ソ連がアフガニスタンに侵攻", region: "西アジア" },
  { year: 1989, desc: "天安門事件・ベルリンの壁崩壊", region: "世界" },
  { year: 1991, desc: "ソ連が崩壊・湾岸戦争", region: "世界" },
  { year: 2001, desc: "アメリカで同時多発テロ事件・アフガニスタン戦争", region: "世界" },
  { year: 2003, desc: "イラク戦争が始まる", region: "西アジア" },
  { year: 2008, desc: "リーマンショック・世界金融危機", region: "世界" },
];

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
    onRecord(isCorrect, [q]);
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

  const choose = (e) => {
    if (result) return;
    setSelected(e);
    const isCorrect = e === q;
    setResult({ correct: isCorrect });
    onRecord(isCorrect, [q]);
  };

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
  }, [choices, result]);

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
    onRecord(isCorrect, items);
  };

  const correct = [...items].sort((a, b) => a.year - b.year);

  const handleDragStart = (e, idx) => { setDragging(idx); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e, idx) => { e.preventDefault(); if (dragging !== null && dragging !== idx) move(dragging, idx); setDragging(idx); };
  const handleDrop = () => setDragging(null);

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
              onDragStart={ev => handleDragStart(ev, i)}
              onDragOver={ev => handleDragOver(ev, i)}
              onDrop={handleDrop}
              style={{ padding: "0.75rem 1rem", borderRadius: "var(--border-radius-md)", background: bg, border: "0.5px solid var(--color-border-tertiary)", borderLeft, cursor: submitted ? "default" : "grab", display: "flex", alignItems: "center", gap: 8 }}>
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

  const handleRecord = (isCorrect, targets = []) => {
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
  };

  const filtered = filterEvents(EVENTS, yearRange, region, keyword);
  const reviewPool = filtered.filter((e) => wrongBook.includes(eventKey(e)));
  const activeEvents = reviewOnly ? reviewPool : filtered;
  const accuracy = record.total > 0 ? Math.round((record.correct / record.total) * 100) : 0;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "1rem" }}>
      <h2 style={{ sr: "only" }}>世界史年号学習サイト</h2>
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
