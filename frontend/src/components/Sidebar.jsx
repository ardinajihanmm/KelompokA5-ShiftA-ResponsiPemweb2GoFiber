import {NavLink} from 'react-router-dom';
const menus=[['/','Dashboard'],['/divisi','Divisi'],['/kegiatan','Kegiatan'],['/tugas','Tugas'],['/profil','Profil']];
export default function Sidebar(){return <aside className="sidebar"><div className="brand"><span className="brand-icon">E</span><div>EventDesk<small>ORGANIZATION MANAGER</small></div></div><div className="nav-label">WORKSPACE</div><nav>{menus.map(([to,label])=><NavLink end={to==='/'} key={to} to={to}>{label}</NavLink>)}</nav><div className="side-foot">Kelompok A5 · Pemweb 2</div></aside>}
