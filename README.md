# EventDesk — Sistem Informasi Manajemen Kegiatan Organisasi
> Kelola divisi, kegiatan, dan tugas organisasi dalam satu platform.

## 📌 Informasi Kelompok

- **Nomor Kelompok:** Kelompok A5
- **Shift Praktikum:** Shift A
- **Mata Kuliah:** Praktikum Pemrograman Web 2
- **Program Studi:** Teknik Komputer, Universitas Jenderal Soedirman
- **Repositori:** [KelompokA5-ShiftA-ResponsiPemweb2GoFiber](https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber)
- **Status:** Tahap perencanaan dan pengembangan. Fitur, konfigurasi instalasi, dan endpoint di bawah merupakan rancangan yang perlu diverifikasi setelah implementasi.

## 👥 Anggota Kelompok

| No | Nama Lengkap | NIM | Shift Awal | Shift Akhir | Jobdesk / Kontribusi | Endpoint atau Halaman yang Dikerjakan | Link Video Penjelasan |
|---|---|---|---|---|---|---|---|
| 1 | [Nama anggota 1] | [NIM] | [Isi sesuai data] | Shift A | CRUD Divisi, autentikasi JWT, bcrypt, middleware auth dan role, protected route | `/api/auth/*`, `/api/divisi`, `/api/users`; Login, Register, Profil, Divisi | Belum tersedia |
| 2 | [Nama anggota 2] | [NIM] | [Isi sesuai data] | Shift A | CRUD Kegiatan, setup Fiber v3 dan GORM, konfigurasi database, Preload, pagination, pencarian, filter, global error handler, logger dan recover | `/api/kegiatan`, `/api/status`; Kegiatan | Belum tersedia |
| 3 | [Nama anggota 3] | [NIM] | [Isi sesuai data] | Shift A | CRUD Tugas, relasi kegiatan dan user, pengecekan kepemilikan tugas, setup React Vite, Axios, dashboard, layout dan CORS | `/api/tugas`; Tugas, Dashboard | Belum tersedia |

Setiap anggota bertanggung jawab atas backend, frontend, validasi input, integrasi, dan pengujian CRUD masing-masing serta melakukan commit menggunakan akun GitHub sendiri. Integrasi akhir, deployment, dokumentasi, dan video dikerjakan bersama. Laporan penilaian anggota dikerjakan secara individu.

## 📖 Deskripsi Aplikasi

EventDesk merupakan aplikasi web untuk membantu pengurus organisasi mahasiswa mengelola data divisi, kegiatan, dan pembagian tugas secara terpusat. Pencatatan kegiatan dan tugas yang tersebar di berbagai media komunikasi dapat menyulitkan pengurus dalam memantau jadwal, penanggung jawab, serta progres pekerjaan. EventDesk dirancang untuk mempermudah pengelolaan informasi tersebut melalui sistem yang terintegrasi.

Target pengguna aplikasi adalah pengurus dan anggota organisasi mahasiswa. Admin dapat mengelola data divisi, kegiatan, dan tugas, sedangkan anggota dapat melihat informasi organisasi serta memperbarui status tugas yang menjadi tanggung jawabnya.

## ⚙️ Penjelasan Teknis

### 1. Teknologi (Tech Stack)

| Komponen | Teknologi |
|---|---|
| Backend | Go, Fiber v3 (`github.com/gofiber/fiber/v3`) |
| ORM | GORM |
| Database | PostgreSQL |
| Frontend | React, Vite, Tailwind CSS |
| Routing frontend | React Router |
| HTTP client | Axios |
| Validasi | `github.com/go-playground/validator/v10` |
| Autentikasi | `github.com/golang-jwt/jwt/v5` |
| Password hashing | `golang.org/x/crypto/bcrypt` |
| Version control | Git dan GitHub |
| Pengujian API | Postman |

### 2. Fitur Utama & Modul

- **Autentikasi dan otorisasi:** registrasi, login, profil, logout, JWT dengan masa kedaluwarsa, hash password bcrypt, dan middleware role admin/anggota. Registrasi publik hanya membuat akun anggota.
- **CRUD Divisi:** tambah, daftar, detail, edit, dan hapus divisi organisasi.
- **CRUD Kegiatan:** tambah, daftar, detail, edit, dan hapus kegiatan; relasi dengan divisi menggunakan GORM `Preload`, pagination, pencarian dan filter status.
- **CRUD Tugas:** tambah, daftar, detail, edit, dan hapus tugas; relasi dengan kegiatan dan penanggung jawab; deadline dan pemantauan status tugas.
- **Dashboard:** ringkasan jumlah divisi, kegiatan, dan tugas.
- **Integrasi frontend:** protected route, header Bearer token, loading state, notifikasi berhasil/gagal, pesan validasi dari server, dan pengalihan ke login jika menerima 401.
- **Standar API:** validasi input dengan status 422, format respons konsisten, global error handler, middleware recover, logger, dan CORS.

### 3. Skema Data Singkat

| Tabel | Field utama (rancangan) |
|---|---|
| `users` | `id`, `nama`, `email`, `password_hash`, `role` |
| `divisi` | `id`, `nama_divisi`, `deskripsi` |
| `kegiatan` | `id`, `divisi_id`, `nama_kegiatan`, `tanggal`, `lokasi`, `deskripsi`, `status` |
| `tugas` | `id`, `kegiatan_id`, `user_id`, `nama_tugas`, `deskripsi`, `deadline`, `status` |

Relasi:
- `divisi` (1 : N) `kegiatan` melalui `divisi_id`.
- `kegiatan` (1 : N) `tugas` melalui `kegiatan_id`.
- `users` (1 : N) `tugas` melalui `user_id`.

Tabel `users` digunakan untuk autentikasi dan penanggung jawab tugas, bukan sebagai salah satu dari tiga CRUD utama. Nama tabel fisik disesuaikan dengan model GORM yang diimplementasikan.

### 4. Hak Akses Pengguna

| Fitur | Admin | Anggota |
|---|---|---|
| Login, profil, logout | Ya | Ya |
| Melihat dashboard, divisi, kegiatan, tugas | Ya | Ya |
| Tambah, edit, hapus divisi | Ya | Tidak |
| Tambah, edit, hapus kegiatan | Ya | Tidak |
| Tambah dan hapus tugas | Ya | Tidak |
| Edit tugas | Ya | Hanya status tugas sendiri |
| Melihat daftar pengguna untuk penugasan | Ya | Tidak |

Backend wajib memeriksa autentikasi dan otorisasi sebelum handler dijalankan. Pelanggaran hak akses mengembalikan 403. Password maupun hash password tidak dikirim ke frontend.

### 5. Struktur Proyek (Target)

```text
KelompokA5-ShiftA-ResponsiPemweb2GoFiber/
├── backend/
│   ├── cmd/api/main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── model/
│   │   ├── handler/
│   │   ├── middleware/
│   │   ├── router/
│   │   └── utils/
│   ├── .env.example
│   ├── go.mod
│   └── go.sum
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Panduan Instalasi Lokal

> Panduan ini merupakan target konfigurasi untuk digunakan setelah fondasi backend dan frontend selesai. Perintah belum diuji terhadap implementasi repository.

### Prasyarat

- Git
- Go (versi sesuai `go.mod` dan persyaratan Fiber v3)
- Node.js dan npm (versi sesuai persyaratan Vite)
- PostgreSQL

### 1. Clone repository

```bash
git clone https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber.git
cd KelompokA5-ShiftA-ResponsiPemweb2GoFiber
```

### 2. Jalankan backend (terminal PowerShell)

Buat database PostgreSQL bernama `eventdesk` terlebih dahulu.

```powershell
cd backend
go mod download
Copy-Item .env.example .env
```

Sesuaikan file `.env` dengan konfigurasi database lokal. Contoh kontrak environment yang direncanakan:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<password_database_lokal>
DB_NAME=eventdesk
DB_SSLMODE=disable
JWT_SECRET=<secret_acak_dan_panjang>
CORS_ORIGIN=http://localhost:5173
```

Nama variabel harus sama dengan implementasi config. Migrasi GORM dan pembuatan akun demo harus disiapkan oleh tim; petunjuk seed yang sebenarnya ditambahkan setelah implementasi selesai.

```powershell
go run ./cmd/api
```

Target alamat API lokal: `http://localhost:3000/api/status`.

### 3. Jalankan frontend (terminal baru dari root repository)

```powershell
cd frontend
npm install
Copy-Item .env.example .env
```

Konfigurasi environment frontend:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

```powershell
npm run dev
```

Target alamat frontend lokal: `http://localhost:5173`.

File `.env` tidak boleh di-commit. Hanya `.env.example` tanpa kredensial asli yang disimpan di repository.

## 📡 Dokumentasi REST API (Rancangan)

Endpoint yang membutuhkan autentikasi harus menerima header `Authorization: Bearer <token>`.

| Method | Endpoint | Keterangan | Auth | Role |
|---|---|---|---|---|
| GET | `/api/status` | Status API | Tidak | Publik |
| POST | `/api/auth/register` | Registrasi akun anggota | Tidak | Publik |
| POST | `/api/auth/login` | Login dan mendapatkan JWT | Tidak | Publik |
| GET | `/api/auth/profile` | Profil pengguna | Ya | Admin, Anggota |
| GET | `/api/users` | Daftar pengguna untuk penugasan | Ya | Admin |
| GET | `/api/divisi` | Daftar divisi | Ya | Admin, Anggota |
| GET | `/api/divisi/:id` | Detail divisi | Ya | Admin, Anggota |
| POST | `/api/divisi` | Tambah divisi | Ya | Admin |
| PUT | `/api/divisi/:id` | Edit divisi | Ya | Admin |
| DELETE | `/api/divisi/:id` | Hapus divisi | Ya | Admin |
| GET | `/api/kegiatan` | Daftar kegiatan, pagination, pencarian dan filter | Ya | Admin, Anggota |
| GET | `/api/kegiatan/:id` | Detail kegiatan | Ya | Admin, Anggota |
| POST | `/api/kegiatan` | Tambah kegiatan | Ya | Admin |
| PUT | `/api/kegiatan/:id` | Edit kegiatan | Ya | Admin |
| DELETE | `/api/kegiatan/:id` | Hapus kegiatan | Ya | Admin |
| GET | `/api/tugas` | Daftar tugas | Ya | Admin, Anggota |
| GET | `/api/tugas/:id` | Detail tugas | Ya | Admin, Anggota |
| POST | `/api/tugas` | Tambah tugas | Ya | Admin |
| PUT | `/api/tugas/:id` | Edit tugas / status tugas sendiri | Ya | Admin / Anggota penanggung jawab (status saja) |
| DELETE | `/api/tugas/:id` | Hapus tugas | Ya | Admin |

Logout dilakukan dengan menghapus token pada frontend.

Contoh query daftar kegiatan: `GET /api/kegiatan?page=1&limit=10&search=seminar&status=berjalan`.

Contoh format respons berhasil:

```json
{
  "sukses": true,
  "data": []
}
```

Contoh respons validasi gagal (HTTP 422):

```json
{
  "sukses": false,
  "pesan": "Nama kegiatan wajib diisi"
}
```

Status HTTP yang digunakan: 200 (berhasil), 201 (data dibuat), 400 (request tidak valid), 401 (autentikasi gagal), 403 (akses ditolak), 404 (data tidak ditemukan), 422 (validasi gagal), dan 500 (kesalahan internal tanpa detail sensitif).

## 🌐 Deployment

| Komponen | URL | Status |
|---|---|---|
| Frontend | [Isi URL HTTPS frontend] | Belum deployment |
| Backend | [Isi URL HTTPS backend] | Belum deployment |
| Status API | [Isi URL backend/api/status] | Belum diuji |

Deployment dilakukan bersama setelah integrasi lokal selesai. Frontend dan backend wajib online, menggunakan HTTPS, terhubung ke database produksi, serta dapat diakses sampai penilaian selesai.

## 🔑 Akun Uji (Demo)

| Role | Email | Password |
|---|---|---|
| Admin | [Email demo admin] | [Password demo admin] |
| Anggota | [Email demo anggota] | [Password demo anggota] |

Gunakan akun khusus demo yang dibuat sebelum pengumpulan. Jangan memasukkan kredensial pribadi, password database, atau JWT secret ke README.

## 🎥 Video Presentasi

- **Link YouTube:** [Isi tautan video Public atau Unlisted setelah diunggah]
- **Durasi:** sekitar 5 menit (sesuai rekomendasi responsi)
- **Isi:** pengenalan aplikasi, demo URL produksi, serta penjelasan kode jobdesk setiap anggota dengan wajah dan nama terlihat.
