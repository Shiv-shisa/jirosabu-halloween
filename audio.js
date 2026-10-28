// Embedded MP3s allow Web Audio gain control even when opening index.html offline.
const gameAudio=(()=>{
 let context,ready,music,musicGain,unlocked=false;
 const buffers={};
 function init(){
  if(ready)return ready;
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext)return Promise.resolve(false);
  context=new AudioContext();
  musicGain=context.createGain();musicGain.gain.value=.22;musicGain.connect(context.destination);
  ready=Promise.all(Object.entries(gameAudioData).map(async([name,data])=>{
   const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));
   buffers[name]=await context.decodeAudioData(bytes.buffer);
  })).then(()=>true).catch(()=>false);
  return ready;
 }
 async function unlock(){
  const loading=init();
  if(context&&context.state!=='running')await context.resume().catch(()=>{});
  if(!await loading)return false;
  unlocked=true;
  if(!music){music=context.createBufferSource();music.buffer=buffers.bgm;music.loop=true;music.connect(musicGain);music.start();}
  return true;
 }
 async function play(name){
  if(!await unlock()||document.hidden)return;
  const source=context.createBufferSource(),gain=context.createGain();
  source.buffer=buffers[name];gain.gain.value=name==='sparkling'?.95:.8;
  source.connect(gain);gain.connect(context.destination);source.start();
  source.onended=()=>{source.disconnect();gain.disconnect()};
  // Briefly lower the music underneath rewards, without cutting it off.
  if(name==='sparkling'){
   const now=context.currentTime;
   musicGain.gain.cancelScheduledValues(now);musicGain.gain.setValueAtTime(musicGain.gain.value,now);
   musicGain.gain.linearRampToValueAtTime(.12,now+.08);
   musicGain.gain.setValueAtTime(.12,now+source.buffer.duration);
   musicGain.gain.linearRampToValueAtTime(.22,now+source.buffer.duration+.35);
  }
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(button&&!button.disabled&&!button.closest('[inert]')){
   const state=window.gameState;
   if(button.closest('#gameRoom')&&state&&(state.transition||state.dialogue||state.modal))return;
   void play('bubble');
  }else void unlock();
 },true);
 document.addEventListener('visibilitychange',()=>{
  if(!context||!unlocked)return;
  if(document.hidden)void context.suspend();else void context.resume().catch(()=>{});
 });
 // Try audible playback as soon as the page loads; a gesture resumes it if blocked.
 void unlock().catch(()=>{});
 document.addEventListener('pointerdown',()=>{void unlock().catch(()=>{})},{capture:true});
 document.addEventListener('keydown',()=>{void unlock().catch(()=>{})},{capture:true});
 return {reward:()=>{void play('sparkling')}};
})();
