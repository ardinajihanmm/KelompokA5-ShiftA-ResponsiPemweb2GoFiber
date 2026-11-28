import { Outlet } from 'react-router-dom';
import AppNav from '../components/AppNav';

export default function MainLayout() {
  return (
    <div className="app">
      <main className="page">
        <Outlet />
      </main>
      <AppNav />
    </div>
  );
}
