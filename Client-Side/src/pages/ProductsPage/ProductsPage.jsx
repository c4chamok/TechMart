import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import TableComponent from "../../components/Table/Table";
import ProductModal from "../../components/ProductModal/ProductModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = [...Array(totalPages).keys()];


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });



  const fetchAllProducts = async () => {
    const { data } = await axiosPublic("/api/product");
    console.log(data);
    setTableData(data?.products);
  }

  useEffect(() => {
    fetchAllProducts();
  }, [])


  const handleAddOrEditProduct = async (product) => {
    // console.log("Product added:", product);
    const { data } = await axiosPublic.post("/api/product", { ...product });
    if (data?.success) {
      toast.success(data?.messages, { position: "top-right" });
      fetchAllProducts();
    }
  };


  return (
    <div className="m-5 w-full flex justify-center items-center">
      <div className="w-3/4 flex flex-col">
        <div className="w-full flex justify-between">
          <h2 className="text-5xl"> All products</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 cursor-pointer active:scale-95 items-center px-3 py-1 bg-red-400 text-white ">
            <GrAdd />
            Add products
          </button>
        </div>
        <div className="mt-7">
          <TableComponent data={TableData} />
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEditProduct}
        formData={formData}
        setFormData={setFormData}
      />
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`btn btn-sm ${currentPage === 1 ? "btn-disabled" : ""}`}
        >
          Previous
        </button>


        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-sm ${currentPage === index + 1 ? "btn-active btn-primary" : ""
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`btn btn-sm ${currentPage === totalPages ? "btn-disabled" : ""
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
