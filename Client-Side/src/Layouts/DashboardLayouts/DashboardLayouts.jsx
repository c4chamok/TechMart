import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../components/sidebar/sidebar';

const DashboardLayouts = () => {
    return (
        <div className='w-full h-screen overflow-hidden flex'>
            <Sidebar/>
            <div className="overflow-y-scroll w-full">
                <Outlet />
            </div>   
        </div>
    );
};

export default DashboardLayouts;    <Outlet/>