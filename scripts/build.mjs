import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {prerenderPages,jsonLd,SHELL_NAV,SHELL_FOOTER} from './prerender.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
// SITE_URL=https://example.org adds absolute canonical, link-preview and sitemap URLs. The app uses real paths
// ("/entity/gravity") with absolute asset URLs, so it must be served from the origin root, not a subdirectory.
const siteURL=(process.env.SITE_URL||'').replace(/\/+$/,'');
if(siteURL&&!/^https:\/\/[^/?#]+$/.test(siteURL))throw new Error(`SITE_URL must be an origin like https://example.org, got "${siteURL}"`);
// Search engines: GOOGLE_SITE_VERIFICATION (the content of Search Console's meta tag, or the whole tag) proves ownership.
const verificationInput=(process.env.GOOGLE_SITE_VERIFICATION||'').trim();
const verification=verificationInput.match(/content="([^"]*)"/)?.[1]??verificationInput;
if(verificationInput&&!/^[\w-]{20,100}$/.test(verification))throw new Error('GOOGLE_SITE_VERIFICATION must be the content of the google-site-verification meta tag');
await fs.rm(output,{recursive:true,force:true});
await fs.mkdir(output,{recursive:true});
for(const name of ['manifest.webmanifest','css','js','assets'])await fs.cp(path.join(root,name),path.join(output,name),{recursive:true});

// Every page is the index.html shell with its own head tags and the nav, main and footer slots prefilled.
const shell=await fs.readFile(path.join(root,'index.html'),'utf8');
for(const anchor of ['<title>','<meta name="description" content="','<meta property="og:title" content="','<meta property="og:description" content="','<meta property="og:type" content="website">','<div id="nav-slot"></div>','<main tabindex="-1" id="main-slot" class="site-main"></main>','<div id="footer-slot"></div>'])
  if(!shell.includes(anchor))throw new Error(`index.html changed (${anchor}); update scripts/build.mjs`);
const attr=value=>value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const document=({route,title,description,main,head='',robots='',canonical=true})=>shell
  .replace(/<title>[^<]*<\/title>/,`<title>${attr(title)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/,`$1${attr(description)}`)
  .replace(/(<meta property="og:title" content=")[^"]*/,`$1${attr(title)}`)
  .replace(/(<meta property="og:description" content=")[^"]*/,`$1${attr(description)}`)
  .replace('<meta property="og:type" content="website">',`<meta property="og:type" content="website">${robots}${siteURL&&canonical?`\n  <meta property="og:url" content="${siteURL}${route}">\n  <meta property="og:image" content="${siteURL}/assets/brand/icon-512.png">\n  <link rel="canonical" href="${siteURL}${route}">`:''}`)
  .replace('</head>',`${head}${verification?`  <meta name="google-site-verification" content="${verification}">\n`:''}</head>`)
  .replace('<div id="nav-slot"></div>',`<div id="nav-slot">${SHELL_NAV}</div>`)
  .replace('<main tabindex="-1" id="main-slot" class="site-main"></main>',`<main tabindex="-1" id="main-slot" class="site-main">${main}</main>`)
  .replace('<div id="footer-slot"></div>',`<div id="footer-slot">${SHELL_FOOTER}</div>`);

// Cloudflare Pages serves dist/entity/gravity.html at /entity/gravity (and redirects the .html and trailing-slash forms).
const pages=prerenderPages();
for(const page of pages){
  const file=path.join(output,page.route==='/'?'index.html':`${page.route.slice(1)}.html`);
  await fs.mkdir(path.dirname(file),{recursive:true});
  await fs.writeFile(file,document({...page,head:siteURL?`  ${jsonLd(page,siteURL)}\n`:''}));
}
// Unknown paths get the app shell with a 404 status (Cloudflare Pages serves 404.html automatically); the app shows its own 404 page.
await fs.writeFile(path.join(output,'404.html'),document({route:'/404',title:'Halaman tidak ditemukan · Fisikaloka',description:'Alamat ini tidak ada di Fisikaloka.',main:'<div class="content-wrap"><h1>Halaman tidak ditemukan</h1><p>Alamat ini tidak ada di Fisikaloka.</p><p><a href="/">Kembali ke beranda Fisikaloka</a></p></div>',robots:'\n  <meta name="robots" content="noindex">',canonical:false}));
const today=new Date().toISOString().slice(0,10);
if(siteURL)await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${siteURL}${p.route}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
// Cloudflare Pages and Netlify read _headers; the policy matches server/server.mjs.
await fs.writeFile(path.join(output,'_headers'),`/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
`);
await fs.writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\n${siteURL?`\nSitemap: ${siteURL}/sitemap.xml\n`:''}`);
console.log(`Static deployment package: dist/ with ${pages.length} prerendered pages${siteURL?`, canonical URLs and sitemap for ${siteURL}`:''}`);
