import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deletePetType } from "../../../services/petTypeServices";

const ModalDeletePetType = (props) => {
  const { show, setShow, petTypeDelete, fetchAllPetType } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeletePetType = async () => {
    const data = await deletePetType(petTypeDelete.pet_type_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllPetType();
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
          <Modal.Title>Modal Delete Pet Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this prt type ={" "}
          <b>
            {petTypeDelete && petTypeDelete.type_name
              ? petTypeDelete.type_name
              : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeletePetType();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeletePetType;
