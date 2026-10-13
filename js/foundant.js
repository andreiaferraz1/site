(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reduced.matches;
const dimensions=[
['Human Support & Service','People who help clients succeed—not only resolve tickets.'],
['Sector-Aligned Knowledge','Guidance grounded in the realities of social-good organizations.'],
['Community Building & Engagement','Peer connection and shared learning that extend client capacity.'],
['Active, Purposeful Listening','Feedback that leads to visible decisions and closes the loop.'],
['Intelligence & Insight','Information translated into useful, trusted understanding.'],
['Purpose-Built Technology','Tools designed around the work clients actually need to do.']];
function setMotion(paused){motionPaused=paused;document.body.classList.toggle('motion-paused',paused);$('.motion-toggle').setAttribute('aria-pressed',String(paused));$('.motion-toggle').innerHTML=paused?'Resume motion <span>▷</span>':'Pause motion <span>Ⅱ</span>';$$('video').forEach(v=>{if(paused)v.pause();else v.play().catch(()=>{});});if(paused)stopJourney();}
$('.motion-toggle')?.addEventListener('click',()=>setMotion(!motionPaused));
reduced.addEventListener('change',e=>setMotion(e.matches));
$$('[data-dimension]').forEach(button=>button.addEventListener('click',()=>{
const i=Number(button.dataset.dimension);$('.orbit-stage').classList.add('selected');
$$('[data-dimension]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.dimension)===i)));
$('#dimension-count').textContent=`0${i+1} / SIX DIMENSIONS`;
$('#dimension-title').textContent=dimensions[i][0];$('#dimension-description').textContent=dimensions[i][1];
$('#dimension-symbol').replaceChildren($(`.dimension-index [data-dimension="${i}"] svg`).cloneNode(true));if($('#orbit-resume'))$('#orbit-resume').hidden=false;if(innerWidth<760) $('.dimension-detail').scrollIntoView({behavior:motionPaused?'instant':'smooth',block:'center'});
}));
$('#orbit-resume')?.addEventListener('click',()=>{$('.orbit-stage').classList.remove('selected');$$('[data-dimension]').forEach(b=>b.setAttribute('aria-pressed','false'));$('#orbit-resume').hidden=true;$('#dimension-count').textContent='EXPLORE THE CONNECTION';});
$$('.word-reveal').forEach(el=>{let index=0;const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{const frag=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){frag.append(document.createTextNode(word));return;}const span=document.createElement('span');span.className='word';span.style.setProperty('--word',index++);span.textContent=word;frag.append(span)});node.replaceWith(frag);});});
document.body.classList.add('js-motion');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');revealObserver.unobserve(e.target)}}),{threshold:.2});$$('.reveal').forEach(e=>revealObserver.observe(e));
const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;countObserver.unobserve(e.target);if(motionPaused)return;const final=e.target.dataset.count,target=Number(final.replace(/\D/g,'')),suffix=final.endsWith('%')?'%':final.endsWith('+')?'+':'',start=performance.now();function tick(now){let t=Math.min((now-start)/1400,1);e.target.textContent=Math.round(target*(1-Math.pow(1-t,3))).toLocaleString('en-US')+suffix;if(t<1&&!motionPaused)requestAnimationFrame(tick);else e.target.textContent=final}requestAnimationFrame(tick)}),{threshold:.7});$$('[data-count]').forEach(el=>countObserver.observe(el));
const stages=[
['FOUNDANT / THE FIRST FORK','My profile points to one product. My requirement points to another.','GivingData is associated with family foundations, CRM and multi-year planning. SmartSimple highlights multiple currencies and sophisticated operations. This visitor recognizes their needs in both descriptions.'],
['SMARTSIMPLE / A CHANGE OF CONTEXT','I left a specific need. I arrived at a broad platform.','The Foundant link opens SmartSimple Cloud: automation, collaboration and configurability. To investigate grants management, the visitor finds a separate entry in the menu.'],
['GIVINGDATA / THE OVERLAP APPEARS','The capability that led me to SmartSimple is also in GivingData Enterprise.','The product page lists multi-currency requests and payments in Enterprise. The option aligned with the foundation’s profile also meets this requirement, and the choice remains open.'],
['THE DECISION / THE MISSING CRITERION','GivingData Enterprise or SmartSimple? I need a criterion.','Comparison charts exist on product sites, with different criteria. The visitor crosses sites or carries the question into a sales conversation.']];
let current=0,journeyTimer=null;
function renderJourney(i){current=i;$('#journey-count').textContent=`0${i+1} / 04`;$('#journey-number').textContent=`0${i+1}`;['label','title','body'].forEach((key,n)=>$('#journey-'+key).textContent=stages[i][n]);$$('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===i)));$('#journey-prev').disabled=i===0;$('#journey-next').disabled=i===3;}
function stopJourney(){clearInterval(journeyTimer);journeyTimer=null;$('#journey-play').textContent='Play journey ▷';$('#journey-play').setAttribute('aria-pressed','false')}
$$('[data-stage]').forEach(b=>b.addEventListener('click',()=>{stopJourney();renderJourney(Number(b.dataset.stage))}));
$('#journey-prev').addEventListener('click',()=>{stopJourney();renderJourney(Math.max(0,current-1))});
$('#journey-next').addEventListener('click',()=>{stopJourney();renderJourney(Math.min(3,current+1))});
$('#journey-play').addEventListener('click',()=>{if(journeyTimer){stopJourney();return;}renderJourney(0);$('#journey-play').textContent='Pause journey Ⅱ';$('#journey-play').setAttribute('aria-pressed','true');journeyTimer=setInterval(()=>{if(current===3){stopJourney();return;}renderJourney(current+1)},6500)});
let q=0;const questions=$$('.question-list p');questions[0].classList.add('current');setInterval(()=>{if(motionPaused||document.hidden)return;questions[q].classList.remove('current');q=(q+1)%questions.length;questions[q].classList.add('current')},2600);
const links=$$('.site-header nav a');const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})})},{rootMargin:'-10% 0px -65% 0px'});['dimensions','stands-out','opportunities','prioritization','reflection'].forEach(id=>navObserver.observe(document.getElementById(id)));
let scrollPending=false;window.addEventListener('scroll',()=>{if(scrollPending)return;scrollPending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.width=(max>0?scrollY/max*100:0)+'%';scrollPending=false})},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopJourney()});
renderJourney(0);setMotion(motionPaused);
})();
