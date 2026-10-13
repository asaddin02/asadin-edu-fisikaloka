// Fisikaloka · Interactive Simulation: Orbital Mechanics & Keplerian Gravity Lab

export class OrbitalGravitySimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      centralMass: 1000, // arbitrary GM scale
      v0: 2.8,           // initial orbital velocity
      r0: 140            // initial radius (px)
    };

    this.state = {
      x: 140,
      y: 0,
      vx: 0,
      vy: 2.8,
      t: 0,
      trail: [],
      running: true,
      orbitType: 'Elliptical'
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
    this.state.running = true;
    this.state.x = this.params.r0;
    this.state.y = 0;
    this.state.vx = 0;
    this.state.vy = this.params.v0;
    this.state.trail = [];
    this.state.t = 0;
    this.updateHUD();
  }

  updateHUD() {
    if (!this.hudElement) return;
    const r = Math.sqrt(this.state.x ** 2 + this.state.y ** 2);
    const v = Math.sqrt(this.state.vx ** 2 + this.state.vy ** 2);
    const vCircular = Math.sqrt(this.params.centralMass / r);
    const vEscape = Math.sqrt(2 * this.params.centralMass / r);

    let type = 'Elips Tertutup';
    let typeCol = '#00f2fe';
    if (Math.abs(this.params.v0 - Math.sqrt(this.params.centralMass / this.params.r0)) < 1e-8) {
      type = 'Lingkaran Sempurna';
      typeCol = '#38ef7d';
    } else if (v >= vEscape) {
      type = 'Hiperbolik / Lepas (Escape)';
      typeCol = '#ff5858';
    } else if (r < 25) {
      type = 'Menabrak Bintang Pusat';
      typeCol = '#ff416c';
    }

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Jarak ke Pusat (r):</span> <span class="hud-val">${r.toFixed(1)} px</span></div>
      <div class="hud-line"><span>Kelajuan Satelit (v):</span> <span class="hud-val">${v.toFixed(2)} unit/s</span></div>
      <div class="hud-line"><span>Kelajuan Sirkular:</span> <span class="hud-val" style="color: #38ef7d">${vCircular.toFixed(2)}</span></div>
      <div class="hud-line"><span>Kelajuan Lepas (v_esc):</span> <span class="hud-val" style="color: #f6d365">${vEscape.toFixed(2)}</span></div>
      <div class="hud-line"><span>Tipe Orbit:</span> <span class="hud-val" style="color: ${typeCol}">${type}</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;

    // Sub-stepping for precise numerical orbit conservation
    const steps = 6;
    const subDt = dt / steps;

    for (let s = 0; s < steps; s++) {
      const r2 = this.state.x ** 2 + this.state.y ** 2;
      const r = Math.sqrt(r2);
      if (r < 18) {
        // Impact with central star
        this.state.running = false;
        break;
      }

      // Gravitational acceleration: a = - (GM / r^3) * r_vec
      const aMag = this.params.centralMass / r2;
      const ax = -aMag * (this.state.x / r);
      const ay = -aMag * (this.state.y / r);

      this.state.vx += ax * subDt;
      this.state.vy += ay * subDt;
      this.state.x += this.state.vx * subDt;
      this.state.y += this.state.vy * subDt;
      this.state.t += subDt;
    }

    this.state.trail.push({ x: this.state.x, y: this.state.y });
    if (this.state.trail.length > 300) this.state.trail.shift();

    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;
    const cx = w / 2;
    const cy = h / 2;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Orbit Trail
    if (this.state.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.45)';
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(cx + this.state.trail[0].x, cy + this.state.trail[0].y);
      for (let i = 1; i < this.state.trail.length; i++) {
        this.ctx.lineTo(cx + this.state.trail[i].x, cy + this.state.trail[i].y);
      }
      this.ctx.stroke();
    }

    // 2. Draw Central Star / Planet (Sun-like glow)
    const starRadius = 20;
    const grad = this.ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, starRadius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#f6d365');
    grad.addColorStop(1, '#ff7a18');

    this.ctx.save();
    this.ctx.shadowColor = '#f6d365';
    this.ctx.shadowBlur = 24;
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, starRadius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // 3. Draw Orbiting Satellite
    const satX = cx + this.state.x;
    const satY = cy + this.state.y;

    this.ctx.save();
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.beginPath();
    this.ctx.arc(satX, satY, 7, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // Velocity vector from satellite
    const vScale = 12;
    this.ctx.strokeStyle = '#38ef7d';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(satX, satY);
    this.ctx.lineTo(satX + this.state.vx * vScale, satY + this.state.vy * vScale);
    this.ctx.stroke();
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
