import React from "react";
import { FaLaptop, FaBoxes, FaDollarSign } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 max-w-sm w-full border hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-4 text-blue-600">
        <FaLaptop className="text-3xl" />
        <h2 className="text-xl font-semibold">{product.name}</h2>
      </div>

      <p className="text-gray-600 mb-4">{product.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-700">
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
  );
};

export default ProductCard;