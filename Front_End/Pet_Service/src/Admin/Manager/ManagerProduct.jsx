// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import ModalCreateProduct from "../Modal/ModalProduct/ModalCreateProduct";
import ModalUpdateProduct from "../Modal/ModalProduct/ModalUpdateProduct";
import ModalDeleteProduct from "../Modal/ModalProduct/ModalDeleteProduct";
import TableProduct from "../Modal/ModalProduct/TableProduct";
// import { getAllProduct } from "../../services/productServices";
import { getPaginate } from "../../services/paginateServices";
import { fetchAllCategory } from "../../services/categoryServices";

const ManagerProduct = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Products";
  const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [productDelete, setProductDelete] = useState({});
  const [productUpdate, setProductUpdate] = useState({});
  const [listCategory, setListCategory] = useState([]);

  const handleShowUpdateModal = (product) => {
    setProductUpdate(product);
    setShowModalUpdateProduct(true);
  };
  const handleShowDeleteModal = (product) => {
    setProductDelete(product);
    setShowModalDeleteProduct(true);
  };

  const fetchAllProduct = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    setListProduct(data.data);
    setTotalItems(data.totalItems);
    setTotalPages(data.totalPages);
  };

  const fetchCategory = async () => {
    const dataCategory = await fetchAllCategory();
    if (dataCategory && dataCategory.errCode === 0) {
      setListCategory(dataCategory.data);
    }
  };

  useEffect(() => {
    fetchAllProduct();
    fetchCategory();
  }, []);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Product</div>
      <div className="user-contents">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="btn-add-new">
            <button
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                gap: "8px",
              }}
              onClick={() => setShowModalCreateProduct(true)}
            >
              <FcPlus />
              Add new product
            </button>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Enter your input"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreateProduct
          show={showModalCreateProduct}
          setShow={setShowModalCreateProduct}
          fetchAllProduct={fetchAllProduct}
          listCategory={listCategory}
        />
        <ModalUpdateProduct
          show={showModalUpdateProduct}
          setShow={setShowModalUpdateProduct}
          productUpdate={productUpdate}
          fetchAllProduct={fetchAllProduct}
          listCategory={listCategory}
        />
        <ModalDeleteProduct
          show={showModalDeleteProduct}
          setShow={setShowModalDeleteProduct}
          productDelete={productDelete}
          fetchAllProduct={fetchAllProduct}
        />

        <div className="btn-table-container"></div>
        <TableProduct
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listProduct={listProduct}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerProduct;
