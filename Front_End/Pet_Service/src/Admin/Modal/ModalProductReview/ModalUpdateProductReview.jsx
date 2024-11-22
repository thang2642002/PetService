import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateProductReview } from "../../../services/productReviewServices";
// import _ from "lodash";

const ModalUpdateProductReview = (props) => {
  const { show, setShow, productReviewUpdate, fetchAllProductReview } = props;
  const handleClose = () => {
    setShow(false);
    setComment("");
    setRating("");
    setUserId("");
    setProductId("");
  };

  useEffect(() => {
    setComment(productReviewUpdate.comment);
    setRating(productReviewUpdate.rating);
    setUserId(productReviewUpdate.user_id);
    setProductId(productReviewUpdate.product_id);
  }, [productReviewUpdate]);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");

  const handleSubmitUpdateProductReview = async () => {
    const data = await updateProductReview(
      productReviewUpdate.product_review_id,
      rating,
      comment,
      userId,
      productId
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllProductReview();
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
              <label className="form-label">Product ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
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
            onClick={() => handleSubmitUpdateProductReview()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateProductReview;
