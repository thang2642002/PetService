import { Col, Row } from "react-bootstrap";
import Product_Cart_Item from "./Product_Cart_Item";

const Product_Carts = (props) => {
  const { listProduct } = props;

  return (
    <div className="mt-6">
      <Row className="mt-4">
        {listProduct &&
          listProduct.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Product_Cart_Item product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Product_Carts;
