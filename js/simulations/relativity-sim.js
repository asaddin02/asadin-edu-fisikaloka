// Fisikaloka · Interactive Simulation: Special Relativity (Time Dilation & Length Contraction)

export class RelativitySimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      beta: 0.85, // v / c (0 to 0.99)
      showSpacetime: true
    };

    this.state = {
      tRest: 0,
      tMoving: 0,
      shipX: 100,
      lightClockY: 0,
      lightClockDir: 1,
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

  getLorentzFactor() {
    const b2 = Math.min(0.999, Math.pow(this.params.beta, 2));
    return 1 / Math.sqrt(1 - b2);
  }

  updateHUD() {
    if (!this.hudElement) return;
    const gamma = this.getLorentzFactor();
    const vKmS = (this.params.beta * 299792.458).toLocaleString('id-ID', { maximumFractionDigits: 0 });
    const contractionPercent = ((1 - 1 / gamma) * 100).toFixed(1);

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Kelajuan Relatif (v):</span> <span class="hud-val" style="color: #00f2fe">${(this.params.beta * 100).toFixed(1)}% c (${vKmS} km/s)</span></div>
      <div class="hud-line"><span>Faktor Lorentz (γ):</span> <span class="hud-val" style="color: #f6d365">${gamma.toFixed(3)}×</span></div>
      <div class="hud-line"><span>Waktu Pengamat Diam:</span> <span class="hud-val">${this.state.tRest.toFixed(1)} s</span></div>
      <div class="hud-line"><span>Waktu Wahana Bergerak:</span> <span class="hud-val" style="color: #38ef7d">${this.state.tMoving.toFixed(1)} s</span></div>
      <div class="hud-line"><span>Kontraksi Panjang:</span> <span class="hud-val" style="color: #ff5858">Menyusut ${contractionPercent}%</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;
    const gamma = this.getLorentzFactor();

    this.state.tRest += dt * 3;
    // Moving clock ticks slower: Δt_moving = Δt_rest / γ
    this.state.tMoving += (dt * 3) / gamma;

    const w = this.canvas.getBoundingClientRect().width;
    const speedPx = this.params.beta * 240;
    this.state.shipX += speedPx * dt;
    if (this.state.shipX > w + 100) {
      this.state.shipX = -120;
    }

    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    const gamma = this.getLorentzFactor();

    // 1. Stationary Observer Track (Top half)
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(40, 160);
    this.ctx.lineTo(w - 40, 160);
    this.ctx.stroke();

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = 'bold 12px Inter, sans-serif';
    this.ctx.fillText('KERANGKA DIAM (LABORATORIUM BUMI)', 40, 40);

    // Stationary Clock graphic
    this.drawClock(120, 100, 36, this.state.tRest, '#00f2fe', 'Jam Diam');

    // 2. Relativistic Moving Spacecraft Track (Bottom half)
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.beginPath();
    this.ctx.moveTo(40, 340);
    this.ctx.lineTo(w - 40, 340);
    this.ctx.stroke();

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText('KERANGKA BERGERAK (WAHANA RELATIVISTIK DENGAN KELAJUAN v)', 40, 220);

    // Relativistic Spaceship Body (length contracted by 1 / gamma)
    const baseLength = 110;
    const contractedLength = baseLength / gamma;
    const shipHeight = 36;
    const sx = this.state.shipX;
    const sy = 340 - shipHeight / 2;

    this.ctx.save();
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.lineWidth = 2;

    // Draw aerodynamic/hull capsule
    this.ctx.beginPath();
    this.ctx.roundRect(sx, sy, contractedLength, shipHeight, 8);
    this.ctx.fill();
    this.ctx.stroke();

    // Exhaust thrust flame
    this.ctx.fillStyle = '#f6d365';
    this.ctx.beginPath();
    this.ctx.moveTo(sx, sy + 6);
    this.ctx.lineTo(sx - 25 * this.params.beta, sy + shipHeight / 2);
    this.ctx.lineTo(sx, sy + shipHeight - 6);
    this.ctx.fill();
    this.ctx.restore();

    // Moving Clock attached to spaceship
    this.drawClock(Math.min(w - 80, Math.max(80, sx + contractedLength / 2)), 260, 28, this.state.tMoving, '#38ef7d', 'Jam Wahana (Lambat)');
  }

  drawClock(cx, cy, radius, timeSec, color, label) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2.5;
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Clock hand angle based on timeSec
    const handAngle = (timeSec % 60) * (Math.PI / 30) - Math.PI / 2;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(cx + (radius - 8) * Math.cos(handAngle), cy + (radius - 8) * Math.sin(handAngle));
    this.ctx.stroke();

    // Label
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(label, cx, cy + radius + 18);
    this.ctx.font = '10px Courier, monospace';
    this.ctx.fillStyle = color;
    this.ctx.fillText(`${timeSec.toFixed(1)} s`, cx, cy + radius + 30);
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
