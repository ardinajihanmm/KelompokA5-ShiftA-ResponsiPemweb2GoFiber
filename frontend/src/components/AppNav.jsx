import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';
import { coverStyle, initial } from '../utils/ui';

const menus = [
  ['/dashboard', 'Beranda', 'home'],
  ['/divisi', 'Divisi', 'users'],
  ['/kegiatan', 'Kegiatan', 'calendar'],
  ['/tugas', 'Tugas', 'tasks'],
  ['/profil', 'Profil', 'user'],
];

// Menu utama. Di mobile tampil sebagai kapsul melayang di bawah layar,
// di desktop (lebar 900px ke atas) berubah menjadi sidebar di sisi kiri.
export default function AppNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="dock" aria-label="Menu utama">
      <div className="nav-brand">
        <span className="brand-mark">
          <Icon name="calendar" size={22} />
        </span>
        EventDesk
      </div>

      {menus.map(([to, label, icon]) => (
        <NavLink key={to} to={to} end={to === '/dashboard'}>
          <Icon name={icon} size={24} />
          <span>{label}</span>
        </NavLink>
      ))}

      <div className="nav-foot">
        <div className="nav-user">
          <span className="nav-avatar" style={coverStyle(user?.id)}>
            {initial(user?.nama)}
          </span>
          <div>
            <b>{user?.nama}</b>
            <small className="cap">{user?.role}</small>
          </div>
        </div>
        <button type="button" className="btn danger sm" onClick={logout}>
          <Icon name="logout" size={16} /> Keluar
        </button>
      </div>
    </nav>
  );
}
