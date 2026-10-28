// Source text stays stable so switching languages never changes puzzle state.
const gameTranslations = {
 '咦？得到了一个奇怪的糖果':['咦？得到了一個奇怪的糖果','あれ？変わったお菓子が出てきたぞ。','Huh? That’s one weird piece of candy!','어? 신기하게 생긴 사탕이 나왔네!'],
 '哈哈！换到了一个狗狗吃的骨头！二郎，这是你的零食吗？':['哈哈！換到了一個狗狗吃的骨頭！二郎，這是你的零食嗎？','ふふ、犬用の骨と交換できたね。二郎、君のおやつだったりして？','Hehe. A bone for a dog. Is this your snack, Jiro?','후후, 강아지 뼈다귀로 바꿨네. 지로, 혹시 네 간식이야?'],
 '哇！是钥匙！难道备用钥匙在什么宝箱里吗？':['哇！是鑰匙！難道備用鑰匙在什麼寶箱裡嗎？','おっ、鍵だ！もしかして予備の鍵、どっかの宝箱に入ってんのか？','Whoa, a key! Maybe the spare key’s in a treasure chest somewhere!','오, 열쇠다! 여분 열쇠가 보물 상자에 들어 있나?'],
 '二郎这家伙……东西怎么都随意乱放。':['二郎這傢伙……東西怎麼都隨意亂放。','二郎ってば……どうして何でも適当に置くんだろう。','Honestly, Jiro… Must you leave everything lying around?','지로는 정말……왜 물건을 아무 데나 두는 걸까.'],
 '这不是三郎的拼图吗？三郎……你这家伙什么时候又来我房间了啊！':['這不是三郎的拼圖嗎？三郎……你這傢伙什麼時候又來我房間了啊！','これ、三郎のパズルじゃねえか？お前……またいつ俺の部屋に入ったんだよ！','Isn’t this Saburo’s puzzle? Hey, when did you sneak into my room again?!','이거 사부로 퍼즐 아냐? 너……또 언제 내 방에 들어온 거야!'],
 '这不是我行李箱的密码吗？啊对了，行李箱还没有找过呢。':['這不是我行李箱的密碼嗎？啊對了，行李箱還沒有找過呢。','これ、僕のスーツケースの暗証番号だ。そういえば、まだ中を探してなかったね。','That’s the code to my suitcase. Come to think of it, we haven’t checked inside yet.','이거 내 여행 가방 비밀번호네. 그러고 보니 가방 안은 아직 안 찾아봤어.'],
 '到底谁会在行李箱里放魔法药水啊……':['到底誰會在行李箱裡放魔法藥水啊……','スーツケースに魔法の薬なんて、誰が入れるんだよ……。','Who even packs a magic potion in a suitcase…?','대체 누가 여행 가방에 마법 물약을 넣어 두는 거야…….'],
 '咦？这是什么？总之得放进电脑看看……':['咦？這是什麼？總之得放進電腦看看……','あれ？これは何だろう。とりあえず、パソコンで中を見てみよう。','Hm? What’s this? Let’s see what’s on it using the computer.','어? 이건 뭐지? 일단 컴퓨터에 연결해서 확인해 보자.'],
 '嗯……好像需要某种道具呢。':['嗯……好像需要某種道具呢。','うーん……何か道具が必要みたいだね。','Hm… It looks like we need an item for this.','음……뭔가 도구가 필요한 것 같네.'],
 '是不是忘记拿了什么东西……？':['是不是忘記拿了什麼東西……？','何か取り忘れてるんじゃねえか……？','Are we forgetting to pick something up…?','뭔가 챙기는 걸 깜빡한 거 아냐……?'],
 '本来万圣节想扮巫师的，但是不知道我的帽子哪里去了……':['本來萬聖節想扮巫師的，但是不知道我的帽子哪裡去了……','ハロウィンは魔法使いになるつもりだったんだけど、帽子がどっか行っちまったんだよな……。','I was gonna be a wizard for Halloween, but my hat’s vanished somewhere…','원래 핼러윈에 마법사로 변장하려고 했는데, 모자가 어디 갔는지 모르겠네…….'],
 '嘿嘿……球鞋永远都不嫌多！':['嘿嘿……球鞋永遠都不嫌多！','へへっ……スニーカーはいくらあっても足りねえよな！','Hehe… You can never have too many sneakers!','헤헤……운동화는 아무리 많아도 부족하지!'],
 '每天都在房间练吉他，吵死了……':['每天都在房間練吉他，吵死了……','毎日部屋でギターの練習ばかり。少しは静かにしてほしいんだけど……。','Guitar practice in his room, every single day. A little peace and quiet would be nice…','매일 방에서 기타 연습이라니. 조금은 조용히 해 줬으면 좋겠는데…….'],
 '嘻嘻……二郎的帽子，偷偷藏起来。':['嘻嘻……二郎的帽子，偷偷藏起來。','ふふ……二郎の帽子、こっそり隠しちゃった。','Hehe… I hid Jiro’s hat. Our little secret.','후후……지로 모자, 몰래 숨겨 뒀지.'],
 '这里已经找过了，去看看别的地方吧。':['這裡已經找過了，去看看別的地方吧。','ここはもう探したよ。別の場所を見てみよう。','We’ve already checked here. Let’s look somewhere else.','여긴 이미 찾아봤어. 다른 곳을 살펴보자.'],
 '要不再去别的地方看看吧。':['要不再去別的地方看看吧。','じゃあ、ほかのとこも見てみようぜ。','How about we try looking somewhere else?','그럼 다른 데도 한번 찾아보자!'],
 '啊！这不是你行李箱的照片吗？那个是不是备用钥匙？':['啊！這不是你行李箱的照片嗎？那個是不是備用鑰匙？','あっ！これ、お前のスーツケースの写真じゃねえか？あれ、予備の鍵じゃねえの？','Hey! Isn’t that a photo of your suitcase? Is that the spare key?!','어! 이거 네 여행 가방 사진 아냐? 저거 여분 열쇠 아니야?'],
 '我想起来了……之前修学旅行的时候一哥把钥匙给我，我放进行李箱的小口袋了。':['我想起來了……之前修學旅行的時候一哥把鑰匙給我，我放進行李箱的小口袋了。','思い出した……修学旅行のとき、いち兄にもらった鍵をスーツケースの小さなポケットに入れたんだ。','Now I remember… Ichi-nii gave me the key before my school trip. I put it in the little pocket in my suitcase.','생각났어……수학여행 때 이치 형이 준 열쇠를 여행 가방의 작은 주머니에 넣어 뒀어.'],
 '似乎有什么作用呢……':['似乎有什麼作用呢……','何かに使えそうだね……。','This might be useful for something…','어딘가에 쓸 수 있을 것 같네…….'],
 '啊！这是什么呢？':['啊！這是什麼呢？','うわっ！何だこれ？','Whoa! What’s this thing?','우와! 이게 뭐야?'],
 '咦？密码好像不对。':['咦？密碼好像不對。','あれ？この番号じゃねえのか。','Huh? Guess that’s the wrong code.','어? 이 비밀번호가 아닌가 봐.'],
 '是不是有什么遗漏呢？':['是不是有什麼遺漏呢？','何か見落としているのかな。','Could we have overlooked something?','뭔가 놓친 게 있는 걸까?'],
 '总之终于找到了，我们快出去和大哥会合吧！':['總之終於找到了，我們快出去和大哥會合吧！','とにかく、やっと見つかった！早く兄ちゃんと合流しようぜ！','Finally, we found it! Come on, let’s go meet our brother!','아무튼 드디어 찾았다! 얼른 나가서 큰형 만나자!'],
 '好！':['好！','うん！','All right!','응!'],
 '幽灵糖果':['幽靈糖果','おばけのお菓子','Ghost candy','유령 사탕'],
 '狗狗骨头':['狗狗骨頭','犬用の骨','Dog bone','강아지 뼈다귀'],
 '爪印钥匙':['爪印鑰匙','肉球の鍵','Paw-print key','발바닥 열쇠'],
 '游戏卡带':['遊戲卡帶','ゲームカセット','Game cartridge','게임 카트리지'],
 '一块拼图':['一塊拼圖','パズルのピース','Puzzle piece','퍼즐 조각'],
 '行李箱密码':['行李箱密碼','スーツケースの暗証番号','Suitcase code','여행 가방 비밀번호'],
 '魔法药水':['魔法藥水','魔法の薬','Magic potion','마법 물약'],
 'U盘':['隨身碟','USBメモリ','USB drive','USB 메모리'],
 '蜡烛':['蠟燭','ろうそく','Candle','양초'],
 '眼球':['眼球','目玉','Eyeball','눈알'],
 '获得 {item}':['獲得 {item}','{item}を手に入れた！','Obtained: {item}','{item} 획득!'],
 '当前道具：{item}，已自动装备':['目前道具：{item}，已自動裝備','選択中：{item}（自動装備）','Current item: {item} (equipped automatically)','현재 아이템: {item} (자동 장착됨)'],
 '选择{item}':['選擇{item}','{item}を選択','Select {item}','{item} 선택'],
 '打开道具栏':['打開道具欄','持ち物を開く','Open inventory','소지품 열기'],
 '关闭道具栏':['關閉道具欄','持ち物を閉じる','Close inventory','소지품 닫기'],
 '当前携带道具，可直接点击场景使用':['目前攜帶道具，可直接點擊場景使用','持っている道具。部屋の物をタップして使えます','Carried item. Tap an object in the room to use it.','소지한 아이템입니다. 방 안의 물건을 눌러 사용할 수 있어요.'],
 '恭喜你找到彩蛋糖果！':['恭喜你找到彩蛋糖果！','隠しキャンディを見つけた！','You found a hidden candy!','숨겨진 사탕을 찾았어요!'],
 '密码第{n}位':['密碼第{n}位','暗証番号の{n}桁目','Code digit {n}','비밀번호 {n}번째 자리'],
 '打开宝箱':['打開寶箱','宝箱を開ける','Open chest','보물 상자 열기'],
 '关闭密码箱':['關閉密碼箱','暗証番号画面を閉じる','Close code lock','비밀번호 창 닫기'],
 '恭喜找到备用钥匙':['恭喜找到備用鑰匙','予備の鍵を見つけた！','You found the spare key!','여분 열쇠를 찾았어요!'],
 '去三郎房间':['去三郎房間','三郎の部屋へ','Go to Saburo’s room','사부로 방으로'],
 '去二郎房间':['去二郎房間','二郎の部屋へ','Go to Jiro’s room','지로 방으로'],
 '初始宝箱':['初始寶箱','最初の宝箱','First chest','첫 번째 보물 상자'],
 '小幽灵站桩':['小幽靈立牌','おばけの飾り','Ghost decoration','유령 장식'],
 '狗狗玩偶':['狗狗玩偶','犬のぬいぐるみ','Dog plush','강아지 인형'],
 '爪印宝箱':['爪印寶箱','肉球の宝箱','Paw-print chest','발바닥 보물 상자'],
 '游戏机':['遊戲機','ゲーム機','Game console','게임기'],
 '拼图':['拼圖','パズル','Puzzle','퍼즐'],
 '行李箱':['行李箱','スーツケース','Suitcase','여행 가방'],
 '女巫站桩':['女巫立牌','魔女の飾り','Witch decoration','마녀 장식'],
 '主显示屏':['主顯示器','パソコンの画面','Computer screen','컴퓨터 화면'],
 '南瓜灯':['南瓜燈','かぼちゃランタン','Pumpkin lantern','호박 랜턴'],
 '亮灯南瓜灯':['亮燈南瓜燈','火のついたかぼちゃランタン','Lit pumpkin lantern','불이 켜진 호박 랜턴'],
 '巫师服':['巫師服','魔法使いの服','Wizard costume','마법사 의상'],
 '蝙蝠公仔':['蝙蝠公仔','コウモリのぬいぐるみ','Bat plush','박쥐 인형'],
 '鞋盒':['鞋盒','靴箱','Shoe boxes','신발 상자'],
 '吉他':['吉他','ギター','Guitar','기타'],
 '绿坐垫':['綠坐墊','緑のクッション','Green cushion','초록 쿠션'],
 '鲍勃的眼球':['鮑勃的眼球','ボブの目玉','Bob’s eyeball','밥의 눈알'],
 '南瓜坐垫':['南瓜坐墊','かぼちゃのクッション','Pumpkin cushion','호박 쿠션'],
 '南瓜坐垫抬高高度示意':['放下南瓜坐墊','クッションを戻す','Lower the cushion','쿠션 내려놓기'],
 '水晶球':['水晶球','水晶玉','Crystal ball','수정 구슬'],
 '巫师帽':['巫師帽','魔法使いの帽子','Wizard hat','마법사 모자'],
 '植物公仔':['植物公仔','植物のぬいぐるみ','Plant plush','식물 인형'],
 '花生猫公仔':['花生貓公仔','ピーナッツ猫のぬいぐるみ','Peanut cat plush','땅콩 고양이 인형'],
 '小鸟公仔':['小鳥公仔','小鳥のぬいぐるみ','Bird plush','새 인형'],
 '小幽灵公仔':['小幽靈公仔','おばけのぬいぐるみ','Ghost plush','유령 인형'],
 '南瓜灯公仔':['南瓜燈公仔','かぼちゃランタンのぬいぐるみ','Pumpkin lantern plush','호박 랜턴 인형'],
 '骷髅鲍勃公仔':['骷髏鮑勃公仔','ガイコツのボブ','Bob the skeleton plush','해골 밥 인형'],
 '骷髅鲍勃公仔（有眼球）':['骷髏鮑勃公仔（有眼球）','目玉のあるボブ','Bob with his eye','눈알이 있는 밥 인형'],
 '苹果糖公仔':['蘋果糖公仔','りんご飴のぬいぐるみ','Candy apple plush','사탕 사과 인형'],
 '彩蛋宝箱':['彩蛋寶箱','隠し宝箱','Secret chest','숨겨진 보물 상자'],
 '吊灯（开）':['吊燈（開）','天井の照明（点灯）','Ceiling light (on)','천장 조명 (켜짐)'],
 '吊灯（关）':['吊燈（關）','天井の照明（消灯）','Ceiling light (off)','천장 조명 (꺼짐)'],
 '台灯（开）':['檯燈（開）','デスクライト（点灯）','Desk lamp (on)','탁상 조명 (켜짐)'],
 '台灯（关）':['檯燈（關）','デスクライト（消灯）','Desk lamp (off)','탁상 조명 (꺼짐)'],
 '二郎':['二郎','二郎','Jiro','지로'],
 '三郎':['三郎','三郎','Saburo','사부로'],
 '万圣节布置的房间':['萬聖節布置的房間','ハロウィンの飾りつけをした部屋','A room decorated for Halloween','핼러윈 장식이 있는 방'],
 '万圣节开场对话':['萬聖節開場對話','ハロウィンのオープニング','Halloween opening dialogue','핼러윈 오프닝 대화'],
 '二三郎的万圣夜出门计划':['二三郎的萬聖夜出門計畫','二郎と三郎のハロウィンお出かけ計画','Jiro and Saburo’s Halloween Night Out','지로와 사부로의 핼러윈 외출 계획'],
 '语言':['語言','言語','Language','언어']
};
function tr(source,params={}) {
 const i=['zh-Hant','ja','en','ko'].indexOf(lang);
 let result=i<0?source:(gameTranslations[source]?.[i]??source);
 return result.replace(/\{(\w+)\}/g,(_,key)=>tr(String(params[key]??'')));
}
function localized(el,source,attribute='textContent',params={}) {
 el._translations??={};el._translations[attribute]={source,params};
 const value=tr(source,params);
 if(attribute==='textContent')el.textContent=value;else el.setAttribute(attribute,value);
 return el;
}
function refreshGameLanguage(){
 document.querySelectorAll('*').forEach(el=>{
  for(const [attr,{source,params}] of Object.entries(el._translations||{}))localized(el,source,attr,params);
 });
 document.title=tr('二三郎的万圣夜出门计划');
}
