import {Outlet} from 'react-router-dom';import Sidebar from '../components/Sidebar';import Navbar from '../components/Navbar';
export default function MainLayout(){return <div className="shell"><Sidebar/><div className="main"><Navbar/><main className="content"><Outlet/></main></div></div>}
