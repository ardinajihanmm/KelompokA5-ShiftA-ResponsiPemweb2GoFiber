# EventDesk — Sistem Informasi Manajemen Kegiatan Organisasi
> Kelola divisi, kegiatan, dan tugas organisasi dalam satu platform.

## 📌 Informasi Kelompok

- **Nomor Kelompok:** Kelompok A5
- **Shift Praktikum:** Shift A
- **Mata Kuliah:** Praktikum Pemrograman Web 2
- **Program Studi:** Teknik Komputer, Universitas Jenderal Soedirman
- **Repositori:** [KelompokA5-ShiftA-ResponsiPemweb2GoFiber](https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber)
- **Status:** Paket dibagi menjadi tahap fondasi, fitur anggota 2/3, dan integrasi final. Build, database, pengujian integrasi, dan deployment belum diverifikasi. Tim wajib menguji, mengembangkan, serta mendokumentasikan kontribusi nyata masing-masing.

## 👥 Anggota Kelompok

| No | Nama Lengkap | NIM | Shift Awal | Shift Akhir | Jobdesk / Kontribusi | Endpoint atau Halaman yang Dikerjakan | Link Video Penjelasan |
|---|---|---|---|---|---|---|---|
| 1 | [Nama anggota 1] | [NIM] | [Isi sesuai data] | Shift A | Setup Fiber, GORM, MySQL Laragon, React Vite, Axios, CORS, struktur, layout, dashboard, CRUD Divisi dan integrasi routing | `/api/status`, `/api/divisi`; Dashboard, Divisi, layout | Belum tersedia |
| 2 | [Nama anggota 2] | [NIM] | [Isi sesuai data] | Shift A | CRUD Kegiatan, backend autentikasi JWT dan bcrypt, middleware auth dan role, Preload, pagination, pencarian, filter | `/api/auth/*`, `/api/users`, `/api/kegiatan`; Kegiatan | Belum tersedia |
| 3 | [Nama anggota 3] | [NIM] | [Isi sesuai data] | Shift A | CRUD Tugas, relasi dan kepemilikan tugas, komponen CRUD bersama, frontend autentikasi, sesi dan protected route | `/api/tugas`; Tugas, Login, Register, Profil | Belum tersedia |

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
| Database | MySQL / MariaDB (Laragon) |
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

| Tabel | Field utama |
|---|---|
| `users` | `id`, `nama`, `email`, `password_hash`, `role` |
| `divisi` | `id`, `nama_divisi`, `deskripsi` |
| `kegiatan` | `id`, `divisi_id`, `nama_kegiatan`, `tanggal`, `lokasi`, `deskripsi`, `status` |
| `tugas` | `id`, `kegiatan_id`, `user_id`, `nama_tugas`, `deskripsi`, `deadline`, `status` |

Relasi:
- `divisi` (1 : N) `kegiatan` melalui `divisi_id`.
- `kegiatan` (1 : N) `tugas` melalui `kegiatan_id`.
- `users` (1 : N) `tugas` melalui `user_id`.

Tabel `users` digunakan untuk autentikasi dan penanggung jawab tugas, bukan sebagai salah satu dari tiga CRUD utama. Nama tabel fisik: `users`, `divisi`, `kegiatan`, dan `tugas`.

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

### 5. Struktur Proyek

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

## Tahapan penggabungan

1. Anggota 1 memasukkan ZIP fondasi ke `main`. Pada tahap ini hanya `/api/status` dan dashboard pratinjau yang aktif; migrasi hanya tabel divisi.
2. Anggota 2 dan 3 clone fondasi yang sama, buat branch masing-masing, masukkan ZIP fitur, lalu kembangkan dan review melalui pull request.
3. Setelah kedua fitur masuk ke `main`, anggota 1 menerapkan ZIP integrasi (3 file), mengaktifkan migrasi lengkap, routing API dan routing frontend, lalu menguji bersama.

Dokumentasi endpoint di bawah adalah target versi terintegrasi, bukan klaim semua endpoint sudah aktif pada tahap fondasi.

## 🚀 Panduan Instalasi Lokal

> Panduan PowerShell untuk menjalankan kode awal ini. Instalasi dependensi dan pengujian runtime perlu dilakukan pada laptop anggota. Jangan commit `.env`.

### Prasyarat

- Git
- Go 1.25 atau lebih baru (ikuti versi minimal hasil `go mod tidy`)
- Node.js 22 LTS dan npm
- Laragon dengan MySQL/MariaDB atau MySQL Server (port default 3306)

### 1. Clone repository

```bash
git clone https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber.git
cd KelompokA5-ShiftA-ResponsiPemweb2GoFiber
```

### 2. Jalankan backend (terminal PowerShell)

Buka Laragon, klik Start All, lalu buka Database (HeidiSQL jika terpasang). Hubungkan ke MySQL, buka tab Query, dan jalankan SQL berikut.

```sql
CREATE DATABASE IF NOT EXISTS eventdesk
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Dari root repository:

```powershell
cd backend
# Tahap fondasi: unduh dependensi tanpa membuang dependensi fitur yang belum masuk
go mod download all
Copy-Item .env.example .env
```

Buka `backend/.env` dan sesuaikan konfigurasi MySQL. Contoh Laragon lokal (password root kosong hanya jika konfigurasi Laragon memang demikian):

```dotenv
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=eventdesk
DB_DSN=
JWT_SECRET=CHANGE_ME_GENERATE_RANDOM_SECRET_MIN_32_CHARACTERS
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@eventdesk.com
ADMIN_PASSWORD=CHANGE_ME
```

Isi `DB_PASSWORD` sesuai password MySQL jika ada. Bila port MySQL berbeda, sesuaikan `DB_PORT`. `DB_DSN` boleh dikosongkan untuk lokal; jika diisi, nilai tersebut mengesampingkan `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, dan `DB_NAME`. Untuk deployment nanti, gunakan kredensial database produksi dan konfigurasi TLS sesuai penyedia hosting. Jangan gunakan akun root tanpa password pada server publik.

Buat JWT secret acak dengan PowerShell:

```powershell
$bytes = New-Object byte[] 48
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
$rng.Dispose()
```

Salin hasilnya ke `JWT_SECRET`. Atur `ADMIN_EMAIL` dan `ADMIN_PASSWORD` (minimal 8 karakter, maksimal 72 byte). Pada tahap fondasi belum ada akun admin. Setelah patch integrasi, akun admin dibuat otomatis pada startup pertama apabila email belum terdaftar. Registrasi publik hanya menghasilkan anggota. Password admin yang sudah tersimpan tidak otomatis berubah saat environment diganti.

```powershell
go run -mod=mod ./cmd/api
```

Pada tahap fondasi GORM hanya membuat tabel divisi. Setelah integrasi, GORM menjalankan `AutoMigrate` untuk empat tabel MySQL/MariaDB menggunakan InnoDB dan utf8mb4. Database `eventdesk` harus sudah dibuat; tabelnya tidak perlu dibuat manual. Uji `http://localhost:3000/api/status` di browser. Jika database terkoneksi, respons berisi `sukses: true`. Setelah semua fitur dan patch terintegrasi, jalankan `go mod tidy`; commit `go.mod` dan `go.sum` yang dihasilkan. Gunakan `go test ./...` untuk menjalankan tes middleware.

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

Alamat frontend lokal: `http://localhost:5173`.

File `.env` tidak boleh di-commit. Hanya `.env.example` tanpa kredensial asli yang disimpan di repository. Commit `package-lock.json` yang dihasilkan `npm install`. Untuk memeriksa build, jalankan `npm run build`.

## 📡 Dokumentasi REST API

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
  "pesan": "NamaKegiatan tidak valid (required)"
}
```

Status HTTP yang digunakan: 200 (berhasil), 201 (data dibuat), 400 (request tidak valid), 401 (autentikasi gagal), 403 (akses ditolak), 404 (data tidak ditemukan), 409 (konflik data/relasi), 422 (validasi gagal), 503 (database tidak tersedia), dan 500 (kesalahan internal tanpa detail sensitif).

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

## ✅ Checklist Pengumpulan

- [ ] Seluruh CRUD berfungsi dari frontend, termasuk daftar dan detail.
- [ ] Autentikasi JWT, role, validasi 422, dan penolakan 403 telah diuji.
- [ ] Preload, pagination, pencarian/filter telah diuji.
- [ ] Seluruh anggota memiliki commit kode dari akun GitHub masing-masing.
- [ ] Backend dan frontend produksi terintegrasi melalui HTTPS, CORS dan database produksi berfungsi.
- [ ] JWT secret produksi aman; port dan versi Go sesuai hosting.
- [ ] Registrasi, login, CRUD, role dan refresh halaman diuji dari URL produksi, termasuk incognito.
- [ ] README disesuaikan dengan implementasi, nama/NIM, URL, akun demo dan dokumentasi API aktual.
- [ ] Video presentasi diunggah ke YouTube.
- [ ] Laporan penilaian anggota diisi secara individu.
- [ ] Seluruh kelengkapan dikumpulkan melalui Google Form asisten sebelum 29 November 2026 pukul 23.59 WIB.

## 🧪 Skenario pengujian lokal

1. Buka status API (200), register anggota, login admin dan anggota.
2. Coba akses `/api/divisi` tanpa token (401), lalu dengan token anggota (200).
3. Login admin dan tambah divisi, lihat daftar/detail, ubah data. Buat kegiatan terkait divisi tersebut, lalu buat tugas terkait kegiatan dan anggota yang terdaftar.
4. Periksa daftar kegiatan dengan `page`, `limit`, `search`, `status`, serta data divisi hasil `Preload`.
5. Login anggota: buka tugas sendiri, ubah status. Coba edit tugas milik akun lain atau POST divisi menggunakan Postman (403).
6. Kirim input kosong atau tanggal tidak valid ke endpoint admin (422). Coba detail ID yang tidak ada (404).
7. Login admin dan hapus tugas, kegiatan, lalu divisi (urutan diperlukan karena relasi foreign key). Pastikan setiap CRUD bisa dilakukan melalui frontend.
8. Logout, lalu akses halaman terlindungi. Pastikan token dihapus dan kembali ke login. Uji token kedaluwarsa atau tidak valid (401).
9. Jalankan `go test ./...` dan `npm run build`. Ulangi pengujian dari URL produksi setelah deployment.

## 🤝 Alur kerja Git

Kerangka ini merupakan referensi bantuan AI. Jangan mengklaim kode yang belum dipahami sebagai hasil kontribusi sendiri. Setiap anggota wajib mengembangkan, menguji, dan memperbaiki kode jobdesk-nya secara nyata dan melakukan commit sendiri. Lihat `JOBDESK.md` untuk kepemilikan file, lalu gunakan pull request untuk menggabungkan pekerjaan. Jangan membuat commit palsu atau mengubah atribusi riwayat.
