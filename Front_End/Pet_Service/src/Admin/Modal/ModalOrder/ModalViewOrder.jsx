import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateOrder } from "../../../services/orderServices";
// import _ from "lodash";

const ModalViewOrder = (props) => {
  const { show, setShow, orderView } = props;
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setTotalAmount(orderView.total_amount);
    setStatus(orderView.status);
    setUserId(orderView.user_id);
    setCartId(orderView.cart_id);
  }, [orderView]);

  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("");
  //   const [orderDate, setOrderDate] = useState("");
  const [cartId, setCartId] = useState("");
  const [userId, setUserId] = useState("");

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
              <label className="form-label">Total Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total Amount"
                value={totalAmount}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Cart ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order Date"
                value={cartId}
              />
            </div>
            <div className="col-6">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userId}
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

export default ModalViewOrder;
