import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updatePost } from "../../../services/postServices";
// import _ from "lodash";

const ModalUpdatePost = (props) => {
  const { show, setShow, postUpdate } = props;
  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
    setCreateDate("");
  };

  useEffect(() => {
    setTitle(postUpdate.title);
    setContent(postUpdate.content);
    setCreateDate(postUpdate.created_date);
  }, [postUpdate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createDate, setCreateDate] = useState("");

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
            <div className="col-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Create Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Create Date"
                value={createDate}
                onChange={(e) => setCreateDate(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Content</label>
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
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
