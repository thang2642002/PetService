import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateOrderItem } from "../../../services/orderItemServices";
// import _ from "lodash";

const ModalUpdateOrderItem = (props) => {
  const { show, setShow, orderItemUpdate, fetchAllOrderItem } = props;
  const handleClose = () => {
    setShow(false);
    setTotalPrice("");
    setQuantity("");
    setOrderId("");
    setProductId("");
  };

  useEffect(() => {
    setTotalPrice(orderItemUpdate.total_price);
    setQuantity(orderItemUpdate.quantity);
    setOrderId(orderItemUpdate.order_id);
    setProductId(orderItemUpdate.product_id);
  }, [orderItemUpdate]);

  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");

  const handleSubmitUpdateUsers = async () => {
    const data = await updateOrderItem(
      orderItemUpdate.order_item_id,
      orderId,
      productId,
      quantity,
      totalPrice
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllOrderItem();
    } else {
      toast.error(data.message);
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
          <Modal.Title>Update A Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Total Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total Price"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Order ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Product ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUsers()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateOrderItem;
