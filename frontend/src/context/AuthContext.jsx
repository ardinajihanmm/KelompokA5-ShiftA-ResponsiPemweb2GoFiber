import {createContext,useContext,useEffect,useState} from 'react';
import {api,get} from '../api/axios';
const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const logout=()=>{localStorage.removeItem('eventdesk_token');setUser(null);setError('');};
 const refresh=async()=>{setLoading(true);setError('');try{if(localStorage.getItem('eventdesk_token'))setUser(await get('/auth/profile'));}catch(e){if(e.response?.status===401)logout();else setError('Tidak dapat memeriksa sesi. Coba lagi.');}finally{setLoading(false);}};
 useEffect(()=>{const listener=()=>logout();window.addEventListener('eventdesk:logout',listener);refresh();return()=>window.removeEventListener('eventdesk:logout',listener);},[]);
 const login=async(values)=>{const {data}=await api.post('/auth/login',values);localStorage.setItem('eventdesk_token',data.data.token);setUser(data.data.user);setError('');};
 return <AuthContext.Provider value={{user,loading,error,refresh,login,logout}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
