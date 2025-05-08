import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import Paginator from '../../components/Paginator/Paginator';

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);
    const dataPerPage = 10;

    console.log(allProducts);

    const totalPages = Math.ceil(productsCount / dataPerPage);
    
    const fetchAllProducts = async () => {
        setLoading(true);
        const { data } = await axiosPublic(`/api/product?page=${currentPage}&size=${dataPerPage}`);
        setLoading(false);
        setAllProducts(data?.products);
        setProductsCount(data?.totalProductsCount)
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
      };


    useEffect(() => {
        fetchAllProducts();
    }, [currentPage]);

    if (loading) return <LoadingComponent />

    return (
        <div className="flex flex-col items-center px-4 my-10">
            <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    allProducts.map((prod, idx) => (
                        <ProductCard key={idx} product={prod} />
                    ))
                }
            </div>
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>

    );
};

export default Home;