// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateOrderItem from "../Modal/ModalOrderItem/ModalCreateOrderItem";
import ModalUpdateOrderItem from "../Modal/ModalOrderItem/ModalUpdateOrderItem";
import ModalDeleteOrderItem from "../Modal/ModalOrderItem/ModalDeleteOrderItem";
import TableOrderItem from "../Modal/ModalOrderItem/TableOrderItem";
// import { getListUser, getPage, getByName } from "../../../services/userService";

import { FcPlus } from "react-icons/fc";

const ManagerOrderItem = () => {
  const [showModalCreateOrderItem, setShowModalCreateOrderItem] =
    useState(false);
  const [showModalUpdateOrderItem, setShowModalUpdateOrderItem] =
    useState(false);
  const [showModalDeleteOrderItem, setShowModalDeleteOrderItem] =
    useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdateOrderItem(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeleteOrderItem(true);
  };
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Order Item
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
              onClick={() => setShowModalCreateOrderItem(true)}
            >
              <FcPlus />
              Add new order item
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
        <ModalCreateOrderItem
          show={showModalCreateOrderItem}
          setShow={setShowModalCreateOrderItem}
        />
        <ModalUpdateOrderItem
          show={showModalUpdateOrderItem}
          setShow={setShowModalUpdateOrderItem}
        />
        <ModalDeleteOrderItem
          show={showModalDeleteOrderItem}
          setShow={setShowModalDeleteOrderItem}
        />

        <div className="btn-table-container"></div>
        <TableOrderItem
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

export default ManagerOrderItem;
