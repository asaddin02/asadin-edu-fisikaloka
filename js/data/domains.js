// Fisikaloka · Physical Domains Catalog (28 Comprehensive Domains)

export const PHYSICS_DOMAINS = [
  {
    id: 'foundations',
    name: 'Foundations of Physics',
    indonesianName: 'Fondasi Fisika & Pengukuran',
    category: 'Foundational',
    icon: '📐',
    color: '#00f2fe',
    accentGrad: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
    scale: '10⁻³⁵ m – 10²⁶ m (Semua Skala)',
    description: 'Metodologi ilmiah, sistem satuan internasional (SI), analisis dimensi, ketidakpastian pengukuran, kalkulus vektor, dan pemodelan matematis untuk memahami realitas fisik.',
    keyQuestions: [
      'Bagaimana kita mengukur realitas fisik secara objektif?',
      'Mengapa dimensi dan satuan konsisten sangat fundamental?',
      'Bagaimana vektor merepresentasikan arah dan magnitudo di ruang 3D?'
    ],
    subdomains: ['SI Units & Standards', 'Dimensional Analysis', 'Vectors & Scalars', 'Measurement Uncertainty', 'Scientific Modeling']
  },
  {
    id: 'kinematics',
    name: 'Kinematics',
    indonesianName: 'Kinematika Gerak',
    category: 'Classical Mechanics',
    icon: '🚀',
    color: '#38ef7d',
    accentGrad: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    scale: '10⁻³ m – 10¹² m (Makroskopik)',
    description: 'Deskripsi matematis gerak benda tanpa meninjau penyebabnya: posisi, jarak, perpindahan, kelajuan, kecepatan, percepatan, gerak lurus (GLB/GLBB), gerak parabola, dan gerak melingkar.',
    keyQuestions: [
      'Bagaimana hubungan diferensial dan integral antara posisi, kecepatan, dan percepatan?',
      'Mengapa gerak parabola dapat diuraikan secara independen pada sumbu horizontal dan vertikal?',
      'Apakah percepatan selalu berarti perubahan kelajuan?'
    ],
    subdomains: ['Linear Motion', 'Projectile Motion', 'Circular Kinematics', 'Relative Motion', 'Vector Kinematics']
  },
  {
    id: 'dynamics',
    name: 'Dynamics & Newton’s Laws',
    indonesianName: 'Dinamika & Hukum Newton',
    category: 'Classical Mechanics',
    icon: '⚖️',
    color: '#f6d365',
    accentGrad: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    scale: '10⁻⁴ m – 10⁸ m',
    description: 'Studi penyebab gerak: konsep gaya, massa inersial, tiga hukum gerak Newton, diagram benda bebas, gaya gesek statis/kinetis, gaya normal, tegangan tali, dan gaya sentripetal.',
    keyQuestions: [
      'Mengapa gaya neto nol tidak selalu berarti benda diam?',
      'Bagaimana membedakan massa (inersia) dari berat (gaya gravitasi)?',
      'Apakah gaya aksi dan reaksi bekerja pada benda yang sama?'
    ],
    subdomains: ['Newton’s Three Laws', 'Friction & Drag', 'Centripetal Dynamics', 'Free Body Diagrams', 'Equilibrium']
  },
  {
    id: 'work-energy',
    name: 'Work, Energy & Power',
    indonesianName: 'Usaha, Energi & Daya',
    category: 'Classical Mechanics',
    icon: '⚡',
    color: '#ff9a44',
    accentGrad: 'linear-gradient(135deg, #ff9a44 0%, #fc6076 100%)',
    scale: 'Universal',
    description: 'Prinsip kerja, energi kinetik, energi potensial (gravitasi dan pegas), teorema usaha-energi, gaya konservatif vs non-konservatif, daya, serta hukum fundamental kekekalan energi mekanik.',
    keyQuestions: [
      'Apakah gaya yang tegak lurus arah perpindahan melakukan usaha?',
      'Bagaimana energi dapat bertransformasi dari satu bentuk ke bentuk lain tanpa pernah musnah?',
      'Apa perbedaan mendasar antara gaya konservatif dan non-konservatif?'
    ],
    subdomains: ['Work-Energy Theorem', 'Kinetic & Potential Energy', 'Mechanical Power', 'Conservation of Energy', 'Potential Wells']
  },
  {
    id: 'momentum',
    name: 'Momentum & Collisions',
    indonesianName: 'Momentum, Impuls & Tumbukan',
    category: 'Classical Mechanics',
    icon: '💥',
    color: '#ff5858',
    accentGrad: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
    scale: '10⁻¹⁵ m – 10¹² m',
    description: 'Kuantitas gerak linear, impuls gaya, kekekalan momentum linear sistem terisolasi, tumbukan lenting sempurna, lenting sebagian, dan tidak lenting sama sekali, serta pusat massa sistem partikel.',
    keyQuestions: [
      'Mengapa momentum linear selalu kekal dalam sistem terisolasi bahkan saat energi kinetik hilang?',
      'Bagaimana airbag mobil memperkecil gaya benturan fatal menggunakan konsep impuls?',
      'Bagaimana roket dapat berakselerasi di ruang hampa tanpa udara untuk didorong?'
    ],
    subdomains: ['Linear Momentum', 'Impulse', 'Collisions & Restitution', 'Center of Mass', 'Rocket Propulsion']
  },
  {
    id: 'rotation',
    name: 'Rotational Motion',
    indonesianName: 'Dinamika Rotasi & Benda Tegar',
    category: 'Classical Mechanics',
    icon: '🔄',
    color: '#a18cd1',
    accentGrad: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    scale: '10⁻³ m – 10¹⁰ m',
    description: 'Kinematika dan dinamika gerak melingkar benda tegar: torsi (momen gaya), momen inersia, energi kinetik rotasi, momentum sudut, kekekalan momentum sudut, dan gerak menggelinding murni.',
    keyQuestions: [
      'Mengapa pesenam es berputar lebih cepat saat merapatkan lengannya?',
      'Bagaimana distribusi massa menentukan hambatan rotasi (momen inersia)?',
      'Mengapa sepeda roda dua lebih stabil saat melaju kencang dibandingkan saat diam?'
    ],
    subdomains: ['Torque', 'Moment of Inertia', 'Angular Momentum', 'Rolling Motion', 'Gyroscopic Precession']
  },
  {
    id: 'gravitation',
    name: 'Universal Gravitation',
    indonesianName: 'Gravitasi Universal & Mekanika Orbit',
    category: 'Classical Mechanics / Astrophysics',
    icon: '🪐',
    color: '#7028e4',
    accentGrad: 'linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%)',
    scale: '10⁶ m – 10²⁶ m (Kosmik)',
    description: 'Hukum Gravitasi Universal Newton, medan gravitasi, energi potensial gravitasi umum, hukum Kepler tentang gerak planet, kecepatan orbit satelit, dan kecepatan lepas (escape velocity).',
    keyQuestions: [
      'Mengapa satelit di orbit tidak jatuh ke Bumi meskipun terus-menerus ditarik gravitasi?',
      'Bagaimana Cavendish pertama kali "menimbang massa Bumi" dengan neraca torsi?',
      'Berapa kelajuan minimum yang dibutuhkan suatu roket untuk meninggalkan pengaruh gravitasi Bumi selamanya?'
    ],
    subdomains: ['Newton’s Law of Gravity', 'Gravitational Field & Potential', 'Kepler’s Three Laws', 'Orbital Mechanics', 'Tides & Gravitational Trajectories']
  },
  {
    id: 'fluids',
    name: 'Fluid Physics',
    indonesianName: 'Mekanika Fluida',
    category: 'Classical Physics',
    icon: '🌊',
    color: '#00c6ff',
    accentGrad: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)',
    scale: '10⁻⁶ m – 10⁶ m',
    description: 'Sifat zat cair dan gas: massa jenis, tekanan hidrostatis, hukum Pascal, prinsip gaya apung Archimedes, persamaan kontinuitas fluida ideal, persamaan Bernoulli, viskositas, dan turbulensi.',
    keyQuestions: [
      'Mengapa kapal baja seberat puluhan ribu ton dapat mengapung di atas air laut?',
      'Bagaimana bentuk sayap pesawat menghasilkan gaya angkat melalui efek Bernoulli dan defleksi udara?',
      'Mengapa tekanan zat cair hanya bergantung pada kedalaman, bukan bentuk wadahnya?'
    ],
    subdomains: ['Hydrostatic Pressure', 'Archimedes Buoyancy', 'Pascal’s Principle', 'Continuity & Flow', 'Bernoulli’s Principle', 'Viscosity']
  },
  {
    id: 'oscillations',
    name: 'Oscillations & SHM',
    indonesianName: 'Osilasi & Gerak Harmonik',
    category: 'Waves & Vibrations',
    icon: '⏱️',
    color: '#f093fb',
    accentGrad: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    scale: '10⁻¹⁵ m – 10⁴ m',
    description: 'Gerak bolak-balik periodik di sekitar titik kesetimbangan: gerak harmonik sederhana (GHS) pada pegas dan bandul matematis, frekuensi, periode, fase, osilasi teredam, dan fenomena resonansi mekanik.',
    keyQuestions: [
      'Mengapa periode ayunan bandul sederhana tidak dipengaruhi oleh massa bandul?',
      'Bagaimana transfer energi maksimum terjadi saat frekuensi dorongan sama dengan frekuensi alami sistem (resonansi)?',
      'Bagaimana redaman (damping) mengubah osilasi abadi menjadi peluruhan eksponensial?'
    ],
    subdomains: ['Simple Harmonic Motion', 'Pendulums', 'Mass-Spring Systems', 'Damped Oscillations', 'Resonance']
  },
  {
    id: 'waves',
    name: 'Mechanical Waves',
    indonesianName: 'Gelombang Mekanik',
    category: 'Waves & Vibrations',
    icon: '〰️',
    color: '#4facfe',
    accentGrad: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    scale: '10⁻¹⁰ m – 10⁶ m',
    description: 'Perambatan gangguan energi melalui medium material tanpa perpindahan permanen massa: gelombang transversal, longitudinal, panjang gelombang, cepat rambat gelombang, superposisi, interferensi, difraksi, dan gelombang stasioner.',
    keyQuestions: [
      'Apa yang sebenarnya berpindah saat gelombang merambat melintasi lautan?',
      'Bagaimana dua gelombang dapat saling meniadakan menghasilkan titik diam mutlak (interferensi destruktif)?',
      'Bagaimana terbentuknya nada harmonik pada senar dawai atau kolom udara pipa organa?'
    ],
    subdomains: ['Transverse & Longitudinal Waves', 'Wave Equation', 'Superposition & Interference', 'Standing Waves', 'Diffraction & Reflection']
  },
  {
    id: 'sound',
    name: 'Sound & Acoustics',
    indonesianName: 'Akustik & Gelombang Bunyi',
    category: 'Waves & Vibrations',
    icon: '🔊',
    color: '#fa709a',
    accentGrad: 'linear-gradient(135deg, #fee140 0%, #fa709a 100%)',
    scale: '10⁻² m – 10³ m',
    description: 'Gelombang tekanan longitudinal: cepat rambat bunyi di gas, cair, dan padat, frekuensi dan tinggi nada (pitch), intensitas dan taraf intensitas desibel (dB), resonansi akustik, dan efek Doppler bunyi.',
    keyQuestions: [
      'Mengapa sirine ambulans terdengar melengking saat mendekat dan bernada rendah saat menjauh (Efek Doppler)?',
      'Mengapa kecepatan bunyi di dalam baja jauh lebih cepat daripada di udara atmosfer?',
      'Mengapa telinga manusia merasakan tingkat kekerasan suara secara logaritmik (skala Desibel)?'
    ],
    subdomains: ['Speed of Sound', 'Pitch & Frequency', 'Decibel Intensity Scale', 'Acoustic Resonance', 'Doppler Effect']
  },
  {
    id: 'thermal',
    name: 'Thermal Physics & Heat',
    indonesianName: 'Fisika Termal & Kalor',
    category: 'Thermal & Statistical',
    icon: '🔥',
    color: '#ff0844',
    accentGrad: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
    scale: '10⁻¹⁰ m – 10³ m',
    description: 'Suhu, pemuaian termal panjang/luas/volume, kalor, kapasitas kalor, kalor jenis, kalor laten transisi fase zat, perpindahan kalor (konduksi, konveksi, radiasi Stefan-Boltzmann), dan teori kinetik gas ideal.',
    keyQuestions: [
      'Apa arti mikroskopis dari konsep temperatur pada tingkat gerak molekuler?',
      'Mengapa saat air mendidih suhunya tetap 100°C meskipun terus-menerus diberi kalor?',
      'Bagaimana energi Matahari dapat menempuh 150 juta kilometer ruang hampa hampa udara sampai ke Bumi?'
    ],
    subdomains: ['Temperature Scales', 'Thermal Expansion', 'Heat Capacity & Phase Change', 'Heat Transfer Mechanisms', 'Kinetic Theory of Gases']
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    indonesianName: 'Hukum Termodinamika & Siklus',
    category: 'Thermal & Statistical',
    icon: '⚙️',
    color: '#f83600',
    accentGrad: 'linear-gradient(135deg, #f83600 0%, #fe8c00 100%)',
    scale: 'Makroskopik Sistem',
    description: 'Hukum ke-nol (keseimbangan termal), hukum pertama (kekekalan energi sistem termodinamika $ΔU = Q - W$), hukum kedua (entropi dan arah spontanitas waktu), hukum ketiga (nol mutlak), siklus Carnot, mesin kalor, dan efisiensi maksimum.',
    keyQuestions: [
      'Mengapa kita tidak bisa membuat mesin kalor dengan efisiensi 100% tanpa membuang panas ke lingkungan?',
      'Apa itu entropi dan mengapa ia menentukan arah "panah waktu" alam semesta?',
      'Bagaimana lemari pendingin dapat memindahkan panas dari tempat dingin ke tempat yang lebih hangat?'
    ],
    subdomains: ['Thermodynamic Laws (0th to 3rd)', 'PV Diagrams & Gas Work', 'Entropy & Irreversibility', 'Carnot Cycle & Heat Engines', 'Thermodynamic Potentials']
  },
  {
    id: 'electricity',
    name: 'Electricity & DC/AC',
    indonesianName: 'Elektrostatika & Rangkaian Listrik',
    category: 'Electromagnetism',
    icon: '⚡',
    color: '#f9d423',
    accentGrad: 'linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)',
    scale: '10⁻¹⁰ m – 10⁶ m',
    description: 'Muatan listrik, hukum Coulomb, medan listrik, potensial listrik dan beda potensial (volt), kapasitansi, arus listrik, hambatan dan hukum Ohm, rangkaian seri/paralel, hukum Kirchhoff, serta dasar arus bolak-balik (AC).',
    keyQuestions: [
      'Bagaimana dua muatan titik dapat saling tolak atau tarik melintasi ruang hampa?',
      'Mengapa burung yang bertengger di kabel transmisi bertegangan ribuan volt tidak tersengat listrik?',
      'Bagaimana kapasitor menyimpan energi dalam bentuk medan listrik elektrostatik?'
    ],
    subdomains: ['Coulomb’s Law', 'Electric Field & Potential', 'Capacitors & Dielectrics', 'Ohm’s Law & Resistors', 'Kirchhoff’s Laws', 'AC Fundamentals']
  },
  {
    id: 'magnetism',
    name: 'Magnetism & Induction',
    indonesianName: 'Kemagnetan & Induksi Faraday',
    category: 'Electromagnetism',
    icon: '🧲',
    color: '#00b4db',
    accentGrad: 'linear-gradient(135deg, #0083b0 0%, #00b4db 100%)',
    scale: '10⁻¹⁵ m – 10⁸ m',
    description: 'Kutub magnet, medan magnet B, gaya Lorentz pada partikel bermuatan dan kawat berarus, hukum Biot-Savart, hukum Ampere, fluks magnetik, hukum induksi elektromagnetik Faraday, hukum Lenz, induktansi, dan transformator.',
    keyQuestions: [
      'Mengapa muatan listrik yang diam tidak merasakan gaya magnet, tetapi langsung berbelok saat bergerak di medan magnet?',
      'Bagaimana menggerakkan sebatang magnet di dekat kumparan dapat membangkitkan arus listrik (induksi Faraday)?',
      'Mengapa sampai saat ini belum pernah ditemukan monopol magnet (kutub utara atau selatan murni yang terisolasi)?'
    ],
    subdomains: ['Magnetic Fields & Poles', 'Lorentz Force', 'Ampère & Biot-Savart Laws', 'Faraday & Lenz Laws', 'Inductance & Transformers']
  },
  {
    id: 'electromagnetism',
    name: 'Electromagnetism & Maxwell',
    indonesianName: 'Elektrodinamika & Persamaan Maxwell',
    category: 'Electromagnetism',
    icon: '📡',
    color: '#6a11cb',
    accentGrad: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    scale: 'Universal',
    description: 'Penyatuan listrik dan magnet oleh James Clerk Maxwell melalui 4 persamaan medan fundamental, prediksi teoretis dan penemuan gelombang elektromagnetik, spektrum gelombang EM (dari radio sampai sinar gamma), dan vektor Poynting.',
    keyQuestions: [
      'Bagaimana medan listrik yang berubah terhadap waktu dapat melahirkan medan magnet, dan sebaliknya?',
      'Mengapa cahaya tampak hanyalah bagian kecil dari spektrum gelombang elektromagnetik yang merambat pada kelajuan $c$?',
      'Bagaimana radiasi elektromagnetik membawa energi dan momentum melintasi kosmos?'
    ],
    subdomains: ['Maxwell’s Four Equations', 'Electromagnetic Wave Propagation', 'Electromagnetic Spectrum', 'Poynting Vector & Energy', 'Radiation Pressure']
  },
  {
    id: 'optics',
    name: 'Optics: Ray & Wave',
    indonesianName: 'Optika Geometri & Fisis',
    category: 'Optics & Photons',
    icon: '🔍',
    color: '#00c6ff',
    accentGrad: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)',
    scale: '10⁻⁹ m – 10³ m',
    description: 'Sifat dan perilaku cahaya: pemantulan (cermin datar, cekung, cembung), pembiasan dan hukum Snellius (lensa cembung dan cekung), pembentukan bayangan instrumen optik, serta optika gelombang: interferensi celah ganda, kisi difraksi, dan polarisasi cahaya.',
    keyQuestions: [
      'Mengapa pensil di dalam gelas berisi air terlihat patah dan bagaimana pembiasan cahaya memicu fatamorgana?',
      'Bagaimana eksperimen celah ganda Thomas Young membuktikan bahwa cahaya adalah gelombang?',
      'Mengapa kacamata terpolarisasi dapat menghilangkan silau pantulan cahaya dari permukaan air?'
    ],
    subdomains: ['Reflection & Mirrors', 'Refraction & Snell’s Law', 'Thin Lenses & Instruments', 'Interference & Diffraction', 'Polarization & Coherence']
  },
  {
    id: 'special-relativity',
    name: 'Special Relativity',
    indonesianName: 'Relativitas Khusus',
    category: 'Modern Physics',
    icon: '⏳',
    color: '#f38181',
    accentGrad: 'linear-gradient(135deg, #fce38a 0%, #f38181 100%)',
    scale: 'Kecepatan mendekati $c$',
    description: 'Teori Albert Einstein (1905) untuk kerangka acuan inersial: postulat kelajuan cahaya konstan bagi semua pengamat, hilangnya simultanitas mutlak, transformasi Lorentz, dilatasi waktu, kontraksi panjang, dan kesetaraan massa-energi $E = mc²$.',
    keyQuestions: [
      'Mengapa jam atom di satelit GPS berdetak dengan laju berbeda dibanding jam di permukaan Bumi?',
      'Apa yang terjadi jika suatu benda berkecepatan 99.9% kelajuan cahaya menurut pengamat yang diam?',
      'Mengapa tidak ada partikel bermassa yang dapat dipercepat hingga melampaui kelajuan cahaya dalam ruang hampa?'
    ],
    subdomains: ['Einstein Postulates', 'Time Dilation & Twin Paradox', 'Length Contraction', 'Relativistic Momentum', 'Mass-Energy Equivalence (E=mc²)']
  },
  {
    id: 'general-relativity',
    name: 'General Relativity & Gravity',
    indonesianName: 'Relativitas Umum & Ruang-Waktu',
    category: 'Modern Physics / Cosmology',
    icon: '🌌',
    color: '#4e54c8',
    accentGrad: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
    scale: 'Skala Makro Kosmik & Medan Gravitasi Kuat',
    description: 'Teori gravitasi geometris Einstein (1915): prinsip kesetaraan inersia dan gravitasi, kelengkungan kontinuum ruang-waktu 4D oleh materi-energi, dilatasi waktu gravitasi, pelensaan gravitasi, fisika lubang hitam (event horizon), dan gelombang gravitasi.',
    keyQuestions: [
      'Bagaimana massa dan energi memberitahu ruang-waktu bagaimana melengkung, dan ruang-waktu memberitahu materi bagaimana bergerak?',
      'Mengapa waktu berjalan lebih lambat di dasar jurang gravitasi kuat dibanding di tempat tinggi?',
      'Apa yang terjadi pada materi dan cahaya yang melintasi horizon peristiwa (event horizon) sebuah lubang hitam?'
    ],
    subdomains: ['Principle of Equivalence', 'Curved Spacetime Metric', 'Gravitational Redshift & Lensing', 'Black Holes & Singularities', 'Gravitational Waves']
  },
  {
    id: 'quantum',
    name: 'Quantum Physics',
    indonesianName: 'Fisika Kuantum',
    category: 'Modern Physics',
    icon: '⚛️',
    color: '#00f5d4',
    accentGrad: 'linear-gradient(135deg, #7b2cbf 0%, #00f5d4 100%)',
    scale: '10⁻¹⁸ m – 10⁻⁹ m (Skala Subatomik)',
    description: 'Fisika skala mikroskopis: radiasi benda hitam Planck, efek fotolistrik, dualisme gelombang-partikel de Broglie, prinsip ketidakpastian Heisenberg, fungsi gelombang Schrödinger, interpretasi probabilitas Born, penerobosan kuantum (tunneling), dan keterikatan kuantum (entanglement).',
    keyQuestions: [
      'Mengapa partikel subatomik seperti elektron dapat menunjukkan pola interferensi gelombang saat ditembakkan satu per satu?',
      'Mengapa kita tidak pernah bisa mengukur posisi dan momentum partikel secara serentak dengan presisi tak hingga?',
      'Bagaimana partikel kuantum dapat "menerobos" penghalang potensial yang secara klasik mustahil dilewati (quantum tunneling)?'
    ],
    subdomains: ['Wave-Particle Duality', 'Photoelectric Effect', 'Uncertainty Principle', 'Schrödinger Equation & Wavefunction', 'Quantum Tunneling & Entanglement']
  },
  {
    id: 'atomic',
    name: 'Atomic Physics',
    indonesianName: 'Fisika Atom & Spektroskopi',
    category: 'Modern Physics',
    icon: '🔬',
    color: '#36d1dc',
    accentGrad: 'linear-gradient(135deg, #5b86e5 0%, #36d1dc 100%)',
    scale: '10⁻¹⁰ m (Ångström)',
    description: 'Struktur dan dinamika atom: model atom Rutherford-Bohr, tingkat energi terkuantisasi, deret spektrum hidrogen (Lyman, Balmer, Paschen), bilangan kuantum (n, l, m_l, m_s), prinsip larangan Pauli, transisi elektron, serta emisi terstimulasi dan laser.',
    keyQuestions: [
      'Mengapa elektron tidak kehilangan energi dan jatuh menabrak inti atom seperti prediksi elektrodinamika klasik?',
      'Bagaimana sidik jari spektrum garis emisi dan absorpsi mengungkap komposisi kimia bintang yang berjarak milyaran tahun cahaya?',
      'Bagaimana prinsip kerja emisi terstimulasi menghasilkan berkas cahaya koheren pada sinar LASER?'
    ],
    subdomains: ['Bohr Atom Model', 'Energy Quantization & Spectra', 'Quantum Numbers & Orbitals', 'Pauli Exclusion Principle', 'Lasers & Stimulated Emission']
  },
  {
    id: 'nuclear',
    name: 'Nuclear Physics',
    indonesianName: 'Fisika Nuklir & Radioaktivitas',
    category: 'Modern Physics',
    icon: '☢️',
    color: '#f7971e',
    accentGrad: 'linear-gradient(135deg, #ffd200 0%, #f7971e 100%)',
    scale: '10⁻¹⁵ m (Femtometer / Fermi)',
    description: 'Sifat dan interaksi inti atom: proton, neutron, nuklida dan isotop, gaya nuklir kuat, defek massa dan energi ikat inti, peluruhan radioaktif (alfa, beta, gamma), hukum waktu paruh, reaksi fisi nuklir berantai, dan fusi termonuklir bintang.',
    keyQuestions: [
      'Mengapa proton-proton bermuatan positif di dalam inti atom tidak terpental terpisah akibat gaya tolak elektrostatik Coulomb?',
      'Mengapa pembelahan satu gram Uranium-235 mampu menghasilkan energi jutaan kali lebih besar dibanding pembakaran batubara?',
      'Bagaimana reaksi fusi hidrogen menjadi helium menjadi sumber cahaya dan energi Matahari selama milyaran tahun?'
    ],
    subdomains: ['Nuclear Structure & Isotopes', 'Binding Energy Curve', 'Radioactivity & Half-life', 'Nuclear Fission & Reactors', 'Thermonuclear Fusion']
  },
  {
    id: 'particle-physics',
    name: 'Particle Physics & Standard Model',
    indonesianName: 'Fisika Partikel & Model Standar',
    category: 'Modern Physics',
    icon: '💫',
    color: '#b388ff',
    accentGrad: 'linear-gradient(135deg, #b388ff 0%, #3f51b5 100%)',
    scale: '10⁻¹⁹ m – 10⁻¹⁸ m (Partikel Elementer)',
    description: 'Penyusun paling fundamental alam semesta: 6 quark (up, down, charm, strange, top, bottom), 6 lepton (elektron, muon, tau, dan 3 neutrino), 4 jenis boson tolok pembawa interaksi fundamental, boson skalar Higgs penentu massa inersial, antimateri, dan akselerator partikel raksasa (LHC).',
    keyQuestions: [
      'Apakah proton dan neutron benar-benar partikel fundamental tak terbagi, atau terdiri dari quark yang terikat gluon?',
      'Bagaimana medan Higgs memberikan massa inersia pada partikel-partikel elementer alam semesta?',
      'Di mana antimateri kosmik berada jika pada saat Big Bang tercipta materi dan antimateri dalam jumlah yang sama?'
    ],
    subdomains: ['Quarks & Leptons', 'Gauge Bosons & Forces', 'Higgs Mechanism', 'Antimatter & Annihilation', 'Particle Accelerators & Colliders']
  },
  {
    id: 'condensed-matter',
    name: 'Condensed Matter Physics',
    indonesianName: 'Fisika Zat Padat & Material',
    category: 'Modern Physics / Applied',
    icon: '💎',
    color: '#11998e',
    accentGrad: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    scale: '10⁻¹⁰ m – 10⁻² m',
    description: 'Studi fase terkondensasi zat: kisi kristal, fonon (kuantisasi getaran kisi), teori pita energi elektron (konduktor, semikonduktor, isolator), diode dan transistor silikon, fenomena superkonduktivitas (hambatan nol dan efek Meissner), dan material kuantum.',
    keyQuestions: [
      'Mengapa bahan semikonduktor dapat diatur daya hantar listriknya hingga menjadi fondasi seluruh prosesor mikrokomputer modern?',
      'Bagaimana superkonduktor dapat menghantarkan arus listrik tanpa kehilangan energi sepeser pun dan melayangkan magnet (efek Meissner)?',
      'Bagaimana struktur kisi kristal menentukan sifat mekanik, termal, dan optik suatu material padat?'
    ],
    subdomains: ['Crystal Lattices & Phonons', 'Band Theory of Solids', 'Semiconductors & Doping', 'Superconductivity & Meissner Effect', 'Magnetic Materials']
  },
  {
    id: 'plasma',
    name: 'Plasma Physics',
    indonesianName: 'Fisika Plasma & Fusi',
    category: 'Modern Physics / Applied',
    icon: '⚡',
    color: '#ff416c',
    accentGrad: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    scale: '10⁻⁶ m – 10¹⁰ m',
    description: 'Wujud zat keempat: gas terionisasi sebagian atau penuh yang terdiri dari ion bebas dan elektron bergerak bebas dengan perilaku kolektif kuasi-netral, panjang screening Debye, gelombang plasma, kurungan magnetik (reaktor Tokamak), aurora borealis, dan plasma astrofisika.',
    keyQuestions: [
      'Mengapa 99% materi teramati di seluruh alam semesta berada dalam wujud plasma, bukan padat, cair, atau gas biasa?',
      'Bagaimana botol medan magnet dalam reaktor Tokamak (seperti ITER) dapat mengurung plasma bersuhu 150 juta derajat Celsius tanpa melelehkan dinding reaktor?',
      'Bagaimana interaksi angin surya plasma dengan medan magnet Bumi melahirkan fenomena cahaya spektakuler aurora di kutub?'
    ],
    subdomains: ['Ionization & Quasi-neutrality', 'Debye Shielding', 'Plasma Waves & Magnetohydrodynamics', 'Magnetic Confinement & Fusion', 'Space & Solar Plasmas']
  },
  {
    id: 'astrophysics',
    name: 'Astrophysics & Stars',
    indonesianName: 'Astrofisika & Bintang',
    category: 'Cosmology & Space',
    icon: '✨',
    color: '#8a2387',
    accentGrad: 'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)',
    scale: '10⁹ m – 10²¹ m',
    description: 'Penerapan hukum-hukum fisika pada objek langit: kesetimbangan hidrostatis bintang, diagram Hertzsprung-Russell, siklus hidup dan kematian bintang, katai putih (batas Chandrasekhar), bintang neutron & pulsar, supernova, lubang hitam bermassa bintang dan supermasif, serta radiasi kosmik.',
    keyQuestions: [
      'Bagaimana bintang mempertahankan kesetimbangan stabil antara gaya gravitasi ke dalam dan tekanan radiasi termonuklir ke luar?',
      'Mengapa bintang bermassa besar mengakhiri hidupnya dalam ledakan dahsyat Supernova menyisakan bintang neutron atau lubang hitam?',
      'Bagaimana astronom mengukur temperatur, magnitudo, dan evolusi miliaran bintang melalui diagram Hertzsprung-Russell?'
    ],
    subdomains: ['Stellar Structure & Equilibrium', 'Hertzsprung-Russell Diagram', 'Stellar Evolution & Supernovae', 'Neutron Stars & Pulsars', 'Cosmic Rays']
  },
  {
    id: 'cosmology',
    name: 'Cosmology & Universe',
    indonesianName: 'Kosmologi & Alam Semesta',
    category: 'Cosmology & Space',
    icon: '🌌',
    color: '#3a1c71',
    accentGrad: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    scale: '10²² m – 10²⁶ m (Alam Semesta Teramati)',
    description: 'Asal-usul, evolusi skala besar, dan takdir akhir alam semesta: model Big Bang standar, radiasi latar belakang gelombang mikro kosmik (CMB), ekspansi alam semesta dan hukum Hubble-Lemaître, nukleosintesis primordial, materi gelap (dark matter), dan energi gelap (dark energy).',
    keyQuestions: [
      'Bagaimana penemuan radiasi sisa Cosmic Microwave Background (CMB) membuktikan peristiwa Big Bang 13.8 miliar tahun lalu?',
      'Mengapa kurva rotasi galaksi memaksa para fisikawan menyimpulkan adanya 85% materi tak terlihat yang dinamai Materi Gelap?',
      'Bagaimana energi gelap menyebabkan ekspansi ruang alam semesta dipercepat dan apa takdir akhir kosmos (Big Freeze)?'
    ],
    subdomains: ['Big Bang & CMB', 'Hubble Expansion & Redshift', 'Dark Matter Evidence', 'Dark Energy & Cosmic Acceleration', 'Fate of the Universe']
  },
  {
    id: 'applied-physics',
    name: 'Applied & Interdisciplinary Physics',
    indonesianName: 'Fisika Terapan & Interdisipliner',
    category: 'Applied',
    icon: '🏥',
    color: '#0575e6',
    accentGrad: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)',
    scale: 'Aplikasi Teknologi',
    description: 'Penerapan prinsip-prinsip fisika pada teknologi revolusioner dan ilmu lain: fisika medis & pencitraan diagnostik (MRI resonansi magnetik nuklir, CT-scan, terapi radiasi sinar-X), biofisika molekuler, fotonika serat optik, geofisika seismik, dan fisika komputasi.',
    keyQuestions: [
      'Bagaimana resonansi magnetik spin proton dalam tubuh menghasilkan gambar visual organ dalam resolusi tinggi pada mesin MRI?',
      'Bagaimana kabel serat optik mentransmisikan data internet gigabit per detik melintasi samudera melalui pemantulan internal sempurna?',
      'Bagaimana gelombang seismik gempa bumi dimanfaatkan geofisikawan untuk memetakan struktur lapisan inti dan mantel Bumi?'
    ],
    subdomains: ['Medical Physics & MRI/CT', 'Biophysics', 'Photonics & Fiber Optics', 'Geophysics & Seismology', 'Computational Physics']
  }
];
