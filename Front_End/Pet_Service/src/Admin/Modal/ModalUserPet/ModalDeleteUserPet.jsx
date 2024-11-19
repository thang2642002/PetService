import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUserPet } from "../../../services/userPetServices";

const ModalDeleteUserPet = (props) => {
  const { show, setShow, userPetDelete, fetchAllUserPet } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUserPet = async () => {
    const data = await deleteUserPet(userPetDelete.user_pet_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllUserPet();
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
          <Modal.Title>Modal Delete User Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user pet name =
          <b>
            {userPetDelete && userPetDelete.name_pet
              ? userPetDelete.name_pet
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
              handleSubmitDeleteUserPet();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUserPet;
