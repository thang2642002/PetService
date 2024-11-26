import { useEffect, useState } from "react";
import Product_Carts from "./Product_Carts";
import Title_Product_Carts from "./Title_Product_Carts";
import { getAllProduct } from "../../services/productServices";

const List_Product = (props) => {
  const [listProduct, setListProduct] = useState([]);

  const fetchProduct = async () => {
    const dataProduct = await getAllProduct();
    setListProduct(dataProduct.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <Title_Product_Carts />
        <Product_Carts listProduct={listProduct} />
      </div>
    </>
  );
};

export default List_Product;
