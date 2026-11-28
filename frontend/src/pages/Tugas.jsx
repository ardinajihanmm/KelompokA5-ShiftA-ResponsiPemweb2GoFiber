import ResourcePage from '../components/ResourcePage';
import { get, allKegiatan } from '../api/axios';
import { formatDate } from '../utils/ui';

const statuses = [
  { value: 'belum', label: 'Belum dikerjakan' },
  { value: 'dikerjakan', label: 'Sedang dikerjakan' },
  { value: 'selesai', label: 'Selesai' },
];

const fields = [
  { key: 'nama_tugas', label: 'Nama tugas' },
  { key: 'kegiatan_id', label: 'Kegiatan', type: 'select', numeric: true },
  { key: 'user_id', label: 'Penanggung jawab', type: 'select', numeric: true },
  { key: 'deadline', label: 'Deadline', type: 'date' },
  { key: 'status', label: 'Status', type: 'select', options: statuses, initial: 'belum' },
  { key: 'deskripsi', label: 'Deskripsi', type: 'textarea', required: false },
];

const statusLabel = (value) => statuses.find((s) => s.value === value)?.label || value;

const columns = [
  { label: 'Tugas', render: (r) => r.nama_tugas },
  { label: 'Status', pill: true, value: (r) => r.status, render: (r) => statusLabel(r.status) },
  { label: 'Kegiatan', render: (r) => r.kegiatan?.nama_kegiatan || 'Tanpa kegiatan' },
  { label: 'Penanggung jawab', render: (r) => r.user?.nama || 'Belum ditentukan' },
  { label: 'Deadline', render: (r) => formatDate(r.deadline) },
];

// Pilihan kegiatan dan penanggung jawab untuk form tugas.
async function related() {
  const [k, u] = await Promise.all([allKegiatan(), get('/users')]);
  return {
    kegiatan_id: k.map((x) => ({ value: x.id, label: x.nama_kegiatan })),
    user_id: u.map((x) => ({ value: x.id, label: x.nama })),
  };
}

export default function Tugas() {
  return (
    <ResourcePage
      title="Tugas"
      description="Kelola penanggung jawab dan progres tugas. Anggota dapat memperbarui status tugas sendiri."
      path="/tugas"
      fields={fields}
      columns={columns}
      related={related}
      canMemberEdit
    />
  );
}
