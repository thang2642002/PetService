import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateOrderItem } from "../../../services/orderItemServices";
// import _ from "lodash";

const ModalUpdateOrderItem = (props) => {
  const { show, setShow, orderItemView } = props;
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setTotalPrice(orderItemView.total_price);
    setQuantity(orderItemView.quantity);
    setOrderId(orderItemView.order_id);
    setProductId(orderItemView.product_id);
  }, [orderItemView]);

  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");

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
          <Modal.Title>View A Order Item</Modal.Title>
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
              />
            </div>
            <div className="col-6">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Order ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order ID"
                value={orderId}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Product ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Product ID"
                value={productId}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateOrderItem;
