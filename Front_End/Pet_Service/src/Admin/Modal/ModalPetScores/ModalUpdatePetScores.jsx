import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updatePetScores } from "../../../services/petScoresServices";
// import _ from "lodash";

const ModalUpdatePetScores = (props) => {
  const { show, setShow, petScoresUpdate, fetchAllPetScores } = props;
  const handleClose = () => {
    setShow(false);
    setSymptoms("");
    setDiseaseName("");
    setCareSuggestions("");
  };

  useEffect(() => {
    setSymptoms(petScoresUpdate.symptoms);
    setDiseaseName(petScoresUpdate.disease_name);
    setCareSuggestions(petScoresUpdate.care_suggestions);
  }, [petScoresUpdate]);

  const [symptoms, setSymptoms] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [careSuggestions, setCareSuggestions] = useState("");

  const handleSubmitUpdatePetScores = async () => {
    const data = await updatePetScores(
      petScoresUpdate.score_id,
      symptoms,
      diseaseName,
      careSuggestions
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllPetScores();
    } else {
      toast.error(data.message);
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
          <Modal.Title>Update A Pet Scores</Modal.Title>
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
              <label className="form-label">Care Suggestions</label>
              <input
                type="text"
                className="form-control"
                placeholder="Care Suggestions"
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
            onClick={() => handleSubmitUpdatePetScores()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdatePetScores;
