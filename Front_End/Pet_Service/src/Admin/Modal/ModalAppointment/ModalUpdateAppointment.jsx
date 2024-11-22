import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateAppointment } from "../../../services/appointmentServices";
// import _ from "lodash";

const ModalUpdateAppointment = (props) => {
  const { show, setShow, appointmentUpdate, fetchAllAppointment } = props;
  const handleClose = () => {
    setShow(false);
    setAppointmentDate("");
    setStatus("");
    setServiceId("");
    setUserPetId("");
  };

  useEffect(() => {
    // setAppointmentDate("");
    setStatus(appointmentUpdate.status);
    setServiceId(appointmentUpdate.service_id);
    setUserPetId(appointmentUpdate.user_pet_id);
  }, [appointmentUpdate]);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [status, setStatus] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userPetId, setUserPetId] = useState("");

  const handleSubmitUpdateAppointment = async () => {
    const data = await updateAppointment(
      appointmentUpdate.appointment_id,
      status,
      serviceId,
      userPetId
    );
    console.log(data);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllAppointment();
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
          <Modal.Title>Update A Product Review</Modal.Title>
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
            onClick={() => handleSubmitUpdateAppointment()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateAppointment;
