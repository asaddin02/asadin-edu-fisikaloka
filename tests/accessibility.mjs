import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';
import { PHYSICS_EQUATIONS } from '../js/data/equations.js';

const port=await new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
const server=spawn(process.execPath,['server/server.mjs'],{env:{...process.env,PORT:String(port),HOST:'127.0.0.1',NODE_ENV:'production'},stdio:'pipe'});
const report={date:new Date().toISOString(),standard:'axe automated WCAG 2 A/AA and 2.1 AA checks; not a full conformance certification',scans:[]};
let browser;
try {
 await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error(`Server exited ${code}`)));});
 browser=await chromium.launch({executablePath:process.env.CHROME_BIN||(fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined),args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1366,height:900}}),page=await context.newPage();
 const scan=async name=>{await page.evaluate(()=>Promise.all(document.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{}))));const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.scans.push({name,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))});console.log(`${result.violations.length?'FAIL':'PASS'} ${name}`);};
 const routes=['/','/learn?level=sd','/learn?level=educator','/lesson/sd-motion','/lesson/maxwell-course?level=university','/lesson/teacher-design?level=educator','/explore','/entity/gravity','/entity/electron','/constants','/experiments','/graph','/about',...PHYSICS_EQUATIONS.map(e=>`/equations?id=${e.id}`),...['circuits','projectile','pendulum','wave-doppler','double-slit','electric-field','lorentz-force','optics','thermodynamics','relativity','orbital-gravity','bohr-atom','bernoulli-fluid'].map(id=>`/simulations?sim=${id}`)];
 for(const route of routes){await page.goto(`http://127.0.0.1:${port}${route}`);await page.waitForSelector('#main-slot h1');await scan(route);}
 await page.goto(`http://127.0.0.1:${port}/lesson/sd-motion`);await page.locator('[data-answer]').first().click();await scan('Quiz feedback');
 await page.locator('#global-search-btn').click();await page.locator('#modal-search-input').fill('gaya');await scan('Search dialog results');await page.keyboard.press('Escape');await page.locator('.search-modal-backdrop').waitFor({state:'hidden'});
 await page.setViewportSize({width:375,height:812});
 for(const route of ['/','/learn?level=educator','/lesson/maxwell-course?level=university','/simulations?sim=electric-field']){await page.goto(`http://127.0.0.1:${port}${route}`);await page.waitForSelector('#main-slot h1');await scan(`Mobile ${route}`);}
 await page.locator('#mobile-menu-btn').click();await page.locator('.nav-more summary').click();await scan('Mobile expanded navigation');
} finally {await browser?.close();server.kill();fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/accessibility.json',JSON.stringify(report,null,2)+'\n');}
const failed=report.scans.filter(s=>s.violations.length);console.log(`${report.scans.length-failed.length}/${report.scans.length} scans without automated violations`);if(failed.length)process.exitCode=1;
