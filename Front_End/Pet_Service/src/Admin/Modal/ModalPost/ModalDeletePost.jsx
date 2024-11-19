import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deletePost } from "../../../services/postServices";

const ModalDeletePost = (props) => {
  const { show, setShow, postDelete, fetchAllPost } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeletePost = async () => {
    const data = await deletePost(postDelete.post_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllPost();
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
          <Modal.Title>Modal Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this post ={" "}
          <b>{postDelete && postDelete.title ? postDelete.title : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeletePost();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeletePost;
