// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { FcPlus } from "react-icons/fc";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import ModalCreateUser from "../Modal/ModalUser/ModalCreateUser";
import ModalUpdateUser from "../Modal/ModalUser/ModalUpdateUser";
import ModalDeleteUser from "../Modal/ModalUser/ModalDeleteUser";
import TableUser from "../Modal/ModalUser/TableUser";
// import { getAllUser } from "../../services/userServices";
import { getPaginate } from "../../services/paginateServices";
import { findNameUser } from "../../services/userServices";
import { getPaginateProduct } from "../../services/paginateServices";
import { Helmet } from "react-helmet";

const ManagerUser = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "User";
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [userDelete, setUserDelete] = useState({});
  const [userUpdate, setUserUpdate] = useState({});
  const [valueSearch, setValueSearch] = useState("");

  const handleShowUpdateModal = (user) => {
    setUserUpdate(user);
    setShowModalUpdateUser(true);
  };
  const handleShowDeleteModal = (user) => {
    setShowModalDeleteUser(true);
    setUserDelete(user);
  };

  const getListUser = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListUser(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  const handleSearch = async () => {
    if (!valueSearch.trim()) {
      getListUser();
      return;
    }
    const dataSearch = await findNameUser(valueSearch);
    if (dataSearch && dataSearch.errCode === 0) {
      const listProduct = dataSearch.data;
      const data = await getPaginateProduct({
        listProduct: listProduct,
        page: 1,
        limit: 8,
      });
      if (data) {
        setListUser(data.data);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      }
    }
  };

  const handleExportExcel = () => {
    if (listUser.length === 0) {
      toast.error("Danh sách người dùng trống!");
      return;
    }

    const dataToExport = listUser.map((user) => ({
      ID: user.user_id,
      "Họ và Tên": user.user_name,
      Email: user.email,
      "Số điện thoại": user.phone,
      "Địa chỉ": user.address,
      Quyền: user.role === "manager" ? "Quản lý" : "Khách hàng",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách người dùng");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DanhSachNguoiDung.xlsx");

    toast.success("Xuất Excel thành công!");
  };

  useEffect(() => {
    if (valueSearch.trim() === "") {
      getListUser();
    } else {
      handleSearch();
    }
  }, [currentPage, valueSearch]);

  return (
    <div className="manager-user-container">
      <Helmet>
        <title>Quản lý người dùng </title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý người dùng
      </div>
      <div className="user-contents">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="btn-add-new h-[37px] flex gap-8">
            <button
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                gap: "8px",
              }}
              onClick={() => setShowModalCreateUser(true)}
            >
              <FcPlus />
              Thêm mới người dùng
            </button>
            <button
              className="btn btn-success"
              style={{ marginRight: "28px" }}
              onClick={handleExportExcel}
            >
              Xuất Excel
            </button>
          </div>

          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Nhập thông tin"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <Button
                variant="primary"
                id="button-addon2"
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          getListUser={getListUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userUpdate}
          getListUser={getListUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          userDelete={userDelete}
          getListUser={getListUser}
        />

        <div className="btn-table-container"></div>
        <TableUser
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listUser={listUser}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerUser;
