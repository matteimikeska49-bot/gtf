import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer';
const base = process.env.BLOG_QA_BASE_URL;
if (!base || !['127.0.0.1','localhost'].includes(new URL(base).hostname)) throw new Error('Explicit localhost candidate required');
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
const optional = url => /googletagmanager\.com|google-analytics\.com|mc\.yandex\./.test(url);
const browser = await puppeteer.launch({headless:true});
const report = { base, fixture: 'gotoflow.io is intercepted to localhost candidate; app.gotoflow.io is a cookie-contract fixture, NOT application source', cases:[], accountReceive:'BLOCKED: no reporting access', realApplicationIntegration:'BLOCKED: app repository/deployment unavailable' };
const cookieRecord = optional => encodeURIComponent(JSON.stringify({version:2,necessary:true,optional,updatedAt:new Date().toISOString()}));
async function setup(name) {
 const ctx=await browser.createBrowserContext(),page=await ctx.newPage();const item={name,requests:[],errors:[]};report.cases.push(item);const requests=new Map();
 await page.setRequestInterception(true);
 page.on('request',async r=>{
  if(optional(r.url())) {const itemRequest={url:r.url(),body:r.postData()||'',method:r.method()};item.requests.push(itemRequest);requests.set(r,itemRequest);}
  try {
   const url=new URL(r.url());
   if(url.hostname==='gotoflow.io') {const response=await fetch(base+url.pathname+url.search);await r.respond({status:response.status,contentType:response.headers.get('content-type')||'text/html',body:Buffer.from(await response.arrayBuffer())});}
   else if(url.hostname==='app.gotoflow.io') await r.respond({status:200,contentType:'text/html',body:`<!doctype html><title>Consent contract fixture — not production app</title><p id="choice"></p><button id="app-reject">Reject</button><script>function choice(){try{return JSON.parse(decodeURIComponent(document.cookie.split('; ').find(x=>x.startsWith('gtf_consent_v2=')).split('=').slice(1).join('='))).optional}catch{return null}}document.querySelector('#choice').textContent=String(choice());document.querySelector('#app-reject').onclick=()=>{document.cookie='gtf_consent_v2='+encodeURIComponent(JSON.stringify({version:2,necessary:true,optional:false,updatedAt:new Date().toISOString()}))+'; Domain=gotoflow.io; Path=/; Secure; SameSite=Lax';location.reload()};</script>`});
   else await r.continue();
  }catch(e){item.errors.push(e.message);await r.abort().catch(()=>{});}
 });
 page.on('response',r=>{if(requests.has(r.request()))requests.get(r.request()).status=r.status();});
 page.on('requestfailed',r=>{if(requests.has(r))requests.get(r).failure=r.failure()?.errorText;});
 page.on('pageerror',e=>item.errors.push(e.message));
 return {ctx,page,item};
}
async function state(page) {return page.evaluate(()=>({choice:window.gtfAnalytics.readChoice(),saved:document.cookie.includes('gtf_consent_v2='),campaign:sessionStorage.getItem('gtf_campaign_v1'),url:location.href}));}
try {
 for(const lang of ['en','ru']) {
  const {ctx,page,item}=await setup(lang+'-accept-repeat-spa-withdraw');
  const route=lang==='ru'?'/ru':'/ai-content-generator';
  await page.goto('https://gotoflow.io'+route+'?utm_source=diagnostic&utm_campaign=consent_repair&email=user%40example.test&token=secret',{waitUntil:'networkidle2'});await delay(1800);
  assert.equal(item.requests.length,0,'no-choice network');assert.equal((await state(page)).choice,null);
  await page.click(lang==='ru'?'#cookie-accept-ru':'#cookie-accept-all');await delay(6500);
  for(const path of ['/gtm.js','/gtag/js','/metrika/tag.js']) assert.ok(item.requests.some(r=>new URL(r.url).pathname===path && r.status===200),'successful provider '+path);
  const ga=item.requests.filter(r=>r.url.includes('/g/collect') && (r.url.includes('en=page_view')||r.body.includes('en=page_view')));
  assert.equal(ga.length,1,'one initial GA page_view');assert.ok(item.requests.some(r=>r.url.includes('/watch/108772587')&&decodeURIComponent(r.url).includes('pv:1')),'actual initial YM view');
  const before=item.requests.length;
  await page.click(lang==='ru'?'a[href="/ru/politika"]':'a[href="/privacy-policy"]');await delay(5000);
  const spa=item.requests.slice(before);assert.ok(spa.some(r=>r.url.includes('/watch/108772587')&&/policy|politika/.test(decodeURIComponent(r.url))),'SPA YM hit');
  assert.ok(spa.some(r=>r.url.includes('/g/collect')&&(r.url.includes('en=page_view')||r.body.includes('en=page_view'))),'SPA GA view');
  const handoff=await page.evaluate(()=>window.gtfAnalytics.decorateAppUrl('https://app.gotoflow.io/'));
  assert.ok(handoff.includes('utm_source=diagnostic'));assert.ok(!handoff.includes('email')&&!handoff.includes('secret'));
  const returnUrl=page.url();
  await Promise.all([
    page.waitForNavigation({waitUntil:'domcontentloaded'}),
    page.evaluate(()=>{const button=[...document.querySelectorAll('button')].find(b=>/Start for free|Начать бесплатно|Запустить бесплатно|Launch for free/.test(b.textContent));if(!button)throw new Error('App CTA missing');button.click();}),
  ]);
  assert.equal(new URL(page.url()).hostname,'app.gotoflow.io');
  assert.equal(new URL(page.url()).searchParams.get('utm_source'),'diagnostic');
  assert.equal(new URL(page.url()).searchParams.has('token'),false);
  assert.equal(await page.$eval('#choice',e=>e.textContent),'true');
  await page.goto(returnUrl,{waitUntil:'networkidle2'});await delay(1500);
  await page.reload({waitUntil:'networkidle2'});await delay(2500);assert.equal((await state(page)).choice,true);
  await page.click('#cookie-settings');await delay(600);await page.click(lang==='ru'?'#cookie-reject-ru':'#cookie-reject');await delay(2500);
  assert.equal((await state(page)).choice,false);const count=item.requests.length;await delay(1800);assert.equal(item.requests.length,count,'no sends after withdrawn document reloaded');
  assert.equal((await page.cookies()).some(c=>/^_ga|^_ym_/.test(c.name)),false,'analytics cookies removed');
  item.handoff=handoff;item.final=await state(page);item.pass=true;assert.equal(item.errors.length,0);await ctx.close();
 }
 for(const mode of ['reject','learn-more','legacy']) {
  const {ctx,page,item}=await setup(mode);
  if(mode==='legacy') await page.evaluateOnNewDocument(()=>{localStorage.setItem('cookiesAccepted','true');localStorage.setItem('gtf_cookie_consent','{"necessary":true,"optional":true,"updatedAt":"2026-02-19"}');});
  await page.goto('https://gotoflow.io/ru',{waitUntil:'networkidle2'});await delay(1800);
  if(mode==='reject') await page.click('#cookie-reject-ru');
  if(mode==='learn-more') await page.click('#cookie-learn-more-ru');
  await delay(1600);assert.equal(item.requests.length,0);await page.reload({waitUntil:'networkidle2'});await delay(1600);assert.equal(item.requests.length,0);
  item.final=await state(page);assert.equal(item.final.choice,mode==='reject'?false:null);item.pass=true;await ctx.close();
 }
 {
  const {ctx,page,item}=await setup('cross-host-cookie-contract');
  await ctx.setCookie({name:'gtf_consent_v2',value:cookieRecord(true),domain:'.gotoflow.io',path:'/',secure:true,sameSite:'Lax'});
  await page.goto('https://gotoflow.io/ru',{waitUntil:'networkidle2'});await delay(3000);
  const app=await ctx.newPage();await app.setRequestInterception(true);
  app.on('request',async r=>{if(r.url().startsWith('https://app.gotoflow.io'))await r.respond({status:200,contentType:'text/html',body:`<button id="reject">Reject</button><script>document.body.dataset.choice=JSON.parse(decodeURIComponent(document.cookie.split('; ').find(x=>x.startsWith('gtf_consent_v2=')).split('=').slice(1).join('='))).optional;document.querySelector('#reject').onclick=()=>{document.cookie='gtf_consent_v2=${cookieRecord(false)}; Domain=gotoflow.io; Path=/; Secure; SameSite=Lax'}</script>`});else await r.continue();});
  await app.goto('https://app.gotoflow.io/');assert.equal(await app.evaluate(()=>document.body.dataset.choice),'true');await app.click('#reject');await delay(2500);assert.equal((await state(page)).choice,false);
  const count=item.requests.length;await delay(1500);assert.equal(item.requests.length,count);item.pass=true;await ctx.close();
 }
} finally {fs.mkdirSync('tmp/analytics-qa',{recursive:true});fs.writeFileSync('tmp/analytics-qa/consent-repair.json',JSON.stringify(report,null,2));await browser.close();}
console.log('PASS: consent lifecycle, real provider payloads, SPA, campaign whitelist and cross-host cookie CONTRACT. Actual app integration and account receipt remain BLOCKED.');
