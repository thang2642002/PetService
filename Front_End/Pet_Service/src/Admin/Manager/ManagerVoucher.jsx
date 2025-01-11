// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import ModalCreateVoucher from "../Modal/ModalVoucher/ModalCreateVoucher";
import ModalUpdateVoucher from "../Modal/ModalVoucher/ModalUpdateVoucher";
import ModalDeleteVoucher from "../Modal/ModalVoucher/ModalDeleteVoucher";
import TableVoucher from "../Modal/ModalVoucher/TableVoucher";
// import { getAllUserPet } from "../../services/userPetServices";
import { getPaginate } from "../../services/paginateServices";
import { Helmet } from "react-helmet";

const ManagerUserPet = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Voucher";
  const [showModalCreateVoucher, setShowModalCreateVoucher] = useState(false);
  const [showModalUpdateVoucher, setShowModalUpdateVoucher] = useState(false);
  const [showModalDeleteVoucher, setShowModalDeleteVoucher] = useState(false);
  const [listVoucher, setListVoucher] = useState([]);
  const [voucherDelete, setVoucherDelete] = useState({});
  const [voucherUpdate, setVoucherUpdate] = useState({});

  const handleShowUpdateModal = (voucher) => {
    setVoucherUpdate(voucher);
    setShowModalUpdateVoucher(true);
  };
  const handleShowDeleteModal = (voucher) => {
    setVoucherDelete(voucher);
    setShowModalDeleteVoucher(true);
  };

  const fetchAllVoucher = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListVoucher(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllVoucher();
  }, [currentPage]);
  return (
    <div className="manager-user-container">
      <Helmet>
        <title>Quản lý mã giảm giá </title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý mã giảm giá
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
              onClick={() => setShowModalCreateVoucher(true)}
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
        <ModalCreateVoucher
          show={showModalCreateVoucher}
          setShow={setShowModalCreateVoucher}
          fetchAllVoucher={fetchAllVoucher}
        />
        <ModalUpdateVoucher
          show={showModalUpdateVoucher}
          setShow={setShowModalUpdateVoucher}
          voucherUpdate={voucherUpdate}
          fetchAllVoucher={fetchAllVoucher}
        />
        <ModalDeleteVoucher
          show={showModalDeleteVoucher}
          setShow={setShowModalDeleteVoucher}
          voucherDelete={voucherDelete}
          fetchAllVoucher={fetchAllVoucher}
        />

        <div className="btn-table-container"></div>
        <TableVoucher
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listVoucher={listVoucher}
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
