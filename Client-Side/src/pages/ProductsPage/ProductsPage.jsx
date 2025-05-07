import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import TableComponent from "../../components/Table/Table";
import ProductModal from "../../components/ProductModal/ProductModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Paginator from "../../components/Paginator/Paginator";
import SearchBar from "../../components/searchBar/searchBar";

const ProductsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dataPerPage = 10;

  useEffect(() => {
    axiosPublic(`/api/total?table=Product`)
      .then(res => setProductsCount(res.data?.info.size))
  }, [])

  const totalPages = Math.ceil(productsCount / dataPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const fetchAllProducts = async () => {
    const { data } = await axiosPublic(`/api/product?page=${currentPage}&size=${dataPerPage}&searchText=${searchText}`);
    console.log(data);
    setTableData(data?.products);
  }

  useEffect(() => {
    fetchAllProducts();
  }, [currentPage, searchText])


  const handleAddOrEditProduct = async (product) => {
    // console.log("Product added:", product);
    const { data } = await axiosPublic.post("/api/product", { ...product });
    if (data?.success) {
      toast.success(data?.messages, { position: "top-right" });
      fetchAllProducts();
    }
  };


  return (
    <div className="m-5 flex justify-center items-center">
      <div className="w-3/4 flex flex-col">
        <div className="w-full flex justify-between">
          <h2 className="text-5xl"> All products</h2>
        </div>
        <div className="w-full mt-9 flex justify-between">
          <SearchBar onSearch={(inputText) => setSearchText(inputText)} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 cursor-pointer active:scale-95 items-center px-3 py-1 bg-red-400 text-white ">
            <GrAdd />
            Add products
          </button>
        </div>

        <div className="mt-7">
          <TableComponent data={TableData} dataPerpage={dataPerPage} currentPage={currentPage} />
        </div>

        <Paginator currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEditProduct}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ProductsPage;
