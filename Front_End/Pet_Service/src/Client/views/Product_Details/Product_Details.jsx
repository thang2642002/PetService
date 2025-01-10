import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Product_Details.scss";
import Suggest from "../Suggest/Suggest";
import { getProductById } from "../../../services/productServices";
import {
  createCart,
  getByCartId,
  updateCart,
} from "../../../services/cartService";
import { createCartItem } from "../../../services/cartItemServices";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/Slices/cartSlices";
import Rating from "../ReviewProducts/Rating/Rating";
import Comment from "../ReviewProducts/Comment/Comment";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showDesc, setShowDesc] = useState(false);
  const [showService, setShowService] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
  };

  const handleThumbnailClick = (index) => {
    const selectedImageURL = product?.images[index];
    setSelectedImage(selectedImageURL);
    sliderRef.current?.slickGoTo(index);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const fetchProductById = async () => {
    try {
      const response = await getProductById(id);
      if (response?.data) {
        setProduct(response.data);
      } else {
        toast.error("Không thể tải thông tin sản phẩm!");
      }
    } catch (error) {
      console.error("Error loading product details:", error);
      toast.error("Có lỗi xảy ra khi tải thông tin sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCart = async () => {
    try {
      if (!user) {
        toast.error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return;
      }

      const addCartResponse = await createCart(user?.data?.user_id, 0);

      if (addCartResponse?.errCode !== 0) {
        toast.error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return;
      }

      const cartId = addCartResponse?.data?.cart_id;
      const priceAfterDiscount =
        product?.discount !== 0
          ? (product?.price - (product?.price * product?.discount) / 100) *
            quantity
          : product?.price * quantity;

      const addCartItemResponse = await createCartItem(
        cartId,
        id,
        quantity,
        priceAfterDiscount
      );

      if (addCartItemResponse?.errCode === 0) {
        const cartDetails = await getByCartId(user.data.user_id);
        if (cartDetails?.errCode === 0) {
          const totalAmount = cartDetails.data.cartItems.reduce(
            (total, item) => {
              const itemPrice =
                item?.product_item?.discount !== 0
                  ? (item?.product_item?.price -
                      (item?.product_item?.price *
                        item?.product_item?.discount) /
                        100) *
                    item?.product_item?.quantity
                  : item?.product_item?.price * item?.product_item?.quantity;

              return total + itemPrice;
            },
            0
          );
          const updateCartResponse = await updateCart(
            cartId,
            cartDetails.data.user_id,
            totalAmount
          );

          if (updateCartResponse?.errCode === 0) {
            const newItem = {
              product_id: id,
              quantity: quantity,
              total_price: priceAfterDiscount,
            };
            dispatch(addItemToCart(newItem));
            toast.success("Sản phẩm đã được thêm vào giỏ hàng thành công ");
          } else {
            toast.error(
              "Sản phẩm đã thêm vào giỏ hàng nhưng không thể cập nhật tổng số tiền!"
            );
          }
        }
      } else {
        toast.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  const sliderRef = React.useRef();

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Chi tiết sản phẩm</title>
      </Helmet>
      <Row className="gy-4">
        <Col md={6} className="d-flex flex-column flex-md-row gap-3">
          <div className="d-flex flex-column gap-3">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-100 h-20 object-cover cursor-pointer border ${
                  selectedImage === image ? "border-danger" : "border-secondary"
                } hover:border-danger rounded`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          <div className="flex-grow ms-3 max-w-[500px] max-h-[800px] overflow-hidden flex-shrink-0">
            <Slider ref={sliderRef} {...sliderSettings}>
              {product?.images?.map((image, index) => (
                <div key={index} className="w-full">
                  <TransformWrapper>
                    <TransformComponent>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover rounded border cursor-pointer"
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              ))}
            </Slider>
          </div>
        </Col>

        <Col md={6}>
          <div className=" p-4  ">
            <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
            <div className="flex">
              <p className="pr-5 border-solid border-r-2 border-[#cccccc] ">
                Mã sản phẩm: 8936204290164
              </p>
              <p className="ml-5">Thương hiệu: Royal Canin</p>
            </div>

            <div className="flex gap-6">
              <div>
                {product?.discount > 0 ? (
                  <div className="align-items-center p-2 bg-[#f2f5fa] text-red-500 font-medium">
                    {product?.discount} %
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <h3
                  className={`${
                    product?.discount > 0
                      ? "text-gray-400 line-through align-items-center"
                      : "text-danger align-items-center"
                  } mb-3`}
                >
                  {product?.price.toLocaleString()} đ
                </h3>
              </div>
              {product.discount > 0 && (
                <div>
                  <h3 className="text-danger mb-3 align-items-center">
                    {(
                      product?.price -
                      (product?.price * product.discount) / 100
                    ).toLocaleString()}
                    đ
                  </h3>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center gap-3 mt-5">
              <div
                className="d-flex gap-3 align-items-center"
                style={{ flex: 1 }}
              >
                <Button
                  variant="secondary"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  style={{ width: "40px", height: "40px" }}
                >
                  -
                </Button>
                <InputGroup style={{ width: "80px" }}>
                  <FormControl
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                    type="number"
                    min="1"
                    aria-label="Số lượng"
                    className="text-center"
                  />
                </InputGroup>
                <Button
                  variant="secondary"
                  onClick={increaseQuantity}
                  style={{ width: "40px", height: "40px" }}
                >
                  +
                </Button>
              </div>
              <button style={{ flex: 2 }} className="custom-btn">
                <span className="title-btn" onClick={handleAddCart}>
                  Thêm vào giỏ hàng
                </span>
              </button>
            </div>
            <div className="mt-5 pb-4">
              <div
                className="uppercase font-medium cursor-pointer flex justify-between"
                onClick={() => setShowDesc(!showDesc)}
              >
                Thông tin sản phẩm
                <span className="text-sm">
                  {showDesc ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faMinus} />
                  )}
                </span>
              </div>
              {showDesc && (
                <div
                  className="mt-4 customDescription"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                ></div>
              )}
            </div>
            <div className="pt-4 border-t-2 border-[#cccccc]">
              <div
                className="uppercase font-medium cursor-pointer flex justify-between"
                onClick={() => setShowService(!showService)}
              >
                Dịch vụ giao hàng
                <span className="text-sm">
                  {showService ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faMinus} />
                  )}
                </span>
              </div>
              {showService && (
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex align-items-center gap-3">
                    <div>
                      <img
                        src="//theme.hstatic.net/200000263355/1001161916/14/product_deliverly_1_ico.png?v=134"
                        alt=""
                      />
                    </div>
                    <div>
                      <span>Miễn phí đổi hàng</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex align-items-center gap-3">
                      <div>
                        <img
                          src="//theme.hstatic.net/200000263355/1001161916/14/product_deliverly_2_ico.png?v=134"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <span>Giao hàng trong ngày:</span>
                        <span className="font-medium">
                          Đối với đơn nội thành HCM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex align-items-center gap-3">
                      <div className="flex flex-col">
                        <img
                          src="//theme.hstatic.net/200000263355/1001161916/14/product_deliverly_3_ico.png?v=134"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>Đặt hàng trực tuyến</span>
                        <span className="font-medium">
                          Hotline: 0988.004.089
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <Suggest product={product} />
      </div>
      <div>
        <Rating productId={id} />
        <Comment productId={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
