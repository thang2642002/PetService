// import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCreateCart from "../Modal/ModalCarts/ModalCreateCart";
import ModalUpdateCart from "../Modal/ModalCarts/ModalUpdateCart";
import ModalDeleteCart from "../Modal/ModalCarts/ModalDeleteCart";
import { useState, useEffect } from "react";
import { getAllCart } from "../../services/cartService";
import TableCart from "../Modal/ModalCarts/TableCategory";
import { FcPlus } from "react-icons/fc";

const ManagerCarts = () => {
  const [showModalCreateCart, setShowModalCreateCart] = useState(false);
  const [showModalUpdateCart, setShowModalUpdateCart] = useState(false);
  const [showModalDeleteCart, setShowModalDeleteCart] = useState(false);
  const [listCart, setListCart] = useState([]);
  const [cartDelete, setCartDelete] = useState({});
  const [cartUpdate, setCartUpdate] = useState({});

  const handleShowUpdateModal = (cart) => {
    setCartUpdate(cart);
    setShowModalUpdateCart(true);
  };
  const handleShowDeleteModal = (cart) => {
    setCartDelete(cart);
    setShowModalDeleteCart(true);
  };

  const fetchAllCart = async () => {
    const data = await getAllCart();
    if (data && data.errCode === 0) {
      setListCart(data.data);
    } else {
      setListCart({});
    }
  };

  useEffect(() => {
    fetchAllCart();
  }, []);

  return (
    <div className="manager-user-container">
      <div className="text-[30px] font-medium text-center">Manager Carts</div>
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
              onClick={() => setShowModalCreateCart(true)}
            >
              <FcPlus />
              Add new cart
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
        <ModalCreateCart
          show={showModalCreateCart}
          setShow={setShowModalCreateCart}
          fetchAllCart={fetchAllCart}
        />
        <ModalUpdateCart
          show={showModalUpdateCart}
          setShow={setShowModalUpdateCart}
          cartUpdate={cartUpdate}
          fetchAllCart={fetchAllCart}
        />
        <ModalDeleteCart
          show={showModalDeleteCart}
          setShow={setShowModalDeleteCart}
          cartDelete={cartDelete}
          fetchAllCart={fetchAllCart}
        />

        <div className="btn-table-container"></div>
        <TableCart
          listCart={listCart}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowDeleteModal={handleShowDeleteModal}
        />
        <div
          className="custom-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default ManagerCarts;
