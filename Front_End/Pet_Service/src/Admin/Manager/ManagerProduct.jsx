// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateProduct from "../Modal/ModalProduct/ModalCreateProduct";
import ModalUpdateProduct from "../Modal/ModalProduct/ModalUpdateProduct";
import ModalDeleteProduct from "../Modal/ModalProduct/ModalDeleteProduct";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../services/productServices";
import TableProduct from "../Modal/ModalProduct/TableProduct";
import { FcPlus } from "react-icons/fc";

const ManagerProduct = () => {
  const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [productDelete, setProductDelete] = useState({});
  const [productUpdate, setProductUpdate] = useState({});

  const handleShowUpdateModal = (product) => {
    setProductUpdate(product);
    setShowModalUpdateProduct(true);
  };
  const handleShowDeleteModal = (product) => {
    setProductDelete(product);
    setShowModalDeleteProduct(true);
  };

  const fetchAllProduct = async () => {
    const data = await getAllProduct();
    setListProduct(data.data);
  };

  useEffect(() => {
    fetchAllProduct();
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
        />
        <ModalUpdateProduct
          show={showModalUpdateProduct}
          setShow={setShowModalUpdateProduct}
          productUpdate={productUpdate}
          fetchAllProduct={fetchAllProduct}
        />
        <ModalDeleteProduct
          show={showModalDeleteProduct}
          setShow={setShowModalDeleteProduct}
          productDelete={productDelete}
          fetchAllProduct={fetchAllProduct}
        />

        <div className="btn-table-container"></div>
        <TableProduct
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
