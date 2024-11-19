import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteCategory } from "../../../services/categoryServices";

const ModalDeleteCategory = (props) => {
  const { show, setShow, categoryDelete, getListCategory } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteCategory = async () => {
    const data = await deleteCategory(categoryDelete.category_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await getListCategory();
      handleClose();
    }
    if (data && data.errCode !== 0) {
      toast.error(data.message);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this category ={" "}
          <b>
            {categoryDelete && categoryDelete.name ? categoryDelete.name : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteCategory();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteCategory;
