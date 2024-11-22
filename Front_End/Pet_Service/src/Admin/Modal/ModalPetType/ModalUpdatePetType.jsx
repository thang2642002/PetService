import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updatePetType } from "../../../services/petTypeServices";
// import _ from "lodash";

const ModalUpdatePetType = (props) => {
  const { show, setShow, petTypeUpdate, fetchAllPetType } = props;
  const handleClose = () => {
    setShow(false);
    setTypeName("");
    setDescription("");
  };

  useEffect(() => {
    setTypeName(petTypeUpdate.type_name);
    setDescription(petTypeUpdate.description);
  }, [petTypeUpdate]);

  const [typename, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitUpdatePetType = async () => {
    const data = await updatePetType(
      petTypeUpdate.pet_type_id,
      typename,
      description
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      await fetchAllPetType();
    } else {
      toast.success(data.message);
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
          <Modal.Title>Update A Pet Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Type Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type Name"
                value={typename}
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
          <Button variant="primary" onClick={() => handleSubmitUpdatePetType()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdatePetType;
