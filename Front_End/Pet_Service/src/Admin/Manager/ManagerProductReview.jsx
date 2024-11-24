// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateProductReview from "../Modal/ModalProductReview/ModalCreateProductReview";
import ModalUpdateProductReview from "../Modal/ModalProductReview/ModalUpdateProductReview";
import ModalDeleteProductReview from "../Modal/ModalProductReview/ModalDeleteProductReview";
import TableProductReview from "../Modal/ModalProductReview/TableProductReview";
import { getAllProductReview } from "../../services/productReviewServices";

import { FcPlus } from "react-icons/fc";

const ManagerProductReview = () => {
  const [showModalCreateProductReview, setShowModalCreateProductReview] =
    useState(false);
  const [showModalUpdateProductReview, setShowModalUpdateProductReview] =
    useState(false);
  const [showModalDeleteProductReview, setShowModalDeleteProductReview] =
    useState(false);
  const [listProductReview, setListProductReview] = useState([]);
  const [productReviewDelete, setProductReviewDelete] = useState({});
  const [productReviewUpdate, setProductReviewUpdate] = useState({});

  const handleShowUpdateModal = (productReview) => {
    setProductReviewUpdate(productReview);
    setShowModalUpdateProductReview(true);
  };
  const handleShowDeleteModal = (productReview) => {
    setProductReviewDelete(productReview);
    setShowModalDeleteProductReview(true);
  };

  const fetchAllProductReview = async () => {
    const data = await getAllProductReview();
    setListProductReview(data.data);
  };

  useEffect(() => {
    fetchAllProductReview();
  }, []);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Product Review
      </div>
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
              onClick={() => setShowModalCreateProductReview(true)}
            >
              <FcPlus />
              Add new product review
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
        <ModalCreateProductReview
          show={showModalCreateProductReview}
          setShow={setShowModalCreateProductReview}
          fetchAllProductReview={fetchAllProductReview}
        />
        <ModalUpdateProductReview
          show={showModalUpdateProductReview}
          setShow={setShowModalUpdateProductReview}
          productReviewUpdate={productReviewUpdate}
          fetchAllProductReview={fetchAllProductReview}
        />
        <ModalDeleteProductReview
          show={showModalDeleteProductReview}
          setShow={setShowModalDeleteProductReview}
          productReviewDelete={productReviewDelete}
          fetchAllProductReview={fetchAllProductReview}
        />

        <div className="btn-table-container"></div>
        <TableProductReview
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listProductReview={listProductReview}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerProductReview;
