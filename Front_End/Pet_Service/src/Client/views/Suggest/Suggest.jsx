import Cart_Item from "../../components/Cart_Item";
import { Row, Col } from "react-bootstrap";
const Suggest = () => {
  return (
    <>
      <div className="container">
        <h2 className="title mt-10 text-2xl mb-4 text-center text-[#522f1f] font-medium">
          SẢN PHẨM LIÊN QUAN
        </h2>
        <div>
          <Row>
            <Col>
              <Cart_Item />
            </Col>
            <Col>
              <Cart_Item />
            </Col>
            <Col>
              <Cart_Item />
            </Col>
            <Col>
              <Cart_Item />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Suggest;
