import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteProductReview } from "../../../services/productReviewServices";

const ModalDeleteProductReview = (props) => {
  const { show, setShow, productReviewDelete, fetchAllProductReview } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteProductReview = async () => {
    const data = await deleteProductReview(
      productReviewDelete.product_review_id
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllProductReview();
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
          <Modal.Title>Modal Delete Product Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this product review ={" "}
          <b>
            {productReviewDelete && productReviewDelete.comment
              ? productReviewDelete.comment
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
              handleSubmitDeleteProductReview();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteProductReview;
