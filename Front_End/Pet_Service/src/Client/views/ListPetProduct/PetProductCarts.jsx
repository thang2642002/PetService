import React from "react";
import { Row, Col } from "react-bootstrap";
import PetProductCartsItem from "./PetProductCartsItem";

const PetProductCarts = (props) => {
  const { listPetProduct } = props;

  return (
    <div className="mt-6">
      {/* Row với khoảng cách giữa các cột */}
      <Row className="g-3 mt-4">
        {listPetProduct &&
          listPetProduct.map((productPet, index) => (
            <Col xs={12} sm={6} lg={3} key={index}>
              {/* 1 cột trên điện thoại, 2 cột trên tablet */}
              <PetProductCartsItem productPet={productPet} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default PetProductCarts;
