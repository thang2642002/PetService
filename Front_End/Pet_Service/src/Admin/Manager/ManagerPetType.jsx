// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreatePetType from "../Modal/ModalPetType/ModalCreatePetType";
import ModalUpdatePetType from "../Modal/ModalPetType/ModalUpdatePetType";
import ModalDeletePetType from "../Modal/ModalPetType/ModalDeletePetType";
import { useState, useEffect } from "react";
import { getAllPetType } from "../../services/petTypeServices";
import TablePetType from "../Modal/ModalPetType/TablePetType";
import { FcPlus } from "react-icons/fc";

const ManagerPetType = () => {
  const [showModalCreatePetType, setShowModalCreatePetType] = useState(false);
  const [showModalUpdatePetType, setShowModalUpdatePetType] = useState(false);
  const [showModalDeletePetType, setShowModalDeletePetType] = useState(false);
  const [listPetType, setListPetType] = useState([]);
  const [petTypeDelete, setPetTypeDelete] = useState({});
  const handleShowUpdateModal = () => {
    setShowModalUpdatePetType(true);
  };
  const handleShowDeleteModal = (petType) => {
    setPetTypeDelete(petType);
    setShowModalDeletePetType(true);
  };

  const fetchAllPetType = async () => {
    const data = await getAllPetType();
    console.log(data);
    setListPetType(data.data);
  };

  useEffect(() => {
    fetchAllPetType();
  }, []);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Pet Type
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
              onClick={() => setShowModalCreatePetType(true)}
            >
              <FcPlus />
              Add new pet type
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
        <ModalCreatePetType
          show={showModalCreatePetType}
          setShow={setShowModalCreatePetType}
          fetchAllPetType={fetchAllPetType}
        />
        <ModalUpdatePetType
          show={showModalUpdatePetType}
          setShow={setShowModalUpdatePetType}
        />
        <ModalDeletePetType
          show={showModalDeletePetType}
          setShow={setShowModalDeletePetType}
          petTypeDelete={petTypeDelete}
          fetchAllPetType={fetchAllPetType}
        />

        <div className="btn-table-container"></div>
        <TablePetType
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listPetType={listPetType}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPetType;
