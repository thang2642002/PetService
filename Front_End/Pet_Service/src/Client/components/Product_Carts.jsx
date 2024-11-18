import { Col, Row } from "react-bootstrap"; // Chú ý: sửa lại dấu nháy kép quanh react-bootstrap
import Cart_Item from "./Cart_Item";

const Product_Carts = () => {
  return (
    <div className="mt-6">
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Cart_Item />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Cart_Item />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Cart_Item />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Cart_Item />
        </Col>
      </Row>
    </div>
  );
};

export default Product_Carts;
