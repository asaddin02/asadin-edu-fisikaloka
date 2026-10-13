// Fisikaloka · Interactive Simulation: Coulomb Electric Field & Charges Sandbox

export class ElectricFieldSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Default configuration with dipole (+q and -q)
    this.charges = [
      { id: 1, x: 260, y: 240, q: +1 },
      { id: 2, x: 440, y: 240, q: -1 }
    ];

    // Draggable / roaming test charge
    this.testCharge = {
      x: 350,
      y: 160,
      vx: 0,
      vy: 0,
      q: +0.2,
      active: true,
      trail: []
    };

    this.draggedCharge = null;
    this.mouseMode = 'addPos'; // 'drag', 'addPos', 'addNeg'
    this.params = {
      showVectors: true,
      showEquipotential: true
    };
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.resize();
    this.resetDipole();
    this.bindEvents();
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

  bindEvents() {
    this.canvas.addEventListener('pointerdown', this.onMouseDown);
    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);
    window.addEventListener('pointercancel', this.onMouseUp);
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  onMouseDown = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Check if clicked existing charge to drag
    for (const c of this.charges) {
      const dist = Math.sqrt((c.x - mx) ** 2 + (c.y - my) ** 2);
      if (dist < 22) {
        if (e.button === 2) {
          // Right-click deletes charge
          this.charges = this.charges.filter(item => item.id !== c.id);
          this.updateHUD();
          return;
        }
        this.draggedCharge = c;
        return;
      }
    }

    // Otherwise add new charge based on mode
    if (e.button === 0 && this.charges.length < 30) {
      const qVal = this.mouseMode === 'addNeg' ? -1 : +1;
      this.charges.push({
        id: Date.now(),
        x: mx,
        y: my,
        q: qVal
      });
      this.updateHUD();
    }
  };

  onMouseMove = (e) => {
    if (!this.draggedCharge || !this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.draggedCharge.x = e.clientX - rect.left;
    this.draggedCharge.y = e.clientY - rect.top;
  };

  onMouseUp = () => {
    this.draggedCharge = null;
  };

  clearCharges() {
    this.charges = [];
    this.testCharge.trail = [];
    this.updateHUD();
  }

  resetDipole() {
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;
    this.charges = [
      { id: 1, x: w / 2 - 90, y: h / 2, q: +1 },
      { id: 2, x: w / 2 + 90, y: h / 2, q: -1 }
    ];
    this.testCharge.x = w / 2;
    this.testCharge.y = h / 2 - 80;
    this.testCharge.vx = 0;
    this.testCharge.vy = 0;
    this.testCharge.trail = [];
    this.updateHUD();
  }

  // Calculate net electric field vector E = (Ex, Ey) at coordinate (x, y)
  getElectricField(x, y) {
    let Ex = 0;
    let Ey = 0;
    const k = 8000; // visual scaling constant

    for (const c of this.charges) {
      const dx = x - c.x;
      const dy = y - c.y;
      const r2 = dx * dx + dy * dy + 100; // softening factor
      const r = Math.sqrt(r2);
      const E_mag = (k * c.q) / r2;

      Ex += E_mag * (dx / r);
      Ey += E_mag * (dy / r);
    }
    return { Ex, Ey, mag: Math.sqrt(Ex * Ex + Ey * Ey) };
  }

  updateHUD() {
    if (!this.hudElement) return;
    const numPos = this.charges.filter(c => c.q > 0).length;
    const numNeg = this.charges.filter(c => c.q < 0).length;
    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Jumlah Muatan (+q):</span> <span class="hud-val" style="color: #ff5858">${numPos}</span></div>
      <div class="hud-line"><span>Jumlah Muatan (-q):</span> <span class="hud-val" style="color: #00f2fe">${numNeg}</span></div>
      <div class="hud-line"><span>Petunjuk Interaksi:</span> <span class="hud-val" style="color: #f6d365">Klik utk tambah, geser utk pindah</span></div>
      <div class="hud-line"><span>Klik Kanan:</span> <span class="hud-val">Hapus muatan</span></div>
    `;
  }

  update(dt) {
    if (!this.testCharge.active || this.charges.length === 0) return;

    // Move test charge using Lorentz electrostatic force F = q * E -> a = F / m
    const ef = this.getElectricField(this.testCharge.x, this.testCharge.y);
    const m = 1.0;
    const ax = (this.testCharge.q * ef.Ex) / m;
    const ay = (this.testCharge.q * ef.Ey) / m;

    this.testCharge.vx = (this.testCharge.vx + ax * dt) * 0.98; // slight drag
    this.testCharge.vy = (this.testCharge.vy + ay * dt) * 0.98;

    this.testCharge.x += this.testCharge.vx * dt * 10;
    this.testCharge.y += this.testCharge.vy * dt * 10;

    this.testCharge.trail.push({ x: this.testCharge.x, y: this.testCharge.y });
    if (this.testCharge.trail.length > 50) this.testCharge.trail.shift();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Electric Field Vector Grid (Arrows)
    if (this.params.showVectors && this.charges.length > 0) {
      const step = 32;
      for (let x = 20; x < w - 10; x += step) {
        for (let y = 20; y < h - 10; y += step) {
          const ef = this.getElectricField(x, y);
          if (ef.mag > 0.01) {
            const arrowLen = Math.min(18, Math.max(6, Math.log(ef.mag + 1) * 3.5));
            const angle = Math.atan2(ef.Ey, ef.Ex);

            const alpha = Math.min(0.65, Math.max(0.12, ef.mag / 20));
            this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            this.ctx.lineWidth = 1.2;

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + arrowLen * Math.cos(angle), y + arrowLen * Math.sin(angle));
            this.ctx.stroke();
          }
        }
      }
    }

    // 2. Draw Test Charge Trajectory Trail
    if (this.testCharge.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(246, 211, 101, 0.4)';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([2, 2]);
      this.ctx.moveTo(this.testCharge.trail[0].x, this.testCharge.trail[0].y);
      for (let i = 1; i < this.testCharge.trail.length; i++) {
        this.ctx.lineTo(this.testCharge.trail[i].x, this.testCharge.trail[i].y);
      }
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // 3. Draw Test Charge Particle
    this.ctx.fillStyle = '#f6d365';
    this.ctx.beginPath();
    this.ctx.arc(this.testCharge.x, this.testCharge.y, 6, 0, Math.PI * 2);
    this.ctx.fill();

    // 4. Draw Charged Source Bodies
    for (const c of this.charges) {
      const isPos = c.q > 0;
      const col = isPos ? '#ff4b2b' : '#00f2fe';

      this.ctx.save();
      this.ctx.shadowColor = col;
      this.ctx.shadowBlur = 18;
      this.ctx.fillStyle = col;
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y, 16, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      // Sign symbol (+ or -)
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 16px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(isPos ? '+' : '−', c.x, c.y);
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
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
    window.removeEventListener('pointercancel', this.onMouseUp);
  }
}
