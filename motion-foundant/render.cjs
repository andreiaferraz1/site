const {chromium}=require('../.foundant-build/node_modules/playwright');
const fs=require('fs');const path=require('path');
(async()=>{
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('file://'+path.join(__dirname,'index.html'));await page.evaluate(()=>window.ready);
await page.evaluate(()=>setTime(3.4));
for(let i=0;i<3;i++)await page.locator('canvas').nth(i).screenshot({path:path.join(__dirname,`preview-${i+1}.png`)});
await page.getByRole('button',{name:'Reproduzir',exact:true}).click();await page.waitForTimeout(250);await page.getByRole('button',{name:'Pausar',exact:true}).click();
if(Number(await page.locator('#seek').inputValue())<=3.4)throw Error('Timeline did not advance');
await page.setViewportSize({width:390,height:844});
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
await page.screenshot({path:path.join(__dirname,'preview-mobile.png'),fullPage:true});
const names=['01-conexao','02-orbita','03-elasticidade'];
for(let i=0;i<3;i++){const data=await page.evaluate(i=>exportMotion(i),i);fs.writeFileSync(path.join(__dirname,names[i]+'.mp4'),Buffer.from(data,'base64'));console.log('Exported '+names[i]);}
const checks=[];
for(const name of names){const src='data:video/mp4;base64,'+fs.readFileSync(path.join(__dirname,name+'.mp4')).toString('base64');checks.push(await page.evaluate(src=>new Promise((resolve,reject)=>{const v=document.createElement('video');v.onloadedmetadata=()=>resolve({width:v.videoWidth,height:v.videoHeight,duration:v.duration});v.onerror=()=>reject(Error('Invalid video'));v.src=src}),src));}
fs.writeFileSync(path.join(__dirname,'validation.json'),JSON.stringify({errors,videos:checks,mobileOverflow:false,playPause:true},null,2));
console.log(JSON.stringify({errors,videos:checks}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
