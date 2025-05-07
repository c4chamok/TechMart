import React from 'react';

const Paginator = ({totalPages, currentPage , onPageChange}) => {
     
    return (
        <div className="flex justify-center items-center mt-9 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 bg-indigo-500 text-white disabled:grayscale active:scale-95 hover:contrast-200`}
                disabled={currentPage === 1}
            >
                Previous
            </button>


            {[...Array(totalPages).keys()].map((page, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-3 py-1 bg-indigo-500 text-white disabled:grayscale active:scale-95 hover:contrast-200`}
                    disabled={currentPage === (index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 bg-indigo-500 text-white disabled:grayscale active:scale-95 hover:contrast-200`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Paginator;