import { DOMAIN_REFERENCES } from './provenance.js';
import { SUPPLEMENTAL_ENTITIES } from './supplemental-entities.js';
// Fisikaloka · Comprehensive Physics Entity System Catalog (60+ Entities Across All 28 Domains & 14 Types)

export const PHYSICS_ENTITIES = [
  // =========================================================================
  // 1. FOUNDATIONS OF PHYSICS (Pengukuran, Satuan, Dimensi, Vektor)
  // =========================================================================
  {
    id: 'mass',
    name: 'Mass',
    indonesianName: 'Massa Inersial & Gravitasi',
    entityType: 'Quantity',
    domainId: 'foundations',
    subdomain: 'SI Units & Standards',
    symbol: 'm',
    summary: 'Besaran pokok skalar yang mengukur kuantitas materi, resistansi inersial terhadap akselerasi, dan sumber gaya tarik gravitasi.',
    layers: {
      simple: 'Massa adalah banyaknya materi dalam suatu benda. Massa Anda di Bumi, di Bulan, atau melayang di ruang hampa tetap sama persis, berbeda dengan berat yang berubah tergantung gravitasi.',
      standard: 'Satuan dasar SI untuk massa adalah Kilogram (kg). Sejak 20 Mei 2019, kilogram didefinisikan secara universal melalui nilai eksak Konstanta Planck h = 6.62607015 × 10⁻³⁴ kg·m²·s⁻¹ dengan Timbangan Kibble elektrodinamik.',
      advanced: 'Prinsip Kesetaraan (Equivalence Principle) diuji melalui kesetaraan antara massa inersial m_i = F/a dan massa gravitasi m_g = Fr²/(GM) hingga ketelitian 10⁻¹⁵.',
      deepDive: 'Dalam Model Standar, ~1% massa materi tampak berasal dari kopling Yukawa medan Higgs ke quark dan elektron; ~99% sisanya berasal dari energi kinetik dan medan gluon gaya kuat (QCD) melalui rumus E = mc².'
    },
    keyVariables: [{ symbol: 'm', name: 'Massa', unit: 'kg', dimension: '[M]' }],
    commonMisconceptions: ['Menyamakan massa (kg) dengan berat (N = kg·m/s²).'],
    historicalContext: 'Didefinisikan secara formal oleh Sir Isaac Newton (1687) dan dimurnikan oleh redefinisi SI 2019.',
    realWorldApplications: ['Standar kalibrasi metrologi internasional', 'Perhitungan aerodinamika roket antariksa'],
    relatedEntityIds: ['inertia', 'force', 'gravity', 'higgs-boson']
  },
  {
    id: 'kilogram',
    name: 'Kilogram',
    indonesianName: 'Kilogram (Satuan Pokok SI)',
    entityType: 'Unit',
    domainId: 'foundations',
    subdomain: 'SI Units & Standards',
    symbol: 'kg',
    summary: 'Satuan dasar Sistem Internasional (SI) untuk massa, didefinisikan dengan menetapkan nilai numerik tetap konstanta Planck.',
    layers: {
      simple: 'Kilogram adalah satuan standar internasional untuk menimbang massa barang dari beras hingga berat badan manusia.',
      standard: '1 kg adalah massa yang menghasilkan efek setara ketika konstanta Planck bernilai tepat 6.62607015 × 10⁻³⁴ J·s.',
      advanced: 'Diukur menggunakan timbangan Kibble (Watt Balance) yang menyeimbangkan gaya gravitasi berat benda dengan gaya elektromagnetik kumparan berarus di dalam medan magnet.',
      deepDive: 'Menggantikan artefak fisik silinder platina-iridium "Le Grand K" di Paris yang massanya mengalami penyimpangan mikrogram dari waktu ke waktu.'
    },
    keyVariables: [{ symbol: 'kg', name: 'Kilogram', unit: 'kg', dimension: '[M]' }],
    commonMisconceptions: ['Kilogram masih bergantung pada silinder logam di Paris.'],
    historicalContext: 'Didefinisikan ulang secara resmi pada sidang CGPM ke-26 (November 2018, berlaku 20 Mei 2019).',
    realWorldApplications: ['Perdagangan global', 'Manufaktur farmasi mikro-dosis'],
    relatedEntityIds: ['mass', 'planck-constant']
  },
  {
    id: 'dimensional-analysis',
    name: 'Dimensional Analysis',
    indonesianName: 'Analisis Dimensi',
    entityType: 'Concept',
    domainId: 'foundations',
    subdomain: 'Dimensional Analysis',
    symbol: '[M] [L] [T]',
    summary: 'Metode analisis fisika untuk memeriksa konsistensi persamaan dan menurunkan hubungan kesebandingan antara besaran fisik.',
    layers: {
      simple: 'Cara memeriksa apakah rumus fisika masuk akal atau tidak. Anda tidak bisa menjumlahkan apel dengan meter; kedua sisi rumus harus memiliki jenis ukuran yang persis sama!',
      standard: 'Setiap besaran turunan dapat diuraikan ke dalam 7 dimensi pokok: Massa [M], Panjang [L], Waktu [T], Arus [I], Suhu Mutlak [Θ], Jumlah Zat [N], dan Intensitas Cahaya [J]. Persamaan fisik wajib homogen dimensional.',
      advanced: 'Teorema Buckingham-Pi menyatakan bahwa sembarang persamaan fisik yang melibatkan n variabel dengan k dimensi pokok independen dapat ditulis ulang sebagai hubungan antara (n - k) variabel tak berdimensi π.',
      deepDive: 'Digunakan oleh G.I. Taylor (1950) untuk memperkirakan daya ledak bom atom pertama Trinity (≈ 17 kiloton TNT) hanya dari foto publik pertumbuhan radius bola api seiring waktu!'
    },
    keyVariables: [{ symbol: '[X]', name: 'Dimensi Besaran', unit: 'Kombinasi Satuan Dasar', dimension: '[M]^a [L]^b [T]^c' }],
    commonMisconceptions: ['Besaran tanpa satuan memiliki dimensi (adimensional berarti pangkat seluruh dimensi pokok nol: [M]⁰[L]⁰[T]⁰ = 1).'],
    historicalContext: 'Dipopulerkan oleh Joseph Fourier dalam Théorie analytique de la chaleur (1822).',
    realWorldApplications: ['Uji model terowongan angin miniatur pesawat terbang', 'Penskalaan rekayasa fluida hidrolik'],
    relatedEntityIds: ['mass', 'velocity', 'force', 'energy']
  },

  // =========================================================================
  // 2. KINEMATICS & DYNAMICS (Mekanika Gerak & Hukum Newton)
  // =========================================================================
  {
    id: 'velocity',
    name: 'Velocity',
    indonesianName: 'Kecepatan',
    entityType: 'Quantity',
    domainId: 'kinematics',
    subdomain: 'Vector Kinematics',
    symbol: 'v⃗',
    summary: 'Besaran vektor yang menyatakan laju perubahan posisi benda terhadap waktu beserta arah orientasi geraknya.',
    layers: {
      simple: 'Kecepatan adalah seberapa cepat dan ke arah mana Anda bergerak. Speedometer mobil hanya menunjukkan kelajuan, sedangkan kecepatan mencakup arah (contoh: 80 km/jam ke barat).',
      standard: 'Kecepatan rata-rata adalah v⃗_avg = Δr⃗ / Δt. Kecepatan sesaat adalah turunan pertama vektor posisi terhadap waktu: v⃗(t) = dr⃗/dt. Satuan SI: m/s.',
      advanced: 'Dalam 4D ruang-waktu relativitas khusus, 4-kecepatan U^μ = dx^μ/dτ memenuhi invarian Minkowski U_μ U^μ = -c².',
      deepDive: 'Batas kecepatan penjalaran kausalitas informasi di alam semesta adalah kelajuan cahaya dalam ruang hampa c = 299.792.458 m/s.'
    },
    keyVariables: [{ symbol: 'v', name: 'Kecepatan', unit: 'm·s⁻¹', dimension: '[L][T]⁻¹' }],
    commonMisconceptions: ['Menyamakan kelajuan (skalar) dengan kecepatan (vektor).'],
    historicalContext: 'Diformalkan oleh Galileo Galilei dalam Discorsi e Dimostrazioni Matematiche (1638).',
    realWorldApplications: ['Navigasi penerbangan autopilot', 'Pelacakan orbit telekomunikasi'],
    relatedEntityIds: ['acceleration', 'force', 'linear-momentum', 'kinetic-energy-classic']
  },
  {
    id: 'acceleration',
    name: 'Acceleration',
    indonesianName: 'Percepatan',
    entityType: 'Quantity',
    domainId: 'kinematics',
    subdomain: 'Vector Kinematics',
    symbol: 'a⃗',
    summary: 'Laju perubahan vektor kecepatan terhadap waktu, mencakup perubahan kelajuan, perubahan arah lintasan, atau keduanya.',
    layers: {
      simple: 'Percepatan adalah seberapa cepat sesuatu menambah atau mengurangi kecepatan, atau saat berbelok arah. Saat mobil digas kencang, Anda merasakan percepatan mendorong tubuh ke jok.',
      standard: 'Percepatan rata-rata adalah a⃗_avg = Δv⃗ / Δt. Percepatan sesaat adalah turunan kedua posisi terhadap waktu: a⃗(t) = d²r⃗/dt². Satuan SI: m/s².',
      advanced: 'Dalam koordinat lengkung Frenet-Serret, a⃗ = (dv/dt) T̂ + (v²/ρ) N̂, terdiri dari komponen tangensial pengubah kelajuan dan komponen normal percepatan sentripetal pengubah arah.',
      deepDive: 'Berdasarkan Teori Relativitas Umum, benda yang jatuh bebas di medan gravitasi tidak mengalami 4-percepatan sejati (A^μ = 0), melainkan meluncur mengikuti geodetik ruang-waktu lengkung.'
    },
    keyVariables: [{ symbol: 'a', name: 'Percepatan', unit: 'm·s⁻²', dimension: '[L][T]⁻²' }],
    commonMisconceptions: ['Kecepatan nol berarti percepatan selalu nol (keliru: di puncak lemparan vertikal, v = 0 tetapi a = 9.8 m/s² ke bawah).'],
    historicalContext: 'Dipelajari secara eksperimental oleh Galileo dengan bola meluncur di bidang miring.',
    realWorldApplications: ['Sensor akselerometer MEMS ponsel cerdas', 'Uji ketahanan g-force pilot pesawat tempur'],
    relatedEntityIds: ['velocity', 'force', 'newton-second-law', 'inertia']
  },
  {
    id: 'inertia',
    name: 'Inertia',
    indonesianName: 'Kelembaman (Inersia)',
    entityType: 'Concept',
    domainId: 'dynamics',
    subdomain: 'Newton’s Three Laws',
    symbol: 'm',
    summary: 'Kecenderungan alami materi untuk mempertahankan keadaan geraknya (tetap diam atau meluncur lurus konstan) tanpa gaya luar neto.',
    layers: {
      simple: 'Inersia adalah "kemalasan" benda untuk mengubah gerakannya. Itulah mengapa tubuh Anda terdorong ke depan saat mobil direm mendadak.',
      standard: 'Inersia dinyatakan secara formal dalam Hukum Pertama Newton: jika ∑F⃗ = 0, benda diam tetap diam, benda bergerak tetap GLB. Ukuran kuantitatif inersianya adalah massa inersial m.',
      advanced: 'Dalam kerangka acuan berputar (non-inersial), kelembaman memunculkan gaya semu inersial: F_sentrifugal = -m (ω⃗ × (ω⃗ × r⃗)) dan F_Coriolis = -2m (ω⃗ × v⃗_rot).',
      deepDive: 'Prinsip Mach menyatakan inersia materi adalah akibat interaksi gravitasi kolektif dengan seluruh massa alam semesta, yang menginspirasi Einstein merumuskan Relativitas Umum.'
    },
    keyVariables: [{ symbol: 'm', name: 'Massa Inersial', unit: 'kg', dimension: '[M]' }],
    commonMisconceptions: ['Benda membutuhkan gaya terus-menerus untuk mempertahankan kelajuannya (pandangan Aristoteles kuno).'],
    historicalContext: 'Dirumuskan oleh Galileo dan ditetapkan sebagai Hukum I dalam Principia Newton (1687).',
    realWorldApplications: ['Sabuk pengaman dan kantung udara mobil', 'Roda gila penyimpan energi turbin'],
    relatedEntityIds: ['mass', 'newton-first-law', 'force']
  },
  {
    id: 'force',
    name: 'Force',
    indonesianName: 'Gaya',
    entityType: 'Quantity',
    domainId: 'dynamics',
    subdomain: 'Newton’s Three Laws',
    symbol: 'F⃗',
    summary: 'Interaksi vektor antara dua benda bermassa yang mampu menyebabkan perubahan momentum, akselerasi gerak, atau deformasi struktur.',
    layers: {
      simple: 'Gaya adalah tarikan atau dorongan yang bisa membuat benda bergerak, berhenti, atau berubah bentuk.',
      standard: 'Diukur dalam satuan Newton (N = kg·m·s⁻²). Hukum II Newton menyatakan bahwa resultan gaya neto berbanding lurus dengan laju perubahan momentum: F⃗ = dp⃗/dt = m·a⃗.',
      advanced: 'Untuk medan konservatif, gaya vektor adalah minus gradien dari potensial skalar: F⃗ = -∇U. Dalam mekanika analitik Lagrangian, gaya tergeneralisasi adalah Q_j = d/dt(∂L/∂q̇_j) - ∂L/∂q_j.',
      deepDive: 'Empat interaksi fundamental adalah gravitasi, elektromagnetisme, lemah, dan kuat. Tiga interaksi terakhir dijelaskan Model Standar dengan boson tolok; gravitasi dijelaskan relativitas umum dan teori kuantumnya belum terkonfirmasi.'
    },
    keyVariables: [{ symbol: 'F', name: 'Gaya', unit: 'Newton (N)', dimension: '[M][L][T]⁻²' }],
    commonMisconceptions: ['Gaya tersimpan di dalam benda yang bergerak cepat (benda memiliki momentum/energi, bukan gaya).'],
    historicalContext: 'Diformulasikan dalam dinamika klasik oleh Sir Isaac Newton (1687).',
    realWorldApplications: ['Rekayasa struktur jembatan gantung', 'Uji tabrak keselamatan otomotif'],
    relatedEntityIds: ['acceleration', 'mass', 'newton-second-law', 'work']
  },
  {
    id: 'newton',
    name: 'Newton (Unit of Force)',
    indonesianName: 'Newton (Satuan Gaya)',
    entityType: 'Unit',
    domainId: 'dynamics',
    subdomain: 'SI Units & Standards',
    symbol: 'N',
    summary: 'Satuan turunan SI untuk gaya, didefinisikan sebagai gaya yang memberikan percepatan 1 m/s² pada massa 1 kg.',
    layers: {
      simple: 'Satu Newton kira-kira setara dengan gaya berat gravitasi yang menarik sebuah apel berbobot 100 gram di telapak tangan Anda.',
      standard: '1 N = 1 kg·m·s⁻². Satuan ini diturunkan langsung dari Hukum Kedua Newton F = ma.',
      advanced: 'Dalam satuan dasar CGS: 1 N = 10⁵ dyne. Dalam satuan gravitasi teknik: 1 kgf (kilogram-gaya) ≈ 9.80665 N.',
      deepDive: 'Dalam pendekatan elektrostatik, gaya tolak elektrostatik antara dua elektron berjarak 1 meter di ruang hampa adalah sekitar 2.3 × 10⁻²⁸ N.'
    },
    keyVariables: [{ symbol: 'N', name: 'Newton', unit: 'kg·m·s⁻²', dimension: '[M][L][T]⁻²' }],
    commonMisconceptions: ['Menyamakan 1 kg massa dengan 1 kg berat (berat 1 kg di bumi adalah ~9.8 N).'],
    historicalContext: 'Dinamai untuk menghormati Sir Isaac Newton oleh General Conference on Weights and Measures (CGPM) tahun 1946.',
    realWorldApplications: ['Spesifikasi torsi mesin otomotif (N·m)', 'Kekuatan tarik tali baja tambang'],
    relatedEntityIds: ['force', 'mass', 'acceleration']
  },
  {
    id: 'newton-first-law',
    name: 'Newton’s First Law of Motion',
    indonesianName: 'Hukum I Newton (Kelembaman)',
    entityType: 'Law',
    domainId: 'dynamics',
    subdomain: 'Newton’s Three Laws',
    symbol: '∑F⃗ = 0 ⟹ a⃗ = 0',
    summary: 'Benda akan tetap diam atau bergerak lurus beraturan jika tidak ada gaya eksternal neto yang bekerja padanya.',
    layers: {
      simple: 'Benda yang diam akan terus diam, dan benda yang meluncur akan terus meluncur selamanya, kecuali ada yang mendorong atau menariknya.',
      standard: 'Jika resultan gaya eksternal sama dengan nol (∑F⃗ = 0), maka kecepatan benda konstan (v⃗ = konstan). Menetapkan keberadaan kerangka inersial.',
      advanced: 'Postulat tentang keberadaan kerangka koordinat inersial di mana ruang bersifat homogen dan isotropik serta waktu bersifat seragam tanpa akselerasi fiktif.',
      deepDive: 'Dalam Relativitas Umum, gerak inersial Hukum I Newton digeneralisasikan menjadi gerak geodetik di ruang-waktu lengkung 4D.'
    },
    keyVariables: [{ symbol: '∑F', name: 'Resultan Gaya', unit: 'N', dimension: '[M][L][T]⁻²' }],
    commonMisconceptions: ['Benda yang bergerak selalu memiliki gaya pendorong di dalamnya.'],
    historicalContext: 'Principia Mathematica Newton (1687).',
    realWorldApplications: ['Satelit luar angkasa Voyager yang meluncur terus tanpa bahan bakar', 'Desain sabuk keselamatan'],
    relatedEntityIds: ['inertia', 'force', 'velocity']
  },
  {
    id: 'newton-second-law',
    name: 'Newton’s Second Law of Motion',
    indonesianName: 'Hukum II Newton',
    entityType: 'Law',
    domainId: 'dynamics',
    subdomain: 'Newton’s Three Laws',
    symbol: 'F⃗ = m·a⃗',
    summary: 'Percepatan yang dialami suatu benda berbanding lurus dengan resultan gaya neto dan berbanding terbalik dengan massa inersialnya.',
    layers: {
      simple: 'Semakin kuat Anda mendorong sebuah gerobak, semakin cepat gerobak bertambah laju. Namun semakin berat muatannya, semakin sulit ia dipercepat.',
      standard: 'F⃗_net = m·a⃗ = dp⃗/dt. Satuan gaya: Newton. Rumus ini menghubungkan kinematika (akselerasi) dengan dinamika (penyebab gerak).',
      advanced: 'Untuk sistem dengan massa berubah seiring waktu (seperti roket menyemburkan bahan bakar): F⃗_ext = m(dv⃗/dt) - v⃗_rel(dm/dt) (Persamaan Roket Tsiolkovsky).',
      deepDive: 'Dalam batas relativistik (v mendekati c), F⃗ = d/dt(γ m₀ v⃗), sehingga gaya konstan tidak pernah bisa mempercepat partikel bermassa melampaui c.'
    },
    keyVariables: [
      { symbol: 'F', name: 'Gaya Neto', unit: 'N', dimension: '[M][L][T]⁻²' },
      { symbol: 'm', name: 'Massa Inersial', unit: 'kg', dimension: '[M]' },
      { symbol: 'a', name: 'Percepatan', unit: 'm·s⁻²', dimension: '[L][T]⁻²' }
    ],
    commonMisconceptions: ['Massa dan percepatan selalu berbanding lurus (keliru: pada gaya tetap, massa dan percepatan berbanding TERBALIK).'],
    historicalContext: 'Prinsip fondasi mekanika klasik dalam Principia Newton (1687).',
    realWorldApplications: ['Perhitungan pendorong roket Falcon 9', 'Dinamika suspensi kendaraan'],
    relatedEntityIds: ['force', 'mass', 'acceleration', 'linear-momentum']
  },
  {
    id: 'newton-third-law',
    name: 'Newton’s Third Law of Motion',
    indonesianName: 'Hukum III Newton (Aksi-Reaksi)',
    entityType: 'Law',
    domainId: 'dynamics',
    subdomain: 'Newton’s Three Laws',
    symbol: 'F⃗_aksi = - F⃗_reaksi',
    summary: 'Ketika benda A memberikan gaya pada benda B, maka benda B secara serentak memberikan gaya yang sama besar dan berlawanan arah pada benda A.',
    layers: {
      simple: 'Setiap aksi ada reaksi yang sama besar dan berlawanan arah. Jika Anda mendorong dinding dengan telapak tangan, dinding membalas mendorong telapak tangan Anda dengan kekuatan yang sama persis.',
      standard: 'Gaya selalu berpasangan timbal balik. Pasangan aksi-reaksi memiliki sifat: sama besar, berlawanan arah, bekerja pada DUA BENDA YANG BERBEDA, dan terjadi serentak.',
      advanced: 'Menjamin kekekalan momentum linear total pada sistem terisolasi: dp_total/dt = F_AB + F_BA = 0.',
      deepDive: 'Dalam elektrodinamika interaksi muatan bergerak yang dimediasi medan magnet, Hukum III Newton tampak dilanggar sesaat karena medan elektromagnetik itu sendiri membawa momentum fisik!'
    },
    keyVariables: [{ symbol: 'F_aksi', name: 'Gaya Aksi', unit: 'N', dimension: '[M][L][T]⁻²' }],
    commonMisconceptions: ['Gaya aksi dan reaksi saling meniadakan sehingga benda tidak bisa bergerak (keliru: aksi dan reaksi bekerja pada DUA benda berbeda!).'],
    historicalContext: 'Principia Newton (1687).',
    realWorldApplications: ['Semburan gas mesin jet dan propulsi roket', 'Gaya dorong kayuhan dayung di air'],
    relatedEntityIds: ['force', 'linear-momentum', 'newton-second-law']
  },

  // =========================================================================
  // 3. WORK, ENERGY & MOMENTUM (Usaha, Energi & Momentum)
  // =========================================================================
  {
    id: 'energy',
    name: 'Energy',
    indonesianName: 'Energi',
    entityType: 'Quantity',
    domainId: 'work-energy',
    subdomain: 'Conservation of Energy',
    symbol: 'E',
    summary: 'Besaran skalar yang bergantung kerangka acuan dan menyatakan kapasitas suatu sistem fisik untuk melakukan usaha atau memindahkan panas.',
    layers: {
      simple: 'Energi adalah kemampuan untuk membuat sesuatu terjadi. Energi tidak pernah bisa diciptakan atau dimusnahkan, hanya bisa berubah bentuk.',
      standard: 'Satuan SI energi adalah Joule (J). Bentuk energi mekanik mencakup energi kinetik translasi (½mv²), rotasi (½Iω²), dan potensial (mgh atau ½kx²).',
      advanced: 'Menurut Teorema Noether, hukum kekekalan energi adalah konsekuensi langsung dari simetri translasi waktu pada aksi Lagrangian sistem fisik.',
      deepDive: 'Dalam Relativitas Khusus, massa diam dan energi setara secara fundamental melalui formula E = mc².'
    },
    keyVariables: [{ symbol: 'E', name: 'Energi', unit: 'Joule (J)', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Energi bisa habis lenyap (energi hanya bertransformasi menjadi kalor bersuhu rendah).'],
    historicalContext: 'Dirumuskan pada abad ke-19 oleh Mayer, Joule, dan Helmholtz.',
    realWorldApplications: ['Pembangkit listrik tenaga air/surya/angin', 'Efisiensi baterai kendaraan listrik'],
    relatedEntityIds: ['work', 'conservation-of-energy', 'mass-energy-equivalence', 'entropy']
  },
  {
    id: 'joule',
    name: 'Joule (Unit of Energy)',
    indonesianName: 'Joule (Satuan Energi SI)',
    entityType: 'Unit',
    domainId: 'work-energy',
    subdomain: 'SI Units & Standards',
    symbol: 'J',
    summary: 'Satuan turunan SI untuk energi, usaha, dan jumlah kalor, setara dengan 1 Newton meter (kg·m²·s⁻²).',
    layers: {
      simple: 'Satu Joule kira-kira adalah energi yang Anda gunakan untuk mengangkat sebuah apel setinggi satu meter ke atas meja.',
      standard: '1 J = 1 N·m = 1 W·s = 1 kg·m²·s⁻². Satuan setara: 1 kalori ≈ 4.184 J, 1 kWh = 3.6 × 10⁶ J.',
      advanced: 'Dalam skala mikroskopis atom, satuan praktis adalah elektronvolt: 1 eV = 1.602176634 × 10⁻¹⁹ J.',
      deepDive: 'Didefinisikan secara mekanis melalui eksperimen kesetaraan mekanik kalor James Prescott Joule.'
    },
    keyVariables: [{ symbol: 'J', name: 'Joule', unit: 'kg·m²·s⁻²', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Menyamakan Joule (energi total) dengan Watt (laju daya per detik: 1 Watt = 1 Joule/detik).'],
    historicalContext: 'Diberi nama untuk menghormati fisikawan Inggris James Prescott Joule (1889).',
    realWorldApplications: ['Label informasi nilai gizi makanan', 'Tagihan meteran listrik rumah'],
    relatedEntityIds: ['energy', 'work', 'newton']
  },
  {
    id: 'work',
    name: 'Work',
    indonesianName: 'Usaha Mekanik',
    entityType: 'Concept',
    domainId: 'work-energy',
    subdomain: 'Work-Energy Theorem',
    symbol: 'W',
    summary: 'Proses transfer energi ketika suatu gaya eksternal menyebabkan perpindahan pada arah komponen gaya tersebut.',
    layers: {
      simple: 'Dalam fisika, usaha hanya ada jika ada perpindahan. Jika Anda mendorong tembok kokoh sampai lelah tetapi tembok tidak bergeser, usahanya adalah NOL.',
      standard: 'W = F⃗ · d⃗ = F · d · cos(θ). Teorema Usaha-Energi membuktikan: W_net = ΔE_k. Satuan SI: Joule.',
      advanced: 'Untuk lintasan kurva sembarang: W = ∫_C F⃗ · dr⃗. Jika rotasional gaya nol (∇ × F⃗ = 0), gaya bersifat konservatif dan W = -ΔU.',
      deepDive: 'Dalam termodinamika gas, usaha mekanik ekspansi fluida dinyatakan oleh integral volume: W = ∫ P dV.'
    },
    keyVariables: [{ symbol: 'W', name: 'Usaha', unit: 'J', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Gaya yang tegak lurus arah perpindahan melakukan usaha (cos 90° = 0, sehingga usahanya tepat nol).'],
    historicalContext: 'Dikonsepkan oleh Gaspard-Gustave de Coriolis (1826).',
    realWorldApplications: ['Perhitungan konsumsi bahan bakar mesin', 'Daya angkat derek crane konstruksi'],
    relatedEntityIds: ['force', 'energy', 'kinetic-energy-classic']
  },
  {
    id: 'conservation-of-energy',
    name: 'Principle of Conservation of Energy',
    indonesianName: 'Hukum Kekekalan Energi',
    entityType: 'Principle',
    domainId: 'work-energy',
    subdomain: 'Conservation of Energy',
    symbol: 'E_total = konstan',
    summary: 'Prinsip fundamental fisika bahwa energi total sistem terisolasi selalu konstan; energi hanya dapat bertransformasi dari satu bentuk ke bentuk lain.',
    layers: {
      simple: 'Energi tidak dapat dibuat dari ketiadaan dan tidak dapat dihancurkan. Energi hanya berpindah atau berganti wujud.',
      standard: 'ΔE_sistem = Q - W (Hukum I Termodinamika). Untuk sistem mekanik tanpa gesekan: E_mekanik = E_k + E_p = konstan.',
      advanced: 'Konsekuensi matematis dari simetri invariansi translasi waktu Lagrangian (Teorema Noether Emmy Noether 1918).',
      deepDive: 'Dalam kosmologi metrik FLRW alam semesta yang mengembang, simetri waktu global tidak berlaku kaku, sehingga foton radiasi CMB mengalami pendinginan redshift kosmologis seiring ekspansi ruang.'
    },
    keyVariables: [{ symbol: 'E_total', name: 'Energi Total', unit: 'J', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Mesin gerak abadi (perpetual motion machine) dapat dibuat jika kita menemukan material ajaib.'],
    historicalContext: 'Dibuktikan melalui serangkaian eksperimen kalorimetri oleh Joule (1843).',
    realWorldApplications: ['Sistem pengereman regeneratif mobil listrik', 'Pembangkit listrik tenaga air'],
    relatedEntityIds: ['energy', 'work', 'thermodynamic-laws']
  },
  {
    id: 'linear-momentum',
    name: 'Linear Momentum',
    indonesianName: 'Momentum Linear',
    entityType: 'Quantity',
    domainId: 'momentum',
    subdomain: 'Linear Momentum',
    symbol: 'p⃗',
    summary: 'Ukuran kuantitas gerak translasi suatu benda bermassa, didefinisikan sebagai perkalian massa dengan vektor kecepatannya.',
    layers: {
      simple: 'Momentum adalah ukuran seberapa sulit menghentikan benda yang sedang meluncur. Kereta api yang berjalan lambat sangat sulit dihentikan karena massanya luar biasa besar.',
      standard: 'p⃗ = m · v⃗. Impuls gaya didefinisikan sebagai J⃗ = ∫ F⃗ dt = Δp⃗. Dalam sistem terisolasi (tanpa gaya eksternal neto), momentum total selalu kekal.',
      advanced: 'Menurut Teorema Noether, kekekalan momentum linear berasal dari simetri translasi spasial alam semesta (ruang bersifat homogen).',
      deepDive: 'Bahkan partikel tak bermassa seperti foton cahaya membawa momentum: p = h / λ = E / c, yang mampu mendorong layar surya antariksa (solar sail).'
    },
    keyVariables: [{ symbol: 'p', name: 'Momentum', unit: 'kg·m·s⁻¹', dimension: '[M][L][T]⁻¹' }],
    commonMisconceptions: ['Tumbukan tidak lenting melanggar hukum kekekalan momentum (keliru: momentum selalu kekal, hanya energi kinetiknya yang berubah menjadi panas/bunyi!).'],
    historicalContext: 'Didefinisikan oleh René Descartes dan Isaac Newton.',
    realWorldApplications: ['Airbag keselamatan otomotif untuk memperpanjang waktu benturan (Δt)', 'Propulsi roket antariksa'],
    relatedEntityIds: ['velocity', 'force', 'newton-second-law', 'photon']
  },
  {
    id: 'torque',
    name: 'Torque',
    indonesianName: 'Torsi (Momen Gaya)',
    entityType: 'Quantity',
    domainId: 'rotation',
    subdomain: 'Torque',
    symbol: 'τ⃗',
    summary: 'Kecenderungan gaya untuk menyebabkan benda berputar pada suatu sumbu rotasi, didefinisikan sebagai perkalian silang vektor posisi dengan vektor gaya.',
    layers: {
      simple: 'Torsi adalah kekuatan putaran. Membuka pintu lebih mudah jika Anda mendorong gagang di tepi yang jauh dari engsel dibanding mendorong dekat engsel.',
      standard: 'τ⃗ = r⃗ × F⃗, dengan magnitudo τ = r · F · sin(θ). Satuan SI: N·m. Dinamika rotasi analog dengan Hukum II Newton: τ⃗_net = I · α⃗ (I = momen inersia, α = percepatan sudut).',
      advanced: 'Laju perubahan momentum sudut terhadap waktu sama dengan torsi neto: τ⃗ = dL⃗/dt.',
      deepDive: 'Dalam giroskop dan partikel bermagnet di medan magnet B, torsi memicu presesi sudut (Larmor precession: τ⃗ = μ⃗ × B⃗).'
    },
    keyVariables: [
      { symbol: 'τ', name: 'Torsi', unit: 'N·m', dimension: '[M][L]²[T]⁻²' },
      { symbol: 'I', name: 'Momen Inersia', unit: 'kg·m²', dimension: '[M][L]²' }
    ],
    commonMisconceptions: ['Menyamakan satuan torsi (N·m) dengan satuan energi Joule (torsi adalah vektor pseudovektor rotasi, bukan skalar usaha).'],
    historicalContext: 'Prinsip kesetimbangan tuas dirumuskan oleh Archimedes (250 SM).',
    realWorldApplications: ['Kunci pas dan dongkrak mobil', 'Torsi motor listrik mobil Tesla'],
    relatedEntityIds: ['force', 'rotation', 'angular-momentum']
  },

  // =========================================================================
  // 4. GRAVITATION & ORBITS (Gravitasi & Astrofisika Klasik)
  // =========================================================================
  {
    id: 'gravity',
    name: 'Gravitation',
    indonesianName: 'Gravitasi',
    entityType: 'Concept',
    domainId: 'gravitation',
    subdomain: 'Universal Gravitation',
    symbol: 'g (atau G_μν)',
    summary: 'Fenomena interaksi alami materi dan energi saling menarik satu sama lain, atau secara geometris kelengkungan ruang-waktu 4D.',
    layers: {
      simple: 'Gaya tarik alami yang membuat semua benda jatuh ke tanah, menahan atmosfer bumi, dan membuat bumi mengitari matahari.',
      standard: 'Hukum Gravitasi Universal Newton: F_g = G (m₁m₂ / r²). Kuat medan gravitasi di permukaan bumi adalah g = GM/R² ≈ 9.81 m/s².',
      advanced: 'Dalam Relativitas Umum, gravitasi bukan gaya tarik mistis, melainkan kelengkungan geometri kontinuum ruang-waktu: G_μν = (8πG/c⁴) T_μν.',
      deepDive: 'Merupakan interaksi fundamental paling lemah namun mendominasi struktur kosmos berskala raksasa karena tidak memiliki polaritas muatan negatif yang saling meniadakan.'
    },
    keyVariables: [{ symbol: 'G', name: 'Konstanta Gravitasi', unit: 'N·m²·kg⁻²', dimension: '[M]⁻¹[L]³[T]⁻²' }],
    commonMisconceptions: ['Di stasiun luar angkasa ISS tidak ada gravitasi (gravitasi di ISS masih ~90% permukaan bumi; astronot melayang karena berada dalam kondisi jatuh bebas orbital konstan).'],
    historicalContext: 'Dirumuskan oleh Isaac Newton (1687) dan dimatangkan oleh Albert Einstein (1915).',
    realWorldApplications: ['Penentuan orbit satelit GPS dan geostasioner', 'Prediksi pasang surut air laut'],
    relatedEntityIds: ['universal-gravitation', 'spacetime', 'black-hole', 'orbit']
  },
  {
    id: 'orbit',
    name: 'Planetary Orbit & Keplerian Motion',
    indonesianName: 'Mekanika Orbit & Hukum Kepler',
    entityType: 'System',
    domainId: 'gravitation',
    subdomain: 'Orbital Mechanics',
    symbol: 'T² ∝ a³',
    summary: 'Lintasan lengkung gravitasi yang dilalui oleh suatu benda langit atau satelit buatan mengelilingi pusat massa benda penarik.',
    layers: {
      simple: 'Orbit satelit terjadi karena satelit melesat horizontal begitu cepat ke depan sementara gravitasi terus menariknya ke bawah, sehingga satelit terus "jatuh melengkung" mengikuti kelengkungan Bumi tanpa pernah membentur tanah!',
      standard: 'Tiga Hukum Kepler: 1) Orbit planet berbentuk elips dengan Matahari di salah satu fokusnya; 2) Vektor jari-jari menyapu luasan yang sama dalam selang waktu yang sama; 3) Kuadrat periode sebanding dengan pangkat tiga sumbu semi-mayor (T² ∝ a³).',
      advanced: 'Persamaan vis-viva gerak orbital dua-benda: v² = GM (2/r - 1/a). Kecepatan lepas bebas adalah v_esc = √(2GM/r).',
      deepDive: 'Relativitas Umum memprediksi presesi perihelion tambahan akibat kelengkungan ruang-waktu Schwarzschild, yang memecahkan anomali orbit planet Merkurius sebesar 43 detik busur per abad.'
    },
    keyVariables: [
      { symbol: 'v_orb', name: 'Kecepatan Orbit Sirkular', unit: 'm·s⁻¹', dimension: '[L][T]⁻¹' },
      { symbol: 'T', name: 'Periode Orbit', unit: 's', dimension: '[T]' }
    ],
    commonMisconceptions: ['Orbit satelit adalah lingkaran sempurna (hampir semua orbit alami dan buatan memiliki eksentrisitas elips e > 0).'],
    historicalContext: 'Ditemukan secara empiris oleh Johannes Kepler (1609-1619) dari data Tycho Brahe, lalu dibuktikan analitik oleh Newton.',
    realWorldApplications: ['Manuver transfer orbit Hohmann wahana Mars', 'Satelit cuaca geostasioner'],
    relatedEntityIds: ['gravity', 'universal-gravitation']
  },

  // =========================================================================
  // 5. FLUID PHYSICS (Mekanika Fluida Statis & Dinamis)
  // =========================================================================
  {
    id: 'pressure',
    name: 'Pressure',
    indonesianName: 'Tekanan Fluida',
    entityType: 'Quantity',
    domainId: 'fluids',
    subdomain: 'Hydrostatic Pressure',
    symbol: 'P',
    summary: 'Gaya normal tegak lurus yang bekerja per satuan luas permukaan sentuh, atau kerapatan energi energi kinetik partikel fluida.',
    layers: {
      simple: 'Tekanan adalah gaya dorong yang tersebar pada suatu bidang. Mengenakan sepatu hak tinggi menekan lantai jauh lebih kuat daripada sepatu kets datar karena seluruh berat badan terkonsentrasi pada ujung hak yang sangat sempit!',
      standard: 'P = F_tegak / A. Satuan SI: Pascal (1 Pa = 1 N/m²). Tekanan hidrostatis dalam fluida bertambah seiring kedalaman: P = P₀ + ρ·g·h.',
      advanced: 'Dalam mekanika kontinum, tekanan isotropik adalah sepertiga dari jejak tensor tegangan mekanik: P = -⅓ Tr(σ_ij). Menghasilkan gaya gradien volume: f⃗ = -∇P.',
      deepDive: 'Tekanan degenerasi membantu menopang katai putih dan bintang neutron hingga batas kestabilannya. Lubang hitam tidak ditopang oleh tekanan degenerasi sebagai bintang statis.'
    },
    keyVariables: [{ symbol: 'P', name: 'Tekanan', unit: 'Pascal (Pa)', dimension: '[M][L]⁻¹[T]⁻²' }],
    commonMisconceptions: ['Bentuk wadah mempengaruhi tekanan di dasar (Paradoks Hidrostatis: tekanan hanya bergantung pada kedalaman h dan massa jenis ρ, bukan volume wadah).'],
    historicalContext: 'Eksperimen barometer merkuri oleh Evangelista Torricelli dan Blaise Pascal (1643-1648).',
    realWorldApplications: ['Sistem rem hidrolik mobil', 'Desain lambung kapal selam laut dalam'],
    relatedEntityIds: ['pascal', 'fluids', 'bernoulli-equation']
  },
  {
    id: 'pascal',
    name: 'Pascal (Unit of Pressure)',
    indonesianName: 'Pascal (Satuan Tekanan SI)',
    entityType: 'Unit',
    domainId: 'fluids',
    subdomain: 'SI Units & Standards',
    symbol: 'Pa',
    summary: 'Satuan turunan SI untuk tekanan dan tegangan mekanik, setara dengan 1 Newton per meter persegi (N·m⁻²).',
    layers: {
      simple: 'Satu Pascal adalah tekanan yang sangat lembut, kira-kira sebesar tekanan selembar uang kertas yang tergeletak rata di telapak tangan Anda.',
      standard: '1 Pa = 1 N/m² = 1 kg·m⁻¹·s⁻². Tekanan atmosfer standar permukaan laut: 1 atm = 101.325 Pa = 101.325 kPa ≈ 1.013 bar.',
      advanced: 'Dalam geofisika dan fisika material bertekanan tinggi, digunakan satuan GPa (Gigapascal = 10⁹ Pa) untuk mengukur kekuatan luluh berlian dan inti bumi.',
      deepDive: 'Dalam persamaan keadaan kosmologi kosmologis, rasio tekanan terhadap kerapatan energi menentukan percepatan ekspansi ruang (w = P/ρc²).'
    },
    keyVariables: [{ symbol: 'Pa', name: 'Pascal', unit: 'N·m⁻²', dimension: '[M][L]⁻¹[T]⁻²' }],
    commonMisconceptions: ['Menyamakan 1 bar dengan 1 Pascal (1 bar = 100.000 Pa).'],
    historicalContext: 'Diberi nama untuk menghormati Blaise Pascal pada tahun 1971.',
    realWorldApplications: ['Pengukuran tekanan darah (mmHg dikonversi ke kPa)', 'Prakiraan cuaca barometer'],
    relatedEntityIds: ['pressure', 'newton']
  },
  {
    id: 'fluids',
    name: 'Fluid Dynamics',
    indonesianName: 'Dinamika Fluida & Asas Bernoulli',
    entityType: 'Concept',
    domainId: 'fluids',
    subdomain: 'Bernoulli’s Principle',
    symbol: 'P + ½ρv² + ρgh = konstan',
    summary: 'Studi tentang perilaku zat cair dan gas yang mengalir, diatur oleh persamaan kontinuitas kekekalan massa dan persamaan Navier-Stokes.',
    layers: {
      simple: 'Ketika air mengalir melewati pipa yang menyempit, air bergerak jauh lebih cepat. Ajaibnya, di bagian yang bergerak lebih cepat tekanannya justru turun!',
      standard: 'Persamaan Kontinuitas: A₁v₁ = A₂v₂. Asas Bernoulli menyatakan bahwa pada ketinggian konstan, peningkatan kelajuan fluida terjadi bersamaan dengan penurunan tekanan statisnya: P + ½ρv² = konstan.',
      advanced: 'Diturunkan dari integrasi persamaan momentum Euler sepanjang garis arus fluida ideal. Untuk fluida viskos nyata, dinamika dikendalikan oleh Persamaan Navier-Stokes diferensial non-linear: ρ(∂v/∂t + v·∇v) = -∇P + μ∇²v + f.',
      deepDive: 'Turbulensi fluida dan pembentukan pusaran skala mikro masih menjadi salah satu Masalah Milenium Matematika Clay Institute yang belum terpecahkan solusinya secara analitik.'
    },
    keyVariables: [
      { symbol: 'ρ', name: 'Massa Jenis Fluida', unit: 'kg·m⁻³', dimension: '[M][L]⁻³' },
      { symbol: 'v', name: 'Kecepatan Aliran', unit: 'm·s⁻¹', dimension: '[L][T]⁻¹' }
    ],
    commonMisconceptions: ['Gaya angkat sayap pesawat 100% hanya disebabkan oleh efek Bernoulli (defleksi aliran udara ke bawah sesuai Hukum III Newton juga memainkan peran sangat besar).'],
    historicalContext: 'Dipublikasikan oleh Daniel Bernoulli dalam Hydrodynamica (1738).',
    realWorldApplications: ['Tabung Pitot pengukur kecepatan pesawat', 'Alat semprot parfum dan karburator mesin'],
    relatedEntityIds: ['pressure', 'bernoulli-equation']
  },

  // =========================================================================
  // 6. OSCILLATIONS, WAVES & SOUND (Osilasi, Gelombang & Akustik)
  // =========================================================================
  {
    id: 'wavelength',
    name: 'Wavelength',
    indonesianName: 'Panjang Gelombang',
    entityType: 'Quantity',
    domainId: 'waves',
    subdomain: 'Wave Equation',
    symbol: 'λ',
    summary: 'Jarak spasial antara dua titik fase identik yang berurutan pada suatu gelombang periodik (misalnya jarak puncak ke puncak).',
    layers: {
      simple: 'Panjang gelombang adalah jarak antara puncak ombak ke puncak ombak berikutnya.',
      standard: 'Dihubungkan dengan cepat rambat v dan frekuensi f melalui persamaan dasar gelombang: v = f · λ atau λ = v / f. Satuan SI: meter (m).',
      advanced: 'Vektor gelombang k⃗ memiliki magnitudo bilangan gelombang k = 2π / λ. Fungsi gelombang sinusoidal dinyatakan oleh y(x,t) = A sin(kx - ωt + φ).',
      deepDive: 'Dalam mekanika kuantum, panjang gelombang materi de Broglie λ = h/p menentukan batas resolusi difraksi mikroskop elektron sub-angstrom.'
    },
    keyVariables: [{ symbol: 'λ', name: 'Panjang Gelombang', unit: 'm', dimension: '[L]' }],
    commonMisconceptions: ['Gelombang dengan amplitudo lebih tinggi memiliki panjang gelombang lebih besar (amplitudo dan panjang gelombang adalah besaran independen).'],
    historicalContext: 'Diformalkan dalam teori gelombang oleh Christiaan Huygens dan Thomas Young.',
    realWorldApplications: ['Penentuan spektrum warna cahaya tampak', 'Alokasi frekuensi saluran radio 5G'],
    relatedEntityIds: ['frequency', 'waves', 'light', 'sound']
  },
  {
    id: 'frequency',
    name: 'Frequency',
    indonesianName: 'Frekuensi',
    entityType: 'Quantity',
    domainId: 'oscillations',
    subdomain: 'Simple Harmonic Motion',
    symbol: 'f (atau ν)',
    summary: 'Jumlah getaran, putaran, siklus, atau osilasi lengkap per satuan detik.',
    layers: {
      simple: 'Frekuensi adalah seberapa sering sesuatu berulang setiap detiknya. Jika senar gitar bergetar 440 kali dalam satu detik, suaranya menghasilkan nada nada A standar.',
      standard: 'f = 1 / T (T = periode dalam detik). Satuan SI: Hertz (1 Hz = 1 s⁻¹). Frekuensi sudut: ω = 2πf (rad/s).',
      advanced: 'Analisis Fourier memungkinkan dekomposisi sinyal gelombang periodik kompleks sembarang menjadi jumlahan deret frekuensi harmonik sinusoidal diskret.',
      deepDive: 'Berdasarkan relasi kuantum Planck-Einstein, frekuensi radiasi menentukan energi foton secara proporsional: E = h·f.'
    },
    keyVariables: [{ symbol: 'f', name: 'Frekuensi', unit: 'Hertz (Hz = s⁻¹)', dimension: '[T]⁻¹' }],
    commonMisconceptions: ['Suara yang lebih keras memiliki frekuensi lebih tinggi (tinggi nada ditentukan oleh frekuensi, kekerasan ditentukan oleh amplitudo/energi).'],
    historicalContext: 'Heinrich Hertz membuktikan gelombang elektromagnetik dan satuan Hz diadopsi pada 1930.',
    realWorldApplications: ['Prosesor komputer clock 4.5 GHz', 'Penyeteman alat musik nada konser'],
    relatedEntityIds: ['wavelength', 'hertz', 'waves', 'sound']
  },
  {
    id: 'hertz',
    name: 'Hertz (Unit of Frequency)',
    indonesianName: 'Hertz (Satuan Frekuensi SI)',
    entityType: 'Unit',
    domainId: 'oscillations',
    subdomain: 'SI Units & Standards',
    symbol: 'Hz',
    summary: 'Satuan turunan SI untuk frekuensi, setara dengan satu siklus periodik per detik (1 s⁻¹).',
    layers: {
      simple: '1 Hertz berarti satu getaran atau satu putaran dalam satu detik.',
      standard: '1 Hz = 1 s⁻¹. Frekuensi radio FM berkisar 88 – 108 MHz (juta Hz); frekuensi sinyal Wi-Fi berkisar 2.4 GHz dan 5 GHz (miliar Hz).',
      advanced: 'Dalam radioaktivitas nuklir, satuan peluruhan inti per detik dinamai Becquerel (1 Bq = 1 peluruhan/s) yang dimensinya sama dengan Hertz ([T]⁻¹) namun dibedakan maknanya.',
      deepDive: 'Definisi waktu detik internasional SI dikaitkan dengan tepat 9.192.631.770 Hz transisi hiperhalus atom Cesium-133.'
    },
    keyVariables: [{ symbol: 'Hz', name: 'Hertz', unit: 's⁻¹', dimension: '[T]⁻¹' }],
    commonMisconceptions: ['Menyamakan Hz (siklus per detik) dengan radian per detik (ω = 2π f).'],
    historicalContext: 'Diberi nama untuk menghormati Heinrich Rudolf Hertz.',
    realWorldApplications: ['Monitor refresh rate 144 Hz gaming', 'Frekuensi detak jantung EKG medis'],
    relatedEntityIds: ['frequency', 'wavelength']
  },
  {
    id: 'sound',
    name: 'Sound Waves & Acoustics',
    indonesianName: 'Akustik & Gelombang Bunyi',
    entityType: 'Concept',
    domainId: 'sound',
    subdomain: 'Acoustic Resonance',
    symbol: 'v_sound = √(B/ρ)',
    summary: 'Gelombang tekanan longitudinal mekanis yang merambat melalui medium elastis (gas, cairan, atau padatan) yang dapat dideteksi oleh telinga atau sensor akustik.',
    layers: {
      simple: 'Bunyi adalah getaran udara yang merambat ke telinga Anda. Di ruang angkasa yang hampa udara, bunyi tidak dapat merambat sama sekali!',
      standard: 'Cepat rambat bunyi di udara ~343 m/s pada suhu 20°C. Intensitas bunyi diukur dalam skala logaritmik Desibel: TI = 10 log₁₀(I / I₀) dengan I₀ = 10⁻¹² W/m² sebagai ambang dengar manusia.',
      advanced: 'Cepat rambat gelombang bunyi dalam fluida diatur oleh modulus elastisitas Bulk B dan massa jenis: v = √(B/ρ) = √(γ R T / M) untuk gas ideal.',
      deepDive: 'Ketika sumber bunyi melaju melampaui cepat rambat bunyi mediumnya (M > 1), gelombang tekanan berakumulasi membentuk gelombang kejut diskontinu (Sonic Boom).'
    },
    keyVariables: [
      { symbol: 'v_s', name: 'Kecepatan Bunyi', unit: 'm·s⁻¹', dimension: '[L][T]⁻¹' },
      { symbol: 'TI', name: 'Taraf Intensitas', unit: 'Desibel (dB)', dimension: '[1]' }
    ],
    commonMisconceptions: ['Bunyi merambat lebih lambat di benda padat dibanding udara (kebalikannya: di baja bunyi merambat ~5000 m/s, 15 kali lebih cepat daripada di udara!).'],
    historicalContext: 'Isaac Newton menghitung kecepatan bunyi secara teoretis pertama kali dalam Principia.',
    realWorldApplications: ['Pemeriksaan medis USG (Ultrasonografi)', 'Sonar navigasi kapal selam'],
    relatedEntityIds: ['doppler-effect', 'waves', 'frequency']
  },
  {
    id: 'doppler-effect',
    name: 'Doppler Effect',
    indonesianName: 'Efek Doppler',
    entityType: 'Phenomenon',
    domainId: 'sound',
    subdomain: 'Doppler Effect',
    symbol: 'f’ = f ((v ± v_p) / (v ∓ v_s))',
    summary: 'Perubahan frekuensi atau panjang gelombang yang teramati ketika sumber gelombang dan pengamat bergerak relatif satu sama lain.',
    layers: {
      simple: 'Pernahkah Anda mendengar sirine ambulans yang suaranya terdengar melengking tinggi saat mendekati Anda, lalu tiba-tiba berubah bernada rendah saat melesat menjauhi Anda? Itulah Efek Doppler!',
      standard: 'Rumus Doppler akustik klasik: f’ = f ((v ± v_p) / (v ∓ v_s)). Jika saling mendekat, frekuensi yang didengar pengamat naik; jika saling menjauh, frekuensi turun.',
      advanced: 'Untuk gelombang elektromagnetik cahaya, Efek Doppler Relativistik memperhitungkan dilatasi waktu: f’ = f √((1 - β) / (1 + β)) di mana β = v/c.',
      deepDive: 'Edwin Hubble (1929) menemukan bahwa galaksi-galaksi jauh mengalami pergeseran merah (Redshift z = Δλ/λ) spektroskopi yang membuktikan alam semesta sedang berekspansi.'
    },
    keyVariables: [{ symbol: 'f’', name: 'Frekuensi Teramati', unit: 'Hz', dimension: '[T]⁻¹' }],
    commonMisconceptions: ['Sirine ambulans frekuensinya berubah karena pengemudi mengubah tombol sirine.'],
    historicalContext: 'Diusulkan oleh fisikawan Austria Christian Doppler pada tahun 1842.',
    realWorldApplications: ['Radar Doppler polisi pelacak kecepatan mobil', 'Ekokardiografi aliran darah jantung'],
    relatedEntityIds: ['sound', 'frequency', 'light', 'cosmology']
  },

  // =========================================================================
  // 7. THERMAL & THERMODYNAMICS (Fisika Termal & Termodinamika)
  // =========================================================================
  {
    id: 'temperature',
    name: 'Temperature',
    indonesianName: 'Temperatur / Suhu Mutlak',
    entityType: 'Quantity',
    domainId: 'thermal',
    subdomain: 'Temperature Scales',
    symbol: 'T',
    summary: 'Besaran keadaan termodinamika yang menentukan kesetimbangan termal. Hubungan langsung dengan energi kinetik translasi berlaku untuk gas ideal klasik.',
    layers: {
      simple: 'Suhu adalah ukuran seberapa panas atau dingin suatu benda. Suhu tinggi berarti atom-atom di dalam benda bergerak dan bergetar sangat lincah.',
      standard: 'Satuan dasar SI adalah Kelvin (K). Suhu mutlak nol (0 K = -273.15 °C) adalah batas suhu termodinamika biasa; energi titik nol kuantum dapat tetap ada. Hubungan energi gas ideal: ⟨E_k⟩ = 3/2 k_B T.',
      advanced: 'Definisi termodinamika fundamental melalui entropi: 1/T = (∂S/∂U)_(V,N). Suhu mengukur kecenderungan sistem untuk melepaskan energi ke sistem lain.',
      deepDive: 'Dalam sistem kuantum dengan tingkat energi terbatas (seperti spin nuklir dalam medan magnet kuat), populasi dapat terbalik sehingga memunculkan keadaan "Suhu Kelvin Negatif" yang secara termodinamika sebenarnya lebih panas dari suhu tak hingga!'
    },
    keyVariables: [{ symbol: 'T', name: 'Suhu Mutlak', unit: 'Kelvin (K)', dimension: '[Θ]' }],
    commonMisconceptions: ['Menyamakan suhu dengan kalor (suhu adalah ukuran keadaan energi rata-rata partikel; kalor adalah energi yang sedang berpindah).'],
    historicalContext: 'Lord Kelvin mengusulkan skala termodinamika mutlak nol pada tahun 1848.',
    realWorldApplications: ['Termometer inframerah medis', 'Pendingin kriogenik superkonduktor'],
    relatedEntityIds: ['heat', 'entropy', 'boltzmann-constant', 'kelvin']
  },
  {
    id: 'kelvin',
    name: 'Kelvin (Unit of Temperature)',
    indonesianName: 'Kelvin (Satuan Suhu Mutlak SI)',
    entityType: 'Unit',
    domainId: 'thermal',
    subdomain: 'SI Units & Standards',
    symbol: 'K',
    summary: 'Satuan pokok SI untuk temperatur termodinamika, didefinisikan dengan menetapkan nilai tetap konstanta Boltzmann k_B.',
    layers: {
      simple: 'Kelvin adalah skala suhu para ilmuwan yang dimulai dari nol mutlak (-273.15 °C), untuk sistem termal biasa. Keadaan suhu negatif khusus tidak berarti lebih dingin dari 0 K.',
      standard: '1 Kelvin didefinisikan dengan menetapkan nilai numerik tetap konstanta Boltzmann k_B = 1.380649 × 10⁻²³ J·K⁻¹.',
      advanced: 'Perubahan 1 Kelvin sama persis dengan perubahan 1 derajat Celsius (ΔT = 1 K = 1 °C), namun T(K) = T(°C) + 273.15.',
      deepDive: 'Ruang angkasa antargalaksi memiliki suhu latar belakang Cosmic Microwave Background sekitar 2.725 Kelvin.'
    },
    keyVariables: [{ symbol: 'K', name: 'Kelvin', unit: 'K', dimension: '[Θ]' }],
    commonMisconceptions: ['Menulis "derajat Kelvin" atau °K (yang benar adalah Kelvin murni tanpa simbol derajat: 300 K, bukan 300 °K).'],
    historicalContext: 'Diresmikan oleh CGPM ke-13 tahun 1967.',
    realWorldApplications: ['Suhu operasi komputasi kuantum (~15 mK)', 'Astrofisika pengamatan bintang'],
    relatedEntityIds: ['temperature', 'boltzmann-constant']
  },
  {
    id: 'heat',
    name: 'Heat',
    indonesianName: 'Kalor',
    entityType: 'Quantity',
    domainId: 'thermal',
    subdomain: 'Heat Capacity & Phase Change',
    symbol: 'Q',
    summary: 'Bentuk energi termal yang berpindah secara spontan melintasi batas sistem akibat adanya perbedaan temperatur.',
    layers: {
      simple: 'Kalor adalah energi panas yang mengalir dari benda yang lebih hangat ke benda yang lebih dingin sampai keduanya bersuhu sama seimbang.',
      standard: 'Q = m · c · ΔT (untuk perubahan suhu) atau Q = m · L (untuk perubahan wujud fase laten). Satuan SI: Joule. Tiga mekanisme perpindahan kalor: Konduksi, Konveksi, dan Radiasi.',
      advanced: 'Kalor bukan fungsi keadaan, melainkan fungsi proses (inexact differential đQ). Perubahan entropi reversibel adalah dS = đQ_rev / T.',
      deepDive: 'Radiasi termal benda hitam sempurna mematuhi hukum Stefan-Boltzmann j* = σ T⁴ dan hukum pergeseran Wien λ_max · T = 2.898 × 10⁻³ m·K.'
    },
    keyVariables: [{ symbol: 'Q', name: 'Kalor', unit: 'Joule (J)', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Benda "memiliki" kalor di dalamnya (benda memiliki energi dalam internal energy U, kalor hanya eksis saat energi sedang berpindah).'],
    historicalContext: 'Membantah teori fluida kalorik Caloric lama melalui eksperimen gesekan meriam Benjamin Thompson (Count Rumford).',
    realWorldApplications: ['Isolasi dinding rumah hemat energi', 'Penukar panas (heat exchanger) reaktor industri'],
    relatedEntityIds: ['temperature', 'entropy', 'thermodynamic-laws']
  },
  {
    id: 'entropy',
    name: 'Entropy',
    indonesianName: 'Entropi',
    entityType: 'Concept',
    domainId: 'thermodynamics',
    subdomain: 'Entropy & Irreversibility',
    symbol: 'S',
    summary: 'Besaran keadaan termodinamika yang mengukur dispersi termal atau jumlah konfigurasi keadaan mikro mikroskopis.',
    layers: {
      simple: 'Entropi adalah ukuran ketidakteraturan. Kamar yang rapi mudah menjadi berantakan sendiri, tetapi tidak pernah merapikan dirinya sendiri tanpa usaha.',
      standard: 'Hukum Kedua Termodinamika: dalam sistem terisolasi, entropi total tidak pernah berkurang (ΔS_total ≥ 0). Definisi Clausius: dS = dQ_rev / T. Satuan SI: J/K.',
      advanced: 'Formulasi statistik Ludwig Boltzmann: S = k_B · ln(Ω), di mana Ω adalah multiplisitas keadaan mikro kuantum yang dapat diakses oleh keadaan makro.',
      deepDive: 'Entropi menghubungkan fisika dengan teori informasi Claude Shannon dan termodinamika lubang hitam Bekenstein-Hawking (S_BH = k_B c³ A / 4Gℏ).'
    },
    keyVariables: [{ symbol: 'S', name: 'Entropi', unit: 'J·K⁻¹', dimension: '[M][L]²[T]⁻²[Θ]⁻¹' }],
    commonMisconceptions: ['Entropi suatu benda tidak pernah bisa turun (entropi lokal bisa turun asalkan entropi lingkungan naik lebih besar, seperti kulkas membuat es).'],
    historicalContext: 'Dinamai oleh Rudolf Clausius (1865) dan dirumuskan secara statistik oleh Boltzmann (1877).',
    realWorldApplications: ['Batas teoritis efisiensi mesin termal', 'Panah waktu kosmik irreversible'],
    relatedEntityIds: ['thermodynamic-laws', 'temperature', 'boltzmann-constant']
  },
  {
    id: 'carnot-engine',
    name: 'Carnot Heat Engine & Cycle',
    indonesianName: 'Mesin Kalor & Siklus Carnot',
    entityType: 'System',
    domainId: 'thermodynamics',
    subdomain: 'Carnot Cycle & Heat Engines',
    symbol: 'η = 1 - T_C/T_H',
    summary: 'Siklus termodinamika ideal teoritis yang terdiri dari dua proses isotermal reversibel dan dua proses adiabatik reversibel dengan efisiensi maksimum yang mungkin dicapai.',
    layers: {
      simple: 'Model mesin terhebat dan paling sempurna yang pernah dibayangkan oleh para fisikawan. Mesin ini membuktikan bahwa tidak ada mesin di dunia yang bisa 100% mengubah panas menjadi gerak.',
      standard: 'Efisiensi maksimum mesin Carnot hanya bergantung pada suhu kedua reservoir panas (T_H) dan dingin (T_C): η = 1 - (T_C / T_H). Usaha bersih yang dihasilkan adalah luas kurva tertutup pada diagram P-V: W_net = ∮ P dV.',
      advanced: 'Teorema Carnot menyatakan bahwa seluruh mesin kalor reversibel yang beroperasi antara dua suhu yang sama memiliki efisiensi identik, dan tidak ada mesin tak reversibel yang dapat melampauinya.',
      deepDive: 'Siklus Carnot reversibel mematuhi kesetaraan Clausius: ∮ (đQ_rev / T) = Q_H/T_H - Q_C/T_C = 0, yang menjadi fondasi bukti eksistensi fungsi keadaan entropi S.'
    },
    keyVariables: [
      { symbol: 'η', name: 'Efisiensi Termal', unit: 'Persen (%) atau Desimal', dimension: '[1]' },
      { symbol: 'W_net', name: 'Kerja Bersih', unit: 'Joule (J)', dimension: '[M][L]²[T]⁻²' }
    ],
    commonMisconceptions: ['Mesin nyata dapat mencapai efisiensi 100% jika gesekan bantalan dihilangkan (Hukum II Termodinamika melarang efisiensi 100% bahkan tanpa gesekan).'],
    historicalContext: 'Diterbitkan oleh insinyur militer Prancis Nicolas Léonard Sadi Carnot (1824).',
    realWorldApplications: ['Batas efisiensi pembangkit listrik tenaga nuklir dan turbin gas', 'Siklus pendingin refrigerasi'],
    relatedEntityIds: ['thermodynamic-laws', 'entropy', 'temperature']
  },

  // =========================================================================
  // 8. ELECTRICITY & MAGNETISM (Elektrostatika & Kemagnetan)
  // =========================================================================
  {
    id: 'electric-charge',
    name: 'Electric Charge',
    indonesianName: 'Muatan Listrik',
    entityType: 'Quantity',
    domainId: 'electricity',
    subdomain: 'Coulomb’s Law',
    symbol: 'q',
    summary: 'Sifat fisik intrinsik materi yang menyebabkannya mengalami gaya elektrostatik dan elektromagnetik.',
    layers: {
      simple: 'Sifat partikel yang ada dua jenis: positif dan negatif. Muatan sejenis tolak-menolak, muatan berbeda jenis tarik-menarik.',
      standard: 'Diukur dalam satuan Coulomb (C). Muatan listrik bersifat kekal sempurna dan terkuantisasi diskret dalam kelipatan muatan elementer e = 1.602176634 × 10⁻¹⁹ C.',
      advanced: 'Dihubungkan dengan medan listrik melalui Hukum Gauss (Persamaan Maxwell I): ∇ · E⃗ = ρ / ε₀. Mengalir sebagai rapat arus j⃗ = ρ·v⃗.',
      deepDive: 'Kekekalan muatan dijamin oleh simetri tolok global U(1)_EM dari kerapatan Lagrangian elektrodinamika kuantum melalui teorema Noether.'
    },
    keyVariables: [{ symbol: 'q', name: 'Muatan Listrik', unit: 'Coulomb (C)', dimension: '[I][T]' }],
    commonMisconceptions: ['Arus listrik "mengonsumsi" muatan (muatan tidak pernah habis, muatan hanya mengalir sirkulasi).'],
    historicalContext: 'Dikonsepkan oleh Benjamin Franklin dan diukur presisi oleh Robert Millikan (1909).',
    realWorldApplications: ['Baterai kendaraan listrik', 'Layar sentuh kapasitif'],
    relatedEntityIds: ['coulomb', 'electron', 'elementary-charge', 'electric-field']
  },
  {
    id: 'coulomb',
    name: 'Coulomb (Unit of Electric Charge)',
    indonesianName: 'Coulomb (Satuan Muatan Listrik SI)',
    entityType: 'Unit',
    domainId: 'electricity',
    subdomain: 'SI Units & Standards',
    symbol: 'C',
    summary: 'Satuan turunan SI untuk muatan listrik, setara dengan jumlah muatan yang diangkut oleh arus satu Ampere selama satu detik (1 A·s).',
    layers: {
      simple: 'Satu Coulomb adalah paket muatan yang sangat besar, setara dengan muatan dari sekitar 6.24 × 10¹⁸ elektron.',
      standard: '1 C = 1 A·s. Satu mol elektron membawa muatan satu tetapan Faraday F ≈ 96.485 Coulomb.',
      advanced: 'Kapasitansi satu Farad menyimpan muatan satu Coulomb pada beda potensial satu Volt: Q = C · V.',
      deepDive: 'Satu petir kilat petir badai memindahkan sekitar 15 hingga 350 Coulomb muatan antara awan dan tanah dalam sekejap milidetik.'
    },
    keyVariables: [{ symbol: 'C', name: 'Coulomb', unit: 'A·s', dimension: '[I][T]' }],
    commonMisconceptions: ['Satu Coulomb adalah muatan satu elektron (muatan satu elektron sangat kecil: hanya ~1.6 × 10⁻¹⁹ C).'],
    historicalContext: 'Diberi nama untuk menghormati Charles-Augustin de Coulomb.',
    realWorldApplications: ['Kapasitas penyimpanan kapasitor superkapasitor', 'Elektrolisis pemurnian tembaga'],
    relatedEntityIds: ['electric-charge', 'elementary-charge']
  },
  {
    id: 'electric-field',
    name: 'Electric Field',
    indonesianName: 'Medan Listrik',
    entityType: 'Field',
    domainId: 'electricity',
    subdomain: 'Electric Field & Potential',
    symbol: 'E⃗',
    summary: 'Medan vektor fisik yang ditimbulkan oleh muatan listrik atau perubahan medan magnet, memberikan gaya elektrostatik pada muatan lain.',
    layers: {
      simple: 'Aura gaya tak terlihat di sekitar muatan listrik. Garis-garisnya memancar keluar dari muatan positif dan menyerap masuk ke muatan negatif.',
      standard: 'E⃗ = F⃗ / q₀. Satuan SI: N/C atau V/m. Medan muatan titik: E = (1/4πε₀) · (q/r²). Potensial listrik skalar: E⃗ = -∇V.',
      advanced: 'Memenuhi Hukum Gauss: ∮ E⃗ · dA⃗ = Q_enclosed / ε₀. Energi medan elektrostatik per satuan volume adalah u_E = ½ ε₀ E².',
      deepDive: 'Dalam elektrodinamika relativistik, medan listrik dan magnet menyatu menjadi tensor medan elektromagnetik 4D anti-simetris F^μν.'
    },
    keyVariables: [{ symbol: 'E', name: 'Kuat Medan Listrik', unit: 'V·m⁻¹ (atau N·C⁻¹)', dimension: '[M][L][T]⁻³[I]⁻¹' }],
    commonMisconceptions: ['Garis gaya medan listrik adalah jalur yang dilewati partikel bermuatan.'],
    historicalContext: 'Dikonsepkan oleh Michael Faraday (1830-an).',
    realWorldApplications: ['Pengendap debu elektrostatik cerobong industri', 'Tabung akselerator partikel linier'],
    relatedEntityIds: ['electric-charge', 'magnetic-field', 'electromagnetism']
  },
  {
    id: 'magnetic-field',
    name: 'Magnetic Field',
    indonesianName: 'Medan Magnet',
    entityType: 'Field',
    domainId: 'magnetism',
    subdomain: 'Magnetic Fields & Poles',
    symbol: 'B⃗',
    summary: 'Medan vektor yang timbul akibat muatan listrik yang bergerak atau dipol intrinsik kuantum, memberikan gaya defleksi Lorentz.',
    layers: {
      simple: 'Medan tak terlihat di sekitar magnet atau kawat listrik yang membuat jarum kompas berputar menunjuk arah utara.',
      standard: 'Diukur dalam satuan Tesla (T). Gaya pada muatan bergerak: F⃗_m = q (v⃗ × B⃗). Garis-garis gaya magnetik selalu membentuk kurva tertutup tanpa awal dan akhir.',
      advanced: 'Memenuhi Hukum Gauss Magnetisme: ∇ · B⃗ = 0 (tidak ada monopol magnetik murni). Dihasilkan oleh rapat arus melalui Hukum Ampère: ∇ × B⃗ = μ₀J⃗ + μ₀ε₀ ∂E⃗/∂t.',
      deepDive: 'Medan magnet Bumi melindungi biosfer dari radiasi partikel mematikan angin surya dengan membelokkannya ke sabuk radiasi Van Allen.'
    },
    keyVariables: [{ symbol: 'B', name: 'Medan Magnetik (Induksi B)', unit: 'Tesla (T)', dimension: '[M][T]⁻²[I]⁻¹' }],
    commonMisconceptions: ['Ada kutub magnet tunggal utara yang terpisah dari kutub selatan (jika magnet dipotong dua, masing-masing selalu memiliki kutub utara dan selatan baru).'],
    historicalContext: 'Hans Christian Oersted menemukan hubungan arus listrik dan magnet (1820).',
    realWorldApplications: ['Mesin MRI pencitraan medis rumah sakit', 'Kereta Maglev melayang cepat'],
    relatedEntityIds: ['tesla', 'electric-field', 'lorentz-force', 'electromagnetism']
  },
  {
    id: 'tesla',
    name: 'Tesla (Unit of Magnetic Field)',
    indonesianName: 'Tesla (Satuan Medan Magnet SI)',
    entityType: 'Unit',
    domainId: 'magnetism',
    subdomain: 'SI Units & Standards',
    symbol: 'T',
    summary: 'Satuan turunan SI untuk induksi magnetik B, setara dengan satu Weber per meter persegi (1 Wb·m⁻² = 1 N·A⁻¹·m⁻¹).',
    layers: {
      simple: 'Satu Tesla adalah medan magnet yang luar biasa kuat! Magnet kulkas biasa hanya berkekuatan sekitar 0.005 Tesla, sedangkan medan magnet Bumi hanya 0.00005 Tesla.',
      standard: '1 T = 1 N / (A·m) = 1 kg·s⁻²·A⁻¹. Satuan CGS setara: 1 Tesla = 10.000 Gauss.',
      advanced: 'Didefinisikan melalui gaya Lorentz: muatan 1 Coulomb yang meluncur 1 m/s tegak lurus medan 1 Tesla mengalami gaya tepat 1 Newton.',
      deepDive: 'Magnet bintang neutron jenis Magnetar memiliki medan magnet terkuat di alam semesta, mencapai 10⁸ hingga 10¹¹ Tesla.'
    },
    keyVariables: [{ symbol: 'T', name: 'Tesla', unit: 'kg·s⁻²·A⁻¹', dimension: '[M][T]⁻²[I]⁻¹' }],
    commonMisconceptions: ['Menyamakan Tesla dengan Gauss tanpa konversi faktor 10⁴.'],
    historicalContext: 'Diberi nama untuk menghormati Nikola Tesla oleh CGPM tahun 1960.',
    realWorldApplications: ['Spesifikasi magnet mesin MRI 1.5 T dan 3.0 T', 'Magnet pemandu berkas partikel di LHC CERN (8.3 T)'],
    relatedEntityIds: ['magnetic-field', 'newton']
  },

  // =========================================================================
  // 9. ELECTROMAGNETISM & OPTICS (Persamaan Maxwell & Optika)
  // =========================================================================
  {
    id: 'electromagnetism',
    name: 'Classical Electrodynamics & Maxwell Equations',
    indonesianName: 'Elektrodinamika Maxwell',
    entityType: 'Theory',
    domainId: 'electromagnetism',
    subdomain: 'Maxwell’s Four Equations',
    symbol: '∇×E = -∂B/∂t, ∇×B = μ₀J + μ₀ε₀∂E/∂t',
    summary: 'Penyatuan agung fenomena kelistrikan, kemagnetan, dan optika melalui empat persamaan diferensial medan fundamental James Clerk Maxwell.',
    layers: {
      simple: 'Teori yang membuktikan bahwa listrik dan magnet adalah dua sisi dari koin yang sama: perubahan medan listrik melahirkan magnet, dan perubahan medan magnet melahirkan listrik, merambat melintasi ruang sebagai cahaya!',
      standard: 'Empat Persamaan Maxwell: 1) Hukum Gauss Listrik (∇·E = ρ/ε₀); 2) Hukum Gauss Magnetik (∇·B = 0); 3) Hukum Induksi Faraday (∇×E = -∂B/∂t); 4) Hukum Ampère-Maxwell (∇×B = μ₀J + μ₀ε₀∂E/∂t).',
      advanced: 'Meramalkan eksistensi gelombang elektromagnetik dalam ruang hampa dengan kecepatan invarian c = 1 / √(ε₀μ₀). Energi dibawa oleh vektor Poynting S⃗ = (1/μ₀)(E⃗ × B⃗).',
      deepDive: 'Merupakan teori fisik pertama yang secara alami kovarian terhadap simetri transformasi Lorentz Relativitas Khusus bahkan sebelum Einstein merumuskannya.'
    },
    keyVariables: [
      { symbol: 'c', name: 'Kecepatan Gelombang EM', unit: 'm·s⁻¹', dimension: '[L][T]⁻¹' },
      { symbol: 'S⃗', name: 'Vektor Poynting', unit: 'W·m⁻²', dimension: '[M][T]⁻³' }
    ],
    commonMisconceptions: ['Cahaya membutuhkan medium material (eter) untuk merambat.'],
    historicalContext: 'Diterbitkan dalam A Dynamical Theory of the Electromagnetic Field oleh Maxwell (1865).',
    realWorldApplications: ['Sistem komunikasi nirkabel ponsel & Wi-Fi', 'Radar pertahanan udara dan satelit radar cuaca'],
    relatedEntityIds: ['electric-field', 'magnetic-field', 'light', 'photon']
  },
  {
    id: 'light',
    name: 'Light & Optics',
    indonesianName: 'Cahaya & Optika Fisis',
    entityType: 'Concept',
    domainId: 'optics',
    subdomain: 'Physical Optics',
    symbol: 'c = f·λ',
    summary: 'Radiasi elektromagnetik dalam spektrum tampak yang menunjukkan dualitas gelombang-partikel, pembiasan, pemantulan, interferensi, dan polarisasi.',
    layers: {
      simple: 'Cahaya adalah gelombang energi yang memungkinkan kita melihat keindahan alam semesta. Cahaya bergerak super cepat: 300.000 kilometer hanya dalam satu detik!',
      standard: 'Cepat rambat cahaya dalam medium berindeks bias n adalah v = c / n. Hukum Snellius pembiasan: n₁ sin(θ₁) = n₂ sin(θ₂). Memiliki sifat interferensi gelombang konstruktif dan destruktif.',
      advanced: 'Cahaya terpolarisasi transversal. Difraksi Fraunhofer melalui celah sempit diatur oleh transformasi spasial Fourier dari fungsi apertur celah.',
      deepDive: 'Dalam Elektrodinamika Kuantum (QED), cahaya adalah partikel foton boson tolok tanpa massa diam yang memediasi gaya elektromagnetik.'
    },
    keyVariables: [{ symbol: 'n', name: 'Indeks Bias', unit: 'Adimensional', dimension: '[1]' }],
    commonMisconceptions: ['Cahaya melambat secara permanen di kaca (begitu keluar kembali ke udara, cahaya langsung kembali melaju pada kelajuan penuhnya c).'],
    historicalContext: 'Thomas Young membuktikan sifat gelombang cahaya melalui eksperimen celah ganda (1801).',
    realWorldApplications: ['Serat optik internet bawah laut', 'Mikroskop confocal laser', 'Kacamata polarisasi anti-silau'],
    relatedEntityIds: ['photon', 'electromagnetism', 'speed-of-light']
  },

  // =========================================================================
  // 10. RELATIVITY (Relativitas Khusus & Relativitas Umum)
  // =========================================================================
  {
    id: 'spacetime',
    name: 'Spacetime',
    indonesianName: 'Ruang-Waktu 4-Dimensi',
    entityType: 'Concept',
    domainId: 'special-relativity',
    subdomain: 'Curved Spacetime Metric',
    symbol: 'M⁴ (g_μν)',
    summary: 'Kontinuum matematis empat dimensi yang memadukan 3 dimensi ruang spasial dan 1 dimensi waktu menjadi kesatuan geometri yang dinamis.',
    layers: {
      simple: 'Ruang dan waktu bukanlah dua hal yang terpisah. Keduanya teranyam seperti lembaran kain kosmik. Gerakan yang sangat cepat dapat meregangkan waktu dan memendekkan panjang ruang!',
      standard: 'Interval invarian Minkowski ruang-waktu datar: ds² = -c²dt² + dx² + dy² + dz² memiliki nilai identik bagi semua pengamat inersial.',
      advanced: 'Dalam Relativitas Umum, ruang-waktu adalah manifold pseudo-Riemannian bermetrik g_μν yang kelengkungannya diatur oleh tensor Riemann R^ρ_σμν.',
      deepDive: 'Kelengkungan ruang-waktu ekstrem di dalam horizon lubang hitam menghasilkan singularitas gravitasi di mana hukum fisika klasik runtuh.'
    },
    keyVariables: [{ symbol: 'ds²', name: 'Interval Invarian', unit: 'm²', dimension: '[L]²' }],
    commonMisconceptions: ['Waktu berdetak sama di seluruh alam semesta (waktu relatif terhadap kecepatan dan medan gravitasi lokal pengamat).'],
    historicalContext: 'Dikonseptualisasikan oleh Hermann Minkowski (1908).',
    realWorldApplications: ['Koreksi waktu relativistik jam atom satelit GPS (~38 mikrodetik per hari)'],
    relatedEntityIds: ['general-relativity-theory', 'gravity', 'black-hole']
  },
  {
    id: 'general-relativity-theory',
    name: 'General Relativity',
    indonesianName: 'Teori Relativitas Umum',
    entityType: 'Theory',
    domainId: 'general-relativity',
    subdomain: 'Curved Spacetime Metric',
    symbol: 'G_μν = (8πG/c⁴) T_μν',
    summary: 'Teori gravitasi geometris Albert Einstein yang menggantikan gaya tarik Newton dengan kelengkungan ruang-waktu 4D oleh materi-energi.',
    layers: {
      simple: 'Materi memberitahu ruang-waktu bagaimana melengkung, dan ruang-waktu memberitahu materi bagaimana bergerak.',
      standard: 'Prinsip kesetaraan menyamakan efek gravitasi dan percepatan secara lokal; gaya pasang surut mengungkap kelengkungan pada daerah lebih luas. Memprediksi pelensaan gravitasi, dilatasi waktu gravitasi, dan gelombang gravitasi.',
      advanced: 'Persamaan medan Einstein non-linear tensor: R_μν - ½ R g_μν + Λ g_μν = (8πG/c⁴) T_μν. Benda bebas bergerak sepanjang kurva geodetik.',
      deepDive: 'Diuji dan diverifikasi presisi oleh deteksi GW150914 oleh dua detektor LIGO pada 2015; hasilnya diumumkan pada 2016.'
    },
    keyVariables: [{ symbol: 'G_μν', name: 'Tensor Einstein', unit: 'm⁻²', dimension: '[L]⁻²' }],
    commonMisconceptions: ['Gravitasi adalah gaya tarik jarak jauh mistis tanpa perantara.'],
    historicalContext: 'Diterbitkan oleh Albert Einstein (November 1915).',
    realWorldApplications: ['Sistem navigasi GPS', 'Astrofisika pelensaan gravitasi kosmik'],
    relatedEntityIds: ['spacetime', 'black-hole', 'gravitational-waves']
  },
  {
    id: 'black-hole',
    name: 'Black Hole',
    indonesianName: 'Lubang Hitam',
    entityType: 'Phenomenon',
    domainId: 'astrophysics',
    subdomain: 'Black Holes & Singularities',
    symbol: 'R_s = 2GM/c²',
    summary: 'Konsentrasi massa ekstrem di mana gravitasi begitu kuat melengkungkan ruang-waktu sehingga bahkan cahaya tidak dapat lolos dari horizon peristiwanya.',
    layers: {
      simple: 'Sebuah jurang gravitasi raksasa di ruang angkasa yang begitu kuat sehingga benda tercepat di alam semesta—cahaya sekalipun—tidak bisa melarikan diri jika melewatinya.',
      standard: 'Batas luarnya adalah Horizon Peristiwa dengan Radius Schwarzschild R_s = 2GM/c². Untuk massa matahari, radiusnya sekitar 3 km; untuk massa bumi, hanya 9 milimeter.',
      advanced: 'Teorema Tanpa Rambut (No-Hair Theorem) membuktikan lubang hitam stasioner hanya memiliki 3 sifat: massa M, spin angular momentum J, dan muatan Q (Metrik Kerr-Newman).',
      deepDive: 'Paradoks Informasi Hawking: radiasi kuantum Hawking termal menguapkan lubang hitam, memicu perdebatan apakah informasi kuantum materi musnah atau terkode di horizon.'
    },
    keyVariables: [{ symbol: 'R_s', name: 'Radius Schwarzschild', unit: 'm', dimension: '[L]' }],
    commonMisconceptions: ['Lubang hitam adalah penyedot debu kosmik yang menyedot planet dari jarak miliaran kilometer (di luar radius orbit, gravitasi lubang hitam sama seperti bintang biasa).'],
    historicalContext: 'Diprediksi teoretis Karl Schwarzschild (1916); dicitrakan pertama kali oleh Event Horizon Telescope (EHT) tahun 2019 pada M87*.',
    realWorldApplications: ['Pusat galaksi Bima Sakti Sagittarius A*', 'Detektor gelombang gravitasi interferometri'],
    relatedEntityIds: ['general-relativity-theory', 'spacetime', 'gravity']
  },
  {
    id: 'gravitational-waves',
    name: 'Gravitational Waves',
    indonesianName: 'Gelombang Gravitasi',
    entityType: 'Phenomenon',
    domainId: 'general-relativity',
    subdomain: 'Gravitational Waves',
    symbol: 'h_μν',
    summary: 'Riak gelombang kelengkungan ruang-waktu transversal yang merambat pada kecepatan cahaya, dihasilkan oleh massa terakselerasi kuadrupol asimetris.',
    layers: {
      simple: 'Getaran pada kain ruang-waktu itu sendiri yang tercipta saat dua lubang hitam raksasa bertabrakan di kedalaman kosmos.',
      standard: 'Merambat pada kelajuan c. Gelombang ini meregangkan dan memampatkan ruang dalam dua mode polarisasi ortogonal: mode plus (+) dan mode silang (×).',
      advanced: 'Dalam pendekatan medan gravitasi lemah linier: □ h̄_μν = -(16πG/c⁴) T_μν. Daya radiasi kuadrupol: P = (G/5c⁵) ⟨(d³Q_ij/dt³)²⟩.',
      deepDive: 'Membuka era baru "Astronomi Multi-Messenger" yang memungkinkan manusia mendengarkan suara kosmos tanpa bergantung pada gelombang elektromagnetik.'
    },
    keyVariables: [{ symbol: 'h', name: 'Strain Gravitasi', unit: 'Adimensional (ΔL/L ~ 10⁻²¹)', dimension: '[1]' }],
    commonMisconceptions: ['Gelombang gravitasi adalah gelombang gravitasi di permukaan laut (keliru: gelombang gravitasi laut adalah gelombang mekanik fluida, sedangkan ini adalah riak ruang-waktu!).'],
    historicalContext: 'Diprediksi Einstein (1916), dideteksi pertama kali oleh LIGO pada 14 September 2015 (GW150914).',
    realWorldApplications: ['Detektor interferometri laser LIGO dan Virgo', 'Observatorium antariksa masa depan LISA'],
    relatedEntityIds: ['general-relativity-theory', 'black-hole', 'speed-of-light']
  },

  // =========================================================================
  // 11. QUANTUM, ATOMIC & NUCLEAR PHYSICS
  // =========================================================================
  {
    id: 'quantum',
    name: 'Quantum Mechanics',
    indonesianName: 'Mekanika Kuantum',
    entityType: 'Theory',
    domainId: 'quantum',
    subdomain: 'Wave-Particle Duality',
    symbol: 'iℏ ∂Ψ/∂t = ĤΨ',
    summary: 'Teori fisika fundamental yang mengatur perilaku materi dan energi pada skala atomik dan subatomik dengan sifat diskret dan probabilitas.',
    layers: {
      simple: 'Di dunia kuantum yang sangat kecil, aturan biasa tidak berlaku. Partikel dapat berada di beberapa tempat sekaligus sampai diamati, dan energinya bertingkat seperti anak tangga.',
      standard: 'Keadaan fisik digambarkan oleh fungsi gelombang bernilai kompleks Ψ(r⃗, t) di ruang Hilbert. Interpretasi Born: P(r⃗) = |Ψ|² menyatakan kerapatan probabilitas menemukan partikel.',
      advanced: 'Observabel fisik diwakili oleh operator Hermitian linier. Variabel tak-komutatif menghasilkan ketidakpastian Heisenberg: [x̂, p̂] = iℏ.',
      deepDive: 'Korelasi entanglement dapat melanggar ketidaksamaan Bell, menyingkirkan kelas model variabel tersembunyi lokal dengan asumsi pengujian tersebut. Korelasi ini tidak memungkinkan pengiriman pesan lebih cepat dari cahaya.'
    },
    keyVariables: [{ symbol: 'Ψ', name: 'Fungsi Gelombang', unit: 'm⁻³/²', dimension: '[L]⁻³/²' }],
    commonMisconceptions: ['Mekanika kuantum hanya teori abstrak tanpa bukti (seluruh chip prosesor komputer dan sinar laser bergantung pada mekanika kuantum).'],
    historicalContext: 'Dirumuskan oleh Planck, Einstein, Bohr, de Broglie, Heisenberg, Schrödinger, Born, dan Dirac (1900-1927).',
    realWorldApplications: ['Transistor silikon dan mikroprosesor', 'Komputer kuantum qubit superkonduktor'],
    relatedEntityIds: ['wave-particle-duality', 'heisenberg-uncertainty-principle', 'electron', 'photon']
  },
  {
    id: 'wave-particle-duality',
    name: 'Wave-Particle Duality',
    indonesianName: 'Dualisme Gelombang-Partikel',
    entityType: 'Principle',
    domainId: 'quantum',
    subdomain: 'Wave-Particle Duality',
    symbol: 'λ = h/p',
    summary: 'Prinsip bahwa setiap entitas kuantum menunjukkan sifat gelombang kontinu dan partikel diskret tergantung konfigurasi eksperimen pengamatannya.',
    layers: {
      simple: 'Cahaya dan elektron bisa berperilaku seperti bola kelereng padat (bisa menabrak) sekaligus seperti gelombang air (bisa berinterferensi).',
      standard: 'Louis de Broglie mempostulatkan bahwa partikel bermassa memiliki panjang gelombang materi: λ = h / p = h / (mv). Dibuktikan oleh difraksi elektron Davisson-Germer (1927).',
      advanced: 'Prinsip Komplementaritas Niels Bohr menyatakan aspek gelombang dan partikel saling melengkapi dan tidak dapat diamati simultan dalam satu instrumen pengukuran tunggal.',
      deepDive: 'Dalam eksperimen pilihan tertunda, konfigurasi pengukuran menentukan statistik yang teramati. Ini tidak membuktikan bahwa keputusan masa depan mengubah peristiwa masa lalu.'
    },
    keyVariables: [{ symbol: 'λ', name: 'Panjang Gelombang de Broglie', unit: 'm', dimension: '[L]' }],
    commonMisconceptions: ['Elektron adalah bola keras yang bergerak naik turun berombak.'],
    historicalContext: 'Diusulkan Louis de Broglie (1924, Hadiah Nobel 1929).',
    realWorldApplications: ['Mikroskop elektron transmisi (TEM) resolusi atom', 'Litografi sinar elektron semikonduktor'],
    relatedEntityIds: ['quantum', 'electron', 'photon', 'planck-constant']
  },
  {
    id: 'heisenberg-uncertainty-principle',
    name: 'Heisenberg Uncertainty Principle',
    indonesianName: 'Prinsip Ketidakpastian Heisenberg',
    entityType: 'Principle',
    domainId: 'quantum',
    subdomain: 'Uncertainty Principle',
    symbol: 'Δx · Δp ≥ ℏ/2',
    summary: 'Batas fundamental alam bahwa posisi dan momentum partikel tidak dapat diketahui secara simultan dengan ketelitian tak berhingga.',
    layers: {
      simple: 'Semakin pasti Anda mengetahui di mana posisi sebuah partikel berada, semakin tidak pasti Anda mengetahui seberapa cepat partikel itu bergerak.',
      standard: 'σ_x · σ_p ≥ ℏ/2 membatasi simpangan baku posisi dan momentum pada keadaan yang sama. Hubungan energi-waktu memerlukan definisi rentang waktu tertentu dan bukan pasangan operator kanonik yang identik.',
      advanced: 'Merupakan sifat matematis intrinsik pasangan variabel kanonik terkonjugasi dari ketidaksamaan Robertson-Schrödinger operator kuantum: σ_A σ_B ≥ ½ |⟨[Â, B̂]⟩|.',
      deepDive: 'Ketidakpastian bukan izin untuk melanggar kekekalan energi sementara. Partikel virtual adalah unsur perhitungan teori medan; radiasi Hawking membutuhkan teori medan pada ruang-waktu lengkung.'
    },
    keyVariables: [
      { symbol: 'Δx', name: 'Ketidakpastian Posisi', unit: 'm', dimension: '[L]' },
      { symbol: 'Δp', name: 'Ketidakpastian Momentum', unit: 'kg·m·s⁻¹', dimension: '[M][L][T]⁻¹' }
    ],
    commonMisconceptions: ['Ketidakpastian terjadi karena alat ukur laboratorium kurang canggih (ini adalah batas fundamental alam semesta itu sendiri).'],
    historicalContext: 'Dirumuskan oleh Werner Heisenberg (1927).',
    realWorldApplications: ['Mikroskop penerobosan kuantum (STM)', 'Batas kebisingan kuantum detektor LIGO'],
    relatedEntityIds: ['quantum', 'planck-constant']
  },
  {
    id: 'electron',
    name: 'Electron',
    indonesianName: 'Elektron',
    entityType: 'Particle',
    domainId: 'particle-physics',
    subdomain: 'Quarks & Leptons',
    symbol: 'e⁻',
    summary: 'Partikel elementer lepton bermuatan negatif (-e), spin ½, dan massa diam sekitar 9.109 × 10⁻³¹ kg yang mengelilingi inti atom.',
    layers: {
      simple: 'Partikel super mungil pembawa listrik negatif yang mengitari inti atom. Aliran miliaran elektron inilah yang menyalakan lampu rumah Anda sebagai arus listrik.',
      standard: 'Massa diam m_e ≈ 0.511 MeV/c², muatan q = -1.602 × 10⁻¹⁹ C. Berada pada orbital atom terkuantisasi sesuai mekanika kuantum.',
      advanced: 'Merupakan fermion Dirac spin ½ yang mematuhi statistik Fermi-Dirac dan Persamaan Gelombang Relativistik Dirac (iγ^μ ∂_μ - m)ψ = 0.',
      deepDive: 'Merupakan partikel titik sejati tanpa struktur internal terdeteksi (radius spasial < 10⁻¹⁸ meter pada skala akselerator LHC).'
    },
    keyVariables: [{ symbol: 'm_e', name: 'Massa Elektron', unit: 'kg', dimension: '[M]' }],
    commonMisconceptions: ['Elektron mengorbit inti seperti bumi mengelilingi matahari (elektron berada dalam awan probabilitas 3D orbital).'],
    historicalContext: 'Ditemukan oleh J.J. Thomson (1897) melalui tabung sinar katoda.',
    realWorldApplications: ['Rangkaian mikroelektronika modern', 'Tabung mikroskop elektron'],
    relatedEntityIds: ['elementary-charge', 'quantum', 'coulombs-law']
  },
  {
    id: 'photon',
    name: 'Photon',
    indonesianName: 'Foton',
    entityType: 'Particle',
    domainId: 'particle-physics',
    subdomain: 'Gauge Bosons & Forces',
    symbol: 'γ',
    summary: 'Kuantum radiasi elektromagnetik dan boson tolok pembawa gaya elektromagnetik, bermassa diam nol, bergerak pada kelajuan c, dan memiliki spin 1.',
    layers: {
      simple: 'Paket partikel cahaya terkecil. Berkas cahaya matahari, lampu LED, dan gelombang Wi-Fi tersusun dari butiran-butiran foton yang melesat secepat 300.000 km/s.',
      standard: 'Massa diam nol (m₀ = 0), energi E = h·f, momentum p = h / λ. Merambat pada kelajuan c di ruang hampa.',
      advanced: 'Merupakan boson tolok U(1)_EM dalam Model Standar. Mematuhi statistik Bose-Einstein dan memiliki 2 keadaan polarisasi helisitas ortogonal (±1).',
      deepDive: 'Lintasan cahaya memiliki interval ruang-waktu nol. Foton tidak memiliki kerangka diam yang sah; kita tidak dapat mendefinisikan jam atau sudut pandang pengamat yang bergerak bersama foton.'
    },
    keyVariables: [{ symbol: 'E', name: 'Energi Foton', unit: 'Joule (atau eV)', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['Cahaya tidak punya massa berarti cahaya tidak bisa mendorong apa pun (foton membawa momentum p = E/c dan menghasilkan tekanan radiasi).'],
    historicalContext: 'Diusulkan Albert Einstein (1905) untuk efek fotolistrik.',
    realWorldApplications: ['Komunikasi internet serat optik', 'Sinar laser bedah presisi', 'Panel surya fotovoltaik'],
    relatedEntityIds: ['light', 'speed-of-light', 'quantum', 'electromagnetism']
  },
  {
    id: 'higgs-boson',
    name: 'Higgs Boson',
    indonesianName: 'Boson Higgs',
    entityType: 'Particle',
    domainId: 'particle-physics',
    subdomain: 'Higgs Mechanism',
    symbol: 'H⁰',
    summary: 'Partikel boson skalar elementer (spin 0) tanpa muatan listrik yang merupakan eksitasi kuantum dari Medan Higgs pemberi massa materi.',
    layers: {
      simple: 'Partikel yang membuktikan adanya medan tak terlihat di seluruh alam semesta yang memberikan massa inersia pada partikel dasar seperti elektron dan quark.',
      standard: 'Massa diam m_H ≈ 125.1 GeV/c². Menuntaskan kepingan teka-teki terakhir Model Standar Fisika Partikel.',
      advanced: 'Lahir dari pemecahan simetri spontan elektrolemah SU(2)_L × U(1)_Y → U(1)_EM melalui potensial topi Meksiko V(Φ) = μ²Φ†Φ + λ(Φ†Φ)² dengan VEV v ≈ 246 GeV.',
      deepDive: 'Massa fermion dihasilkan oleh kopling interaksi Yukawa dengan medan Higgs.'
    },
    keyVariables: [{ symbol: 'm_H', name: 'Massa Boson Higgs', unit: '125.1 GeV/c²', dimension: '[M]' }],
    commonMisconceptions: ['Medan Higgs memberikan seluruh massa tubuh kita (~99% massa tubuh berasal dari energi ikat gluon gaya kuat di dalam proton/neutron!).'],
    historicalContext: 'Diprediksi teoretis (1964) dan ditemukan di Large Hadron Collider CERN pada 4 Juli 2012.',
    realWorldApplications: ['Fisika akselerator energi tinggi', 'Pemahaman stabilitas vakum kosmik'],
    relatedEntityIds: ['particle-physics', 'mass', 'standard-model']
  },
  {
    id: 'standard-model',
    name: 'Standard Model of Particle Physics',
    indonesianName: 'Model Standar Fisika Partikel',
    entityType: 'Theory',
    domainId: 'particle-physics',
    subdomain: 'Standard Model',
    symbol: 'SU(3)_C × SU(2)_L × U(1)_Y',
    summary: 'Teori medan kuantum komprehensif yang berhasil mengklasifikasikan seluruh partikel elementer dan menjelaskan 3 dari 4 gaya dasar alam semesta.',
    layers: {
      simple: 'Tabel periodik untuk partikel paling dasar penyusun seluruh alam semesta: 6 quark pembentuk inti, 6 lepton (seperti elektron), dan partikel pembawa gaya.',
      standard: 'Menggabungkan Kromodinamika Kuantum (QCD) untuk gaya kuat dan Teori Elektrolemah Glashow-Weinberg-Salam untuk gaya elektromagnetik dan lemah.',
      advanced: 'Teori medan tolok simetri lokal SU(3)_C × SU(2)_L × U(1)_Y dengan 6 jenis quark, 6 lepton, foton, gluon, W, Z, dan Higgs (penghitungan jenis konvensional). Quark dan gluon mengalami pengurungan, bukan partikel bebas terisolasi.',
      deepDive: 'Belum menyertakan gravitasi (Relativitas Umum) dan belum menjelaskan eksistensi materi gelap atau osilasi massa neutrino.'
    },
    keyVariables: [{ symbol: 'N_particles', name: 'Jumlah Partikel Fundamental', unit: '17 Partikel Dasar', dimension: '[1]' }],
    commonMisconceptions: ['Model Standar adalah teori segalanya (Theory of Everything) yang sudah lengkap (gravitasi belum berhasil disatukan ke dalamnya).'],
    historicalContext: 'Dimatangkan pada dekade 1970-an oleh Weinberg, Salam, Glashow, Gell-Mann, dkk.',
    realWorldApplications: ['Penelitian akselerator partikel LHC CERN'],
    relatedEntityIds: ['electron', 'photon', 'higgs-boson']
  },
  {
    id: 'tokamak',
    name: 'Tokamak Fusion Reactor',
    indonesianName: 'Reaktor Fusi Tokamak',
    entityType: 'System',
    domainId: 'plasma',
    subdomain: 'Magnetic Confinement & Fusion',
    symbol: 'D + T ➔ He + n + 17.6 MeV',
    summary: 'Perangkat kurungan magnetik berbentuk torus donat untuk mengurung plasma fusi bersuhu 150 juta derajat Celsius menggunakan medan magnet helikal.',
    layers: {
      simple: 'Sebuah "Matahari Buatan" di Bumi. Wadah berbentuk donat raksasa yang menggunakan magnet superkuat untuk menahan gas panas plasma tanpa menyentuh dinding reaktor.',
      standard: 'Menggabungkan medan magnet toroidal dan medan magnet poloidal yang dibangkitkan oleh arus plasma untuk mencapai Kriteria Lawson fusi termonuklir: n·T·τ_E ≥ 3 × 10²¹ keV·s/m³.',
      advanced: 'Mengatasi instabilitas magnetohidrodinamika (MHD) seperti ketidakstabilan kink dan tearing mode menggunakan dinding diverter dan koil koreksi superkonduktor.',
      deepDive: 'Proyek ITER di Prancis merupakan tokamak terbesar di dunia yang dirancang menghasilkan daya fusi 500 MW dari input 50 MW (faktor Q = 10).'
    },
    keyVariables: [
      { symbol: 'T_plasma', name: 'Suhu Inti Plasma', unit: '150 Juta K (~15 keV)', dimension: '[Θ]' },
      { symbol: 'Q', name: 'Faktor Penguatan Fusi', unit: 'Rasio Daya (P_out / P_in)', dimension: '[1]' }
    ],
    commonMisconceptions: ['Reaktor fusi dapat meledak seperti bom nuklir (fusi padam seketika jika terjadi gangguan kebocoran magnetik; inheren aman).'],
    historicalContext: 'Ditemukan oleh fisikawan Soviet Igor Tamm dan Andrei Sakharov pada 1950-an.',
    realWorldApplications: ['Pembangkit energi fusi masa depan bebas karbon ITER & SPARC'],
    relatedEntityIds: ['plasma', 'superconductivity', 'magnetic-field']
  },
  {
    id: 'lhc-instrument',
    name: 'Large Hadron Collider (LHC)',
    indonesianName: 'Akselerator Partikel Raksasa LHC',
    entityType: 'Instrument',
    domainId: 'particle-physics',
    subdomain: 'Particle Accelerators & Colliders',
    symbol: '√s = 13.6 TeV',
    summary: 'Akselerator partikel berenergi tertinggi dan mesin ilmiah terbesar di dunia, berupa terowongan melingkar 27 kilometer di bawah perbatasan Swiss-Prancis.',
    layers: {
      simple: 'Mikroskop raksasa terkuat di dunia. Menembakkan berkas proton hingga 99.999999% kecepatan cahaya lalu menabrakkannya untuk menciptakan kembali kondisi 1 detik setelah Big Bang!',
      standard: 'Menggunakan 1.232 magnet dwikutub superkonduktor bersuhu 1.9 Kelvin (-271.3 °C) dengan medan 8.3 Tesla untuk membelokkan berkas proton pada energi tumbukan 13.6 TeV.',
      advanced: 'Memiliki detektor raksasa (ATLAS, CMS, ALICE, LHCb) yang merekam miliaran tumbukan per detik menggunakan kisi sensor silikon dan kalorimeter kristal.',
      deepDive: 'Menemukan Boson Higgs pada 2012 dan saat ini meneliti anomali peluruhan quark b dan pencarian partikel materi gelap supersimetri.'
    },
    keyVariables: [{ symbol: '√s', name: 'Energi Pusat Massa', unit: 'TeV (Tera-elektronvolt)', dimension: '[M][L]²[T]⁻²' }],
    commonMisconceptions: ['LHC bisa menciptakan lubang hitam berbahaya yang menelan Bumi (hamburan sinar kosmik alami di atmosfer memiliki energi jauh lebih tinggi daripada LHC tanpa pernah menghancurkan bumi).'],
    historicalContext: 'Mulai beroperasi di CERN Jenewa pada 10 September 2008.',
    realWorldApplications: ['Pengembangan hadron therapy untuk terapi kanker presisi', 'Kelahiran teknologi World Wide Web (WWW) di CERN'],
    relatedEntityIds: ['particle-physics', 'higgs-boson', 'standard-model']
  },

  // =========================================================================
  // 12. ASTROPHYSICS & COSMOLOGY (Astrofisika & Kosmologi Berlabel Ilmiah)
  // =========================================================================
  {
    id: 'big-bang',
    name: 'Big Bang Model',
    indonesianName: 'Model Kosmologi Dentuman Besar',
    entityType: 'Theory',
    domainId: 'cosmology',
    subdomain: 'Big Bang & CMB',
    symbol: 't₀ ≈ 13.8 Miliar Tahun',
    scientificStatus: 'ESTABLISHED SCIENCE',
    summary: 'Model kosmologis standar yang menjelaskan asal-usul alam semesta dari keadaan awal yang luar biasa panas dan padat sekitar 13.8 miliar tahun lalu yang kemudian mengembang dan mendingin.',
    layers: {
      simple: 'Alam semesta tidak abadi statis. Model Big Bang menelusuri alam semesta dari fase awal yang panas dan padat menuju ekspansi dan pendinginan. Model ini tidak membuktikan asal mutlak ruang dan waktu atau suatu ledakan di dalam ruang kosong.',
      standard: 'Didukung oleh 3 pilar bukti empiris terkuat: 1) Hukum pergeseran merah ekspansi Hubble; 2) Fosil radiasi Cosmic Microwave Background (CMB) bersuhu 2.725 K; 3) Kelimpahan primordial unsur hidrogen dan helium (BBN).',
      advanced: 'Diatur oleh persamaan Friedmann yang diturunkan dari metrik FLRW Relativitas Umum: (ȧ/a)² = (8πG/3)ρ - k c²/a² + Λc²/3.',
      deepDive: 'Fase inflasi kosmik eksponensial (t ~ 10⁻³⁶ s) dihipotesiskan untuk menjelaskan mengapa alam semesta tampak sangat datar (flatness problem) dan seragam secara termal (horizon problem).'
    },
    keyVariables: [{ symbol: 't₀', name: 'Usia Alam Semesta', unit: '13.787 ± 0.020 Miliar Tahun', dimension: '[T]' }],
    commonMisconceptions: ['Big Bang adalah ledakan bom di dalam ruang kosong (Big Bang adalah ekspansi ruang itu sendiri, bukan ledakan materi ke dalam wadah ruang yang sudah ada).'],
    historicalContext: 'Diusulkan Georges Lemaître (1927) dan dikonfirmasi penemuan CMB oleh Penzias & Wilson (1965).',
    realWorldApplications: ['Pemahaman asal mula nukleosintesis atom pembentuk tubuh manusia'],
    relatedEntityIds: ['cosmology', 'general-relativity-theory', 'spacetime']
  },
  {
    id: 'dark-matter',
    name: 'Dark Matter',
    indonesianName: 'Materi Gelap',
    entityType: 'Phenomenon',
    domainId: 'cosmology',
    subdomain: 'Dark Matter Evidence',
    symbol: 'Ω_c ≈ 26.8%',
    scientificStatus: 'ACTIVE RESEARCH',
    summary: 'Bentuk materi tak terlihat yang tidak memancarkan, menyerap, atau memantulkan cahaya, namun memberikan tarikan gravitasi masif pada kurva rotasi galaksi.',
    layers: {
      simple: 'Materi misterius tak terlihat yang menyusun sebagian besar massa galaksi. Kita tahu ia ada di sana karena gravitasinya menjaga bintang-bintang tidak terpental keluar dari galaksi!',
      standard: 'Menyumbang ~85% dari total materi di alam semesta. Bukti: kurva rotasi datar galaksi spiral (Vera Rubin), pelensaan gravitasi gugus galaksi Bullet Cluster, dan fluktuasi spektrum daya CMB.',
      advanced: 'Kandidat partikel utama: WIMPs (Weakly Interacting Massive Particles), aksion netral (QCD axions), atau lubang hitam primordial.',
      deepDive: 'Teori alternatif MOND (Modified Newtonian Dynamics) mencoba menjelaskan anomali rotasi dengan memodifikasi hukum gravitasi pada percepatan ultra-rendah (a < 10⁻¹⁰ m/s²) tanpa partikel materi gelap.'
    },
    keyVariables: [{ symbol: 'Ω_c', name: 'Kerapatan Materi Gelap', unit: 'Fraksi Kritis (~26.8%)', dimension: '[1]' }],
    commonMisconceptions: ['Materi gelap adalah lubang hitam biasa (sebagian besar materi gelap bersifat non-barionik dan dingin/cold dark matter).'],
    historicalContext: 'Dipelajari oleh Fritz Zwicky (1933) dan dibuktikan kokoh oleh Vera Rubin (1970-an).',
    realWorldApplications: ['Simulasi pembentukan struktur skala besar jaring kosmik filamen galaksi'],
    relatedEntityIds: ['gravity', 'cosmology', 'general-relativity-theory']
  },
  {
    id: 'dark-energy',
    name: 'Dark Energy',
    indonesianName: 'Energi Gelap',
    entityType: 'Phenomenon',
    domainId: 'cosmology',
    subdomain: 'Dark Energy & Cosmic Acceleration',
    symbol: 'Ω_Λ ≈ 68.3%',
    scientificStatus: 'ACTIVE RESEARCH',
    summary: 'Bentuk energi homogen misterius bertekanan negatif yang mengisi seluruh ruang hampa dan menyebabkan ekspansi alam semesta bertambah cepat (terakselerasi).',
    layers: {
      simple: 'Tekanan kosmik misterius yang menyusun hampir 70% alam semesta, yang mendorong galaksi-galaksi saling menjauh semakin kencang dari waktu ke waktu.',
      standard: 'Ditemukan melalui pengamatan Supernova Tipe Ia berjarak jauh (1998, Nobel Fisika 2011). Bertindak sebagai Konstanta Kosmologis Einstein (Λ) dengan persamaan keadaan w = P/ρc² ≈ -1.',
      advanced: 'Menghasilkan percepatan kosmik pada persamaan Friedmann: ä/a = - (4πG/3)(ρ + 3P/c²) > 0 ketika tekanan negatif P < -⅓ ρc².',
      deepDive: 'Masalah Konstanta Kosmologis (Cosmological Constant Problem): nilai kerapatan energi vakum kuantum QFT meleset 120 orde magnitudo lebih besar dibanding nilai observasi empiris energi gelap (disparitas terbesar dalam sejarah fisika teoretis).'
    },
    keyVariables: [{ symbol: 'Ω_Λ', name: 'Kerapatan Energi Gelap', unit: 'Fraksi Kritis (~68.3%)', dimension: '[1]' }],
    commonMisconceptions: ['Energi gelap dan materi gelap adalah hal yang sama (materi gelap menarik dengan gravitasi, sedangkan energi gelap mendorong percepatan ekspansi ruang).'],
    historicalContext: 'Ditemukan oleh Saul Perlmutter, Brian Schmidt, dan Adam Riess (1998).',
    realWorldApplications: ['Prediksi takdir akhir alam semesta (Big Freeze)'],
    relatedEntityIds: ['cosmology', 'general-relativity-theory', 'spacetime']
  },
  {
    id: 'string-theory-multiverse',
    name: 'String Theory & Landscape Multiverse',
    indonesianName: 'Teori Dawai & Multiversum Lanskap',
    entityType: 'Theory',
    domainId: 'cosmology',
    subdomain: 'Speculative Physics',
    symbol: 'D = 10 / 11 Dimensi',
    scientificStatus: 'SPECULATIVE / HYPOTHETICAL',
    summary: 'Kerangka teoretis spekulatif yang memodelkan partikel titik sebagai dawai bergetar 1-dimensi dalam ruang 10 atau 11 dimensi, memprediksi kemungkinan lanskap 10⁵⁰⁰ alam semesta berbeda.',
    layers: {
      simple: 'Gagasan hipotetis mutakhir bahwa partikel terkecil bukanlah titik, melainkan dawai senar mikroskopis yang bergetar. Nada getaran yang berbeda menghasilkan partikel yang berbeda!',
      standard: 'Mencoba menyatukan mekanika kuantum dengan Relativitas Umum (Gravitasi Kuantum). Membutuhkan dimensi spasial tambahan yang tergulung sangat kecil (kompaktifikasi Calabi-Yau).',
      advanced: 'Teori-M (Edward Witten 1995) menyatukan lima varian teori dawai super dalam 11 dimensi melalui dualitas-S dan dualitas-T.',
      deepDive: 'Status Ilmiah: HIPOTETIS/SPEKULATIF. Hingga saat ini belum ada satu pun konfirmasi eksperimen atau prediksi yang dapat diuji secara empiris oleh teknologi laboratorium manusia.'
    },
    keyVariables: [{ symbol: 'l_s', name: 'Panjang Dawai Planck', unit: '~ 10⁻³⁵ m', dimension: '[L]' }],
    commonMisconceptions: ['Teori Dawai sudah terbukti benar di laboratorium (masih murni berupa model matematika teoretis spekulatif).'],
    historicalContext: 'Dipelopori oleh Gabriele Veneziano, John Schwarz, Michael Green, dan Edward Witten.',
    realWorldApplications: ['Alat matematika dalam teori medan kuantum konformal (korespondensi AdS/CFT)'],
    relatedEntityIds: ['quantum', 'general-relativity-theory']
  },

  // =========================================================================
  // 13. CONSTANTS, EQUATIONS & EXPERIMENTS AS CORE ENTITIES (All 14 Entity Types)
  // =========================================================================
  {
    id: 'speed-of-light-constant',
    name: 'Speed of Light in Vacuum (c)',
    indonesianName: 'Kelajuan Cahaya dalam Ruang Hampa',
    entityType: 'Constant',
    domainId: 'special-relativity',
    subdomain: 'Fundamental Universal Constants',
    symbol: 'c = 299,792,458 m/s',
    scientificStatus: 'ESTABLISHED SCIENCE',
    summary: 'Konstanta fisika universal fundamental yang menetapkan batas kelajuan tertinggi bagi perambatan partikel, energi, informasi, dan kausalitas di alam semesta.',
    layers: {
      simple: 'Batas kelajuan mutlak di alam semesta. Tidak ada benda atau sinyal pesan yang dapat melesat lebih cepat daripada cahaya di ruang hampa!',
      standard: 'Bernilai eksak tepat 299,792,458 m/s tanpa ketidakpastian sejak redefinisi SI 1983. Merupakan tetapan fundamental perantara dimensi ruang dan waktu dalam ruang-waktu empat dimensi.',
      advanced: 'Muncul langsung dari persamaan medan elektrodinamika Maxwell: c = 1 / √(ε₀μ₀). Menghasilkan invariansi kuadrat interval ruang-waktu ds² = -c²dt² + dx² + dy² + dz² terhadap seluruh kelompok transformasi Lorentz.',
      deepDive: 'Pada skala Planck, beberapa varian gravitasi kuantum meneliti kemungkinan modifikasi dispersi foton berenergi ultra-tinggi (Lorentz Invariance Violation), namun observasi sinar kosmik Fermi-LAT mengonfirmasi keteguhan c hingga tingkat presisi ekstrem 10⁻¹⁷.'
    },
    keyVariables: [{ symbol: 'c', name: 'Kelajuan Cahaya', unit: 'm/s', dimension: '[L][T]⁻¹' }],
    commonMisconceptions: ['Cahaya selalu bergerak dengan kecepatan c di mana pun berada (dalam medium material seperti kaca atau air, cahaya diperlambat oleh interaksi gelombang-materi menjadi v = c/n).'],
    historicalContext: 'Diukur pertama kali oleh Ole Rømer (1676) lewat gerhana bulan Jupiter Io, dan dimurnikan oleh Albert Michelson (1926).',
    realWorldApplications: ['Sistem Penentuan Posisi Global (GPS)', 'Kabel serat optik transmisi internet lintas samudra', 'Definisi standar metrologi meter SI'],
    relatedEntityIds: ['special-relativity', 'mass-energy-equivalence', 'spacetime']
  },
  {
    id: 'planck-constant',
    name: 'Planck Constant (h)',
    indonesianName: 'Konstanta Planck',
    entityType: 'Constant',
    domainId: 'quantum',
    subdomain: 'Quantum Action & Scale',
    symbol: 'h = 6.62607015 × 10⁻³⁴ J·s',
    scientificStatus: 'ESTABLISHED SCIENCE',
    summary: 'Kuantum aksi fundamental dalam fisika kuantum yang menetapkan skala di mana diskrititas energi mendominasi dan menjadi dasar redefinisi kilogram SI.',
    layers: {
      simple: 'Kunci rahasia dunia kuantum! Konstanta yang menentukan ukuran porsi terkecil energi yang dapat dipancarkan atau diserap oleh atom.',
      standard: 'Menghubungkan energi sebuah foton dengan frekuensi gelombangnya: E = h·f. Sejak reformasi SI 20 Mei 2019, nilai h dipatok secara eksak sebesar 6.62607015 × 10⁻³⁴ J·s untuk mendefinisikan satuan kilogram massa.',
      advanced: 'Konstanta Planck tereduksi ℏ = h / (2π) muncul dalam asas ketidakpastian Heisenberg Δx · Δp ≥ ℏ/2 dan relasi komutasi posisi-momentum kanonik [x̂, p̂] = iℏ.',
      deepDive: 'Menentukan skala kuantisasi aksi dalam formulasi integral lintasan Feynman e^{iS/ℏ}. Ketika aksi sistem makroskopis S >> ℏ, interferensi fase kuantum terkonsentrasi pada lintasan klasik (prinsip aksi stasioner Hamilton).'
    },
    keyVariables: [{ symbol: 'h', name: 'Konstanta Planck', unit: 'J·s = kg·m²·s⁻¹', dimension: '[M][L]²[T]⁻¹' }],
    commonMisconceptions: ['Konstanta Planck hanya relevan bagi cahaya (berlaku universal bagi seluruh partikel bermassa seperti elektron, proton, dan molekul).'],
    historicalContext: 'Diusulkan oleh Max Planck (1900) untuk menyelesaikan fenomena katastrofe ultraviolet pada radiasi benda hitam sempurna.',
    realWorldApplications: ['Perangkat semikonduktor komputer & smartphone', 'Timbangan Kibble standar primer massa internasional', 'Mikroskopi gaya atom dan teknologi laser'],
    relatedEntityIds: ['quantum', 'heisenberg-uncertainty-principle', 'photon']
  },
  {
    id: 'equation-mass-energy-rel',
    name: 'Mass-Energy Equivalence Equation',
    indonesianName: 'Persamaan Kesetaraan Massa-Energi (E = mc²)',
    entityType: 'Equation',
    domainId: 'special-relativity',
    subdomain: 'Relativistic Dynamics',
    symbol: 'E₀ = m₀ c²',
    scientificStatus: 'ESTABLISHED SCIENCE',
    summary: 'Persamaan paling fundamental dalam fisika modern yang menyatakan bahwa massa inersial dan energi adalah wujud manifestasi berbeda dari entitas fisis yang setara.',
    layers: {
      simple: 'Massa dan energi adalah dua sisi dari keping uang yang sama. Materi yang sangat sedikit dapat melepaskan energi yang luar biasa dahsyat!',
      standard: 'Menyatakan bahwa materi beristirahat bermassa m₀ menyimpan energi intrinsik E₀ = m₀ c². Konversi massa menjadi energi menjadi dasar tenaga nuklir dan energi bintang matahari.',
      advanced: 'Persamaan relativistik umum untuk partikel yang bergerak memiliki momentum p⃗ adalah relasi dispersi invarian: E² = (pc)² + (m₀c²)².',
      deepDive: 'Menegaskan bahwa norma dari 4-vektor momentum relativistik P^μ = (E/c, p⃗) adalah invariant Lorentz skalar sejati: P_μ P^μ = -(m₀ c)², berlaku untuk semua kerangka acuan.'
    },
    keyVariables: [
      { symbol: 'E₀', name: 'Energi Diam', unit: 'Joule (J)', dimension: '[M][L]²[T]⁻²' },
      { symbol: 'm₀', name: 'Massa Diam Inersial', unit: 'Kilogram (kg)', dimension: '[M]' }
    ],
    commonMisconceptions: ['Foton tidak punya energi karena tidak punya massa diam (foton tidak memiliki massa diam m₀=0, tetapi memiliki momentum p = E/c sehingga tetap membawa energi kuantum E = hf).'],
    historicalContext: 'Diterbitkan Albert Einstein dalam suplemen makalah Annus Mirabilis September 1905.',
    realWorldApplications: ['Reaksi fusi nuklir hidrogen di inti matahari', 'Reaktor PLTN fisi uranium', 'Pemeriksaan tomografi emisi positron medis (PET Scan)'],
    relatedEntityIds: ['special-relativity', 'energy', 'mass', 'nuclear']
  },
  {
    id: 'experiment-michelson-morley-exp',
    name: 'Michelson-Morley Interferometer Experiment',
    indonesianName: 'Eksperimen Interferometer Michelson-Morley',
    entityType: 'Experiment',
    domainId: 'special-relativity',
    subdomain: 'Aether Drift Null Result',
    symbol: 'Δt = 0 (Null Result)',
    scientificStatus: 'ESTABLISHED SCIENCE',
    summary: 'Eksperimen monumental paling terkenal dalam sejarah fisika yang membuktikan ketiadaan medium aether pembawa cahaya dan membuka kelahiran teori Relativitas Khusus.',
    layers: {
      simple: 'Percobaan legendaris yang membuktikan bahwa cahaya tidak memerlukan medium apa pun untuk merambat di ruang hampa.',
      standard: 'Menggunakan interferometer cahaya dengan cermin pemecah berkas (beam splitter) untuk mendeteksi perbedaan kecepatan cahaya saat Bumi bergerak menembus aether. Hasil pengamatan konsisten nol (null result).',
      advanced: 'Menghancurkan konsep mekanika Newton tentang ruang dan waktu mutlak, serta membuktikan bahwa cepat rambat cahaya dalam vakum adalah konstan invarian bagi seluruh pengamat inersial.',
      deepDive: 'Hasil nol memicu Lorentz dan FitzGerald merumuskan hipotesis kontraksi panjang yang kemudian diinterpretasikan ulang oleh Einstein secara geometris murni tanpa perlu hipotesis eter.'
    },
    keyVariables: [{ symbol: 'ΔN', name: 'Pergeseran Pola Fringe Interferensi', unit: 'Garis Tanpa Satuan', dimension: '[1]' }],
    commonMisconceptions: ['Michelson-Morley gagal karena instrumennya tidak cukup teliti (sensitivitas alat mencapai 0.04 garis, sementara pergeseran eter yang diharapkan adalah 0.4 garis).'],
    historicalContext: 'Dilakukan oleh Albert A. Michelson dan Edward W. Morley di Case School of Applied Science di Cleveland pada tahun 1887.',
    realWorldApplications: ['Prinsip dasar detektor gelombang gravitasi laser LIGO dan Virgo', 'Interferometri optik presisi tinggi'],
    relatedEntityIds: ['special-relativity', 'optics', 'speed-of-light']
  }
  ,...SUPPLEMENTAL_ENTITIES
];

for (const record of PHYSICS_ENTITIES) {
  record.reviewStatus ||= 'PARTIAL';
  record.sources ||= [{title: 'Bacaan lanjutan: ' + record.domainId, url: DOMAIN_REFERENCES[record.domainId], scope: 'Rujukan domain; bukan bukti bahwa seluruh klaim entri telah diverifikasi.'}];
}
