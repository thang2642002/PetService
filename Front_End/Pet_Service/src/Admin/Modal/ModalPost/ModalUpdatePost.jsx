import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { updatePost } from "../../../services/postServices";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ModalUpdatePost = (props) => {
  const { show, setShow, postUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setCreateDate("");
    setImage(null);
    setPreviewImage("");
  };

  useEffect(() => {
    setTitle(postUpdate.title);
    setContent(postUpdate.content);
    setCreateDate(postUpdate.created_date);
    setImage(null);
    setPreviewImage(postUpdate.image || "");
  }, [postUpdate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setPreviewImage(URL.createObjectURL(file));
        setImage(file);
      } else {
        toast.error("Please upload a valid image file (jpg, png, etc.)");
      }
    }
  };

  const handleSubmitUpdatePost = async () => {
    const data = await updatePost(
      postUpdate.post_id,
      title,
      content,
      createDate
    );
    if (data && data.errCode === 0) {
      toast.success(data.message);
      handleClose();
    } else {
      toast.error(data.message);
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

            {/* Thêm CKEditor thay thế cho ô nhập Content */}
            <div className="col-12">
              <label className="form-label">Content</label>
              <CKEditor
                editor={ClassicEditor}
                data={content} // Data hiển thị trong CKEditor
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data); // Cập nhật state content với dữ liệu trong CKEditor
                }}
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
