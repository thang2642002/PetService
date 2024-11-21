import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { createServiceReview } from "../../../services/serviceReviewServices";

const ModalCreateServiceReview = (props) => {
  const { show, setShow, fetchAllServiceReview } = props;
  const handleClose = () => {
    setShow(false);
    setComment("");
    setRating("");
    setUserId("");
    setServiceId("");
  };

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const handleSubmitCreateServiceReview = async () => {
    const data = await createServiceReview(serviceId, userId, rating, comment);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllServiceReview();
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
          <Modal.Title>Create New Service Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Comment</label>
              <input
                type="text"
                className="form-control"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Rating</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitCreateServiceReview()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateServiceReview;
