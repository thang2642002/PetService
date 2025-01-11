import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createVoucher } from "../../../services/voucherServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagerVoucher.scss";

const ModalCreateVoucher = (props) => {
  const { show, setShow, fetchAllVoucher } = props;

  const handleClose = () => {
    setShow(false);
    setNameVoucher("");
    setStartDate(null);
    setEndDate(null);
    setVoucherCode("");
    setVoucherType("");
    setDiscount("");
    setQuantity("");
    setTotalPrice("");
  };

  const [nameVoucher, setNameVoucher] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total_price, setTotalPrice] = useState("");

  const handleSubmitCreateVoucher = async () => {
    const data = await createVoucher(
      nameVoucher,
      startDate,
      endDate,
      voucherCode,
      voucherType,
      discount,
      quantity,
      total_price
    );

    if (data && data.errCode === 0) {
      toast(data.message);
      await fetchAllVoucher();
      handleClose();
    } else {
      toast(data.message);
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
        className="modal-add-voucher"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Voucher Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Voucher Name"
                value={nameVoucher}
                onChange={(e) => setNameVoucher(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="price"
                value={total_price}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <div className="custom-input">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  placeholderText="Select Start Date"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <div className="custom-input">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control"
                  placeholderText="Select End Date"
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Voucher Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Voucher Code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Voucher Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Voucher Type"
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateVoucher}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateVoucher;
