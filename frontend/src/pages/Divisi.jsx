import ResourcePage from '../components/ResourcePage';
const fields=[{key:'nama_divisi',label:'Nama divisi'},{key:'deskripsi',label:'Deskripsi',type:'textarea',required:false}];
const columns=[{label:'Nama divisi',render:r=>r.nama_divisi},{label:'Deskripsi',render:r=>r.deskripsi||'—'}];
export default function Divisi(){return <ResourcePage title="Divisi" description="Kelola data divisi organisasi." path="/divisi" fields={fields} columns={columns}/>}
