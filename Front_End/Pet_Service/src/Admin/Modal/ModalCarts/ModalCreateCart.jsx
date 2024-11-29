import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createCart } from "../../../services/cartService";

const ModalCreateCart = (props) => {
  const { show, setShow, fetchAllCart } = props;
  const handleClose = () => {
    setShow(false);
    setUserId("");
    setTotalAmount("");
  };

  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleSubmitCreateCart = async () => {
    const data = await createCart(userId, totalAmount);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllCart();
    } else {
      toast.error(data.message);
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
          <Modal.Title>Create New Carts</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSubmitCreateCart()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateCart;
