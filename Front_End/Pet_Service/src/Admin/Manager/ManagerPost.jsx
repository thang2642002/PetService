// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreatePost from "../Modal/ModalPost/ModalCreatePost";
import ModalUpdatePost from "../Modal/ModalPost/ModalUpdatePost";
import ModalDeletePost from "../Modal/ModalPost/ModalDeletePost";
import TablePost from "../Modal/ModalPost/TablePost";
import { useEffect, useState } from "react";
import { getAllPost } from "../../services/postServices";
import { FcPlus } from "react-icons/fc";

const ManagerPost = () => {
  const [showModalCreatePost, setShowModalCreatePost] = useState(false);
  const [showModalUpdatePost, setShowModalUpdatePost] = useState(false);
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);
  const [listPost, setListPost] = useState([]);
  const [postDelete, setPostDelete] = useState({});
  const [postUpdate, setPostUpdate] = useState({});
  const handleShowUpdateModal = (post) => {
    setPostUpdate(post);
    setShowModalUpdatePost(true);
  };
  const handleShowDeleteModal = (post) => {
    setPostDelete(post);
    setShowModalDeletePost(true);
  };
  const fetchAllPost = async () => {
    const data = await getAllPost();
    console.log(data);
    setListPost(data.data);
  };

  useEffect(() => {
    fetchAllPost();
  }, [listPost]);
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
          fetchAllPost={fetchAllPost}
        />
        <ModalUpdatePost
          show={showModalUpdatePost}
          setShow={setShowModalUpdatePost}
          postUpdate={postUpdate}
          fetchAllPost={fetchAllPost}
        />
        <ModalDeletePost
          show={showModalDeletePost}
          setShow={setShowModalDeletePost}
          postDelete={postDelete}
          fetchAllPost={fetchAllPost}
        />

        <div className="btn-table-container"></div>
        <TablePost
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listPost={listPost}
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
