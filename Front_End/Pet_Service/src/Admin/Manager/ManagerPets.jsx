// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import ModalCreatePet from "../Modal/ModalPets/ModalCreatePet";
import ModalUpdatePet from "../Modal/ModalPets/ModalUpdatePet";
import ModalDeletePet from "../Modal/ModalPets/ModalDeletePet";
import TablePet from "../Modal/ModalPets/TablePet";
import { useEffect, useState } from "react";
// import { getAllPets } from "../../services/petServices";
import { getAllPetType } from "../../services/petTypeServices";
import { getByName, getAllPets } from "../../services/petServices";
import {
  getPaginate,
  getPaginateProduct,
  getPaginateProductSort,
} from "../../services/paginateServices";
import { Helmet } from "react-helmet";

const ManagerPets = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Pets";
  const [showModalCreatePet, setShowModalCreatePet] = useState(false);
  const [showModalUpdatePet, setShowModalUpdatePet] = useState(false);
  const [showModalDeletePet, setShowModalDeletePet] = useState(false);
  const [listPets, setListPets] = useState([]);
  const [petDelete, setPetDelete] = useState({});
  const [petUpdate, setPetUpdate] = useState({});
  const [listPetType, setListPetType] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [allPet, setAllPet] = useState([]);

  const handleShowUpdateModal = (pet) => {
    setPetUpdate(pet);
    setShowModalUpdatePet(true);
  };
  const handleShowDeleteModal = (pet) => {
    setPetDelete(pet);
    setShowModalDeletePet(true);
  };

  const fetchAllPet = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListPets(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  const fetchListPetType = async () => {
    const dataListPetType = await getAllPetType();
    if (dataListPetType && dataListPetType.errCode === 0) {
      setListPetType(dataListPetType.data);
    }
  };

  const handleSearch = async () => {
    if (!valueSearch.trim()) {
      fetchAllPet();
      return;
    }
    const dataSearch = await getByName(valueSearch);
    if (dataSearch && dataSearch.errCode === 0) {
      const listProduct = dataSearch.data;
      const data = await getPaginateProduct({
        listProduct: listProduct,
        page: 1,
        limit: 8,
      });
      if (data) {
        setListPets(data.data);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      }
    }
  };

  const handleSortByPrice = async (order) => {
    const data = {
      modelName,
      page: 1,
      limit: 8,
      sortBy: "price",
      order,
    };
    const response = await getPaginateProductSort(data);
    if (response) {
      setListPets(response.data);
      setTotalItems(response.totalItems);
      setTotalPages(response.totalPages);
    }
  };

  const getAllProductExportExcel = async () => {
    const data = await getAllPets();
    if (data && data.errCode === 0) {
      setAllPet(data.data);
    }
  };

  const handleExportExcel = () => {
    if (allPet.length === 0) {
      toast.error("Danh sách thú cưng trống!");
      return;
    }

    const dataToExport = allPet.map((pet) => ({
      ID: pet.pet_id,
      "Tên thú cưng": pet.name,
      "Giá thú cưng": pet.price,
      "Thể loại": pet.petType.type_name,
      "Màu lông": pet.coat_color,
      "Chiều cao": pet.height,
      "Cân nặng": pet.weight,
      "Số lượng": pet.stock,
      "Giống loài": pet.breed,
      "Tiêm Chuẩn":
        pet.available === true ? "Đã tiêm chuẩn" : "Chưa tiêm chuẩn",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách thú cưng");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DanhSachThuCung.xlsx");

    toast.success("Xuất Excel thành công!");
  };

  useEffect(() => {
    fetchListPetType();
    getAllProductExportExcel();
  }, []);

  useEffect(() => {
    if (valueSearch.trim() === "") {
      fetchAllPet();
    } else {
      handleSearch();
    }
  }, [currentPage, valueSearch]);

  return (
    <div className="manager-user-container">
      <Helmet>
        <title>Quản lý thú cưng </title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý thú cưng
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
              onClick={() => setShowModalCreatePet(true)}
            >
              <FcPlus />
              Thêm mới thú cưng
            </button>
            <button
              className="btn btn-success"
              style={{ marginRight: "28px" }}
              onClick={handleExportExcel}
            >
              Xuất Excel
            </button>
          </div>
          <div className="sort-by-price" style={{ marginBottom: "20px" }}>
            <Form.Select
              aria-label="Sort by price"
              onChange={(e) => handleSortByPrice(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </Form.Select>
          </div>
          <div className="search" style={{ marginRight: "28px" }}>
            <InputGroup className="mb-3" size="md">
              <Form.Control
                placeholder="Enter your input"
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
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        <ModalCreatePet
          show={showModalCreatePet}
          setShow={setShowModalCreatePet}
          fetchAllPet={fetchAllPet}
          listPetType={listPetType}
        />
        <ModalUpdatePet
          show={showModalUpdatePet}
          setShow={setShowModalUpdatePet}
          petUpdate={petUpdate}
          fetchAllPet={fetchAllPet}
          listPetType={listPetType}
        />
        <ModalDeletePet
          show={showModalDeletePet}
          setShow={setShowModalDeletePet}
          petDelete={petDelete}
          fetchAllPet={fetchAllPet}
        />

        <div className="btn-table-container"></div>
        <TablePet
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listPets={listPets}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerPets;
