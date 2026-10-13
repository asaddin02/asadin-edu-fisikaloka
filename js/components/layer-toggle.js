// Fisikaloka · Multi-Layer Depth Switcher Component

export function renderLayerToggle(currentLayer, onLayerChange) {
  const container = document.createElement('div');
  container.className = 'layer-switcher-container';

  container.innerHTML = `
    <div class="layer-switcher-label">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
      <span>Tingkat Kedalaman Pemahaman:</span>
    </div>
    <div class="layer-tabs">
      <button class="layer-tab-btn ${currentLayer === 'simple' ? 'active' : ''}" data-layer="simple" title="Tingkat Dasar / Intuisi Sehari-hari">
        1. Sederhana (Intuisi)
      </button>
      <button class="layer-tab-btn ${currentLayer === 'standard' ? 'active' : ''}" data-layer="standard" title="Tingkat Standar / Rumus & Definisi Baku SMA">
        2. Standar (Sekolah Menengah)
      </button>
      <button class="layer-tab-btn ${currentLayer === 'advanced' ? 'active' : ''}" data-layer="advanced" title="Tingkat Lanjut / Vektor & Kalkulus Universitas">
        3. Lanjut (Universitas / Vektor)
      </button>
      <button class="layer-tab-btn ${currentLayer === 'deepDive' ? 'active' : ''}" data-layer="deepDive" title="Eksplorasi Mendalam / Kuantum, Relativitas & Riset Terkini">
        4. Deep Dive (Frontier)
      </button>
    </div>
  `;

  const buttons = container.querySelectorAll('.layer-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.getAttribute('data-layer');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (onLayerChange) onLayerChange(layer);
    });
  });

  return container;
}
