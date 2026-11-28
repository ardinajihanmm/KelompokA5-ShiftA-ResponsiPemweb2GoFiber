import { Link } from 'react-router-dom';
import Icon from './Icon';

// Kerangka halaman login dan registrasi: latar pastel, logo, dan kartu di tengah.
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <section className="auth-card">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Icon name="calendar" size={22} />
          </span>
          EventDesk
        </Link>
        <h1>{title}</h1>
        <svg className="squiggle" width="118" height="14" viewBox="0 0 118 14" fill="none" aria-hidden="true">
          <path d="M2 7q8-9 16 0t16 0 16 0 16 0 16 0 16 0 16 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className="muted">{subtitle}</p>
        {children}
        <p className="auth-foot">{footer}</p>
      </section>
    </div>
  );
}
