import React from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import "./Pet_Details.jsx.scss";
import Suggest from "../Suggest/Suggest";
import { getPetById } from "../../../services/petServices";
import Rating from "../Rating/Rating";
import Comment from "../Comment/Comment";
import { useSelector } from "react-redux";
import {
  createCart,
  getByCartId,
  updateCart,
} from "../../../services/cartService";
import { createCartItem } from "../../../services/cartItemServices";

const Pet_Details = () => {
  const images = [
    "https://product.hstatic.net/200000263355/product/z5625317223514_c94f473e834069458b8276b952ca4616_546454172a204e45a34c4c8f1ce843b0_master.jpg",
    "https://product.hstatic.net/200000263355/product/3cb799e827474155b6d60d67cc1f1307_cf910be7efd14cd595518002e146c5b6_master.jpeg",
    "https://product.hstatic.net/200000263355/product/3f1264f10ec54345b4716da32e188329_fb8ad6fe4452408e98f53c151b7ee4a0_master.jpeg",
    "https://product.hstatic.net/200000263355/product/3cb799e827474155b6d60d67cc1f1307_cf910be7efd14cd595518002e146c5b6_master.jpeg",
    "https://product.hstatic.net/200000263355/product/z5625317223514_c94f473e834069458b8276b952ca4616_546454172a204e45a34c4c8f1ce843b0_master.jpg",
  ];

  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showDesc, setShowDesc] = useState(false);
  const [showService, setShowService] = useState(false);
  const { user } = useSelector((state) => state.user);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: false,
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(images[index]);
    sliderRef.current.slickGoTo(index);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const fetchPetById = async () => {
    const dataProduct = await getPetById(id);
    setPet(dataProduct.data);
  };

  const handleAddCart = async () => {
    try {
      if (!user) {
        alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return;
      }
      const addCartResponse = await createCart(user?.data?.user_id, 0);
      if (addCartResponse?.errCode !== 0) {
        alert("Không thể tạo giỏ hàng. Vui lòng thử lại!");
        return;
      }
      const cartId = addCartResponse?.data?.cart_id;
      const addCartItemResponse = await createCartItem(
        cartId,
        id,
        quantity,
        pet?.price * quantity
      );
      if (addCartItemResponse?.errCode === 0) {
        const cartDetails = await getByCartId(cartId);
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
          console.log("updateCartResponse", updateCartResponse);
          if (updateCartResponse?.errCode === 0) {
            alert(
              "Sản phẩm đã được thêm vào giỏ hàng thành công và tổng số tiền đã được cập nhật!"
            );
          } else {
            alert(
              "Sản phẩm đã thêm vào giỏ hàng nhưng không thể cập nhật tổng số tiền!"
            );
          }
        }
      } else {
        alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    fetchPetById();
  }, [id]);

  const sliderRef = React.useRef();
  return (
    <div>
      <div className="container mx-auto p-4">
        <Row className="gy-4">
          <Col md={6} className="d-flex flex-column flex-md-row gap-3">
            <div className="d-flex flex-column gap-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-100 h-20 object-cover cursor-pointer border ${
                    selectedImage === image
                      ? "border-danger"
                      : "border-secondary"
                  } hover:border-danger rounded`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>

            <div className="flex-grow ms-3 max-w-[500px] max-h-[800px] overflow-hidden flex-shrink-0">
              <Slider ref={sliderRef} {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index}>
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
              <h1 className="text-2xl font-bold mb-4">{pet?.name}</h1>
              <div className="flex">
                <p className="pr-5 border-solid border-r-2 border-[#cccccc] ">
                  Mã sản phẩm: 8936204290164
                </p>
                <p className="ml-5">Thương hiệu: Royal Canin</p>
              </div>

              <h3 className="text-danger mb-3">{pet?.price} VND</h3>
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
                <button
                  style={{ flex: 2 }}
                  className="custom-btn"
                  onClick={handleAddCart}
                >
                  <span className="title-btn">Thêm vào giỏ hàng</span>
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
                    Sữa tắm Olive cho chó mèo là sản phẩm bổ sung tinh dầu
                    olive_ chuyên dưỡng lông , chăm sóc toàn diện da và lông của
                    thú cưng, mang đến cho pet của bạn bộ lông và làm da khỏe
                    đẹp. 1. Sữa tắm Olive cho lông trắng: Sản phẩm chuyên biệt
                    cho chó – mèo có lông màu trắng. Giúp loại bỏ các vết ố
                    vàng, xỉn màu trên bộ lông của vật nuôi, trả lại một bộ lông
                    trắng muốt, óng ả cho chúng. 2. Sữa tắm Olive cho lông nâu
                    đỏ: Dành riêng cho các giống vật nuôi có lông màu nâu – đỏ,
                    giúp lông không bị bạc màu, màu lông nâu – đỏ đặc trưng sẽ
                    trở nên đậm hơn, óng ả và đều màu . 3. Sữa tắm Olive Dưỡng
                    lông: là sản phẩm dưỡng lông tối ưu, bổ sung các tinh chất
                    dưỡng giúp thẩm thấu sâu vào bề mặt da & lông, mang đến cho
                    vật nuôi một bộ lông sáng óng, mềm mượt. 4. Sữa tắm Olive
                    T.rị ve rận:Sản phẩm có bổ sung tinh chất diệt khuẩn, giúp
                    đánh bay các loại ve rận, bọ chét, ký sinh trùng bám trên da
                    của vật nuôi, giúp chúng luôn khỏe mạnh, thoải mái. Quy
                    cách: Chai 450ml
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
          <Suggest pet={pet} />
        </div>
        <div>
          <Rating productId={id} />
          <Comment productId={id} />
        </div>
      </div>
    </div>
  );
};

export default Pet_Details;
