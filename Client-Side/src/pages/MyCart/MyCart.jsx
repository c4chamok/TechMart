import React, { useEffect, useState } from 'react';
import States from '../../Store/states';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaMinus, FaPlus } from 'react-icons/fa';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal ';

const MyCart = () => {
    const { cart, addToCart } = States();
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pidList = cart.map((item) => item.prodId);

    const fetchProductsByIds = async () => {
        const { data } = await axiosPublic.post("/api/selected-products", { pidList });
        setProducts(data?.products);
    };

    useEffect(() => {
        if (pidList.length > 0) fetchProductsByIds();
    }, [cart]);

    const getQuantity = (id) => {
        return cart.find((item) => item.prodId === id)?.qty || 0;
    };

    const calculateSubtotal = (price, qty) => {
        return (price * qty).toFixed(2);
    };

    const calculateTotal = () => {
        return products
            .reduce((sum, prod) => sum + prod.price * getQuantity(prod._id), 0)
            .toFixed(2);
    };

    const proceedToPay = async (params) => {
        const {data} = await axiosPublic.post("/api/make-order", cart)
        console.log(data);
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">🛒 My Cart</h2>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                onConfirm={proceedToPay}

            />

            {products.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    const qty = getQuantity(product._id);
                                    return (
                                        <tr key={product._id} className="border-t">
                                            <td className="p-3 font-medium text-gray-800">
                                                {product.name}
                                            </td>
                                            <td className="p-3">${product.price}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                                        onClick={() =>
                                                            addToCart({
                                                                prodId: product._id,
                                                                qty: Math.max(qty - 1, 0),
                                                            })
                                                        }
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span>{qty}</span>
                                                    <button
                                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                                        onClick={() =>
                                                            addToCart({
                                                                prodId: product._id,
                                                                qty: qty + 1,
                                                            })
                                                        }
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                ${calculateSubtotal(product.price, qty)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-right mt-6">
                        <h3 className="text-xl font-semibold">
                            Total: <span className="text-green-600">${calculateTotal()}</span>
                        </h3>
                        <button
                            onClick={()=>setIsModalOpen(true)}
                            className='px-3 py-1 mt-2 bg-green-600 active:scale-95 text-white'>
                            Proceed To Pay
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCart;