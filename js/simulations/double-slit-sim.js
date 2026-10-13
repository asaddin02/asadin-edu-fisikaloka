// Fisikaloka · Interactive Simulation: Young’s Double-Slit Wave Interference & Diffraction

export class DoubleSlitSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      wavelength: 532, // nm (Green Laser default)
      slitDist: 0.25,  // mm (distance between slits)
      screenDist: 1.2  // m (distance to observation screen)
    };

    this.state = {
      t: 0,
      running: true
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

  // Wavelength to RGB color utility
  wavelengthToRGB(nm) {
    let r = 0, g = 0, b = 0;
    if (nm >= 380 && nm < 440) {
      r = -(nm - 440) / (440 - 380);
      b = 1.0;
    } else if (nm >= 440 && nm < 490) {
      g = (nm - 440) / (490 - 440);
      b = 1.0;
    } else if (nm >= 490 && nm < 510) {
      g = 1.0;
      b = -(nm - 510) / (510 - 490);
    } else if (nm >= 510 && nm < 580) {
      r = (nm - 510) / (580 - 510);
      g = 1.0;
    } else if (nm >= 580 && nm < 645) {
      r = 1.0;
      g = -(nm - 645) / (645 - 580);
    } else if (nm >= 645 && nm <= 750) {
      r = 1.0;
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }

  updateHUD() {
    if (!this.hudElement) return;
    // Fringe spacing Δy = (λ * D) / d
    const lambda_m = this.params.wavelength * 1e-9;
    const d_m = this.params.slitDist * 1e-3;
    const D_m = this.params.screenDist;
    const deltaY_mm = ((lambda_m * D_m) / d_m) * 1000;

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Panjang Gelombang (λ):</span> <span class="hud-val" style="color: ${this.wavelengthToRGB(this.params.wavelength)}">${this.params.wavelength} nm</span></div>
      <div class="hud-line"><span>Jarak Celah (d):</span> <span class="hud-val">${this.params.slitDist.toFixed(2)} mm</span></div>
      <div class="hud-line"><span>Jarak Layar (D):</span> <span class="hud-val">${this.params.screenDist.toFixed(2)} m</span></div>
      <div class="hud-line"><span>Jarak Antar Pita (Δy):</span> <span class="hud-val" style="color: #00f2fe">${deltaY_mm.toFixed(2)} mm</span></div>
      <div class="hud-line"><span>Kondisi Pita Terang:</span> <span class="hud-val">d sin(θ) = m · λ</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;
    this.state.t += dt * 3;
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    const laserColor = this.wavelengthToRGB(this.params.wavelength);
    const slitBarrierX = 140;
    const screenX = w - 100;
    const midY = h / 2;
    const slitGapPx = this.params.slitDist * 120; // visual representation
    const slit1Y = midY - slitGapPx / 2;
    const slit2Y = midY + slitGapPx / 2;

    // 1. Draw Incoming Incident Plane Waves (from laser)
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(10, midY - 15, 60, 30);
    this.ctx.fillStyle = laserColor;
    this.ctx.font = '10px Inter, sans-serif';
    this.ctx.fillText('Laser', 22, midY + 4);

    this.ctx.strokeStyle = laserColor;
    this.ctx.lineWidth = 2;
    for (let x = 80; x < slitBarrierX; x += 16) {
      const offset = (this.state.t * 20) % 16;
      const waveX = x + offset;
      if (waveX < slitBarrierX) {
        this.ctx.beginPath();
        this.ctx.moveTo(waveX, midY - 60);
        this.ctx.lineTo(waveX, midY + 60);
        this.ctx.stroke();
      }
    }

    // 2. Draw Double Slit Barrier Wall
    this.ctx.fillStyle = '#475569';
    // Top section
    this.ctx.fillRect(slitBarrierX - 4, 0, 8, slit1Y - 6);
    // Middle separator
    this.ctx.fillRect(slitBarrierX - 4, slit1Y + 6, 8, slit2Y - slit1Y - 12);
    // Bottom section
    this.ctx.fillRect(slitBarrierX - 4, slit2Y + 6, 8, h - slit2Y - 6);

    // 3. Draw Diffracted Circular Waves from Slit 1 and Slit 2
    this.ctx.lineWidth = 1.2;
    const numRings = 16;
    for (let i = 0; i < numRings; i++) {
      const r = ((this.state.t * 30 + i * 22) % 350);
      const alpha = Math.max(0.04, 0.4 - r / 500);
      this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;

      // Wave from Slit 1
      this.ctx.beginPath();
      this.ctx.arc(slitBarrierX, slit1Y, r, -Math.PI / 2, Math.PI / 2);
      this.ctx.stroke();

      // Wave from Slit 2
      this.ctx.beginPath();
      this.ctx.arc(slitBarrierX, slit2Y, r, -Math.PI / 2, Math.PI / 2);
      this.ctx.stroke();
    }

    // 4. Draw Right Observation Screen Bar
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fillRect(screenX, 20, 24, h - 40);
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.strokeRect(screenX, 20, 24, h - 40);

    // 5. Draw Light Fringe Patterns on the Screen
    const lambda_m = this.params.wavelength * 1e-9;
    const d_m = this.params.slitDist * 1e-3;
    const D_m = this.params.screenDist;
    const k = (2 * Math.PI) / lambda_m;

    for (let y = 20; y < h - 20; y += 2) {
      const distFromCenterM = ((y - midY) / 100) * 0.01; // physical screen scale
      const deltaL = (d_m * distFromCenterM) / D_m;
      const phaseDiff = k * deltaL;
      const intensity = Math.cos(phaseDiff / 2) ** 2; // I = I_0 cos^2(delta/2)

      this.ctx.fillStyle = laserColor;
      this.ctx.globalAlpha = Math.min(1.0, intensity * 1.2);
      this.ctx.fillRect(screenX + 2, y, 20, 2);
    }
    this.ctx.globalAlpha = 1.0;

    // 6. Draw Intensity Profile Graph Line next to screen
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#f6d365';
    this.ctx.lineWidth = 2;
    for (let y = 20; y < h - 20; y += 4) {
      const distFromCenterM = ((y - midY) / 100) * 0.01;
      const deltaL = (d_m * distFromCenterM) / D_m;
      const phaseDiff = k * deltaL;
      const intensity = Math.cos(phaseDiff / 2) ** 2;
      const plotX = screenX + 35 + intensity * 45;

      if (y === 20) this.ctx.moveTo(plotX, y);
      else this.ctx.lineTo(plotX, y);
    }
    this.ctx.stroke();

    // Center bright fringe marker
    this.ctx.fillStyle = '#f6d365';
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.fillText('m=0 (Pusat)', screenX - 65, midY + 4);
    this.ctx.fillText('Pola I(y)', screenX + 35, 16);
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
