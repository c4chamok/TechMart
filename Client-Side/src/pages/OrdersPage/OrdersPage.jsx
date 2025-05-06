import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TableComponent from '../../components/Table/Table';
import { GrAdd } from 'react-icons/gr';

const OrdersPage = () => {
    const axiosPublic = useAxiosPublic();
    const [allOrders, setAllOrders] = useState([]);
    const getAllOrders = async () => {
        const { data } = await axiosPublic("/api/orders");
        const unWindedData = data.orders.map((order)=>{
            const { customer, ...remained } = order;
            return {...remained, customer_Name: customer[0].name, customer_Email: customer[0].email }
        })
        setAllOrders(unWindedData);
    }

    
    // console.log();


    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <div>
            <div className="m-5 w-full flex justify-center items-center">
                <div className="w-11/12 flex flex-col">
                    <div className="w-full flex justify-between">
                        <h2 className="text-5xl"> All Orders</h2>
                    </div>
                    <div className="mt-7">
                        <TableComponent data={allOrders} removedHeaders={["customer"]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
