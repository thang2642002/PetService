import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createPetScores } from "../../../services/petScoresServices";

const ModalCreatePetScores = (props) => {
  const { show, setShow, fetchAllPetScores } = props;
  const handleClose = () => {
    setShow(false);
    setSymptoms("");
    setDiseaseName("");
    setCareSuggestions("");
  };
  const [symptoms, setSymptoms] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [careSuggestions, setCareSuggestions] = useState("");

  const handleSubmitCreatePetScores = async () => {
    const data = await createPetScores(symptoms, diseaseName, careSuggestions);
    if (data && data.errCode === 0) {
      toast.success("Thêm thành công");
      await fetchAllPetScores();
      handleClose();
    } else {
      toast.error("Thêm thất bại");
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Pet Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Symptoms</label>
              <input
                type="text"
                className="form-control"
                value={symptoms}
                placeholder="Symptoms"
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Disease Name</label>
              <input
                type="text"
                className="form-control"
                value={diseaseName}
                placeholder="Disease Name"
                onChange={(e) => setDiseaseName(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label">careSuggestions</label>
              <input
                type="text"
                className="form-control"
                placeholder="careSuggestions"
                value={careSuggestions}
                onChange={(e) => setCareSuggestions(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitCreatePetScores()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatePetScores;
