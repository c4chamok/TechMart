import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TableComponent from '../../components/Table/Table';
import Paginator from '../../components/Paginator/Paginator';
import SearchBar from '../../components/searchBar/searchBar';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const OrdersPage = () => {
    const axiosPublic = useAxiosPublic();
    const [allOrders, setAllOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const dataPerPage = 10;

    useEffect(() => {
        axiosPublic(`/api/total?table=Order`)
            .then(res => setOrdersCount(res.data?.info.size))
    }, [])

    const totalPages = Math.ceil(ordersCount / dataPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getAllOrders = async () => {
        setLoading(true);
        const token = localStorage.getItem("access-token");
        const { data } = await axiosPublic(`/api/orders?size=${dataPerPage}&page=${currentPage}&searchText=${searchText}`, {
            headers: { authorization: `bearer ${token}` },
        });

        const unWindedData = data.orders.map((order) => {
            const { customer, total, ...remained } = order;
            console.log(total);
            return { ...remained, customer_Name: customer.name, customer_Email: customer.email, total }
        })
        setLoading(false);
        setAllOrders(unWindedData);
    }

    useEffect(() => {
        getAllOrders();
    }, [currentPage, searchText])



    return (
        <div className="m-5 flex justify-center items-center">
            <div className="w-fit flex flex-col">
                <div className="w-full flex justify-between">
                    <h2 className="text-5xl"> All Orders</h2>
                </div>
                <div className="w-full mt-9 flex justify-between">
                    <SearchBar onSearch={(inputText) => setSearchText(inputText)} />
                </div>
                <div className="mt-7">
                    {
                        loading ? <LoadingComponent /> :
                            <TableComponent data={allOrders} removedHeaders={["customer"]} />
                    }
                </div>
                <Paginator currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default OrdersPage;
