// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateAppointment from "../Modal/ModalAppointment/ModalCreateAppointment";
import ModalUpdateAppointment from "../Modal/ModalAppointment/ModalUpdateAppointment";
import ModalDeleteAppointment from "../Modal/ModalAppointment/ModalDeleteAppointment";
import TableAppointment from "../Modal/ModalAppointment/TableAppointment";
import { getPaginate } from "../../services/paginateServices";

import { FcPlus } from "react-icons/fc";

const ManagerAppointment = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Appointments";
  const [showModalCreateAppointment, setShowModalCreateAppointment] =
    useState(false);
  const [showModalUpdateAppointment, setShowModalUpdateAppointment] =
    useState(false);
  const [showModalDeleteAppointment, setShowModalDeleteAppointment] =
    useState(false);
  const [listAppointment, setListAppointment] = useState([]);
  const [appointmentDelete, setAppointmentDelete] = useState({});
  const [appointmentUpdate, setAppointmentUpdate] = useState({});

  const handleShowUpdateModal = (appointment) => {
    setAppointmentUpdate(appointment);
    setShowModalUpdateAppointment(true);
  };
  const handleShowDeleteModal = (appointment) => {
    setAppointmentDelete(appointment);
    setShowModalDeleteAppointment(true);
  };

  const fetchAllAppointment = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListAppointment(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllAppointment();
  }, [currentPage]);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Quản lý đặt lịch
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
              Thêm lịch hẹn
            </button>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Nhập thông tin"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Tìm kiếm
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreateAppointment
          show={showModalCreateAppointment}
          setShow={setShowModalCreateAppointment}
          fetchAllAppointment={fetchAllAppointment}
        />
        <ModalUpdateAppointment
          show={showModalUpdateAppointment}
          setShow={setShowModalUpdateAppointment}
          appointmentUpdate={appointmentUpdate}
          fetchAllAppointment={fetchAllAppointment}
        />
        <ModalDeleteAppointment
          show={showModalDeleteAppointment}
          setShow={setShowModalDeleteAppointment}
          appointmentDelete={appointmentDelete}
          fetchAllAppointment={fetchAllAppointment}
        />

        <div className="btn-table-container"></div>
        <TableAppointment
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listAppointment={listAppointment}
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
