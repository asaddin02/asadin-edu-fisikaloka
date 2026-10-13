# Fisikaloka

**Fisikaloka**, bagian dari Asadin Edu, adalah ruang belajar fisika berbahasa Indonesia untuk **SD, SMP, SMA, universitas, dan pengajar**, dengan tema terang, aksen merah dan logo AI baru. JavaScript ES modules, CSS dan Canvas; tidak ada dependensi runtime pihak ketiga.

## Belajar dan menjelajah

- **61 pelajaran** dengan intuisi, penjelasan, analisis, contoh terurai, aktivitas, kuis dan pembahasan. **25 pendalaman** membahas derivasi atau penyelidikan tambahan.
- Lima jalur: SD 7, SMP 15, SMA 31, universitas 26; ruang pengajar membuka 61 pelajaran termasuk dua modul pedagogi. Pelajaran pendukung dapat muncul di lebih dari satu jalur.
- Pembaca materi, catatan lokal, status membaca, hasil latihan, lanjut belajar, ekspor JSON, salin tautan, cetak materi, dan modul ajar dengan rubrik.
- Jelajah dan pencarian: 28 domain, 86 dossier entitas, 19 persamaan (14 kalkulator), 19 konstanta, 6 dossier eksperimen, dan pelajaran terintegrasi. Graf berisi 45 simpul / 51 relasi.
- 13 laboratorium: proyektil, bandul, Doppler, interferensi, medan listrik, Lorentz, optika, Carnot, relativitas, orbit, Bohr, Venturi, rangkaian DC. Asumsi serta batas model ditampilkan.

[Matriks materi](docs/rebuild/TOPIC_COVERAGE.md) memetakan **252/252 butir materi dan 41/41 butir pendidikan** dalam master checklist ke pelajaran. Ini cakupan instruksional modul ringkas, **bukan klaim seluruh mata kuliah atau seluruh 644 requirement lama sudah terverifikasi penuh**. Rujukan tersedia; kelengkapan pemetaan tidak membuktikan kebenaran setiap klaim ilmiah. Status review dossier lama tetap dinyatakan sesuai buktinya.

Lihat [laporan perombakan dan validasi](docs/rebuild/REBUILD_REPORT.md). [Audit awal](docs/audit/AUDIT_REPORT.md) dipertahankan sebagai riwayat sebelum perombakan; inventaris dan skor di sana bukan penilaian versi baru.

## Menjalankan

Node.js 22 atau lebih baru (diuji pada Node 24).

```bash
npm start
```

Buka `http://127.0.0.1:8088`. `PORT` dan `HOST` dapat disesuaikan. Server hanya menyajikan aset publik. Seluruh fitur utama berjalan tanpa API eksternal. Referensi bacaan memerlukan koneksi internet.

Progres dan catatan menggunakan localStorage per origin/perangkat. Tidak ada akun, sinkronisasi cloud atau service worker/offline cache. Ekspor JSON adalah salinan arsip; belum ada fitur impor. Progres membaca dan hasil latihan dipisahkan; satu kuis tidak dianggap sertifikasi penguasaan.

## Pengujian

```bash
npm ci
npm test
npx playwright install chromium
npm run test:browser
npm run test:accessibility
npm run coverage
npm run test:build
```

Browser tests menjalankan server terisolasi pada port bebas. Chrome lokal dipakai bila tersedia; jika tidak, Chromium Playwright. `CHROME_BIN` dapat menunjuk executable kompatibel. JSON, screenshot dan contoh PDF modul ajar ditulis ke `test-results/`. Workflow CI tersedia di `.github/workflows/checks.yml`; belum dijalankan di GitHub sampai perubahan dipush.

Tes mencakup integritas isi, model numerik, keamanan server, 191 tujuan katalog, semua kuis, seluruh modul simulasi, persistensi, ekspor, cetak, navigasi keyboard, menu ponsel, enam ukuran viewport serta pemindaian axe. Pemindaian otomatis bukan sertifikasi WCAG, review ahli fisika, atau pengujian perangkat nyata.

## Deployment

```bash
npm run build
```

Unggah **isi `dist/`** ke hosting statis yang mendukung ES modules dan MIME JavaScript/CSS yang benar. Folder ini hanya berisi HTML, manifest, CSS, JavaScript, aset publik, `robots.txt`, dan `_headers` (CSP serta header keamanan yang sama dengan server Node; dibaca Cloudflare Pages dan Netlify). Routing memakai path asli (`/learn`, `/entity/gravity`): build menulis satu berkas HTML pra-render per halaman (misalnya `dist/entity/gravity.html`, disajikan Cloudflare Pages di `/entity/gravity`) beserta `sitemap.xml`, dan `404.html` berisi shell aplikasi untuk alamat lain. Situs harus dipasang di root origin, bukan subdirektori. Tidak perlu mengunggah source server, tes, docs atau `node_modules`. `SITE_URL=https://alamat-situs npm run build` menambahkan canonical, `og:url`, dan `og:image` absolut untuk pratinjau tautan.

### Cloudflare Pages (disarankan)

1. Buat API token Cloudflare dengan izin **Account · Cloudflare Pages · Edit**, lalu salin **Account ID** dari **Workers & Pages**.
2. Di GitHub, buka **Settings → Secrets and variables → Actions**. Isi secret `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID`, serta variable `CLOUDFLARE_PAGES_PROJECT` (`fisikaloka`; situs terbit di custom domain https://fisikaloka.asadinedu.com, dan `fisikaloka.pages.dev` dialihkan ke sana). Opsional: variable `SITE_URL` untuk domain sendiri.
3. Workflow [Deploy](.github/workflows/deploy.yml) berjalan setiap **Application checks** lulus di `main`, atau jalankan manual dari tab **Actions**. Sebelum variable diisi, workflow ini dilewati.

Tanpa GitHub Actions: `npm run build`, lalu unggah folder `dist/` lewat **Workers & Pages → Create → Pages → Upload assets**, atau `npx wrangler pages deploy dist --project-name <nama>`.

Alternatif server Node:

```bash
HOST=0.0.0.0 PORT=8088 NODE_ENV=production npm start
```

Letakkan di belakang HTTPS/reverse proxy untuk penggunaan publik. Server menyediakan CSP, nosniff, pembatasan GET/HEAD dan perlindungan traversal. Pada hosting statis tanpa dukungan `_headers`, konfigurasikan header setara melalui pengaturan provider. Tombol salin menggunakan Clipboard API pada secure context dan memberikan petunjuk salin manual bila tidak tersedia.

Perombakan ini menyiapkan paket deploy lokal; belum menerbitkan aplikasi ke domain/hosting publik. [Logo](assets/brand/logo-ai.png) dibuat melalui tool imagegen bawaan; [prompt dan provenance](docs/rebuild/BRAND_PROMPT.md) disimpan bersama proyek.
