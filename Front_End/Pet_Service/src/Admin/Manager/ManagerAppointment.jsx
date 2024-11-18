// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateAppointment from "../Modal/ModalAppointment/ModalCreateAppointment";
import ModalUpdateAppointment from "../Modal/ModalAppointment/ModalUpdateAppointment";
import ModalDeleteAppointment from "../Modal/ModalAppointment/ModalDeleteAppointment";
import TableAppointment from "../Modal/ModalAppointment/TableAppointment";
// import { getListUser, getPage, getByName } from "../../../services/userService";

import { FcPlus } from "react-icons/fc";

const ManagerAppointment = () => {
  const [showModalCreateAppointment, setShowModalCreateAppointment] =
    useState(false);
  const [showModalUpdateAppointment, setShowModalUpdateAppointment] =
    useState(false);
  const [showModalDeleteAppointment, setShowModalDeleteAppointment] =
    useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdateAppointment(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeleteAppointment(true);
  };
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Appointment
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
              onClick={() => setShowModalCreateAppointment(true)}
            >
              <FcPlus />
              Add new appointment
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
        <ModalCreateAppointment
          show={showModalCreateAppointment}
          setShow={setShowModalCreateAppointment}
        />
        <ModalUpdateAppointment
          show={showModalUpdateAppointment}
          setShow={setShowModalUpdateAppointment}
        />
        <ModalDeleteAppointment
          show={showModalDeleteAppointment}
          setShow={setShowModalDeleteAppointment}
        />

        <div className="btn-table-container"></div>
        <TableAppointment
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

export default ManagerAppointment;
