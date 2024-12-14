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
// import { getAllPetScores } from "../../services/petScoresServices";
import { getPaginate } from "../../services/paginateServices";

const ManagerPetScores = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "PetScore";
  const [showModalCreatePetScores, setShowModalCreatePetScores] =
    useState(false);
  const [showModalUpdatePetScores, setShowModalUpdatePetScores] =
    useState(false);
  const [showModalDeletePetScores, setShowModalDeletePetScores] =
    useState(false);
  const [listPetScores, setListPetScores] = useState([]);
  const [petScoresDelete, setPetScoresDelete] = useState({});
  const [petScoresUpdate, setPetScoresUpdate] = useState({});

  const handleShowUpdateModal = (petScores) => {
    setPetScoresUpdate(petScores);
    setShowModalUpdatePetScores(true);
  };
  const handleShowDeleteModal = (petScores) => {
    setPetScoresDelete(petScores);
    setShowModalDeletePetScores(true);
  };

  const fetchAllPetScores = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListPetScores(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllPetScores();
  }, [currentPage]);
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
          petScoresUpdate={petScoresUpdate}
          fetchAllPetScores={fetchAllPetScores}
        />
        <ModalDeletePetScores
          show={showModalDeletePetScores}
          setShow={setShowModalDeletePetScores}
          petScoresDelete={petScoresDelete}
          fetchAllPetScores={fetchAllPetScores}
        />

        <div className="btn-table-container"></div>
        <TablePetScores
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
