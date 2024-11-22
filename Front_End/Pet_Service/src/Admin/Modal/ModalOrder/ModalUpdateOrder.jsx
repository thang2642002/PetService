import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateOrder } from "../../../services/orderServices";
// import _ from "lodash";

const ModalUpdateOrder = (props) => {
  const { show, setShow, orderUpdate, fetchAllOrder } = props;
  const handleClose = () => {
    setShow(false);
    setTotalAmount("");
    setStatus("");
    setOrderDate("");
    setUserId("");
  };

  useEffect(() => {
    setTotalAmount(orderUpdate.total_amount);
    setStatus(orderUpdate.status);
    // setOrderDate("");
    setUserId(orderUpdate.user_id);
  }, [orderUpdate]);

  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmitUpdateOrder = async () => {
    const data = await updateOrder(
      orderUpdate.order_id,
      totalAmount,
      status,
      userId
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllOrder();
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
              <label className="form-label">Total Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="Total Amount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Order Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order Date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateOrder()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateOrder;
