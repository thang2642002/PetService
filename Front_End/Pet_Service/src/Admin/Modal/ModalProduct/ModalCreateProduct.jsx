import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
import { createProduct } from "../../../services/productServices";
import "./ModalCreateProduct.scss";

const ModalCreateProduct = ({
  show,
  setShow,
  fetchAllProduct,
  listCategory,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
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
    setImages([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!name || !price || !categoryId || images.length === 0) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await createProduct(
        name,
        description,
        price,
        categoryId,
        stock,
        images
      );

      if (response && response.errCode === 0) {
        toast.success(response.message);
        await fetchAllProduct();
        handleClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred. Please try again!");
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
        <Modal.Title>Create New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
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
          <div className="col-md-4">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter product description"
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
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
            {/* Image Preview */}
            <div className="mt-3">
              {images.length > 0 && (
                <div className="d-flex flex-wrap">
                  {images.map((image, index) => (
                    <div key={index} className="me-2 relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: 5 }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateProduct;
