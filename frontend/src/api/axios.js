import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL || 'http://localhost:3000/api',timeout:15000});
api.interceptors.request.use(config=>{const token=localStorage.getItem('eventdesk_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(res=>res,error=>{if(error.response?.status===401 && !['/auth/login','/auth/register'].includes(error.config?.url)){localStorage.removeItem('eventdesk_token');window.dispatchEvent(new Event('eventdesk:logout'));}return Promise.reject(error);});
export const message=error=>error.response?.data?.pesan || (error.code==='ECONNABORTED'?'Server terlalu lama merespons.':'Tidak dapat menghubungi server.');
export const get=async(path,params)=>(await api.get(path,{params})).data.data;
export async function allKegiatan(){let page=1,rows=[];while(true){const data=await get('/kegiatan',{page,limit:100});rows.push(...data.items);if(rows.length>=data.total || !data.items.length)return rows;page++;}}
