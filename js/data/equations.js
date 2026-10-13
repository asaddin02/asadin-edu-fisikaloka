import { FIELD_EQUATIONS } from './field-equations.js';
import { DOMAIN_REFERENCES } from './provenance.js';
// Fisikaloka · Comprehensive Equation Explorer Database with Variable Interactivity & Solvers

export const PHYSICS_EQUATIONS = [
  {
    id: 'newton-second-law',
    name: 'Newton’s Second Law of Motion',
    indonesianName: 'Hukum Kedua Newton tentang Gerak',
    domainId: 'dynamics',
    category: 'Mekanika Klasik',
    latexDisplay: 'F = m \\cdot a',
    htmlDisplay: '<strong>F</strong> = <em>m</em> · <strong>a</strong>',
    summary: 'Percepatan yang dialami oleh suatu benda berbanding lurus dengan gaya neto yang bekerja padanya dan berbanding terbalik dengan massa kelembamannya.',
    variables: [
      {
        symbol: 'F',
        name: 'Net Force (Gaya Neto)',
        unit: 'Newton (N = kg·m·s⁻²)',
        quantityId: 'force',
        dimension: '[M][L][T]⁻²',
        role: 'Penyebab akselerasi (resultan vektor gaya eksternal)'
      },
      {
        symbol: 'm',
        name: 'Inertial Mass (Massa Inersial)',
        unit: 'Kilogram (kg)',
        quantityId: 'mass',
        dimension: '[M]',
        role: 'Ukuran kelembaman (resistansi benda terhadap percepatan)'
      },
      {
        symbol: 'a',
        name: 'Acceleration (Percepatan)',
        unit: 'Meter per detik kuadrat (m·s⁻²)',
        quantityId: 'acceleration',
        dimension: '[L][T]⁻²',
        role: 'Laju perubahan vektor kecepatan terhadap waktu'
      }
    ],
    assumptions: [
      'Massa benda konstan. Sistem terbuka seperti roket memerlukan neraca momentum yang menyertakan fluks massa dan konvensi kecepatan relatif gas buang.',
      'Kelajuan benda jauh lebih kecil dibanding kelajuan cahaya (v << c; batas non-relativistik).',
      'Diamati dari suatu kerangka acuan inersial (non-akseleratif).'
    ],
    limitations: 'Tidak berlaku pada skala subatomik (di mana mekanika kuantum berlaku) dan pada kelajuan mendekati kecepatan cahaya (di mana massa relativistik / 4-momentum berlaku).',
    exampleProblem: {
      problem: 'Sebuah mobil balap bermassa 1,200 kg dipercepat oleh mesinnya sehingga mengalami percepatan sebesar 4.5 m/s². Berapakah gaya neto horizontal yang mendorong mobil tersebut?',
      solution: 'F = m · a = 1,200 kg · 4.5 m/s² = 5,400 N ke arah depan.',
      resultUnit: 'N'
    },
    calculator: {
      inputs: [
        { key: 'm', label: 'Massa (m)', default: 1200, min: 0.1, max: 100000, step: 10, unit: 'kg' },
        { key: 'a', label: 'Percepatan (a)', default: 4.5, min: -100, max: 100, step: 0.1, unit: 'm/s²' }
      ],
      output: { key: 'F', label: 'Gaya Neto (F)', unit: 'N' },
      compute: (inputs) => inputs.m * inputs.a
    },
    relatedConceptIds: ['force', 'mass', 'acceleration', 'inertia']
  },
  {
    id: 'kinetic-energy-classic',
    name: 'Kinetic Energy (Translational)',
    indonesianName: 'Energi Kinetik Translasi',
    domainId: 'work-energy',
    category: 'Mekanika & Energi',
    latexDisplay: 'E_k = \\frac{1}{2} m v^2',
    htmlDisplay: '<em>E</em><sub>k</sub> = ½ <em>m</em> <em>v</em>²',
    summary: 'Energi yang dimiliki suatu benda bermassa karena gerak translasinya. Sebanding dengan massa benda dan kuadrat kelajuannya.',
    variables: [
      {
        symbol: 'E_k',
        name: 'Kinetic Energy (Energi Kinetik)',
        unit: 'Joule (J = N·m = kg·m²·s⁻²)',
        quantityId: 'energy',
        dimension: '[M][L]²[T]⁻²',
        role: 'Kapasitas melakukan kerja akibat gerak'
      },
      {
        symbol: 'm',
        name: 'Mass (Massa Benda)',
        unit: 'Kilogram (kg)',
        quantityId: 'mass',
        dimension: '[M]',
        role: 'Kuantitas materi benda'
      },
      {
        symbol: 'v',
        name: 'Speed (Kelajuan Benda)',
        unit: 'Meter per detik (m·s⁻¹)',
        quantityId: 'velocity',
        dimension: '[L][T]⁻¹',
        role: 'Besar magnitudo kecepatan benda'
      }
    ],
    assumptions: [
      'Benda bertranslasi sebagai partikel titik atau benda tegar tanpa rotasi.',
      'Kelajuan gerak v jauh lebih kecil dibanding kecepatan cahaya (v << c).'
    ],
    limitations: 'Untuk v > 0.1c, harus menggunakan perumusan relativistik: E_k = (γ - 1) m c².',
    exampleProblem: {
      problem: 'Sebuah peluru senapan bermassa 0.02 kg (20 gram) melesat dengan kelajuan 600 m/s. Hitunglah energi kinetik peluru tersebut!',
      solution: 'E_k = ½ · 0.02 kg · (600 m/s)² = 0.01 · 360,000 = 3,600 Joule.',
      resultUnit: 'J'
    },
    calculator: {
      inputs: [
        { key: 'm', label: 'Massa (m)', default: 0.02, min: 0.001, max: 10000, step: 0.01, unit: 'kg' },
        { key: 'v', label: 'Kelajuan (v)', default: 600, min: 0, max: 10000, step: 10, unit: 'm/s' }
      ],
      output: { key: 'E_k', label: 'Energi Kinetik (E_k)', unit: 'J' },
      compute: (inputs) => 0.5 * inputs.m * Math.pow(inputs.v, 2)
    },
    relatedConceptIds: ['energy', 'work', 'velocity', 'mass']
  },
  {
    id: 'universal-gravitation',
    name: 'Newton’s Law of Universal Gravitation',
    indonesianName: 'Hukum Gravitasi Universal Newton',
    domainId: 'gravitation',
    category: 'Mekanika & Astrofisika',
    latexDisplay: 'F_g = G \\frac{m_1 m_2}{r^2}',
    htmlDisplay: '<em>F</em><sub>g</sub> = <em>G</em> · (<em>m</em>₁ <em>m</em>₂ / <em>r</em>²)',
    summary: 'Setiap partikel bermassa di alam semesta menarik setiap partikel lainnya dengan gaya yang berbanding lurus dengan perkalian kedua massa dan berbanding terbalik dengan kuadrat jarak antara pusat keduanya.',
    variables: [
      {
        symbol: 'F_g',
        name: 'Gravitational Force (Gaya Gravitasi)',
        unit: 'Newton (N)',
        quantityId: 'force',
        dimension: '[M][L][T]⁻²',
        role: 'Gaya tarik timbal balik antara dua massa'
      },
      {
        symbol: 'G',
        name: 'Gravitational Constant',
        unit: 'N·m²·kg⁻²',
        quantityId: 'gravitational-constant',
        dimension: '[M]⁻¹[L]³[T]⁻²',
        role: 'Konstanta gravitasi universal (6.6743 × 10⁻¹¹)'
      },
      {
        symbol: 'm₁',
        name: 'First Mass (Massa Pertama)',
        unit: 'Kilogram (kg)',
        quantityId: 'mass',
        dimension: '[M]',
        role: 'Massa benda penarik atau sumber medan'
      },
      {
        symbol: 'm₂',
        name: 'Second Mass (Massa Kedua)',
        unit: 'Kilogram (kg)',
        quantityId: 'mass',
        dimension: '[M]',
        role: 'Massa benda kedua yang berinteraksi'
      },
      {
        symbol: 'r',
        name: 'Separation Distance (Jarak Pemisah)',
        unit: 'Meter (m)',
        quantityId: 'length',
        dimension: '[L]',
        role: 'Jarak antara pusat massa kedua benda'
      }
    ],
    assumptions: [
      'Kedua massa dianggap sebagai massa titik atau benda simetris bola sempurna (teorema cangkang Newton / Shell Theorem).',
      'Medan gravitasi tergolong lemah (berlaku sangat akurat untuk tata surya kecuali presesi perihelion Merkurius dan horizon lubang hitam).'
    ],
    limitations: 'Dalam medan gravitasi yang sangat kuat atau skala kosmologis, digantikan oleh persamaan medan Relativitas Umum Einstein.',
    exampleProblem: {
      problem: 'Hitung gaya gravitasi antara Bumi (m₁ = 5.97 × 10²⁴ kg) dan Bulan (m₂ = 7.35 × 10²² kg) pada jarak rata-rata r = 3.84 × 10⁸ meter!',
      solution: 'F = (6.6743 × 10⁻¹¹) · (5.97 × 10²⁴ · 7.35 × 10²²) / (3.84 × 10⁸)² ≈ 1.98 × 10²⁰ N.',
      resultUnit: 'N'
    },
    calculator: {
      inputs: [
        { key: 'm1', label: 'Massa 1 (m₁)', default: 5.97e24, min: 1, max: 1e31, step: 1e22, unit: 'kg' },
        { key: 'm2', label: 'Massa 2 (m₂)', default: 7.35e22, min: 1, max: 1e31, step: 1e20, unit: 'kg' },
        { key: 'r', label: 'Jarak Pusat (r)', default: 3.84e8, min: 100, max: 1e12, step: 1e6, unit: 'm' }
      ],
      output: { key: 'Fg', label: 'Gaya Gravitasi (F_g)', unit: 'N' },
      compute: (inputs) => (6.6743e-11 * inputs.m1 * inputs.m2) / Math.pow(inputs.r, 2)
    },
    relatedConceptIds: ['gravity', 'orbit', 'mass', 'acceleration']
  },
  {
    id: 'mass-energy-equivalence',
    name: 'Mass-Energy Equivalence',
    indonesianName: 'Kesetaraan Massa-Energi Einstein',
    domainId: 'special-relativity',
    category: 'Relativitas Khusus & Nuklir',
    latexDisplay: 'E = m c^2',
    htmlDisplay: '<em>E</em> = <em>m</em> <em>c</em>²',
    summary: 'Massa dan energi adalah dua manifestasi dari kuantitas fisik yang sama. Massa diam m menyimpan energi diam yang sangat besar proporsional dengan kuadrat kelajuan cahaya.',
    variables: [
      {
        symbol: 'E',
        name: 'Rest Energy (Energi Diam)',
        unit: 'Joule (J)',
        quantityId: 'energy',
        dimension: '[M][L]²[T]⁻²',
        role: 'Kandungan energi intrinsik yang setara dengan massa materi'
      },
      {
        symbol: 'm',
        name: 'Rest Mass (Massa Diam)',
        unit: 'Kilogram (kg)',
        quantityId: 'mass',
        dimension: '[M]',
        role: 'Massa inersial benda saat berada dalam keadaan diam'
      },
      {
        symbol: 'c',
        name: 'Speed of Light in Vacuum',
        unit: 'm·s⁻¹',
        quantityId: 'speed-of-light',
        dimension: '[L][T]⁻¹',
        role: 'Faktor konversi universal (299,792,458 m/s)'
      }
    ],
    assumptions: [
      'Benda berada dalam kerangka diam (momentum p = 0).',
      'Untuk benda yang bergerak dengan momentum p, persamaan lengkapnya adalah E² = (pc)² + (m₀c²)².'
    ],
    limitations: 'E₀ = mc² adalah energi diam. Energi total benda bergerak juga bergantung momentum; jangan memakai energi diam sebagai energi total gerak.',
    exampleProblem: {
      problem: 'Berapakah energi yang dibebaskan jika 1 gram (0.001 kg) materi musnah seluruhnya (misalnya melalui anihilasi materi-antimateri)?',
      solution: 'E = m · c² = 0.001 kg · (3 × 10⁸ m/s)² = 9 × 10¹³ Joule (setara dengan ledakan ~21.5 kiloton TNT).',
      resultUnit: 'J'
    },
    calculator: {
      inputs: [
        { key: 'm', label: 'Massa (m)', default: 0.001, min: 1e-6, max: 1000, step: 0.0001, unit: 'kg' }
      ],
      output: { key: 'E', label: 'Energi Setara (E)', unit: 'J' },
      compute: (inputs) => inputs.m * Math.pow(299792458, 2)
    },
    relatedConceptIds: ['special-relativity', 'energy', 'mass', 'nuclear-fission']
  },
  {
    id: 'ideal-gas-equation',
    name: 'Ideal Gas Law',
    indonesianName: 'Persamaan Gas Ideal',
    domainId: 'thermal',
    category: 'Fisika Termal & Termodinamika',
    latexDisplay: 'P V = n R T',
    htmlDisplay: '<em>P</em> <em>V</em> = <em>n</em> <em>R</em> <em>T</em>',
    summary: 'Persamaan keadaan keadaan gas ideal yang menghubungkan tekanan (P), volume (V), jumlah mol partikel (n), dan temperatur mutlak (T).',
    variables: [
      {
        symbol: 'P',
        name: 'Pressure (Tekanan)',
        unit: 'Pascal (Pa = N·m⁻²)',
        quantityId: 'pressure',
        dimension: '[M][L]⁻¹[T]⁻²',
        role: 'Gaya tumbukan per satuan luas dinding'
      },
      {
        symbol: 'V',
        name: 'Volume',
        unit: 'Meter kubik (m³)',
        quantityId: 'volume',
        dimension: '[L]³',
        role: 'Ruang yang ditempati gas'
      },
      {
        symbol: 'n',
        name: 'Amount of Substance (Jumlah Zat)',
        unit: 'Mol (mol)',
        quantityId: 'amount-of-substance',
        dimension: '[N]',
        role: 'Hitungan entitas kimia dalam satuan mol'
      },
      {
        symbol: 'R',
        name: 'Universal Gas Constant',
        unit: 'J·mol⁻¹·K⁻¹',
        quantityId: 'gas-constant',
        dimension: '[M][L]²[T]⁻²[Θ]⁻¹[N]⁻¹',
        role: '8.3145 J/(mol·K)'
      },
      {
        symbol: 'T',
        name: 'Absolute Temperature (Suhu Mutlak)',
        unit: 'Kelvin (K)',
        quantityId: 'temperature',
        dimension: '[Θ]',
        role: 'Suhu mutlak dalam skala Kelvin (T = °C + 273.15)'
      }
    ],
    assumptions: [
      'Molekul gas berukuran titik (volume partikel diabaikan dibanding volume wadah).',
      'Tidak ada gaya tarik-menarik antarmolekul kecuali saat bertumbukan lenting sempurna.'
    ],
    limitations: 'Pada tekanan sangat tinggi atau suhu sangat rendah mendekati titik embun, gas nyata menyimpang dan mengikuti persamaan Van der Waals.',
    exampleProblem: {
      problem: 'Sebuah tangki berisi 2 mol gas helium pada temperatur 300 K dengan volume 0.05 m³. Tentukan tekanan gas tersebut!',
      solution: 'P = n R T / V = (2 · 8.314 · 300) / 0.05 = 4,988.4 / 0.05 = 99,768 Pa (≈ 0.985 atm).',
      resultUnit: 'Pa'
    },
    calculator: {
      inputs: [
        { key: 'n', label: 'Jumlah Mol (n)', default: 2, min: 0.1, max: 100, step: 0.1, unit: 'mol' },
        { key: 'T', label: 'Suhu Mutlak (T)', default: 300, min: 1, max: 5000, step: 5, unit: 'K' },
        { key: 'V', label: 'Volume (V)', default: 0.05, min: 0.001, max: 10, step: 0.01, unit: 'm³' }
      ],
      output: { key: 'P', label: 'Tekanan Gas (P)', unit: 'Pa' },
      compute: (inputs) => (inputs.n * 8.31446 * inputs.T) / inputs.V
    },
    relatedConceptIds: ['temperature', 'pressure', 'heat', 'ideal-gas-equation']
  },
  {
    id: 'snells-law-refraction',
    name: 'Snell’s Law of Refraction',
    indonesianName: 'Hukum Pembiasan Snellius',
    domainId: 'optics',
    category: 'Optika',
    latexDisplay: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2',
    htmlDisplay: '<em>n</em>₁ sin(θ₁) = <em>n</em>₂ sin(θ₂)',
    summary: 'Menghubungkan sudut datang dan sudut bias ketika seberkas cahaya melintasi batas antara dua medium optis dengan indeks bias berbeda.',
    variables: [
      {
        symbol: 'n₁',
        name: 'Refractive Index of Medium 1',
        unit: 'Adimensional',
        quantityId: 'refractive-index',
        dimension: '[1]',
        role: 'Rasio c / v₁ medium pertama'
      },
      {
        symbol: 'θ₁',
        name: 'Angle of Incidence (Sudut Datang)',
        unit: 'rad (masukan kalkulator: °)',
        quantityId: 'angle',
        dimension: '[1]',
        role: 'Sudut berkas datang terhadap garis normal'
      },
      {
        symbol: 'n₂',
        name: 'Refractive Index of Medium 2',
        unit: 'Adimensional',
        quantityId: 'refractive-index',
        dimension: '[1]',
        role: 'Rasio c / v₂ medium kedua'
      },
      {
        symbol: 'θ₂',
        name: 'Angle of Refraction (Sudut Bias)',
        unit: 'rad (masukan kalkulator: °)',
        quantityId: 'angle',
        dimension: '[1]',
        role: 'Sudut berkas bias terhadap garis normal'
      }
    ],
    assumptions: [
      'Medium optis bersifat homogen dan isotropik.',
      'Panjang gelombang cahaya tunggal (monokromatik) untuk menghindari dispersi warna.'
    ],
    limitations: 'Untuk medium anisotropik (seperti kalsit), terjadi pembiasan ganda (birefringence).',
    exampleProblem: {
      problem: 'Berkas cahaya merambat dari udara (n₁ = 1.00) ke dalam air (n₂ = 1.33) dengan sudut datang 45°. Berapakah sudut biasnya?',
      solution: 'sin(θ₂) = (1.00 / 1.33) · sin(45°) = 0.7519 · 0.7071 = 0.5317 → θ₂ = arcsin(0.5317) ≈ 32.1°.',
      resultUnit: '°'
    },
    calculator: {
      inputs: [
        { key: 'n1', label: 'Indeks Medium 1 (n₁)', default: 1.0, min: 1.0, max: 3.0, step: 0.01, unit: '' },
        { key: 'theta1', label: 'Sudut Datang (θ₁)', default: 45, min: 0, max: 90, step: 1, unit: '°' },
        { key: 'n2', label: 'Indeks Medium 2 (n₂)', default: 1.333, min: 1.0, max: 3.0, step: 0.01, unit: '' }
      ],
      output: { key: 'theta2', label: 'Sudut Bias (θ₂)', unit: '°' },
      compute: (inputs) => {
        const rad1 = (inputs.theta1 * Math.PI) / 180;
        const sinVal = (inputs.n1 / inputs.n2) * Math.sin(rad1);
        if (sinVal > 1.0) return 'Pemantulan Total (TIR)';
        return ((Math.asin(sinVal) * 180) / Math.PI).toFixed(2);
      }
    },
    relatedConceptIds: ['refractive-index', 'wave-speed-frequency', 'light', 'optics']
  },
  {
    id: 'planck-einstein-relation',
    name: 'Planck-Einstein Photon Energy Relation',
    indonesianName: 'Relasi Energi Foton Planck-Einstein',
    domainId: 'quantum',
    category: 'Fisika Kuantum',
    latexDisplay: 'E = h \\cdot f = \\frac{h c}{\\lambda}',
    htmlDisplay: '<em>E</em> = <em>h</em> · <em>f</em> = (<em>h</em> <em>c</em>) / λ',
    summary: 'Energi kuantum cahaya (foton) berbanding lurus dengan frekuensi gelombang elektromagnetiknya dan berbanding terbalik dengan panjang gelombangnya.',
    variables: [
      {
        symbol: 'E',
        name: 'Photon Energy (Energi Foton)',
        unit: 'Joule (J) atau Elektronvolt (eV)',
        quantityId: 'energy',
        dimension: '[M][L]²[T]⁻²',
        role: 'Kuantum energi paket cahaya'
      },
      {
        symbol: 'h',
        name: 'Planck Constant',
        unit: 'J·s',
        quantityId: 'planck-constant',
        dimension: '[M][L]²[T]⁻¹',
        role: '6.62607 × 10⁻³⁴ J·s'
      },
      {
        symbol: 'f',
        name: 'Frequency (Frekuensi)',
        unit: 'Hertz (Hz = s⁻¹)',
        quantityId: 'frequency',
        dimension: '[T]⁻¹',
        role: 'Jumlah osilasi medan per detik'
      },
      {
        symbol: 'λ',
        name: 'Wavelength (Panjang Gelombang)',
        unit: 'Meter (m atau nm)',
        quantityId: 'wavelength',
        dimension: '[L]',
        role: 'Jarak spasial antara dua puncak gelombang'
      }
    ],
    assumptions: [
      'Foton merambat dalam ruang hampa atau medium terdefinisi.',
      'Partikel foton berinteraksi secara diskret 1-lawan-1 dengan elektron (efek fotolistrik).'
    ],
    limitations: 'E = hf berlaku bagi foton; E = hc/λ memakai panjang gelombang ruang hampa. Proses multifoton dan respons medium perlu model tambahan.',
    exampleProblem: {
      problem: 'Tentukan energi satu foton sinar hijau dengan panjang gelombang λ = 500 nm (500 × 10⁻⁹ m) dalam satuan elektronvolt (eV)!',
      solution: 'E = hc / λ = (6.626 × 10⁻³⁴ · 3 × 10⁸) / (500 × 10⁻⁹) ≈ 3.975 × 10⁻¹⁹ J. Dikonversi ke eV: 3.975 × 10⁻¹⁹ / (1.602 × 10⁻¹⁹) ≈ 2.48 eV.',
      resultUnit: 'eV'
    },
    calculator: {
      inputs: [
        { key: 'lambda_nm', label: 'Panjang Gelombang (λ)', default: 500, min: 0.01, max: 10000, step: 10, unit: 'nm' }
      ],
      output: { key: 'E_eV', label: 'Energi Foton', unit: 'eV' },
      compute: (inputs) => {
        const lambda_m = inputs.lambda_nm * 1e-9;
        const E_joules = (6.62607e-34 * 299792458) / lambda_m;
        return (E_joules / 1.602176634e-19).toFixed(3);
      }
    },
    relatedConceptIds: ['photon', 'quantum', 'photoelectric-effect', 'light']
  },
  {
    id: 'coulombs-law',
    name: 'Coulomb’s Law of Electrostatics',
    indonesianName: 'Hukum Coulomb Elektrostatika',
    domainId: 'electricity',
    category: 'Elektromagnetisme',
    latexDisplay: 'F_e = k_e \\frac{|q_1 q_2|}{r^2}',
    htmlDisplay: '<em>F</em><sub>e</sub> = <em>k</em><sub>e</sub> · (|<em>q</em>₁ <em>q</em>₂| / <em>r</em>²)',
    summary: 'Gaya elektrostatik antara dua muatan listrik titik berbanding lurus dengan hasil kali besar muatannya dan berbanding terbalik dengan kuadrat jarak antara keduanya.',
    variables: [
      {
        symbol: 'F_e',
        name: 'Electrostatic Force (Gaya Coulomb)',
        unit: 'Newton (N)',
        quantityId: 'force',
        dimension: '[M][L][T]⁻²',
        role: 'Gaya tolak jika sejenis, gaya tarik jika berlawanan jenis'
      },
      {
        symbol: 'k_e',
        name: 'Coulomb Constant',
        unit: 'N·m²·C⁻²',
        quantityId: 'coulomb-constant',
        dimension: '[M][L]³[T]⁻⁴[I]⁻²',
        role: '1 / (4πε₀) ≈ 8.98755 × 10⁹ N·m²/C²'
      },
      {
        symbol: 'q₁, q₂',
        name: 'Electric Charges (Muatan Listrik)',
        unit: 'Coulomb (C atau μC)',
        quantityId: 'electric-charge',
        dimension: '[I][T]',
        role: 'Kuantitas muatan listrik partikel'
      },
      {
        symbol: 'r',
        name: 'Separation Distance (Jarak)',
        unit: 'Meter (m)',
        quantityId: 'length',
        dimension: '[L]',
        role: 'Jarak antara pusat kedua muatan'
      }
    ],
    assumptions: [
      'Muatan listrik berada dalam keadaan diam relatif satu sama lain (elektrostatika murni).',
      'Ukuran geometri muatan jauh lebih kecil daripada jarak pemisahnya r (muatan titik).'
    ],
    limitations: 'Bila muatan bergerak, muncul koreksi gaya magnetik Biot-Savart / Lorentz dan potensial terbelakang Liénard-Wiechert.',
    exampleProblem: {
      problem: 'Dua muatan q₁ = +2 μC dan q₂ = -3 μC terpisah sejauh 0.3 meter di udara. Berapakah besar gaya tarik elektrostatik keduanya?',
      solution: 'F = (8.99 × 10⁹) · (2 × 10⁻⁶ · 3 × 10⁻⁶) / (0.3)² = (8.99 × 10⁹ · 6 × 10⁻¹²) / 0.09 = 0.599 N (tarik-menarik).',
      resultUnit: 'N'
    },
    calculator: {
      inputs: [
        { key: 'q1_uC', label: 'Muatan 1 (q₁)', default: 2, min: -100, max: 100, step: 0.5, unit: 'μC' },
        { key: 'q2_uC', label: 'Muatan 2 (q₂)', default: -3, min: -100, max: 100, step: 0.5, unit: 'μC' },
        { key: 'r_m', label: 'Jarak (r)', default: 0.3, min: 0.01, max: 10, step: 0.05, unit: 'm' }
      ],
      output: { key: 'Fe', label: 'Gaya Coulomb (F_e)', unit: 'N' },
      compute: (inputs) => {
        const q1 = inputs.q1_uC * 1e-6;
        const q2 = inputs.q2_uC * 1e-6;
        const force = (8.98755e9 * Math.abs(q1 * q2)) / Math.pow(inputs.r_m, 2);
        return force.toFixed(4);
      }
    },
    relatedConceptIds: ['electric-charge', 'electric-field', 'force', 'coulomb']
  },
  {
    id: 'bernoulli-equation',
    name: 'Bernoulli’s Equation',
    indonesianName: 'Persamaan Bernoulli',
    domainId: 'fluids',
    category: 'Mekanika Fluida',
    latexDisplay: 'P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{konstan}',
    htmlDisplay: '<em>P</em> + ½ <em>ρ</em> <em>v</em>² + <em>ρ</em> <em>g</em> <em>h</em> = konstan',
    summary: 'Penerapan hukum kekekalan energi mekanik pada fluida ideal yang mengalir. Pada ketinggian konstan, peningkatan kelajuan fluida terjadi bersamaan dengan penurunan tekanan statisnya.',
    variables: [
      {
        symbol: 'P',
        name: 'Static Fluid Pressure (Tekanan Statis)',
        unit: 'Pascal (Pa)',
        quantityId: 'pressure',
        dimension: '[M][L]⁻¹[T]⁻²',
        role: 'Tekanan internal fluida'
      },
      {
        symbol: 'ρ',
        name: 'Fluid Density (Massa Jenis Fluida)',
        unit: 'kg·m⁻³',
        quantityId: 'density',
        dimension: '[M][L]⁻³',
        role: 'Massa per satuan volume fluida'
      },
      {
        symbol: 'v',
        name: 'Flow Velocity (Kecepatan Aliran)',
        unit: 'm·s⁻¹',
        quantityId: 'velocity',
        dimension: '[L][T]⁻¹',
        role: 'Kelajuan elemen fluida sepanjang garis arus'
      },
      {
        symbol: 'h',
        name: 'Elevation Height (Ketinggian)',
        unit: 'Meter (m)',
        quantityId: 'length',
        dimension: '[L]',
        role: 'Ketinggian relatif terhadap bidang acuan'
      }
    ],
    assumptions: [
      'Aliran stasioner / tunak (steady flow).',
      'Fluida tak termampatkan (incompressible; ρ konstan).',
      'Fluida tanpa kekentalan (non-viscous; gesekan internal nol).',
      'Aliran sepanjang garis arus (streamline).'
    ],
    limitations: 'Tidak memperhitungkan disipasi energi akibat turbulensi atau gesekan viskos pada dinding pipa nyata.',
    exampleProblem: {
      problem: 'Air mengalir dalam pipa horizontal (h₁ = h₂). Di bagian lebar kecepatannya 2 m/s dengan tekanan 150 kPa. Di bagian penyempitan kecepatannya meningkat menjadi 6 m/s. Berapakah tekanan di bagian penyempitan? (ρ = 1000 kg/m³)',
      solution: 'P₂ = P₁ + ½ ρ (v₁² - v₂²) = 150,000 + 500 · (4 - 36) = 150,000 - 16,000 = 134,000 Pa (134 kPa).',
      resultUnit: 'Pa'
    },
    calculator: {
      inputs: [
        { key: 'P1_kPa', label: 'Tekanan Awal (P₁)', default: 150, min: 10, max: 1000, step: 10, unit: 'kPa' },
        { key: 'v1', label: 'Kecepatan Awal (v₁)', default: 2, min: 0.1, max: 50, step: 0.5, unit: 'm/s' },
        { key: 'v2', label: 'Kecepatan Akhir (v₂)', default: 6, min: 0.1, max: 50, step: 0.5, unit: 'm/s' },
        { key: 'rho', label: 'Massa Jenis Fluida (ρ)', default: 1000, min: 1, max: 2000, step: 10, unit: 'kg/m³' }
      ],
      output: { key: 'P2_kPa', label: 'Tekanan Akhir (P₂)', unit: 'kPa' },
      compute: (inputs) => {
        const P1 = inputs.P1_kPa * 1000;
        const P2 = P1 + 0.5 * inputs.rho * (Math.pow(inputs.v1, 2) - Math.pow(inputs.v2, 2));
        return (P2 / 1000).toFixed(2);
      }
    },
    relatedConceptIds: ['pressure', 'fluids', 'energy', 'bernoulli-equation']
  },
  {
    id: 'ohms-law',
    name: 'Ohm’s Law',
    indonesianName: 'Hukum Ohm',
    domainId: 'electromagnetism',
    category: 'Elektromagnetisme',
    latexDisplay: 'V = I \\cdot R',
    htmlDisplay: '<strong>V</strong> = <em>I</em> · <em>R</em>',
    summary: 'Beda potensial listrik (tegangan) yang melintasi konduktor berbanding lurus dengan kuat arus listrik yang mengalir melaluinya pada suhu konstan.',
    variables: [
      {
        symbol: 'V',
        name: 'Electric Potential Difference / Voltage (Tegangan Listrik)',
        unit: 'Volt (V = J/C = kg·m²·s⁻³·A⁻¹)',
        quantityId: 'voltage',
        dimension: '[M][L]²[T]⁻³[I]⁻¹',
        role: 'Energi potensial per satuan muatan listrik yang mendorong arus'
      },
      {
        symbol: 'I',
        name: 'Electric Current (Kuat Arus Listrik)',
        unit: 'Ampere (A = C/s)',
        quantityId: 'electric-current',
        dimension: '[I]',
        role: 'Laju aliran netto muatan listrik melewati penampang konduktor'
      },
      {
        symbol: 'R',
        name: 'Electrical Resistance (Hambatan Listrik)',
        unit: 'Ohm (Ω = V/A)',
        quantityId: 'resistance',
        dimension: '[M][L]²[T]⁻³[I]⁻²',
        role: 'Ukuran hambatan material terhadap aliran elektron'
      }
    ],
    assumptions: [
      'Bahan bersifat Ohmik (resistivitas material independen terhadap besar kuat medan listrik).',
      'Suhu penghantar dipertahankan konstan (mengabaikan kenaikan suhu akibat disipasi panas Joule P = I²R).'
    ],
    limitations: 'Tidak berlaku untuk komponen non-linear seperti semikonduktor (dioda, transistor), gas bertekanan rendah, tabung hampa, dan material superkonduktor.',
    exampleProblem: {
      problem: 'Sebuah resistor ohmik memiliki hambatan 240 Ω dan dihubungkan dengan sumber tegangan DC 12 V. Berapakah kuat arus listrik yang mengalir?',
      solution: 'I = V / R = 12 V / 240 Ω = 0.05 A = 50 mA.',
      resultUnit: 'A'
    },
    calculator: {
      inputs: [
        { key: 'V', label: 'Tegangan Listrik (V)', default: 12, min: 0.1, max: 1000, step: 1, unit: 'V' },
        { key: 'R', label: 'Hambatan Listrik (R)', default: 240, min: 0.1, max: 10000, step: 10, unit: 'Ω' }
      ],
      output: { key: 'I', label: 'Kuat Arus (I)', unit: 'A' },
      compute: (inputs) => (inputs.V / inputs.R).toFixed(4)
    },
    relatedConceptIds: ['electric-current', 'electromagnetism', 'energy']
  },
  {
    id: 'wave-speed-frequency',
    name: 'Fundamental Wave Equation',
    indonesianName: 'Persamaan Dasar Gelombang',
    domainId: 'waves',
    category: 'Gelombang & Akustik',
    latexDisplay: 'v = f \\cdot \\lambda',
    htmlDisplay: '<strong>v</strong> = <em>f</em> · <strong>λ</strong>',
    summary: 'Kecepatan rambat gelombang sama dengan hasil kali frekuensi getaran sumber dengan panjang gelombangnya dalam medium tersebut.',
    variables: [
      {
        symbol: 'v',
        name: 'Wave Phase Velocity (Cepat Rambat Gelombang)',
        unit: 'Meter per detik (m·s⁻¹)',
        quantityId: 'velocity',
        dimension: '[L][T]⁻¹',
        role: 'Kecepatan perpindahan fase muka gelombang dalam medium'
      },
      {
        symbol: 'f',
        name: 'Wave Frequency (Frekuensi Gelombang)',
        unit: 'Hertz (Hz = s⁻¹)',
        quantityId: 'frequency',
        dimension: '[T]⁻¹',
        role: 'Jumlah siklus osilasi gelombang per satuan detik'
      },
      {
        symbol: 'λ',
        name: 'Wavelength (Panjang Gelombang)',
        unit: 'Meter (m)',
        quantityId: 'wavelength',
        dimension: '[L]',
        role: 'Jarak spasial antara dua puncak gelombang berturut-turut'
      }
    ],
    assumptions: [
      'Medium bersifat linier, homogen, dan isotropik (kecepatan fase konstan ke segala arah).',
      'Gelombang harmonik tunggal (monokromatik).'
    ],
    limitations: 'Pada medium dispersif (seperti kaca optik), cepat rambat gelombang bervariasi bergantung pada frekuensi (v = v(f)).',
    exampleProblem: {
      problem: 'Gelombang suara di udara merambat dengan cepat rambat 340 m/s. Jika garputala bergetar dengan frekuensi nada 440 Hz (nada A4), berapa panjang gelombangnya?',
      solution: 'λ = v / f = 340 m/s / 440 Hz = 0.7727 m (77.3 cm).',
      resultUnit: 'm'
    },
    calculator: {
      inputs: [
        { key: 'f', label: 'Frekuensi (f)', default: 440, min: 1, max: 20000, step: 10, unit: 'Hz' },
        { key: 'lambda', label: 'Panjang Gelombang (λ)', default: 0.7727, min: 0.001, max: 100, step: 0.05, unit: 'm' }
      ],
      output: { key: 'v', label: 'Cepat Rambat (v)', unit: 'm/s' },
      compute: (inputs) => (inputs.f * inputs.lambda).toFixed(2)
    },
    relatedConceptIds: ['wave-particle-duality', 'optics', 'sound']
  },
  {
    id: 'carnot-efficiency',
    name: 'Carnot Heat Engine Maximum Efficiency',
    indonesianName: 'Efisiensi Teoretis Maksimum Mesin Carnot',
    domainId: 'thermodynamics',
    category: 'Termodinamika',
    latexDisplay: '\\eta_{\\text{max}} = 1 - \\frac{T_C}{T_H}',
    htmlDisplay: '<strong>η<sub>max</sub></strong> = 1 - (<em>T<sub>C</sub></em> / <em>T<sub>H</sub></em>)',
    summary: 'Batas efisiensi termal tertinggi yang dapat dicapai oleh mesin kalor reversibel ideal yang beroperasi di antara dua suhu reservoir mutlak TH dan TC.',
    variables: [
      {
        symbol: 'η_max',
        name: 'Maximum Thermal Efficiency (Efisiensi Maksimum)',
        unit: 'Tanpa Satuan / Persentase (0 - 100%)',
        quantityId: 'efficiency',
        dimension: '[1]',
        role: 'Fraksi kalor masukan yang berhasil diubah menjadi kerja mekanik netto'
      },
      {
        symbol: 'TH',
        name: 'Hot Reservoir Absolute Temperature (Suhu Reservoir Panas)',
        unit: 'Kelvin (K)',
        quantityId: 'temperature',
        dimension: '[Θ]',
        role: 'Suhu mutlak sumber panas kalor masukan Q_H'
      },
      {
        symbol: 'TC',
        name: 'Cold Reservoir Absolute Temperature (Suhu Reservoir Dingin)',
        unit: 'Kelvin (K)',
        quantityId: 'temperature',
        dimension: '[Θ]',
        role: 'Suhu mutlak pembuangan kalor sisa Q_C'
      }
    ],
    assumptions: [
      'Siklus bekerja secara reversibel sempurna tanpa disipasi gesekan atau perpindahan panas irreversibel.',
      'Suhu dinyatakan dalam skala termodinamika mutlak Kelvin (K), bukan Celsius (°C).'
    ],
    limitations: 'Tidak ada mesin nyata yang dapat mencapai efisiensi Carnot karena entropi tak terhindarkan selalu diproduksi oleh gesekan dan turbulensi (Hukum II Termodinamika).',
    exampleProblem: {
      problem: 'Sebuah pembangkit listrik tenaga uap bekerja dengan reservoir uap bersuhu 500°C (773.15 K) dan membuang kalor sisa ke menara pendingin bersuhu 25°C (298.15 K). Berapakah batas efisiensi Carnot maksimumnya?',
      solution: 'η = 1 - (298.15 / 773.15) = 1 - 0.3856 = 0.6144 (61.44%).',
      resultUnit: '%'
    },
    calculator: {
      inputs: [
        { key: 'TH_K', label: 'Suhu Reservoir Panas (T_H)', default: 773.15, min: 10, max: 5000, step: 10, unit: 'K' },
        { key: 'TC_K', label: 'Suhu Reservoir Dingin (T_C)', default: 298.15, min: 1, max: 4000, step: 5, unit: 'K' }
      ],
      output: { key: 'efficiency_percent', label: 'Efisiensi Teoretis Maksimum', unit: '%' },
      compute: (inputs) => {
        if (inputs.TC_K >= inputs.TH_K) return '0.00 (TC harus < TH)';
        const eff = (1 - inputs.TC_K / inputs.TH_K) * 100;
        return eff.toFixed(2);
      }
    },
    relatedConceptIds: ['entropy', 'thermodynamic-laws', 'temperature', 'energy']
  },
  {
    id: 'lorentz-factor',
    name: 'Relativistic Lorentz Factor',
    indonesianName: 'Faktor Lorentz Relativistik',
    domainId: 'special-relativity',
    category: 'Relativitas Khusus',
    latexDisplay: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
    htmlDisplay: '<strong>γ</strong> = 1 / √(1 - <em>v</em>² / <em>c</em>²)',
    summary: 'Faktor dilatasi waktu dan kontraksi panjang dalam relativitas khusus yang mengukur besarnya efek kinematika relativistik saat suatu benda melaju mendekati kelajuan cahaya.',
    variables: [
      {
        symbol: 'γ',
        name: 'Lorentz Factor (Faktor Lorentz)',
        unit: 'Tanpa Satuan (γ ≥ 1)',
        quantityId: 'dimensionless',
        dimension: '[1]',
        role: 'Faktor pelebaran interval waktu dan pemendekan panjang spasial'
      },
      {
        symbol: 'v',
        name: 'Relative Velocity (Kelajuan Relatif)',
        unit: 'Meter per detik (m·s⁻¹)',
        quantityId: 'velocity',
        dimension: '[L][T]⁻¹',
        role: 'Kelajuan relatif antar kerangka acuan inersial'
      },
      {
        symbol: 'c',
        name: 'Speed of Light in Vacuum (Kelajuan Cahaya)',
        unit: '299,792,458 m·s⁻¹',
        quantityId: 'speed-of-light',
        dimension: '[L][T]⁻¹',
        role: 'Batas kelajuan universal informasi dan kausalitas'
      }
    ],
    assumptions: [
      'Ruang-waktu Minkowski datar tanpa kelengkungan gravitasi ekstrim (relativitas khusus).',
      'Kelajuan v berada di bawah kelajuan cahaya c (v < c).'
    ],
    limitations: 'Benda bermassa riil (m₀ > 0) memerlukan energi tak hingga untuk mencapai v = c, sehingga γ mendekati tak hingga ketika v → c.',
    exampleProblem: {
      problem: 'Sebuah wahana antariksa meluncur dengan kelajuan 0.8 c (80% kelajuan cahaya). Berapakah nilai faktor Lorentz-nya?',
      solution: 'γ = 1 / √(1 - (0.8)²) = 1 / √(1 - 0.64) = 1 / √0.36 = 1 / 0.6 = 1.667. Waktu di dalam wahana berjalan 1.667 kali lebih lambat relatif terhadap pengamat diam!',
      resultUnit: ''
    },
    calculator: {
      inputs: [
        { key: 'beta', label: 'Fraksi Kelajuan Cahaya (v / c)', default: 0.8, min: 0, max: 0.9999, step: 0.05, unit: 'c' }
      ],
      output: { key: 'gamma', label: 'Faktor Lorentz (γ)', unit: '' },
      compute: (inputs) => {
        const b = Math.min(0.9999, Math.max(0, inputs.beta));
        const gamma = 1 / Math.sqrt(1 - Math.pow(b, 2));
        return gamma.toFixed(4);
      }
    },
    relatedConceptIds: ['special-relativity', 'spacetime', 'speed-of-light']
  },
  {
    id: 'radioactive-decay-law',
    name: 'Radioactive Decay Law',
    indonesianName: 'Hukum Peluruhan Radioaktif',
    domainId: 'nuclear',
    category: 'Fisika Nuklir',
    latexDisplay: 'N(t) = N_0 \\cdot e^{-\\lambda t} = N_0 \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}',
    htmlDisplay: '<strong>N(t)</strong> = <em>N</em>₀ · e<sup>-<em>λt</em></sup>',
    summary: 'Hukum statistik fisika nuklir yang menyatakan bahwa jumlah inti radioaktif yang belum meluruh berkurang secara eksponensial terhadap waktu dengan laju proporsional terhadap konstanta peluruhan λ.',
    variables: [
      {
        symbol: 'N(t)',
        name: 'Remaining Unstable Nuclei (Jumlah Inti Radioaktif Tersisa)',
        unit: 'Inti Atom (Partikel)',
        quantityId: 'particle-count',
        dimension: '[1]',
        role: 'Jumlah populasi inti atom induk yang belum mengalami transmutasi peluruhan'
      },
      {
        symbol: 'N₀',
        name: 'Initial Nuclei Count (Jumlah Inti Awal)',
        unit: 'Inti Atom (Partikel)',
        quantityId: 'particle-count',
        dimension: '[1]',
        role: 'Jumlah populasi sampel inti mula-mula pada t = 0'
      },
      {
        symbol: 'T_1/2',
        name: 'Half-Life (Waktu Paruh)',
        unit: 's (kalkulator memakai tahun secara konsisten)',
        quantityId: 'time',
        dimension: '[T]',
        role: 'Waktu yang dibutuhkan separuh populasi inti radioaktif untuk meluruh (T_1/2 = ln(2)/λ)'
      },
      {
        symbol: 't',
        name: 'Elapsed Time (Waktu Berjalan)',
        unit: 's (kalkulator memakai tahun secara konsisten)',
        quantityId: 'time',
        dimension: '[T]',
        role: 'Durasi waktu peluruhan'
      }
    ],
    assumptions: [
      'Jumlah sampel inti atom sangat besar (N >> 1) sehingga hukum probabilitas statistik kuantum berlaku.',
      'Setiap inti memiliki probabilitas peluruhan per satuan waktu yang identik dan saling independen.'
    ],
    limitations: 'Tidak dapat memprediksi kapan secara tepat satu inti atom tertentu akan meluruh (peluruhan kuantum bersifat probabilistik murni).',
    exampleProblem: {
      problem: 'Sebuah fosil purba memiliki sampel Karbon-14 (C-14, waktu paruh 5,730 tahun). Jika saat ini tersisa 25% (0.25) dari jumlah awal N₀, berapakah perkiraan umur fosil tersebut?',
      solution: 'N(t)/N₀ = (1/2)^(t / 5730) = 0.25 = (1/2)² ⇒ t / 5730 = 2 ⇒ t = 11,460 tahun.',
      resultUnit: 'tahun'
    },
    calculator: {
      inputs: [
        { key: 'N0', label: 'Populasi Awal Inti (N₀)', default: 1000000, min: 10, max: 1e9, step: 10000, unit: 'inti' },
        { key: 'halfLife', label: 'Waktu Paruh (T½)', default: 5730, min: 0.1, max: 1e10, step: 100, unit: 'tahun' },
        { key: 't', label: 'Waktu Berjalan (t)', default: 11460, min: 0, max: 1e10, step: 100, unit: 'tahun' }
      ],
      output: { key: 'N_remaining', label: 'Inti Tersisa N(t)', unit: 'inti' },
      compute: (inputs) => {
        const fraction = Math.pow(0.5, inputs.t / inputs.halfLife);
        const remaining = inputs.N0 * fraction;
        return `${Math.round(remaining).toLocaleString()} (${(fraction * 100).toFixed(2)}%)`;
      }
    },
    relatedConceptIds: ['quantum', 'nuclear', 'energy']
  }
];

PHYSICS_EQUATIONS.push(...FIELD_EQUATIONS);

for (const record of PHYSICS_EQUATIONS) {
  record.reviewStatus ||= 'PARTIAL';
  record.sources ||= [{title: 'Bacaan lanjutan: ' + record.domainId, url: DOMAIN_REFERENCES[record.domainId], scope: 'Rujukan domain; bukan bukti bahwa seluruh klaim entri telah diverifikasi.'}];
}
