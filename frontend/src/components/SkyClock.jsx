import { useEffect, useState } from 'react';

// Fase hari menentukan sapaan dan warna langit.
function phase(hour) {
  if (hour >= 4 && hour < 11) return 'pagi';
  if (hour >= 11 && hour < 15) return 'siang';
  if (hour >= 15 && hour < 18) return 'sore';
  return 'malam';
}

const pad = (n) => String(n).padStart(2, '0');

// Kartu sapaan dengan jam digital dan ilustrasi langit yang berubah mengikuti waktu.
export default function SkyClock({ name }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const p = phase(now.getHours());
  const date = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  return (
    <section className={`sky sky-${p}`} aria-label="Sapaan dan jam">
      <div className="sky-orb" />
      <div className="sky-cloud sky-cloud-a" />
      <div className="sky-cloud sky-cloud-b" />
      <div className="sky-stars" />

      <p className="sky-hello">
        Selamat {p}
        {name ? `, ${name}` : ''}
      </p>
      <div className="sky-time">
        {pad(now.getHours())}:{pad(now.getMinutes())}
        <small>:{pad(now.getSeconds())}</small>
      </div>
      <p className="sky-date">{date}</p>

      <svg className="sky-land" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true">
        <path className="hill-back" d="M0 60C70 20 150 30 220 58S340 80 400 48V130H0Z" />
        <path className="hill-front" d="M0 88C80 62 170 74 250 96S350 100 400 80V130H0Z" />
      </svg>

      <svg className="prop prop-house" width="48" height="48" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M0 18 22 0l22 18Z" fill="#f4727a" />
        <rect x="4" y="18" width="36" height="26" rx="3" fill="#ffffff" />
        <rect x="12" y="24" width="10" height="10" rx="2" fill="#8cc4f2" />
        <rect x="28" y="28" width="6" height="16" rx="2" fill="#a3624a" />
      </svg>
      <svg className="prop prop-tree" width="60" height="64" viewBox="0 0 60 64" aria-hidden="true">
        <rect x="26" y="34" width="7" height="30" rx="3" fill="#8a5a44" />
        <circle cx="29" cy="22" r="19" fill="#4fae6a" />
        <circle cx="45" cy="34" r="11" fill="#5cbb77" />
      </svg>
      <svg className="prop prop-pine" width="34" height="70" viewBox="0 0 34 70" aria-hidden="true">
        <rect x="14" y="50" width="6" height="20" rx="2" fill="#8a5a44" />
        <path d="M17 0 32 54H2Z" fill="#3f9a5d" />
      </svg>
    </section>
  );
}
