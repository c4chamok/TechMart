import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import TableComponent from "../../components/Table/Table";
import ProductModal from "../../components/ProductModal/ProductModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TableData, setTableData] = useState([]);

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

  useEffect(()=>{
    fetchAllProducts();
  },[])

  // const data = [
  //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  //   { id: 3, name: "Alice Brown", email: "alice@example.com", role: "Moderator", status: "Active" },
  //   { id: 4, name: "Bob Lee", email: "bob@example.com", role: "User", status: "Pending" },
  // ];

  const handleAddOrEditProduct = async (product) => {
    // console.log("Product added:", product);
    const { data } = await axiosPublic.post("/api/product", { ...product });
    if (data?.success){
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
            onClick={()=>setIsModalOpen(true)}
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
        onClose={()=>setIsModalOpen(false)}
        onSubmit={handleAddOrEditProduct}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ProductsPage;
