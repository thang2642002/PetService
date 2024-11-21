import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deletePet } from "../../../services/petServices";

const ModalDeletePet = (props) => {
  const { show, setShow, petDelete, fetchAllPet } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeletePet = async () => {
    const data = await deletePet(petDelete.pet_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllPet();
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
          <Modal.Title>Modal Delete Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this pet =
          <b>{petDelete && petDelete.name ? petDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeletePet();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeletePet;
