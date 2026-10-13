import { escapeHTML } from '../core/html.js';
// Fisikaloka · Physical Constants Explorer Page (CODATA & 2019 SI Redefinition)

import { PHYSICAL_CONSTANTS } from '../data/constants.js';

export function renderConstantsPage(container, params = {}) {
  let activeCategory = 'all';
  let searchQuery = '';

  const categories = ['all', ...new Set(PHYSICAL_CONSTANTS.map(c => c.category))];

  function filterConstants() {
    return PHYSICAL_CONSTANTS.filter(c => {
      const matchCat = activeCategory === 'all' || c.category === activeCategory;
      const matchQuery = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.indonesianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }

  function render() {
    const list = filterConstants();

    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 36px; padding-bottom: 80px;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(0, 242, 254, 0.1); border-radius: var(--radius-full); color: var(--cyan-bright); font-size: 0.78rem; font-weight: 700; margin-bottom: 12px;">
            CODATA 2022 & SISTEM SATUAN INTERNASIONAL (SI)
          </div>
          <h1 style="font-size: 2.2rem; margin-bottom: 8px;">Penjelajah Konstanta Fisika Fundamental</h1>
          <p>Nilai baku, ketidakpastian pengukuran, dan signifikansi fisik konstanta universal yang menopang struktur materi alam semesta.</p>
        </div>

        <!-- Filter bar -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 28px; display: flex; flex-direction: column; gap: 14px;">
          <!-- Search input -->
          <input 
            type="text" 
            id="const-search-input" 
            placeholder="Cari berdasarkan simbol (c, h, G, e...), nama konstanta, atau rumus..." 
            value="${escapeHTML(searchQuery)}"
            style="width: 100%; background: var(--bg-darker); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px; color: var(--text-primary); font-size: 0.95rem; outline: none;"
          />

          <!-- Categories -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${categories.map(cat => `
              <button class="layer-tab-btn ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            `).join('')}
          </div>
        </div>

        ${list.length ? '' : '<p role="status">Tidak ada konstanta yang cocok. Ubah pencarian atau kategori.</p>'}
        <!-- Constants Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 20px;">
          ${list.map(c => `
            <div id="constant-${c.id}" tabindex="-1" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column;">
              <!-- Top Row: Symbol & Status -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: var(--cyan-bright); background: rgba(0, 242, 254, 0.1); padding: 4px 12px; border-radius: var(--radius-sm);">
                    ${c.symbol}
                  </span>
                  <div>
                    <h3 style="font-size: 1.15rem; color: var(--text-primary);">${c.name}</h3>
                    <div style="font-size: 0.82rem; color: var(--text-muted);">${c.indonesianName}</div>
                  </div>
                </div>
                ${c.isExact ? `
                  <span style="font-size: 0.68rem; font-weight: 700; background: rgba(56, 239, 125, 0.15); color: var(--emerald-neon); padding: 3px 8px; border-radius: var(--radius-full);">
                    EKSAK / KONVENSI (digit tampilan dapat dibulatkan)
                  </span>
                ` : `
                  <span style="font-size: 0.68rem; font-weight: 700; background: rgba(246, 211, 101, 0.15); color: var(--amber-solar); padding: 3px 8px; border-radius: var(--radius-full);">
                    TERUKUR EXPERIMENTAL
                  </span>
                `}
              </div>

              <!-- Numerical Value Highlight Box -->
              <div style="background: var(--bg-darker); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-sm); padding: 14px; margin: 10px 0; text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">
                  ${c.scientificNotation || c.value}
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--cyan-bright); margin-top: 4px;">
                  ${c.unit}
                </div>
                ${c.alternateUnits ? `
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
                    Setara: ${c.alternateUnits}
                  </div>
                ` : ''}
              </div>

              <!-- Uncertainty & Category -->
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
                <strong>Ketidakpastian:</strong> ${c.uncertainty}<br/>
                <strong>Kategori:</strong> ${c.category}
              </div>

              <!-- Meaning & Significance -->
              <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 14px; flex-grow: 1;">
                ${c.description}
              </p>

              <!-- Related Equations Tags -->
              ${(c.equations && c.equations.length > 0) ? `
                <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: auto;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; font-weight: 600;">
                    Digunakan Dalam Persamaan:
                  </div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${c.equations.map(eq => `<span class="subtag" style="color: var(--cyan-bright); font-family: var(--font-mono);">${eq}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Source Attribution -->
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 10px; font-style: italic;">
                Sumber: <a href="${c.sourceUrl}" target="_blank" rel="noopener noreferrer">${c.source}</a><br/>${c.sourceIdentifier}<br/>Ditinjau: ${c.reviewedAt}${c.scientificStatus ? `<br/>${c.scientificStatus}` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Listeners
    const searchInp = container.querySelector('#const-search-input');
    searchInp?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      const newInp = container.querySelector('#const-search-input');
      newInp?.focus();
      newInp?.setSelectionRange(searchQuery.length, searchQuery.length);
    });

    const catButtons = container.querySelectorAll('.layer-tab-btn');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });
  }

  render();
  if (params.id) {
    const target = container.querySelector(`#constant-${CSS.escape(params.id)}`);
    if (target) requestAnimationFrame(() => { target.scrollIntoView({block:'center'}); target.focus({preventScroll:true}); });
    else container.insertAdjacentHTML('afterbegin', '<p role="status">Konstanta yang diminta tidak ditemukan.</p>');
  }
}
