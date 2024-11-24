import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
import { createPets } from "../../../services/petServices";

const ModalCreatePet = (props) => {
  const { show, setShow, fetchAllPet } = props;

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setHeight("");
    setWeight("");
    setCoatColor("");
    setBreed("");
    setDescription("");
    setPrice("");
    setAvailable("true");
    setPetTypeId("");
    setImages([]);
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("true");
  const [petTypeId, setPetTypeId] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!name || !petTypeId || !price || images.length === 0) {
      toast("Chưa nhập đủ dữ liệu");
      return;
    }

    try {
      const availableBoolean = available === "true";
      const response = await createPets(
        name,
        age,
        height,
        weight,
        coatColor,
        breed,
        description,
        price,
        availableBoolean,
        petTypeId,
        images
      );

      if (response && response.errCode === 0) {
        toast(response.message);
        await fetchAllPet();
        handleClose();
      } else {
        toast(response.message);
        handleClose();
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
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
        <Modal.Title>Create New Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Pet Type</label>
            <input
              type="text"
              className="form-control"
              value={petTypeId}
              placeholder="Pet Type"
              onChange={(e) => setPetTypeId(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-4">
            <label className="form-label">Height</label>
            <input
              type="text"
              className="form-control"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Weight</label>
            <input
              type="text"
              className="form-control"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Coat Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="Coat Color"
              value={coatColor}
              onChange={(e) => setCoatColor(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Available</label>
            <select
              className="form-control"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus />
              Upload File Image
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
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

export default ModalCreatePet;
