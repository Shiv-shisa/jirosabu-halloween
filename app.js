const $=id=>document.getElementById(id);let index=0,lang=document.documentElement.lang==='ja'?'ja':'zh-Hans',busy=false,ended=false;let current=null;let typingTimer=null,letters=[],letterIndex=0;
for(const id of ['fill','room','dialogue','next']){const el=$(id),r=layout[id];Object.assign(el.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});if(id!=='next')el.src='assets/'+id+'.webp'}
for(const id of Object.keys(layout).filter(n=>n.startsWith('jiro-')||n.startsWith('saburo-'))){const im=new Image();im.id=id;im.src='assets/'+id+'.webp';localized(im,id.startsWith('jiro')?'二郎':'三郎','alt');const r=layout[id];Object.assign(im.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});$('portraits').append(im)}
const safeArea=document.createElement('div');safeArea.id='safeArea';document.body.append(safeArea);
function fit(){
 const viewport=window.visualViewport,css=getComputedStyle(safeArea);
 const insets=Object.fromEntries(['left','right','top','bottom'].map(side=>[side,parseFloat(css.getPropertyValue('padding-'+side))||0]));
 const view=gameViewportLayout(viewport?.width||innerWidth,viewport?.height||innerHeight,isMobileGameDevice(),insets);
 const stage=$('stage');stage.style.left=(view.x+(viewport?.offsetLeft||0))+'px';stage.style.top=(view.y+(viewport?.offsetTop||0))+'px';
 stage.style.transform=`translate(-50%, -50%) rotate(${view.rotated?90:0}deg) scale(${view.scale})`;
 document.body.dataset.rotated=String(view.rotated);$('rotate').hidden=!view.rotated;
}
addEventListener('resize',fit);addEventListener('orientationchange',fit);
window.visualViewport?.addEventListener('resize',fit);window.visualViewport?.addEventListener('scroll',fit);fit();
function bounce(el){
 el.getAnimations().forEach(a=>a.cancel());
 const icon=el.id==='next'?el.querySelector('img'):null;
 if(icon){icon.style.animation='none';icon.style.opacity='1'}
 const isArrow=el.id==='next';
 const motion=el.animate([{transform:'scale(1)'},{transform:isArrow?'scale(.6)':'scale(.72)',offset:.26},{transform:isArrow?'scale(1.4)':'scale(1.22)',offset:.62},{transform:isArrow?'scale(.94)':'scale(.97)',offset:.83},{transform:'scale(1)'}],{duration:isArrow?480:380,easing:'ease-out'});
 motion.onfinish=()=>{if(icon){icon.style.animation='';icon.style.opacity=''}};
 return motion;
}
function render(){document.documentElement.lang=lang;refreshGameLanguage();document.body.dataset.lang=lang;const u=uiTexts[lang];clearTimeout(typingTimer);typingTimer=null;$('text').textContent=(window.gameLine?tr(window.gameLine.text):dialogueSets[lang][index]);$('text').classList.toggle('sms',!window.gameLine&&index===6);$('dialogueHit').setAttribute('aria-label',u.next);$('language').setAttribute('aria-label',u.language);$('rotateText').textContent=u.rotate;$('endLabel').textContent=u.end;$('replay').textContent=u.replay;document.querySelectorAll('[data-lang]').forEach(b=>{if(b.tagName==='BUTTON')b.classList.toggle('selected',b.dataset.lang===lang)});fitText();startTyping();}
async function show(){busy=true;const next=window.gameLine?window.gameLine.face:expressions[index];if(current&&current!==next){$(current).classList.remove('active');await new Promise(r=>setTimeout(r,320))}render();if(next){const portrait=$(next);portrait.classList.add('active');portrait.getAnimations().forEach(a=>a.cancel());portrait.animate([{opacity:0,transform:'scale(1)',offset:0,easing:'cubic-bezier(.16,1,.3,1)'},{opacity:1,transform:'scale(1.065)',offset:.34,easing:'cubic-bezier(.32,0,.25,1)'},{opacity:1,transform:'scale(1)',offset:1}],{duration:480,easing:'linear'});}current=next;busy=false;}
$('dialogueHit').onclick=()=>{if(ended||!$('languagePanel').hidden)return;bounce($('next'));if(busy)return;if(typingTimer!==null){finishTyping();return}if(window.advanceGameDialogue){window.advanceGameDialogue();return}if(index<expressions.length-1){index++;show()}else{if(window.beginGame){ended=true;clearTimeout(typingTimer);if(current)$(current).classList.remove('active');current=null;Promise.all(['dialogue','dialogueHit','next'].map(hideDialoguePart)).then(()=>window.beginGame());return}ended=true;if(current)$(current).classList.remove('active');current=null;$('dialogueHit').hidden=true;$('next').hidden=true;if(window.beginGame)window.beginGame();else $('ending').hidden=false}};
$('language').onclick=()=>{bounce($('language'));$('languagePanel').hidden=!$('languagePanel').hidden};document.querySelectorAll('button[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;render();$('languagePanel').hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('languagePanel').hidden=true;if((e.key===' '||e.key==='ArrowRight')&&e.target===document.body){e.preventDefault();$('dialogueHit').click()}});
localized($('stage'),'万圣节开场对话','aria-label');localized($('room'),'万圣节布置的房间','alt');localized($('languagePanel'),'语言','aria-label');
$('replay').onclick=()=>{index=0;ended=false;$('ending').hidden=true;$('dialogueHit').hidden=false;$('next').hidden=false;show()};show();

function fitText(){const t=$('text');t.style.fontSize='';let size=parseFloat(getComputedStyle(t).fontSize);while(t.scrollHeight>t.clientHeight+1&&size>26){size--;t.style.fontSize=size+'px'}}
document.fonts.ready.then(fitText);

function startTyping(){
 const t=$('text'),content=t.textContent;
 const parts=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(lang,{granularity:'grapheme'}).segment(content)].map(x=>x.segment):Array.from(content);
 t.replaceChildren();t.setAttribute('aria-label',content);letters=parts.map(c=>{const el=document.createElement('span');el.textContent=c;el.style.visibility='hidden';el.setAttribute('aria-hidden','true');t.append(el);return el});letterIndex=0;
 function tick(){if(letterIndex>=letters.length){typingTimer=null;return}const el=letters[letterIndex++];el.style.visibility='visible';const pause=/[。！？!?…]/.test(el.textContent)?210:/[，、,]/.test(el.textContent)?115:48;typingTimer=setTimeout(tick,pause)}
 typingTimer=setTimeout(tick,48);
}
function finishTyping(){clearTimeout(typingTimer);typingTimer=null;letters.forEach(el=>el.style.visibility='visible');letterIndex=letters.length}



async function hideDialoguePart(id){const el=$(id);const motion=el.animate([{opacity:1},{opacity:0}],{duration:380,easing:'ease-in-out',fill:'forwards'});await motion.finished;el.hidden=true;motion.cancel()}
