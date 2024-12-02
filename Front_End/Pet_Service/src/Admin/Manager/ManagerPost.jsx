// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import ModalCreatePost from "../Modal/ModalPost/ModalCreatePost";
import ModalUpdatePost from "../Modal/ModalPost/ModalUpdatePost";
import ModalDeletePost from "../Modal/ModalPost/ModalDeletePost";
import TablePost from "../Modal/ModalPost/TablePost";
// import { getAllPost } from "../../services/postServices";
import { getPaginate } from "../../services/paginateServices";

const ManagerPost = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Post";
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
    const data = await getPaginate(modelName, currentPage, pageSize);
    setListPost(data.data);
    setTotalItems(data.totalItems);
    setTotalPages(data.totalPages);
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
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
