const expressions=['jiro-smile','saburo-talk','jiro-confused','saburo-think','jiro-talk','saburo-talk',null,'jiro-confused','saburo-think','jiro-smile','saburo-talk'];
const dialogueSets={
'zh-Hans':[
'好，准备完毕！再不走，万圣节的糖就要被抢光了！','你先把糖袋拿上。','……咦？门怎么打不开？','一哥出门的时候，好像顺手把外面的锁锁上了。','啊？！大哥不是还在活动那边等我们吗！','所以先别拽门了。我问问他。','收到一郎的短信：「抱歉！忘记你们还没出门了。备用钥匙应该收在你们其中一人的房间里。我这边暂时走不开，你们先找找。」','“其中一人的房间”……到底是谁的啊？','先从刚才收拾过的地方找。应该不会太难。','好！找到钥匙就出发，可不能让大哥一直等！','那就从你手边开始。别只顾着说。'],
'zh-Hant':[
'好，準備完畢！再不走，萬聖節的糖就要被搶光了！','你先把糖袋拿上。','……咦？門怎麼打不開？','一哥出門的時候，好像順手把外面的鎖鎖上了。','啊？！大哥不是還在活動那邊等我們嗎！','所以先別拽門了。我問問他。','收到一郎的簡訊：「抱歉！忘記你們還沒出門了。備用鑰匙應該收在你們其中一人的房間裡。我這邊暫時走不開，你們先找找。」','「其中一人的房間」……到底是誰的啊？','先從剛才收拾過的地方找。應該不會太難。','好！找到鑰匙就出發，可不能讓大哥一直等！','那就從你手邊開始。別只顧著說。'],
ja:[
  "よし、準備完了！早く行かねえと、ハロウィンのお菓子が全部なくなっちまう！",
  "先にお菓子の袋を持って。",
  "……あれ？ドアが開かねえぞ？",
  "いち兄が出かけるとき、うっかり外から鍵をかけちゃったみたい。",
  "えっ？！兄ちゃん、会場で俺たちを待ってるんじゃねえの？！",
  "だから、ドアを引っ張るのはやめて。僕が聞いてみる。",
  "一郎からのメッセージ：「悪い！まだ家にいたのを忘れてた。予備の鍵は、お前らのどっちかの部屋にしまったはずだ。今はこっちを離れられないから、先に探してみてくれ。」",
  "「どっちかの部屋」……どっちだよ？！",
  "さっき片づけたところから探そう。そんなに難しくないはず。",
  "よし！鍵を見つけたら出発だ。兄ちゃんを待たせっぱなしにはできねえ！",
  "じゃあ、まずは手元から。口ばっかり動かしてないで。"
],
en:[
"All set! If we don't leave soon, all the Halloween candy will be gone!","Grab the candy bag first.","…Huh? Why won't the door open?","Ichi-nii seems to have locked it from outside when he left.","What?! Isn't our brother waiting for us at the event?!","So stop tugging at the door. I'll ask him.","A text from Ichiro: “Sorry! I forgot you two were still home. The spare key should be in one of your rooms. I can't get away right now. Have a look for it!”","‘One of your rooms’… Which one?!","Let's start where we tidied up earlier. It shouldn't be too hard.","Right! As soon as we find the key, we're off. We can't keep our brother waiting!","Then start with what's right beside you. Less talking, more looking."],
ko:[
'좋아, 준비 끝! 더 늦으면 핼러윈 사탕이 다 없어지겠어!','사탕 주머니부터 챙겨.','……어? 문이 왜 안 열리지?','이치 형이 나가면서 무심코 밖에서 잠갔나 봐.','뭐?! 큰형은 행사장에서 우리 기다리고 있잖아!','그러니까 문 좀 그만 당겨. 내가 물어볼게.','이치로에게 온 문자: 「미안! 너희가 아직 집에 있는 걸 깜빡했어. 여분 열쇠는 둘 중 한 명 방에 뒀을 거야. 지금은 자리를 비울 수 없으니까 먼저 찾아봐.」','“둘 중 한 명 방”……대체 누구 방인데?','아까 정리한 곳부터 찾아보자. 그렇게 어렵진 않을 거야.','좋아! 열쇠 찾으면 바로 출발이야. 큰형을 계속 기다리게 할 순 없지!','그럼 네 손 닿는 곳부터 찾아. 말만 하지 말고.']};
const uiTexts={
'zh-Hans':{next:'下一句',language:'切换语言',rotate:'横持设备体验更佳',end:'开场对话结束',replay:'重看开场',close:'关闭'},
'zh-Hant':{next:'下一句',language:'切換語言',rotate:'橫持裝置體驗更佳',end:'開場對話結束',replay:'重看開場',close:'關閉'},
ja:{next:'次へ',language:'言語',rotate:'端末を横向きに持って遊んでね',end:'オープニング終了',replay:'もう一度見る',close:'閉じる'},
en:{next:'Next',language:'Language',rotate:'Hold your device sideways for the best experience',end:'End of opening',replay:'Replay opening',close:'Close'},
ko:{next:'다음',language:'언어',rotate:'기기를 가로로 들고 플레이해 주세요',end:'오프닝 종료',replay:'다시 보기',close:'닫기'}};

