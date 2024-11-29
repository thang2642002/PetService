import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateCart } from "../../../services/cartService";
// import _ from "lodash";

const ModalUpdateCart = (props) => {
  const { show, setShow, cartUpdate, fetchAllCart } = props;

  const handleClose = () => {
    setShow(false);
    setUserId("");
    setTotalAmount("");
  };

  useEffect(() => {
    setUserId(cartUpdate.user_id);
    setTotalAmount(cartUpdate.total_amount);
  }, [cartUpdate]);

  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleSubmitUpdateCart = async () => {
    const data = await updateCart(cartUpdate.cart_id, userId, totalAmount);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      await fetchAllCart();
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
          <Modal.Title>Update A Cart</Modal.Title>
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
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Total Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total Amount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateCart()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateCart;
