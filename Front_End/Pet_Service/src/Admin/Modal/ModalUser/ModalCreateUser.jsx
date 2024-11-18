import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
// import { toast } from "react-toastify";
// import { createUser } from "../../../../services/userService";
import "./ModalCreateUser.scss";

const ModalCreateUser = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setAddress("");
    setUserName("");
    setPhone("");
    setRole("customer");
    // setImage("");
    // setPreviewImage("");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  //   const [image, setImage] = useState("");
  //   const [previewImage, setPreviewImage] = useState("");
  //   const handleUploadImage = (e) => {
  //     if (e.target && e.target.files && e.target.files[0]) {
  //       setPreviewImage(URL.createObjectURL(e.target.files[0]));
  //       setImage(e.target.files[0]);
  //     }
  //   };

  //   const validateEmail = (email) => {
  //     return String(email)
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       );
  //   };

  //   const handleSubmitCreateUsers = async () => {
  //     if (!validateEmail(email)) {
  //       toast.error("Ivalid email");
  //       return;
  //     }
  //     if (!password) {
  //       toast.error("Invalid Password");
  //     }
  //     if (!username) {
  //       toast.error("Invalid username");
  //     }
  //     if (!address) {
  //       toast.error("Invalid address");
  //     }
  //     if (!phone) {
  //       toast.error("Invalid phone");
  //     }

  //     let data = await createUser(
  //       email,
  //       password,
  //       username,
  //       address,
  //       phone,
  //       role,
  //       image
  //     );

  //     if (data && data.errcode === 0) {
  //       toast.success(data.message);
  //       handleClose();
  //       await fetchListUser();
  //     }
  //     if (data && data.errcode !== 0) {
  //       toast.error(data.message);
  //     }
  //   };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Craete New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
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
                value={username}
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
                // onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {/* {previewImage ? (
                // <img src={previewImage} alt="img" />
                <img src={previewImage} alt="img" />
              ) : (
                <span>Preview Image</span>
              )} */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            //   onClick={() => handleSubmitCreateUsers()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
