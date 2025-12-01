# Praktikum #9 – Integrasi API Eksternal

Layanan Node.js modular ini menggabungkan API **REST Countries** dan **OpenWeatherMap** untuk menyediakan informasi negara beserta data cuaca terkini. Aplikasi sudah dilengkapi logging, caching, dan dokumentasi OpenAPI (Swagger UI).

## Fitur Utama
- Endpoint negara: daftar semua negara, filter berdasarkan region, atau cari berdasarkan nama.
- Endpoint cuaca: ambil cuaca kota dengan fallback default (`Palangkaraya`).
- Caching in-memory menggunakan `node-cache` untuk mereduksi hit ke API eksternal.
- Dokumentasi interaktif tersedia di `/docs` melalui Swagger UI.
- Penanganan error global dan logging HTTP menggunakan `morgan`.

## Teknologi
- Node.js + Express 5
- Axios sebagai HTTP client
- Node Cache untuk cache sementara
- Swagger UI Express untuk dokumentasi

## Prasyarat
- Node.js 18+ & npm
- API key **OpenWeatherMap** yang aktif

## Instalasi & Menjalankan

```bash
git clone <repo-url>
cd P9-API-Integration-230104040118
npm install
```

Buat berkas `.env` di root proyek:

```env
PORT=3000              # opsional
OWM_API_KEY=your_key   # wajib untuk endpoint cuaca
```

Jalankan aplikasi:

```bash
npm start
```

Server akan berjalan di `http://localhost:3000` (atau sesuai `PORT`).

## Endpoint REST

| Method | Path | Deskripsi |
| --- | --- | --- |
| `GET` | `/api/countries` | Mengambil daftar ringkas semua negara. |
| `GET` | `/api/countries/region/:region` | Negara berdasarkan region (contoh: `asia`, `europe`). |
| `GET` | `/api/countries/name/:name` | Cari negara berdasarkan nama (partial match). |
| `GET` | `/api/weather?city=<name>` | Data cuaca kota; query `city` opsional. |

### Contoh Permintaan

```bash
curl http://localhost:3000/api/countries/region/asia

curl "http://localhost:3000/api/weather?city=Jakarta"
```

Jika `city` tidak diberikan, layanan otomatis menggunakan `Palangkaraya`.

## Dokumentasi API

Setelah server berjalan, akses `http://localhost:3000/docs` untuk melihat dokumentasi OpenAPI dan mencoba endpoint secara interaktif.

## Struktur Direktori (ringkas)

```
server.js                 # bootstrap express & middleware
src/
 ├─ controllers/          # logika HTTP
 ├─ services/             # pemanggilan API eksternal + cache
 ├─ routes/               # definisi rute express
 ├─ utils/cache.js        # konfigurasi NodeCache
 ├─ utils/httpClient.js   # axios instance
 └─ middleware/           # not-found & error handler
```

## Catatan Pengembangan
- Semua request ke REST Countries disaring hanya pada field yang diperlukan untuk memperkecil payload.
- Cache default 60 detik (cuaca 120 detik). Sesuaikan TTL bila dibutuhkan lewat `src/utils/cache.js` & `weather.service.js`.
- Pastikan variabel `OWM_API_KEY` tersedia sebelum memanggil endpoint cuaca, jika tidak layanan akan melempar error 500.

Selamat bereksperimen!
