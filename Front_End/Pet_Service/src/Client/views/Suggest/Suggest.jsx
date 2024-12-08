import { useEffect, useState } from "react";
import Product_Cart_Item from "../../../Client/components/Product_Cart_Item";
import PetProductCartsItem from "../ListPetProduct/PetProductCartsItem";
import { Row, Col } from "react-bootstrap";
import { getAllProduct } from "../../../services/productServices";
import { getAllPets } from "../../../services/petServices";

const Suggest = (props) => {
  const { product, pet } = props;
  const [listProduct, setListProduct] = useState([]);
  const [listPet, setListPet] = useState([]);

  const fetchAllData = async () => {
    if (product && product?.category_id) {
      const dataProduct = await getAllProduct();
      setListProduct(dataProduct?.data);
    } else {
      const dataPet = await getAllPets();
      setListPet(dataPet?.data);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [product]);

  const filteredProducts =
    product && product?.category_id
      ? listProduct.filter(
          (item) =>
            product?.category_id === item?.category_id &&
            product.product_id !== item.product_id
        )
      : listPet.filter(
          (item) =>
            pet.pet_type_id === item.pet_type_id && pet.pet_id !== item.pet_id
        );

  return (
    <>
      <div className="container">
        <h2 className="title mt-10 text-2xl mb-4 text-center text-[#522f1f] font-medium">
          SẢN PHẨM LIÊN QUAN
        </h2>
        <div>
          <Row>
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={`product-${index}`}>
                  {console.log("product", product)}
                  <Product_Cart_Item product={product} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Suggest;
