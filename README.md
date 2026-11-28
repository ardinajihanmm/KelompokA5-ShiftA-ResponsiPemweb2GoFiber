# EventDesk — Sistem Informasi Manajemen Kegiatan Organisasi
> Kelola divisi, kegiatan, dan tugas organisasi dalam satu platform.

---

## 📌 Informasi Kelompok
- **Nomor Kelompok:** Kelompok A5
- **Shift Praktikum:** Shift A
- **Mata Kuliah:** Praktikum Pemrograman Web 2
- **Program Studi:** Teknik Komputer, Universitas Jenderal Soedirman
- **Repository:** [KelompokA5-ShiftA-ResponsiPemweb2GoFiber](https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber)

---

## 👥 Anggota Kelompok

| No | Nama Lengkap | NIM | Shift Awal | Shift Akhir | Jobdesk / Kontribusi | Link Video Penjelasan |
|---|---|---|---|---|---|---|
| 1 | [Nama Anggota 1] | [NIM] | [Isi shift awal] | Shift A | Inisialisasi proyek Go Fiber dan React, konfigurasi MySQL dan GORM, CRUD Divisi (backend dan frontend), dashboard, layout, Axios, CORS, dan integrasi akhir. Endpoint: `/api/status`, `/api/divisi`, serta integrasi router. Halaman: Landing, Dashboard, dan Divisi. | [Isi link YouTube] |
| 2 | [Nama Anggota 2] | [NIM] | [Isi shift awal] | Backend autentikasi (register, login, profil, JWT, bcrypt, middleware auth dan role), CRUD Kegiatan (backend dan frontend), relasi, Preload, pagination, pencarian dan filter. Endpoint: `/api/auth/*`, `/api/users`, `/api/kegiatan`. Halaman: Kegiatan. | [Isi link YouTube] |
| 3 | [Nama Anggota 3] | [NIM] | [Isi shift awal] | CRUD Tugas (backend dan frontend), relasi dan kepemilikan tugas, komponen CRUD bersama, autentikasi frontend, AuthContext dan ProtectedRoute. Endpoint: `/api/tugas`. Halaman: Tugas, Login, Register dan Profil. | [Isi link YouTube] |

Integrasi, pengujian akhir, deployment, dan dokumentasi dilakukan bersama. Setiap anggota bertanggung jawab atas pengembangan, validasi, pengujian, dan penjelasan kode sesuai jobdesk masing-masing. Perubahan kode dicatat melalui akun GitHub masing-masing.

---

## 📖 Deskripsi Aplikasi

EventDesk merupakan aplikasi web yang dirancang untuk membantu pengurus dan anggota organisasi mahasiswa dalam mengelola data divisi, kegiatan, serta pembagian tugas secara terpusat. Pengelolaan informasi yang tersebar di berbagai media komunikasi dapat menyulitkan pengurus dalam memantau jadwal kegiatan, penanggung jawab, dan progres pengerjaan tugas.

Melalui EventDesk, admin dapat mengelola data divisi, kegiatan, dan tugas, sedangkan anggota dapat melihat informasi organisasi serta memperbarui status tugas yang menjadi tanggung jawabnya. Aplikasi ini bertujuan mempermudah koordinasi, meningkatkan keteraturan pengelolaan data, dan membantu organisasi memantau perkembangan kegiatan.

---

## ⚙️ Penjelasan Teknis

### 1. Teknologi (Tech Stack)

- **Backend:** Go 1.25 atau lebih baru, Fiber v3.
- **Frontend:** React 19, Vite 6, JavaScript, Tailwind CSS 4 dan CSS.
- **Database:** MySQL / MariaDB melalui Laragon.
- **ORM:** GORM dan driver MySQL.
- **Library / Package:** go-playground/validator v10, golang-jwt/jwt v5, bcrypt, godotenv, Axios, dan React Router.
- **Tools:** Visual Studio Code, Git, GitHub, HeidiSQL, dan Postman untuk pengujian API.

### 2. Fitur Utama & Modul

- **Autentikasi & Otorisasi:** registrasi, login, profil, logout melalui penghapusan token di frontend, JWT dengan masa kedaluwarsa, hash password bcrypt, serta middleware autentikasi dan role. Registrasi publik menghasilkan role `anggota`.
- **Landing Page:** halaman perkenalan di `/` yang menjelaskan kegunaan EventDesk, dapat dibuka tanpa login.
- **Dashboard:** ringkasan jumlah divisi, kegiatan, tugas, tugas selesai, progres tugas, dan daftar kegiatan terbaru di `/dashboard`.
- **Modul Divisi:** CRUD data divisi yang meliputi tambah, daftar, detail, edit, dan hapus divisi.
- **Modul Kegiatan:** CRUD kegiatan, penentuan divisi, tanggal, lokasi, deskripsi, status, relasi menggunakan GORM Preload, pagination, pencarian, dan filter status/divisi pada API.
- **Modul Tugas:** CRUD tugas, penentuan kegiatan dan penanggung jawab, deadline, deskripsi, status pengerjaan, serta pembatasan hak akses berdasarkan kepemilikan tugas.
- **Integrasi Frontend:** Axios, protected route, Bearer token, indikator loading, pesan berhasil/gagal, pesan validasi dari API, serta pengalihan ke halaman login saat menerima respons 401.
- **Standar API:** RESTful API, validasi input, format respons JSON konsisten, global error handler, middleware recover, logger, dan CORS.

#### Hak Akses Pengguna

| Fitur | Admin | Anggota |
|---|---|---|
| Dashboard, profil, logout | Ya | Ya |
| Lihat daftar dan detail divisi | Ya | Ya |
| Tambah, edit, hapus divisi | Ya | Tidak |
| Lihat daftar dan detail kegiatan | Ya | Ya |
| Tambah, edit, hapus kegiatan | Ya | Tidak |
| Lihat daftar dan detail tugas | Ya | Ya |
| Tambah dan hapus tugas | Ya | Tidak |
| Edit tugas | Seluruh data tugas | Hanya status tugas sendiri |
| Daftar pengguna untuk penugasan | Ya | Tidak |

### 3. Skema Data Singkat

| Tabel | Field utama |
|---|---|
| `users` | `id`, `nama`, `email`, `password_hash`, `role` |
| `divisi` | `id`, `nama_divisi`, `deskripsi` |
| `kegiatan` | `id`, `divisi_id`, `nama_kegiatan`, `tanggal`, `lokasi`, `deskripsi`, `status` |
| `tugas` | `id`, `kegiatan_id`, `user_id`, `nama_tugas`, `deskripsi`, `deadline`, `status` |

Relasi antar-tabel:
- `divisi` (1 : N) `kegiatan` melalui `divisi_id`.
- `kegiatan` (1 : N) `tugas` melalui `kegiatan_id`.
- `users` (1 : N) `tugas` melalui `user_id`.

Data `users` digunakan untuk autentikasi dan penanggung jawab tugas, tidak termasuk tiga resource CRUD utama.

### 4. Dokumentasi REST API

Base URL lokal: `http://localhost:3000/api`

Endpoint terlindungi membutuhkan header `Authorization: Bearer <token>`.

| Method | Endpoint | Keterangan | Auth | Role |
|---|---|---|---|---|
| GET | `/api/status` | Cek status API dan database | Tidak | Publik |
| POST | `/api/auth/register` | Registrasi akun anggota | Tidak | Publik |
| POST | `/api/auth/login` | Login dan mendapatkan JWT | Tidak | Publik |
| GET | `/api/auth/profile` | Melihat profil pengguna | Ya | Admin, Anggota |
| GET | `/api/users` | Daftar pengguna untuk penanggung jawab | Ya | Admin |
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
| PUT | `/api/tugas/:id` | Edit tugas atau status tugas sendiri | Ya | Admin, Anggota (status tugas sendiri) |
| DELETE | `/api/tugas/:id` | Hapus tugas | Ya | Admin |

Contoh pagination, pencarian, dan filter:

```http
GET /api/kegiatan?page=1&limit=10&search=seminar&status=berjalan&divisi_id=1
```

Contoh format respons berhasil:

```json
{
  "sukses": true,
  "data": {
    "status": "online"
  }
}
```

Contoh format respons gagal:

```json
{
  "sukses": false,
  "pesan": "Data tidak ditemukan"
}
```

Status HTTP yang digunakan antara lain 200, 201, 400, 401, 403, 404, 409, 422, 500, dan 503. Logout dilakukan pada frontend dengan menghapus token, sehingga tidak memerlukan endpoint logout tersendiri.

---

## 🚀 Panduan Instalasi Lokal

**Prasyarat:** Git, Go sesuai versi pada `backend/go.mod`, Node.js yang kompatibel dengan Vite 6, npm, dan Laragon dengan MySQL/MariaDB.

### 1. Clone Repository

```powershell
# Clone repository
git clone https://github.com/ardinajihanmm/KelompokA5-ShiftA-ResponsiPemweb2GoFiber.git
cd KelompokA5-ShiftA-ResponsiPemweb2GoFiber
```

### 2. Konfigurasi Database

Jalankan MySQL melalui Laragon (Start All), buka HeidiSQL melalui menu Database, kemudian jalankan query berikut:

```sql
CREATE DATABASE IF NOT EXISTS eventdesk
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Tabel dibuat secara otomatis menggunakan GORM AutoMigrate ketika backend dijalankan.

### 3. Instalasi dan Konfigurasi Backend

```powershell
cd backend
go mod tidy

# Buat .env lokal jika belum tersedia
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

Buka `backend/.env`, sesuaikan konfigurasi berikut:

```ini
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

Ganti nilai `JWT_SECRET` dengan secret acak minimal 32 karakter dan `ADMIN_PASSWORD` dengan password demo lokal minimal 8 karakter. Sesuaikan `DB_USER`, `DB_PASSWORD`, dan `DB_PORT` dengan MySQL di laptop masing-masing. Jika `DB_DSN` diisi, konfigurasi tersebut menggantikan pengaturan `DB_*`.

Untuk membuat JWT secret melalui PowerShell:

```powershell
$bytes = New-Object byte[] 48
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
$rng.Dispose()
```

Salin hasil ke `JWT_SECRET` di `.env`. Jangan membagikan secret atau memasukkan file `.env` ke repository.

```powershell
# Jalankan backend dari folder backend
go run ./cmd/api
```

Akun admin akan dibuat otomatis saat backend dijalankan apabila konfigurasi admin diisi dengan benar dan akun belum tersedia. Mengubah password pada `.env` tidak otomatis mengubah password akun admin yang sudah dibuat.

### 4. Instalasi dan Konfigurasi Frontend

Buka terminal baru dari folder utama repository:

```powershell
cd frontend
npm ci

# Buat .env lokal jika belum tersedia
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

Jika `package-lock.json` belum tersedia, gunakan `npm install` sebagai pengganti `npm ci`.

Pastikan isi `frontend/.env` sebagai berikut:

```ini
VITE_API_URL=http://localhost:3000/api
```

```powershell
npm run dev
```

### 5. Akses Aplikasi

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000/api/status](http://localhost:3000/api/status)

### 6. Pengujian

Dari folder `backend`:

```powershell
go build ./...
go test ./...
```

Dari folder `frontend`:

```powershell
npm run build
```

Lakukan pengujian registrasi, login, profil, logout, tiga CRUD dari frontend, relasi, pagination, pencarian, filter, validasi 422, penolakan akses 401 dan 403, serta kepemilikan tugas anggota. Build dan pengujian middleware telah berhasil pada tahap integrasi lokal; keberhasilan pengujian seluruh fitur dan deployment masih perlu dikonfirmasi.

---

## 🌐 Deployment

| Layanan | URL |
|---|---|
| Frontend | [Isi URL HTTPS frontend setelah deployment] |
| Backend | [Isi URL HTTPS backend setelah deployment] |

Status deployment: belum dikonfirmasi. Setelah deployment, sesuaikan `VITE_API_URL`, `CORS_ORIGIN`, konfigurasi database produksi, `PORT`, dan `JWT_SECRET`. Pastikan URL tetap aktif hingga penilaian selesai serta pengujian kedua role berhasil melalui URL produksi.

---

## 🔑 Akun Demo

| Role | Email | Password |
|---|---|---|
| Admin | [Isi email akun demo admin yang aktif] | [Isi password khusus akun demo] |
 Akun anggota dapat dibuat melalui halaman Register.

---

## 🎥 Video Presentasi

**Link YouTube:** [Isi tautan video kelompok dengan visibilitas Public atau Unlisted]

Video mencakup pengenalan aplikasi, demo melalui URL produksi, serta penjelasan kode dan jobdesk masing-masing anggota. Nama dan wajah anggota ditampilkan ketika menjelaskan bagian yang dikerjakan.
