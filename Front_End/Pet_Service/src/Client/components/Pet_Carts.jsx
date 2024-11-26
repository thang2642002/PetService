import React from "react";
import { Col, Row } from "react-bootstrap";
import Pet_Carts_Item from "./Pet_Carts_Item";

const Pet_Carts = (props) => {
  const { listPet } = props;
  return (
    <>
      <div className="mt-6">
        <Row className="mt-4">
          {listPet &&
            listPet.map((pet, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <Pet_Carts_Item pet={pet} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default Pet_Carts;
