// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateOrderItem from "../Modal/ModalOrderItem/ModalCreateOrderItem";
import ModalUpdateOrderItem from "../Modal/ModalOrderItem/ModalUpdateOrderItem";
import ModalDeleteOrderItem from "../Modal/ModalOrderItem/ModalDeleteOrderItem";
import TableOrderItem from "../Modal/ModalOrderItem/TableOrderItem";
import { getAllOrderItem } from "../../services/orderItemServices";

import { FcPlus } from "react-icons/fc";

const ManagerOrderItem = () => {
  const [showModalCreateOrderItem, setShowModalCreateOrderItem] =
    useState(false);
  const [showModalUpdateOrderItem, setShowModalUpdateOrderItem] =
    useState(false);
  const [showModalDeleteOrderItem, setShowModalDeleteOrderItem] =
    useState(false);
  const [listOrderItem, setListOrderItem] = useState([]);
  const [orderItemUpdate, setOrderItemUpdate] = useState({});
  const [orderItemDelete, setOrderItemDelete] = useState({});

  const handleShowUpdateModal = (orderItem) => {
    setOrderItemUpdate(orderItem);
    setShowModalUpdateOrderItem(true);
  };
  const handleShowDeleteModal = (orderItem) => {
    setOrderItemDelete(orderItem);
    setShowModalDeleteOrderItem(true);
  };

  const fetchAllOrderItem = async () => {
    const data = await getAllOrderItem();
    setListOrderItem(data.data);
  };

  useEffect(() => {
    fetchAllOrderItem();
  }, []);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">
        Manager Order Item
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
              onClick={() => setShowModalCreateOrderItem(true)}
            >
              <FcPlus />
              Add new order item
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
        <ModalCreateOrderItem
          show={showModalCreateOrderItem}
          setShow={setShowModalCreateOrderItem}
          fetchAllOrderItem={fetchAllOrderItem}
        />
        <ModalUpdateOrderItem
          show={showModalUpdateOrderItem}
          setShow={setShowModalUpdateOrderItem}
          orderItemUpdate={orderItemUpdate}
          fetchAllOrderItem={fetchAllOrderItem}
        />
        <ModalDeleteOrderItem
          show={showModalDeleteOrderItem}
          setShow={setShowModalDeleteOrderItem}
          orderItemDelete={orderItemDelete}
          fetchAllOrderItem={fetchAllOrderItem}
        />

        <div className="btn-table-container"></div>
        <TableOrderItem
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
          listOrderItem={listOrderItem}
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
