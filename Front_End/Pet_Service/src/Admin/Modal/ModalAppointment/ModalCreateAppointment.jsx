import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createAppointment } from "../../../services/appointmentServices";

const ModalCreateAppointment = (props) => {
  const { show, setShow, fetchAllAppointment } = props;
  const handleClose = () => {
    setShow(false);
    setAppointmentDate("");
    setStatus("");
    setServiceId("");
    setUserPetId("");
  };

  const [appointmentDate, setAppointmentDate] = useState("");
  const [status, setStatus] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userPetId, setUserPetId] = useState("");

  const handleSubmitCreateAppointment = async () => {
    const data = await createAppointment(status, serviceId, userPetId);
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Appointment Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Appointment Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
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
              <label className="form-label">Service ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Service ID"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">User Pet ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Pet ID"
                value={userPetId}
                onChange={(e) => setUserPetId(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitCreateAppointment()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateAppointment;
