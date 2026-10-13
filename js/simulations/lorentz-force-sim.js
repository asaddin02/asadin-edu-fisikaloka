import { magneticStep } from './physics-models.js';
// Fisikaloka · Interactive Simulation: Magnetic Lorentz Force & Cyclotron Motion

export class LorentzForceSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      B: 1.5,      // Tesla (positive = into screen ⊗, negative = out ⊙)
      v0: 120,     // m/s
      q: 1,        // Coulomb (+1 or -1); illustrative particle, not electron/proton
      mass: 1.0    // kg scale
    };

    this.state = {
      x: 350,
      y: 320,
      vx: 120,
      vy: 0,
      t: 0,
      running: true,
      trail: [],
      radius: 0,
      period: 0
    };
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.resize();
    this.reset();
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
    this.reset();
  }

  reset() {
    const rect = this.canvas.getBoundingClientRect();
    this.state.x = rect.width / 2;
    this.state.y = rect.height / 2 + 70;
    this.state.vx = this.params.v0;
    this.state.vy = 0;
    this.state.trail = [];
    this.state.t = 0;
    this.updateHUD();
  }

  updateHUD() {
    if (!this.hudElement) return;
    const rLarmor = (this.params.mass * this.params.v0) / (Math.abs(this.params.q * this.params.B) || 0);
    const T = (2 * Math.PI * this.params.mass) / (Math.abs(this.params.q * this.params.B) || 0);
    const omega = (Math.abs(this.params.q * this.params.B) / this.params.mass).toFixed(2);

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Medan Magnet (B):</span> <span class="hud-val">${this.params.B.toFixed(2)} T (${this.params.B >= 0 ? 'Menembus Layar ⊗' : 'Keluar Layar ⊙'})</span></div>
      <div class="hud-line"><span>Kecepatan (v):</span> <span class="hud-val">${this.params.v0} m/s</span></div>
      <div class="hud-line"><span>Jari-jari Siklotron (r):</span> <span class="hud-val" style="color: #00f2fe">${Number.isFinite(rLarmor) ? rLarmor.toFixed(1) + ' m' : '∞ (lintasan lurus)'}</span></div>
      <div class="hud-line"><span>Frekuensi Siklotron (ω):</span> <span class="hud-val" style="color: #f6d365">${omega} rad/s</span></div>
      <div class="hud-line"><span>Periode Putaran (T):</span> <span class="hud-val">${T.toFixed(2)} s</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;

    magneticStep(this.state, this.params, dt);
    this.state.t += dt;

    this.state.trail.push({ x: this.state.x, y: this.state.y });
    if (this.state.trail.length > 250) this.state.trail.shift();

    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Magnetic Field B background pattern (⊗ or ⊙)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    this.ctx.font = '12px Courier, monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const isInto = this.params.B >= 0;
    const bSymbol = isInto ? '⊗' : '⊙';

    for (let x = 30; x < w - 20; x += 45) {
      for (let y = 30; y < h - 20; y += 45) {
        this.ctx.fillText(bSymbol, x, y);
      }
    }

    // 2. Draw Orbit Trajectory Trail
    if (this.state.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
      this.ctx.lineWidth = 2.5;
      this.ctx.moveTo(this.state.trail[0].x, this.state.trail[0].y);
      for (let i = 1; i < this.state.trail.length; i++) {
        this.ctx.lineTo(this.state.trail[i].x, this.state.trail[i].y);
      }
      this.ctx.stroke();
    }

    // 3. Draw Particle
    const isPos = this.params.q > 0;
    const col = isPos ? '#ff416c' : '#00f2fe';
    this.ctx.save();
    this.ctx.shadowColor = col;
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = col;
    this.ctx.beginPath();
    this.ctx.arc(this.state.x, this.state.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 12px Inter, sans-serif';
    this.ctx.fillText(isPos ? '+' : '−', this.state.x, this.state.y);

    // 4. Draw Velocity Vector (cyan) and Lorentz Force Vector (amber)
    const vScale = 0.35;
    this.drawArrow(this.state.x, this.state.y, this.state.x + this.state.vx * vScale, this.state.y + this.state.vy * vScale, '#00f2fe', 'v');

    const Fx = this.params.q * this.state.vy * this.params.B;
    const Fy = -this.params.q * this.state.vx * this.params.B;
    const fScale = 0.35;
    this.drawArrow(this.state.x, this.state.y, this.state.x + Fx * fScale, this.state.y + Fy * fScale, '#f6d365', 'F');
  }

  drawArrow(fromX, fromY, toX, toY, color, label) {
    const headLen = 7;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 4) return;

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 2;

    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(toX, toY);
    this.ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.font = 'bold 11px Inter, sans-serif';
    this.ctx.fillText(label, toX + 10 * Math.cos(angle), toY + 10 * Math.sin(angle));
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
