// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateServiceReview from "../Modal/ModalServiceReview/ModalCreateServiceReview";
import ModalUpdateServiceReview from "../Modal/ModalServiceReview/ModalUpdateServiceReview";
import ModalDeleteServiceReview from "../Modal/ModalServiceReview/ModalDeleteServiceReview";
import TableServiceReview from "../Modal/ModalServiceReview/TableServiceReview";
// import { getAllServiceReview } from "../../services/serviceReviewServices";
import { getPaginate } from "../../services/paginateServices";

const ManagerServiceReview = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Service_Review";
  const [showModalCreateServiceReview, setShowModalCreateServiceReview] =
    useState(false);
  const [showModalUpdateServiceReview, setShowModalUpdateServiceReview] =
    useState(false);
  const [showModalDeleteServiceReview, setShowModalDeleteServiceReview] =
    useState(false);
  const [listServiceReview, setListServiceReview] = useState([]);
  const [serviceReviewDelete, setServiceReviewDelete] = useState({});
  const [serviceReviewUpdate, setServiceReviewUpdate] = useState({});

  const handleShowUpdateModal = (serviceReview) => {
    setServiceReviewUpdate(serviceReview);
    setShowModalUpdateServiceReview(true);
  };
  const handleShowDeleteModal = (serviceReview) => {
    setServiceReviewDelete(serviceReview);
    setShowModalDeleteServiceReview(true);
  };

  const fetchAllServiceReview = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    setListServiceReview(data.data);
    setTotalItems(data.totalItems);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchAllServiceReview();
  }, [currentPage]);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Service Review
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
              onClick={() => setShowModalCreateServiceReview(true)}
            >
              <FcPlus />
              Add new service review
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
        <ModalCreateServiceReview
          show={showModalCreateServiceReview}
          setShow={setShowModalCreateServiceReview}
          fetchAllServiceReview={fetchAllServiceReview}
        />
        <ModalUpdateServiceReview
          show={showModalUpdateServiceReview}
          setShow={setShowModalUpdateServiceReview}
          serviceReviewUpdate={serviceReviewUpdate}
          fetchAllServiceReview={fetchAllServiceReview}
        />
        <ModalDeleteServiceReview
          show={showModalDeleteServiceReview}
          setShow={setShowModalDeleteServiceReview}
          serviceReviewDelete={serviceReviewDelete}
          fetchAllServiceReview={fetchAllServiceReview}
        />

        <div className="btn-table-container"></div>
        <TableServiceReview
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listServiceReview={listServiceReview}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerServiceReview;
