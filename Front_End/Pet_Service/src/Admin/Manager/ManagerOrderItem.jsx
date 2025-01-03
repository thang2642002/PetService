// import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import ModalViewOrderItem from "../Modal/ModalOrderItem/ModalViewOrderItem";
import TableOrderItem from "../Modal/ModalOrderItem/TableOrderItem";
import { getPaginate } from "../../services/paginateServices";
import { FcPlus } from "react-icons/fc";
import { Helmet } from "react-helmet";

const ManagerOrderItem = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "OrderItem";
  const [showModalViewOrder, setShowModalViewOrder] = useState(false);
  const [listOrderItem, setListOrderItem] = useState([]);
  const [orderItemView, setOrderItemView] = useState({});

  const handleShowViewModal = (orderItem) => {
    setOrderItemView(orderItem);
    setShowModalViewOrder(true);
  };

  const fetchAllOrderItem = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListOrderItem(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchAllOrderItem();
  }, [currentPage]);

  return (
    <div className="manager-user-container">
       <Helmet>
        <title>Quản lý chi tiết đơn hàng</title>
      </Helmet>
      <div className="text-[30px] font-medium text-center">
        Quản lý chi tiết đơn hàng
      </div>
      <div className="user-contents">
        <ModalViewOrderItem
          show={showModalViewOrder}
          setShow={setShowModalViewOrder}
          orderItemView={orderItemView}
        />

        <div className="btn-table-container"></div>
        <TableOrderItem
          listOrderItem={listOrderItem}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShowViewModal={handleShowViewModal}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerOrderItem;
