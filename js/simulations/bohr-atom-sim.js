// Fisikaloka · Interactive Simulation: Quantum Bohr Atom & Hydrogen Spectral Lines

export class BohrAtomSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      nInitial: 3,
      nFinal: 2
    };

    this.state = {
      currentN: 3,
      electronAngle: 0,
      isTransitioning: false,
      photon: null, // { x, y, vx, vy, color, wavelength }
      t: 0
    };
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.resize();
    window.addEventListener('resize', this.onResize);
    this.loop();
  }

  onResize = () => {
    this.resize();
  };

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.updateHUD();
  }

  triggerTransition(fromN, toN) {
    this.params.nInitial = fromN;
    this.params.nFinal = toN;
    this.state.currentN = toN;

    const Ei = -13.6 / (fromN ** 2);
    const Ef = -13.6 / (toN ** 2);
    const deltaE = Math.abs(Ei - Ef); // in eV
    // lambda = hc / deltaE = 1239.84 / deltaE (in nm)
    const lambdaNm = 1239.84 / (deltaE || 0.001);

    const rect = this.canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2 - 20;

    let col = '#00f2fe';
    if (toN === 1) col = '#b388ff'; // UV (Lyman)
    else if (toN === 2) { // Visible (Balmer)
      if (fromN === 3) col = '#ff4b2b';      // H-alpha 656nm (Red)
      else if (fromN === 4) col = '#00f2fe'; // H-beta 486nm (Cyan)
      else if (fromN === 5) col = '#4facfe'; // H-gamma 434nm (Blue)
      else col = '#b388ff';                 // H-delta 410nm (Violet)
    } else {
      col = '#ff7a18'; // IR (Paschen)
    }

    this.state.photon = {
      x: cx,
      y: cy,
      vx: 3,
      vy: -2,
      color: col,
      lambdaNm: lambdaNm.toFixed(1),
      deltaE: deltaE.toFixed(2),
      tLife: 0
    };

    this.updateHUD();
  }

  updateHUD() {
    if (!this.hudElement) return;
    const ni = this.params.nInitial;
    const nf = this.params.nFinal;
    const Ei = -13.6 / (ni ** 2);
    const Ef = -13.6 / (nf ** 2);
    const deltaE = Math.abs(Ei - Ef);
    const lambdaNm = (1239.84 / (deltaE || 0.001)).toFixed(1);

    let series = 'Deret Lain';
    if (nf === 1) series = 'Deret Lyman (Sinar Ultraviolet)';
    else if (nf === 2) series = 'Deret Balmer (Cahaya Tampak Spektrum)';
    else if (nf === 3) series = 'Deret Paschen (Sinar Inframerah)';

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Transisi Orbit:</span> <span class="hud-val" style="color: #00f2fe">n = ${ni} ➔ n = ${nf}</span></div>
      <div class="hud-line"><span>Energi Foton (ΔE):</span> <span class="hud-val" style="color: #f6d365">${deltaE.toFixed(3)} eV</span></div>
      <div class="hud-line"><span>Panjang Gelombang (λ):</span> <span class="hud-val">${lambdaNm} nm</span></div>
      <div class="hud-line"><span>Deret Spektrum:</span> <span class="hud-val" style="color: #38ef7d">${series}</span></div>
      <div class="hud-line"><span>Tingkat Dasar (n=1):</span> <span class="hud-val">-13.60 eV</span></div>
    `;
  }

  update(dt) {
    this.state.t += dt;
    // Electron orbits around nucleus: higher orbits rotate slower
    const omega = 3.5 / (this.state.currentN ** 1.5);
    this.state.electronAngle += omega * dt;

    // Photon flight
    if (this.state.photon) {
      this.state.photon.x += this.state.photon.vx * 60 * dt;
      this.state.photon.y += this.state.photon.vy * 60 * dt;
      this.state.photon.tLife += dt;
      if (this.state.photon.tLife > 2.5) {
        this.state.photon = null;
      }
    }
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;
    const cx = w / 2;
    const cy = h / 2 - 20;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Quantized Circular Orbits n = 1 to 5
    const baseRadius = 32;
    for (let n = 1; n <= 5; n++) {
      const r = baseRadius * Math.sqrt(n) * 1.5;
      const isCurrent = n === this.state.currentN;

      this.ctx.strokeStyle = isCurrent ? 'rgba(0, 242, 254, 0.6)' : 'rgba(255, 255, 255, 0.1)';
      this.ctx.lineWidth = isCurrent ? 2 : 1;
      this.ctx.setLineDash([4, 4]);
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();

      // Orbit label
      this.ctx.fillStyle = '#64748b';
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(`n=${n}`, cx + r + 4, cy - 4);
    }
    this.ctx.setLineDash([]);

    // 2. Draw Nucleus (Proton) at Center
    this.ctx.save();
    this.ctx.shadowColor = '#ff416c';
    this.ctx.shadowBlur = 18;
    this.ctx.fillStyle = '#ff416c';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 12px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('+e', cx, cy);

    // 3. Draw Orbiting Electron
    const electronR = baseRadius * Math.sqrt(this.state.currentN) * 1.5;
    const ex = cx + electronR * Math.cos(this.state.electronAngle);
    const ey = cy + electronR * Math.sin(this.state.electronAngle);

    this.ctx.save();
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.beginPath();
    this.ctx.arc(ex, ey, 7, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // 4. Draw Emitted/Absorbed Photon Wave Packet if active
    if (this.state.photon) {
      const p = this.state.photon;
      this.ctx.strokeStyle = p.color;
      this.ctx.lineWidth = 2.5;

      // Draw wiggle wave packet
      this.ctx.beginPath();
      for (let i = -18; i <= 18; i += 2) {
        const waveX = p.x + i;
        const waveY = p.y + Math.sin(i * 0.6 + this.state.t * 15) * 5;
        if (i === -18) this.ctx.moveTo(waveX, waveY);
        else this.ctx.lineTo(waveX, waveY);
      }
      this.ctx.stroke();

      this.ctx.fillStyle = p.color;
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(`Foton (λ = ${p.lambdaNm} nm)`, p.x + 22, p.y);
    }

    // 5. Draw Visible Hydrogen Emission Spectrum Bar at Bottom
    this.drawHydrogenSpectrumBar(cx, h - 35, w - 80);
  }

  drawHydrogenSpectrumBar(cx, y, width) {
    const startX = cx - width / 2;
    this.ctx.fillStyle = '#0a0f1d';
    this.ctx.fillRect(startX, y, width, 22);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.strokeRect(startX, y, width, 22);

    this.ctx.font = '10px Inter, sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('SPEKTRUM EMISI HIDROGEN (DERET BALMER)', startX + 10, y - 8);

    // Visible lines:
    // H-alpha: 656.3 nm (Red)
    // H-beta: 486.1 nm (Cyan)
    // H-gamma: 434.0 nm (Blue)
    // H-delta: 410.2 nm (Violet)
    const lines = [
      { nm: 656.3, col: '#ff4b2b', label: 'H-α (656 nm)' },
      { nm: 486.1, col: '#00f2fe', label: 'H-β (486 nm)' },
      { nm: 434.0, col: '#4facfe', label: 'H-γ (434 nm)' },
      { nm: 410.2, col: '#b388ff', label: 'H-δ (410 nm)' }
    ];

    // Scale from 380nm to 700nm
    for (const line of lines) {
      const frac = (line.nm - 380) / (700 - 380);
      const lineX = startX + frac * width;

      this.ctx.strokeStyle = line.col;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(lineX, y);
      this.ctx.lineTo(lineX, y + 22);
      this.ctx.stroke();
    }
  }

  loop = (now = performance.now()) => {
    const dt = Math.min(0.04, Math.max(0, (now - (this.lastFrame ?? now))/1000));
    this.lastFrame = now;
    if (!document.hidden && !this.animationPaused) { this.update(dt); this.draw(); }
    this.animId = requestAnimationFrame(this.loop);
  };

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
  }
}
