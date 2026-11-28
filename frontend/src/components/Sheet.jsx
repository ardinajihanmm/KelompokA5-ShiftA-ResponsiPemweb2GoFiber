import { useEffect } from 'react';
import Icon from './Icon';

// Panel yang muncul dari bawah (bottom sheet) untuk form, detail, dan konfirmasi.
export default function Sheet({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-grab" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" aria-label="Tutup" onClick={onClose}>
            <Icon name="x" size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
