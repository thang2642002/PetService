// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";
import ModalCreateCategory from "../Modal/ModalCategory/ModalCreateCategory";
import ModalUpdateCategory from "../Modal/ModalCategory/ModalUpdateCategory";
import ModalDeleteCategory from "../Modal/ModalCategory/ModalDeleteCategory";
import TableCategory from "../Modal/ModalCategory/TableCategory";
// import { fetchAllCategory } from "../../services/categoryServices";
import { getPaginate } from "../../services/paginateServices";
import { Helmet } from "react-helmet";

const ManagerCategory = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Category";
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [categoryDelete, setCategoryDelete] = useState({});
  const [categoryUpdate, setCategoryUpdate] = useState({});

  const getListCategory = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListCategory(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    getListCategory();
  }, [currentPage]);

  const handleShowUpdateModal = (category) => {
    setCategoryUpdate(category);
    setShowModalUpdateCategory(true);
  };
  const handleShowDeleteModal = (category) => {
    setCategoryDelete(category);
    setShowModalDeleteCategory(true);
  };
  return (
    <div className="manager-user-container">
       <Helmet>
        <title>Quản lý thể loại sản phẩm</title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý thể loại sản phẩm
      </div>
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
              onClick={() => setShowModalCreateCategory(true)}
            >
              <FcPlus />
              Thêm mới thể loại
            </button>
          </div>
          {/* <div className="search" style={{ marginRight: "28px" }}>
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
          </div> */}
        </div>
        <ModalCreateCategory
          show={showModalCreateCategory}
          setShow={setShowModalCreateCategory}
          getListCategory={getListCategory}
        />
        <ModalUpdateCategory
          show={showModalUpdateCategory}
          setShow={setShowModalUpdateCategory}
          categoryUpdate={categoryUpdate}
          getListCategory={getListCategory}
        />
        <ModalDeleteCategory
          show={showModalDeleteCategory}
          setShow={setShowModalDeleteCategory}
          categoryDelete={categoryDelete}
          getListCategory={getListCategory}
        />

        <div className="btn-table-container"></div>
        <TableCategory
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          listCategory={listCategory}
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

export default ManagerCategory;
