import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer';
const base = process.env.BLOG_QA_BASE_URL;
if (!base || !['127.0.0.1','localhost'].includes(new URL(base).hostname)) throw new Error('Explicit localhost candidate required');
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
const optional = url => /googletagmanager\.com|google-analytics\.com|mc\.yandex\./.test(url);
const browser = await puppeteer.launch({headless:true});
const report = { base, fixture:'Only gotoflow.io is intercepted to the local candidate. Fresh isolated browser contexts; real vendor resources and collection endpoints.', cases:[], accountReceive:'BLOCKED: reporting account access unavailable' };
const cookieRecord = optional => encodeURIComponent(JSON.stringify({version:2,necessary:true,optional,updatedAt:new Date().toISOString()}));
const gaViews = item => item.requests.flatMap(r => {
 if(!r.url.includes('/g/collect')) return [];
 const query=new URL(r.url).searchParams;
 return (r.body?r.body.split('\n'):['']).map(line=>new URLSearchParams(line)).filter(p=>(p.get('en')||query.get('en'))==='page_view').map(p=>({url:p.get('dl')||query.get('dl'),status:r.status,failure:r.failure}));
});
const ymViews = item => {
 const views=new Map();
 for(const r of item.requests) {
  const url=new URL(r.url),info=url.searchParams.get('browser-info')||'';
  // With defer:true, count explicit artificial hit payloads (pv:1 + ar:1).
  // Deferred init is not a counted view; a 302 and its terminal request are one hit.
  if(!url.pathname.startsWith('/watch/108772587')||!/(?:^|:)pv:1(?=:|$)/.test(info)||!/(?:^|:)ar:1(?=:|$)/.test(info)) continue;
  views.set(info+'|'+url.searchParams.get('page-url'),r);
 }
 return [...views.values()];
};
async function setup(name) {
 const ctx=await browser.createBrowserContext(),page=await ctx.newPage();const item={name,requests:[],errors:[]};report.cases.push(item);const requests=new Map();
 await page.setRequestInterception(true);
 page.on('request',async r=>{
  if(optional(r.url())) {const request={url:r.url(),body:r.postData()||'',method:r.method()};item.requests.push(request);requests.set(r,request);}
  try {
   const url=new URL(r.url());
   if(url.hostname==='gotoflow.io') {const response=await fetch(base+url.pathname+url.search);await r.respond({status:response.status,contentType:response.headers.get('content-type')||'text/html',body:Buffer.from(await response.arrayBuffer())});}
   else if(url.hostname==='app.gotoflow.io') throw new Error('App outside this verification scope');
   else await r.continue();
  }catch(e){item.errors.push(e.message);await r.abort().catch(()=>{});}
 });
 page.on('response',r=>{if(requests.has(r.request()))requests.get(r.request()).status=r.status();});
 page.on('requestfailed',r=>{if(requests.has(r))requests.get(r).failure=r.failure()?.errorText;});
 page.on('pageerror',e=>item.errors.push(e.message));
 return {ctx,page,item};
}
async function state(page) {return page.evaluate(()=>({choice:window.gtfAnalytics.readChoice(),saved:document.cookie.includes('gtf_consent_v2='),campaign:sessionStorage.getItem('gtf_campaign_v1'),url:location.href}));}
async function settleViews(item, expected) {
 for(let i=0;i<30;i++) {if(gaViews(item).length>=expected && ymViews(item).length>=expected && gaViews(item).every(r=>r.status)) break;await delay(500);}
}
try {
 for(const lang of ['en','ru']) {
  const {ctx,page,item}=await setup(lang+'-accept-repeat-spa-withdraw');
  const route=lang==='ru'?'/ru':'/ai-content-generator';
  const tags='utm_source=yandex&utm_campaign=1234567890123&utm_id=9876543210&yclid=1234567890123456789&ysclid=diagnostic_search&gclid=Diagnostic_123-abc&token=secret&email=user%40example.test';
  await page.goto('https://gotoflow.io'+route+'?'+tags,{waitUntil:'networkidle2'});await delay(1800);
  assert.equal(item.requests.length,0,'no-choice network');assert.equal((await state(page)).choice,null);
  await page.click(lang==='ru'?'#cookie-accept-ru':'#cookie-accept-all');await settleViews(item,1);
  for(const path of ['/gtm.js','/gtag/js','/metrika/tag.js']) assert.ok(item.requests.some(r=>new URL(r.url).pathname===path && r.status===200),'successful provider '+path);
  assert.equal(gaViews(item).length,1,'one initial GA page_view');assert.equal(ymViews(item).length,1,'one initial YM pageview');
  const location=new URL((await state(page)).url);assert.equal(location.searchParams.get('yclid'),'1234567890123456789');assert.equal(location.searchParams.get('utm_id'),'9876543210');assert.equal(location.searchParams.has('token'),false);
  assert.equal(new URL(gaViews(item)[0].url).searchParams.get('yclid'),'1234567890123456789');
  assert.equal(new URL(new URL(ymViews(item)[0].url).searchParams.get('page-url')).searchParams.get('ysclid'),'diagnostic_search');
  await page.click(lang==='ru'?'a[href="/ru/politika"]':'a[href="/privacy-policy"]');await settleViews(item,2);await delay(1500);
  assert.equal(gaViews(item).length,2,'one SPA GA view');assert.equal(ymViews(item).length,2,'one SPA YM view');
  await page.evaluate(()=>history.replaceState({},'',location.href));await delay(3000);
  assert.equal(gaViews(item).length,2,'no duplicate GA view on identical replaceState');assert.equal(ymViews(item).length,2,'no duplicate YM view');
  await page.goBack({waitUntil:'domcontentloaded'});await settleViews(item,3);
  assert.equal(gaViews(item).length,3,'one popstate GA view');assert.equal(ymViews(item).length,3,'one popstate YM view');
  await page.reload({waitUntil:'networkidle2'});await settleViews(item,4);assert.equal((await state(page)).choice,true);
  assert.equal(gaViews(item).length,4,'one repeated visit GA view');assert.equal(ymViews(item).length,4,'one repeated visit YM view');
  item.gaViews=gaViews(item);item.ymStatuses=ymViews(item).map(r=>r.status||'UNKNOWN');
  for(const r of item.requests) assert.ok(!decodeURIComponent(r.url+' '+r.body).includes('user@example.test')&&!decodeURIComponent(r.url+' '+r.body).includes('token=secret'),'no sensitive query in optional payload');
  await page.click('#cookie-settings');await delay(600);await page.click(lang==='ru'?'#cookie-reject-ru':'#cookie-reject');await delay(2500);
  assert.equal((await state(page)).choice,false);const count=item.requests.length;await delay(1800);assert.equal(item.requests.length,count,'no sends after withdrawn document reloaded');
  assert.equal((await page.cookies()).some(c=>/^_ga|^_ym_/.test(c.name)),false,'analytics cookies removed');
  item.final=await state(page);item.pass=true;assert.equal(item.errors.length,0);await ctx.close();
 }
 for(const mode of ['reject','learn-more','legacy','cookie-write-failure']) {
  const {ctx,page,item}=await setup(mode);
  if(mode==='legacy') await page.evaluateOnNewDocument(()=>{localStorage.setItem('cookiesAccepted','true');localStorage.setItem('gtf_cookie_consent','{"necessary":true,"optional":true,"updatedAt":"2026-02-19"}');});
  if(mode==='cookie-write-failure') {
   await ctx.setCookie({name:'gtf_consent_v2',value:cookieRecord(true),domain:'.gotoflow.io',path:'/',secure:true,sameSite:'Lax'});
   await page.evaluateOnNewDocument(()=>{const cookie=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');Object.defineProperty(document,'cookie',{get:()=>cookie.get.call(document),set:()=>{}});});
  }
  await page.goto('https://gotoflow.io/ru',{waitUntil:'networkidle2'});await delay(1800);
  if(mode==='reject') await page.click('#cookie-reject-ru');
  if(mode==='learn-more') await page.click('#cookie-learn-more-ru');
  if(mode==='cookie-write-failure') {await page.click('#cookie-settings');await delay(600);await page.click('#cookie-reject-ru');await delay(2000);}
  const count=item.requests.length;if(mode!=='cookie-write-failure')assert.equal(count,0);
  await page.reload({waitUntil:'networkidle2'});await delay(1800);assert.equal(item.requests.length,count);
  item.final=await state(page);assert.equal(item.final.choice,['reject','cookie-write-failure'].includes(mode)?false:null);item.pass=true;await ctx.close();
 }
 {
  const {ctx,page,item}=await setup('consent-after-internal-navigation');
  await page.goto('https://gotoflow.io/ru?ysclid=late_search&utm_campaign=1234567890123',{waitUntil:'networkidle2'});
  await page.click('a[href="/ru/politika"]');await delay(1600);assert.equal(item.requests.length,0);
  await page.click('#cookie-accept-ru');await settleViews(item,1);
  assert.equal(gaViews(item).length,1);assert.equal(ymViews(item).length,1);
  assert.equal(new URL(gaViews(item)[0].url).searchParams.get('ysclid'),'late_search');
  assert.equal(new URL(new URL(ymViews(item)[0].url).searchParams.get('page-url')).searchParams.get('ysclid'),'late_search');
  item.gaViews=gaViews(item);item.ymStatuses=ymViews(item).map(r=>r.status||'UNKNOWN');item.pass=true;await ctx.close();
 }
} finally {fs.mkdirSync('tmp/analytics-qa',{recursive:true});fs.writeFileSync('tmp/analytics-qa/landing-recovery.json',JSON.stringify(report,null,2));await browser.close();}
console.log('PASS: landing consent lifecycle, actual pageview payloads, SPA/popstate deduplication and advertising parameters. See evidence for each transport status; account receipt remains BLOCKED.');
