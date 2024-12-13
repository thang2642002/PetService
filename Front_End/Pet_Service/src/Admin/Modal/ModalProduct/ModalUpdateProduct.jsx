import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { updateProduct } from "../../../services/productServices";


const ModalUpdateProduct = ({
  show,
  setShow,
  productUpdate,
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
    setDiscount(0);
    setImages([]);
  };

  useEffect(() => {
    if (productUpdate) {
      setName(productUpdate.name || "");
      setDescription(productUpdate.description || "");
      setPrice(productUpdate.price || "");
      setCategoryId(productUpdate.category_id || "");
      setStock(productUpdate.stock || "");
      setDiscount(productUpdate.discount || 0);
      setImages([]);
    }
  }, [productUpdate]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmitUpdateProduct = async () => {
    if (!name || !price || !categoryId || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const data = await updateProduct(
        productUpdate.product_id,
        name,
        description,
        price,
        categoryId,
        stock,
        discount,
        images
      );

      if (data && data.errCode === 0) {
        toast.success(data.message);
        handleClose();
        fetchAllProduct();
      } else {
        toast.error(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
        <Modal.Title>Update Product</Modal.Title>
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
          <div className="col-md-4">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Discount</label>
            <input
              type="number"
              className="form-control"
              value={discount}
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
                  ],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                  ["image"],
                ],
              }}
              formats={[
                "header",
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
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

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
