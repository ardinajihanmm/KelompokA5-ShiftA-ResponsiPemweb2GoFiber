# Pembagian jobdesk EventDesk — revisi fondasi terlebih dahulu

- Orang 1: `main` untuk fondasi awal, lalu `feature/fondasi-divisi-dashboard` untuk perubahan lanjutan dan integrasi akhir.
- Orang 2: `feature/auth-kegiatan`.
- Orang 3: `feature/tugas-frontend-auth`.

## Orang 1 — Fondasi, Divisi dan Dashboard
- `.gitignore`
- `JOBDESK.md`
- `README.md`
- `TESTING_STATUS.md`
- `backend/.env.example`
- `backend/cmd/api/main.go`
- `backend/go.mod`
- `backend/internal/config/config.go`
- `backend/internal/config/database.go`
- `backend/internal/handler/common.go`
- `backend/internal/handler/divisi_handler.go`
- `backend/internal/middleware/cors.go`
- `backend/internal/model/divisi.go`
- `backend/internal/router/router.go`
- `backend/internal/utils/response.go`
- `backend/internal/utils/validator.go`
- `frontend/.env.example`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/src/App.jsx`
- `frontend/src/api/axios.js`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Sidebar.jsx`
- `frontend/src/index.css`
- `frontend/src/layouts/MainLayout.jsx`
- `frontend/src/main.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Divisi.jsx`
- `frontend/vercel.json`
- `frontend/vite.config.js`

Target: setup dan uji status API, migrasi MySQL, dashboard, layout, CRUD Divisi, serta koordinasi routing. Setelah PR anggota 2/3 digabung, terapkan patch integrasi (database.go, router.go, App.jsx).

## Orang 2 — Auth backend dan Kegiatan
- `backend/internal/model/user.go`
- `backend/internal/model/kegiatan.go`
- `backend/internal/handler/auth_handler.go`
- `backend/internal/handler/kegiatan_handler.go`
- `backend/internal/middleware/auth.go`
- `backend/internal/middleware/role.go`
- `backend/internal/middleware/auth_test.go`
- `frontend/src/pages/Kegiatan.jsx`

Target: register, login, profile, daftar pengguna, JWT, bcrypt, role 401/403, CRUD Kegiatan, Preload, pagination, search, filter serta halaman Kegiatan.

## Orang 3 — Tugas dan Auth frontend
- `backend/internal/model/tugas.go`
- `backend/internal/handler/tugas_handler.go`
- `frontend/src/components/ResourcePage.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/routes/ProtectedRoute.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Profile.jsx`
- `frontend/src/pages/Tugas.jsx`

Target: CRUD Tugas, penanggung jawab, kepemilikan dan status tugas, komponen CRUD bersama, sesi, halaman login/register/profil, protected route, logout.

Kode awal berbantuan AI. Tiap anggota wajib benar-benar mengembangkan, menguji dan menjelaskan kode sendiri. Jangan mengklaim impor ZIP saja sebagai kontribusi pengembangan. Integrasi akhir, deployment dan README final bersama.
