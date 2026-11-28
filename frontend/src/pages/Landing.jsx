import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';

const features = [
  {
    icon: 'users',
    tone: 'peach',
    title: 'Divisi',
    text: 'Catat daftar divisi lengkap dengan deskripsi perannya.',
  },
  {
    icon: 'calendar',
    tone: 'mint',
    title: 'Kegiatan',
    text: 'Atur jadwal, lokasi, dan status setiap kegiatan organisasi.',
  },
  {
    icon: 'tasks',
    tone: 'sun',
    title: 'Tugas',
    text: 'Bagikan tugas ke anggota dengan deadline dan progres yang jelas.',
  },
];

// Halaman perkenalan yang bisa dibuka tanpa login.
export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="landing">
      <header className="lp-bar">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Icon name="calendar" size={22} />
          </span>
          EventDesk
        </Link>
        <div className="lp-bar-actions">
          {user ? (
            <Link className="btn sm" to="/dashboard">
              Buka beranda
            </Link>
          ) : (
            <>
              <Link className="btn ghost sm" to="/login">
                Masuk
              </Link>
              <Link className="btn sm hide-xs" to="/register">
                Daftar
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="lp-main">
        <section className="lp-hero">
          <div className="lp-hero-text">
            <span className="pill tone-pink">Untuk organisasi mahasiswa</span>
            <h1>Kegiatan organisasi, rapi dalam satu tempat.</h1>
            <svg className="squiggle" width="118" height="14" viewBox="0 0 118 14" fill="none" aria-hidden="true">
              <path d="M2 7q8-9 16 0t16 0 16 0 16 0 16 0 16 0 16 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p>
              EventDesk membantu pengurus dan anggota mencatat divisi, merencanakan kegiatan, dan membagi tugas tanpa
              harus mencari informasi di banyak grup chat.
            </p>
            <div className="lp-cta">
              {user ? (
                <Link className="btn" to="/dashboard">
                  Buka beranda
                </Link>
              ) : (
                <>
                  <Link className="btn" to="/register">
                    Mulai sekarang
                  </Link>
                  <Link className="btn ghost" to="/login">
                    Saya sudah punya akun
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lp-preview" aria-hidden="true">
            <div className="pv-card pv-main">
              <div className="pv-head">
                <span className="pv-cover" />
                <div>
                  <b>Seminar Nasional</b>
                  <small>Divisi Acara</small>
                </div>
                <span className="pill tone-yellow">berjalan</span>
              </div>
              <div className="bar big">
                <i style={{ width: '68%' }} />
              </div>
              <div className="pv-tasks">
                <span>
                  <i className="tick on" /> Susun rundown
                </span>
                <span>
                  <i className="tick on" /> Undang pembicara
                </span>
                <span>
                  <i className="tick" /> Cetak sertifikat
                </span>
              </div>
            </div>
            <div className="pv-card pv-float pv-a">
              <b>12</b>
              <small>Tugas selesai</small>
            </div>
            <div className="pv-card pv-float pv-b">
              <b>4</b>
              <small>Divisi aktif</small>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <h2 className="section-title">
            <span className="dot" /> Apa itu EventDesk?
          </h2>
          <p className="lp-lead">
            EventDesk adalah aplikasi web untuk mengelola organisasi. Admin menyusun divisi, kegiatan, dan tugas.
            Anggota melihat jadwal serta memperbarui status tugas yang menjadi tanggung jawabnya.
          </p>
          <div className="lp-features">
            {features.map((f) => (
              <article className={`tile tile-${f.tone} lp-tile`} key={f.title}>
                <span className="lp-tile-icon">
                  <Icon name={f.icon} size={26} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="add-card lp-final">
          <div>
            <h3>Siap merapikan organisasimu?</h3>
            <p>Buat akun anggota gratis, lalu mulai pantau kegiatan dan tugasmu.</p>
          </div>
          <Link className="btn" to={user ? '/dashboard' : '/register'}>
            {user ? 'Buka beranda' : 'Buat akun'}
          </Link>
        </section>
      </main>

      <footer className="lp-foot">
        EventDesk. Kelompok A5, Shift A. Praktikum Pemrograman Web 2, Teknik Komputer Universitas Jenderal Soedirman.
      </footer>
    </div>
  );
}
