import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/userServices";

const ModalDeleteUser = (props) => {
  const { show, setShow, userDelete, getListUser } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    const data = await deleteUser(userDelete.user_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await getListUser();
      handleClose();
    }
    if (data && data.errCode !== 0) {
      toast.error(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user.email =
          <b>{userDelete && userDelete.email ? userDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
