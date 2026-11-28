import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const menus = [
  ['/dashboard', 'Beranda', 'home'],
  ['/divisi', 'Divisi', 'users'],
  ['/kegiatan', 'Kegiatan', 'calendar'],
  ['/tugas', 'Tugas', 'tasks'],
  ['/profil', 'Profil', 'user'],
];

// Menu utama berbentuk kapsul melayang di bawah layar, seperti pada desain referensi.
export default function BottomNav() {
  return (
    <nav className="dock" aria-label="Menu utama">
      {menus.map(([to, label, icon]) => (
        <NavLink key={to} to={to} end={to === '/dashboard'}>
          <Icon name={icon} size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
