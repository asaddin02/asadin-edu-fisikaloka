# Tugas Gemini: melengkapi materi Fisikaloka

> Berkas ini adalah instruksi tugas untuk Gemini. Baca seluruhnya di awal setiap sesi, lalu baca `materi-gemini/README.md` (kalau sudah ada) untuk melanjutkan dari tempat sesi sebelumnya berhenti.

Repo: https://github.com/asaddin02/asadin-edu-fisikaloka
Situs: https://fisikaloka.asadinedu.com

## Latar

Fisikaloka adalah ruang belajar fisika berbahasa Indonesia untuk lima jenjang: SD, SMP, SMA, universitas, dan pengajar. Situs ini sudah punya materi, entitas (besaran, hukum, fenomena), persamaan dengan kalkulator, dan pendalaman, tetapi **banyak topik yang belum ada atau masih tipis.**

Tugasmu: **riset sebebas dan seluas mungkin, lalu tulis materi fisika yang kurang selengkap-lengkapnya di satu folder baru.** Kamu cukup menulis materinya. Setelah itu, Claude Code memindahkan materimu ke struktur data Fisikaloka supaya tampil di situs, dan Codex merapikan tampilannya.

## Cari sendiri apa yang kurang

- Jelajahi situsnya dan isi repo, terutama `js/data/courses/`, `js/data/entities.js`, `js/data/equations.js`, dan `js/data/courses/deep-dives.js`.
- Baca daftar celah di `docs/audit/AUDIT_REPORT.md` (bagian MISSING). Sebagai gambaran, celah itu antara lain:
  - angka penting dan ketidakpastian, vektor, gaya normal dan tegangan tali, gaya sentripetal, daya;
  - hukum Pascal, viskositas, resonansi, gelombang berdiri, pemuaian, mesin pendingin;
  - kapasitansi, arus bolak-balik, induktansi, transformator;
  - cermin dan alat optik, polarisasi, laser, momentum relativistik, peluruhan radioaktif;
  - semikonduktor, bahan magnetik, plasma;
  - evolusi bintang, katai putih, bintang neutron, galaksi, sinar kosmik;
  - fisika statistik, geofisika, fisika atmosfer, fisika medis, fotonika.
- Topik yang sudah ada tetapi penjelasannya terlalu singkat juga boleh kamu perdalam.

## Tempat menulis

Tulis semuanya di folder **`materi-gemini/`** di akar repo, dalam Markdown. Susunan yang disarankan (boleh kamu kembangkan):

```
materi-gemini/
  README.md                  status, daftar isi, dan catatan untuk Claude
  mekanika/
    gaya-sentripetal.md
  gelombang-optik/
  termodinamika/
  listrik-magnet/
  modern/
  astrofisika/
  terapan/
```

Satu berkas berisi satu topik. Supaya mudah dipindahkan ke situs, setiap topik sebaiknya memuat:
- penjelasan per jenjang yang cocok (SD, SMP, SMA, universitas, pengajar): mulai dari intuisi sederhana sampai penjelasan lanjut;
- besaran yang terlibat, dengan simbol, satuan SI, dan dimensinya;
- persamaan, beserta asumsi dan batas berlakunya;
- **contoh soal dengan langkah hitung lengkap**;
- kegiatan atau percobaan sederhana;
- satu atau beberapa soal pilihan ganda, dengan jawaban benar, dua pengecoh, dan alasannya;
- miskonsepsi yang sering muncul, dan tips mengajar untuk guru.

## Beberapa aturan saja

1. **Bahasa Indonesia** yang baku. Pakai istilah buku pelajaran, misalnya kelajuan lawan kecepatan, usaha, kalor, hambatan, GGL. Desimal ditulis dengan koma.
2. **Tulis dengan kata-katamu sendiri.** Jangan menyalin teks dari situs lain.
3. **Setiap berkas ditutup dengan bagian "Sumber"** berisi tautan halaman yang benar-benar kamu baca. Utamakan OpenStax, MIT OCW, NIST, NASA, ESA, CERN, Feynman Lectures, dan jurnal atau universitas.
4. **Nilai konstanta diambil dari NIST CODATA** (physics.nist.gov/cuu); repo memakai edisi CODATA 2022. Hitung ulang setiap contoh soal.
5. Pisahkan sains mapan dari riset aktif dan dari spekulasi.
6. Kalau ragu akan suatu fakta, tandai dengan `> Perlu dicek:` daripada menebak.
7. **Hanya tulis di dalam `materi-gemini/`.** Jangan mengubah berkas atau folder lain di repo.
8. **Kamu tidak bisa push ke repo.** Di akhir setiap sesi, sediakan **seluruh folder `materi-gemini/`** sebagai satu berkas zip untuk diunduh pemilik (nama yang disarankan: `materi-gemini-<repo>.zip`). Isinya: semua berkas yang sudah ada di repo, ditambah berkas baru dan berkas yang kamu ubah. Jangan hanya berkas baru. Claude memasukkan isi zip ke repo; folder ini tidak ikut ter-deploy ke situs.

## Status dan tanda selesai

Baris pertama `materi-gemini/README.md` selalu berisi status:

- `Status: BERJALAN`, selama kamu masih menambah materi;
- `Status: SELESAI`, **hanya kalau menurutmu informasinya sudah lebih dari cukup**.

Claude baru mulai mengecek dan memindahkan materi ke situs setelah status berubah menjadi `SELESAI`. Jadi tidak perlu terburu-buru: lanjutkan riset di sesi berikutnya sampai kamu sendiri yakin materinya lengkap.

README juga berisi:
- daftar semua berkas;
- topik yang belum sempat ditulis;
- semua tanda `Perlu dicek`;
- catatan sampai mana sesi terakhir berhenti.
