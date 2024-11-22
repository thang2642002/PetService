import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateService } from "../../../services/serviceServices";
// import _ from "lodash";

const ModalUpdateService = (props) => {
  const { show, setShow, serviceUpdate, fetchAllService } = props;
  const handleClose = () => {
    setShow(false);
    setName("");
    setPrice("");
    setDescription("");
  };

  useEffect(() => {
    setName(serviceUpdate.name);
    setPrice(serviceUpdate.price);
    setDescription(serviceUpdate.description);
  }, [serviceUpdate]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitUpdateService = async () => {
    const data = await updateService(
      serviceUpdate.service_id,
      name,
      price,
      description
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      await fetchAllService();
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
          <Modal.Title>Update A Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder=" Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
          <Button variant="primary" onClick={() => handleSubmitUpdateService()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateService;
