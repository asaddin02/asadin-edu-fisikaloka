// Fisikaloka · Comprehensive Curriculum & Learning Paths (SD, SMP, SMA, University, Educator)

export const CURRICULUM_DATA = {
  levels: [
    {
      id: 'sd',
      title: 'Tingkat SD (Dasar & Intuisi)',
      subtitle: 'Memahami Cara Kerja Benda & Fenomena Sehari-hari',
      badge: 'SD / Primary',
      color: '#38ef7d',
      description: 'Fokus pada intuisi fisik, pengamatan langsung lingkungan sekitar, eksperimen sederhana di rumah, dan pemahaman mengapa sesuatu bergerak, bersuara, atau menghasilkan cahaya.',
      modules: [
        {
          id: 'sd-gerak-gaya',
          title: 'Benda, Gerak, dan Gaya',
          icon: '⚽',
          duration: '3 Jam Belajar',
          summary: 'Bagaimana dorongan dan tarikan membuat benda diam mulai bergerak, melambat, atau berubah arah.',
          lessons: [
            {
              id: 'sd-1-1',
              title: 'Dorongan dan Tarikan di Sekitar Kita',
              concepts: ['Gaya itu apa?', 'Mengapa bola menggelinding berhenti?', 'Pengaruh permukaan kasar dan licin'],
              takeaway: 'Gaya adalah tarikan atau dorongan. Tanpa dorongan awal atau tarikan gravitasi, benda diam tidak akan bergerak dengan sendirinya.',
              activity: 'Coba gelindingkan bola di atas lantai keramik licin vs di atas karpet berbulu tebal. Bandingkan mana yang berhenti lebih cepat!'
            },
            {
              id: 'sd-1-2',
              title: 'Gravitasi: Mengapa Semua Benda Jatuh ke Bawah?',
              concepts: ['Bumi menarik kita', 'Tidak ada yang melayang jatuh ke langit', 'Perbedaan berat di Bumi dan Bulan'],
              takeaway: 'Bumi memiliki gravitasi yang menarik semua benda ke arah pusatnya sehingga kita tidak terbang melayang ke luar angkasa.',
              activity: 'Jatuhkan selembar kertas datar bersamaan dengan selembar kertas yang diremas menjadi bola padat. Amati mana yang jatuh lebih cepat dan mengapa udara mempengaruhi kertas datar!'
            }
          ]
        },
        {
          id: 'sd-energi-panas',
          title: 'Energi, Panas, dan Suara',
          icon: '☀️',
          duration: '4 Jam Belajar',
          summary: 'Mengenal bentuk-bentuk energi: panas dari api dan matahari, serta getaran yang menghasilkan bunyi musik.',
          lessons: [
            {
              id: 'sd-2-1',
              title: 'Matahari dan Sumber Kalor',
              concepts: ['Matahari sumber energi terbesar', 'Benda penghantar panas vs penahan panas', 'Es mencair'],
              takeaway: 'Panas dapat berpindah dari benda yang lebih hangat ke benda yang lebih dingin sampai keduanya bersuhu sama.',
              activity: 'Pegang sendok logam dan sendok kayu yang sama-sama dimasukkan ke segelas air hangat. Sendok mana yang ujungnya terasa hangat lebih dulu?'
            },
            {
              id: 'sd-2-2',
              title: 'Getaran dan Suara Musik',
              concepts: ['Suara berasal dari benda yang bergetar', 'Nada tinggi dan nada rendah', 'Suara butuh udara'],
              takeaway: 'Semua bunyi dihasilkan oleh getaran. Jika Anda memegang tenggorokan saat berbicara, Anda bisa merasakan getaran pita suara.',
              activity: 'Rentangkan karet gelang di atas kotak tisu kosong lalu petik. Lihat bagaimana getaran karet menghasilkan bunyi!'
            }
          ]
        },
        {
          id: 'sd-cahaya-magnet',
          title: 'Cahaya, Bayangan, dan Magnet Ajaib',
          icon: '🧲',
          duration: '3 Jam Belajar',
          summary: 'Menyelidiki bagaimana bayangan terbentuk, cermin memantulkan wajah, dan magnet menarik logam.',
          lessons: [
            {
              id: 'sd-3-1',
              title: 'Cahaya Merambat Lurus & Bayangan Kita',
              concepts: ['Cahaya merambat lurus', 'Benda tembus pandang vs benda gelap', 'Panjang bayangan di pagi dan siang hari'],
              takeaway: 'Bayangan terbentuk karena cahaya merambat lurus dan tidak bisa menembus benda gelap yang menghalanginya.',
              activity: 'Nyalakan senter di ruangan gelap dan buat bayangan boneka di dinding. Dekatkan dan jauhkan senter untuk melihat ukuran bayangan berubah!'
            },
            {
              id: 'sd-3-2',
              title: 'Kutub Magnet: Tarik dan Tolak',
              concepts: ['Kutub utara dan selatan', 'Kutub sejenis tolak-menolak', 'Benda yang ditarik magnet (besi, nikel)'],
              takeaway: 'Kutub magnet yang berbeda saling menarik (Utara dan Selatan), sedangkan kutub yang sama saling mendorong menjauh.',
              activity: 'Dekatkan dua magnet kulkas dengan kutub senama berhadapan. Rasakan gaya tak terlihat yang menolak tangan Anda!'
            }
          ]
        }
      ]
    },
    {
      id: 'smp',
      title: 'Tingkat SMP (Menengah)',
      subtitle: 'Konseptual Kuantitatif & Prinsip Dasar Alam',
      badge: 'SMP / Middle School',
      color: '#4facfe',
      description: 'Mulai memperkenalkan besaran fisis terukur, rumus sederhana, diagram gaya, tekanan fluida, rangkaian listrik dasar, dan sifat gelombang.',
      modules: [
        {
          id: 'smp-gerak-lurus',
          title: 'Kinematika: Jarak, Kelajuan, dan Percepatan',
          icon: '⏱️',
          duration: '5 Jam Belajar',
          summary: 'Membedakan jarak vs perpindahan, kelajuan vs kecepatan, serta GLB dan GLBB dengan grafik.',
          lessons: [
            {
              id: 'smp-1-1',
              title: 'Gerak Lurus Beraturan (GLB) & v = s / t',
              concepts: ['Vektor perpindahan', 'Kelajuan konstan', 'Grafik posisi-waktu linier'],
              takeaway: 'Pada GLB, kecepatan benda konstan sehingga percepatannya nol dan grafik s terhadap t berbentuk garis lurus dengan kemiringan sesuai tanda kecepatan.',
              activity: 'Ukur waktu tempuh sepeda melintasi jarak 50 meter dengan stopwatch untuk menghitung kelajuan rata-ratanya.'
            },
            {
              id: 'smp-1-2',
              title: 'Gerak Lurus Berubah Beraturan (GLBB) & Hukum Newton',
              concepts: ['Percepatan a = (v_t - v_0) / t', 'Hukum I, II, dan III Newton', 'F = m · a'],
              takeaway: 'Gaya neto menghasilkan percepatan. Hukum III Newton menegaskan bahwa gaya aksi dan reaksi selalu berpasangan sama besar berlawanan arah pada dua benda berbeda.',
              activity: 'Tiup balon tanpa diikat lalu lepaskan. Udara menyembur ke belakang (aksi) mendorong balon melesat ke depan (reaksi).'
            }
          ]
        },
        {
          id: 'smp-fluida-tekanan',
          title: 'Tekanan Zat Cair & Hukum Archimedes',
          icon: '⛵',
          duration: '4 Jam Belajar',
          summary: 'Mengapa kapal laut baja bisa terapung dan bagaimana rem hidrolik melipatgandakan gaya kaki pengemudi.',
          lessons: [
            {
              id: 'smp-2-1',
              title: 'Tekanan Hidrostatis (P = ρ·g·h)',
              concepts: ['Tekanan bertambah seiring kedalaman', 'Hukum Bejana Berhubungan', 'Hukum Pascal (F₁/A₁ = F₂/A₂)'],
              takeaway: 'Tekanan hidrostatis zat cair hanya dipengaruhi oleh massa jenis dan kedalaman, bukan bentuk wadah.',
              activity: 'Beri tiga lubang bertingkat pada botol plastik berisi air. Amati lubang paling bawah memancarkan air paling jauh karena tekanannya paling tinggi.'
            },
            {
              id: 'smp-2-2',
              title: 'Hukum Archimedes & Gaya Apung',
              concepts: ['Gaya ke atas Fa = ρ · g · V_celup', 'Terapung, melayang, dan tenggelam'],
              takeaway: 'Benda terapung bila massa jenis rata-ratanya lebih kecil dari massa jenis cairan.',
              activity: 'Bentuk plastisin menjadi bola (akan tenggelam), lalu bentuk plastisin yang sama menjadi perahu berongga (akan terapung).'
            }
          ]
        },
        {
          id: 'smp-listrik-magnet',
          title: 'Rangkaian Listrik Dasar & Hukum Ohm',
          icon: '💡',
          duration: '5 Jam Belajar',
          summary: 'Arus listrik, beda potensial (voltase), hambatan resistor, dan rangkaian seri vs paralel.',
          lessons: [
            {
              id: 'smp-3-1',
              title: 'Hukum Ohm (V = I · R)',
              concepts: ['Arus elektron vs arus konvensional', 'Beda potensial voltase', 'Resistansi'],
              takeaway: 'Kuat arus yang mengalir berbanding lurus dengan voltase dan berbanding terbalik dengan hambatan.',
              activity: 'Gunakan simulator rangkaian interaktif untuk melihat bagaimana mengubah nilai resistor mengubah nyala lampu.'
            },
            {
              id: 'smp-3-2',
              title: 'Rangkaian Seri vs Rangkaian Paralel',
              concepts: ['Rangkaian seri: arus sama, tegangan terbagi', 'Rangkaian paralel: tegangan sama, arus terbagi', 'Korsleting'],
              takeaway: 'Lampu di rumah selalu dipasang paralel agar satu lampu mati tidak membuat seluruh rumah padam.',
              activity: 'Bandingkan nyala dua lampu baterai yang dirangkai seri vs paralel.'
            }
          ]
        }
      ]
    },
    {
      id: 'sma',
      title: 'Tingkat SMA (Komprehensif)',
      subtitle: 'Analisis Matematis, Vektor & Kurikulum Nasional/AP Physics',
      badge: 'SMA / High School',
      color: '#ff9a44',
      description: 'Mencakup seluruh kurikulum fisika komprehensif: mekanika vektor, kekekalan energi dan momentum, rotasi tegar, gravitasi Newton, termodinamika, gelombang & bunyi, induksi Faraday, optika fisis, dan pengantar fisika modern.',
      modules: [
        {
          id: 'sma-mekanika-lanjut',
          title: 'Mekanika Vektor: Gerak Parabola, Gravitasi & Rotasi',
          icon: '🏹',
          duration: '8 Jam Belajar',
          summary: 'Penguraian gerak 2D independen sumbu x dan y, dinamika rotasi momen inersia I, torsi τ, dan hukum Kepler gravitasi.',
          lessons: [
            {
              id: 'sma-1-1',
              title: 'Gerak Parabola & Analisis Vektor 2D',
              concepts: ['v_0x = v_0 cos θ (GLB)', 'v_y = v_0 sin θ - gt (GLBB)', 'Tinggi maksimum & jarak jangkauan'],
              takeaway: 'Gerak parabola adalah perpaduan dua gerak independen: gerak horizontal GLB tanpa percepatan dan gerak vertikal GLBB dengan percepatan gravitasi g.',
              activity: 'Uji simulator proyektil dengan sudut 45° vs 30° dan 60° untuk membuktikan jangkauan maksimum dan sudut komplemen.'
            },
            {
              id: 'sma-1-2',
              title: 'Dinamika Rotasi & Momen Inersia (τ = I · α)',
              concepts: ['Torsi τ = rF sin θ (magnitudo)', 'Momen inersia silinder pejal vs silinder berongga', 'Kekekalan momentum sudut L = I·ω'],
              takeaway: 'Massa yang terdistribusi lebih jauh dari poros rotasi menghasilkan momen inersia lebih besar dan lebih sulit dipercepat berputar.',
              activity: 'Lomba menggelindingkan silinder pejal vs cincin berongga pada bidang miring. Untuk massa dan radius sama, menggelinding tanpa selip dan hambatan lain diabaikan, silinder pejal tiba lebih dahulu.'
            }
          ]
        },
        {
          id: 'sma-termo-gelombang',
          title: 'Termodinamika, Gelombang Bunyi & Efek Doppler',
          icon: '🌡️',
          duration: '7 Jam Belajar',
          summary: 'Hukum Pertama Termodinamika (ΔU = Q - W), siklus mesin kalor Carnot, cepat rambat gelombang, dan pergeseran frekuensi Doppler.',
          lessons: [
            {
              id: 'sma-2-1',
              title: 'Siklus Mesin Carnot & Efisiensi Termal',
              concepts: ['Diagram P-V', 'Proses isotermal dan adiabatik', 'Efisiensi maksimum η = 1 - (T_C / T_H)'],
              takeaway: 'Tidak ada mesin kalor di alam yang efisiensinya melampaui siklus Carnot yang beroperasi di antara dua reservoir suhu yang sama.',
              activity: 'Hitung efisiensi teoretis pembangkit listrik tenaga uap dengan suhu uap 550°C dan pendingin sungai 25°C.'
            },
            {
              id: 'sma-2-2',
              title: 'Gelombang Bunyi & Efek Doppler',
              concepts: ['Cepat rambat bunyi v', 'Taraf intensitas desibel TI = 10 log(I/I_0)', 'f_p = f_s (v ± v_p) / (v ∓ v_s)'],
              takeaway: 'Frekuensi yang didengar bertambah tinggi jika sumber bunyi dan pendengar saling mendekati, dan sebaliknya.',
              activity: 'Amati muka gelombang efek Doppler pada simulator bunyi saat sumber bergerak subsonik dan supersonik.'
            }
          ]
        },
        {
          id: 'sma-listrik-modern',
          title: 'Induksi Elektromagnetik & Relativitas Khusus',
          icon: '⚛️',
          duration: '8 Jam Belajar',
          summary: 'Fluks magnetik, GGL induksi hukum Faraday & Lenz, transformator, postulat Einstein, dilatasi waktu, dan E = mc².',
          lessons: [
            {
              id: 'sma-3-1',
              title: 'Hukum Induksi Faraday & Hukum Lenz',
              concepts: ['Fluks magnetik Φ = B · A cos θ', 'GGL induksi ε = -N (dΦ/dt)', 'Arah arus induksi melawan penyebabnya'],
              takeaway: 'Perubahan fluks magnetik melahirkan medan listrik pusaran yang menggerakkan arus listrik.',
              activity: 'Jatuhkan magnet kuat ke dalam pipa tembaga tebal non-magnetik. Magnet jatuh lambat karena arus eddy Lenz mengeremnya!'
            },
            {
              id: 'sma-3-2',
              title: 'Relativitas Khusus: Waktu yang Relatif & E = mc²',
              concepts: ['Faktor Lorentz γ = 1 / √(1 - v²/c²)', 'Dilatasi waktu jam bergerak', 'Kontraksi panjang & kesetaraan massa-energi'],
              takeaway: 'Waktu dan ruang bukan entitas mutlak independen; keduanya menyatu menjadi ruang-waktu 4D yang terdistorsi oleh kecepatan pengamat.',
              activity: 'Gunakan kalkulator dilatasi waktu untuk menghitung berapa mikrodetik pertambahan umur muon atmosfer yang meluncur pada kelajuan 0.995c.'
            }
          ]
        }
      ]
    },
    {
      id: 'university',
      title: 'Tingkat Universitas (Mendalam & Analitik)',
      subtitle: 'Kalkulus Vektor, Mekanika Kuantum & Teori Medan',
      badge: 'Universitas / Advanced',
      color: '#b388ff',
      description: 'Perumusan analitik tingkat lanjut: Mekanika Lagrangian & Hamiltonian, Elektrodinamika Maxwell 4-persamaan diferensial, Persamaan Schrödinger & Teori Kuantum, Relativitas Umum Einstein, serta Model Standar Partikel.',
      modules: [
        {
          id: 'univ-mekanika-analitik',
          title: 'Mekanika Klasik Analitik (Lagrangian & Hamiltonian)',
          icon: '📐',
          duration: '10 Jam Belajar',
          summary: 'Prinsip Aksi Terkecil Hamilton, persamaan Euler-Lagrange, transformasi koordinat tergeneralisasi, dan Teorema Noether.',
          lessons: [
            {
              id: 'univ-1-1',
              title: 'Prinsip Hamilton & Persamaan Euler-Lagrange',
              concepts: ['Aksi S = ∫ L dt', 'Lagrangian L = T - V', 'd/dt(∂L/∂q̇_i) - ∂L/∂q_i = 0'],
              takeaway: 'Mekanika analitik membebaskan kita dari diagram gaya benda bebas vektor Newton yang rumit dengan menggunakan besaran skalar energi dalam sembarang sistem koordinat tergeneralisasi.',
              activity: 'Turunkan persamaan gerak bandul ganda (double pendulum) menggunakan formulasi Lagrangian.'
            }
          ]
        },
        {
          id: 'univ-maxwell-kuantum',
          title: 'Persamaan Maxwell Diferensial & Mekanika Kuantum',
          icon: '⚡',
          duration: '12 Jam Belajar',
          summary: 'Kalkulus medan vektor gradien, divergensi, curl, radiasi elektromagnetik, dan Persamaan Gelombang Schrödinger di Ruang Hilbert.',
          lessons: [
            {
              id: 'univ-2-1',
              title: 'Empat Persamaan Maxwell dalam Bentuk Diferensial',
              concepts: ['∇·E = ρ/ε₀', '∇·B = 0', '∇×E = -∂B/∂t', '∇×B = μ₀J + μ₀ε₀ ∂E/∂t'],
              takeaway: 'Maxwell menyatukan seluruh fenomena kelistrikan, kemagnetan, dan optika dalam 4 persamaan diferensial kompak yang meramalkan gelombang elektromagnetik berkecepatan c.',
              activity: 'Turunkan persamaan gelombang 3D ∇²E = (1/c²) ∂²E/∂t² dari persamaan curl Maxwell dalam ruang hampa tanpa muatan.'
            },
            {
              id: 'univ-2-2',
              title: 'Persamaan Schrödinger & Sumur Potensial Kuantum',
              concepts: ['iℏ ∂Ψ/∂t = ĤΨ', 'Partikel dalam kotak satu dimensi', 'Kuantisasi energi tingkat n² h² / (8mL²)'],
              takeaway: 'Partikel kuantum terkungkung dalam ruang memiliki spektrum energi yang diskret terpisah, analog dengan gelombang stasioner dawai gitar.',
              activity: 'Hitung probabilitas penerobosan terowongan kuantum (tunneling coefficient) menembus penghalang potensial tebal.'
            }
          ]
        }
      ]
    },
    {
      id: 'educator',
      title: 'Modul Pendidik & Guru (Teaching Toolkit)',
      subtitle: 'Rencana Pembelajaran, Demonstrasi Meja & Pemecah Miskonsepsi',
      badge: 'Educator / Pendidik',
      color: '#f6d365',
      description: 'Panduan pedagogis komprehensif bagi guru fisika dan dosen: strategi mengatasi miskonsepsi siswa yang paling umum, demonstrasi meja laboratorium murah namun berkesan, dan bank evaluasi konseptual.',
      modules: [
        {
          id: 'edu-miskonsepsi',
          title: 'Panduan Mengatasi Miskonsepsi Fisika Siswa',
          icon: '💡',
          duration: 'Modul Guru',
          summary: 'Daftar 10 miskonsepsi paling sering dialami siswa dari tingkat dasar sampai kuliah beserta strategi sanggahannya.',
          lessons: [
            {
              id: 'edu-1-1',
              title: 'Miskonsepsi Gaya & Gerak (Hukum Newton)',
              concepts: ['Gaya dorong tidak tersimpan di benda', 'Benda bergerak tidak selalu memiliki gaya neto', 'Aksi dan reaksi pada benda yang berbeda'],
              takeaway: 'Gunakan eksperimen kontradiksi langsung (predict-observe-explain) untuk memaksa siswa merekonstruksi intuisi fisika mereka.',
              activity: 'Minta siswa memprediksi apakah bola bowling dan bola tenis yang dijatuhkan bersamaan di tabung hampa udara akan jatuh bersamaan atau tidak.'
            }
          ]
        },
        {
          id: 'edu-demo-meja',
          title: 'Koleksi Demonstrasi Meja Kelas Murah & Spektakuler',
          icon: '🧪',
          duration: 'Modul Laboratorium',
          summary: 'Demonstrasi menggunakan barang sehari-hari yang dapat disiapkan dalam 5 menit namun memberikan dampak pemahaman seumur hidup.',
          lessons: [
            {
              id: 'edu-2-1',
              title: 'Demonstrasi Momen Inersia dengan Tabung Kaleng Sup',
              concepts: ['Beda distribusi massa', 'Kaleng sup kental vs kaleng kaldu cair saat menggelinding', 'Transfer energi rotasi vs translasi'],
              takeaway: 'Zat cair di dalam kaleng tidak ikut berputar seketika, sehingga memiliki inersia rotasi lebih kecil dibanding cairan beku/padat dan melaju lebih cepat di bidang miring!',
              activity: 'Bawa dua kaleng dengan ukuran dan bobot sama ke kelas (satu berisi kaldu encer, satu berisi sup kental padat) lalu lombakan di turunan meja.'
            }
          ]
        }
      ]
    }
  ]
};
