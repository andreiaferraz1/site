(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tree=$('.connection-tree'),svg=$('.precise-connections');
function drawConnections(){if(!tree||!svg)return;const box=tree.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);svg.replaceChildren();const point=(el,bottom)=>{const r=el.getBoundingClientRect();return{x:r.left+r.width/2-box.left,y:(bottom?r.bottom:r.top)-box.top}};function connect(from,to,offset=0){const a=point(from,true),b=point(to,false),mid=a.y+(b.y-a.y)*.5+offset,p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M${a.x} ${a.y} C${a.x} ${mid},${b.x} ${mid},${b.x} ${b.y}`);svg.append(p)}const nodes=$$('.tree-node'),branches=$$('.branches article');nodes.forEach(n=>connect($('.tree-root'),n));branches.forEach((b,i)=>{connect(nodes[i],b);connect(b,$('.combination-result'))});}
new ResizeObserver(drawConnections).observe(tree);document.fonts.ready.then(drawConnections);
const theme=$('#theme-toggle');theme.addEventListener('click',()=>{const dark=document.body.classList.toggle('dark-theme');theme.setAttribute('aria-pressed',dark);theme.textContent=dark?'Light mode':'Dark mode'});
const music=$('#music-toggle');
if(music){
 const audio=new Audio(music.dataset.audioSrc);audio.preload='none';audio.loop=true;
 let requested=false;
 function showState(on){music.setAttribute('aria-pressed',String(on));music.textContent=on?'Music on ♫':'Music off ♫'}
 function stopMusic(){requested=false;audio.pause();audio.currentTime=0;showState(false)}
 music.addEventListener('click',async()=>{
  if(requested){stopMusic();return}
  requested=true;showState(true);
  try{await audio.play();if(!requested)audio.pause()}
  catch{requested=false;showState(false)}
 });
 audio.addEventListener('error',()=>{requested=false;showState(false)});
 window.addEventListener('pagehide',stopMusic);
}
})();
