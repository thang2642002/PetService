import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { updatePost } from "../../../services/postServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalUpdatePost = (props) => {
  const { show, setShow, postUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setDesc_title();
    setImage(null);
    setPreviewImage("");
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc_title, setDesc_title] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setPreviewImage(URL.createObjectURL(file));
        setImage(file);
      } else {
        toast.error("Please upload a valid image file (jpg, png, etc.)");
        e.target.value = ""; // Reset input
      }
    }
  };
  const handleSubmitUpdatePost = async () => {
    if (!title || !content || !image) {
      toast.error("Please fill out all fields.");
      return;
    }
    const data = await updatePost(
      postUpdate.post_id,
      title,
      desc_title,
      content,
      image
    );

    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    setTitle(postUpdate?.title);
    setDesc_title(postUpdate?.desc_title);
    setContent(postUpdate?.content);

    setImage(null);
    setPreviewImage(postUpdate.image || "");
  }, [postUpdate]);

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
          <Modal.Title>Update A Service</Modal.Title>
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
            <div className="col-12">
              <label className="form-label">Desc Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Desc Title"
                value={desc_title}
                onChange={(e) => setDesc_title(e.target.value)}
              />
            </div>
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
          <Button variant="primary" onClick={() => handleSubmitUpdatePost()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdatePost;
