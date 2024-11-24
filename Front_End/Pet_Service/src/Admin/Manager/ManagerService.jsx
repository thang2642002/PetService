// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateService from "../Modal/ModalService/ModalCreateService";
import ModalUpdateService from "../Modal/ModalService/ModalUpdateService";
import ModalDeleteService from "../Modal/ModalService/ModalDeleteService";
import { useEffect, useState } from "react";
import { getAllServices } from "../../services/serviceServices";
import TableService from "../Modal/ModalService/TableService";
import { FcPlus } from "react-icons/fc";

const ManagerService = () => {
  const [showModalCreateService, setShowModalCreateService] = useState(false);
  const [showModalUpdateService, setShowModalUpdateService] = useState(false);
  const [showModalDeleteService, setShowModalDeleteService] = useState(false);
  const [serviceDelete, setServiceDelete] = useState({});
  const [listService, setListService] = useState([]);
  const [serviceUpdate, setServiceUpdate] = useState({});

  const handleShowUpdateModal = (service) => {
    setServiceUpdate(service);
    setShowModalUpdateService(true);
  };
  const handleShowDeleteModal = (service) => {
    setServiceDelete(service);
    setShowModalDeleteService(true);
  };

  const fetchAllService = async () => {
    const data = await getAllServices();
    setListService(data.data);
  };

  useEffect(() => {
    fetchAllService();
  }, [listService]);
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
          fetchAllService={fetchAllService}
        />
        <ModalUpdateService
          show={showModalUpdateService}
          setShow={setShowModalUpdateService}
          serviceUpdate={serviceUpdate}
          fetchAllService={fetchAllService}
        />
        <ModalDeleteService
          show={showModalDeleteService}
          setShow={setShowModalDeleteService}
          serviceDelete={serviceDelete}
          fetchAllService={fetchAllService}
        />

        <div className="btn-table-container"></div>
        <TableService
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listService={listService}
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
