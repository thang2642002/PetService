// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateServiceReview from "../Modal/ModalServiceReview/ModalCreateServiceReview";
import ModalUpdateServiceReview from "../Modal/ModalServiceReview/ModalUpdateServiceReview";
import ModalDeleteServiceReview from "../Modal/ModalServiceReview/ModalDeleteServiceReview";
import TableServiceReview from "../Modal/ModalServiceReview/TableServiceReview";
// import { getListUser, getPage, getByName } from "../../../services/userService";

import { FcPlus } from "react-icons/fc";

const ManagerServiceReview = () => {
  const [showModalCreateServiceReview, setShowModalCreateServiceReview] =
    useState(false);
  const [showModalUpdateServiceReview, setShowModalUpdateServiceReview] =
    useState(false);
  const [showModalDeleteServiceReview, setShowModalDeleteServiceReview] =
    useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdateServiceReview(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeleteServiceReview(true);
  };
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
        />
        <ModalUpdateServiceReview
          show={showModalUpdateServiceReview}
          setShow={setShowModalUpdateServiceReview}
        />
        <ModalDeleteServiceReview
          show={showModalDeleteServiceReview}
          setShow={setShowModalDeleteServiceReview}
        />

        <div className="btn-table-container"></div>
        <TableServiceReview
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
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
