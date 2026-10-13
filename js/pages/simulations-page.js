import { navigate } from '../core/router.js';
import { SIMULATIONS } from '../data/simulations.js';
import { CircuitSimulation } from '../simulations/circuit-sim.js';
// Fisikaloka · Interactive Virtual Physics Lab Hub (12 High-Precision Simulators)

import { ProjectileSimulation } from '../simulations/projectile-sim.js';
import { PendulumSimulation } from '../simulations/pendulum-sim.js';
import { WaveDopplerSimulation } from '../simulations/wave-doppler-sim.js';
import { DoubleSlitSimulation } from '../simulations/double-slit-sim.js';
import { ElectricFieldSimulation } from '../simulations/electric-field-sim.js';
import { LorentzForceSimulation } from '../simulations/lorentz-force-sim.js';
import { OpticsRaySimulation } from '../simulations/optics-ray-sim.js';
import { ThermodynamicsSimulation } from '../simulations/thermodynamics-sim.js';
import { RelativitySimulation } from '../simulations/relativity-sim.js';
import { OrbitalGravitySimulation } from '../simulations/orbital-gravity-sim.js';
import { BohrAtomSimulation } from '../simulations/bohr-atom-sim.js';
import { BernoulliFluidSimulation } from '../simulations/bernoulli-fluid-sim.js';

export function renderSimulationsPage(container, params = {}) {
  const simClasses = { 'circuits': CircuitSimulation, 'projectile': ProjectileSimulation, 'pendulum': PendulumSimulation, 'wave-doppler': WaveDopplerSimulation, 'double-slit': DoubleSlitSimulation, 'electric-field': ElectricFieldSimulation, 'lorentz-force': LorentzForceSimulation, 'optics': OpticsRaySimulation, 'thermodynamics': ThermodynamicsSimulation, 'relativity': RelativitySimulation, 'orbital-gravity': OrbitalGravitySimulation, 'bohr-atom': BohrAtomSimulation, 'bernoulli-fluid': BernoulliFluidSimulation };
  const simList = SIMULATIONS.map(sim => ({ ...sim, SimClass: simClasses[sim.id] }));

  let activeSimMeta = simList.find(s => s.id === params.sim) || simList.find(s => s.id === 'projectile');
  let activeSimInstance = null;

  function cleanupActiveSim() {
    if (activeSimInstance && activeSimInstance.destroy) {
      activeSimInstance.destroy();
      activeSimInstance = null;
    }
  }

  function render() {
    cleanupActiveSim();

    container.innerHTML = `
      <div class="content-wrap" style="padding-top: 32px; padding-bottom: 80px;">
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(0, 242, 254, 0.1); border-radius: var(--radius-full); color: var(--cyan-bright); font-size: 0.78rem; font-weight: 700; margin-bottom: 10px;">
            LABORATORIUM FISIKA INTERAKTIF — MODEL EDUKATIF
          </div>
          <h1 style="font-size: 2.2rem; margin-bottom: 6px;">Laboratorium Virtual & Simulasi Interaktif</h1>
          <p>Ubah variabel fisis, amati grafik dan vektor seketika, serta uji hipotesis ilmiah Anda secara visual.</p>
        </div>

        <div class="sim-hub-layout">
          <label class="sim-mobile-picker">Pilih modul simulasi
            <select id="sim-mobile-select">${simList.map(sim => `<option value="${sim.id}" ${sim.id === activeSimMeta.id ? 'selected' : ''}>${sim.title}</option>`).join('')}</select>
          </label>
          <!-- Sidebar: simulation picker -->
          <div class="sim-sidebar">
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; padding: 6px 12px;">
              Pilih Modul Simulasi:
            </div>
            ${simList.map(sim => `
              <a href="/simulations?sim=${sim.id}"
                class="sim-tab-item ${sim.id === activeSimMeta.id ? 'active' : ''}" 
                data-sim-id="${sim.id}"
              >
                <span class="sim-tab-icon">${sim.icon}</span>
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 0.88rem; font-weight: 600;">${sim.title}</span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${sim.category}</span>
                </div>
              </a>
            `).join('')}
          </div>

          <!-- Main Stage: Simulation Arena -->
          <div class="sim-stage-container">
            <!-- Stage Header -->
            <div class="sim-stage-header">
              <div class="sim-title-group">
                <h2>${activeSimMeta.icon} ${activeSimMeta.title}</h2>
                <p>Kategori: <strong>${activeSimMeta.category}</strong></p>
              </div>
              <div class="sim-header-actions" id="sim-top-actions">
                <!-- Action buttons will be injected here -->
              </div>
            </div>

            <!-- Viewport Canvas & Telemetry HUD -->
            <div class="sim-canvas-wrap">
              <canvas class="sim-canvas" id="sim-viewport-canvas"></canvas>
              <div class="sim-hud-overlay" id="sim-telemetry-hud"></div>
            </div>

            <!-- Controls Panel & Sliders -->
            <div class="sim-controls-panel" id="sim-dynamic-controls">
              <!-- Sliders will be injected here -->
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#sim-mobile-select').addEventListener('change', e => { navigate(`/simulations?sim=${e.target.value}`); });

    // Initialize the canvas and simulator
    const canvas = container.querySelector('#sim-viewport-canvas');
    const hud = container.querySelector('#sim-telemetry-hud');
    const controlsWrap = container.querySelector('#sim-dynamic-controls');
    const topActions = container.querySelector('#sim-top-actions');

    activeSimInstance = new activeSimMeta.SimClass();
    activeSimInstance.init(canvas, hud);

    // Build specific control sliders for the active simulator
    buildControlsForSim(activeSimMeta.id, activeSimInstance, controlsWrap, topActions);

    const notes = {
      projectile:'Model partikel 2D, g konstan; hambatan kuadratik a_drag = −k|v|v dengan k bersatuan m⁻¹. Skala gambar menyesuaikan jangkauan tanpa hambatan.',
      pendulum:'Bandul titik dengan tali tanpa massa; gerak memakai sin θ. T₀ = 2π√(L/g) adalah pendekatan sudut kecil, bukan periode eksak amplitudo besar.',
      'wave-doppler':'Muka gelombang dalam medium diam homogen. Rumus frekuensi depan hanya berlaku subsonik; kerucut Mach menggambarkan geometri supersonik. Demonstrasi ini tidak mengeluarkan audio.',
      'double-slit':'Dua celah ideal koheren, pendekatan sudut kecil: Δy = λD/d. Lebar celah dan selubung difraksi tidak dimodelkan; muka gelombang digambar secara skematis.',
      'electric-field':'Superposisi medan Coulomb yang dilunakkan dekat muatan; satuan gambar arbitrer. Muatan uji memakai redaman visual. Maksimum 30 muatan; tombol bersihkan juga bekerja pada ponsel.',
      'lorentz-force':'Partikel ilustratif q = ±1 C, m = 1 kg; bukan elektron/proton. B seragam, E = 0, tanpa radiasi. Gerak analitik mempertahankan kelajuan; 1 meter = 1 piksel pada skala gambar.',
      optics:'Optika sinar untuk medium isotropik dan lensa tipis paraaksial; ukuran lensa dalam satuan gambar. Bayangan sangat jauh dapat berada di luar viewport, nilai jaraknya tetap tersedia.',
      thermodynamics:'Gas ideal monoatomik n = 1 mol, γ = 5/3, V_A = 0.01 m³, V_B/V_A = 2. Kurva isotermal PV = nRT dan adiabatik PV^γ konstan. Q_H = nRT_H ln 2; sumbu menyesuaikan rentang.',
      relativity:'Dua jam ditampilkan dalam kerangka laboratorium inersial: Δτ = Δt/γ, L = L₀/γ. Pengubahan slider memulai kondisi kelajuan baru; gambar wahana bersifat ilustratif.',
      'orbital-gravity':'Model dua benda dengan pusat tetap; parameter massa mewakili GM dalam satuan simulasi. Tanpa gangguan planet lain atau koreksi relativistik; orbit keluar layar tetap dapat dilacak lewat telemetri.',
      'bohr-atom':'Model Bohr hidrogen: E_n ≈ −13.6/n² eV. Orbit adalah ilustrasi, bukan lintasan elektron dalam mekanika kuantum; jarak dan warna UV tidak berskala fisik. Pembulatan model berbeda dari spektroskopi presisi.',
      'bernoulli-fluid':'Aliran tunak horizontal, tak termampatkan, tanpa viskositas. A₁v₁ = A₂v₂; ΔP = ρ(v₂²−v₁²)/2. Kolom tekanan adalah ilustrasi kualitatif, bukan manometer berskala.',
      circuits:'Sumber DC ideal dan dua resistor ohmik pada suhu tetap. Seri: I sama; paralel: V sama. Nilai berasal dari hukum Ohm dan Kirchhoff, tanpa efek pemanasan atau transien.'
    };
    const note=document.createElement('div'); note.className='sim-explanation';
    note.textContent=notes[activeSimMeta.id]; container.querySelector('.sim-stage-container').appendChild(note);
    if (activeSimMeta.id !== 'circuits') {
      const pause=document.createElement('button'); pause.className='sim-btn'; pause.id='sim-pause'; pause.textContent='Jeda animasi';
      pause.setAttribute('aria-pressed','false');
      pause.addEventListener('click',()=>{activeSimInstance.animationPaused=!activeSimInstance.animationPaused; pause.textContent=activeSimInstance.animationPaused?'Lanjutkan animasi':'Jeda animasi';pause.setAttribute('aria-pressed',String(activeSimInstance.animationPaused));});
      topActions.parentElement.appendChild(pause);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) pause.click();
    }
    labelControls(controlsWrap);

  }

  function labelControls(controlsWrap) {
    controlsWrap.querySelectorAll('input[type="range"],select').forEach(input => {
      const label = input.closest('.sim-control-item')?.querySelector('.sim-control-label');
      input.setAttribute('aria-label',label?.textContent || input.id);
    });
  }

  function buildControlsForSim(simId, sim, controlsWrap, topActions) {
    if (simId === 'circuits') {
      controlsWrap.innerHTML=`<div class="sim-sliders-grid">${[['voltage','Tegangan (V)',0,24],['r1','Resistor 1 (Ω)',10,1000],['r2','Resistor 2 (Ω)',10,1000]].map(([key,label,min,max])=>`<label class="sim-control-item">${label}<input type="range" id="circuit-${key}" min="${min}" max="${max}" value="${sim.params[key]}" data-circuit="${key}"><output id="circuit-value-${key}">${sim.params[key]}</output></label>`).join('')}</div><label>Susunan <select id="circuit-topology"><option value="series">Seri</option><option value="parallel">Paralel</option></select></label>`;
      controlsWrap.querySelectorAll('[data-circuit]').forEach(input=>input.addEventListener('input',()=>{sim.params[input.dataset.circuit]=Number(input.value);controlsWrap.querySelector(`#circuit-value-${input.dataset.circuit}`).textContent=input.value;sim.updateHUD();}));
      controlsWrap.querySelector('#circuit-topology').addEventListener('change',e=>{sim.params.topology=e.target.value;sim.updateHUD();});
    } else if (simId === 'projectile') {
      topActions.innerHTML = `
        <button class="sim-btn sim-btn-active" id="btn-fire">🚀 Luncurkan</button>
        <button class="sim-btn" id="btn-reset">↺ Reset</button>
      `;
      topActions.querySelector('#btn-fire').addEventListener('click', () => sim.start());
      topActions.querySelector('#btn-reset').addEventListener('click', () => sim.reset());

      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Kecepatan Awal (v₀):</span> <span class="sim-control-val" id="val-v0">${sim.params.v0} m/s</span></div>
            <input type="range" class="sim-range-input" id="range-v0" min="10" max="80" value="${sim.params.v0}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Sudut Elevasi (θ):</span> <span class="sim-control-val" id="val-angle">${sim.params.angle}°</span></div>
            <input type="range" class="sim-range-input" id="range-angle" min="5" max="85" value="${sim.params.angle}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Hambatan Udara (Drag):</span> <span class="sim-control-val" id="val-drag">${sim.params.drag}</span></div>
            <input type="range" class="sim-range-input" id="range-drag" min="0" max="0.15" step="0.01" value="${sim.params.drag}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Gravitasi Planet:</span> <span class="sim-control-val" id="val-g">${sim.params.g} m/s²</span></div>
            <select id="select-planet-g" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 10px; border-radius: 4px; font-size: 0.85rem; outline: none;">
              <option value="9.81">Bumi (g = 9.81 m/s²)</option>
              <option value="1.62">Bulan (g = 1.62 m/s²)</option>
              <option value="3.72">Mars (g = 3.72 m/s²)</option>
              <option value="24.79">Jupiter (g = 24.79 m/s²)</option>
            </select>
          </div>
        </div>
      `;

      controlsWrap.querySelector('#range-v0').addEventListener('input', (e) => {
        sim.params.v0 = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-v0').textContent = `${sim.params.v0} m/s`;
        sim.reset();
      });
      controlsWrap.querySelector('#range-angle').addEventListener('input', (e) => {
        sim.params.angle = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-angle').textContent = `${sim.params.angle}°`;
        sim.reset();
      });
      controlsWrap.querySelector('#range-drag').addEventListener('input', (e) => {
        sim.params.drag = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-drag').textContent = sim.params.drag;
        sim.reset();
      });
      controlsWrap.querySelector('#select-planet-g').addEventListener('change', (e) => {
        sim.params.g = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-g').textContent = `${sim.params.g} m/s²`;
        sim.reset();
      });

    } else if (simId === 'pendulum') {
      topActions.innerHTML = `
        <button class="sim-btn" id="btn-pend-play">⏸ Jeda / Main</button>
        <button class="sim-btn" id="btn-pend-reset">↺ Reset</button>
      `;
      topActions.querySelector('#btn-pend-play').addEventListener('click', () => {
        sim.state.running = !sim.state.running;
      });
      topActions.querySelector('#btn-pend-reset').addEventListener('click', () => sim.reset());

      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Panjang Tali (L):</span> <span class="sim-control-val" id="val-len">${sim.params.length} m</span></div>
            <input type="range" class="sim-range-input" id="range-len" min="0.8" max="3.0" step="0.1" value="${sim.params.length}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Massa Bandul (m):</span> <span class="sim-control-val" id="val-mass">${sim.params.mass} kg</span></div>
            <input type="range" class="sim-range-input" id="range-mass" min="0.5" max="5.0" step="0.5" value="${sim.params.mass}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Koefisien Redaman (b):</span> <span class="sim-control-val" id="val-damp">${sim.params.damping}</span></div>
            <input type="range" class="sim-range-input" id="range-damp" min="0" max="0.3" step="0.02" value="${sim.params.damping}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Simpangan Awal (θ₀):</span> <span class="sim-control-val" id="val-theta0">${sim.params.theta0}°</span></div>
            <input type="range" class="sim-range-input" id="range-theta0" min="10" max="60" value="${sim.params.theta0}" />
          </div>
        </div>
      `;

      controlsWrap.querySelector('#range-len').addEventListener('input', (e) => {
        sim.params.length = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-len').textContent = `${sim.params.length} m`;
      });
      controlsWrap.querySelector('#range-mass').addEventListener('input', (e) => {
        sim.params.mass = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-mass').textContent = `${sim.params.mass} kg`;
      });
      controlsWrap.querySelector('#range-damp').addEventListener('input', (e) => {
        sim.params.damping = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-damp').textContent = sim.params.damping;
      });
      controlsWrap.querySelector('#range-theta0').addEventListener('input', (e) => {
        sim.params.theta0 = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-theta0').textContent = `${sim.params.theta0}°`;
        sim.reset();
      });

    } else if (simId === 'wave-doppler') {
      topActions.innerHTML = `
        <button class="sim-btn" id="btn-dop-reset">↺ Reset Posisi</button>
      `;
      topActions.querySelector('#btn-dop-reset').addEventListener('click', () => sim.reset());

      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Kecepatan Sumber (vs):</span> <span class="sim-control-val" id="val-vs">${sim.params.sourceSpeed} m/s</span></div>
            <input type="range" class="sim-range-input" id="range-vs" min="0" max="600" step="20" value="${sim.params.sourceSpeed}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Cepat Rambat Gelombang (v):</span> <span class="sim-control-val" id="val-vwave">${sim.params.waveSpeed} m/s</span></div>
            <input type="range" class="sim-range-input" id="range-vwave" min="200" max="500" step="10" value="${sim.params.waveSpeed}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Frekuensi Sumber (f₀):</span> <span class="sim-control-val" id="val-f0">${sim.params.emitFrequency} Hz</span></div>
            <input type="range" class="sim-range-input" id="range-f0" min="2" max="8" step="1" value="${sim.params.emitFrequency}" />
          </div>
        </div>
      `;

      controlsWrap.querySelector('#range-vs').addEventListener('input', (e) => {
        sim.params.sourceSpeed = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-vs').textContent = `${sim.params.sourceSpeed} m/s`;
      });
      controlsWrap.querySelector('#range-vwave').addEventListener('input', (e) => {
        sim.params.waveSpeed = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-vwave').textContent = `${sim.params.waveSpeed} m/s`;
      });
      controlsWrap.querySelector('#range-f0').addEventListener('input', (e) => {
        sim.params.emitFrequency = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-f0').textContent = `${sim.params.emitFrequency} Hz`;
      });

    } else if (simId === 'double-slit') {
      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Panjang Gelombang Cahaya (λ):</span> <span class="sim-control-val" id="val-lam">${sim.params.wavelength} nm</span></div>
            <input type="range" class="sim-range-input" id="range-lam" min="390" max="700" step="5" value="${sim.params.wavelength}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Jarak Antar Celah (d):</span> <span class="sim-control-val" id="val-slit-d">${sim.params.slitDist} mm</span></div>
            <input type="range" class="sim-range-input" id="range-slit-d" min="0.1" max="0.5" step="0.02" value="${sim.params.slitDist}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Jarak Celah ke Layar (D):</span> <span class="sim-control-val" id="val-screen-D">${sim.params.screenDist} m</span></div>
            <input type="range" class="sim-range-input" id="range-screen-D" min="0.5" max="2.5" step="0.1" value="${sim.params.screenDist}" />
          </div>
        </div>
      `;

      controlsWrap.querySelector('#range-lam').addEventListener('input', (e) => {
        sim.params.wavelength = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-lam').textContent = `${sim.params.wavelength} nm`;
      });
      controlsWrap.querySelector('#range-slit-d').addEventListener('input', (e) => {
        sim.params.slitDist = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-slit-d').textContent = `${sim.params.slitDist.toFixed(2)} mm`;
      });
      controlsWrap.querySelector('#range-screen-D').addEventListener('input', (e) => {
        sim.params.screenDist = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-screen-D').textContent = `${sim.params.screenDist.toFixed(1)} m`;
      });

    } else if (simId === 'electric-field') {
      topActions.innerHTML = `
        <button class="sim-btn" id="btn-mode-pos" style="color: #b62f2f;">+ Tambah (+q)</button>
        <button class="sim-btn" id="btn-mode-neg" style="color: var(--cyan-bright);">− Tambah (-q)</button>
        <button class="sim-btn" id="btn-dipole">Preset Dipol</button>
        <button class="sim-btn" id="btn-ef-clear">Bersihkan</button>
      `;
      topActions.querySelector('#btn-mode-pos').addEventListener('click', () => { sim.mouseMode = 'addPos'; });
      topActions.querySelector('#btn-mode-neg').addEventListener('click', () => { sim.mouseMode = 'addNeg'; });
      topActions.querySelector('#btn-dipole').addEventListener('click', () => sim.resetDipole());
      topActions.querySelector('#btn-ef-clear').addEventListener('click', () => sim.clearCharges());

      controlsWrap.innerHTML = `
        <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
          <strong>Petunjuk Interaktif:</strong> Klik tombol merah untuk menambah muatan positif (+q), atau biru untuk muatan negatif (-q). Klik di area canvas untuk menempatkan muatan. Tarik muatan yang sudah ada untuk memindahkannya. Perhatikan perubahan garis-garis medan listrik dan gerakan muatan uji kuning secara real-time!
        </div>
      `;

    } else if (simId === 'lorentz-force') {
      topActions.innerHTML = `
        <button class="sim-btn" id="btn-lf-reset">↺ Reset Partikel</button>
      `;
      topActions.querySelector('#btn-lf-reset').addEventListener('click', () => sim.reset());

      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Medan Magnet (B):</span> <span class="sim-control-val" id="val-b-field">${sim.params.B} T</span></div>
            <input type="range" class="sim-range-input" id="range-b-field" min="-3" max="3" step="0.2" value="${sim.params.B}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Kecepatan Partikel (v₀):</span> <span class="sim-control-val" id="val-v-lorentz">${sim.params.v0} m/s</span></div>
            <input type="range" class="sim-range-input" id="range-v-lorentz" min="40" max="220" step="10" value="${sim.params.v0}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Muatan Listrik (q):</span> <span class="sim-control-val" id="val-q-lorentz">${sim.params.q > 0 ? '+1 C (model)' : '-1 C (model)'}</span></div>
            <select id="select-charge-q" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 10px; border-radius: 4px; font-size: 0.85rem; outline: none;">
              <option value="1">Positif (+1 C)</option>
              <option value="-1">Negatif (−1 C)</option>
            </select>
          </div>
        </div>
      `;

      controlsWrap.querySelector('#range-b-field').addEventListener('input', (e) => {
        sim.params.B = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-b-field').textContent = `${sim.params.B} T`;
        sim.reset();
      });
      controlsWrap.querySelector('#range-v-lorentz').addEventListener('input', (e) => {
        sim.params.v0 = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-v-lorentz').textContent = `${sim.params.v0} m/s`;
        sim.reset();
      });
      controlsWrap.querySelector('#select-charge-q').addEventListener('change', (e) => {
        sim.params.q = parseInt(e.target.value, 10);
        controlsWrap.querySelector('#val-q-lorentz').textContent = sim.params.q > 0 ? '+1 C (model)' : '-1 C (model)';
        sim.reset();
      });

    } else if (simId === 'optics') {
      topActions.innerHTML = `
        <button class="sim-btn ${sim.mode === 'refraction' ? 'sim-btn-active' : ''}" id="btn-opt-refr">Hukum Snellius</button>
        <button class="sim-btn ${sim.mode === 'lens' ? 'sim-btn-active' : ''}" id="btn-opt-lens">Lensa Tipis</button>
      `;
      topActions.querySelector('#btn-opt-refr').addEventListener('click', () => {
        sim.mode = 'refraction';
        buildControlsForSim('optics', sim, controlsWrap, topActions);
        labelControls(controlsWrap);
        sim.updateHUD();
      });
      topActions.querySelector('#btn-opt-lens').addEventListener('click', () => {
        sim.mode = 'lens';
        buildControlsForSim('optics', sim, controlsWrap, topActions);
        labelControls(controlsWrap);
        sim.updateHUD();
      });

      if (sim.mode === 'refraction') {
        controlsWrap.innerHTML = `
          <div class="sim-sliders-grid">
            <div class="sim-control-item">
              <div class="sim-control-label"><span>Sudut Datang (θ₁):</span> <span class="sim-control-val" id="val-theta1">${sim.refractionParams.theta1Deg}°</span></div>
              <input type="range" class="sim-range-input" id="range-theta1" min="0" max="85" value="${sim.refractionParams.theta1Deg}" />
            </div>
            <div class="sim-control-item">
              <div class="sim-control-label"><span>Indeks Bias Medium 1 (n₁):</span> <span class="sim-control-val" id="val-n1">${sim.refractionParams.n1}</span></div>
              <input type="range" class="sim-range-input" id="range-n1" min="1.0" max="2.4" step="0.05" value="${sim.refractionParams.n1}" />
            </div>
            <div class="sim-control-item">
              <div class="sim-control-label"><span>Indeks Bias Medium 2 (n₂):</span> <span class="sim-control-val" id="val-n2">${sim.refractionParams.n2}</span></div>
              <input type="range" class="sim-range-input" id="range-n2" min="1.0" max="2.4" step="0.05" value="${sim.refractionParams.n2}" />
            </div>
          </div>
        `;
        controlsWrap.querySelector('#range-theta1').addEventListener('input', (e) => {
          sim.refractionParams.theta1Deg = parseFloat(e.target.value);
          controlsWrap.querySelector('#val-theta1').textContent = `${sim.refractionParams.theta1Deg}°`;
          sim.updateHUD();
        });
        controlsWrap.querySelector('#range-n1').addEventListener('input', (e) => {
          sim.refractionParams.n1 = parseFloat(e.target.value);
          controlsWrap.querySelector('#val-n1').textContent = sim.refractionParams.n1.toFixed(2);
          sim.updateHUD();
        });
        controlsWrap.querySelector('#range-n2').addEventListener('input', (e) => {
          sim.refractionParams.n2 = parseFloat(e.target.value);
          controlsWrap.querySelector('#val-n2').textContent = sim.refractionParams.n2.toFixed(2);
          sim.updateHUD();
        });
      } else {
        controlsWrap.innerHTML = `
          <div class="sim-sliders-grid">
            <div class="sim-control-item">
              <div class="sim-control-label"><span>Jarak Fokus Lensa (f):</span> <span class="sim-control-val" id="val-focal">${sim.lensParams.focalLength} px</span></div>
              <input type="range" class="sim-range-input" id="range-focal" min="60" max="220" step="10" value="${sim.lensParams.focalLength}" />
            </div>
            <div class="sim-control-item">
              <div class="sim-control-label"><span>Jarak Benda (s₀):</span> <span class="sim-control-val" id="val-obj-dist">${sim.lensParams.objectDist} px</span></div>
              <input type="range" class="sim-range-input" id="range-obj-dist" min="50" max="350" step="10" value="${sim.lensParams.objectDist}" />
            </div>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Tip: Anda juga dapat menyeret panah hijau benda secara langsung di layar dengan mouse!
          </div>
        `;
        controlsWrap.querySelector('#range-focal').addEventListener('input', (e) => {
          sim.lensParams.focalLength = parseFloat(e.target.value);
          controlsWrap.querySelector('#val-focal').textContent = `${sim.lensParams.focalLength} px`;
          sim.updateHUD();
        });
        controlsWrap.querySelector('#range-obj-dist').addEventListener('input', (e) => {
          sim.lensParams.objectDist = parseFloat(e.target.value);
          controlsWrap.querySelector('#val-obj-dist').textContent = `${sim.lensParams.objectDist} px`;
          sim.updateHUD();
        });
      }

    } else if (simId === 'thermodynamics') {
      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Suhu Reservoir Panas (T_H):</span> <span class="sim-control-val" id="val-th">${sim.params.Th} K</span></div>
            <input type="range" class="sim-range-input" id="range-th" min="400" max="1000" step="20" value="${sim.params.Th}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Suhu Reservoir Dingin (T_C):</span> <span class="sim-control-val" id="val-tc">${sim.params.Tc} K</span></div>
            <input type="range" class="sim-range-input" id="range-tc" min="150" max="380" step="10" value="${sim.params.Tc}" />
          </div>
        </div>
      `;
      controlsWrap.querySelector('#range-th').addEventListener('input', (e) => {
        sim.params.Th = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-th').textContent = `${sim.params.Th} K`;
        sim.updateHUD();
      });
      controlsWrap.querySelector('#range-tc').addEventListener('input', (e) => {
        sim.params.Tc = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-tc').textContent = `${sim.params.Tc} K`;
        sim.updateHUD();
      });

    } else if (simId === 'relativity') {
      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Rasio Kelajuan Relatif (v/c):</span> <span class="sim-control-val" id="val-beta">${(sim.params.beta * 100).toFixed(0)}% c</span></div>
            <input type="range" class="sim-range-input" id="range-beta" min="0" max="0.99" step="0.01" value="${sim.params.beta}" />
          </div>
        </div>
        <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-top: 10px;">
          Perhatikan bagaimana badan wahana menyusut (kontraksi panjang Lorentz) dan jarum jam di dalam wahana berdetak jauh lebih lambat dibanding jam di Bumi (dilatasi waktu).
        </div>
      `;
      controlsWrap.querySelector('#range-beta').addEventListener('input', (e) => {
        sim.params.beta = parseFloat(e.target.value);
        sim.state.tRest = 0; sim.state.tMoving = 0;
        controlsWrap.querySelector('#val-beta').textContent = `${(sim.params.beta * 100).toFixed(0)}% c`;
        sim.updateHUD();
      });

    } else if (simId === 'orbital-gravity') {
      topActions.innerHTML = `
        <button class="sim-btn" id="btn-orb-circ">Orbit Lingkaran</button>
        <button class="sim-btn" id="btn-orb-esc">Kecepatan Lepas</button>
        <button class="sim-btn" id="btn-orb-reset">↺ Reset</button>
      `;
      function syncOrbitControls() {
        const slider=controlsWrap.querySelector('#range-v-orb');
        slider.max=Math.max(4.5,sim.params.v0); slider.step='any'; slider.value=sim.params.v0;
        controlsWrap.querySelector('#val-v-orb').textContent=sim.params.v0.toFixed(3);
      }
      topActions.querySelector('#btn-orb-circ').addEventListener('click', () => {
        const r = sim.params.r0;
        sim.params.v0 = Math.sqrt(sim.params.centralMass / r);
        syncOrbitControls();
        sim.reset();
      });
      topActions.querySelector('#btn-orb-esc').addEventListener('click', () => {
        const r = sim.params.r0;
        sim.params.v0 = Math.sqrt(2 * sim.params.centralMass / r) * 1.05;
        syncOrbitControls();
        sim.reset();
      });
      topActions.querySelector('#btn-orb-reset').addEventListener('click', () => sim.reset());

      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Kecepatan Awal Orbit (v₀):</span> <span class="sim-control-val" id="val-v-orb">${sim.params.v0}</span></div>
            <input type="range" class="sim-range-input" id="range-v-orb" min="1.0" max="4.5" step="0.1" value="${sim.params.v0}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Massa Bintang Pusat (M):</span> <span class="sim-control-val" id="val-m-orb">${sim.params.centralMass}</span></div>
            <input type="range" class="sim-range-input" id="range-m-orb" min="500" max="2500" step="100" value="${sim.params.centralMass}" />
          </div>
        </div>
      `;
      controlsWrap.querySelector('#range-v-orb').addEventListener('input', (e) => {
        sim.params.v0 = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-v-orb').textContent = sim.params.v0;
        sim.reset();
      });
      controlsWrap.querySelector('#range-m-orb').addEventListener('input', (e) => {
        sim.params.centralMass = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-m-orb').textContent = sim.params.centralMass;
        sim.reset();
      });

    } else if (simId === 'bohr-atom') {
      topActions.innerHTML = `
        <span style="font-size: 0.85rem; color: var(--text-muted);">Pilih Transisi Elektron:</span>
        <button class="sim-btn" id="btn-jump-32">3 ➔ 2 (Merah H-α)</button>
        <button class="sim-btn" id="btn-jump-42">4 ➔ 2 (Cyan H-β)</button>
        <button class="sim-btn" id="btn-jump-21">2 ➔ 1 (UV Lyman)</button>
      `;
      topActions.querySelector('#btn-jump-32').addEventListener('click', () => sim.triggerTransition(3, 2));
      topActions.querySelector('#btn-jump-42').addEventListener('click', () => sim.triggerTransition(4, 2));
      topActions.querySelector('#btn-jump-21').addEventListener('click', () => sim.triggerTransition(2, 1));

      controlsWrap.innerHTML = `
        <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
          <strong>Kuantisasi Energi Bohr:</strong> Ketika elektron berpindah dari orbit luar yang berenergi lebih tinggi ke orbit dalam yang lebih rendah, energi yang hilang dipancarkan seketika sebagai foton cahaya dengan energi tepat ΔE = h·f = hc / λ. Garis spektrum di bawah menunjukkan posisi pasti panjang gelombang foton tersebut.
        </div>
      `;

    } else if (simId === 'bernoulli-fluid') {
      controlsWrap.innerHTML = `
        <div class="sim-sliders-grid">
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Debit / Kelajuan Aliran:</span> <span class="sim-control-val" id="val-flow">${sim.params.flowRate}×</span></div>
            <input type="range" class="sim-range-input" id="range-flow" min="0.5" max="3.0" step="0.2" value="${sim.params.flowRate}" />
          </div>
          <div class="sim-control-item">
            <div class="sim-control-label"><span>Penyempitan Leher Pipa:</span> <span class="sim-control-val" id="val-narrow">${sim.params.narrowRadius} px</span></div>
            <input type="range" class="sim-range-input" id="range-narrow" min="20" max="60" step="5" value="${sim.params.narrowRadius}" />
          </div>
        </div>
      `;
      controlsWrap.querySelector('#range-flow').addEventListener('input', (e) => {
        sim.params.flowRate = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-flow').textContent = `${sim.params.flowRate}×`;
      });
      controlsWrap.querySelector('#range-narrow').addEventListener('input', (e) => {
        sim.params.narrowRadius = parseFloat(e.target.value);
        controlsWrap.querySelector('#val-narrow').textContent = `${sim.params.narrowRadius} px`;
      });
    }
  }

  render();
  return cleanupActiveSim;
}
