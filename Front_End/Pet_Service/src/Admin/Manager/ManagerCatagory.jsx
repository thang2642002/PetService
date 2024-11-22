// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateCategory from "../Modal/ModalCategory/ModalCreateCategory";
import ModalUpdateCategory from "../Modal/ModalCategory/ModalUpdateCategory";
import ModalDeleteCategory from "../Modal/ModalCategory/ModalDeleteCategory";
import { useState, useEffect } from "react";
import { fetchAllCategory } from "../../services/categoryServices";
import TableCategory from "../Modal/ModalCategory/TableCategory";
import { FcPlus } from "react-icons/fc";

const ManagerCategory = () => {
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [categoryDelete, setCategoryDelete] = useState({});
  const [categoryUpdate, setCategoryUpdate] = useState({});

  const getListCategory = async () => {
    const data = await fetchAllCategory();
    if (data && data.errCode === 0) {
      setListCategory(data.data);
    }
  };

  useEffect(() => {
    getListCategory();
  }, [listCategory]);

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
      <div className="text-[30px] font-medium text-center">
        Manager Category
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
              Add new category
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
