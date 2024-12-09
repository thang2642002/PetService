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
import Rating from "../Rating/Rating";
import Comment from "../Comment/Comment";

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
        toast.error("Không thể tạo giỏ hàng. Vui lòng thử lại!");
        return;
      }
      const cartId = addCartResponse?.data?.cart_id;
      const addCartItemResponse = await createCartItem(
        cartId,
        id,
        quantity,
        product?.price * quantity
      );
      if (addCartItemResponse?.errCode === 0) {
        const cartDetails = await getByCartId(user.data.user_id);
        if (cartDetails?.errCode === 0) {
          const totalAmount = cartDetails.data.cartItems.reduce(
            (total, item) => {
              return total + item.total_price;
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
              total_price: product?.price * quantity,
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

            <h3 className="text-danger mb-3">{product?.price} VND</h3>
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
                <p className="mt-4">
                  Sữa tắm Olive cho chó mèo là sản phẩm bổ sung tinh dầu olive_
                  chuyên dưỡng lông , chăm sóc toàn diện da và lông của thú
                  cưng, mang đến cho pet của bạn bộ lông và làm da khỏe đẹp. 1.
                  Sữa tắm Olive cho lông trắng: Sản phẩm chuyên biệt cho chó –
                  mèo có lông màu trắng. Giúp loại bỏ các vết ố vàng, xỉn màu
                  trên bộ lông của vật nuôi, trả lại một bộ lông trắng muốt, óng
                  ả cho chúng. 2. Sữa tắm Olive cho lông nâu đỏ: Dành riêng cho
                  các giống vật nuôi có lông màu nâu – đỏ, giúp lông không bị
                  bạc màu, màu lông nâu – đỏ đặc trưng sẽ trở nên đậm hơn, óng ả
                  và đều màu . 3. Sữa tắm Olive Dưỡng lông: là sản phẩm dưỡng
                  lông tối ưu, bổ sung các tinh chất dưỡng giúp thẩm thấu sâu
                  vào bề mặt da & lông, mang đến cho vật nuôi một bộ lông sáng
                  óng, mềm mượt. 4. Sữa tắm Olive T.rị ve rận:Sản phẩm có bổ
                  sung tinh chất diệt khuẩn, giúp đánh bay các loại ve rận, bọ
                  chét, ký sinh trùng bám trên da của vật nuôi, giúp chúng luôn
                  khỏe mạnh, thoải mái. Quy cách: Chai 450ml
                </p>
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
