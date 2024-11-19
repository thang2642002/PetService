import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteService } from "../../../services/serviceServices";

const ModalDeleteService = (props) => {
  const { show, setShow, serviceDelete, fetchAllService } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteService = async () => {
    const data = await deleteService(serviceDelete.service_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllService();
      handleClose();
    } else {
      toast.error(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this service =
          <b>{serviceDelete && serviceDelete.name ? serviceDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteService();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteService;
