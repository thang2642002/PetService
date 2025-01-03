// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import ModalCreateService from "../Modal/ModalService/ModalCreateService";
import ModalUpdateService from "../Modal/ModalService/ModalUpdateService";
import ModalDeleteService from "../Modal/ModalService/ModalDeleteService";
import TableService from "../Modal/ModalService/TableService";
// import { getAllServices } from "../../services/serviceServices";
import { getPaginate } from "../../services/paginateServices";
import { getByNameServices } from "../../services/serviceServices";
import { getPaginateProduct } from "../../services/paginateServices";
import { Helmet } from "react-helmet";

const ManagerService = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Services";
  const [showModalCreateService, setShowModalCreateService] = useState(false);
  const [showModalUpdateService, setShowModalUpdateService] = useState(false);
  const [showModalDeleteService, setShowModalDeleteService] = useState(false);
  const [serviceDelete, setServiceDelete] = useState({});
  const [listService, setListService] = useState([]);
  const [serviceUpdate, setServiceUpdate] = useState({});
  const [valueSearch, setValueSearch] = useState("");

  const handleShowUpdateModal = (service) => {
    setServiceUpdate(service);
    setShowModalUpdateService(true);
  };
  const handleShowDeleteModal = (service) => {
    setServiceDelete(service);
    setShowModalDeleteService(true);
  };

  const fetchAllService = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListService(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  const handleSearch = async () => {
    if (!valueSearch.trim()) {
      fetchAllService();
      return;
    }
    const dataSearch = await getByNameServices(valueSearch);
    if (dataSearch && dataSearch.errCode === 0) {
      const listProduct = dataSearch.data;
      const data = await getPaginateProduct({
        listProduct: listProduct,
        page: 1,
        limit: 8,
      });
      if (data) {
        setListService(data.data);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      }
    }
  };

  useEffect(() => {
    if (valueSearch.trim() === "") {
      fetchAllService();
    } else {
      handleSearch();
    }
  }, [currentPage, valueSearch]);

  return (
    <div className="manager-user-container">
      <Helmet>
        <title>Quản lý dịch vụ</title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">Quản lý dịch vụ</div>
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
              onClick={() => setShowModalCreateService(true)}
            >
              <FcPlus />
              Thêm mới dịch vụ
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
        <ModalCreateService
          show={showModalCreateService}
          setShow={setShowModalCreateService}
          fetchAllService={fetchAllService}
        />
        <ModalUpdateService
          show={showModalUpdateService}
          setShow={setShowModalUpdateService}
          serviceUpdate={serviceUpdate}
          fetchAllService={fetchAllService}
        />
        <ModalDeleteService
          show={showModalDeleteService}
          setShow={setShowModalDeleteService}
          serviceDelete={serviceDelete}
          fetchAllService={fetchAllService}
        />

        <div className="btn-table-container"></div>
        <TableService
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listService={listService}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerService;
