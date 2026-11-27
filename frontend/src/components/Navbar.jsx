import {useAuth} from '../context/AuthContext';
export default function Navbar(){const {user,logout}=useAuth();return <header className="navbar"><span>Workspace / EventDesk</span><div className="nav-user"><div><b>{user.nama}</b><small>{user.role}</small></div><button className="secondary" onClick={logout}>Keluar</button></div></header>}
