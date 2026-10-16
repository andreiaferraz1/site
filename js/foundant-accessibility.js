(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tree=$('.connection-tree'),svg=$('.precise-connections');
function drawConnections(){if(!tree||!svg)return;const box=tree.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);svg.replaceChildren();const point=(el,bottom)=>{const r=el.getBoundingClientRect();return{x:r.left+r.width/2-box.left,y:(bottom?r.bottom:r.top)-box.top}};function connect(from,to,offset=0){const a=point(from,true),b=point(to,false),mid=a.y+(b.y-a.y)*.5+offset,p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M${a.x} ${a.y} C${a.x} ${mid},${b.x} ${mid},${b.x} ${b.y}`);svg.append(p)}const nodes=$$('.tree-node'),branches=$$('.branches article');if(tree.dataset.relationship!==undefined){const pair=relationshipPairs[Number(tree.dataset.relationship)];connect(nodes[pair[0]],nodes[pair[1]],35);return;}nodes.forEach(n=>connect($('.tree-root'),n));branches.forEach((b,i)=>{connect(nodes[i],b);connect(b,$('.combination-result'))});}
const relationshipPairs=[[0,5],[1,0],[2,3],[3,4],[4,5],[5,0]];
const relationshipStories=[
 ['Human support makes the technology usable.','People help clients apply the tools to their day-to-day work, turning capability into confidence.'],
 ['Sector knowledge makes support relevant.','Understanding the realities of social-good organizations helps support connect advice to the work clients need to do.'],
 ['Community creates opportunities to learn.','Peer conversations make shared needs and useful practices visible, creating opportunities for purposeful listening.'],
 ['Listening turns that learning into decisions.','Feedback helps identify what matters. Intelligence and insight help teams interpret it and decide what to explore next.'],
 ['Intelligence helps clients understand information.','Clear interpretation connects information to useful next steps that purpose-built tools can support.'],
 ['Purpose-built technology makes those insights tangible.','Tools bring insights into everyday workflows. Human support helps clients put them into practice, completing the connection.']
];
const relationshipNodes=$$('.tree-node'),relationshipPanel=$('#relationship-detail'),relationshipReset=$('#connection-reset');
function selectRelationship(index){
 tree.dataset.relationship=String(index);
 const pair=relationshipPairs[index];
 relationshipNodes.forEach((node,i)=>{node.setAttribute('aria-pressed',String(i===index));node.classList.toggle('relationship-active',pair.includes(i));node.classList.toggle('relationship-muted',!pair.includes(i))});
 $('.branches').hidden=true;$('.combination-result').hidden=true;
 relationshipPanel.hidden=false;relationshipReset.hidden=false;
 $('#relationship-pair').textContent=relationshipNodes[pair[0]].textContent.trim()+' → '+relationshipNodes[pair[1]].textContent.trim();
 $('#relationship-title').textContent=relationshipStories[index][0];$('#relationship-copy').textContent=relationshipStories[index][1];drawConnections();
}
relationshipNodes.forEach((node,i)=>node.addEventListener('click',()=>selectRelationship(i)));
relationshipReset.addEventListener('click',()=>{delete tree.dataset.relationship;relationshipNodes.forEach(node=>{node.setAttribute('aria-pressed','false');node.classList.remove('relationship-active','relationship-muted')});$('.branches').hidden=false;$('.combination-result').hidden=false;relationshipPanel.hidden=true;relationshipReset.hidden=true;drawConnections()});
new ResizeObserver(drawConnections).observe(tree);document.fonts.ready.then(drawConnections);
const theme=$('#theme-toggle');theme.addEventListener('click',()=>{const dark=document.body.classList.toggle('dark-theme');theme.setAttribute('aria-pressed',dark);theme.querySelector('.control-label').textContent=dark?'Light mode':'Dark mode';theme.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');theme.title=theme.getAttribute('aria-label')});
const music=$('#music-toggle');
if(music){
 const audio=new Audio(music.dataset.audioSrc);audio.preload='none';audio.loop=true;
 let requested=false;
 function showState(on){music.setAttribute('aria-pressed',String(on));music.querySelector('.control-label').textContent=on?'Music on':'Music off';music.setAttribute('aria-label',on?'Stop music':'Play music');music.title=music.getAttribute('aria-label')}
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

// Loop short, silent excerpts while the story gallery is in view.
(()=>{
 const frames=[...document.querySelectorAll('.story-video iframe')];if(!frames.length)return;
 const script=document.createElement('script');script.src='https://player.vimeo.com/api/player.js';
 script.onload=()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)');frames.forEach(frame=>{
 const player=new Vimeo.Player(frame);let visible=false,seeking=false;
 let videoRatio=16/9;
 function cover(){const box=frame.parentElement.getBoundingClientRect();const width=Math.max(box.width,box.height*videoRatio);const height=width/videoRatio;Object.assign(frame.style,{width:Math.ceil(width+2)+'px',height:Math.ceil(height+2)+'px',left:'50%',top:'50%',transform:'translate(-50%,-50%)'});}
 new ResizeObserver(cover).observe(frame.parentElement);cover();
 Promise.all([player.getVideoWidth(),player.getVideoHeight()]).then(([w,h])=>{if(w&&h)videoRatio=w/h;cover()}).catch(()=>{});

 const sync=()=>{if(visible&&!document.body.classList.contains('motion-paused'))player.play().catch(()=>{});else player.pause().catch(()=>{})};
 player.ready().then(()=>{player.setMuted(true);player.setCurrentTime(8).catch(()=>{});sync()}).catch(()=>{});
 player.on('timeupdate',event=>{if(event.seconds>=20&&!seeking){seeking=true;player.setCurrentTime(8).catch(()=>{}).finally(()=>{seeking=false})}});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.1}).observe(frame.parentElement);
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});reduced.addEventListener('change',sync);document.addEventListener('pointerdown',sync,{passive:true});
 });};document.head.append(script);
})();

// Touch equivalent of hover: first tap previews; second tap opens the full story.
(()=>{
 const cards=[...document.querySelectorAll('.story-video')];
 cards.forEach(card=>{
  let touch=false;
  card.addEventListener('pointerdown',event=>{touch=event.pointerType==='touch'||event.pointerType==='pen'});
  card.addEventListener('click',event=>{
   if(!touch)return;
   if(!card.classList.contains('preview-open')){
    event.preventDefault();cards.forEach(other=>other.classList.remove('preview-open'));
    card.classList.add('preview-open');
   }
   touch=false;
  });
 });
 document.addEventListener('pointerdown',event=>{if(!event.target.closest('.story-video'))cards.forEach(card=>card.classList.remove('preview-open'))});
 // Retry muted native video playback after the first touch when autoplay is restricted.
 document.addEventListener('pointerdown',()=>{
  if(document.body.classList.contains('motion-paused') )return;
  document.querySelectorAll('video[autoplay][muted]').forEach(video=>video.play().catch(()=>{}));
 },{once:true,passive:true});
})();

// Retain the animated journey connectors in the stacked mobile layout.
(()=>{
 const map=document.querySelector('.journey-map'),svg=map?.querySelector(':scope > svg');if(!svg)return;
 const path=svg.querySelector('path'),original=path.getAttribute('d'),viewBox=svg.getAttribute('viewBox');
 const mobile=matchMedia('(max-width:760px)');
 function draw(){
  if(!mobile.matches){svg.setAttribute('viewBox',viewBox);path.setAttribute('d',original);return}
  const box=map.getBoundingClientRect();if(!box.width)return;
  svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
  const nodes=[...map.querySelectorAll('[data-stage]')];
  const point=(node,bottom)=>{const r=node.getBoundingClientRect();return [r.left+r.width/2-box.left,(bottom?r.bottom:r.top)-box.top]};
  const edge=(from,to)=>{const a=point(from,true),b=point(to,false),mid=(a[1]+b[1])/2;return `M${a[0]} ${a[1]} C${a[0]} ${mid},${b[0]} ${mid},${b[0]} ${b[1]}`};
  path.setAttribute('d',edge(nodes[0],nodes[1])+edge(nodes[0],nodes[2])+edge(nodes[1],nodes[3])+edge(nodes[2],nodes[3]));
 }
 new ResizeObserver(draw).observe(map);document.fonts.ready.then(draw);mobile.addEventListener('change',draw);
 const top=document.querySelector('.foundant-back-top');
 top?.addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
})();

// Brand motion disclosure: keyboard/touch controls and silent inline loops.
(()=>{
 const panel=document.getElementById('brand-in-motion');
 if(!panel)return;
 const videos=[...panel.querySelectorAll('[data-brand-loop]')];
 const visible=new Set();
 const sync=()=>videos.forEach(video=>{
  const paused=document.body.classList.contains('motion-paused');
  if(panel.open&&visible.has(video)&&!paused){video.muted=true;video.play().catch(()=>{});}else video.pause();
 });
 panel.addEventListener('toggle',sync);
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});sync();},{threshold:.05});
 videos.forEach(video=>{video.muted=true;observer.observe(video);});
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(video=>video.pause());else sync();});
 panel.addEventListener('pointerdown',sync,{passive:true});
})();
