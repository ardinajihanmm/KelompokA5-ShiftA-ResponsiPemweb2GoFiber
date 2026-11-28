import { useEffect, useState } from 'react';
import { get, message } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import PageTitle from '../components/PageTitle';
import { coverStyle, initial } from '../utils/ui';

export default function Profile() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(user);
  const [error, setError] = useState('');

  useEffect(() => {
    get('/auth/profile')
      .then(setData)
      .catch((e) => setError(message(e)));
  }, []);

  return (
    <div className="stack">
      <PageTitle subtitle="Informasi akun EventDesk.">Profil</PageTitle>

      {error && !data ? (
        <div className="banner banner-error" role="alert">
          {error}
        </div>
      ) : !data ? (
        <div className="skel tall" aria-busy="true" />
      ) : (
        <>
          <section className="profile-hero">
            <div className="avatar" style={coverStyle(data.id)}>
              {initial(data.nama)}
            </div>
            <h2>{data.nama}</h2>
            <span className={`pill ${data.role === 'admin' ? 'tone-peach' : 'tone-mint'}`}>{data.role}</span>
          </section>

          <section className="card">
            <h2 className="section-title">
              <span className="dot" /> Data akun
            </h2>
            <dl className="info">
              <div>
                <dt>Nama</dt>
                <dd>{data.nama}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{data.email}</dd>
              </div>
              <div>
                <dt>Peran</dt>
                <dd className="cap">{data.role}</dd>
              </div>
            </dl>
          </section>

          <button className="btn danger wide" onClick={logout}>
            <Icon name="logout" size={18} /> Keluar
          </button>
        </>
      )}
    </div>
  );
}
