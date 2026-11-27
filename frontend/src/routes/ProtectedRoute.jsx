import {Navigate,Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
export default function ProtectedRoute(){const {user,loading,error,refresh,logout}=useAuth();if(loading)return <div className="center">Memuat sesi...</div>;if(error)return <div className="center"><p>{error}</p><button onClick={refresh}>Coba lagi</button> <button onClick={logout}>Keluar</button></div>;return user?<Outlet/>:<Navigate to="/login" replace/>;}
