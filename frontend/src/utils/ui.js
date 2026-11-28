// Helper kecil untuk tampilan: warna cover, inisial, warna status, dan format tanggal.

const palettes = [
  ['#6f8cf6', '#bccaff'],
  ['#f2789f', '#ffc4d8'],
  ['#45bf9d', '#b8eddb'],
  ['#f5a35c', '#ffdcae'],
  ['#8f7cf3', '#d6cdff'],
  ['#3ea8d8', '#b6e4f8'],
];

// Warna cover dibuat tetap untuk setiap id supaya kartu yang sama selalu berwarna sama.
export function coverStyle(id = 0) {
  const [a, b] = palettes[Number(id) % palettes.length];
  return { background: `linear-gradient(155deg, ${a}, ${b})` };
}

export function initial(text) {
  return (String(text || '?').trim()[0] || '?').toUpperCase();
}

// Nama tone dipakai sebagai class CSS: .tone-blue, .tone-peach, .tone-yellow, .tone-mint.
export function statusTone(value) {
  return (
    {
      rencana: 'blue',
      belum: 'peach',
      berjalan: 'yellow',
      dikerjakan: 'yellow',
      selesai: 'mint',
    }[value] || 'blue'
  );
}

export function formatDate(value) {
  if (!value) return 'Belum diatur';
  const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return String(value);
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
}
