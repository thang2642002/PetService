// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateOrder from "../Modal/ModalOrder/ModalCreateOrder";
import ModalUpdateOrder from "../Modal/ModalOrder/ModalUpdateOrder";
import ModalDeleteOrder from "../Modal/ModalOrder/ModalDeleteOrder";
import TableOrder from "../Modal/ModalOrder/TableOrder";
import { getAllOrder } from "../../services/orderServices";

import { FcPlus } from "react-icons/fc";

const ManagerOrder = () => {
  const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);
  const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
  const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [orderDelete, setOrderDelete] = useState({});
  const handleShowUpdateModal = () => {
    setShowModalUpdateOrder(true);
  };
  const handleShowDeleteModal = (order) => {
    setOrderDelete(order);
    setShowModalDeleteOrder(true);
  };

  const fetchAllOrder = async () => {
    const data = await getAllOrder();
    console.log(data);
    setListOrder(data.data);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Order</div>
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
              onClick={() => setShowModalCreateOrder(true)}
            >
              <FcPlus />
              Add new Order
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
        <ModalCreateOrder
          show={showModalCreateOrder}
          setShow={setShowModalCreateOrder}
          fetchAllOrder={fetchAllOrder}
        />
        <ModalUpdateOrder
          show={showModalUpdateOrder}
          setShow={setShowModalUpdateOrder}
        />
        <ModalDeleteOrder
          show={showModalDeleteOrder}
          setShow={setShowModalDeleteOrder}
          orderDelete={orderDelete}
          fetchAllOrder={fetchAllOrder}
        />

        <div className="btn-table-container"></div>
        <TableOrder
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listOrder={listOrder}
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
