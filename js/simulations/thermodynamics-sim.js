import { carnotModel } from './physics-models.js';
// Fisikaloka · Interactive Simulation: Thermodynamic Cycles & Carnot Heat Engine Lab

export class ThermodynamicsSimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.params = {
      Th: 600, // Kelvin (Hot reservoir)
      Tc: 300, // Kelvin (Cold reservoir)
      speed: 1
    };

    this.state = {
      progress: 0, // 0 to 4 (stages of cycle)
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

  updateHUD() {
    if (!this.hudElement) return;
    const model = carnotModel(this.params.Th, this.params.Tc);
    const eta = (model.efficiency * 100).toFixed(1);
    const Wnet = model.work.toFixed(1);

    const stages = [
      '1. Ekspansi Isotermal (Suhu T_H, Kalor Q_H Masuk)',
      '2. Ekspansi Adiabatik (Q = 0, Suhu Turun ke T_C)',
      '3. Kompresi Isotermal (Suhu T_C, Kalor Q_C Dibuang)',
      '4. Kompresi Adiabatik (Q = 0, Suhu Naik ke T_H)'
    ];
    const currentStage = stages[Math.floor(this.state.progress) % 4];

    this.hudElement.innerHTML = `
      <div class="hud-line"><span>Suhu Panas (T_H):</span> <span class="hud-val" style="color: #ff5858">${this.params.Th} K</span></div>
      <div class="hud-line"><span>Suhu Dingin (T_C):</span> <span class="hud-val" style="color: #00f2fe">${this.params.Tc} K</span></div>
      <div class="hud-line"><span>Efisiensi Carnot (η):</span> <span class="hud-val" style="color: #f6d365">${eta}%</span></div>
      <div class="hud-line"><span>Kerja Bersih (W_net):</span> <span class="hud-val">${Wnet} J</span></div>
      <div class="hud-line"><span>Tahap Aktif:</span> <span class="hud-val" style="font-size: 0.75rem">${currentStage}</span></div>
    `;
  }

  update(dt) {
    if (!this.state.running) return;
    this.state.progress = (this.state.progress + dt * 0.8 * this.params.speed) % 4;
    this.updateHUD();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    const ox = 70;
    const oy = h - 60;
    const pw = w - 140;
    const ph = h - 120;

    // 1. Draw P-V Coordinate Axes
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    // Pressure P (vertical axis)
    this.ctx.moveTo(ox, 40);
    this.ctx.lineTo(ox, oy);
    // Volume V (horizontal axis)
    this.ctx.lineTo(ox + pw, oy);
    this.ctx.stroke();

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '12px Inter, sans-serif';
    this.ctx.fillText('Tekanan (P)', ox - 10, 30);
    this.ctx.fillText('V', ox + pw + 4, oy + 4);

    const model = carnotModel(this.params.Th, this.params.Tc);
    const project = ({V,P}) => ({x:ox + V/model.maxV*pw*.9, y:oy-P/model.maxP*ph*.9});
    this.ctx.beginPath();
    for (let stage=0; stage<4; stage++) {
      for (let i=0;i<=60;i++) {
        const p=project(model.point(stage,i/60));
        if (stage===0 && i===0) this.ctx.moveTo(p.x,p.y); else this.ctx.lineTo(p.x,p.y);
      }
    }
    this.ctx.closePath(); this.ctx.fillStyle='rgba(0,242,254,.12)'; this.ctx.fill();
    this.ctx.strokeStyle='#00f2fe'; this.ctx.lineWidth=2.5; this.ctx.stroke();
    const stage=Math.floor(this.state.progress)%4, f=this.state.progress-stage;
    const dot=project(model.point(stage,f));
    this.ctx.fillStyle='#f6d365'; this.ctx.beginPath(); this.ctx.arc(dot.x,dot.y,7,0,Math.PI*2); this.ctx.fill();
    this.ctx.font='11px monospace'; this.ctx.fillStyle='#fff';
    ['A','B','C','D'].forEach((name,i)=>{const p=project(model.point(i,0));this.ctx.fillText(name,p.x+6,p.y-8);});
    this.ctx.fillText(`V max ${model.maxV.toFixed(3)} m³`,ox,oy+28);
    this.ctx.fillText(`P max ${(model.maxP/1000).toFixed(1)} kPa`,ox,oy+44);
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
