// Fisikaloka · Interactive Simulation: Projectile Motion & Kinematics Lab

export class ProjectileSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Simulation Physics State
    this.params = {
      v0: 35,          // m/s
      angle: 45,       // degrees
      g: 9.81,         // m/s² (Earth)
      drag: 0.05,      // air drag coefficient
      h0: 0,           // launch height (m)
      showVectors: true
    };

    this.state = {
      t: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      running: false,
      completed: false,
      trajectory: [],
      maxHeight: 0,
      totalDistance: 0,
      flightTime: 0
    };

    this.scale = 4.5; // pixels per meter
    this.originX = 60;
    this.originY = 0; // will be set dynamically based on height
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
    this.originY = rect.height - 50;
  }

  reset() {
    const rad = (this.params.angle * Math.PI) / 180;
    this.state.t = 0;
    this.state.x = 0;
    this.state.y = this.params.h0;
    this.state.vx = this.params.v0 * Math.cos(rad);
    this.state.vy = this.params.v0 * Math.sin(rad);
    this.state.running = false;
    this.state.completed = false;
    this.state.trajectory = [{ x: 0, y: this.params.h0 }];
    this.state.maxHeight = this.params.h0;
    this.state.totalDistance = 0;
    this.state.flightTime = 0;
    this.updateHUD();
  }

  start() {
    if (this.state.completed) this.reset();
    this.state.running = true;
  }

  pause() {
    this.state.running = false;
  }

  updateHUD() {
    if (!this.hudElement) return;
    const vCurrent = Math.sqrt(this.state.vx ** 2 + this.state.vy ** 2).toFixed(1);
    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Waktu (t):</span> <span class="hud-val">${this.state.t.toFixed(2)} s</span></div>
      <div class="hud-line"><span>Posisi (x, y):</span> <span class="hud-val">(${this.state.x.toFixed(1)} m, ${this.state.y.toFixed(1)} m)</span></div>
      <div class="hud-line"><span>Kecepatan (v):</span> <span class="hud-val">${vCurrent} m/s</span></div>
      <div class="hud-line"><span>Tinggi Maks (H):</span> <span class="hud-val">${this.state.maxHeight.toFixed(1)} m</span></div>
      <div class="hud-line"><span>Jarak Jangkauan:</span> <span class="hud-val">${this.state.totalDistance.toFixed(1)} m</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;

    // Sub-stepping for numerical stability
    const steps = 5;
    const subDt = dt / steps;

    for (let s = 0; s < steps; s++) {
      const speed = Math.sqrt(this.state.vx ** 2 + this.state.vy ** 2);
      // Quadratic aerodynamic drag force: F_drag = -drag * v * v_vec
      const ax = -this.params.drag * speed * this.state.vx;
      const ay = -this.params.g - (this.params.drag * speed * this.state.vy);

      this.state.vx += ax * subDt;
      this.state.vy += ay * subDt;
      this.state.x += this.state.vx * subDt;
      this.state.y += this.state.vy * subDt;
      this.state.t += subDt;

      if (this.state.y > this.state.maxHeight) {
        this.state.maxHeight = this.state.y;
      }

      // Ground impact check
      if (this.state.y <= 0 && this.state.t > 0.05) {
        this.state.y = 0;
        this.state.running = false;
        this.state.completed = true;
        this.state.totalDistance = this.state.x;
        this.state.flightTime = this.state.t;
        break;
      }
    }

    this.state.trajectory.push({ x: this.state.x, y: this.state.y });
    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    const rad = this.params.angle * Math.PI/180;
    const range = this.params.v0**2 * Math.sin(2*rad)/this.params.g;
    const height = this.params.h0 + (this.params.v0*Math.sin(rad))**2/(2*this.params.g);
    this.scale = Math.min(4.5, (w-this.originX-30)/Math.max(10,range), (this.originY-25)/Math.max(10,height));
    // 1. Draw Grid lines & ground
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;
    for (let x = this.originX; x < w; x += 10 * this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = this.originY; y > 0; y -= 10 * this.scale) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // Ground platform
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fillRect(0, this.originY, w, h - this.originY);
    this.ctx.strokeStyle = '#38ef7d';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.originY);
    this.ctx.lineTo(w, this.originY);
    this.ctx.stroke();

    // 2. Draw Trajectory Path
    if (this.state.trajectory.length > 1) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([4, 4]);

      const first = this.state.trajectory[0];
      this.ctx.moveTo(this.originX + first.x * this.scale, this.originY - first.y * this.scale);

      for (let i = 1; i < this.state.trajectory.length; i++) {
        const pt = this.state.trajectory[i];
        this.ctx.lineTo(this.originX + pt.x * this.scale, this.originY - pt.y * this.scale);
      }
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // 3. Draw Projectile Body
    const currentPxX = this.originX + this.state.x * this.scale;
    const currentPxY = this.originY - this.state.y * this.scale;

    this.ctx.save();
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.beginPath();
    this.ctx.arc(currentPxX, currentPxY, 8, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // 4. Draw Velocity Vectors (vx, vy, v_resultant)
    if (this.params.showVectors && (this.state.running || !this.state.completed)) {
      const vScale = 1.2;
      // Resultant velocity vector (cyan)
      this.drawArrow(currentPxX, currentPxY, currentPxX + this.state.vx * vScale, currentPxY - this.state.vy * vScale, '#00f2fe', 2.5);
      // Horizontal vx component (emerald)
      this.drawArrow(currentPxX, currentPxY, currentPxX + this.state.vx * vScale, currentPxY, '#38ef7d', 1.5);
      // Vertical vy component (amber)
      this.drawArrow(currentPxX, currentPxY, currentPxX, currentPxY - this.state.vy * vScale, '#f6d365', 1.5);
    }
  }

  drawArrow(fromX, fromY, toX, toY, color, width) {
    const headLen = 8;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 4) return;

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = width;

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
