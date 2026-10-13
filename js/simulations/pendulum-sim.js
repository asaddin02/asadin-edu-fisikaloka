// Fisikaloka · Interactive Simulation: Simple & Damped Harmonic Pendulum Lab

export class PendulumSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      length: 2.0,       // meters
      mass: 1.5,         // kg
      damping: 0.05,     // damping factor b
      g: 9.81,           // m/s²
      theta0: 35         // initial angle (degrees)
    };

    this.state = {
      theta: (35 * Math.PI) / 180, // radians
      omega: 0,                    // angular velocity (rad/s)
      alpha: 0,                    // angular acceleration (rad/s²)
      t: 0,
      running: true,
      Ek: 0,
      Ep: 0,
      Etotal: 0
    };

    this.scale = 110; // pixels per meter
    this.pivotX = 0;
    this.pivotY = 60;
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.reset();
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
    this.pivotX = rect.width / 2;
  }

  reset() {
    this.state.theta = (this.params.theta0 * Math.PI) / 180;
    this.state.omega = 0;
    this.state.alpha = 0;
    this.state.t = 0;
    this.state.running = true;
    this.calcEnergy();
    this.updateHUD();
  }

  calcEnergy() {
    const v = this.params.length * this.state.omega;
    this.state.Ek = 0.5 * this.params.mass * (v ** 2);
    const h = this.params.length * (1 - Math.cos(this.state.theta));
    this.state.Ep = this.params.mass * this.params.g * h;
    this.state.Etotal = this.state.Ek + this.state.Ep;
  }

  updateHUD() {
    if (!this.hudElement) return;
    const deg = ((this.state.theta * 180) / Math.PI).toFixed(1);
    const period = (2 * Math.PI * Math.sqrt(this.params.length / this.params.g)).toFixed(2);
    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Sudut Simpangan (θ):</span> <span class="hud-val">${deg}°</span></div>
      <div class="hud-line"><span>Kecepatan Sudut (ω):</span> <span class="hud-val">${this.state.omega.toFixed(2)} rad/s</span></div>
      <div class="hud-line"><span>Periode sudut kecil (T₀):</span> <span class="hud-val">${period} s</span></div>
      <div class="hud-line"><span>Energi Kinetik (Ek):</span> <span class="hud-val">${this.state.Ek.toFixed(2)} J</span></div>
      <div class="hud-line"><span>Energi Potensial (Ep):</span> <span class="hud-val">${this.state.Ep.toFixed(2)} J</span></div>
      <div class="hud-line"><span>Energi Mekanik Total:</span> <span class="hud-val">${this.state.Etotal.toFixed(2)} J</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;

    // Euler-Cromer integration for energy stability
    // d²θ/dt² = -(g / L) * sin(θ) - (damping / m) * ω
    const steps = 4;
    const subDt = dt / steps;

    for (let s = 0; s < steps; s++) {
      this.state.alpha = -(this.params.g / this.params.length) * Math.sin(this.state.theta) - (this.params.damping / this.params.mass) * this.state.omega;
      this.state.omega += this.state.alpha * subDt;
      this.state.theta += this.state.omega * subDt;
      this.state.t += subDt;
    }

    this.calcEnergy();
    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Pivot point & mount
    this.ctx.fillStyle = '#475569';
    this.ctx.fillRect(this.pivotX - 30, this.pivotY - 12, 60, 12);
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.beginPath();
    this.ctx.arc(this.pivotX, this.pivotY, 6, 0, Math.PI * 2);
    this.ctx.fill();

    this.scale = Math.min(110, (h - this.pivotY - 50) / this.params.length, (w / 2 - 25) / this.params.length);
    // 2. Bob position
    const bobX = this.pivotX + Math.sin(this.state.theta) * (this.params.length * this.scale);
    const bobY = this.pivotY + Math.cos(this.state.theta) * (this.params.length * this.scale);

    // Dashed center reference line
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.pivotX, this.pivotY);
    this.ctx.lineTo(this.pivotX, this.pivotY + this.params.length * this.scale + 20);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // 3. String rod
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.pivotX, this.pivotY);
    this.ctx.lineTo(bobX, bobY);
    this.ctx.stroke();

    // 4. Bob sphere
    const bobRadius = 14 + Math.sqrt(this.params.mass) * 3;
    const grad = this.ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, bobRadius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#00f2fe');
    grad.addColorStop(1, '#0284c7');

    this.ctx.save();
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // 5. Draw Live Mechanical Energy Bar Chart on Bottom Right
    this.drawEnergyBars(w - 180, h - 140, 150, 110);
  }

  drawEnergyBars(x, y, width, height) {
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);

    this.ctx.font = '10px Inter, sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('DIAGRAM ENERGI', x + 10, y + 18);

    const maxE = Math.max(1, this.state.Etotal * 1.2);
    const barWidth = 26;
    const barMaxH = 65;

    // Ep (Potential) Bar - Amber
    const epH = (this.state.Ep / maxE) * barMaxH;
    this.ctx.fillStyle = '#f6d365';
    this.ctx.fillRect(x + 18, y + height - 20 - epH, barWidth, epH);
    this.ctx.fillText('Ep', x + 24, y + height - 8);

    // Ek (Kinetic) Bar - Cyan
    const ekH = (this.state.Ek / maxE) * barMaxH;
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.fillRect(x + 58, y + height - 20 - ekH, barWidth, ekH);
    this.ctx.fillText('Ek', x + 64, y + height - 8);

    // Total Energy Bar - Violet
    const etotH = (this.state.Etotal / maxE) * barMaxH;
    this.ctx.fillStyle = '#b388ff';
    this.ctx.fillRect(x + 98, y + height - 20 - etotH, barWidth, etotH);
    this.ctx.fillText('Etot', x + 102, y + height - 8);
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
