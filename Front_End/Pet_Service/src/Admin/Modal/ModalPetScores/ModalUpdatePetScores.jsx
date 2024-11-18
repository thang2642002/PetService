import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import { updateUser } from "../../../../services/userService";
// import _ from "lodash";

const ModalUpdatePetScores = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setScoresDate("");
    setHealthScores("");
    setDiet("");
    setHeight("");
    setWeight("");
    setNote("");
    setUserPetId("");
  };
  const [scoresDate, setScoresDate] = useState("");
  const [healthScores, setHealthScores] = useState("");
  const [diet, setDiet] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [userPetId, setUserPetId] = useState("");

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
              <label className="form-label">Date Scores</label>
              <input
                type="text"
                className="form-control"
                value={scoresDate}
                placeholder="Date Scores"
                onChange={(e) => setScoresDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Health</label>
              <input
                type="text"
                className="form-control"
                value={healthScores}
                placeholder="Health"
                onChange={(e) => setHealthScores(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Height</label>
              <input
                type="text"
                className="form-control"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label">Weight</label>
              <input
                type="text"
                className="form-control"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Diet</label>
              <input
                type="text"
                className="form-control"
                placeholder="Diet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">User Pet ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Pet ID"
                value={userPetId}
                onChange={(e) => setUserPetId(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Note</label>
              <input
                type="text"
                className="form-control"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
            //   onClick={() => handleSubmitUpdateUsers()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdatePetScores;
