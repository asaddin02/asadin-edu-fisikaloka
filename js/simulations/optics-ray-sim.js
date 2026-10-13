// Fisikaloka · Interactive Simulation: Optics & Ray Tracing (Snell's Law & Thin Lens Ray Diagram)

export class OpticsRaySimulation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    this.mode = 'refraction'; // 'refraction' or 'lens'

    // Parameters for Snell's Refraction mode
    this.refractionParams = {
      n1: 1.00,        // Air
      n2: 1.50,        // Glass
      theta1Deg: 40    // Incident angle (degrees)
    };

    // Parameters for Thin Lens mode
    this.lensParams = {
      focalLength: 120, // px (+ for convex, - for concave)
      objectDist: 220,  // px (do)
      objectHeight: 70  // px (ho)
    };

    this.isDraggingObject = false;
  }

  init(canvas, hudElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.hudElement = hudElement;

    this.resize();
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
  }

  onMouseDown = (e) => {
    if (this.mode !== 'lens') return;
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const lensX = rect.width / 2;
    const objX = lensX - this.lensParams.objectDist;
    const objY = rect.height / 2 - this.lensParams.objectHeight;

    if (Math.abs(mx - objX) < 20 && Math.abs(my - objY) < 30) {
      this.isDraggingObject = true;
    }
  };

  onMouseMove = (e) => {
    if (!this.isDraggingObject || !this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const lensX = rect.width / 2;
    const centerY = rect.height / 2;

    this.lensParams.objectDist = Math.max(40, Math.min(lensX - 20, lensX - mx));
    this.lensParams.objectHeight = Math.max(20, Math.min(120, centerY - my));
    this.updateHUD();
  };

  onMouseUp = () => {
    this.isDraggingObject = false;
  };

  updateHUD() {
    if (!this.hudElement) return;

    if (this.mode === 'refraction') {
      const rad1 = (this.refractionParams.theta1Deg * Math.PI) / 180;
      const sinTheta2 = (this.refractionParams.n1 / this.refractionParams.n2) * Math.sin(rad1);
      const isTIR = sinTheta2 > 1.0;
      const theta2Deg = isTIR ? null : ((Math.asin(sinTheta2) * 180) / Math.PI).toFixed(1);

      let criticalAngleText = 'Tidak ada (n1 <= n2)';
      if (this.refractionParams.n1 > this.refractionParams.n2) {
        criticalAngleText = ((Math.asin(this.refractionParams.n2 / this.refractionParams.n1) * 180) / Math.PI).toFixed(1) + '°';
      }

      this.hudElement.innerHTML = `
        <div class="hud-line"><span>Medium 1 (n₁):</span> <span class="hud-val">${this.refractionParams.n1.toFixed(2)}</span></div>
        <div class="hud-line"><span>Medium 2 (n₂):</span> <span class="hud-val">${this.refractionParams.n2.toFixed(2)}</span></div>
        <div class="hud-line"><span>Sudut Datang (θ₁):</span> <span class="hud-val">${this.refractionParams.theta1Deg}°</span></div>
        <div class="hud-line"><span>Sudut Bias (θ₂):</span> <span class="hud-val" style="color: ${isTIR ? '#ff5858' : '#00f2fe'}">${isTIR ? 'PEMANTULAN TOTAL (TIR)' : theta2Deg + '°'}</span></div>
        <div class="hud-line"><span>Sudut Kritis (θ_c):</span> <span class="hud-val" style="color: #f6d365">${criticalAngleText}</span></div>
      `;
    } else {
      // Thin lens formula: 1/f = 1/do + 1/di -> di = (do * f) / (do - f)
      const f = this.lensParams.focalLength;
      const doVal = this.lensParams.objectDist;
      const diVal = (doVal === f) ? Infinity : (doVal * f) / (doVal - f);
      const M = (doVal === f) ? Infinity : -diVal / doVal;
      const imageType = (diVal > 0) ? 'Nyata & Terbalik' : 'Maya & Tegak';

      this.hudElement.innerHTML = `
        <div class="hud-line"><span>Jarak Fokus (f):</span> <span class="hud-val">${f} px</span></div>
        <div class="hud-line"><span>Jarak Benda (s₀):</span> <span class="hud-val">${doVal.toFixed(0)} px</span></div>
        <div class="hud-line"><span>Jarak Bayangan (sᵢ):</span> <span class="hud-val" style="color: #00f2fe">${isFinite(diVal) ? diVal.toFixed(1) + ' px' : 'Tak Terhingga (Di Titik Fokus)'}</span></div>
        <div class="hud-line"><span>Perbesaran (M):</span> <span class="hud-val">${isFinite(M) ? Math.abs(M).toFixed(2) + '×' : '∞'}</span></div>
        <div class="hud-line"><span>Sifat Bayangan:</span> <span class="hud-val" style="color: #f6d365">${isFinite(diVal) ? imageType : 'Sinar Sejajar'}</span></div>
      `;
    }
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    if (this.mode === 'refraction') {
      this.drawRefraction(w, h);
    } else {
      this.drawThinLens(w, h);
    }
  }

  drawRefraction(w, h) {
    const midX = w / 2;
    const midY = h / 2;

    // Draw Medium 2 bottom tint
    this.ctx.fillStyle = 'rgba(0, 114, 255, 0.15)';
    this.ctx.fillRect(0, midY, w, h - midY);

    // Boundary interface line
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, midY);
    this.ctx.lineTo(w, midY);
    this.ctx.stroke();

    // Normal dashed line
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.moveTo(midX, 20);
    this.ctx.lineTo(midX, h - 20);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Medium labels
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '12px Inter, sans-serif';
    this.ctx.fillText(`Medium 1 (n₁ = ${this.refractionParams.n1.toFixed(2)})`, 20, midY - 20);
    this.ctx.fillText(`Medium 2 (n₂ = ${this.refractionParams.n2.toFixed(2)})`, 20, midY + 30);

    // Incident Ray (top left towards origin)
    const rad1 = (this.refractionParams.theta1Deg * Math.PI) / 180;
    const rayLen = 180;
    const incX = midX - rayLen * Math.sin(rad1);
    const incY = midY - rayLen * Math.cos(rad1);

    this.ctx.strokeStyle = '#f6d365';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(incX, incY);
    this.ctx.lineTo(midX, midY);
    this.ctx.stroke();

    // Reflected Ray
    const reflX = midX + rayLen * Math.sin(rad1);
    const reflY = midY - rayLen * Math.cos(rad1);
    this.ctx.strokeStyle = 'rgba(246, 211, 101, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(midX, midY);
    this.ctx.lineTo(reflX, reflY);
    this.ctx.stroke();

    // Refracted Ray or TIR
    const sinTheta2 = (this.refractionParams.n1 / this.refractionParams.n2) * Math.sin(rad1);
    if (sinTheta2 <= 1.0) {
      const rad2 = Math.asin(sinTheta2);
      const refrX = midX + rayLen * Math.sin(rad2);
      const refrY = midY + rayLen * Math.cos(rad2);

      this.ctx.strokeStyle = '#00f2fe';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(midX, midY);
      this.ctx.lineTo(refrX, refrY);
      this.ctx.stroke();
    } else {
      // Total Internal Reflection banner
      this.ctx.fillStyle = '#ff5858';
      this.ctx.font = 'bold 14px Inter, sans-serif';
      this.ctx.fillText('⚡ PEMANTULAN INTERNAL TOTAL', midX + 30, midY - 50);
    }
  }

  drawThinLens(w, h) {
    const lensX = w / 2;
    const centerY = h / 2;
    const f = this.lensParams.focalLength;
    const doVal = this.lensParams.objectDist;
    const ho = this.lensParams.objectHeight;

    // Principal optical axis
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(w, centerY);
    this.ctx.stroke();

    // Lens vertical plane
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(lensX, centerY - 150);
    this.ctx.lineTo(lensX, centerY + 150);
    this.ctx.stroke();

    // Focal points markers F and 2F
    this.ctx.fillStyle = '#f6d365';
    this.ctx.font = '11px Inter, sans-serif';
    // Left F
    this.ctx.beginPath();
    this.ctx.arc(lensX - f, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillText('F', lensX - f - 4, centerY + 16);
    // Right F
    this.ctx.beginPath();
    this.ctx.arc(lensX + f, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillText('F', lensX + f - 4, centerY + 16);

    // Object Arrow (green)
    const objX = lensX - doVal;
    const objTopY = centerY - ho;
    this.ctx.strokeStyle = '#38ef7d';
    this.ctx.fillStyle = '#38ef7d';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(objX, centerY);
    this.ctx.lineTo(objX, objTopY);
    this.ctx.stroke();
    // Arrow head
    this.ctx.beginPath();
    this.ctx.moveTo(objX - 6, objTopY + 10);
    this.ctx.lineTo(objX, objTopY);
    this.ctx.lineTo(objX + 6, objTopY + 10);
    this.ctx.fill();
    this.ctx.fillText('Benda', objX - 16, objTopY - 8);

    // Image calculation
    const di = (doVal === f) ? null : (doVal * f) / (doVal - f);
    if (di !== null && Math.abs(di) < 600) {
      const hi = - (di / doVal) * ho;
      const imgX = lensX + di;
      const imgTopY = centerY - hi;

      // Image Arrow (cyan)
      this.ctx.strokeStyle = di > 0 ? '#00f2fe' : '#b388ff';
      this.ctx.fillStyle = di > 0 ? '#00f2fe' : '#b388ff';
      this.ctx.lineWidth = 3;
      if (di < 0) this.ctx.setLineDash([4, 4]); // dashed for virtual
      this.ctx.beginPath();
      this.ctx.moveTo(imgX, centerY);
      this.ctx.lineTo(imgX, imgTopY);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      this.ctx.fillText(di > 0 ? 'Bayangan Nyata' : 'Bayangan Maya', imgX - 30, imgTopY + (di > 0 ? 18 : -10));

      // Principal Ray 1: Parallel to axis, then through right focal point
      this.ctx.strokeStyle = 'rgba(246, 211, 101, 0.7)';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(objX, objTopY);
      this.ctx.lineTo(lensX, objTopY);
      this.ctx.lineTo(imgX, imgTopY);
      this.ctx.stroke();

      // Principal Ray 2: Straight through optical center of lens
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
      this.ctx.beginPath();
      this.ctx.moveTo(objX, objTopY);
      this.ctx.lineTo(lensX, centerY);
      this.ctx.lineTo(imgX, imgTopY);
      this.ctx.stroke();
    }
  }

  loop = () => {
    if (!document.hidden && !this.animationPaused) this.draw();
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
