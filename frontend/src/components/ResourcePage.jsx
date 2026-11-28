import { useEffect, useState } from 'react';
import { api, get, message } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';
import PageTitle from './PageTitle';
import Sheet from './Sheet';
import { coverStyle, initial, statusTone } from '../utils/ui';

// Halaman CRUD yang dipakai bersama oleh Divisi, Kegiatan, dan Tugas.
// Aturan kolom: kolom pertama menjadi judul kartu, kolom dengan `pill: true` menjadi lencana status,
// kolom lainnya tampil sebagai baris keterangan.
export default function ResourcePage({
  title,
  description,
  path,
  fields,
  columns,
  paginated = false,
  filters = [],
  related,
  canMemberEdit = false,
}) {
  const { user } = useAuth();
  const admin = user.role === 'admin';
  const noun = title.toLowerCase();
  const limit = 10;

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState(null);
  const [detail, setDetail] = useState(null);
  const [options, setOptions] = useState({});
  const [editing, setEditing] = useState(null);
  const [confirmRow, setConfirmRow] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Ambil daftar data setiap halaman, pencarian, filter, atau penanda refresh berubah.
  useEffect(() => {
    let live = true;
    setLoading(true);
    setError('');
    get(path, paginated ? { page, limit, search, ...filter } : undefined)
      .then((data) => {
        if (!live) return;
        setRows(paginated ? data.items : data);
        setTotal(paginated ? data.total : data.length);
      })
      .catch((e) => live && setError(message(e)))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [path, page, search, filter, refresh, paginated]);

  // Pesan berhasil hilang sendiri setelah beberapa detik.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  async function begin(row) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const data = row ? await get(`${path}/${row.id}`) : {};
      const opts = admin && related ? await related() : {};
      setOptions(opts);
      setEditing(row ? data : null);
      setDetail(null);
      setForm(
        Object.fromEntries(
          fields.map((f) => {
            const value = data[f.key] ?? f.initial ?? '';
            return [f.key, f.type === 'date' ? String(value).slice(0, 10) : value];
          }),
        ),
      );
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  async function show(row) {
    setBusy(true);
    setError('');
    try {
      setDetail(await get(`${path}/${row.id}`));
      setForm(null);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const values = admin
        ? Object.fromEntries(fields.map((f) => [f.key, f.numeric ? Number(form[f.key]) : form[f.key]]))
        : { status: form.status };
      if (editing) await api.put(`${path}/${editing.id}`, values);
      else await api.post(path, values);
      setForm(null);
      setNotice('Data berhasil disimpan.');
      setRefresh((x) => x + 1);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    const row = confirmRow;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await api.delete(`${path}/${row.id}`);
      setConfirmRow(null);
      setNotice('Data berhasil dihapus.');
      setDetail(null);
      setForm(null);
      if (rows.length === 1 && page > 1) setPage((p) => p - 1);
      setRefresh((x) => x + 1);
    } catch (e) {
      setConfirmRow(null);
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }

  const shownFields = admin ? fields : fields.filter((f) => f.key === 'status');
  const titleCol = columns[0];
  const pillCol = columns.find((c) => c.pill);
  const metaCols = columns.slice(1).filter((c) => !c.pill);
  const canEdit = (row) => admin || (canMemberEdit && row.user_id === user.id);
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="stack">
      <PageTitle subtitle={description}>{title}</PageTitle>

      {error && !form && !confirmRow && (
        <div className="banner banner-error" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <div className="banner banner-ok" role="status">
          {notice}
        </div>
      )}

      {admin && (
        <section className="add-card">
          <div>
            <h3>Tambah {noun}</h3>
            <p>Buat data {noun} baru untuk organisasi.</p>
          </div>
          <button className="btn" disabled={busy} onClick={() => begin(null)}>
            <Icon name="plus" size={18} /> Tambah
          </button>
        </section>
      )}

      {paginated && (
        <div className="toolbar">
          <label className="search">
            <Icon name="search" size={20} />
            <input
              aria-label={`Cari ${noun}`}
              placeholder={`Cari ${noun}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
          {filters.map((f) => (
            <div className="chips" key={f.key} role="group" aria-label={`Filter ${f.label}`}>
              <button
                type="button"
                className={`chip ${!filter[f.key] ? 'on' : ''}`}
                onClick={() => {
                  setFilter({ ...filter, [f.key]: '' });
                  setPage(1);
                }}
              >
                Semua
              </button>
              {f.options.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  className={`chip ${filter[f.key] === o.value ? 'on' : ''}`}
                  onClick={() => {
                    setFilter({ ...filter, [f.key]: o.value });
                    setPage(1);
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="list-head">
        <h2 className="section-title">
          <span className="dot" /> Daftar {noun}
        </h2>
        <span className="count">{total} data</span>
      </div>

      {loading ? (
        <div className="items" aria-busy="true" aria-label="Memuat data">
          {[1, 2, 3, 4].map((n) => (
            <div className="skel" key={n} />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="empty">
          <Icon name="sparkle" size={30} />
          <h3>Belum ada data</h3>
          <p>{admin ? `Tekan tombol Tambah untuk membuat ${noun} pertama.` : `Data ${noun} akan muncul di sini.`}</p>
        </div>
      ) : (
        <div className="items">
          {rows.map((row) => (
            <article className="item" key={row.id}>
              <div className="item-cover" style={coverStyle(row.id)}>
                {initial(titleCol.render(row))}
              </div>
              <div className="item-body">
                <h3>{titleCol.render(row)}</h3>
                {pillCol && (
                  <span className={`pill tone-${statusTone(pillCol.value(row))}`}>{pillCol.render(row)}</span>
                )}
                {metaCols.map((col) => (
                  <p className="meta" key={col.label}>
                    <span>{col.label}</span> {col.render(row)}
                  </p>
                ))}
                <div className="item-actions">
                  <button className="btn ghost sm" disabled={busy} onClick={() => show(row)}>
                    Detail
                  </button>
                  {canEdit(row) && (
                    <button className="btn ghost sm" disabled={busy} onClick={() => begin(row)}>
                      <Icon name="edit" size={15} /> Edit
                    </button>
                  )}
                  {admin && (
                    <button className="btn danger sm" disabled={busy} onClick={() => setConfirmRow(row)}>
                      <Icon name="trash" size={15} /> Hapus
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {paginated && (
        <div className="pagination">
          <button className="btn ghost sm" disabled={page === 1 || loading} onClick={() => setPage((p) => p - 1)}>
            <Icon name="left" size={16} /> Sebelumnya
          </button>
          <span>
            Halaman {page} dari {pages}
          </span>
          <button
            className="btn ghost sm"
            disabled={page * limit >= total || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Berikutnya <Icon name="right" size={16} />
          </button>
        </div>
      )}

      {form && (
        <Sheet title={`${editing ? 'Edit' : 'Tambah'} ${noun}`} onClose={() => setForm(null)}>
          <form className="form" onSubmit={save}>
            {error && (
              <div className="banner banner-error" role="alert">
                {error}
              </div>
            )}
            {shownFields.map((f) => (
              <label className="field" key={f.key}>
                {f.label}
                {f.type === 'select' ? (
                  <select
                    required={f.required !== false}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  >
                    <option value="">Pilih {f.label.toLowerCase()}</option>
                    {(f.options || options[f.key] || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea
                    maxLength={1000}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                ) : (
                  <input
                    required={f.required !== false}
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
              </label>
            ))}
            <div className="form-actions">
              <button className="btn" disabled={busy}>
                {busy ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button type="button" className="btn ghost" onClick={() => setForm(null)}>
                Batal
              </button>
            </div>
          </form>
        </Sheet>
      )}

      {detail && (
        <Sheet title={`Detail ${noun}`} onClose={() => setDetail(null)}>
          <div className="detail">
            <div className="detail-top">
              <div className="item-cover" style={coverStyle(detail.id)}>
                {initial(titleCol.render(detail))}
              </div>
              <div>
                <h3>{titleCol.render(detail)}</h3>
                {pillCol && (
                  <span className={`pill tone-${statusTone(pillCol.value(detail))}`}>{pillCol.render(detail)}</span>
                )}
              </div>
            </div>
            <dl>
              {metaCols.map((col) => (
                <div key={col.label}>
                  <dt>{col.label}</dt>
                  <dd>{col.render(detail)}</dd>
                </div>
              ))}
              {!columns.some((c) => c.label === 'Deskripsi') && (
                <div>
                  <dt>Deskripsi</dt>
                  <dd>{detail.deskripsi || 'Tidak ada deskripsi'}</dd>
                </div>
              )}
            </dl>
            <button className="btn ghost" onClick={() => setDetail(null)}>
              Tutup
            </button>
          </div>
        </Sheet>
      )}

      {confirmRow && (
        <Sheet title="Hapus data ini?" onClose={() => setConfirmRow(null)}>
          <div className="detail">
            <p className="confirm-text">
              Data yang dihapus tidak bisa dikembalikan. Pastikan kamu memang ingin menghapusnya.
            </p>
            <div className="form-actions">
              <button className="btn danger-solid" disabled={busy} onClick={remove}>
                {busy ? 'Menghapus...' : 'Ya, hapus'}
              </button>
              <button className="btn ghost" onClick={() => setConfirmRow(null)}>
                Batal
              </button>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );
}
