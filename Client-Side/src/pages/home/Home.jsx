import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from '../../components/ProductCard/ProductCard';
import useZustStates from '../../Store/useZustStates';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { cart } = useZustStates();
    console.log(cart);

    const fetchAllProducts = async () => {
        const { data } = await axiosPublic("/api/product");
        console.log(data);
        setAllProducts(data?.products);
      }
    
    useEffect(()=>{
        fetchAllProducts();
    },[]);

    return (
        <div className='flex flex-col items-center '>
           <div className='m-3 w-3/4 grid grid-cols-3 gap-2'>
                {
                    allProducts.map((prod, idx)=><ProductCard key={idx} product={prod}/>)
                }
           </div>
        </div>
    );
};

export default Home;