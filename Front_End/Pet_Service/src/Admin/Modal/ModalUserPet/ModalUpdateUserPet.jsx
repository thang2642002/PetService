import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import { updateUser } from "../../../../services/userService";
// import _ from "lodash";

const ModalUpdateUserPet = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setNamePet("");
    setAge("");
    setHeight("");
    setWeight("");
    setCoatColor("");
    setBreed("");
    setDescription("");
    setUserId("");
  };
  const [name, setNamePet] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

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
          <Modal.Title>Update A User Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="Name"
                onChange={(e) => setNamePet(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input
                type="text"
                className="form-control"
                value={age}
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
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
              <label className="form-label">Coat Color</label>
              <input
                type="text"
                className="form-control"
                placeholder="Coat Color"
                value={coatColor}
                onChange={(e) => setCoatColor(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Breed</label>
              <input
                type="text"
                className="form-control"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default ModalUpdateUserPet;
