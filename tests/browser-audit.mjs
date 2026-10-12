import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import net from 'node:net';
import http from 'node:http';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { CATALOG } from '../js/core/catalog.js';
import { COURSES } from '../js/data/courses/index.js';
import { PHYSICS_EQUATIONS } from '../js/data/equations.js';

const output='test-results';fs.mkdirSync(output,{recursive:true});
const port=await new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
const server=spawn(process.execPath,['server/server.mjs'],{env:{...process.env,PORT:String(port),HOST:'127.0.0.1',NODE_ENV:'production'},stdio:'pipe'});
const base=`http://127.0.0.1:${port}/`;
const report={date:new Date().toISOString(),browser:null,checks:[],responsive:[],errors:[],performance:{}};
let browser;
async function check(name,fn){try{const detail=await fn();report.checks.push({name,status:'PASS',detail});console.log(`PASS ${name}`);}catch(e){report.checks.push({name,status:'FAIL',error:e.message});console.error(`FAIL ${name}: ${e.message}`);}}
function request(path,method='GET'){return new Promise((resolve,reject)=>{http.request({host:'127.0.0.1',port,path,method},r=>{let body='';r.on('data',d=>body+=d);r.on('end',()=>resolve({status:r.statusCode,headers:r.headers,body}));}).on('error',reject).end();});}
try {
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error(`Server exited ${code}`)));});
  browser=await chromium.launch({executablePath:process.env.CHROME_BIN || (fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined),headless:true,args:['--no-sandbox']});
  report.browser=browser.version();
  const page=await browser.newPage({viewport:{width:1366,height:900}});
  page.setDefaultTimeout(5000);
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',msg=>{if(msg.type()==='error'&&!msg.text().includes('Failed to load resource'))report.errors.push(msg.text());});
  await page.addInitScript(()=>{const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);const active=new Set();window.__activeRAF=active;window.requestAnimationFrame=fn=>{let id=request(t=>{active.delete(id);fn(t);});active.add(id);return id;};window.cancelAnimationFrame=id=>{active.delete(id);cancel(id);};});
  await page.goto(base);await page.waitForSelector('#main-slot h1');
  report.performance=await page.evaluate(()=>({domNodes:document.querySelectorAll('*').length,resources:performance.getEntriesByType('resource').length,resourceBytes:performance.getEntriesByType('resource').reduce((a,r)=>a+r.encodedBodySize,0),domContentLoadedMs:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,heapBytes:performance.memory?.usedJSHeapSize}));
  const go=async route=>{await page.evaluate(url=>{history.pushState(null,'',url);dispatchEvent(new PopStateEvent('popstate'));},route);await page.waitForTimeout(70);};
  await check('Server restricts private files, malformed paths, methods and traversal',async()=>{
    for(const [path,status] of [['/',200],['/.git/config',403],['/package.json',404],['/server/server.mjs',404],['/tests/test-runner.mjs',404],['/%E0%A4%A',400],['/js/%2e%2e/.git/config',403],['/js/%00x',403],['/missing.txt',404],['/entity/gravity',200],['/learn?level=sd',200]])assert.equal((await request(path)).status,status,path);
    assert.equal((await request('/','POST')).status,405);const head=await request('/','HEAD');assert.equal(head.status,200);assert.equal(head.body,'');assert.ok(head.headers['content-security-policy']);assert.equal((await request('/')).status,200);
  });
  await check('All catalogue destinations render without missing-page fallback',async()=>{
    for(const record of CATALOG){await go(record.url);const text=await page.locator('#main-slot').innerText();assert.doesNotMatch(text,/Halaman tidak dapat|tidak ditemukan|Page render failed/i,record.url);assert.ok(text.length>100,record.url);}
    return {destinations:CATALOG.length};
  });
  await check('Every equation variable has a navigable canonical destination',async()=>{
    let count=0;for(const eq of PHYSICS_EQUATIONS){await go(`/equations?id=${eq.id}`);const hrefs=await page.locator('#main-slot a').evaluateAll(a=>a.map(x=>x.getAttribute('href')));for(const v of eq.variables){assert.ok(hrefs.some(h=>h?.includes(v.quantityId)),`${eq.id}:${v.quantityId}`);count++;}}return {variables:count};
  });
  await check('Global search escapes HTML, traps focus, closes with Escape and restores focus',async()=>{
    await go('/');await page.locator('#global-search-btn').click();const input=page.locator('#modal-search-input');await input.waitFor({state:'visible'});
    await input.fill('<img src=x onerror="window.__xss=1">');await page.waitForTimeout(180);
    assert.equal(await page.evaluate(()=>window.__xss),undefined);assert.equal(await page.locator('#modal-search-results img').count(),0);
    await page.keyboard.press('Shift+Tab');assert.ok(await page.locator('[role=dialog]').evaluate(d=>d.contains(document.activeElement)));
    await page.keyboard.press('Escape');await input.waitFor({state:'hidden'});assert.equal(await page.evaluate(()=>document.activeElement.id),'global-search-btn');
  });
  await check('Search result clicks open concept, law, equation, constant, unit, particle, phenomenon, experiment, instrument and lesson',async()=>{
    for(const [q,id] of [['Mass','mass'],['Newton’s First Law','newton-first-law'],['Ohm','ohms-law'],['Gravitational Constant','gravitational-constant'],['Kilogram','kilogram'],['Electron','electron'],['Photoelectric Effect','photoelectric-effect'],['Millikan','millikan-oil-drop'],['LHC','lhc-instrument'],['Dorongan dan Tarikan','sd-1-1']]){
      await page.locator('#global-search-btn').click();await page.locator('#modal-search-input').fill(q);await page.waitForTimeout(150);const result=page.locator(`.search-result-item[href*="${id}"]`).first();await result.click();assert.ok(page.url().includes(id),q);
    }
  });
  await check('Learn completion, notes and quiz results persist; retry and all levels work',async()=>{
    await go('/lesson/sd-motion?level=sd');let button=page.locator('[data-complete="sd-motion"]');await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');
    await page.locator('#lesson-notes').fill('Saya membedakan gaya dan gerak. <img src=x onerror=alert(1)>');
    await page.locator('[data-answer]').filter({hasText:'Interaksi dorongan atau tarikan'}).click();assert.match(await page.locator('.quiz-feedback-box').innerText(),/Tepat/);await page.locator('#retry-question').click();assert.equal(await page.locator('[data-answer]:disabled').count(),0);
    await page.reload();assert.equal(await button.getAttribute('aria-pressed'),'true');assert.ok((await page.locator('#lesson-notes').inputValue()).includes('Saya membedakan'));assert.equal(await page.locator('#notes img').count(),0);await button.click();assert.equal(await button.getAttribute('aria-pressed'),'false');
    for(const level of ['sd','smp','sma','university','educator']){await go(`/learn?level=${level}`);assert.ok(await page.locator('.study-card').count());assert.equal(await page.locator(`[data-lvl-id="${level}"]`).getAttribute('aria-pressed'),'true');}
    await go('/lesson/teacher-experiments?level=educator');assert.ok(await page.locator('.teacher-plan').count());
  });
  await check('Atlas type/domain filters, empty state/reset and constant categories work',async()=>{
    await go('/explore');
    for(const type of await page.locator('[data-type]').evaluateAll(a=>a.map(x=>x.dataset.type))){await page.locator(`[data-type="${type}"]`).click();assert.ok(await page.locator('.entity-card').count(),type);}
    await page.locator('[data-type="all"]').click();
    for(const value of await page.locator('#domain-select-filter option').evaluateAll(a=>a.map(x=>x.value))){await page.locator('#domain-select-filter').selectOption(value);assert.ok(await page.locator('.entity-card').count(),value);}
    await page.locator('#explore-search-input').fill('zzzz-no-result');assert.equal(await page.locator('.entity-card').count(),0);await page.locator('#reset-filters-btn').click();assert.equal(await page.locator('.entity-card').count(),CATALOG.length);
    await go('/constants');for(const cat of await page.locator('[data-cat]').evaluateAll(a=>a.map(x=>x.dataset.cat))){await page.locator('[data-cat]').nth(await page.locator('[data-cat]').evaluateAll((a,cat)=>a.findIndex(x=>x.dataset.cat===cat),cat)).click();assert.ok(await page.locator('[id^="constant-"]').count(),cat);}
    await page.locator('#const-search-input').fill('zzzz-no-result');assert.match(await page.locator('#main-slot').innerText(),/tidak ada|tidak ditemukan/i);
  });
  await check('Four layers differ, bookmarks persist, quiz feedback and back navigation work',async()=>{
    await go('/entity/gravity');const layers=[];for(const layer of ['simple','standard','advanced','deepDive']){await page.locator(`[data-layer="${layer}"]`).click();layers.push(await page.locator('.layer-content-card').innerText());}assert.equal(new Set(layers).size,4);
    await page.locator('#bookmark-btn').click();await page.reload();assert.ok((await page.locator('#bookmark-btn').getAttribute('class')).includes('sim-btn-active'));await page.locator('#bookmark-btn').click();
    await go('/learn?level=sd');for(const level of ['sd','smp','sma','university','educator']){await go(`/learn?level=${level}`);await page.locator('.study-card').first().click();await page.locator('.quiz-option-btn').first().click();assert.equal(await page.locator('.quiz-feedback-box').first().isVisible(),true);}
    await go('/entity/mass');await go('/entity/force');await page.goBack();assert.ok(page.url().includes('/entity/mass'));
  });
  const sims=['circuits','projectile','pendulum','wave-doppler','double-slit','electric-field','lorentz-force','optics','thermodynamics','relativity','orbital-gravity','bohr-atom','bernoulli-fluid'];
  await check('13 simulations render; all range extremes, select options and action buttons execute',async()=>{
    let controls=0;for(const sim of sims){await go(`/simulations?sim=${sim}`);await page.waitForSelector('#sim-viewport-canvas');
      const before=await page.locator('canvas').first().evaluate(c=>c.toDataURL());
      for(const id of await page.locator('#sim-dynamic-controls input[type=range]').evaluateAll(a=>a.map(x=>x.id))){for(const edge of ['min','max']){await page.locator(`#${id}`).evaluate((el,edge)=>{el.value=el[edge];el.dispatchEvent(new Event('input',{bubbles:true}));},edge);controls++;}}
      for(const id of await page.locator('#sim-dynamic-controls select').evaluateAll(a=>a.map(x=>x.id))){for(const value of await page.locator(`#${id} option`).evaluateAll(a=>a.map(x=>x.value))){await page.locator(`#${id}`).selectOption(value);controls++;}}
      for(const id of await page.locator('#sim-top-actions button').evaluateAll(a=>a.map(x=>x.id))){await page.locator(`#${id}`).click();controls++;}
      if(sim==='optics'){assert.equal(await page.locator('#sim-pause').count(),1);for(const id of ['range-focal','range-obj-dist']){await page.locator(`#${id}`).evaluate(el=>{el.value=el.max;el.dispatchEvent(new Event('input'));});controls++;}}
      await page.waitForTimeout(100);assert.doesNotMatch(await page.locator('#sim-telemetry-hud').innerText(),/NaN|undefined/,sim);
      const after=await page.locator('canvas').first().evaluate(c=>c.toDataURL());assert.notEqual(before,after,`${sim}: canvas did not respond`);
      const pause=page.locator('#sim-pause');if(await pause.count()){await pause.click();assert.equal(await pause.getAttribute('aria-pressed'),'true');await pause.click();}
      await go('/about');await page.waitForTimeout(70);assert.equal(await page.evaluate(()=>window.__activeRAF.size),0,`${sim} leaves animation callbacks`);
    }return {simulations:sims.length,controlActions:controls};
  });
  await check('Knowledge graph supports selection, dragging, zoom, related navigation and cleanup',async()=>{
    await go('/graph?focus=gravity');assert.ok(await page.locator('#graph-node-info-panel a[href="/entity/gravity"]').count());
    const select=page.locator('#main-slot select');await select.selectOption('mass');
    const c=page.locator('canvas');const box=await c.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+80,box.y+box.height/2+20,{steps:5});await page.mouse.up();assert.ok(page.url().includes('/graph'));
    for(const button of await page.locator('#main-slot button').all())await button.click();
    await page.locator('#main-slot a[href="/entity/mass"]').first().click();assert.ok(page.url().includes('/entity/mass'));await page.waitForTimeout(80);assert.equal(await page.evaluate(()=>window.__activeRAF.size),0);
  });
  await check('Every authored lesson supports wrong-answer feedback, retry and the correct answer',async()=>{
    for(const course of COURSES){await go(`/lesson/${course.id}?level=${course.level}`);const wrong=await page.locator('[data-answer]').evaluateAll((buttons,text)=>buttons.findIndex(b=>b.lastChild.textContent===text),course.distractors[0]);assert.ok(wrong>=0,course.id);await page.locator('[data-answer]').nth(wrong).click();assert.match(await page.locator('.quiz-feedback-box').innerText(),/Mari periksa/);await page.locator('#retry-question').click();const correct=await page.locator('[data-answer]').evaluateAll((buttons,text)=>buttons.findIndex(b=>b.lastChild.textContent===text),course.answer);assert.ok(correct>=0,course.id);await page.locator('[data-answer]').nth(correct).click();assert.match(await page.locator('.quiz-feedback-box').innerText(),/Tepat/);}
    return {lessons:COURSES.length};
  });
  await check('Invalid routes and unknown dossier IDs show safe errors',async()=>{
    for(const route of ['/%E0%A4%A','/entity/no-such-record','/equations?id=no-such-record','/experiments?id=no-such-record']){await go(route);assert.match(await page.locator('#main-slot').innerText(),/tidak ditemukan/i);}
  });
  await check('Study search, export, reset cancellation, sharing and printable teaching plan work',async()=>{
    await go('/learn?level=smp');await page.locator('#lesson-search').fill('ketidakpastian');assert.ok(await page.locator('.study-card[href*="measuring"]').count());
    await page.locator('#lesson-search').fill('zzzz-no-result');assert.equal(await page.locator('.study-card').count(),0);await page.locator('#reset-lesson-search').click();assert.equal(await page.locator('.study-card').count(),15);
    await page.locator('#toggle-all').click();assert.equal(await page.locator('.study-card').count(),COURSES.length);
    await go('/lesson/maxwell-course?level=educator');await page.locator('#lesson-notes').fill('Catatan ekspor: konservasi muatan.');
    const layers=[];for(const depth of ['simple','standard','advanced','deepDive']){await page.locator(`[data-depth="${depth}"]`).click();layers.push(await page.locator('#depth-content').innerText());assert.equal(await page.evaluate(()=>document.activeElement.dataset.depth),depth);}assert.equal(new Set(layers).size,4);
    await page.context().grantPermissions(['clipboard-read','clipboard-write']);await page.locator('#copy-lesson-link').click();await page.waitForFunction(()=>document.querySelector('#share-status').textContent.length>0);assert.match(await page.locator('#share-status').innerText(),/Tautan tersalin/);assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),page.url());
    await page.evaluate(()=>{window.__printCalled=0;window.print=()=>window.__printCalled++;});await page.locator('.teacher-plan .print-lesson').click();assert.equal(await page.evaluate(()=>window.__printCalled),1);
    await page.emulateMedia({media:'print'});assert.equal(await page.locator('.navbar').isVisible(),false);assert.equal(await page.locator('.teacher-plan').isVisible(),true);assert.equal(await page.locator('.quiz-option-btn').first().isVisible(),true);await page.pdf({path:`${output}/teacher-module.pdf`,format:'A4',printBackground:true});await page.emulateMedia({media:'screen'});
    await go('/learn?level=educator');const download=page.waitForEvent('download');await page.locator('#export-study').click();const exported=await download;const data=JSON.parse(fs.readFileSync(await exported.path(),'utf8'));assert.equal(data.study.notes['maxwell-course'],'Catatan ekspor: konservasi muatan.');assert.ok(data.study.passed.length);
    await page.locator('.reset-progress summary').click();await page.locator('#reset-study').click();await page.locator('#cancel-reset').click();assert.equal(await page.locator('#reset-confirm').isVisible(),false);assert.ok(await page.evaluate(()=>JSON.parse(localStorage.asadin_physics_study_v2).passed.length));
    await page.locator('#reset-study').click();await page.locator('#confirm-reset').click();const clean=await page.evaluate(()=>localStorage.getItem('asadin_physics_study_v2'));assert.equal(clean,null);
  });
  await check('Responsive routes at 320, 375, 414, 768, 1366 and 1920 px have no document overflow',async()=>{
    const failed=[];
    for(const width of [320,375,414,768,1366,1920]){await page.setViewportSize({width,height:900});for(const route of ['/','/explore','/entity/gravity','/equations','/constants','/experiments','/simulations','/learn','/lesson/maxwell-course?level=university','/lesson/teacher-design?level=educator','/graph','/about']){await go(route);const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));report.responsive.push({route,...metrics});if(metrics.scrollWidth>width+1)failed.push({route,...metrics});}
      await go('/');const menu=page.locator('#mobile-menu-btn');if(await menu.isVisible()){await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.locator('#nav-slot .nav-more summary').click();await page.locator('#nav-slot a[href="/equations"]').first().click();await page.waitForTimeout(80);assert.equal(await menu.getAttribute('aria-expanded'),'false');}
    }assert.deepEqual(failed,[]);
  });
  await check('Touch interaction and reduced-motion pause work',async()=>{
    const context=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await context.newPage();await p.goto(`${base}simulations?sim=electric-field`);await p.waitForSelector('#sim-pause');assert.equal(await p.locator('#sim-pause').getAttribute('aria-pressed'),'true');await p.locator('#sim-pause').tap();assert.equal(await p.locator('#sim-mobile-select').inputValue(),'electric-field');const box=await p.locator('canvas').boundingBox();await p.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);await p.locator('#sim-pause').tap();await context.close();
  });
  await go('/simulations?sim=electric-field');
  report.performance.frameSample=await page.evaluate(()=>new Promise(resolve=>{const intervals=[];let previous;const sample=time=>{if(previous!==undefined)intervals.push(time-previous);previous=time;if(intervals.length<90)requestAnimationFrame(sample);else{const sorted=[...intervals].sort((a,b)=>a-b);resolve({module:'electric-field',frames:intervals.length,meanMs:intervals.reduce((a,b)=>a+b)/intervals.length,p95Ms:sorted[Math.floor(sorted.length*.95)]});}};requestAnimationFrame(sample);}));
  await page.setViewportSize({width:375,height:812});await go('/');await page.screenshot({path:`${output}/mobile-home.png`,fullPage:true});await go('/lesson/maxwell-course?level=university');await page.screenshot({path:`${output}/mobile-lesson.png`,fullPage:true});await go('/simulations?sim=thermodynamics');await page.screenshot({path:`${output}/mobile-thermodynamics.png`,fullPage:true});
  await go('/equations?id=maxwell-gauss-electric');await page.screenshot({path:`${output}/mobile-equation.png`,fullPage:true});
  await page.setViewportSize({width:1366,height:900});await go('/');await page.screenshot({path:`${output}/desktop-home.png`,fullPage:true});
  await check('Repeated lab navigation releases animation callbacks and records post-GC heap',async()=>{
    const cdp=await page.context().newCDPSession(page);const heaps=[];
    for(let batch=0;batch<2;batch++){for(let i=0;i<8;i++){await go('/simulations?sim=electric-field');await go('/about');}await cdp.send('HeapProfiler.collectGarbage');heaps.push((await cdp.send('Runtime.getHeapUsage')).usedSize);assert.equal(await page.evaluate(()=>window.__activeRAF.size),0);}
    report.performance.postGCHeapBytes=heaps;await cdp.detach();return {postGCHeapBytes:heaps};
  });
  report.performance.finalHeapBytes=await page.evaluate(()=>performance.memory?.usedJSHeapSize);
  await check('No uncaught JavaScript or render errors during browser audit',()=>assert.deepEqual(report.errors,[]));
} finally {
  await browser?.close();server.kill();
  fs.writeFileSync(`${output}/browser-audit.json`,JSON.stringify(report,null,2)+'\n');
}
const failed=report.checks.filter(c=>c.status==='FAIL');console.log(`${report.checks.length-failed.length}/${report.checks.length} browser groups passed`);if(failed.length)process.exitCode=1;
