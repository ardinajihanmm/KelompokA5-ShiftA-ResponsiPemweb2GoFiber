import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Halaman di dalam route ini hanya bisa dibuka setelah login.
export default function ProtectedRoute() {
  const { user, loading, error, refresh, logout } = useAuth();

  if (loading)
    return (
      <div className="center">
        <div className="spinner" />
        Memuat sesi...
      </div>
    );

  if (error)
    return (
      <div className="center">
        <p>{error}</p>
        <div className="form-actions">
          <button className="btn" onClick={refresh}>
            Coba lagi
          </button>
          <button className="btn ghost" onClick={logout}>
            Keluar
          </button>
        </div>
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
