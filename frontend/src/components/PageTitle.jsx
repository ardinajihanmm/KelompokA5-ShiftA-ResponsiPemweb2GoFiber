// Judul halaman dengan garis bergelombang di bawahnya.
export default function PageTitle({ children, subtitle }) {
  return (
    <header className="page-title">
      <h1>{children}</h1>
      <svg className="squiggle" width="118" height="14" viewBox="0 0 118 14" fill="none" aria-hidden="true">
        <path d="M2 7q8-9 16 0t16 0 16 0 16 0 16 0 16 0 16 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
