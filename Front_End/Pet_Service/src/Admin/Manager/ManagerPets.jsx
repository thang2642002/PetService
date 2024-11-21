// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import ModalCreatePet from "../Modal/ModalPets/ModalCreatePet";
import ModalUpdatePet from "../Modal/ModalPets/ModalUpdatePet";
import ModalDeletePet from "../Modal/ModalPets/ModalDeletePet";
import TablePet from "../Modal/ModalPets/TablePet";
import { useEffect, useState } from "react";
import { getAllPets } from "../../services/petServices";

const ManagerPets = () => {
  const [showModalCreatePet, setShowModalCreatePet] = useState(false);
  const [showModalUpdatePet, setShowModalUpdatePet] = useState(false);
  const [showModalDeletePet, setShowModalDeletePet] = useState(false);
  const [listPets, setListPets] = useState([]);
  const [petDelete, setPetDelete] = useState({});
  const handleShowUpdateModal = () => {
    setShowModalUpdatePet(true);
  };
  const handleShowDeleteModal = (pet) => {
    setPetDelete(pet);
    setShowModalDeletePet(true);
  };

  const fetchAllPet = async () => {
    const data = await getAllPets();
    console.log(data);
    setListPets(data.data);
  };

  useEffect(() => {
    fetchAllPet();
  }, []);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Pets</div>
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
              onClick={() => setShowModalCreatePet(true)}
            >
              <FcPlus />
              Add new pet
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
        <ModalCreatePet
          show={showModalCreatePet}
          setShow={setShowModalCreatePet}
          fetchAllPet={fetchAllPet}
        />
        <ModalUpdatePet
          show={showModalUpdatePet}
          setShow={setShowModalUpdatePet}
        />
        <ModalDeletePet
          show={showModalDeletePet}
          setShow={setShowModalDeletePet}
          petDelete={petDelete}
          fetchAllPet={fetchAllPet}
        />

        <div className="btn-table-container"></div>
        <TablePet
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listPets={listPets}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPets;
