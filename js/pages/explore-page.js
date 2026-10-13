import { CATALOG } from '../core/catalog.js';
import { DOMAIN_REFERENCES } from '../data/provenance.js';
import { escapeHTML } from '../core/html.js';
// Fisikaloka · Explore Page (Domain & Entity Atlas)

import { PHYSICS_DOMAINS } from '../data/domains.js';
import { PHYSICS_ENTITIES } from '../data/entities.js';

export function renderExplorePage(container, params = {}) {
  let selectedDomainId = params.domain || 'all';
  let selectedType = params.type || 'all';
  let searchQuery = '';

  function filterEntities() {
    return CATALOG.filter(e => {
      const matchDomain = selectedDomainId === 'all' || e.domainId === selectedDomainId;
      const matchType = selectedType === 'all' || e.entityType.toLowerCase() === selectedType.toLowerCase();
      const matchQuery = !searchQuery ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.indonesianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDomain && matchType && matchQuery;
    });
  }

  function render() {
    const filtered = filterEntities();
    const domain = PHYSICS_DOMAINS.find(d => d.id === selectedDomainId);
    const entityTypes = [
      'Concept', 'Law', 'Principle', 'Quantity', 'Unit', 'Constant', 
      'Equation', 'Phenomenon', 'Particle', 'Field', 'Experiment', 
      'Instrument', 'Theory', 'System', 'Lesson'
    ];

    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 36px; padding-bottom: 80px;">
        <!-- Header -->
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 2.2rem; margin-bottom: 8px;">Jelajahi keterkaitan fisika.</h1>
          <p>Cari pelajaran, konsep, hukum, persamaan, atau fenomena. Pilih bidang dan jenis materi untuk mempersempit penelusuran.</p>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 30px; display: flex; flex-direction: column; gap: 16px;">
          <!-- Search input inside explore -->
          <div style="position: relative;">
            <input 
              type="text" 
              id="explore-search-input" 
              placeholder="Cari entitas, konsep, partikel, atau hukum alam..." 
              value="${escapeHTML(searchQuery)}"
              style="width: 100%; background: var(--bg-darker); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 16px 12px 42px; color: var(--text-primary); font-family: var(--font-body); font-size: 0.95rem; outline: none;"
            />
            <svg style="position: absolute; left: 14px; top: 14px; color: var(--text-muted);" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <!-- Type filter badges -->
          <div>
            <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">
              Filter Berdasarkan Tipe Entitas:
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="entity-type-filters">
              <button class="layer-tab-btn ${selectedType === 'all' ? 'active' : ''}" data-type="all">Semua Tipe</button>
              ${entityTypes.map(t => `
                <button class="layer-tab-btn ${selectedType.toLowerCase() === t.toLowerCase() ? 'active' : ''}" data-type="${t.toLowerCase()}">
                  ${t}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Domain dropdown filter -->
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Domain Fisika:</span>
            <select id="domain-select-filter" aria-label="Filter cabang fisika" style="background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.88rem; outline: none; cursor: pointer;">
              <option value="all" ${selectedDomainId === 'all' ? 'selected' : ''}>Semua 28 Domain Fisika</option>
              ${PHYSICS_DOMAINS.map(d => `
                <option value="${d.id}" ${selectedDomainId === d.id ? 'selected' : ''}>${d.icon} ${d.name} (${d.indonesianName})</option>
              `).join('')}
            </select>
            <span style="margin-left: auto; font-size: 0.85rem; color: var(--cyan-bright); font-weight: 600;">
              Menampilkan ${filtered.length} Entitas Fisis
            </span>
          </div>
        </div>

        ${domain ? `<section class="source-note"><h2>${domain.name}</h2><p>${domain.description}</p><p>Pokok bahasan bidang ini: ${domain.subdomains.join(' · ')}</p><a href="${DOMAIN_REFERENCES[domain.id]}" target="_blank" rel="noopener noreferrer">Rujukan domain</a></section>` : ''}
        <!-- Entities Grid Results -->
        ${filtered.length > 0 ? `
          <div class="entities-grid">
            ${filtered.map(e => `
              <a href="${e.url}" class="entity-card">
                <div class="entity-card-top">
                  <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span class="entity-type-badge badge-${e.entityType.toLowerCase()}">${e.entityType}</span>
                    ${e.scientificStatus ? `
                      <span class="status-badge status-${e.scientificStatus.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
                        ${e.scientificStatus === 'ESTABLISHED SCIENCE' ? '✓ ' : e.scientificStatus === 'ACTIVE RESEARCH' ? '⚡ ' : '❓ '}${e.scientificStatus}
                      </span>
                    ` : ''}
                  </div>
                  ${e.symbol ? `<span class="entity-symbol">${e.symbol}</span>` : ''}
                </div>
                <h3 class="entity-card-title">${e.name}</h3>
                <div class="entity-card-indo">${e.indonesianName}</div>
                <p class="entity-card-summary">${e.summary}</p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: auto;">
                  <span>Domain: <strong>${e.domainId}</strong></span>
                  <span style="color: var(--cyan-bright); font-weight: 600;">Buka Detail ➔</span>
                </div>
              </a>
            `).join('')}
          </div>
        ` : `
          <div style="text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Tidak Ada Entitas yang Cocok</h3>
            <p style="color: var(--text-muted); margin-bottom: 18px;">Coba gunakan kata kunci lain atau reset filter domain.</p>
            <button class="btn-primary" id="reset-filters-btn">Reset Semua Filter</button>
          </div>
        `}
      </div>
    `;

    // Attach listeners
    const searchInput = container.querySelector('#explore-search-input');
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      const newInp = container.querySelector('#explore-search-input');
      newInp?.focus();
      newInp?.setSelectionRange(searchQuery.length, searchQuery.length);
    });

    const domainSelect = container.querySelector('#domain-select-filter');
    domainSelect?.addEventListener('change', (e) => {
      selectedDomainId = e.target.value;
      render();
    });

    const typeButtons = container.querySelectorAll('#entity-type-filters button');
    typeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedType = btn.getAttribute('data-type');
        render();
      });
    });

    const resetBtn = container.querySelector('#reset-filters-btn');
    resetBtn?.addEventListener('click', () => {
      selectedDomainId = 'all';
      selectedType = 'all';
      searchQuery = '';
      render();
    });
  }

  render();
}
