import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteProduct } from "../../../services/productServices";

const ModalDeleteProduct = (props) => {
  const { show, setShow, productDelete, fetchAllProduct } = props;
  const handleClose = () => setShow(false);

  const handleSubmitDeleteProduct = async () => {
    const data = await deleteProduct(productDelete.product_id);
    if (data && data.errCode === 0) {
      toast.success(data.message);
      await fetchAllProduct();
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
          <Modal.Title>Modal Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this product ={" "}
          <b>{productDelete && productDelete.name ? productDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteProduct();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
