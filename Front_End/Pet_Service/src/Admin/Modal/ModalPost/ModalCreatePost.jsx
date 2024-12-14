import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost } from "../../../services/postServices";
import "./ModalCreatePost.scss";

const ModalCreatePost = (props) => {
  const { show, setShow, fetchAllPost } = props;

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setImage("");
    setPreviewImage("");
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmitCreatePost = async () => {
    const data = await createPost(title, content, image);
    if (data && data.errCode === 0) {
      toast(data.message);
      await fetchAllPost();
      handleClose();
    } else {
      toast(data.message);
      handleClose();
    }
  };

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
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Thêm CKEditor */}
            <div className="col-12 mb-5">
              <label className="form-label">Content</label>
              <ReactQuill
                value={content}
                onChange={handleContentChange}
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
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadImage(e)}
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
          <Button variant="primary" onClick={() => handleSubmitCreatePost()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
