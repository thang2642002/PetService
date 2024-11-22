import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateCategory } from "../../../services/categoryServices";
// import _ from "lodash";

const ModalUpdateCategory = (props) => {
  const { show, setShow, categoryUpdate, getListCategory } = props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
  };

  useEffect(() => {
    setName(categoryUpdate.name);
    setDescription(categoryUpdate.description);
  }, [categoryUpdate]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitUpdateCategory = async () => {
    const data = await updateCategory(
      categoryUpdate.category_id,
      name,
      description
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      await getListCategory();
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
          <Modal.Title>Update A Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder=" Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          <Button
            variant="primary"
            onClick={() => handleSubmitUpdateCategory()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateCategory;
