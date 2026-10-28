(()=>{
const stage=$('stage'),state={room:'jiro',step:0,items:[],selected:null,alternate:0,exploredAlternate:0,active:false,dialogue:false,transition:false,rewardPending:false,modal:false,extras:{candle:false,eye:false,pumpkin:false,bob:false,cushion:false,ceiling:false,desk:false,candies:[]}};window.gameState=state;
const specs={
 chest:{room:'jiro',group:'初始宝箱',before:'宝箱关闭',after:'宝箱打开',step:0,give:'candy',face:'jiro-confused',text:'咦？得到了一个奇怪的糖果'},
 ghost:{room:'saburo',group:'小幽灵站桩',before:'拿到糖果前',after:'拿到糖果后',step:1,need:'candy',give:'bone',face:'saburo-smile',text:'哈哈！换到了一个狗狗吃的骨头！二郎，这是你的零食吗？'},
 dog:{room:'jiro',group:'狗狗玩偶',before:'得到骨头前',after:'得到骨头后',step:2,need:'bone',give:'paw',face:'jiro-smile',text:'哇！是钥匙！难道备用钥匙在什么宝箱里吗？'},
 pawbox:{room:'jiro',group:'爪印宝箱',before:'爪印宝箱打开前',after:'爪印宝箱打开后',step:3,need:'paw',give:'card',face:'saburo-think',text:'二郎这家伙……东西怎么都随意乱放。'},
 console:{room:'jiro',group:'游戏机',before:'放入卡带前',after:'放入卡带后',step:4,need:'card',give:'piece',face:'jiro-confused',text:'这不是三郎的拼图吗？三郎……你这家伙什么时候又来我房间了啊！'},
 puzzle:{room:'saburo',group:'拼图',before:'拼好前',after:'拼好后',step:5,need:'piece',give:'code',face:'saburo-talk',text:'这不是我行李箱的密码吗？啊对了，行李箱还没有找过呢。'},
 suitcase:{room:'saburo',group:'行李箱',step:6,need:'code',give:'potion',face:'jiro-confused',text:'到底谁会在行李箱里放魔法药水啊……'},
 witch:{room:'jiro',group:'女巫站桩',before:'拿到药水前',after:'拿到药水后',step:7,need:'potion',give:'usb',face:'saburo-think',text:'咦？这是什么？总之得放进电脑看看……'},
 computer:{room:'saburo',group:'主显示屏',before:'拿到文件前',after:'拿到文件后',step:8,need:'usb'}
};
const items={candy:['幽灵糖果','幽灵糖果'],bone:['狗骨头','狗狗骨头'],paw:['爪印钥匙','爪印钥匙'],card:['游戏卡带','游戏卡带'],piece:['一块拼图','一块拼图'],code:['行李箱锁','行李箱密码'],potion:['魔法药水','魔法药水'],usb:['U盘','U盘'],candle:['蜡烛','蜡烛'],eye:['鲍勃的眼球','眼球']};
function ui(name){return gameLayout.ui.find(x=>x.name===name)}
function art(rec,cls=''){const im=new Image();im.src='assets/game/'+rec.id+'.webp'+(rec.id==='ui-32'?'?v=bag-audio':'');im.alt='';im.className=cls;Object.assign(im.style,{left:rec.x+'px',top:rec.y+'px',width:rec.w+'px',height:rec.h+'px'});return im}
function icon(id,selected=false){if(id==='candle')return gameLayout.saburo.find(r=>r.name==='蜡烛');if(id==='eye')return gameLayout.jiro.find(r=>r.name==='鲍勃的眼球');const prefix=items[id][0];return gameLayout.ui.find(r=>r.name.startsWith(prefix+'（'+(selected?'选中':'未选中')+'）'))}
function element(tag,id){const e=document.createElement(tag);e.id=id;stage.append(e);return e}
const room=element('div','gameRoom');room.hidden=true;
const bag=element('button','bagButton');localized(bag,'打开道具栏','aria-label');bag.append(art(ui('糖果袋')));bag.hidden=true;
const held=element('button','held');held.hidden=true;localized(held,'当前携带道具，可直接点击场景使用','title');held.onclick=()=>{bounce(held)};
const inventory=element('section','inventory');inventory.hidden=true;
const toast=element('div','toast');toast.hidden=true;let toastTimer;
const clue=element('div','clue');clue.hidden=true;clue.append(art(ui('最后的线索文件')));
function fadeIn(el,duration=400){el.hidden=false;return el.animate([{opacity:0},{opacity:1}],{duration,easing:'ease-in-out'})}
async function fadeOut(el,duration=400){if(el.hidden)return;await el.animate([{opacity:1},{opacity:0}],{duration,easing:'ease-in-out'}).finished;el.hidden=true}
function hop(el,height=22,duration=440){return el.animate([{transform:'translateY(0)',offset:0},{transform:`translateY(-${height}px)`,offset:.4},{transform:'translateY(0)',offset:1}],{duration,easing:'ease-in-out'})}
async function switchRoom(){if(!state.active||state.dialogue||state.transition||state.modal)return;state.transition=true;const arrowArt=room.querySelector('img[data-layer="切换下一个房间按钮"]');if(arrowArt)await bounce(arrowArt).finished;const old=room.cloneNode(true);old.removeAttribute('id');old.className='room-snapshot';old.querySelectorAll('button').forEach(b=>b.remove());room.after(old);state.room=state.room==='jiro'?'saburo':'jiro';renderRoom();await old.animate([{opacity:1},{opacity:0}],{duration:550,easing:'ease-in-out'}).finished;old.remove();state.transition=false}

async function closeBag(){if(state.transition)return;state.transition=true;await fadeOut(inventory,300);state.transition=false}
function updateHeld(){held.replaceChildren();held.hidden=!state.selected;if(state.selected){const r=icon(state.selected,true);held.append(art(r));const height=140,width=height*r.w/r.h;Object.assign(held.style,{left:(1464-width)+'px',top:(123-height/2)+'px',width:width+'px',height:height+'px'});localized(held,'当前道具：{item}，已自动装备','aria-label',{item:items[state.selected][1]})}}
function openBag(){if(!state.active||state.dialogue||state.transition||state.modal)return;inventory.replaceChildren();inventory.append(art(ui('道具栏背景'),'ui-art'));gameLayout.ui.filter(r=>r.name==='单个道具栏').forEach((r,i)=>{inventory.append(art(r,'ui-art'));const b=document.createElement('button');b.className='slot';b.style.left=r.x+'px';b.style.top=r.y+'px';const id=state.items[i];b.disabled=!id;if(id){localized(b,'选择{item}','aria-label',{item:items[id][1]});b.append(art(icon(id,state.selected===id)));b.onclick=()=>{state.selected=id;updateHeld();closeBag()}}inventory.append(b)});const close=document.createElement('button');close.id='bagClose';localized(close,'关闭道具栏','aria-label');close.append(art(ui('道具栏关闭按钮')));close.onclick=closeBag;inventory.append(close);fadeIn(inventory)}
inventory.onclick=e=>{if(e.target===inventory)closeBag()};bag.onclick=()=>{bounce(bag);openBag()};
function showToast(id){state.rewardPending=false;hop(bag,26,440);updateHeld();fadeIn(held,300);clearTimeout(toastTimer);toast.getAnimations().forEach(a=>a.cancel());toast.replaceChildren();const im=art(icon(id));im.style.cssText='';toast.append(im,localized(document.createElement('span'),'获得 {item}','textContent',{item:items[id][1]}));toast.hidden=false;toast.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(-18px)',offset:.55},{opacity:1,transform:'translateY(0)'}],{duration:440,easing:'ease-out'});toastTimer=setTimeout(()=>fadeOut(toast,600),1700)}

let queue=[],done=null;
function say(lines,callback){state.dialogue=true;queue=lines;done=callback;bag.hidden=false;updateHeld();ended=false;$('ending').hidden=true;$('dialogue').hidden=false;$('dialogueHit').hidden=false;$('next').hidden=false;window.gameLine=queue.shift();fadeIn($('dialogue'));fadeIn($('dialogueHit'));fadeIn($('next'));show()}
window.advanceGameDialogue=()=>{if(!state.active)return;if(queue.length){window.gameLine=queue.shift();show();return}busy=true;clearTimeout(typingTimer);typingTimer=null;if(current)$(current).classList.remove('active');current=null;const callback=done;done=null;for(const id of ['dialogue','dialogueHit','next'])$(id).animate([{opacity:1},{opacity:0}],{duration:380,easing:'ease-in-out'});setTimeout(()=>{$('dialogue').hidden=true;$('dialogueHit').hidden=true;$('next').hidden=true;window.gameLine=null;state.dialogue=false;busy=false;bag.hidden=false;updateHeld();if(state.rewardPending){state.rewardPending=false;hop(bag,26,440)}if(callback)callback()},380)};
// Keep the existing introduction advance handler until the first room becomes playable.
const advance=window.advanceGameDialogue;window.advanceGameDialogue=null;
function hint(){const second=state.alternate++%2===1;say([{face:second?'saburo-think':'jiro-confused',text:second?'嗯……好像需要某种道具呢。':'是不是忘记拿了什么东西……？'}])}
const flavor={
 '巫师服':['jiro-confused','本来万圣节想扮巫师的，但是不知道我的帽子哪里去了……'],
 '鞋盒':['jiro-smile','嘿嘿……球鞋永远都不嫌多！'],
 '吉他':['saburo-think','每天都在房间练吉他，吵死了……'],
 '巫师帽':['saburo-smile','嘻嘻……二郎的帽子，偷偷藏起来。']
};
const extraNames={jiro:['南瓜灯','亮灯南瓜灯','巫师服','蝙蝠公仔','鞋盒','吉他','绿坐垫','鲍勃的眼球','南瓜坐垫','南瓜坐垫抬高高度示意'],saburo:['水晶球','蜡烛','巫师帽','植物公仔','花生猫公仔','小鸟公仔','小幽灵公仔','南瓜灯公仔','骷髅鲍勃公仔','骷髅鲍勃公仔（有眼球）','苹果糖公仔','彩蛋宝箱','吊灯（开）','吊灯（关）','台灯（开）','台灯（关）']};
function visibleLayer(r){const e=state.extras,n=r.name;
 if(n==='切换下一个房间按钮')return state.active;
 if(state.room==='jiro'&&r.path==='房间背景')return false;
 if(n==='南瓜灯')return !e.pumpkin;if(n==='亮灯南瓜灯')return e.pumpkin;
 if(n==='南瓜坐垫')return true;if(n==='南瓜坐垫抬高高度示意')return false;
 if(n==='鲍勃的眼球')return !e.eye;
 if(n==='蜡烛')return !e.candle;
 if(n==='骷髅鲍勃公仔')return !e.bob;if(n==='骷髅鲍勃公仔（有眼球）')return e.bob;
 if(n==='吊灯（开）')return e.ceiling;if(n==='吊灯（关）')return !e.ceiling;
 if(n==='台灯（开）')return e.desk;if(n==='台灯（关）')return !e.desk;
 const entry=Object.values(specs).find(s=>s.room===state.room&&(r.path.startsWith(s.group+'/')||r.path===s.group));
 return !entry||!entry.before||n===(state.step>entry.step?entry.after:entry.before);
}
function renderRoom(){const existing=new Map([...room.querySelectorAll('img[data-asset]')].map(im=>[im.dataset.asset,im]));const fragment=document.createDocumentFragment();const rows=gameLayout[state.room];
 for(const [rank,r]of rows.entries()){if(!visibleLayer(r))continue;const im=existing.get(r.id)||art(r);im.dataset.layer=r.name;im.dataset.asset=r.id;if(r.name==='南瓜坐垫')im.style.transform=`translateY(${state.extras.cushion?-150:0}px)`;fragment.append(im);
  const main=Object.entries(specs).find(([id,s])=>s.room===state.room&&(r.path.startsWith(s.group+'/')||r.path===s.group));
  const isExtra=extraNames[state.room].includes(r.name);if(r.name==='鲍勃的眼球'&&!state.extras.cushion)continue;if(!state.active||(!main&&!isExtra&&r.name!=='切换下一个房间按钮'))continue;
  const b=document.createElement('button');localized(b,main?main[1].group:r.name==='切换下一个房间按钮'?(state.room==='jiro'?'去三郎房间':'去二郎房间'):r.name,'aria-label');b.dataset.object=main?main[0]:r.name;
  Object.assign(b.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px',zIndex:String(rank+3)});
  if(typeof gameHitPaths!=='undefined'&&gameHitPaths[r.id])b.style.clipPath=`path('${gameHitPaths[r.id]}')`;
  b.onclick=()=>r.name==='切换下一个房间按钮'?switchRoom():interact(main?main[0]:null,r,im);if(r.name==='南瓜坐垫')b.style.transform=im.style.transform;fragment.append(b);
 }
 room.replaceChildren(fragment);
}
async function moveCushion(raised){const im=room.querySelector('img[data-layer="南瓜坐垫"]');const from=state.extras.cushion?-150:0,to=raised?-150:0;const motion=im.animate([{transform:`translateY(${from}px)`},{transform:`translateY(${to}px)`}],{duration:420,easing:'cubic-bezier(.22,.7,.25,1)',fill:'forwards'});await motion.finished;state.extras.cushion=raised;im.style.transform=`translateY(${to}px)`;motion.cancel();renderRoom()}
function consume(id){state.items=state.items.filter(i=>i!==id);if(state.selected===id)state.selected=state.items.at(-1)||null;updateHeld()}
function gain(id){gameAudio.reward();if(!state.items.includes(id))state.items.push(id);state.selected=id;updateHeld();showToast(id)}
async function interact(id,r,im){if(!state.active||state.dialogue||state.transition||state.modal||!inventory.hidden)return;
 const n=r.name;if(n.startsWith('吊灯')||n.startsWith('台灯')){const key=n.startsWith('吊灯')?'ceiling':'desk';state.extras[key]=!state.extras[key];renderRoom();return}
 state.transition=true;
 if(n==='南瓜坐垫'){await moveCushion(!state.extras.cushion);state.transition=false;return}
 if(n==='鲍勃的眼球'){await hop(im).finished;state.extras.eye=true;await moveCushion(false);state.transition=false;gain('eye');say([{face:'jiro-confused',text:'啊！这是什么呢？'}]);return}
 await hop(im).finished;
 state.transition=false;
 if(!id){handleExtra(n);return}
 if(id==='suitcase'&&state.step===9){state.step=10;revealKey();return}
 const s=specs[id];if(state.step>s.step){const jiro=state.exploredAlternate++%2===0;say([{face:jiro?'jiro-talk':'saburo-talk',text:jiro?'要不再去别的地方看看吧。':'这里已经找过了，去看看别的地方吧。'}]);return}
 if(state.step!==s.step||(s.need&&!state.items.includes(s.need))){hint();return}
 if(s.need)consume(s.need);state.step++;renderRoom();
 if(id==='computer'){fadeIn(clue);say([{face:'jiro-talk',text:'啊！这不是你行李箱的照片吗？那个是不是备用钥匙？'},{face:'saburo-think',text:'我想起来了……之前修学旅行的时候一哥把钥匙给我，我放进行李箱的小口袋了。'}],async()=>{state.transition=true;await fadeOut(clue,650);state.transition=false});return}
 if(s.give)gain(s.give);say([{face:s.face,text:s.text}]);
}
function handleExtra(n){const e=state.extras;
 if(n==='蜡烛'){e.candle=true;renderRoom();gain('candle');say([{face:'saburo-think',text:'似乎有什么作用呢……'}]);return}
 if(n==='南瓜灯'||n==='亮灯南瓜灯'){if(e.pumpkin){showCandy(1);return}if(!state.items.includes('candle')){hint();return}consume('candle');e.pumpkin=true;renderRoom();showCandy(1);return}
 if(n.startsWith('骷髅鲍勃公仔')){if(e.bob){showCandy(2);return}if(!state.items.includes('eye')){hint();return}consume('eye');e.bob=true;renderRoom();showCandy(2);return}
 if(n==='彩蛋宝箱'){if(e.candies.includes(3))showCandy(3);else showPassword();return}
 if(flavor[n])say([{face:flavor[n][0],text:flavor[n][1]}]);
}
function modalPanel(id){state.modal=true;const p=element('section',id);p.className='extra-modal';return p}
function artButton(r,label,fn){const b=document.createElement('button');b.className='art-button';localized(b,label,'aria-label');Object.assign(b.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});const im=art(r);im.style.cssText='width:100%;height:100%;position:absolute;inset:0';b.append(im);b.onclick=fn;return b}
function showCandy(number){gameAudio.reward();if(!state.extras.candies.includes(number))state.extras.candies.push(number);const panel=modalPanel('candyModal');panel.append(art(ui('半透明黑色蒙版')),art(ui('彩蛋糖果'+number)));const b=artButton(ui('恭喜你找到彩蛋糖果！'),'恭喜你找到彩蛋糖果！',async()=>{if(b.disabled)return;b.disabled=true;await bounce(b).finished;await fadeOut(panel);panel.remove();state.modal=false});const label=document.createElement('span');localized(label,'恭喜你找到彩蛋糖果！');b.append(label);panel.append(b);fadeIn(panel,500)}
function showPassword(){const panel=modalPanel('passwordModal');for(const r of gameLayout.ui.filter(r=>r.path.startsWith('密码箱界面/')&&!['数字实例','打开宝箱按键'].includes(r.name)))panel.append(art(r));const digits=[0,0,0,0];for(let i=0;i<4;i++){const b=document.createElement('button');b.className='password-digit';b.style.left=[514,746,976,1201][i]+'px';b.textContent='0';localized(b,'密码第{n}位','aria-label',{n:i+1});b.onclick=()=>{digits[i]=(digits[i]+1)%10;b.textContent=digits[i]};panel.append(b)}
 const submit=artButton(ui('打开宝箱按键'),'打开宝箱',async()=>{if(submit.disabled)return;submit.disabled=true;await bounce(submit).finished;await fadeOut(panel);panel.remove();state.modal=false;if(digits.join('')==='4623')showCandy(3);else say([{face:'jiro-confused',text:'咦？密码好像不对。'},{face:'saburo-think',text:'是不是有什么遗漏呢？'}])});const label=document.createElement('span');localized(label,'打开宝箱');submit.append(label);panel.append(submit);
 const close=document.createElement('button');close.className='modal-close';close.textContent='×';localized(close,'关闭密码箱','aria-label');close.onclick=async()=>{if(submit.disabled)return;submit.disabled=true;await fadeOut(panel);panel.remove();state.modal=false};panel.append(close);fadeIn(panel)
}

function revealKey(){gameAudio.reward();bag.hidden=true;state.transition=true;const panel=element('div','keyReveal');for(const [i,n] of ['闪光效果2','闪光效果1','找到钥匙'].entries()){const im=art(ui(n));im.className=i===2?'key-floating':'key-rays rays-'+i;panel.append(im)}const b=document.createElement('button');localized(b,'恭喜找到备用钥匙');panel.append(b);fadeIn(panel,550);b.onclick=async()=>{if(b.disabled)return;b.disabled=true;await hop(b,38,330).finished;await fadeOut(panel,400);panel.remove();state.transition=false;say([{face:'jiro-smile',text:'总之终于找到了，我们快出去和大哥会合吧！'},{face:'saburo-smile',text:'好！'}],success)}}

function success(){bag.hidden=true;held.hidden=true;const panel=element('div','success');const classes={'人物':'ending-characters','气氛符号':'ending-symbols','星星':'ending-stars','糖果':'ending-candy','2399':'ending-number'};gameLayout.ui.filter(r=>r.path.startsWith('游戏成功画面/')).forEach(r=>{const im=art(r,classes[r.name.trim()]||'');im.dataset.layer=r.name.trim();panel.append(im)});fadeIn(panel,1300)}

window.beginGame=()=>{state.active=true;ended=false;window.advanceGameDialogue=advance;$('room').hidden=true;$('fill').hidden=true;$('dialogue').hidden=true;$('dialogueHit').hidden=true;$('next').hidden=true;$('ending').hidden=true;room.hidden=false;room.inert=false;bag.hidden=false;renderRoom()};
// Use actual layered room during the introduction, without enabling its controls.
$('room').hidden=true;$('fill').hidden=true;room.hidden=false;room.inert=true;renderRoom();
})();
