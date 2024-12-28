// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalViewCart from "../Modal/ModalCarts/ModalViewCart";

import { useState, useEffect } from "react";
// import { getAllCart } from "../../services/cartService";
import { getPaginate } from "../../services/paginateServices";
import TableCart from "../Modal/ModalCarts/TableCategory";
import { FcPlus } from "react-icons/fc";

const ManagerCarts = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Carts";
  const [showModalViewCart, setShowModalViewCart] = useState(false);
  const [listCart, setListCart] = useState([]);

  const [cartView, setCartView] = useState({});
  const handleShowViewModal = (cart) => {
    setCartView(cart);
    setShowModalViewCart(true);
  };

  const fetchAllCart = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListCart(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } else {
      setListCart({});
    }
  };

  useEffect(() => {
    fetchAllCart();
  }, [currentPage]);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Quản lý giỏ hàng</div>
      <div className="user-contents">
        <ModalViewCart
          show={showModalViewCart}
          setShow={setShowModalViewCart}
          cartView={cartView}
        />
        <div className="btn-table-container">
          <TableCart
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            listCart={listCart}
            handleShowViewModal={handleShowViewModal}
          />
          <div
            className="custom-pagination"
            style={{ display: "flex", justifyContent: "center" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ManagerCarts;
