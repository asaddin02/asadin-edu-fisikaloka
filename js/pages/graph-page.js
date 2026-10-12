import { navigate } from '../core/router.js';
import { resolveReference } from '../core/catalog.js';
// Phsyco · Interactive Physics Knowledge Graph Visualizer Page

import { PHYSICS_GRAPH_DATA } from '../data/graph-data.js';

export class GraphVisualizer {
  constructor(canvas, infoPanel) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.infoPanel = infoPanel;
    this.animId = null;

    // Deep copy nodes and links
    this.nodes = PHYSICS_GRAPH_DATA.nodes.map(n => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: n.size || 20
    }));

    this.links = PHYSICS_GRAPH_DATA.links.map(l => ({ ...l }));

    this.draggedNode = null;
    this.hoveredNode = null;
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  init() {
    this.resize();
    this.initPositions();
    this.bindEvents();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
  }

  initPositions() {
    const rect = this.canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const total = this.nodes.length;

    // Arrange initially in loose spiral
    this.nodes.forEach((n, idx) => {
      const angle = idx * 0.45;
      const r = 40 + idx * 8;
      n.x = cx + r * Math.cos(angle);
      n.y = cy + r * Math.sin(angle);
    });
  }

  bindEvents() {
    this.canvas.addEventListener('pointerdown', this.onMouseDown);
    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);
    this.canvas.addEventListener('wheel', this.onWheel, {passive:false});
    this.onCancel = () => { this.draggedNode = null; this.isPanning = false; };
    window.addEventListener('pointercancel', this.onCancel);
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
  }

  screenToWorld(sx, sy) {
    return {
      x: (sx - this.panX) / this.zoom,
      y: (sy - this.panY) / this.zoom
    };
  }

  getNodeAt(worldX, worldY) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      const dist = Math.sqrt((n.x - worldX) ** 2 + (n.y - worldY) ** 2);
      if (dist <= n.radius + 4) return n;
    }
    return null;
  }

  onMouseDown = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const world = this.screenToWorld(mx, my);

    const hit = this.getNodeAt(world.x, world.y);
    if (hit) {
      this.draggedNode = hit;
      this.dragStart = {x:e.clientX, y:e.clientY};
      this.dragMoved = false;
    } else {
      this.isPanning = true;
      this.lastMouseX = mx;
      this.lastMouseY = my;
    }
  };

  onMouseMove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const world = this.screenToWorld(mx, my);

    if (this.draggedNode) {
      if (Math.hypot(e.clientX-this.dragStart.x,e.clientY-this.dragStart.y)>6) this.dragMoved=true;
      this.draggedNode.x = world.x;
      this.draggedNode.y = world.y;
      this.draggedNode.vx = 0;
      this.draggedNode.vy = 0;
    } else if (this.isPanning) {
      this.panX += mx - this.lastMouseX;
      this.panY += my - this.lastMouseY;
      this.lastMouseX = mx;
      this.lastMouseY = my;
    } else {
      const hit = this.getNodeAt(world.x, world.y);
      this.hoveredNode = hit;
      this.canvas.style.cursor = hit ? 'pointer' : 'grab';
      this.updateInfoPanel(hit);
    }
  };

  onMouseUp = (e) => {
    if (this.draggedNode) {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const world = this.screenToWorld(mx, my);
      const hit = this.getNodeAt(world.x, world.y);

      // If click without large movement, navigate to entity
      if (hit && hit.id === this.draggedNode.id && !this.dragMoved) {
        const ref = resolveReference(hit.id);
        if (ref) navigate(ref.url);
      }
    }
    this.draggedNode = null;
    this.isPanning = false;
  };

  onWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    this.zoom = Math.max(0.4, Math.min(2.5, this.zoom * zoomFactor));
  };

  updateInfoPanel(node) {
    if (!this.infoPanel) return;
    if (!node || this.infoNodeId === node.id) return;
    this.infoNodeId = node.id;
    const ref = resolveReference(node.id);
    const connectedLinks = this.links.filter(l => l.source === node.id || l.target === node.id);
    const connectedNodeIds = connectedLinks.map(l => l.source === node.id ? l.target : l.source);

    this.infoPanel.innerHTML = `
      <div>
        <span class="entity-type-badge badge-${node.category}" style="margin-bottom: 8px; display: inline-block;">${node.category}</span>
        <h3 style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 6px;">${node.label}</h3>
        <div style="font-size: 0.82rem; color: var(--cyan-bright); margin-bottom: 12px;">ID: ${node.id}</div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">
          Terhubung dengan <strong>${connectedNodeIds.length}</strong> konsep lain:
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${connectedNodeIds.map(resolveReference).filter(Boolean).map(r => `<a class="subtag" href="${r.url}">${r.name}</a>`).join('')}
        </div>
        <div style="margin-top: 14px;">
          <a href="${ref?.url || '/graph'}" class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem;">
            Buka Dossier Entitas ➔
          </a>
        </div>
      </div>
    `;
  }

  // Force-directed simulation physics step
  simulateForces() {
    const rect = this.canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // 1. Repulsion between all pairs of nodes (Coulomb-like)
    const kRepel = 2400;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist2 = dx * dx + dy * dy + 100;
        const dist = Math.sqrt(dist2);
        const force = kRepel / dist2;

        const fx = force * (dx / dist);
        const fy = force * (dy / dist);

        n1.vx -= fx;
        n1.vy -= fy;
        n2.vx += fx;
        n2.vy += fy;
      }
    }

    // 2. Spring attraction along links (Hooke's Law)
    const kSpring = 0.035;
    const restLen = 95;
    for (const link of this.links) {
      const source = this.nodes.find(n => n.id === link.source);
      const target = this.nodes.find(n => n.id === link.target);
      if (source && target) {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const displacement = dist - restLen;
        const force = kSpring * displacement;

        const fx = force * (dx / dist);
        const fy = force * (dy / dist);

        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      }
    }

    // 3. Centering force to prevent drift
    const kCenter = 0.008;
    for (const n of this.nodes) {
      n.vx += (cx - n.x) * kCenter;
      n.vy += (cy - n.y) * kCenter;

      // Apply damping & update position
      if (n !== this.draggedNode) {
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      }
    }
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    this.ctx.clearRect(0, 0, w, h);

    this.ctx.save();
    this.ctx.translate(this.panX, this.panY);
    this.ctx.scale(this.zoom, this.zoom);

    // 1. Draw Links
    for (const link of this.links) {
      const source = this.nodes.find(n => n.id === link.source);
      const target = this.nodes.find(n => n.id === link.target);
      if (source && target) {
        const isHighlighted = (this.hoveredNode && (this.hoveredNode.id === source.id || this.hoveredNode.id === target.id));
        this.ctx.strokeStyle = isHighlighted ? 'rgba(0, 242, 254, 0.8)' : 'rgba(255, 255, 255, 0.08)';
        this.ctx.lineWidth = isHighlighted ? 2.5 : 1.2;

        this.ctx.beginPath();
        this.ctx.moveTo(source.x, source.y);
        this.ctx.lineTo(target.x, target.y);
        this.ctx.stroke();
      }
    }

    // Category Color Mapping
    const catColors = {
      domain: '#00f2fe',
      quantity: '#4facfe',
      concept: '#38ef7d',
      law: '#f6d365',
      principle: '#00f5d4',
      constant: '#f093fb',
      equation: '#fa709a',
      phenomenon: '#ff7a18',
      particle: '#b388ff',
      theory: '#ff416c',
      field: '#00c6ff'
    };

    // 2. Draw Nodes
    for (const node of this.nodes) {
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
      const col = catColors[node.category] || '#00f2fe';

      this.ctx.save();
      if (isHovered) {
        this.ctx.shadowColor = col;
        this.ctx.shadowBlur = 18;
      }

      this.ctx.fillStyle = isHovered ? '#ffffff' : col;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, isHovered ? node.radius * 1.2 : node.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.restore();

      // Node label
      this.ctx.font = isHovered ? 'bold 12px Inter, sans-serif' : '10px Inter, sans-serif';
      this.ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.label, node.x, node.y + node.radius + 14);
    }

    this.ctx.restore();
  }

  loop = () => {
    if (!document.hidden) { this.simulateForces(); this.draw(); }
    this.animId = requestAnimationFrame(this.loop);
  };

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointercancel', this.onCancel);
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
  }
}

export function renderGraphPage(container, params = {}) {
  container.innerHTML = `
    <div class="content-wrap" style="padding-top: 32px; padding-bottom: 80px;">
      <!-- Header -->
      <div style="margin-bottom: 20px;">
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(179, 136, 255, 0.1); border-radius: var(--radius-full); color: var(--violet-quantum); font-size: 0.78rem; font-weight: 700; margin-bottom: 10px;">
          PETA RELASI JARINGAN PENGETAHUAN
        </div>
        <h1 style="font-size: 2.2rem; margin-bottom: 6px;">Physics Knowledge Graph</h1>
        <p>Visualisasi interaktif keterkaitan hukum, besaran, partikel, medan, dan teori fisika. Tidak ada konsep fisika yang berdiri sendiri.</p>
      </div>

<label for="graph-focus">Pilih konsep untuk melihat hubungan:</label>
      <select id="graph-focus">${PHYSICS_GRAPH_DATA.nodes.map(n=>`<option value="${n.id}" ${params.focus===n.id?'selected':''}>${n.label}</option>`).join('')}</select>
      <button class="sim-btn" id="graph-zoom-in" aria-label="Perbesar graf">+</button>
      <button class="sim-btn" id="graph-zoom-out" aria-label="Perkecil graf">−</button>
      <!-- Graph Container & Info HUD -->
      <div class="dossier-layout" style="display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 24px; align-items: start;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); height: 600px; position: relative; overflow: hidden;">
          <canvas id="physics-graph-canvas" role="img" aria-label="Graf relasi fisika; gunakan daftar navigasi di bawah untuk keyboard." style="touch-action: none; width: 100%; height: 100%; display: block;"></canvas>
          <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(8, 11, 20, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 14px; font-size: 0.78rem; color: var(--text-muted);">
            💡 Seret node untuk memindahkan · Scroll mouse untuk zoom · Klik node untuk detail
          </div>
        </div>

        <!-- Right Info Panel -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;" id="graph-node-info-panel">
          <div style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6;">
            Arahkan kursor atau seret node untuk melihat detail relasi konsep fisik. Klik untuk membuka dossier lengkap.
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#physics-graph-canvas');
  const infoPanel = container.querySelector('#graph-node-info-panel');
  const visualizer = new GraphVisualizer(canvas, infoPanel);
  visualizer.init();
  visualizer.updateInfoPanel(visualizer.nodes.find(n=>n.id===params.focus) || visualizer.nodes[0]);
  container.querySelector('#graph-focus').addEventListener('change', e=>{
    const node=visualizer.nodes.find(n=>n.id===e.target.value);
    visualizer.hoveredNode=node; visualizer.updateInfoPanel(node);
    const rect=canvas.getBoundingClientRect(); visualizer.panX=rect.width/2-node.x*visualizer.zoom; visualizer.panY=rect.height/2-node.y*visualizer.zoom;
  });
  container.querySelector('#graph-zoom-in').addEventListener('click',()=>visualizer.zoom=Math.min(2.5,visualizer.zoom*1.2));
  container.querySelector('#graph-zoom-out').addEventListener('click',()=>visualizer.zoom=Math.max(.4,visualizer.zoom/1.2));
  const list=document.createElement('details'); list.className='graph-accessible';
  list.innerHTML=`<summary>Navigasi graf sebagai daftar hubungan</summary><ul>${PHYSICS_GRAPH_DATA.nodes.map(node=>{
    const ref=resolveReference(node.id);
    const related=PHYSICS_GRAPH_DATA.links.filter(l=>l.source===node.id||l.target===node.id).map(l=>resolveReference(l.source===node.id?l.target:l.source)).filter(Boolean);
    return `<li><a href="${ref.url}">${node.label}</a> → ${related.map(r=>`<a href="${r.url}">${r.name}</a>`).join(' · ')}</li>`;
  }).join('')}</ul>`;
  container.querySelector('.content-wrap').appendChild(list);
  return () => visualizer.destroy();
}
