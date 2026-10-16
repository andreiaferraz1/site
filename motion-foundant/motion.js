/* Foundant kinetic studies. Deterministic timeline, seconds; 1440 × 900. */
const W=1440,H=900,LIME='#a4d900',INK='#12170f',CREAM='#f2f0e4';
const canvases=[...document.querySelectorAll('canvas')];
const photos=assetData.map(src=>Object.assign(new Image(),{src}));
const clamp=x=>Math.min(1,Math.max(0,x));
const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10)};
const mix=(a,b,t)=>a+(b-a)*t;
const ramp=(t,a,b)=>ease((t-a)/(b-a));
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,Math.max(.01,w),Math.max(.01,h),Math.max(0,Math.min(r,w/2,h/2)));}
function box(g,x,y,w,h,r,c){g.fillStyle=c;rr(g,x,y,w,h,r);g.fill();}
function dot(g,x,y,r,c){g.beginPath();g.arc(x,y,Math.max(.01,r),0,Math.PI*2);g.fillStyle=c;g.fill();}
// Normalized from the supplied icon, preserving bar/dot spacing and asymmetry.
function mark(g,x,y,s,c){box(g,x+.202*s,y+.191*s,.596*s,.167*s,.084*s,c);dot(g,x+.315*s,y+.500*s,.084*s,c);dot(g,x+.544*s,y+.500*s,.084*s,c);dot(g,x+.315*s,y+.727*s,.084*s,c);}
function brand(g,x,y,c,scale=1){g.save();g.translate(x,y);g.scale(scale,scale);mark(g,0,0,86,c);g.fillStyle=c;g.font='500 38px Arial';g.fillText('Foundant',89,57);g.restore();}
function cover(g,img,x,y,w,h,zoom=1,fx=.5,fy=.5){const s=Math.max(w/img.width,h/img.height)*zoom;g.drawImage(img,x-(img.width*s-w)*fx,y-(img.height*s-h)*fy,img.width*s,img.height*s);}
function windowPhoto(g,img,x,y,w,h,r,z=1,fx=.5,fy=.5){g.save();rr(g,x,y,w,h,r);g.clip();cover(g,img,x,y,w,h,z,fx,fy);g.restore();}
function phase(t){return ramp(t,.65,2.45)*(1-ramp(t,6.15,7.65));}
function bg(g,c){g.fillStyle=c;g.fillRect(0,0,W,H);}
function connection(g,t){
 bg(g,LIME);const p=phase(t),b=ramp(t,1.8,2.8)*(1-ramp(t,5.9,6.8));
 // The pill grows out of the logo into the photograph, with a soft travelling crop.
 const x=mix(454,475,p),y=mix(296,95,p),w=mix(532,900,p),h=mix(150,710,p);
 box(g,x,y,w,h,mix(75,48,p),INK);
 g.save();g.globalAlpha=ramp(t,1.15,1.9)*(1-ramp(t,6.35,7.0));
 windowPhoto(g,photos[0],x,y,w,h,mix(75,48,p),1+.025*Math.sin(Math.PI*t/8),.53,.43);g.restore();
 // Three loose circles retain the original mark's asymmetric arrangement.
 const k=Math.sin(t*2.1),r=mix(75,83,p);
 dot(g,mix(555,154,p),mix(572,430+k*12,p),r,INK);
 dot(g,mix(760,345,p),mix(572,430-k*12,p),r,INK);
 dot(g,mix(555,154,p),mix(775,625,p),r,INK);
 g.save();g.globalAlpha=b;brand(g,65,58,INK,.9);
 box(g,66,255,334+20*Math.sin(t*1.4),86,43,INK);
 g.fillStyle=INK;g.font='500 20px Arial';g.fillText('People make the difference.',70,805);g.restore();
}
function orbit(g,t){
 bg(g,CREAM);const p=phase(t),b=ramp(t,1.8,2.7)*(1-ramp(t,6,6.9));
 const a=t*Math.PI*.7;
 // A circular aperture stretches into a panorama without cropping its subjects.
 const x=mix(580,60,p),y=mix(310,219,p),w=mix(280,1320,p),h=mix(280,462,p);
 box(g,x,y,w,h,h/2,LIME);
 g.save();g.globalAlpha=ramp(t,1.05,1.75)*(1-ramp(t,6.4,7.1));windowPhoto(g,photos[1],x,y,w,h,mix(140,76,p),1+.014*Math.sin(Math.PI*t/8));g.restore();
 g.save();g.globalAlpha=b;g.strokeStyle='#c3cab1';g.lineWidth=2;g.beginPath();g.ellipse(720,450,665,325,0,0,Math.PI*2);g.stroke();brand(g,65,49,INK,.9);g.restore();
 for(let i=0;i<3;i++){
  const theta=a+i*Math.PI*2/3;const ringX=720+640*Math.cos(theta),ringY=450+315*Math.sin(theta);
  const sx=[618,824,618][i],sy=[540,540,743][i];
  dot(g,mix(sx,ringX,p),mix(sy,ringY,p),mix(75,27,p),i===1?INK:LIME);
 }
 g.save();g.globalAlpha=1-p;box(g,517,265,532,150,75,INK);g.restore();
 g.save();g.globalAlpha=b;box(g,1110,92,213,42,21,LIME);g.fillStyle=INK;g.font='500 20px Arial';g.fillText('Better, together.',67,806);g.restore();
}
function elastic(g,t){
 bg(g,INK);const p=phase(t),b=ramp(t,1.9,2.8)*(1-ramp(t,5.9,6.9));
 // Independent pill masks open in a stagger, then merge into a single portrait.
 const x=65,y=100,w=1030,h=700;
 g.save();g.beginPath();
 for(let i=0;i<4;i++){
  const q=ramp(t,.7+i*.12,2.25+i*.12)*(1-ramp(t,6.05+i*.1,7.3+i*.1));
  const hh=mix(4,190,q),ww=mix(0,w,q);
  g.roundRect(x+(w-ww)/2,y+i*175+(175-hh)/2,Math.max(.01,ww),hh,mix(2,36,q));
 }
 g.clip();cover(g,photos[2],x,y,w,h,1+.025*Math.sin(Math.PI*t/8),.62,.42);g.restore();
 const iconSize=86*.88;
 const firstReveal=ramp(t,.7,2.25)*(1-ramp(t,6.05,7.3));
 const photoTop=y+(175-mix(4,190,firstReveal))/2;
 g.save();g.globalAlpha=b;mark(g,1130-.202*iconSize,photoTop-.191*iconSize,iconSize,CREAM);g.restore();
 const side=1215, pulse=Math.sin((t-2)*2.8)*9;
 box(g,mix(454,1130,p),mix(296,240,p),mix(532,235,p),mix(150,91,p),75,LIME);
 dot(g,mix(555,1175,p),mix(572,435+pulse,p),mix(75,46,p),LIME);
 dot(g,mix(760,1310,p),mix(572,435-pulse,p),mix(75,46,p),LIME);
 dot(g,mix(555,1175,p),mix(775,570,p),mix(75,46,p),LIME);
 g.save();g.globalAlpha=b;box(g,1130,698,235,43,22,CREAM);box(g,1130,760,145+40*Math.sin(t*1.8),43,22,LIME);g.restore();
}
const renderers=[connection,orbit,elastic];
window.drawMotion=(i,t,target=canvases[i])=>{const g=target.getContext('2d');g.save();g.scale(target.width/W,target.height/H);renderers[i](g,((t%8)+8)%8);g.restore()};
let running=!matchMedia('(prefers-reduced-motion: reduce)').matches,current=0,speed=1,previous=0;
const play=document.getElementById('play'),seek=document.getElementById('seek'),out=document.getElementById('time');
function label(){play.textContent=running?'Pausar':'Reproduzir';play.setAttribute('aria-pressed',String(running));}
play.onclick=()=>{running=!running;label()};document.getElementById('restart').onclick=()=>{current=0;running=true;label()};
document.getElementById('speed').onchange=e=>speed=Number(e.target.value);
seek.oninput=e=>{current=Number(e.target.value);running=false;label()};
window.setTime=t=>{running=false;current=t;label();canvases.forEach((_,i)=>drawMotion(i,t))};
window.ready=Promise.all(photos.map(img=>img.decode())).then(()=>{label();function tick(now){if(running&&previous)current=(current+Math.min((now-previous)/1000,.1)*speed)%8;previous=now;canvases.forEach((_,i)=>drawMotion(i,current));seek.value=current;out.textContent=current.toFixed(1)+' s';requestAnimationFrame(tick)}requestAnimationFrame(tick)});
window.exportMotion=async i=>{
 await window.ready;const canvas=document.createElement('canvas');canvas.width=1440;canvas.height=900;
 const stream=canvas.captureStream(30);const mime='video/mp4;codecs=avc1.42001E';
 if(!MediaRecorder.isTypeSupported(mime))throw Error('Exportação H.264 indisponível neste navegador.');
 const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:9000000}),chunks=[];
 const done=new Promise(resolve=>{recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=async()=>{stream.getTracks().forEach(x=>x.stop());const blob=new Blob(chunks,{type:'video/mp4'});const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob)}});
 drawMotion(i,0,canvas);recorder.start();const start=performance.now();
 await new Promise(resolve=>{function frame(){const elapsed=(performance.now()-start)/1000;drawMotion(i,Math.min(elapsed,7.999),canvas);if(elapsed<8)requestAnimationFrame(frame);else{recorder.stop();resolve()}}requestAnimationFrame(frame)});return done;
};
