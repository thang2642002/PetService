import React, { useEffect, useState } from "react";
import Title_Product_Carts from "../../components/Title_Product_Carts";
import PetProductCarts from "./PetProductCarts";
import { getAllPets } from "../../../services/petServices";
import {
  getAllProduct,
  findByCategory,
} from "../../../services/productServices";
import { getPaginateProduct } from "../../../services/paginateServices";
import ButtonSeeMore from "../../components/ButtonSeeMore";

const ListPetsProduct = (props) => {
  const { type } = props;
  const [listPetProduct, setListPetProduct] = useState([]); // Tất cả sản phẩm
  const [displayedProducts, setDisplayedProducts] = useState([]); // Các sản phẩm đang hiển thị
  const [currentIndex, setCurrentIndex] = useState(8); // Vị trí đến sản phẩm tiếp theo để lấy
  const [hasMore, setHasMore] = useState(true);

  // Lấy dữ liệu ban đầu
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
        const response = await findByCategory(2);
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
      default:
        return "Sản phẩm khuyến mãi";
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
