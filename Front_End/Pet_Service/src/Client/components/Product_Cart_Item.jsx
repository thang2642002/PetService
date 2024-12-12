import img from "../../assets/img/product-item.jpg";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const Product_Cart_Item = (props) => {
  const { product } = props;
  let productPrice = product.price;
  let discountPercentage = product.discount;

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
          product?.product_id === undefined
            ? `/pet-detail/${product.pet_id}`
            : `/product-detail/${product.product_id}`
        }
        style={{ textDecoration: "none" }}
      >
        <div
          className="cart_item cursor-pointer relative group"
          style={{ marginTop: "30px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!Number.isNaN(discountPrice) && discountPrice !== 0 && (
            <div className="absolute bg-red-500 top-[10px] right-[10px] text-white p-2">
              {discountPercentage}%
            </div>
          )}

          <div className="max-w-[300px] max-h-[300px] overflow-hidden">
            <img
              src={hovered ? product?.images[1] : product?.images[0]} // Chuyển đổi ảnh khi hover
              alt="img-product"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out "
            />
          </div>
          <div className="p-2 text-[#252a2b] text-sm">
            {product?.name || product.name}
          </div>
          <div className="pl-2 flex justify-between text-sm text-black font-medium">
            <div
              className={`${
                !Number.isNaN(discountPrice) && discountPrice !== 0
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {product.price.toLocaleString()} đ
            </div>
            <div className="text-red-400">
              {!Number.isNaN(discountPrice) && discountPrice !== 0 && (
                <div>{discountPrice.toLocaleString()} đ</div>
              )}
            </div>
          </div>
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

export default Product_Cart_Item;
