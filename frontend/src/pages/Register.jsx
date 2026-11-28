import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, message } from '../api/axios';
import AuthShell from '../components/AuthShell';

const inputs = [
  ['nama', 'Nama lengkap', 'text', 'name'],
  ['email', 'Email', 'email', 'email'],
  ['password', 'Password (minimal 8 karakter)', 'password', 'new-password'],
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api.post('/auth/register', form);
      setSuccess(true);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Buat akun anggota"
      subtitle="Daftar untuk mengikuti kegiatan organisasi."
      footer={
        <>
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </>
      }
    >
      {error && (
        <div className="banner banner-error" role="alert">
          {error}
        </div>
      )}
      {success ? (
        <div className="form">
          <div className="banner banner-ok">Registrasi berhasil. Silakan masuk.</div>
          <button className="btn wide" onClick={() => navigate('/login')}>
            Ke halaman login
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={submit}>
          {inputs.map(([key, label, type, autoComplete]) => (
            <label className="field" key={key}>
              {label}
              <input
                required
                type={type}
                autoComplete={autoComplete}
                minLength={key === 'password' ? 8 : undefined}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <button className="btn wide" disabled={busy}>
            {busy ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
