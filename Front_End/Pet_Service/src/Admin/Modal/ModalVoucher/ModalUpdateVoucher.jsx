import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateVoucher } from "../../../services/voucherServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagerVoucher.scss";

const ModalUpdateVoucher = (props) => {
  const { show, setShow, voucherUpdate, fetchAllVoucher } = props;
  console.log("voucherUpdate", voucherUpdate);
  console.log("show", show);
  const handleClose = () => {
    setShow(false);
    setNameVoucher("");
    setStartDate(null);
    setEndDate(null);
    setVoucherCode("");
    setVoucherType("");
    setDiscount("");
    setQuantity("");
  };

  console.log("voucherUpdate", voucherUpdate);

  useEffect(() => {
    setNameVoucher(voucherUpdate.name_voucher);
    setStartDate(voucherUpdate.start_date);
    setEndDate(voucherUpdate.end_date);
    setVoucherCode(voucherUpdate.voucher_code);
    setVoucherType(voucherUpdate.voucher_type);
    setDiscount(voucherUpdate.discount);
    setQuantity(voucherUpdate.quantity);
    setTotalPrice(voucherUpdate.total_price);
  }, [voucherUpdate]);

  const [nameVoucher, setNameVoucher] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSubmitUpdateVoucher = async () => {
    const data = await updateVoucher(
      voucherUpdate.voucher_id,
      nameVoucher,
      startDate,
      endDate,
      voucherCode,
      voucherType,
      discount,
      quantity,
      totalPrice
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllVoucher();
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
        className="modal-update-voucher"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Voucher Name</label>
              <input
                type="text"
                className="form-control"
                value={nameVoucher}
                placeholder="Voucher Name"
                onChange={(e) => setNameVoucher(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total Price</label>
              <input
                type="number"
                className="form-control"
                value={totalPrice}
                placeholder="Total Price"
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
                value={voucherCode}
                placeholder="Voucher Code"
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Voucher Type</label>
              <input
                type="text"
                className="form-control"
                value={voucherType}
                placeholder="Voucher Type"
                onChange={(e) => setVoucherType(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                placeholder="Discount"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdateVoucher}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateVoucher;
