import { COURSES } from '../data/courses/index.js';
import { resolveReference } from '../core/catalog.js';
import { renderSources } from '../components/sources.js';
import { escapeHTML } from '../core/html.js';
// Fisikaloka · Entity Detail Page (Full Scientific Dossier & 4-Layer Depth)

import { PHYSICS_ENTITIES } from '../data/entities.js';
import { PHYSICS_DOMAINS } from '../data/domains.js';
import { renderLayerToggle } from '../components/layer-toggle.js';
import { appState } from '../core/state.js';
import { showToast } from '../components/toast.js';

export function renderEntityDetailPage(container, params = {}) {
  const entityId = params.id;
  const entity = PHYSICS_ENTITIES.find(e => e.id === entityId);

  if (!entity) {
    container.innerHTML = `
      <div class="content-wrap" style="padding: 80px 20px; text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 12px;">Entitas Fisika Tidak Ditemukan</h2>
        <p style="margin-bottom: 24px;">Entitas '${escapeHTML(entityId)}' belum terdaftar atau telah dipindahkan.</p>
        <a href="/explore" class="btn-primary">Kembali ke Atlas Fisika</a>
      </div>
    `;
    return;
  }

  const domain = PHYSICS_DOMAINS.find(d => d.id === entity.domainId);
  let activeLayer = appState.getState().activeLayer || 'standard';

  function render() {
    const isBookmarked = appState.isBookmarked(entity.id);

    // Layer explanation text mapping
    const layerContent = entity.layers[activeLayer] || entity.layers.standard || entity.summary;
    const layerTitles = {
      simple: 'Lapisan 1: Intuisi & Kehidupan Sehari-hari (Tingkat Dasar)',
      standard: 'Lapisan 2: Perumusan Formal & Kurikulum Sekolah Menengah',
      advanced: 'Lapisan 3: Analisis Matematis Vektor & Kalkulus Tingkat Kuliah',
      deepDive: 'Lapisan 4: Garis Depan Riset, Teori Kuantum/Relativistik & Batas Fisika'
    };
    const layerColors = {
      simple: '#28745a',
      standard: '#b4382b',
      advanced: '#916017',
      deepDive: '#76549b'
    };

    // Find related entities for knowledge graph linking
    const relatedEntities = (entity.relatedEntityIds || [])
      .map(resolveReference)
      .filter(Boolean);

    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 36px; padding-bottom: 80px; max-width: 1080px;">
        <!-- Breadcrumb Navigation -->
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          <a href="/explore" style="color: var(--text-muted);">Atlas</a>
          <span>›</span>
          <a href="/explore?domain=${entity.domainId}" style="color: var(--cyan-bright);">${domain ? domain.name : entity.domainId}</a>
          <span>›</span>
          <span style="color: var(--text-primary); font-weight: 600;">${entity.name}</span>
        </div>

        <!-- Entity Header Dossier Banner -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 28px; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
                <span class="entity-type-badge badge-${entity.entityType.toLowerCase()}">${entity.entityType}</span>
                ${entity.scientificStatus ? `
                  <span class="status-badge status-${entity.scientificStatus.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
                    ${entity.scientificStatus === 'ESTABLISHED SCIENCE' ? '✓ ' : entity.scientificStatus === 'ACTIVE RESEARCH' ? '⚡ ' : '❓ '}${entity.scientificStatus}
                  </span>
                ` : ''}
                ${entity.subdomain ? `<span style="font-size: 0.8rem; color: var(--text-muted);">${entity.subdomain}</span>` : ''}
              </div>
              <h1 style="font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 4px;">${entity.name}</h1>
              <div style="font-size: 1.15rem; color: var(--cyan-bright); font-weight: 600; margin-bottom: 14px;">
                ${entity.indonesianName}
              </div>
            </div>

            <!-- Action buttons: Bookmark & Share -->
            <div style="display: flex; gap: 10px;">
              <button id="bookmark-btn" class="sim-btn ${isBookmarked ? 'sim-btn-active' : ''}">
                ${isBookmarked ? '★ Tersimpan' : '☆ Simpan Entitas'}
              </button>
            </div>
          </div>

          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-top: 12px;">
            ${entity.summary}
          </p>

          ${entity.symbol ? `
            <div style="display: inline-flex; align-items: center; gap: 10px; background: var(--bg-darker); border: 1px solid var(--border-subtle); padding: 8px 16px; border-radius: var(--radius-sm); margin-top: 16px;">
              <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Simbol / Notasi:</span>
              <span style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">${entity.symbol}</span>
            </div>
          ` : ''}
        </div>

        <!-- 4-LAYER INTERACTIVE DEPTH SWITCHER -->
        <div id="layer-switcher-slot"></div>

        <!-- ACTIVE LAYER CONTENT CARD -->
        <div class="layer-content-card" style="border-left: 4px solid ${layerColors[activeLayer]};">
          <div class="layer-badge-indicator" style="background: ${layerColors[activeLayer]}22; color: ${layerColors[activeLayer]};">
            ${layerTitles[activeLayer]}
          </div>
          <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary);">
            ${layerContent}
          </div>
        </div>

        <section class="entity-study-links"><h2>Pelajari dengan contoh & latihan</h2><div class="resource-links">${COURSES.filter(c=>c.domainId===entity.domainId && c.level!=='sd').slice(0,4).map(c=>`<a href="/lesson/${c.id}">${escapeHTML(c.title)} →</a>`).join('')}</div></section>
        <!-- KEY VARIABLES BREAKDOWN (IF APPLICABLE) -->
        ${(entity.keyVariables && entity.keyVariables.length > 0) ? `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 28px;">
            <h3 style="font-size: 1.25rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <span>📐</span> Besaran Fisis & Satuan Terkait
            </h3>
            <div class="variables-inspector-grid">
              ${entity.keyVariables.map(v => `
                <div class="variable-pill">
                  <div class="variable-sym">${v.symbol}</div>
                  <div class="variable-name">${v.name}</div>
                  <div class="variable-unit">Satuan: ${v.unit}</div>
                  <div class="variable-unit">Dimensi: ${v.dimension || '-'}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- COMMON MISCONCEPTIONS BUSTED -->
        ${(entity.commonMisconceptions && entity.commonMisconceptions.length > 0) ? `
          <div style="background: rgba(255, 65, 108, 0.08); border: 1px solid rgba(255, 65, 108, 0.3); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px;">
            <h3 style="font-size: 1.15rem; color: #b62f2f; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span>⚠️</span> Klarifikasi Miskonsepsi Umum
            </h3>
            <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 10px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
              ${entity.commonMisconceptions.map(m => `<li>${m}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- HISTORICAL CONTEXT & REAL WORLD APPLICATIONS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 20px; margin-bottom: 28px;">
          ${entity.historicalContext ? `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px;">
              <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--amber-solar); display: flex; align-items: center; gap: 8px;">
                <span>📜</span> Konteks Sejarah & Penemuan
              </h4>
              <p style="font-size: 0.9rem; line-height: 1.6;">${entity.historicalContext}</p>
            </div>
          ` : ''}

          ${(entity.realWorldApplications && entity.realWorldApplications.length > 0) ? `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px;">
              <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--emerald-neon); display: flex; align-items: center; gap: 8px;">
                <span>🌍</span> Aplikasi Teknologi & Kehidupan Nyata
              </h4>
              <ul style="padding-left: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; color: var(--text-secondary);">
                ${entity.realWorldApplications.map(app => `<li>${app}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        ${renderSources(entity)}
        <!-- KNOWLEDGE GRAPH CONNECTIONS -->
        ${relatedEntities.length > 0 ? `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
                <span>🕸️</span> Jejaring Konsep Terhubung (Knowledge Graph)
              </h3>
              <a href="/graph?focus=${entity.id}" style="font-size: 0.85rem; font-weight: 600;">Lihat Peta Graf Penuh ➔</a>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">
              Fisika adalah satu kesatuan yang utuh. Jelajahi entitas lain yang berinteraksi langsung dengan konsep ini:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${relatedEntities.map(re => `
                <a href="${re.url}" class="variable-pill" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 8px 14px;">
                  <span class="entity-type-badge badge-${re.entityType.toLowerCase()}" style="font-size: 0.65rem;">${re.entityType}</span>
                  <span style="font-weight: 600; color: var(--text-primary);">${re.name}</span>
                  <span style="color: var(--cyan-bright); font-size: 0.8rem;">➔</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Render Layer Toggle Switcher
    const slot = container.querySelector('#layer-switcher-slot');
    if (slot) {
      const toggle = renderLayerToggle(activeLayer, (newLayer) => {
        activeLayer = newLayer;
        appState.setState({ activeLayer: newLayer });
        render();
      });
      slot.appendChild(toggle);
    }

    // Bookmark Toggle Handler
    const bkmBtn = container.querySelector('#bookmark-btn');
    bkmBtn?.addEventListener('click', () => {
      const saved = appState.toggleBookmark(entity.id);
      showToast(saved ? `Disimpan ke entitas favorit: ${entity.name}` : `Dihapus dari favorit: ${entity.name}`);
      render();
    });
  }

  render();
}
