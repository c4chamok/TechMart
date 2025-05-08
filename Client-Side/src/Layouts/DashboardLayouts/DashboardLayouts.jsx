import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../components/sidebar/sidebar';
import useZustStates from '../../Store/useZustStates';

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