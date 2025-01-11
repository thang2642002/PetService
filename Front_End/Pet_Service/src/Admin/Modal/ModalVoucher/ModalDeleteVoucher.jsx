import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteVoucher } from "../../../services/voucherServices";

const ModalDeleteUserPet = (props) => {
  const { show, setShow, voucherDelete, fetchAllVoucher } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteVoucher = async () => {
    const data = await deleteVoucher(voucherDelete.voucher_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllVoucher();
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
          <Modal.Title>Modal Delete Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this voucher =
          <b>
            {voucherDelete && voucherDelete.voucher_id
              ? voucherDelete.voucher_id
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
              handleSubmitDeleteVoucher();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUserPet;
