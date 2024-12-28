// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import ModalCreateUserPet from "../Modal/ModalUserPet/ModalCreateUserPet";
import ModalUpdateUserPet from "../Modal/ModalUserPet/ModalUpdateUserPet";
import ModalDeleteUserPet from "../Modal/ModalUserPet/ModalDeleteUserPet";
import TableUserPet from "../Modal/ModalUserPet/TableUserPet";
// import { getAllUserPet } from "../../services/userPetServices";
import { getPaginate } from "../../services/paginateServices";

const ManagerUserPet = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "UserPet";
  const [showModalCreateUserPet, setShowModalCreateUserPet] = useState(false);
  const [showModalUpdateUserPet, setShowModalUpdateUserPet] = useState(false);
  const [showModalDeleteUserPet, setShowModalDeleteUserPet] = useState(false);
  const [listUserPet, setListUserPet] = useState([]);
  const [userPetDelete, setUserPetDelete] = useState({});
  const [userPetUpdate, setUserPetUpdate] = useState({});

  const handleShowUpdateModal = (userPet) => {
    setUserPetUpdate(userPet);
    setShowModalUpdateUserPet(true);
  };
  const handleShowDeleteModal = (userPet) => {
    setUserPetDelete(userPet);
    setShowModalDeleteUserPet(true);
  };

  const fetchAllUserPet = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListUserPet(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllUserPet();
  }, [currentPage]);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Quản lý thú cưng của người dùng
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
              onClick={() => setShowModalCreateUserPet(true)}
            >
              <FcPlus />
              Thêm mới thú cưng
            </button>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Nhập thông tin"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                Tìm kiếm
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreateUserPet
          show={showModalCreateUserPet}
          setShow={setShowModalCreateUserPet}
          fetchAllUserPet={fetchAllUserPet}
        />
        <ModalUpdateUserPet
          show={showModalUpdateUserPet}
          setShow={setShowModalUpdateUserPet}
          userPetUpdate={userPetUpdate}
          fetchAllUserPet={fetchAllUserPet}
        />
        <ModalDeleteUserPet
          show={showModalDeleteUserPet}
          setShow={setShowModalDeleteUserPet}
          userPetDelete={userPetDelete}
          fetchAllUserPet={fetchAllUserPet}
        />

        <div className="btn-table-container"></div>
        <TableUserPet
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listUserPet={listUserPet}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerUserPet;
