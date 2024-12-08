import React from "react";
import { Col, Row } from "react-bootstrap";
import PetProductCartsItem from "./PetProductCartsItem";

const PetProductCarts = (props) => {
  const { listPetProduct } = props;
  return (
    <>
      <div className="mt-6">
        <Row className="mt-4">
          {listPetProduct &&
            listPetProduct.map((productPet, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <PetProductCartsItem productPet={productPet} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default PetProductCarts;
