// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreatePost from "../Modal/ModalPost/ModalCreatePost";
import ModalUpdatePost from "../Modal/ModalPost/ModalUpdatePost";
import ModalDeletePost from "../Modal/ModalPost/ModalDeletePost";
import TablePost from "../Modal/ModalPost/TablePost";
import { useState } from "react";
// import { getListUser, getPage, getByName } from "../../../services/userService";
import { FcPlus } from "react-icons/fc";

const ManagerPost = () => {
  const [showModalCreatePost, setShowModalCreatePost] = useState(false);
  const [showModalUpdatePost, setShowModalUpdatePost] = useState(false);
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);
  const handleShowUpdateModal = () => {
    setShowModalUpdatePost(true);
  };
  const handleShowDeleteModal = () => {
    setShowModalDeletePost(true);
  };
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Post</div>
      <div className="user-contents">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="btn-add-new">
            <button
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                gap: "8px",
              }}
              onClick={() => setShowModalCreatePost(true)}
            >
              <FcPlus />
              Add new post
            </button>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Enter your input"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreatePost
          show={showModalCreatePost}
          setShow={setShowModalCreatePost}
        />
        <ModalUpdatePost
          show={showModalUpdatePost}
          setShow={setShowModalUpdatePost}
        />
        <ModalDeletePost
          show={showModalDeletePost}
          setShow={setShowModalDeletePost}
        />

        <div className="btn-table-container"></div>
        <TablePost
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPost;
