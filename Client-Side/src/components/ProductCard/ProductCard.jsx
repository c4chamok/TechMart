import React, { useState } from "react";
import { FaLaptop, FaBoxes, FaDollarSign, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../Store/useCartStore";
import useZustStates from "../../Store/useZustStates";

const ProductCard = ({ product }) => {
    const [cartCount, setCartCount] = useState(0);
    const { addToCart, cart } = useZustStates();
    const inCart = cart.filter((existing) => existing.prodId === product?._id)[0];

    const handleAddToCart = () => {
        setCartCount(cartCount + 1);
        // You can trigger global cart update here too
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5 w-full border hover:shadow-lg transition flex flex-col justify-between">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-4 text-blue-600">
                    <FaLaptop className="text-3xl" />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-2">
                        <FaDollarSign className="text-green-600" />
                        <span className="font-medium text-base">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaBoxes className="text-yellow-600" />
                        <span className="font-medium text-base">{product.stock} in stock</span>
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div>
                {inCart ? (
                    <span className="flex w-full justify-between">
                        <button
                            className="rounded-full w-1/4 text-white bg-red-500"
                            onClick={() => addToCart({ prodId: product?._id, qty: inCart?.qty + 1 })}
                        >
                            +
                        </button>
                        {inCart.qty}
                        <button
                            className="rounded-full w-1/4 text-white bg-red-500"
                            onClick={() => addToCart({ prodId: product?._id, qty: inCart?.qty - 1 })}
                        >
                            -
                        </button>
                    </span>

                ) : (
                    <button
                        onClick={() => addToCart({ prodId: product?._id, qty: 1 })}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
                    >
                        <FaCartPlus />
                        <span>Add to Cart</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
