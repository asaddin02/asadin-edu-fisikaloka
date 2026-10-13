import { resolveReference } from '../core/catalog.js';
import { renderSources } from '../components/sources.js';
import { solveEquation } from '../core/solver.js';
// Fisikaloka · Equation Explorer Page with Interactive Variable Inspector & Live Solver

import { PHYSICS_EQUATIONS } from '../data/equations.js';
import { PHYSICS_DOMAINS } from '../data/domains.js';

export function renderEquationsPage(container, params = {}) {
  let selectedEqId = params.id || (PHYSICS_EQUATIONS[0] ? PHYSICS_EQUATIONS[0].id : null);
  let activeEq = PHYSICS_EQUATIONS.find(e => e.id === selectedEqId) || PHYSICS_EQUATIONS[0];
  if (params.id && !PHYSICS_EQUATIONS.some(e => e.id === params.id)) {
    container.innerHTML = '<div class="content-wrap"><h1>Persamaan tidak ditemukan</h1><a href="/equations">Kembali ke daftar</a></div>';
    return;
  }
  let solverInputs = {};

  // Initialize default solver input values
  if (activeEq && activeEq.calculator) {
    activeEq.calculator.inputs.forEach(inp => {
      solverInputs[inp.key] = inp.default;
    });
  }

  function render() {
    let computedResult = null;
    if (activeEq && activeEq.calculator) {
      computedResult = solveEquation(activeEq, solverInputs);
    }

    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 36px; padding-bottom: 80px;">
        <!-- Header -->
        <div style="margin-bottom: 28px;">
          <h1 style="font-size: 2.2rem; margin-bottom: 8px;">Penjelajah Persamaan Fisika (Equation Explorer)</h1>
          <p>Jelajahi setiap variabel, satuan SI, batas keberlakuan, dan hitung langsung nilai numerik secara interaktif.</p>
        </div>

        <div class="dossier-layout" style="display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 28px; align-items: start;">
          <!-- Left Sidebar: Equations List -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 16px; display: flex; flex-direction: column; gap: 6px; max-height: 80vh; overflow-y: auto;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; padding: 6px 10px;">
              Daftar Persamaan Utama:
            </div>
            ${PHYSICS_EQUATIONS.map(eq => `
              <a href="/equations?id=${eq.id}"
                class="sim-tab-item ${eq.id === activeEq.id ? 'active' : ''}" 
                data-eq-id="${eq.id}"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: 3px;"
              >
                <span style="font-weight: 600; font-size: 0.92rem;">${eq.name}</span>
                <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--cyan-bright);">${eq.htmlDisplay}</span>
              </a>
            `).join('')}
          </div>

          <!-- Right Content: Active Equation Dossier & Interactive Inspector -->
          <div>
            ${activeEq ? `
              <div class="equation-card">
                <!-- Title & Domain -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                  <div>
                    <span class="entity-type-badge badge-law" style="margin-bottom: 8px; display: inline-block;">${activeEq.category}</span>
                    <h2 style="font-size: 1.8rem;">${activeEq.name}</h2>
                    <div style="color: var(--cyan-bright); font-weight: 500; font-size: 0.95rem;">${activeEq.indonesianName}</div>
                  </div>
                </div>

                <!-- Equation Display Box -->
                <div class="equation-display-box">
                  <div class="equation-math">${activeEq.htmlDisplay}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
                    Notasi LaTeX: <code>${activeEq.latexDisplay}</code>
                  </div>
                </div>

                <!-- Summary Explanation -->
                <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 24px;">
                  ${activeEq.summary}
                </p>

                <!-- Interactive Variables Inspector -->
                <div style="margin-bottom: 28px;">
                  <h3 style="font-size: 1.15rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
                    <span>🔍</span> Klik & Eksplorasi Variabel Terlibat
                  </h3>
                  <div class="variables-inspector-grid">
                    ${activeEq.variables.map(v => `
                      <a href="${resolveReference(v.quantityId)?.url || '/equations'}" class="variable-pill" style="text-decoration: none; display: flex; flex-direction: column;" title="Buka entitas fisis ${v.name}">
                        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                          <div class="variable-sym">${v.symbol}</div>
                          <span style="font-size: 0.72rem; color: var(--cyan-bright); font-weight: 600;">Lihat Entitas ➔</span>
                        </div>
                        <div class="variable-name">${v.name}</div>
                        <div class="variable-unit">Satuan SI: ${v.unit}</div>
                        <div class="variable-unit">Dimensi: ${v.dimension}</div>
                        <div class="variable-role">${v.role}</div>
                      </a>
                    `).join('')}
                  </div>
                </div>

                <!-- Interactive Live Solver Sandbox -->
                ${activeEq.calculator ? `
                  <div class="equation-solver-box">
                    <h3 style="font-size: 1.15rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; color: var(--cyan-bright);">
                      <span>⚡</span> Simulator & Kalkulator Interaktif Parameter
                    </h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
                      Ubah nilai variabel masukan di bawah ini untuk melihat hasil perhitungan fisis seketika:
                    </p>

                    <div class="solver-inputs-grid">
                      ${activeEq.calculator.inputs.map(inp => `
                        <div class="solver-input-group">
                          <label for="inp-${inp.key}">${inp.label} (${inp.unit}):</label>
                          <input 
                            type="number" 
                            id="inp-${inp.key}" 
                            class="solver-input" 
                            data-key="${inp.key}"
                            value="${solverInputs[inp.key]}"
                            step="any" min="${inp.min}" max="${inp.max}"
                          />
                        </div>
                      `).join('')}
                    </div>

                    <div class="solver-result-box">
                      <div>
                        <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">
                          Hasil ${activeEq.calculator.output.label}:
                        </div>
                        <div class="solver-result-val">
                          ${computedResult} ${activeEq.calculator.output.unit}
                        </div>
                      </div>
                      <div style="font-size: 0.82rem; color: var(--text-muted);">
                        Perhitungan Real-Time
                      </div>
                    </div>
                  </div>
                ` : ''}

                ${renderSources(activeEq)}
                <div class="resource-links">${activeEq.relatedConceptIds.map(resolveReference).filter(Boolean).map(r => `<a href="${r.url}">${r.name}</a>`).join('')}</div>
                <!-- Assumptions & Limitations -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 20px; margin-top: 28px;">
                  <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px;">
                    <h4 style="font-size: 1rem; color: var(--emerald-neon); margin-bottom: 8px;">
                      Asumsi & Kondisi Keberlakuan:
                    </h4>
                    <ul style="padding-left: 18px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                      ${activeEq.assumptions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                  </div>

                  <div style="background: rgba(255, 65, 108, 0.05); border: 1px solid rgba(255, 65, 108, 0.25); border-radius: var(--radius-md); padding: 20px;">
                    <h4 style="font-size: 1rem; color: #b62f2f; margin-bottom: 8px;">
                      Batasan & Kapan Tidak Berlaku:
                    </h4>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
                      ${activeEq.limitations}
                    </p>
                  </div>
                </div>

                <!-- Example Problem & Solution -->
                ${activeEq.exampleProblem ? `
                  <div style="background: rgba(246, 211, 101, 0.05); border: 1px solid rgba(246, 211, 101, 0.25); border-radius: var(--radius-md); padding: 22px; margin-top: 24px;">
                    <h4 style="font-size: 1.05rem; color: var(--amber-solar); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                      <span>📝</span> Contoh Soal Penerapan
                    </h4>
                    <p style="font-weight: 500; font-size: 0.95rem; margin-bottom: 12px; color: var(--text-primary);">
                      ${activeEq.exampleProblem.problem}
                    </p>
                    <div style="background: var(--bg-darker); border-left: 3px solid var(--amber-solar); padding: 12px 16px; border-radius: 4px; font-size: 0.9rem; color: var(--text-secondary);">
                      <strong>Langkah Penyelesaian:</strong><br/>
                      ${activeEq.exampleProblem.solution}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Attach solver input changes
    const inputs = container.querySelectorAll('.solver-input');
    inputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
        const key = e.target.getAttribute('data-key');
        solverInputs[key] = e.target.value === '' ? NaN : Number(e.target.value);
        const resultVal = solveEquation(activeEq, solverInputs);
        const resElem = container.querySelector('.solver-result-val');
        if (resElem) {
          resElem.textContent = `${resultVal} ${activeEq.calculator.output.unit}`;
        }
      });
    });
  }

  render();
}
