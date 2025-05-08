import { CircularProgress } from '@mui/material';
import React from 'react';

const LoadingComponent = () => {
    return (
        <div className='w-full h-32 flex justify-center items-center '>
            <CircularProgress />
        </div>
    );
};

export default LoadingComponent;