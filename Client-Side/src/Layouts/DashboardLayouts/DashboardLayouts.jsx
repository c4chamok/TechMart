import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../components/sidebar/sidebar';

const DashboardLayouts = () => {
    return (
        <div className='w-full h-screen flex'>
            <Sidebar/>
            <div className="w-full overflow-y-auto">
                <Outlet />
            </div>   
        </div>
    );
};

export default DashboardLayouts;    <Outlet/>