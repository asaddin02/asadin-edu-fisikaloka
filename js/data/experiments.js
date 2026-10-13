// Fisikaloka · Landmark Historical & Modern Experiments Explorer

export const PHYSICS_EXPERIMENTS = [
  {
    id: 'young-double-slit',
    name: 'Young’s Double-Slit Experiment',
    indonesianName: 'Eksperimen Celah Ganda Young',
    year: '1801 (dan versi kuantum elektron 1961/1974)',
    scientist: 'Thomas Young (kemudian Claus Jönsson & Tonomura)',
    domainId: 'optics',
    relatedLaw: 'Prinsip Superposisi & Dualisme Gelombang-Partikel',
    objective: 'Membuktikan sifat gelombang cahaya melalui interferensi dan (pada versi kuantum) menunjukkan dualisme gelombang-partikel dari partikel tunggal.',
    apparatus: [
      'Sumber cahaya monokromatik (atau senapan berkas elektron tunggal)',
      'Penghalang pertama celah tunggal untuk menghasilkan muka gelombang koheren',
      'Pelat dengan dua celah sempit sejajar berjarak d (sub-milimeter)',
      'Layar pengamatan atau detektor deteksi partikel peka foton/elektron berjarak D'
    ],
    variables: {
      independent: 'Jarak pisah antar celah (d), panjang gelombang (λ), dan jarak ke layar (D)',
      dependent: 'Jarak antar pita terang/gelap pada pola interferensi di layar (y)',
      controlled: 'Intensitas berkas cahaya dan medium perambatan (udara/vakum)'
    },
    setupDescription: 'Seberkas cahaya monokromatik dilewatkan melalui dua celah sempit paralel. Masing-masing celah bertindak sebagai sumber gelombang sekunder koheren yang saling tumpang tindih dalam ruang menuju layar.',
    observations: 'Di layar muncul serangkaian garis pita terang bergantian dengan pita gelap yang simetris dari pusat layar, bukan hanya dua garis lurus bayangan celah seperti yang diprediksi oleh teori partikel klasik korpuskular Newton.',
    results: 'Jarak antar puncak interferensi terang memenuhi rumus y = (m · λ · D) / d, di mana m = 0, ±1, ±2... Pola ini hanya dapat dijelaskan jika cahaya memiliki sifat gelombang.',
    interpretation: 'Pita terang terbentuk saat gelombang dari kedua celah tiba sefase (interferensi konstruktif; beda lintasan = m·λ), sedangkan pita gelap terbentuk saat gelombang tiba dengan beda fase 180° (interferensi destruktif; beda lintasan = (m + ½)·λ). Ketika diuji dengan elektron tunggal satu per satu, pola interferensi tetap terbentuk secara statistik seiring waktu!',
    historicalSignificance: 'Menumbangkan dominasi teori partikel korpuskular Newton selama 100 tahun dan menjadi bukti terkuat optika gelombang. Versi kuantumnya disebut Richard Feynman sebagai "jantung terdalam misteri mekanika kuantum".',
    educationalExplanation: 'Bayangkan melempar dua batu ke dalam kolam tenang secara bersamaan. Riak-riak air yang memancar dari kedua titik akan saling silang. Di beberapa tempat puncak riak bertemu puncak riak lain sehingga air naik dua kali lipat, sementara di tempat lain puncak riak bertemu lembah sehingga permukaan air tetap tenang datar.'
  },
  {
    id: 'cavendish-torsion-balance',
    name: 'Cavendish Torsion Balance Experiment',
    indonesianName: 'Eksperimen Neraca Torsi Cavendish',
    year: '1798',
    scientist: 'Henry Cavendish',
    domainId: 'gravitation',
    relatedLaw: 'Hukum Gravitasi Universal Newton',
    objective: 'Mengukur gaya gravitasi yang sangat lemah antara massa laboratorium untuk menentukan densitas rata-rata Bumi dan menghitung Konstanta Gravitasi Universal (G).',
    apparatus: [
      'Batang ringan horizontal sepanjang 1.8 meter dengan dua bola timbal kecil (m) di kedua ujungnya',
      'Kawat serat torsi tipis penggantung batang',
      'Dua bola timbal raksasa bermassa 158 kg (M) yang dapat diposisikan dekat bola kecil',
      'Cermin kecil pada kawat torsi dan teleskop teropong untuk membaca defleksi sudut cahaya tanpa gangguan angin'
    ],
    variables: {
      independent: 'Jarak posisi bola timbal besar terhadap bola timbal kecil (r)',
      dependent: 'Sudut puntiran (defleksi) serat kawat torsi (θ)',
      controlled: 'Massa bola timbal, temperatur ruangan, dan isolasi dari hembusan arus udara'
    },
    setupDescription: 'Cavendish menempatkan seluruh peralatan di dalam ruangan tertutup berlantai kayu tebal untuk menghindari fluktuasi termal dan angin sekecil apa pun, lalu mengamati puntiran kawat dari luar ruangan menggunakan teleskop.',
    observations: 'Ketika bola timbal raksasa didekatkan pada bola kecil, batang horizontal berputar perlahan dengan sudut sangat kecil hingga torsi elastis kawat penahan mengimbangi gaya tarik gravitasi.',
    results: 'Cavendish menentukan massa jenis rata-rata Bumi adalah 5.448 kali massa jenis air (hanya meleset ~1% dari nilai modern 5.515 g/cm³). Dari data ini, diperoleh konstanta gravitasi G ≈ 6.74 × 10⁻¹¹ m³/(kg·s²).',
    interpretation: 'Gravitasi adalah gaya universal intrinsik antara seluruh materi bermassa, bukan hanya antara benda langit dan Bumi. Gaya gravitasi antara dua massa 1 kg pada jarak 1 meter sangat lemah (hanya beberapa puluh pikonewton).',
    historicalSignificance: 'Sering disebut sebagai eksperimen pertama yang berhasil "menimbang massa planet Bumi" dan menetapkan skala massa tata surya.',
    educationalExplanation: 'Gravitasi Bumi terasa kuat karena massa Bumi luar biasa besar (~6 triliun triliun ton). Tetapi antara dua benda di meja Anda, gaya gravitasi sebenarnya ada meski sangat kecil sampai-sampai kita butuh neraca torsi super sensitif untuk mendeteksinya.'
  },
  {
    id: 'photoelectric-effect-exp',
    name: 'Photoelectric Effect Experiment',
    indonesianName: 'Eksperimen Efek Fotolistrik',
    year: '1887 (Hertz), 1902 (Lenard), 1905 (Analisis Einstein)',
    scientist: 'Heinrich Hertz, Philipp Lenard, & Albert Einstein',
    domainId: 'quantum',
    relatedLaw: 'Relasi Kuantum Planck-Einstein & Fungsi Kerja Logam',
    objective: 'Menyelidiki pelepasan elektron dari pelat logam ketika disinari oleh radiasi elektromagnetik dan menguji ketergantungannya pada frekuensi versus intensitas cahaya.',
    apparatus: [
      'Tabung kuarsa hampa udara dengan elektroda katoda logam dan anoda pengumpul',
      'Sumber cahaya monokromatik dengan filter panjang gelombang yang dapat diubah',
      'Sumber tegangan pembalik variabel (stopping potential / potensial henti V_0)',
      'Mikro-amperemeter peka untuk mendeteksi arus fotoelektron'
    ],
    variables: {
      independent: 'Frekuensi cahaya datang (f) dan intensitas / kecerahan berkas cahaya',
      dependent: 'Arus listrik fotoelektron dan energi kinetik maksimum elektron (E_k,max = e·V₀)',
      controlled: 'Jenis material katoda logam dan luas permukaan penyinaran'
    },
    setupDescription: 'Cahaya diarahkan ke permukaan logam katoda. Jika elektron terlempar keluar, arus mengalir ke anoda. Potensial henti negatif dinaikkan secara bertahap sampai arus tepat menjadi nol untuk mengukur energi kinetik elektron tercepat.',
    observations: '1) Elektron terlempar secara instan (tanpa jeda waktu pemanasan) hanya jika frekuensi cahaya di atas batas ambang tertentu (f₀). 2) Menaikkan intensitas cahaya hanya menambah jumlah elektron yang lepas, tidak menambah energinya. 3) Cahaya merah yang sangat terang gagal melepaskan elektron, sedangkan cahaya ultraviolet redup mampu melepaskannya seketika!',
    results: 'Grafik potensial henti V₀ terhadap frekuensi f menghasilkan garis lurus sempurna dengan kemiringan h/e: e·V₀ = h·f - Φ (di mana Φ adalah fungsi kerja logam).',
    interpretation: 'Cahaya merambat dan diserap bukan sebagai gelombang kontinu, melainkan sebagai paket kuantum energi diskret yang disebut foton (E = hf). Satu foton berinteraksi satu-lawan-satu dengan satu elektron.',
    historicalSignificance: 'Menganugerahi Albert Einstein Penghargaan Nobel Fisika 1921 dan melahirkan mekanika kuantum modern serta teknologi sel surya dan sensor sensor kamera digital (CMOS).',
    educationalExplanation: 'Ibaratkan mesin penjual otomatis yang hanya menerima koin Rp 5.000. Memasukkan seribu koin Rp 100 secara beruntun tidak akan mengeluarkan barang (cahaya merah intensitas tinggi). Tetapi memasukkan satu koin Rp 5.000 langsung mengeluarkan barang seketika (foton UV berenergi tinggi).'
  },
  {
    id: 'rutherford-gold-foil',
    name: 'Rutherford Gold Foil Experiment',
    indonesianName: 'Eksperimen Hamburan Lempeng Emas Rutherford',
    year: '1909 – 1911',
    scientist: 'Ernest Rutherford, Hans Geiger, & Ernest Marsden',
    domainId: 'atomic',
    relatedLaw: 'Hamburan Coulomb & Model Atom Berinti',
    objective: 'Menguji keabsahan model atom "Roti Kismis" J.J. Thomson dengan menembakkan partikel alfa bermuatan positif ke lempeng tipis emas murni.',
    apparatus: [
      'Sumber radioaktif Radium pemancar partikel alfa (inti Helium-4, bermuatan +2e)',
      'Kolimator timbal untuk menghasilkan berkas partikel alfa sempit',
      'Lempeng emas murni setebal beberapa ratus atom (~0.0004 mm)',
      'Layar fluoresens seng sulfida (ZnS) yang memancarkan kilatan cahaya kecil saat tertumbuk partikel alfa, dipantau dengan mikroskop berputar'
    ],
    variables: {
      independent: 'Sudut hamburan deteksi (θ dari 0° sampai 180°)',
      dependent: 'Jumlah kilatan partikel alfa per satuan waktu pada sudut tersebut',
      controlled: 'Ketebalan lempeng emas dan energi kinetik partikel alfa'
    },
    setupDescription: 'Berkas partikel alfa diarahkan tegak lurus pada lempeng tipis emas. Detektor mikroskop diputar mengelilingi target untuk menghitung partikel yang terbelokkan ke segala sudut.',
    observations: 'Sebagian besar partikel alfa (lebih dari 99%) menembus lempeng emas lurus tanpa mengalami pembelokan. Namun, sekitar 1 dari 8,000 partikel terpental balik dengan sudut sangat tajam (lebih dari 90° hingga mendekati 180°).',
    results: 'Distribusi sudut hamburan cocok persis dengan rumus hamburan Coulomb elastis Rutherford: N(θ) ∝ 1 / sin⁴(θ/2).',
    interpretation: 'Atom sebagian besar terdiri dari ruang hampa kosong. Seluruh muatan positif atom dan hampir seluruh massanya terkonsentrasi pada wilayah pusat yang luar biasa padat dan kecil (~1/100,000 ukuran atom) yang dinamakan INTI ATOM (nukleus).',
    historicalSignificance: 'Runtuhnya model Thomson dan lahirnya model atom modern berinti yang membuka jalan bagi model Bohr dan fisika nuklir.',
    educationalExplanation: 'Rutherford mengibaratkan keterkejutannya: "Ini sama luar biasanya seperti Anda menembakkan peluru meriam 15 inci ke selembar kertas tisu, dan peluru itu memantul kembali lalu mengenai Anda sendiri!"'
  },
  {
    id: 'michelson-morley',
    name: 'Michelson-Morley Interferometer Experiment',
    indonesianName: 'Eksperimen Interferometer Michelson-Morley',
    year: '1887',
    scientist: 'Albert A. Michelson & Edward W. Morley',
    domainId: 'special-relativity',
    relatedLaw: 'Invariansi Kelajuan Cahaya & Postulat Einstein',
    objective: 'Mendeteksi gerak relatif Bumi terhadap medium "eter bercahaya" (luminiferous aether) yang dihipotesiskan sebagai medium perambatan gelombang cahaya di ruang angkasa.',
    apparatus: [
      'Interferometer optik presisi tinggi yang dipasang di atas blok batu granit seberat 1.5 ton yang diapungkan di kolam air raksa cair untuk isolasi getaran',
      'Cermin pemecah berkas (beam splitter 50/50)',
      'Dua cermin pantul datar yang tegak lurus satu sama lain (lengan ortogonal)',
      'Teleskop pengamatan pola cincin interferensi'
    ],
    variables: {
      independent: 'Orientasi sudut rotasi interferometer relatif terhadap arah orbit Bumi mengelilingi Matahari (~30 km/s)',
      dependent: 'Pergeseran garis-garis pita interferensi pada layar teleskop',
      controlled: 'Panjang jalur optik kedua lengan dan stabilitas suhu'
    },
    setupDescription: 'Satu berkas cahaya dipecah menjadi dua berkas yang merambat pada arah saling tegak lurus, memantul di cermin, lalu bersatu kembali menghasilkan pola interferensi. Jika eter ada, salah satu lengan akan mengalami "hambatan angin eter" sehingga terjadi pergeseran fase saat alat diputar.',
    observations: 'Tidak ada pergeseran pola interferensi sama sekali yang dapat dideteksi dalam batas ketelitian eksperimen (hasil nol / null result).',
    results: 'Kecepatan cahaya terukur sama persis pada semua arah rotasi, tanpa terpengaruh oleh kelajuan orbit Bumi sebesar 30 km/detik.',
    interpretation: 'Medium hipotesis "eter luminiferus" TIDAK PERNAH ADA. Cahaya tidak memerlukan medium materi apa pun untuk merambat, dan kelajuan cahaya c konstan bagi semua pengamat terlepas dari gerak relatif sumbernya.',
    historicalSignificance: 'Sering dipuji sebagai "eksperimen gagal paling terkenal dan berharga dalam sejarah sains", yang memicu Albert Einstein merumuskan Teori Relativitas Khusus pada 1905.',
    educationalExplanation: 'Jika Anda berenang melawan arus sungai, waktu tempuh Anda bolak-balik berbeda dibanding menyeberangi sungai tegak lurus. Michelson menguji apakah cahaya mengalami efek arus serupa saat Bumi mengarungi ruang angkasa, dan jawabannya adalah: cahaya tidak peduli arah, kecepatannya selalu mutlak!'
  },
  {
    id: 'millikan-oil-drop',
    name: 'Millikan Oil Drop Experiment',
    indonesianName: 'Eksperimen Tetes Minyak Millikan',
    year: '1909',
    scientist: 'Robert A. Millikan & Harvey Fletcher',
    domainId: 'electricity',
    relatedLaw: 'Kuantisasi Muatan Listrik & Hukum Stokes',
    objective: 'Mengukur magnitudo muatan listrik terkecil yang ada di alam (muatan elementer e) dan membuktikan bahwa muatan listrik terkuantisasi secara diskret.',
    apparatus: [
      'Atomizer (alat semprot halus) untuk menghasilkan tetesan minyak mikroskopis',
      'Dua pelat logam paralel horizontal yang dihubungkan ke sumber tegangan tinggi DC ribuan volt',
      'Sumber sinar-X lemah untuk mengionisasi udara dan memberi muatan pada tetesan minyak',
      'Mikroskop dengan kisi pengukur waktu untuk melacak laju gerak satu tetes minyak'
    ],
    variables: {
      independent: 'Beda potensial listrik antar pelat (V) dan medan listrik (E = V/d)',
      dependent: 'Kecepatan terminal tetesan minyak saat jatuh bebas dan saat terangkat naik melawan gravitasi',
      controlled: 'Viskositas udara atmosfer, massa jenis minyak, dan jarak antar pelat'
    },
    setupDescription: 'Tetesan minyak bermuatan dijatuhkan di antara dua pelat logam bertegangan. Gaya gravitasi dan gaya apung diimbangi oleh gaya gesek udara (hukum Stokes) dan gaya elektrostatik vertikal ke atas (F_e = q·E).',
    observations: 'Dengan mengatur tegangan listrik, tetesan minyak tertentu dapat dibuat melayang diam, naik ke atas dengan kecepatan konstan, atau jatuh bebas.',
    results: 'Setiap nilai muatan yang diukur selalu merupakan kelipatan bilangan bulat dari nilai fundamental: q = n · e, dengan e ≈ 1.60 × 10⁻¹⁹ Coulomb (n = ±1, ±2, ±3...). Tidak pernah ditemukan pecahan muatan seperti 0.5e.',
    interpretation: 'Muatan listrik tidak kontinu seperti cairan, melainkan tersusun atas unit-unit kuantum diskret terkecil (muatan elektron).',
    historicalSignificance: 'Membuktikan realitas partikel elektron bebas dan mengantarkan Millikan meraih Hadiah Nobel Fisika tahun 1923.',
    educationalExplanation: 'Bayangkan Anda menimbang banyak kantung kelereng tertutup tanpa bisa melihat isinya. Jika bobot bersih kantung-kantung itu selalu bernilai 5 gram, 10 gram, 15 gram, atau 20 gram, Anda dapat menyimpulkan dengan pasti bahwa sebutir kelereng memiliki massa tepat 5 gram.'
  }
];

// Source scope is explicit: teaching summaries are not verbatim reconstructions of apparatus.
const experimentSources = {
  'young-double-slit': ['Feynman I.30 — Interference', 'https://www.feynmanlectures.caltech.edu/I_30.html'],
  'cavendish-torsion-balance': ['Cavendish 1798 — Royal Society archive', 'https://makingscience.royalsociety.org/items/l-and-p_11_68/paper-experiments-to-determine-the-density-of-the-earth-by-henry-cavendish'],
  'photoelectric-effect-exp': ['OpenStax University Physics 3 §6.2', 'https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect'],
  'rutherford-gold-foil': ['Rutherford — Nobel biography', 'https://www.nobelprize.org/prizes/chemistry/1908/rutherford/biographical/'],
  'michelson-morley': ['Feynman I.15 — Special Relativity', 'https://www.feynmanlectures.caltech.edu/I_15.html'],
  'millikan-oil-drop': ['Millikan — Nobel lecture', 'https://www.nobelprize.org/prizes/physics/1923/millikan/lecture/']
};
for (const record of PHYSICS_EXPERIMENTS) {
  const [title, url] = experimentSources[record.id];
  record.sources = [{title, url, scope: 'Prinsip dan konteks eksperimen; rincian historis/peralatan belum seluruhnya diverifikasi.'}];
  record.reviewStatus = 'PARTIAL';
}
const michelson = PHYSICS_EXPERIMENTS.find(e => e.id === 'michelson-morley');
michelson.results = 'Pergeseran interferensi jauh lebih kecil daripada prediksi model eter diam sederhana; hasil disebut null dalam sensitivitas eksperimen.';
michelson.interpretation = 'Hasil menantang model angin eter yang diuji dan konsisten dengan relativitas khusus. Satu eksperimen tidak membuktikan semua kemungkinan model eter mustahil atau mengukur setiap postulat relativitas secara terpisah.';
michelson.historicalSignificance = 'Menjadi salah satu hasil penting dalam perkembangan elektrodinamika dan relativitas. Hubungan pengaruh langsung pada Einstein tidak disimpulkan hanya dari hasil eksperimen ini.';
const young = PHYSICS_EXPERIMENTS.find(e => e.id === 'young-double-slit');
young.year = '1801 (cahaya; eksperimen elektron dikembangkan kemudian)';
young.scientist = 'Thomas Young (versi optik)';
const cavendish = PHYSICS_EXPERIMENTS.find(e => e.id === 'cavendish-torsion-balance');
cavendish.results = 'Eksperimen mengestimasi densitas rata-rata Bumi sekitar 5.5 kali densitas air. Dalam notasi modern, metode neraca torsi juga dapat digunakan untuk menentukan G.';
cavendish.apparatus[3] = 'Sistem pembacaan defleksi batang dari luar ruang tertutup; rincian alat asli perlu dicocokkan dengan naskah 1798.';
const photo = PHYSICS_EXPERIMENTS.find(e => e.id === 'photoelectric-effect-exp');
photo.observations = 'Di atas frekuensi ambang bahan, emisi terjadi tanpa jeda yang diprediksi pemanasan klasik. Pada rezim satu foton, menaikkan intensitas menambah arus fotoelektron; energi maksimum mengikuti frekuensi. Ambang warna bergantung jenis material.';
photo.interpretation = 'Absorpsi energi terkuantisasi memberi K_max = hf − Φ. Model satu foton menjelaskan frekuensi ambang dan potensial henti; bukan pernyataan bahwa cahaya tidak pernah menunjukkan sifat gelombang.';
photo.results = 'Potensial henti mengikuti eV_s = hf − Φ dalam model ideal, dengan kemiringan h/e dan ketidakpastian eksperimen.';
const millikan = PHYSICS_EXPERIMENTS.find(e => e.id === 'millikan-oil-drop');
millikan.objective = 'Menentukan muatan elementer dari tetesan minyak bermuatan dan menguji pola kelipatan diskret muatan bebas.';
millikan.interpretation = 'Muatan tetesan yang teramati sesuai kelipatan muatan elementer. Quark memiliki muatan pecahan e tetapi tidak diamati sebagai partikel bebas terisolasi.';
