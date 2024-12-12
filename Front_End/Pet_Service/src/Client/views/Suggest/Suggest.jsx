import React, { useEffect, useState } from "react";
import SuggestProduct from "./SuggestProduct";
import Slider from "react-slick";
import "./SuggestProduct.scss";
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

  // Cấu hình cho Slider
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số item hiển thị cùng lúc
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Màn hình nhỏ hơn 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Màn hình nhỏ hơn 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h2 className="title mt-10 text-2xl mb-4 text-center text-[#522f1f] font-medium">
        SẢN PHẨM LIÊN QUAN
      </h2>
      <Slider {...settings}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => (
            <div key={`product-${index}`}>
              <SuggestProduct product={product} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Suggest;
