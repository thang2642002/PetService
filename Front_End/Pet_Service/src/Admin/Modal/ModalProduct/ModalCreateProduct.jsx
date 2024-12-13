import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Quill from "quill";
import { FcPlus } from "react-icons/fc";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import { createProduct } from "../../../services/productServices";
import "./ModalCreateProduct.scss";

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "normal", "large", "huge"]; // Thêm kích cỡ tùy chỉnh nếu muốn
Quill.register(Size, true);

const Header = Quill.import("formats/header");
Header.whitelist = [1, 2, 3, 4]; // Hỗ trợ h1 -> h4
Quill.register(Header, true);

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
    setImages([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
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
        discount,
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
          <div className="col-md-4">
            <label className="form-label">Discount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Discount"
              value={discount || 0}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="col-md-12 mb-5">
            <label className="form-label">Description</label>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [
                    { header: "1" },
                    { header: "2" },
                    { header: "3" },
                    { header: "4" },
                    { font: [] },
                  ],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                  ["image"],
                ],
              }}
              formats={[
                "header", // Hỗ trợ h1 -> h4
                "font",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "align",
                "link",
                "image",
              ]}
              className="mt-1"
              style={{ height: "150px" }}
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
