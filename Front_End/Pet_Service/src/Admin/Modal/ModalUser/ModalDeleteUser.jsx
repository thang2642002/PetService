import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import { deleteUser } from "../../../../services/userService";

const ModalDeleteUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);

  //   const handleSubmitDeleteUser = async () => {
  //     const data = await deleteUser(dataDelete.id, dataDelete.role);
  //     if (data && data.errcode === 0) {
  //       toast.success(data.message);
  //       await fetchListUser();
  //       handleClose();
  //     }
  //     if (data && data.errcode !== 0) {
  //       toast.error(data.message);
  //       handleClose();
  //     }
  //   };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user.email ={" "}
          {/* <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            // onClick={() => {
            //   handleSubmitDeleteUser();
            // }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
