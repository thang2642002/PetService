import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { updateProduct } from "../../../services/productServices";

const ModalUpdateProduct = (props) => {
  const { show, setShow, productUpdate, fetchAllProduct, listCategory } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setStock("");
    setDiscount("");
    setAddedDate("");
    setImages([]);
  };

  useEffect(() => {
    if (productUpdate) {
      setName(productUpdate.name || "");
      setDescription(productUpdate.description || "");
      setPrice(productUpdate.price || "");
      setCategoryId(productUpdate.category_id || "");
      setStock(productUpdate.stock || "");
      setDiscount(productUpdate.discount || "");
      setImages([]);
    }
  }, [productUpdate]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedImages = [...images, ...selectedFiles];
    const uniqueImages = Array.from(
      new Set(updatedImages.map((file) => file.name))
    ).map((name) => updatedImages.find((file) => file.name === name));
    setImages(uniqueImages);
  };

  const handleSubmitUpdateProduct = async () => {
    if (!name || !price || !categoryId || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = await updateProduct(
      productUpdate.product_id,
      name,
      description,
      price,
      categoryId,
      stock,
      images
    );

    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllProduct();
    } else {
      toast.error(data.message || "An error occurred.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update A Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {listCategory &&
                listCategory.map((item) => (
                  <option key={item.category_id} value={item.category_id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Discount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="text"
              className="form-control"
              value={addedDate}
              onChange={(e) => setAddedDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus />
              Upload Images
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              multiple // Make sure the input allows multiple files
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-3">
            {images.length > 0 && (
              <div className="d-flex flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="me-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: 5 }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitUpdateProduct}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateProduct;
