import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePet } from "../../../services/petServices";

const ModalUpdatePet = ({
  show,
  setShow,
  petUpdate,
  fetchAllPet,
  listPetType,
}) => {
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

  useEffect(() => {
    if (petUpdate) {
      setName(petUpdate.name || ""),
        setAge(petUpdate.age || ""),
        setHeight(petUpdate.height || ""),
        setWeight(petUpdate.weight || ""),
        setCoatColor(petUpdate.coat_color || ""),
        setBreed(petUpdate.breed || ""),
        setDescription(petUpdate.description || ""),
        setPrice(petUpdate.price || ""),
        setAvailable(
          petUpdate.available === true || petUpdate.available === "true"
        ),
        setPetTypeId(petUpdate.pet_type_id || ""),
        setImages([]);
    }
  }, [petUpdate]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const uniqueImages = validImages.filter(
      (file) =>
        !images.some(
          (existingImage) =>
            existingImage.name === file.name &&
            existingImage.size === file.size &&
            existingImage.lastModified === file.lastModified
        )
    );

    setImages((prev) => [...prev, ...uniqueImages]);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmitUpdatePet = async () => {
    if (!name || !age || !price || !petTypeId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = await updatePet(
      petUpdate.pet_id,
      name,
      age,
      height,
      weight,
      coatColor,
      breed,
      description,
      price,
      available,
      petTypeId,
      images
    );

    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
      fetchAllPet();
    } else {
      toast.error(data.message || "An error occurred.");
      handleClose();
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
        <Modal.Title>Update A Pet</Modal.Title>
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
            <select
              className="form-control"
              value={petTypeId}
              onChange={(e) => setPetTypeId(e.target.value)}
            >
              <option value="">Select a pet type</option>
              {listPetType &&
                listPetType.map((item) => (
                  <option key={item.pet_type_id} value={item.pet_type_id}>
                    {item.type_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-3">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="col-3">
            <label className="form-label">Height</label>
            <input
              type="text"
              className="form-control"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Weight</label>
            <input
              type="text"
              className="form-control"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Coat Color</label>
            <input
              type="text"
              className="form-control"
              placeholder="Coat Color"
              value={coatColor}
              onChange={(e) => setCoatColor(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Breed</label>
            <input
              type="text"
              className="form-control"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="col-md-3">
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
            <label className="form-label">Available</label>
            <select
              className="form-control"
              value={available ? "true" : "false"}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
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
              <FcPlus /> Upload File Images
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              multiple
              onChange={handleImageChange}
            />

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
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitUpdatePet}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdatePet;
