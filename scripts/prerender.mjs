// Fisikaloka · Build-time prerender. One readable HTML body per public page, built from the same data modules the app
// uses, so search engines get real text and <a href> links before JavaScript runs. On boot the app renders the same
// route over this markup. Routes are real paths; ids must be URL-safe because they become file names in dist/.
import {PHYSICS_ENTITIES} from '../js/data/entities.js';
import {PHYSICS_DOMAINS} from '../js/data/domains.js';
import {PHYSICS_EQUATIONS} from '../js/data/equations.js';
import {PHYSICAL_CONSTANTS} from '../js/data/constants.js';
import {PHYSICS_EXPERIMENTS} from '../js/data/experiments.js';
import {PHYSICS_GRAPH_DATA} from '../js/data/graph-data.js';
import {SIMULATIONS} from '../js/data/simulations.js';
import {COURSES,LEVELS,coursesForLevel} from '../js/data/courses/index.js';
import {DEEP_DIVES} from '../js/data/courses/deep-dives.js';
import {topicLabel} from '../js/data/topic-labels.js';
import {resolveReference} from '../js/core/catalog.js';
import {escapeHTML as esc} from '../js/core/html.js';
import {renderHomePage} from '../js/pages/home-page.js';
import {renderAboutPage} from '../js/pages/about-page.js';
import {renderSupportPage} from '../js/pages/support-page.js';
import {navbarHTML} from '../js/components/navbar.js';
import {footerHTML} from '../js/components/footer.js';

const SECTIONS=[['/learn','Jalur belajar'],['/explore','Ensiklopedia fisika'],['/simulations','Laboratorium interaktif'],['/graph','Peta konsep'],['/equations','Persamaan & kalkulator'],['/constants','Konstanta fisika'],['/experiments','Eksperimen bersejarah'],['/about','Tentang & sumber'],['/dukung','Dukung Fisikaloka']];
const text=html=>String(html).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const describe=(...parts)=>{const s=text(parts.filter(Boolean).join(' '));return s.length>158?`${s.slice(0,157).replace(/\s\S*$/,'')}…`:s;};
const paragraphs=t=>t.split(/(?<=[.!?]) (?=[A-ZÀ-Ý“])/).reduce((out,sentence,i)=>{const n=Math.floor(i/3);out[n]=(out[n]||'')+(out[n]?' ':'')+sentence;return out;},[]).map(p=>`<p>${esc(p)}</p>`).join('');
const list=(items,render=esc)=>items?.length?`<ul>${items.map(i=>`<li>${render(i)}</li>`).join('')}</ul>`:'';
const links=items=>items.map(([href,label])=>`<li><a href="${esc(href)}">${esc(label)}</a></li>`).join('');
const crumbs=items=>`<nav class="breadcrumb" aria-label="Jejak halaman">${items.map(([href,label])=>href?`<a href="${esc(href)}">${esc(label)}</a>`:`<span>${esc(label)}</span>`).join('<span>/</span>')}</nav>`;
const domainOf=id=>PHYSICS_DOMAINS.find(d=>d.id===id);
const domainName=id=>domainOf(id)?.indonesianName||id;
const sources=record=>record.sources?.length?`<section class="source-note"><h2>Sumber & ruang lingkup verifikasi</h2>${list(record.sources,s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>${s.scope?` — ${esc(s.scope)}`:''}`)}</section>`:'';
// The home, about and support pages are plain templates; render them with a container stub instead of duplicating text.
const rendered=render=>{const stub={innerHTML:'',querySelector:()=>({addEventListener(){}}),querySelectorAll:()=>[]};render(stub);return stub.innerHTML;};
const assertSafe=id=>{if(!/^[a-z0-9][a-z0-9-]*$/.test(id))throw new Error(`Route id "${id}" is not URL-safe`);return id;};

const entityPage=e=>{
  const domain=domainOf(e.domainId),related=(e.relatedEntityIds||[]).map(resolveReference).filter(Boolean),lessons=COURSES.filter(c=>c.domainId===e.domainId&&c.level!=='sd').slice(0,4);
  const layers=[['simple','Intuisi & kehidupan sehari-hari'],['standard','Perumusan formal (sekolah menengah)'],['advanced','Analisis matematis (tingkat kuliah)'],['deepDive','Garis depan riset & batas fisika']];
  return {route:`/entity/${assertSafe(e.id)}`,type:'Article',description:describe(e.summary),
    main:`<article class="content-wrap">${crumbs([['/','Beranda'],['/explore','Jelajah'],[`/explore?domain=${e.domainId}`,domainName(e.domainId)],[null,e.name]])}
<header><p>${esc(e.entityType)}${e.scientificStatus?` · ${esc(e.scientificStatus)}`:''}${e.subdomain?` · ${esc(e.subdomain)}`:''}</p><h1>${e.indonesianName}</h1><p><strong>${e.name}</strong>${e.symbol?` · Simbol: <code>${e.symbol}</code>`:''}</p><p>${e.summary}</p></header>
${layers.filter(([key])=>e.layers?.[key]).map(([key,title])=>`<section><h2>${title}</h2><p>${e.layers[key]}</p></section>`).join('')}
${e.keyVariables?.length?`<section><h2>Besaran fisis & satuan terkait</h2>${list(e.keyVariables,v=>`<strong>${v.symbol}</strong> ${v.name} — satuan ${v.unit}${v.dimension?`, dimensi ${v.dimension}`:''}`)}</section>`:''}
${e.commonMisconceptions?.length?`<section><h2>Klarifikasi miskonsepsi umum</h2>${list(e.commonMisconceptions,m=>m)}</section>`:''}
${e.historicalContext?`<section><h2>Konteks sejarah & penemuan</h2><p>${e.historicalContext}</p></section>`:''}
${e.realWorldApplications?.length?`<section><h2>Aplikasi teknologi & kehidupan nyata</h2>${list(e.realWorldApplications,a=>a)}</section>`:''}
${lessons.length?`<section><h2>Pelajari dengan contoh & latihan</h2><ul>${links(lessons.map(c=>[`/lesson/${c.id}`,c.title]))}</ul></section>`:''}
${sources(e)}
${related.length?`<section><h2>Jejaring konsep terhubung</h2><ul>${links(related.map(r=>[r.url,`${r.entityType}: ${r.name}`]))}</ul><p><a href="/graph?focus=${esc(e.id)}">Lihat peta konsep</a> · <a href="/explore?domain=${esc(e.domainId)}">Semua entitas ${esc(domainName(e.domainId))}</a>${domain?` · Bidang: ${esc(domain.name)}`:''}</p></section>`:''}
</article>`};
};

const lessonPage=c=>{
  const level=LEVELS.find(l=>l.id===c.level),path=coursesForLevel(level.id),index=path.findIndex(x=>x.id===c.id),previous=index>0?path[index-1]:null,next=index>=0?path[index+1]:null;
  const related=PHYSICS_ENTITIES.filter(e=>e.domainId===c.domainId).slice(0,5),deep=DEEP_DIVES[c.id];
  return {route:`/lesson/${assertSafe(c.id)}`,type:'LearningResource',level,minutes:c.minutes,description:describe(c.intuition),
    main:`<article class="content-wrap lesson-shell">${crumbs([['/','Beranda'],['/learn','Belajar'],[`/learn?level=${level.id}`,level.label],[null,c.title]])}
<header class="reader-header"><p>${esc(level.label)} · ${c.minutes} menit · ${esc(domainName(c.domainId))}</p><h1>${esc(c.title)}</h1><p>${esc(c.intuition)}</p></header>
<section><h2>Yang akan kamu pelajari</h2>${list(c.topics,t=>esc(topicLabel(t)))}</section>
<section><h2>Pahami konsepnya</h2>${paragraphs(c.explanation)}</section>
<section><h2>Analisis lanjut</h2>${paragraphs(c.advanced)}</section>
${deep?`<section><h2>Pendalaman: ${esc(deep.title)}</h2>${paragraphs(deep.text)}</section>`:''}
<section><h2>Contoh terurai</h2>${paragraphs(c.example)}</section>
<section><h2>Coba, amati, jelaskan</h2>${paragraphs(c.activity)}${c.sim?`<p><a href="/simulations?sim=${esc(c.sim)}">Buka percobaan terkait di laboratorium</a></p>`:''}</section>
<section><h2>Cek pemahaman</h2><p>${esc(c.question)}</p>${list([c.answer,...c.distractors].sort())}<p>Jawab dan baca pembahasannya di aplikasi.</p></section>
<section class="reader-sources"><h2>Sumber & bacaan lanjutan</h2><p><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(new URL(c.url).hostname)} · Rujukan ${esc(c.title)}</a></p>${related.length?`<h3>Telusuri konsep terkait</h3><ul>${links(related.map(e=>[`/entity/${e.id}`,e.indonesianName]))}</ul>`:''}</section>
<nav aria-label="Pelajaran lain"><ul>${links([previous&&[`/lesson/${previous.id}`,`Sebelumnya: ${previous.title}`],next&&[`/lesson/${next.id}`,`Berikutnya: ${next.title}`],[`/learn?level=${level.id}`,`Semua pelajaran ${level.label}`]].filter(Boolean))}</ul></nav>
</article>`};
};

const learnPage=()=>({route:'/learn',description:'Jalur belajar fisika Fisikaloka untuk SD, SMP, SMA, universitas dan pengajar: pelajaran dengan intuisi, penjelasan, contoh terurai, aktivitas dan latihan.',
  main:`<div class="content-wrap study-hub"><header class="page-heading"><h1>Belajar dengan caramu.</h1><p>Pilih jenjang, pahami konsep, lalu uji pemahamanmu. Semua jalur dapat dijelajahi tanpa terkunci.</p></header>
${LEVELS.map(l=>{const path=coursesForLevel(l.id);return `<section id="level-${l.id}"><h2>${esc(l.label)} — ${esc(l.title)}</h2><p>${esc(l.description)} <a href="/learn?level=${l.id}">Buka jalur ${esc(l.label)}</a> · ${path.length} pelajaran.</p><ol>${path.map(c=>`<li><a href="/lesson/${c.id}">${esc(c.title)}</a> — ${esc(c.intuition)}</li>`).join('')}</ol></section>`;}).join('')}
</div>`});

const explorePage=()=>({route:'/explore',description:'Atlas fisika Fisikaloka: 28 bidang dari fondasi pengukuran hingga kosmologi dengan dossier konsep, hukum, besaran, partikel, persamaan dan eksperimen.',
  main:`<div class="content-wrap"><header><h1>Jelajahi keterkaitan fisika.</h1><p>Cari pelajaran, konsep, hukum, persamaan, atau fenomena. Pilih bidang untuk mempersempit penelusuran.</p></header>
${PHYSICS_DOMAINS.map(d=>{const items=[...PHYSICS_ENTITIES.filter(e=>e.domainId===d.id).map(e=>[`/entity/${e.id}`,`${e.indonesianName} (${e.name})`]),...PHYSICS_EQUATIONS.filter(e=>e.domainId===d.id).map(e=>[`/equations?id=${e.id}`,`Persamaan: ${e.indonesianName}`]),...PHYSICS_EXPERIMENTS.filter(e=>e.domainId===d.id).map(e=>[`/experiments?id=${e.id}`,`Eksperimen: ${e.indonesianName}`])];
  return `<section id="domain-${d.id}"><h2>${d.icon} ${esc(d.indonesianName)}</h2><p><strong>${esc(d.name)}</strong> · ${esc(d.description)} <a href="/explore?domain=${d.id}">Saring bidang ini</a>.</p>${items.length?`<ul>${links(items)}</ul>`:''}</section>`;}).join('')}
</div>`});

const equationsPage=()=>({route:'/equations',description:'Persamaan fisika dengan variabel, satuan, asumsi dan kalkulator interaktif: hukum Newton, energi kinetik, hukum Ohm, persamaan Maxwell, Schrödinger dan lainnya.',
  main:`<div class="content-wrap"><header><h1>Persamaan & kalkulator</h1><p>Setiap persamaan menjelaskan variabel, satuan, asumsi dan batas penerapannya. Kalkulator interaktif tersedia di aplikasi.</p></header>
${PHYSICS_EQUATIONS.map(eq=>`<section id="eq-${eq.id}"><h2><a href="/equations?id=${eq.id}">${esc(eq.indonesianName)}</a></h2><p><strong>${esc(eq.name)}</strong> · ${esc(domainName(eq.domainId))}</p><p class="equation-display">${eq.htmlDisplay||esc(eq.latexDisplay)}</p><p>${esc(eq.summary)}</p><h3>Variabel</h3>${list(eq.variables,v=>{const ref=resolveReference(v.quantityId);return `<strong>${v.symbol}</strong> ${esc(v.name)} — ${esc(v.unit)}${ref?` (<a href="${ref.url}">${esc(ref.indonesianName||ref.name)}</a>)`:''}`;})}${eq.assumptions?.length?`<h3>Asumsi</h3>${list(eq.assumptions)}`:''}</section>`).join('')}
</div>`});

const constantsPage=()=>({route:'/constants',description:'Konstanta fisika CODATA 2022 dan SI 2019: kelajuan cahaya, konstanta Planck, gravitasi, muatan elementer, massa elektron, konstanta Boltzmann dan lainnya.',
  main:`<div class="content-wrap"><header><h1>Konstanta fisika</h1><p>Nilai, satuan, ketidakpastian dan makna setiap konstanta beserta sumber rujukannya.</p></header>
${PHYSICAL_CONSTANTS.map(c=>`<section id="constant-${c.id}"><h2><a href="/constants?id=${c.id}">${esc(c.indonesianName)}</a></h2><p><strong>${esc(c.name)}</strong> (<code>${esc(c.symbol)}</code>) = ${esc(c.value)} ${esc(c.unit)}${c.isExact?' · nilai eksak':''} · ${esc(c.category)}</p><p>${esc(c.description)}</p>${c.significance?`<p>${esc(c.significance)}</p>`:''}${c.equations?.length?`<p>Persamaan terkait: ${c.equations.map(esc).join('; ')}</p>`:''}</section>`).join('')}
</div>`});

const experimentsPage=()=>({route:'/experiments',description:'Dossier eksperimen bersejarah fisika: celah ganda Young, tetes minyak Millikan, efek fotolistrik dan lainnya dengan alat, variabel, hasil dan interpretasi.',
  main:`<div class="content-wrap"><header><h1>Kisah eksperimen</h1><p>Eksperimen penentu dalam sejarah fisika: tujuan, alat, variabel, pengamatan, hasil dan interpretasinya.</p></header>
${PHYSICS_EXPERIMENTS.map(x=>`<section id="experiment-${x.id}"><h2><a href="/experiments?id=${x.id}">${esc(x.indonesianName)}</a></h2><p><strong>${esc(x.name)}</strong> · ${esc(x.scientist)} · ${esc(x.year)} · ${esc(domainName(x.domainId))}</p><h3>Tujuan</h3><p>${esc(x.objective)}</p><h3>Hasil</h3><p>${esc(x.results)}</p><h3>Interpretasi</h3><p>${esc(x.interpretation)}</p>${x.educationalExplanation?`<p>${esc(x.educationalExplanation)}</p>`:''}</section>`).join('')}
</div>`});

const simulationsPage=()=>({route:'/simulations',description:'13 laboratorium fisika interaktif: gerak parabola, bandul, Doppler, celah ganda, medan listrik, gaya Lorentz, optika, Carnot, relativitas, orbit, atom Bohr, Venturi dan rangkaian DC.',
  main:`<div class="content-wrap"><header><h1>Laboratorium interaktif</h1><p>Ubah parameter, amati hasilnya, dan bandingkan dengan model. Setiap lab menampilkan asumsi serta batas modelnya; simulasi berjalan di browser dengan JavaScript.</p></header><ul>${SIMULATIONS.map(s=>`<li><a href="/simulations?sim=${s.id}">${s.icon} ${esc(s.title)}</a> — ${esc(s.category)}</li>`).join('')}</ul>
<p>Pelajaran yang terhubung dengan laboratorium:</p><ul>${links(COURSES.filter(c=>c.sim).map(c=>[`/lesson/${c.id}`,c.title]))}</ul></div>`});

const graphPage=()=>({route:'/graph',description:'Peta konsep fisika Fisikaloka: 45 simpul dan 51 relasi yang menghubungkan besaran, hukum, teori dan bidang dari mekanika Newton hingga relativitas umum.',
  main:`<div class="content-wrap"><header><h1>Peta konsep fisika</h1><p>Graf interaktif yang menghubungkan konsep, besaran dan hukum. Simpul-simpulnya adalah dossier yang dapat dibaca satu per satu.</p></header><ul>${links(PHYSICS_GRAPH_DATA.nodes.map(n=>{const ref=resolveReference(n.id);return ref&&[ref.url,n.label];}).filter(Boolean))}</ul></div>`});

const homePage=()=>({route:'/',description:'Fisikaloka: platform ensiklopedia fisika interaktif dan laboratorium virtual terbuka dari tingkat SD, SMP, SMA, universitas, hingga pengajar. Menjelajahi realitas fisik materi, energi, gaya, gelombang, relativitas, dan kuantum.',
  main:`${rendered(renderHomePage)}<section class="content-wrap home-section"><h2>Apa yang ada di Fisikaloka</h2><p>${COURSES.length} pelajaran dengan latihan, ${PHYSICS_ENTITIES.length} dossier entitas fisika, ${PHYSICS_EQUATIONS.length} persamaan, ${PHYSICAL_CONSTANTS.length} konstanta, ${PHYSICS_EXPERIMENTS.length} eksperimen bersejarah dan ${SIMULATIONS.length} laboratorium interaktif dalam bahasa Indonesia.</p><ul>${links(SECTIONS)}</ul><h3>Jalur belajar</h3><ul>${links(LEVELS.map(l=>[`/learn?level=${l.id}`,`${l.label} — ${l.title}`]))}</ul><h3>Bidang fisika</h3><ul>${links(PHYSICS_DOMAINS.map(d=>[`/explore?domain=${d.id}`,d.indonesianName]))}</ul></section>`});

export const SHELL_NAV=navbarHTML();
export const SHELL_FOOTER=footerHTML();
export function prerenderPages(){
  const pages=[homePage(),learnPage(),explorePage(),equationsPage(),constantsPage(),experimentsPage(),simulationsPage(),graphPage(),
    {route:'/about',description:'Tentang Fisikaloka: ensiklopedia, ruang belajar dan laboratorium fisika Asadin Edu untuk semua jenjang, dengan sumber yang dapat ditelusuri dan status bukti ilmiah yang jelas.',main:rendered(renderAboutPage)},
    {route:'/dukung',description:'Dukung Fisikaloka: ruang belajar fisika gratis tanpa iklan. Donasi sukarela melalui Saweria atau Ko-fi membantu operasional dan pengembangan materi.',main:rendered(renderSupportPage)},
    ...PHYSICS_ENTITIES.map(entityPage),...COURSES.map(lessonPage)];
  for(const page of pages){
    const h1=text(page.main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||'');
    page.title=page.route==='/'?'Fisikaloka — Ensiklopedia Fisika Interaktif & Platform Pembelajaran':`${h1} — Fisikaloka`;
    page.heading=h1;
  }
  return pages;
}
// Structured data: breadcrumbs everywhere, Article for entities and LearningResource for lessons.
const ORG={'@type':'Organization','@id':'https://asadinedu.com/#organization',name:'Asadin Edu',url:'https://asadinedu.com/'};
export function jsonLd(page,siteURL){
  const url=siteURL+page.route,crumbs=[['/','Beranda'],...(page.route.startsWith('/entity/')?[['/explore','Jelajah']]:page.route.startsWith('/lesson/')?[['/learn','Belajar']]:[]),[page.route,page.heading]];
  const data=[{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map(([path,name],i)=>({'@type':'ListItem',position:i+1,name,item:siteURL+path}))}];
  if(page.route==='/')data.push({'@context':'https://schema.org','@type':'WebSite',name:'Fisikaloka',url:siteURL+'/',inLanguage:'id',description:page.description,publisher:ORG});
  if(page.type)data.push({'@context':'https://schema.org','@type':page.type,name:page.heading,headline:page.heading,description:page.description,inLanguage:'id',url,mainEntityOfPage:url,
    author:ORG,publisher:ORG,
    ...(page.type==='LearningResource'?{learningResourceType:'Pelajaran',educationalLevel:page.level.label,timeRequired:`PT${page.minutes}M`,isAccessibleForFree:true}:{})});
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g,'\\u003c')}</script>`;
}
