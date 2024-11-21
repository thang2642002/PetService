// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import ModalCreatePetScores from "../Modal/ModalPetScores/ModalCreatePetScores";
import ModalUpdatePetScores from "../Modal/ModalPetScores/ModalUpdatePetScores";
import ModalDeletePetScores from "../Modal/ModalPetScores/ModalDeletePetScores";
import TablePetScores from "../Modal/ModalPetScores/TableUserPet";
import { getAllPetScores } from "../../services/petScoresServices";

const ManagerPetScores = () => {
  const [showModalCreatePetScores, setShowModalCreatePetScores] =
    useState(false);
  const [showModalUpdatePetScores, setShowModalUpdatePetScores] =
    useState(false);
  const [showModalDeletePetScores, setShowModalDeletePetScores] =
    useState(false);
  const [listPetScores, setListPetScores] = useState([]);
  const [petScoresDelete, setPetScoresDelete] = useState({});

  const handleShowUpdateModal = () => {
    setShowModalUpdatePetScores(true);
  };
  const handleShowDeleteModal = (petScores) => {
    setPetScoresDelete(petScores);
    setShowModalDeletePetScores(true);
  };

  const fetchAllPetScores = async () => {
    const data = await getAllPetScores();
    setListPetScores(data.data);
  };

  useEffect(() => {
    fetchAllPetScores();
  }, []);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Pet Scores
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
              onClick={() => setShowModalCreatePetScores(true)}
            >
              <FcPlus />
              Add new pet scores
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
        <ModalCreatePetScores
          show={showModalCreatePetScores}
          setShow={setShowModalCreatePetScores}
          fetchAllPetScores={fetchAllPetScores}
        />
        <ModalUpdatePetScores
          show={showModalUpdatePetScores}
          setShow={setShowModalUpdatePetScores}
        />
        <ModalDeletePetScores
          show={showModalDeletePetScores}
          setShow={setShowModalDeletePetScores}
          petScoresDelete={petScoresDelete}
          fetchAllPetScores={fetchAllPetScores}
        />

        <div className="btn-table-container"></div>
        <TablePetScores
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listPetScores={listPetScores}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPetScores;
