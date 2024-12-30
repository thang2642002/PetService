import React, { useState } from "react";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PetProductCartsItem = (props) => {
  const { productPet } = props;
  let productPrice = productPet?.price;
  let discountPercentage = productPet?.discount;

  const discountPrice =
    productPrice - (productPrice * discountPercentage) / 100;

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Link
        to={
          productPet?.product_id === undefined
            ? `/pet-detail/${productPet.pet_id}`
            : `/product-detail/${productPet.product_id}`
        }
        style={{ textDecoration: "none" }}
      >
        <div
          className="cart_item cursor-pointer relative group"
          style={{ marginTop: "30px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {discountPercentage > 0 && (
            <div className=" absolute bg-red-500 top-[10px] right-[10px] text-white p-2">
              {discountPercentage || 0}%
            </div>
          )}

          <div className="max-w-[300px] max-h-[300px] overflow-hidden">
            <img
              src={hovered ? productPet?.images[1] : productPet?.images[0]}
              alt="img-product"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out "
            />
          </div>
          <div className="p-2 text-[#252a2b] text-sm">
            {productPet?.name || productPet.name}
          </div>
          <div className="pl-2 flex justify-between text-sm text-black font-medium">
            <div
              className={`${
                !Number.isNaN(discountPrice) &&
                discountPrice !== 0 &&
                productPet.price !== discountPrice
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {productPet.price.toLocaleString()} đ
            </div>
            <div className="text-red-500">
              {!Number.isNaN(discountPrice) &&
                discountPrice !== 0 &&
                discountPrice !== productPet.price && (
                  <div>{discountPrice.toLocaleString()} đ</div>
                )}
            </div>
          </div>
          {productPet?.stock ? (
            <div className="text-black text-sm ml-2 text-[12px] mt-[5px] ">
              Số lượng còn lại: {productPet?.stock}
            </div>
          ) : (
            <div className="text-black text-sm ml-2 text-[12px] mt-[5px] ">
              Số lượng còn lại: 0
            </div>
          )}
          <button className="mt-3 w-full h-[40px] flex items-center justify-center relative group overflow-hidden p-2 border border-[#6b4433] rounded">
            <span className="absolute inset-0 bg-[#6b4433] transition-transform duration-300 ease-in-out transform -translate-x-[101%] group-hover:translate-x-0"></span>
            <span className="relative flex items-center space-x-2 text-blue-500 group-hover:text-white">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-lg text-[#6b4433] group-hover:text-white"
              />
              <p className="text-sm text-[#6b4433] group-hover:text-white mt-3">
                Chọn mua
              </p>
            </span>
          </button>
        </div>
      </Link>
    </>
  );
};

export default PetProductCartsItem;
