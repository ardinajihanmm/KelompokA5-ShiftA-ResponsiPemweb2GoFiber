import ResourcePage from '../components/ResourcePage';import {get} from '../api/axios';
const statuses=['rencana','berjalan','selesai'].map(x=>({value:x,label:x}));
const fields=[{key:'nama_kegiatan',label:'Nama kegiatan'},{key:'divisi_id',label:'Divisi',type:'select',numeric:true},{key:'tanggal',label:'Tanggal',type:'date'},{key:'lokasi',label:'Lokasi'},{key:'status',label:'Status',type:'select',options:statuses,initial:'rencana'},{key:'deskripsi',label:'Deskripsi',type:'textarea',required:false}];
const columns=[{label:'Kegiatan',render:r=>r.nama_kegiatan},{label:'Divisi',render:r=>r.divisi?.nama_divisi||'—'},{label:'Tanggal',render:r=>r.tanggal},{label:'Lokasi',render:r=>r.lokasi},{label:'Status',render:r=><span className="status">{r.status}</span>}];
async function related(){return {divisi_id:(await get('/divisi')).map(x=>({value:x.id,label:x.nama_divisi}))};}
export default function Kegiatan(){return <ResourcePage title="Kegiatan" description="Atur jadwal dan pantau kegiatan organisasi." path="/kegiatan" fields={fields} columns={columns} paginated filters={[{key:'status',label:'status',options:statuses}]} related={related}/>}
