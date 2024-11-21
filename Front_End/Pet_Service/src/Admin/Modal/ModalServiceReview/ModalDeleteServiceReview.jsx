import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteServiceReview } from "../../../services/serviceReviewServices";

const ModalDeleteServiceReview = (props) => {
  const { show, setShow, serviceReviewDelete, fetchAllServiceReview } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteServiceReview = async () => {
    const data = await deleteServiceReview(
      serviceReviewDelete.service_review_id
    );
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete Service Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this service review ={" "}
          <b>
            {serviceReviewDelete && serviceReviewDelete.comment
              ? serviceReviewDelete.comment
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
              handleSubmitDeleteServiceReview();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteServiceReview;
