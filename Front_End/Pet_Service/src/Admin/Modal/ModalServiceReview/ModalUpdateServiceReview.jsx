import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateServiceReview } from "../../../services/serviceReviewServices";
// import _ from "lodash";

const ModalUpdateServiceReview = (props) => {
  const { show, setShow, serviceReviewUpdate, fetchAllServiceReview } = props;
  const handleClose = () => {
    setShow(false);
    setComment("");
    setRating("");
    setUserId("");
    setServiceId("");
  };

  useEffect(() => {
    setComment(serviceReviewUpdate.comment);
    setRating(serviceReviewUpdate.rating);
    setUserId(serviceReviewUpdate.user_id);
    setServiceId(serviceReviewUpdate.service_id);
  }, [serviceReviewUpdate]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const handleSubmitUpdateServiceReview = async () => {
    const data = await updateServiceReview(
      serviceReviewUpdate.service_review_id,
      serviceId,
      userId,
      rating,
      comment
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllServiceReview();
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
          <Modal.Title>Update A Service Review</Modal.Title>
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
            onClick={() => handleSubmitUpdateServiceReview()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateServiceReview;
