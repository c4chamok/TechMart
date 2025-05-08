import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useZustStates from '../Store/useZustStates';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({children}) => {
    const { user, isUserLoading } = useZustStates();
    const location = useLocation();

    if ( isUserLoading) {
        return (<div className="fixed inset-0 bg-gray-200/70 bg-opacity-50 flex items-center justify-center">
        <h2 className='text-5xl'>
            <CircularProgress />
        </h2>
    </div>);
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;