import React, { useEffect, useState } from "react";
import Title_Product_Carts from "../../components/Title_Product_Carts";
import PetProductCarts from "./PetProductCarts";
import { getAllPets } from "../../../services/petServices";
import {
  getAllProduct,
  findByCategory,
  findDiscount,
} from "../../../services/productServices";
import { getPaginateProduct } from "../../../services/paginateServices";
import ButtonSeeMore from "../../components/ButtonSeeMore";

const ListPetsProduct = (props) => {
  const { type } = props;
  const [listPetProduct, setListPetProduct] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  const fetchListPetProduct = async () => {
    try {
      let dataPet = [];
      if (type === "pets") {
        const response = await getAllPets();
        dataPet = response.data || [];
      } else if (type === "products") {
        const response = await getAllProduct();
        dataPet = response.data || [];
      } else if (type === "pettags") {
        const response = await findByCategory(4);
        dataPet = response.data || [];
      } else if (type === "discount") {
        const response = await findDiscount();
        dataPet = response.data || [];
      }
      if (dataPet) {
        setListPetProduct(dataPet);
        setDisplayedProducts(dataPet.slice(0, 8));
        if (dataPet.length <= 8) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching initial products:", error);
    }
  };

  const loadMoreProducts = () => {
    const nextProducts = listPetProduct.slice(currentIndex, currentIndex + 8);
    setDisplayedProducts((prev) => [...prev, ...nextProducts]);
    setCurrentIndex((prev) => prev + 8);

    if (currentIndex + 8 >= listPetProduct.length) {
      setHasMore(false);
    }
  };

  const getTitleByType = () => {
    switch (type) {
      case "pets":
        return "Thú cưng";
      case "products":
        return "Sản phẩm";
      case "pettags":
        return "Thẻ thú cưng";
      case "discount":
        return "Sản phẩm khuyến mãi";
      default:
        return "Không có sản phẩm";
    }
  };

  useEffect(() => {
    fetchListPetProduct();
  }, []);

  return (
    <div>
      <div>
        <Title_Product_Carts title={getTitleByType()} />
        <PetProductCarts listPetProduct={displayedProducts} />
        <div className="flex justify-center align-items-center">
          <ButtonSeeMore onClick={loadMoreProducts} disabled={!hasMore} />
        </div>
      </div>
    </div>
  );
};

export default ListPetsProduct;
