import { renderSources } from '../components/sources.js';
// Phsyco · Landmark Experiments Explorer Page

import { PHYSICS_EXPERIMENTS } from '../data/experiments.js';

export function renderExperimentsPage(container, params = {}) {
  let selectedExpId = params.id || (PHYSICS_EXPERIMENTS[0] ? PHYSICS_EXPERIMENTS[0].id : null);
  let activeExp = PHYSICS_EXPERIMENTS.find(e => e.id === selectedExpId) || PHYSICS_EXPERIMENTS[0];
  if (params.id && !PHYSICS_EXPERIMENTS.some(e => e.id === params.id)) {
    container.innerHTML = '<div class="content-wrap"><h1>Eksperimen tidak ditemukan</h1><a href="/experiments">Kembali ke daftar</a></div>';
    return;
  }

  function render() {
    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 36px; padding-bottom: 80px;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 2.2rem; margin-bottom: 8px;">Ensiklopedia Eksperimen Bersejarah Fisika</h1>
          <p>Bagaimana metode ilmiah, eksperimen presisi, dan anomali laboratorium mengubah pemahaman manusia tentang alam semesta.</p>
        </div>

        <div class="dossier-layout" style="display: grid; grid-template-columns: 310px minmax(0, 1fr); gap: 28px; align-items: start;">
          <!-- Left Sidebar: Experiments List -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 16px; display: flex; flex-direction: column; gap: 6px; max-height: 80vh; overflow-y: auto;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; padding: 6px 10px;">
              Eksperimen Kunci Fisika:
            </div>
            ${PHYSICS_EXPERIMENTS.map(exp => `
              <a href="/experiments?id=${exp.id}"
                class="sim-tab-item ${exp.id === activeExp.id ? 'active' : ''}" 
                data-exp-id="${exp.id}"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: 3px;"
              >
                <span style="font-weight: 600; font-size: 0.92rem;">${exp.name}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${exp.scientist} (${exp.year})</span>
              </a>
            `).join('')}
          </div>

          <!-- Right Content: Active Experiment Dossier -->
          <div>
            ${activeExp ? `
              <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 32px;">
                <!-- Header -->
                <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 20px; margin-bottom: 24px;">
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span class="entity-type-badge badge-experiment">Eksperimen Landmark</span>
                    <span style="font-size: 0.82rem; color: var(--amber-solar); font-weight: 600;">Tahun: ${activeExp.year}</span>
                    <span style="font-size: 0.82rem; color: var(--cyan-bright); font-weight: 600;">Tokoh: ${activeExp.scientist}</span>
                  </div>
                  <h2 style="font-size: 1.85rem; margin-bottom: 4px;">${activeExp.name}</h2>
                  <div style="font-size: 1.05rem; color: var(--text-muted);">${activeExp.indonesianName}</div>
                </div>

                <!-- Objective -->
                <div style="background: rgba(0, 242, 254, 0.05); border-left: 3px solid var(--cyan-bright); padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
                  <strong style="color: var(--cyan-bright); text-transform: uppercase; font-size: 0.82rem;">Tujuan Eksperimen:</strong>
                  <div style="font-size: 1rem; color: var(--text-primary); margin-top: 4px;">${activeExp.objective}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Hukum Terkait: <strong>${activeExp.relatedLaw}</strong></div>
                </div>

                <!-- Setup & Apparatus -->
                <div style="margin-bottom: 24px;">
                  <h3 style="font-size: 1.15rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>🔬</span> Peralatan & Susunan Eksperimen (Apparatus)
                  </h3>
                  <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 14px;">
                    ${activeExp.setupDescription}
                  </p>
                  <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; color: var(--text-secondary);">
                    ${activeExp.apparatus.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>

                <!-- Variables Table -->
                <div style="background: var(--bg-darker); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
                  <h4 style="font-size: 0.95rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">
                    Variabel-Variabel Penelitian:
                  </h4>
                  <div style="font-size: 0.9rem; line-height: 1.7; color: var(--text-secondary);">
                    <div><strong>Variabel Bebas (Independent):</strong> ${activeExp.variables.independent}</div>
                    <div><strong>Variabel Terikat (Dependent):</strong> ${activeExp.variables.dependent}</div>
                    <div><strong>Variabel Kontrol:</strong> ${activeExp.variables.controlled}</div>
                  </div>
                </div>

                <!-- Observations & Results -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 18px; margin-bottom: 24px;">
                  <div style="background: rgba(246, 211, 101, 0.05); border: 1px solid rgba(246, 211, 101, 0.25); border-radius: var(--radius-md); padding: 18px;">
                    <h4 style="font-size: 1rem; color: var(--amber-solar); margin-bottom: 8px;">
                      👁️ Hasil Pengamatan (Observations)
                    </h4>
                    <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                      ${activeExp.observations}
                    </p>
                  </div>

                  <div style="background: rgba(56, 239, 125, 0.05); border: 1px solid rgba(56, 239, 125, 0.25); border-radius: var(--radius-md); padding: 18px;">
                    <h4 style="font-size: 1rem; color: var(--emerald-neon); margin-bottom: 8px;">
                      📊 Hasil Kuantitatif (Results)
                    </h4>
                    <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                      ${activeExp.results}
                    </p>
                  </div>
                </div>

                <!-- Interpretation & Significance -->
                <div style="margin-bottom: 24px;">
                  <h3 style="font-size: 1.15rem; margin-bottom: 10px; color: var(--text-primary);">
                    💡 Interpretasi Fisis & Makna Ilmiah
                  </h3>
                  <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
                    ${activeExp.interpretation}
                  </p>
                </div>

                ${renderSources(activeExp)}
                <!-- Educational Takeaway Analogy Box -->
                <div style="background: linear-gradient(135deg, rgba(112, 40, 228, 0.1) 0%, rgba(0, 242, 254, 0.08) 100%); border: 1px solid rgba(179, 136, 255, 0.3); border-radius: var(--radius-md); padding: 22px;">
                  <h4 style="font-size: 1rem; color: var(--violet-quantum); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                    <span>🎓</span> Penjelasan Pedagogis & Analogi Intuisi
                  </h4>
                  <p style="font-size: 0.92rem; line-height: 1.7; color: var(--text-primary);">
                    ${activeExp.educationalExplanation}
                  </p>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 10px;">
                    <strong>Dampak Sejarah:</strong> ${activeExp.historicalSignificance}
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;


  }

  render();
}
