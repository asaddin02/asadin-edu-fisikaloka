import { appState } from '../core/state.js';
import { icon } from './icons.js';
export const navbarHTML=()=>`<a class="skip-link" href="#main-slot">Lewati ke konten</a><header class="navbar"><div class="nav-container">
    <a href="/" class="brand-link" id="nav-brand"><img src="/assets/brand/logo-ai.png" alt="" class="brand-logo-img" width="44" height="44"><span class="brand-title-box"><span class="brand-name">Fisikaloka<span>.</span></span><span class="brand-sub">Teman belajar fisika</span></span></a>
    <nav aria-label="Navigasi utama"><ul class="nav-links" id="main-nav-links">${[['/','home','Beranda'],['/learn','book','Belajar'],['/explore','compass','Jelajah'],['/simulations','flask','Laboratorium'],['/graph','graph','Peta Konsep']].map(([route,name,label])=>`<li><a href="${route}" class="nav-link" data-nav="${name}">${icon(name,18)}${label}</a></li>`).join('')}
    <li class="nav-more"><details><summary>Referensi</summary><div><a href="/equations">Persamaan</a><a href="/constants">Konstanta</a><a href="/experiments">Eksperimen</a><a href="/dukung">Dukung Fisikaloka</a><a href="/about">Tentang & sumber</a></div></details></li></ul></nav>
    <div class="nav-actions"><button class="search-trigger-btn" id="global-search-btn" aria-label="Cari materi fisika" title="Cari materi (tekan /)">${icon('search')}<span>Cari materi</span><kbd>/</kbd></button><a href="/learn" class="nav-learn">Mulai belajar ${icon('arrow',16)}</a><button class="mobile-menu-btn" id="mobile-menu-btn" aria-controls="main-nav-links" aria-expanded="false" aria-label="Buka menu">${icon('menu')}</button></div>
  </div></header>`;
export function renderNavbar(container) {
  container.innerHTML=navbarHTML();
  const menu=container.querySelector('#mobile-menu-btn');menu.addEventListener('click',()=>{const open=container.querySelector('#main-nav-links').classList.toggle('mobile-open');menu.setAttribute('aria-expanded',String(open));});
  container.querySelector('#global-search-btn').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('open-search')));
  window.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();window.dispatchEvent(new CustomEvent('open-search'));}});
  container.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();document.querySelector('#main-slot').focus();});
}
