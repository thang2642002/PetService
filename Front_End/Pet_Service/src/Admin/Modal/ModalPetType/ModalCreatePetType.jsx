import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createPetType } from "../../../services/petTypeServices";

const ModalCreatePetType = (props) => {
  const { show, setShow, fetchAllPetType } = props;
  const handleClose = () => {
    setShow(false);
    setTypeName("");
    setDescription("");
  };

  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitCreatePetType = async () => {
    const data = await createPetType(typeName, description);
    if (data && data.errCode === 0) {
      toast(data.message);
      await fetchAllPetType();
      handleClose();
    } else {
      toast(data.message);
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
          <Modal.Title>Create New Pet Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Type Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type Name"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
            </div>
            <div className="col-12">
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
          <Button variant="primary" onClick={() => handleSubmitCreatePetType()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatePetType;
