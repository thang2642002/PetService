import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteCart } from "../../../services/cartService";

const ModalDeleteCart = (props) => {
  const { show, setShow, cartDelete, fetchAllCart } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteCart = async () => {
    const data = await deleteCart(cartDelete.cart_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllCart();
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
          <Modal.Title>Modal Delete Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this cart =
          <b>{cartDelete && cartDelete.cart_id ? cartDelete.cart_id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteCart();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteCart;
