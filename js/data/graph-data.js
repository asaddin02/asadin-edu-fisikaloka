// Fisikaloka · Physics Knowledge Graph Network Data

export const PHYSICS_GRAPH_DATA = {
  nodes: [
    // Core Foundational & Kinematics
    { id: 'foundations', label: 'Fondasi & Pengukuran', category: 'domain', group: 1, size: 26 },
    { id: 'mass', label: 'Massa (m)', category: 'quantity', group: 1, size: 20 },
    { id: 'acceleration', label: 'Percepatan (a)', category: 'concept', group: 1, size: 20 },
    { id: 'velocity', label: 'Kecepatan (v)', category: 'concept', group: 1, size: 18 },
    { id: 'force', label: 'Gaya (F)', category: 'quantity', group: 2, size: 24 },
    { id: 'inertia', label: 'Kelembaman (Inersia)', category: 'concept', group: 2, size: 18 },
    { id: 'newton-first-law', label: 'Hukum I Newton', category: 'law', group: 2, size: 18 },
    { id: 'newton-second-law', label: 'Hukum II Newton (F = ma)', category: 'law', group: 2, size: 24 },

    // Energy & Momentum
    { id: 'energy', label: 'Energi (E)', category: 'quantity', group: 3, size: 26 },
    { id: 'work', label: 'Usaha (W)', category: 'concept', group: 3, size: 18 },
    { id: 'conservation-of-energy', label: 'Kekekalan Energi', category: 'principle', group: 3, size: 22 },
    { id: 'linear-momentum', label: 'Momentum (p)', category: 'quantity', group: 3, size: 18 },

    // Gravity & Space
    { id: 'gravity', label: 'Gravitasi', category: 'concept', group: 4, size: 24 },
    { id: 'universal-gravitation', label: 'Gravitasi Newton', category: 'law', group: 4, size: 22 },
    { id: 'orbit', label: 'Mekanika Orbit & Kepler', category: 'concept', group: 4, size: 18 },
    { id: 'spacetime', label: 'Ruang-Waktu 4D', category: 'concept', group: 5, size: 22 },
    { id: 'general-relativity-theory', label: 'Relativitas Umum', category: 'theory', group: 5, size: 24 },
    { id: 'black-hole', label: 'Lubang Hitam', category: 'phenomenon', group: 5, size: 22 },
    { id: 'gravitational-waves', label: 'Gelombang Gravitasi', category: 'phenomenon', group: 5, size: 18 },

    // Waves & Optics
    { id: 'waves', label: 'Gelombang Mekanik', category: 'domain', group: 6, size: 22 },
    { id: 'frequency', label: 'Frekuensi (f)', category: 'quantity', group: 6, size: 16 },
    { id: 'wavelength', label: 'Panjang Gelombang (λ)', category: 'quantity', group: 6, size: 16 },
    { id: 'sound', label: 'Akustik & Bunyi', category: 'domain', group: 6, size: 18 },
    { id: 'doppler-effect', label: 'Efek Doppler', category: 'phenomenon', group: 6, size: 18 },
    { id: 'optics', label: 'Optika & Pembiasan', category: 'domain', group: 7, size: 22 },
    { id: 'light', label: 'Cahaya & Foton', category: 'concept', group: 7, size: 22 },

    // Electromagnetism
    { id: 'electric-charge', label: 'Muatan Listrik (q)', category: 'quantity', group: 8, size: 22 },
    { id: 'electric-field', label: 'Medan Listrik (E)', category: 'field', group: 8, size: 20 },
    { id: 'magnetic-field', label: 'Medan Magnet (B)', category: 'field', group: 8, size: 20 },
    { id: 'electromagnetism', label: 'Elektrodinamika Maxwell', category: 'theory', group: 8, size: 24 },

    // Thermal & Thermodynamics
    { id: 'temperature', label: 'Temperatur (T)', category: 'quantity', group: 9, size: 18 },
    { id: 'heat', label: 'Kalor (Q)', category: 'quantity', group: 9, size: 18 },
    { id: 'entropy', label: 'Entropi (S)', category: 'concept', group: 9, size: 22 },
    { id: 'thermodynamic-laws', label: 'Hukum Termodinamika', category: 'law', group: 9, size: 22 },

    // Quantum & Particles
    { id: 'quantum', label: 'Fisika Kuantum', category: 'domain', group: 10, size: 26 },
    { id: 'planck-constant', label: 'Konstanta Planck (h)', category: 'constant', group: 10, size: 20 },
    { id: 'wave-particle-duality', label: 'Dualisme Gelombang-Partikel', category: 'principle', group: 10, size: 22 },
    { id: 'heisenberg-uncertainty-principle', label: 'Ketidakpastian Heisenberg', category: 'principle', group: 10, size: 20 },
    { id: 'photoelectric-effect', label: 'Efek Fotolistrik', category: 'phenomenon', group: 10, size: 18 },
    { id: 'schrodinger-equation', label: 'Persamaan Schrödinger', category: 'equation', group: 10, size: 20 },
    { id: 'electron', label: 'Elektron (e⁻)', category: 'particle', group: 11, size: 20 },
    { id: 'photon', label: 'Foton (γ)', category: 'particle', group: 11, size: 20 },
    { id: 'higgs-boson', label: 'Boson Higgs (H⁰)', category: 'particle', group: 11, size: 20 },
    { id: 'superconductivity', label: 'Superkonduktivitas', category: 'phenomenon', group: 12, size: 20 },
    { id: 'cosmology', label: 'Kosmologi & Big Bang', category: 'domain', group: 13, size: 24 }
  ],
  links: [
    // Kinematics & Dynamics links
    { source: 'foundations', target: 'mass' },
    { source: 'foundations', target: 'velocity' },
    { source: 'velocity', target: 'acceleration' },
    { source: 'acceleration', target: 'force' },
    { source: 'mass', target: 'inertia' },
    { source: 'inertia', target: 'newton-first-law' },
    { source: 'mass', target: 'newton-second-law' },
    { source: 'acceleration', target: 'newton-second-law' },
    { source: 'force', target: 'newton-second-law' },

    // Energy & Momentum
    { source: 'force', target: 'work' },
    { source: 'work', target: 'energy' },
    { source: 'energy', target: 'conservation-of-energy' },
    { source: 'velocity', target: 'linear-momentum' },
    { source: 'mass', target: 'linear-momentum' },

    // Gravitation to Relativity & Cosmos
    { source: 'mass', target: 'gravity' },
    { source: 'gravity', target: 'universal-gravitation' },
    { source: 'universal-gravitation', target: 'orbit' },
    { source: 'gravity', target: 'spacetime' },
    { source: 'spacetime', target: 'general-relativity-theory' },
    { source: 'general-relativity-theory', target: 'black-hole' },
    { source: 'general-relativity-theory', target: 'gravitational-waves' },
    { source: 'general-relativity-theory', target: 'cosmology' },

    // Waves to Sound & Light
    { source: 'frequency', target: 'waves' },
    { source: 'wavelength', target: 'waves' },
    { source: 'waves', target: 'sound' },
    { source: 'sound', target: 'doppler-effect' },
    { source: 'waves', target: 'optics' },
    { source: 'optics', target: 'light' },

    // Electromagnetism
    { source: 'electric-charge', target: 'electric-field' },
    { source: 'electric-field', target: 'magnetic-field' },
    { source: 'magnetic-field', target: 'electromagnetism' },
    { source: 'electromagnetism', target: 'light' },
    { source: 'light', target: 'photon' },

    // Thermal & Thermodynamics
    { source: 'temperature', target: 'heat' },
    { source: 'heat', target: 'entropy' },
    { source: 'entropy', target: 'thermodynamic-laws' },
    { source: 'energy', target: 'thermodynamic-laws' },

    // Quantum bridges
    { source: 'light', target: 'photoelectric-effect' },
    { source: 'photoelectric-effect', target: 'quantum' },
    { source: 'quantum', target: 'planck-constant' },
    { source: 'quantum', target: 'wave-particle-duality' },
    { source: 'wave-particle-duality', target: 'heisenberg-uncertainty-principle' },
    { source: 'quantum', target: 'schrodinger-equation' },
    { source: 'electron', target: 'quantum' },
    { source: 'electron', target: 'electric-charge' },
    { source: 'photon', target: 'electromagnetism' },
    { source: 'photon', target: 'quantum' },
    { source: 'higgs-boson', target: 'mass' },
    { source: 'superconductivity', target: 'quantum' },
    { source: 'superconductivity', target: 'magnetic-field' },
    { source: 'black-hole', target: 'quantum' }
  ]
};
