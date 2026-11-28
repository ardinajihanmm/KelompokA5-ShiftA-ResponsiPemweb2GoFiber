import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { message } from '../api/axios';
import AuthShell from '../components/AuthShell';

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form);
      navigate('/dashboard', { replace: true });
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="center"><div className="spinner" />Memuat sesi...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <AuthShell
      title="Selamat datang kembali"
      subtitle="Masuk untuk mengelola kegiatan organisasi."
      footer={
        <>
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </>
      }
    >
      {error && (
        <div role="alert" className="banner banner-error">
          {error}
        </div>
      )}
      <form className="form" onSubmit={submit}>
        <label className="field">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button className="btn wide" disabled={busy}>
          {busy ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </AuthShell>
  );
}
