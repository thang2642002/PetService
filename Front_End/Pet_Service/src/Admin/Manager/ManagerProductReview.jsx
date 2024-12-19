// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalViewProductReview from "../Modal/ModalProductReview/ModalViewProductReview";
import TableProductReview from "../Modal/ModalProductReview/TableProductReview";
// import { getAllProductReview } from "../../services/productReviewServices";
import { getPaginate } from "../../services/paginateServices";

const ManagerProductReview = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Product_Review";
  const [showModalViewProductReview, setShowModalViewProductReview] =
    useState(false);
  const [listProductReview, setListProductReview] = useState([]);
  const [productReviewView, setProductReviewView] = useState({});

  const handleShowViewModal = (productReview) => {
    setProductReviewView(productReview);
    setShowModalViewProductReview(true);
  };

  const fetchAllProductReview = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      console.log("data", data);
      setListProductReview(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  console.log("chek listProductReview", listProductReview);

  useEffect(() => {
    fetchAllProductReview();
  }, [currentPage]);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Product Review
      </div>
      <div className="user-contents">
        <ModalViewProductReview
          show={showModalViewProductReview}
          setShow={setShowModalViewProductReview}
          productReviewView={productReviewView}
        />

        <div className="btn-table-container"></div>
        <TableProductReview
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          listProductReview={listProductReview}
          handleShowViewModal={handleShowViewModal}
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
