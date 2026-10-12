import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { PHYSICS_ENTITIES } from '../js/data/entities.js';
import { COURSES } from '../js/data/courses/index.js';

const root=path.resolve('dist');
const sitemap=fs.existsSync(path.join(root,'sitemap.xml'));
assert.deepEqual(fs.readdirSync(root).sort(),['404.html','_headers','about.html','assets','constants.html','css','dukung.html','entity','equations.html','experiments.html','explore.html','graph.html','index.html','js','learn.html','lesson','manifest.webmanifest','robots.txt','simulations.html',...(sitemap?['sitemap.xml']:[])]);
assert.equal(fs.readdirSync(path.join(root,'entity')).length,PHYSICS_ENTITIES.length);
assert.equal(fs.readdirSync(path.join(root,'lesson')).length,COURSES.length);
// Prerendered pages carry real text, metadata and path links; nothing in the package still links to hash routes.
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name));
for(const file of walk(root).filter(f=>/\.(html|js)$/.test(f)))assert.doesNotMatch(fs.readFileSync(file,'utf8'),/href="#\//,file);
const gravity=read('entity/gravity.html');
assert.match(gravity,/<title>Gravitasi — Phsyco<\/title>/);assert.match(gravity,/<h1>Gravitasi<\/h1>/);assert.match(gravity,/Intuisi &amp; kehidupan sehari-hari|Intuisi & kehidupan sehari-hari/);assert.match(gravity,/href="\/entity\/spacetime"/);assert.match(gravity,/href="\/explore"/);
const lesson=read('lesson/sd-motion.html');assert.match(lesson,/<h1>[^<]+<\/h1>/);assert.match(lesson,/Pahami konsepnya/);assert.match(lesson,/href="\/learn\?level=sd"/);
assert.match(read('index.html'),/href="\/learn"/);assert.match(read('learn.html'),/href="\/lesson\/maxwell-course"/);
assert.match(read('404.html'),/<meta name="robots" content="noindex">/);assert.doesNotMatch(read('404.html'),/rel="canonical"/);
assert.match(read('robots.txt'),/^User-agent: \*\nAllow: \/\n/);
if(sitemap){const xml=read('sitemap.xml');const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,walk(root).filter(f=>f.endsWith('.html')&&!f.endsWith('404.html')).length);for(const url of urls){assert.ok(!url.endsWith("/")||/^https:\/\/[^/]+\/$/.test(url),url);assert.match(url,/^https:\/\//);}assert.match(gravity,/<link rel="canonical" href="[^"]+\/entity\/gravity">/);assert.match(gravity,/application\/ld\+json/);assert.match(read('robots.txt'),/Sitemap: https:\/\//);}
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.txt':'text/plain','.xml':'application/xml'};
// A separate static host with Cloudflare Pages' URL rules: clean URLs serve <path>.html, unknown paths get 404.html with status 404.
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://local');let file=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':url.pathname));if(!path.extname(file))file+='.html';const send=(status,target)=>{res.writeHead(status,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(res);};if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){send(404,path.join(root,'404.html'));return;}send(200,file);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const report={date:new Date().toISOString(),cases:[],errors:[]};let browser;
try {
 browser=await chromium.launch({executablePath:process.env.CHROME_BIN||(fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined),args:['--no-sandbox']});
 const page=await browser.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/no-such-page'))report.errors.push(`${r.status()} ${r.url()}`);});
 for(const route of ['/','/learn?level=educator','/lesson/maxwell-course?level=university','/simulations?sim=circuits','/entity/gravity','/equations','/#/entity/mass']){
  await page.goto(`${base}${route}`);await page.waitForSelector('#main-slot h1');assert.doesNotMatch(await page.locator('#main-slot').innerText(),/Halaman gagal|tidak ditemukan/);assert.ok(await page.locator('.brand-logo-img').first().evaluate(img=>img.complete&&img.naturalWidth>0));if(route.includes('circuits'))await page.waitForSelector('canvas');
  if(route.startsWith('/#/')){assert.equal(new URL(page.url()).pathname,'/entity/mass');assert.match(await page.locator('#main-slot h1').innerText(),/Mass/);}
  report.cases.push({route,status:'PASS'});
 }
 // In-app navigation uses the History API; the prerendered page is replaced by the live render of the same route.
 await page.goto(`${base}/entity/gravity`);await page.locator('#main-slot a[href="/entity/spacetime"]').first().click();await page.waitForTimeout(100);assert.equal(new URL(page.url()).pathname,'/entity/spacetime');assert.match(await page.locator('#main-slot h1').innerText(),/Spacetime/);await page.goBack();await page.waitForTimeout(100);assert.match(await page.locator('#main-slot h1').innerText(),/Gravita/);
 const missing=await page.goto(`${base}/no-such-page`);assert.equal(missing.status(),404);await page.waitForSelector('#main-slot h1');assert.match(await page.locator('#main-slot').innerText(),/Tidak Ditemukan/);
 assert.deepEqual(report.errors,[]);console.log(`PASS ${report.cases.length} static hosting cases with prerendered pages, legacy hash redirect and the 404 shell`);
} finally {await browser?.close();server.close();fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/deployment.json',JSON.stringify(report,null,2)+'\n');}
