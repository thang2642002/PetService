import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteOrderItem } from "../../../services/orderItemServices";

const ModalDeleteOrderItem = (props) => {
  const { show, setShow, orderItemDelete, fetchAllOrderItem } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteOrderItem = async () => {
    const data = await deleteOrderItem(orderItemDelete.order_item_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllOrderItem();
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
          <Modal.Title>Modal Delete Order Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this order item ={" "}
          <b>
            {orderItemDelete && orderItemDelete.order_item_id
              ? orderItemDelete.order_item_id
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
              handleSubmitDeleteOrderItem();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteOrderItem;
