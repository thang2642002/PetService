import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteOrder } from "../../../services/orderServices";

const ModalDeleteOrder = (props) => {
  const { show, setShow, orderDelete, fetchAllOrder } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteOrder = async () => {
    const data = await deleteOrder(orderDelete.order_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllOrder();
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
          <Modal.Title>Modal Delete Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this order ={" "}
          <b>
            {orderDelete && orderDelete.order_id ? orderDelete.order_id : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteOrder();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteOrder;
