// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import ModalCreateProduct from "../Modal/ModalProduct/ModalCreateProduct";
import ModalUpdateProduct from "../Modal/ModalProduct/ModalUpdateProduct";
import ModalDeleteProduct from "../Modal/ModalProduct/ModalDeleteProduct";
import TableProduct from "../Modal/ModalProduct/TableProduct";
import { getPaginate } from "../../services/paginateServices";
import { fetchAllCategory } from "../../services/categoryServices";
import {
  getPaginateProduct,
  getPaginateProductSort,
} from "../../services/paginateServices";
import {
  getProductByName,
  getAllProduct,
} from "../../services/productServices";
import { Helmet } from "react-helmet";

const ManagerProduct = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Products";
  const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [productDelete, setProductDelete] = useState({});
  const [productUpdate, setProductUpdate] = useState({});
  const [listCategory, setListCategory] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [allProduct, setAllProduct] = useState([]);

  const handleShowUpdateModal = (product) => {
    setProductUpdate(product);
    setShowModalUpdateProduct(true);
  };
  const handleShowDeleteModal = (product) => {
    setProductDelete(product);
    setShowModalDeleteProduct(true);
  };

  const fetchAllProduct = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    setListProduct(data.data);
    setTotalItems(data.totalItems);
    setTotalPages(data.totalPages);
  };

  const getAllProductExportExcel = async () => {
    const data = await getAllProduct();
    if (data && data.errCode === 0) {
      setAllProduct(data.data);
    }
  };

  const fetchCategory = async () => {
    const dataCategory = await fetchAllCategory();
    if (dataCategory && dataCategory.errCode === 0) {
      setListCategory(dataCategory.data);
    }
  };

  const handleSearch = async () => {
    if (!valueSearch.trim()) {
      fetchAllProduct();
      return;
    }

    const dataSearch = await getProductByName(valueSearch);
    if (dataSearch && dataSearch.errCode === 0) {
      const listProduct = dataSearch.data;
      const data = await getPaginateProduct({
        listProduct,
        page: 1,
        limit: 8,
      });
      if (data) {
        setListProduct(data.data);
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
      setListProduct(response.data);
      setTotalItems(response.totalItems);
      setTotalPages(response.totalPages);
    }
  };

  const handleExportExcel = () => {
    if (allProduct.length === 0) {
      toast.error("Danh sách sản phẩm trống!");
      return;
    }

    const dataToExport = allProduct.map((product) => ({
      ID: product.product_id,
      "Tên sản phẩm": product.name,
      "Giá sản phẩm": product.price,
      "Thể loại": product.category.name,
      "Số lượng": product.stock,
      "Giảm giá": product.discount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sản phẩm");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DanhSachSanPham.xlsx");

    toast.success("Xuất Excel thành công!");
  };

  console.log("allProduct", allProduct);

  useEffect(() => {
    fetchCategory();
    getAllProductExportExcel();
  }, []);

  useEffect(() => {
    if (valueSearch.trim() === "") {
      fetchAllProduct();
    } else {
      handleSearch();
    }
  }, [currentPage, valueSearch]);

  return (
    <div className="manager-user-container">
      <Helmet>
        <title>Quản lý sản phẩm </title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý sản phẩm
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
              onClick={() => setShowModalCreateProduct(true)}
            >
              <FcPlus />
              Thêm mới sản phẩm
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
        <ModalCreateProduct
          show={showModalCreateProduct}
          setShow={setShowModalCreateProduct}
          fetchAllProduct={fetchAllProduct}
          listCategory={listCategory}
        />
        <ModalUpdateProduct
          show={showModalUpdateProduct}
          setShow={setShowModalUpdateProduct}
          productUpdate={productUpdate}
          fetchAllProduct={fetchAllProduct}
          listCategory={listCategory}
        />
        <ModalDeleteProduct
          show={showModalDeleteProduct}
          setShow={setShowModalDeleteProduct}
          productDelete={productDelete}
          fetchAllProduct={fetchAllProduct}
        />

        <div className="btn-table-container"></div>
        <TableProduct
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listProduct={listProduct}
          fetchAllProduct={fetchAllProduct}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerProduct;
