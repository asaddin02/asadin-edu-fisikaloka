// Fisikaloka · Interactive Simulation: Wave Propagation & Doppler Effect Lab (Subsonic & Supersonic Mach Cone)

export class WaveDopplerSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      sourceSpeed: 180, // m/s
      waveSpeed: 340,   // m/s (speed of sound in air)
      emitFrequency: 4, // Hz (wavefronts per second)
      audioFeedback: false
    };

    this.state = {
      sourceX: 100,
      sourceY: 200,
      sourceVx: 180,
      t: 0,
      wavefronts: [], // { x, y, r, tEmit }
      lastEmitT: 0,
      machNumber: 0.53,
      running: true
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
    this.state.sourceY = rect.height / 2;
  }

  reset() {
    this.state.sourceX = 80;
    this.state.sourceVx = this.params.sourceSpeed;
    this.state.wavefronts = [];
    this.state.t = 0;
    this.state.lastEmitT = 0;
    this.updateHUD();
  }

  updateHUD() {
    if (!this.hudElement) return;
    const M = (this.params.sourceSpeed / this.params.waveSpeed).toFixed(2);
    let regime = 'Subsonik (M < 1)';
    if (Math.abs(M - 1.0) < 0.05) regime = 'Sonic Barrier (M ≈ 1)';
    else if (M > 1.0) regime = 'Supersonik & Gelombang Kejut Kerucut Mach (M > 1)';

    const fForward = (this.params.sourceSpeed < this.params.waveSpeed)
      ? (this.params.emitFrequency / (1 - this.params.sourceSpeed / this.params.waveSpeed)).toFixed(1)
      : 'Tidak berlaku: sumber sonik/supersonik';
    const fBackward = (this.params.emitFrequency / (1 + this.params.sourceSpeed / this.params.waveSpeed)).toFixed(1);

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Bilangan Mach (M):</span> <span class="hud-val">${M}</span></div>
      <div class="hud-line"><span>Rezim Gerak:</span> <span class="hud-val" style="color: #f6d365">${regime}</span></div>
      <div class="hud-line"><span>Frekuensi Sumber (f₀):</span> <span class="hud-val">${this.params.emitFrequency} Hz</span></div>
      <div class="hud-line"><span>Frekuensi Depan:</span> <span class="hud-val" style="color: #00f2fe">${fForward} Hz</span></div>
      <div class="hud-line"><span>Frekuensi Belakang:</span> <span class="hud-val" style="color: #ff5858">${fBackward} Hz</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;

    this.state.t += dt;
    const w = this.canvas.getBoundingClientRect().width;

    // Move wave source along X axis
    this.state.sourceX += (this.params.sourceSpeed / 2) * dt;
    if (this.state.sourceX > w + 50) {
      this.state.sourceX = -40;
    }

    // Emit new wavefront at interval 1 / f
    const emitInterval = 1 / this.params.emitFrequency;
    if (this.state.t - this.state.lastEmitT >= emitInterval) {
      this.state.wavefronts.push({
        x: this.state.sourceX,
        y: this.state.sourceY,
        r: 0
      });
      this.state.lastEmitT = this.state.t;
    }

    // Expand all existing circular wavefronts
    const maxRadius = Math.max(w, 800);
    for (let i = this.state.wavefronts.length - 1; i >= 0; i--) {
      const wf = this.state.wavefronts[i];
      wf.r += (this.params.waveSpeed / 2) * dt;
      if (wf.r > maxRadius) {
        this.state.wavefronts.splice(i, 1);
      }
    }

    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    // Draw central axis line
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([6, 6]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.state.sourceY);
    this.ctx.lineTo(w, this.state.sourceY);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // 1. Draw Expanding Wavefront Rings
    const M = this.params.sourceSpeed / this.params.waveSpeed;
    this.ctx.lineWidth = 1.8;

    for (const wf of this.state.wavefronts) {
      const alpha = Math.max(0.08, 1 - wf.r / 700);
      this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.8})`;
      this.ctx.beginPath();
      this.ctx.arc(wf.x, wf.y, wf.r, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // 2. Draw Supersonic Mach Cone Envelope if M > 1
    if (M > 1.0) {
      const sinMu = 1 / M;
      const mu = Math.asin(sinMu); // Mach angle
      const coneLength = 500;

      this.ctx.strokeStyle = 'rgba(255, 65, 108, 0.85)';
      this.ctx.lineWidth = 2.5;
      this.ctx.setLineDash([4, 2]);

      // Top shock wave line
      this.ctx.beginPath();
      this.ctx.moveTo(this.state.sourceX, this.state.sourceY);
      this.ctx.lineTo(
        this.state.sourceX - coneLength * Math.cos(mu),
        this.state.sourceY - coneLength * Math.sin(mu)
      );
      this.ctx.stroke();

      // Bottom shock wave line
      this.ctx.beginPath();
      this.ctx.moveTo(this.state.sourceX, this.state.sourceY);
      this.ctx.lineTo(
        this.state.sourceX - coneLength * Math.cos(mu),
        this.state.sourceY + coneLength * Math.sin(mu)
      );
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // 3. Draw Moving Wave Source (Aircraft / Jet icon)
    this.ctx.save();
    this.ctx.shadowColor = '#f6d365';
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = '#f6d365';
    this.ctx.beginPath();
    this.ctx.arc(this.state.sourceX, this.state.sourceY, 9, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // Source label
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.fillStyle = '#f6d365';
    this.ctx.fillText('Sumber Bunyi', this.state.sourceX - 35, this.state.sourceY - 16);
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
