import { useEffect, useState } from "react";
import ModalViewOrder from "../Modal/ModalOrder/ModalViewOrder";
import TableOrder from "../Modal/ModalOrder/TableOrder";
import { getPaginate } from "../../services/paginateServices";

const ManagerOrder = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const modelName = "Order";
  const [showModalViewOrder, setShowModalViewOrder] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [orderView, setOrderView] = useState({});

  const fetchAllOrder = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListOrder(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  const handleShowViewModal = (order) => {
    setOrderView(order);
    setShowModalViewOrder(true);
  };

  useEffect(() => {
    fetchAllOrder();
  }, [currentPage]);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Order</div>
      <div className="user-contents">
        <ModalViewOrder
          show={showModalViewOrder}
          setShow={setShowModalViewOrder}
          orderView={orderView}
        />
        <div className="btn-table-container"></div>
        <TableOrder
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          listOrder={listOrder}
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

export default ManagerOrder;
