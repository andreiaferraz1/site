const {chromium}=require('../.foundant-build/node_modules/playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file://'+path.join(__dirname,'index.html'));await page.evaluate(()=>window.ready);
 await page.evaluate(()=>setTime(3.4));
 await page.locator('#c').screenshot({path:path.join(__dirname,'preview-3.png')});
 const data=await page.evaluate(()=>exportMotion(2));
 fs.writeFileSync(path.join(__dirname,'03-elasticidade.mp4'),Buffer.from(data,'base64'));
 const metadata=await page.evaluate(src=>new Promise((resolve,reject)=>{const v=document.createElement('video');v.onloadedmetadata=()=>resolve({width:v.videoWidth,height:v.videoHeight,duration:v.duration});v.onerror=()=>reject(Error('Invalid video'));v.src=src}),'data:video/mp4;base64,'+data);
 console.log(JSON.stringify({errors,...metadata}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
