import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useZustStates from '../../Store/useZustStates';
import TableComponent from '../../components/Table/Table';

const MyOrdersPage = () => {
    const axiosPublic = useAxiosPublic();
    const { getUser, user } = useZustStates();
    const [myOrders, setMyOrders] = useState([]);

    const getMyOrders = async (params) => {
        const token = localStorage.getItem("access-token");
        const { data } = await axiosPublic(`/api/orders?userId=${user._id}`, {
            headers: { authorization: `bearer ${token}` },
        })
        const unWindedData = data.orders.map((order) => {
            const { customer, ...remained } = order;
            return { ...remained, customer_Name: customer.name, customer_Email: customer.email }
        })
        setMyOrders(unWindedData);
    }

    console.log(myOrders);

    useEffect(() => {
        getMyOrders()
    }, [])

    return (
        <div className='mt-8 flex flex-col items-center '>
            <div>

                <TableComponent data={myOrders} />
            </div>
        </div>
    );
};

export default MyOrdersPage;
