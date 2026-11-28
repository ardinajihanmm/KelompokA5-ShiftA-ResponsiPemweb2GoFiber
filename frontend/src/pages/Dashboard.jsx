import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get, message } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import PageTitle from '../components/PageTitle';
import SkyClock from '../components/SkyClock';
import { coverStyle, formatDate, initial, statusTone } from '../utils/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([get('/divisi'), get('/kegiatan', { limit: 6 }), get('/tugas')])
      .then(([divisi, kegiatan, tugas]) => setData({ divisi, kegiatan, tugas }))
      .catch((e) => setError(message(e)));
  }, []);

  const firstName = (user?.nama || '').split(' ')[0];
  const isAdmin = user?.role === 'admin';

  let body = null;
  if (error) {
    body = (
      <div className="banner banner-error" role="alert">
        {error}
      </div>
    );
  } else if (!data) {
    body = (
      <div className="stack" aria-busy="true">
        <div className="skel tall" />
        <div className="skel" />
      </div>
    );
  } else {
    const { divisi, kegiatan, tugas } = data;
    const selesai = tugas.filter((t) => t.status === 'selesai').length;
    const dikerjakan = tugas.filter((t) => t.status === 'dikerjakan').length;
    const belum = tugas.length - selesai - dikerjakan;
    const pct = tugas.length ? Math.round((selesai / tugas.length) * 100) : 0;

    // Progres kegiatan dihitung dari tugas yang sudah selesai pada kegiatan tersebut.
    const progress = (id) => {
      const list = tugas.filter((t) => t.kegiatan_id === id);
      const done = list.filter((t) => t.status === 'selesai').length;
      return { total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : 0 };
    };

    // Anggota melihat tugasnya sendiri, admin melihat tugas terdekat dari semua anggota.
    const upcoming = tugas
      .filter((t) => t.status !== 'selesai' && (isAdmin || t.user_id === user.id))
      .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)))
      .slice(0, 5);

    const stats = [
      ['Divisi', divisi.length, '/divisi', 'peach'],
      ['Kegiatan', kegiatan.total, '/kegiatan', 'mint'],
      ['Tugas', tugas.length, '/tugas', 'sun'],
      ['Tugas selesai', selesai, '/tugas', 'sky'],
    ];

    body = (
      <>
        <section className="card">
          <h2 className="section-title">
            <span className="dot" /> Kegiatan terbaru
          </h2>
          {kegiatan.items.length === 0 ? (
            <p className="muted">Belum ada kegiatan.</p>
          ) : (
            <div className="scroller">
              {kegiatan.items.map((k) => {
                const p = progress(k.id);
                return (
                  <Link className="k-card" key={k.id} to="/kegiatan">
                    <div className="k-cover" style={coverStyle(k.id)}>
                      <span className="k-letter">{initial(k.nama_kegiatan)}</span>
                      <span className={`pill tone-${statusTone(k.status)}`}>{k.status}</span>
                    </div>
                    <h3>{k.nama_kegiatan}</h3>
                    <p className="muted small">{k.divisi?.nama_divisi || 'Tanpa divisi'}</p>
                    <div className="bar" aria-label={`Progres ${p.pct} persen`}>
                      <i style={{ width: `${Math.max(p.pct, 4)}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="stats">
          {stats.map(([label, value, to, tone]) => (
            <Link className={`tile tile-${tone}`} key={label} to={to}>
              <strong>{value}</strong>
              <span>{label}</span>
            </Link>
          ))}
        </section>

        <div className="cols">
        <section className="card">
          <div className="list-head">
            <h2 className="section-title">
              <span className="dot" /> Progres tugas
            </h2>
            <span className="count">{pct}%</span>
          </div>
          <div className="bar big" aria-label={`Tugas selesai ${pct} persen`}>
            <i style={{ width: `${Math.max(pct, tugas.length ? 3 : 0)}%` }} />
          </div>
          <div className="mini-stats">
            <div>
              <b>{belum}</b>
              <span>Belum</span>
            </div>
            <div>
              <b>{dikerjakan}</b>
              <span>Dikerjakan</span>
            </div>
            <div>
              <b>{selesai}</b>
              <span>Selesai</span>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="list-head">
            <h2 className="section-title">
              <span className="dot" /> {isAdmin ? 'Tugas terdekat' : 'Tugas saya'}
            </h2>
            <Link className="link" to="/tugas">
              Lihat semua
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="muted">Tidak ada tugas yang menunggu. Kerja bagus.</p>
          ) : (
            <ul className="rows">
              {upcoming.map((t) => (
                <li key={t.id}>
                  <div className="row-cover" style={coverStyle(t.id)}>
                    {initial(t.nama_tugas)}
                  </div>
                  <div className="row-main">
                    <b>{t.nama_tugas}</b>
                    <span>{t.kegiatan?.nama_kegiatan || 'Tanpa kegiatan'}</span>
                  </div>
                  <span className="pill tone-peach">
                    <Icon name="clock" size={13} /> {formatDate(t.deadline)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
        </div>
      </>
    );
  }

  return (
    <div className="stack">
      <PageTitle>Beranda</PageTitle>
      <SkyClock name={firstName} />
      {body}
    </div>
  );
}
