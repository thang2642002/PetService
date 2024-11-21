import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteAppointment } from "../../../services/appointmentServices";

const ModalDeleteAppointment = (props) => {
  const { show, setShow, appointmentDelete, fetchAllAppointment } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteAppointment = async () => {
    const data = await deleteAppointment(appointmentDelete.appointment_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllAppointment();
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
          <Modal.Title>Modal Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this appointment ={" "}
          <b>
            {appointmentDelete && appointmentDelete.appointment_id
              ? appointmentDelete.appointment_id
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
              handleSubmitDeleteAppointment();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteAppointment;
