import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { updateUser } from "../../../services/userServices";

const ModalUpdateUser = (props) => {
  const { show, setShow, userUpdate, getListUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setAddress("");
    setUserName("");
    setPhone("");
    setRole("customer");
    setAvatar(null);
    setPreviewImage("");
  };

  useEffect(() => {
    if (userUpdate) {
      setEmail(userUpdate.email || "");
      setPassword(userUpdate.password || "");
      setUserName(userUpdate.user_name || "");
      setPhone(userUpdate.phone || "");
      setAddress(userUpdate.address || "");
      setRole(userUpdate.role || "customer");
      setAvatar(null);
      setPreviewImage(userUpdate.avatar || "");
    }
  }, [userUpdate]);

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setPreviewImage(URL.createObjectURL(file));
        setAvatar(file);
      } else {
        toast.error("Please upload a valid image file (jpg, png, etc.)");
      }
    }
  };

  const handleSubmitUpdateUsers = async () => {
    // Validate inputs
    if (!userName) {
      toast.error("Invalid username");
      return;
    }
    if (!address) {
      toast.error("Invalid address");
      return;
    }
    if (!phone) {
      toast.error("Invalid phone");
      return;
    }

    try {
      const response = await updateUser(
        userUpdate.user_id,
        email,
        password,
        userName,
        phone,
        address,
        role,
        avatar
      );
      if (response && response.errCode === 0) {
        toast.success(response.message);
        handleClose();
        getListUser();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
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
        <Modal.Title>Update A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              // disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">UserName</label>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">User</option>
              <option value="manager">Admin</option>
            </select>
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
              onChange={handleUploadImage}
            />
          </div>
          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage} alt="img" />
            ) : (
              <span>Preview Image</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitUpdateUsers}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateUser;
