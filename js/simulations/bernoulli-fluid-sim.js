// Fisikaloka · Interactive Simulation: Fluid Dynamics & Bernoulli Venturi Tube Lab

export class BernoulliFluidSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      flowRate: 1.5,     // flow velocity multiplier
      narrowRadius: 35,  // px (radius at throat constriction)
      wideRadius: 75     // px (radius at wide pipe)
    };

    this.state = {
      particles: [],
      t: 0,
      running: true
    };
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.resize();
    this.seedParticles();
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

  seedParticles() {
    const w = this.canvas.getBoundingClientRect().width;
    this.state.particles = [];
    for (let i = 0; i < 90; i++) {
      this.state.particles.push({
        x: Math.random() * w,
        yFraction: Math.random() * 2 - 1 // -1 (top) to +1 (bottom)
      });
    }
  }

  getPipeRadiusAt(x, w) {
    const throatX = w / 2;
    const transitionWidth = 140;
    const dist = Math.abs(x - throatX);

    if (dist < transitionWidth) {
      // Smooth cosine interpolation between wide and narrow
      const frac = 0.5 * (1 + Math.cos((dist / transitionWidth) * Math.PI));
      return this.params.wideRadius - frac * (this.params.wideRadius - this.params.narrowRadius);
    }
    return this.params.wideRadius;
  }

  updateHUD() {
    if (!this.hudElement) return;
    // Continuity equation: A1 * v1 = A2 * v2 -> v2 = v1 * (r1 / r2)^2
    const r1 = this.params.wideRadius;
    const r2 = this.params.narrowRadius;
    const v1 = 1.2 * this.params.flowRate;
    const v2 = v1 * Math.pow(r1 / r2, 2);

    // Bernoulli pressure drop: ΔP = 0.5 * rho * (v2^2 - v1^2)
    const rho = 1000; // kg/m^3
    const deltaP = 0.5 * rho * (v2 ** 2 - v1 ** 2);
    const deltaH_cm = (deltaP / (rho * 9.81)) * 100;

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Kecepatan Pipa Lebar (v₁):</span> <span class="hud-val">${v1.toFixed(2)} m/s</span></div>
      <div class="hud-line"><span>Kecepatan Leher Sempit (v₂):</span> <span class="hud-val" style="color: #00f2fe">${v2.toFixed(2)} m/s</span></div>
      <div class="hud-line"><span>Penurunan Tekanan (ΔP):</span> <span class="hud-val" style="color: #f6d365">${deltaP.toFixed(0)} Pa</span></div>
      <div class="hud-line"><span>Beda Kolom Manometer (Δh):</span> <span class="hud-val" style="color: #ff5858">${deltaH_cm.toFixed(1)} cm</span></div>
      <div class="hud-line"><span>Prinsip Bernoulli:</span> <span class="hud-val">Kelajuan naik ⟹ Tekanan turun!</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;
    const w = this.canvas.getBoundingClientRect().width;

    for (const p of this.state.particles) {
      const r = this.getPipeRadiusAt(p.x, w);
      // Velocity inversely proportional to cross-sectional area (A ∝ r^2)
      const speed = this.params.flowRate * 70 * Math.pow(this.params.wideRadius / r, 2);
      p.x += speed * dt;
      if (p.x > w + 10) {
        p.x = -10;
        p.yFraction = Math.random() * 2 - 1;
      }
    }

    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;
    const midY = h / 2 + 25;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Venturi Pipe Contour (Top and Bottom walls)
    this.ctx.beginPath();
    this.ctx.moveTo(0, midY - this.params.wideRadius);
    for (let x = 0; x <= w; x += 10) {
      const r = this.getPipeRadiusAt(x, w);
      this.ctx.lineTo(x, midY - r);
    }
    // Bottom wall
    this.ctx.lineTo(w, midY + this.getPipeRadiusAt(w, w));
    for (let x = w; x >= 0; x -= 10) {
      const r = this.getPipeRadiusAt(x, w);
      this.ctx.lineTo(x, midY + r);
    }
    this.ctx.closePath();

    // Fluid tint background
    this.ctx.fillStyle = 'rgba(0, 242, 254, 0.08)';
    this.ctx.fill();
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // 2. Draw Vertical Manometer Tubes
    const tube1X = w * 0.22; // Wide section
    const tube2X = w * 0.50; // Constricted neck

    // Manometer 1 (High pressure -> fluid pushed high)
    const h1 = 120;
    this.drawManometerTube(tube1X, midY - this.params.wideRadius, h1, 'P₁ (Tekanan Tinggi)');

    // Manometer 2 (Low pressure -> fluid pushed lower)
    const r1 = this.params.wideRadius;
    const r2 = this.params.narrowRadius;
    const ratio = Math.pow(r1 / r2, 2);
    const h2 = Math.max(25, h1 - (ratio - 1) * 35 * this.params.flowRate);
    this.drawManometerTube(tube2X, midY - this.params.narrowRadius, h2, 'P₂ (Tekanan Rendah)');

    // 3. Draw Fluid Streamline Particles
    for (const p of this.state.particles) {
      const r = this.getPipeRadiusAt(p.x, w);
      const py = midY + p.yFraction * (r - 8);

      const speedFactor = this.params.wideRadius / r;
      this.ctx.fillStyle = speedFactor > 1.3 ? '#00f2fe' : 'rgba(255, 255, 255, 0.7)';
      this.ctx.beginPath();
      this.ctx.arc(p.x, py, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawManometerTube(x, bottomY, liquidHeight, label) {
    const tubeWidth = 24;
    const tubeTopY = 40;

    // Glass tube outline
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x - tubeWidth / 2, tubeTopY);
    this.ctx.lineTo(x - tubeWidth / 2, bottomY);
    this.ctx.moveTo(x + tubeWidth / 2, tubeTopY);
    this.ctx.lineTo(x + tubeWidth / 2, bottomY);
    this.ctx.stroke();

    // Liquid column inside tube
    const liquidTopY = bottomY - liquidHeight;
    this.ctx.fillStyle = 'rgba(0, 198, 255, 0.5)';
    this.ctx.fillRect(x - tubeWidth / 2 + 2, liquidTopY, tubeWidth - 4, liquidHeight);

    // Label
    this.ctx.fillStyle = '#f6d365';
    this.ctx.font = '10px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(label, x, tubeTopY - 8);
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
