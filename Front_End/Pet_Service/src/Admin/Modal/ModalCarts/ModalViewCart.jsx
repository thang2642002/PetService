import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateCart } from "../../../services/cartService";

const ModalViewCart = (props) => {
  const { show, setShow, cartView } = props;
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setUserId(cartView.user_id);
    setTotalAmount(cartView.total_amount);
  }, [cartView]);

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
          <Modal.Title>View A Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userId}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Total Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total Amount"
                value={totalAmount}
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

export default ModalViewCart;
