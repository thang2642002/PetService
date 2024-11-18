// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateService from "../Modal/ModalService/ModalCreateService";
import ModalUpdateService from "../Modal/ModalService/ModalUpdateService";
import ModalDeleteService from "../Modal/ModalService/ModalDeleteService";
import { useState } from "react";
// import { getListUser, getPage, getByName } from "../../../services/userService";
import TableService from "../Modal/ModalService/TableService";
import { FcPlus } from "react-icons/fc";

const ManagerService = () => {
  const [showModalCreateService, setShowModalCreateService] = useState(false);
  const [showModalUpdateService, setShowModalUpdateService] = useState(false);
  const [showModalDeleteService, setShowModalDeleteService] = useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdateService(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeleteService(true);
  };
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Service</div>
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
              onClick={() => setShowModalCreateService(true)}
            >
              <FcPlus />
              Add new service
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
        <ModalCreateService
          show={showModalCreateService}
          setShow={setShowModalCreateService}
        />
        <ModalUpdateService
          show={showModalUpdateService}
          setShow={setShowModalUpdateService}
        />
        <ModalDeleteService
          show={showModalDeleteService}
          setShow={setShowModalDeleteService}
        />

        <div className="btn-table-container"></div>
        <TableService
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

export default ManagerService;
