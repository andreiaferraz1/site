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
