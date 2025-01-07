import React from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./Pet_Details.jsx.scss";
import Suggest from "../Suggest/Suggest";
import { getPetById } from "../../../services/petServices";
import Rating from "../ReviewPet/Rating/Rating";
import Comment from "../ReviewPet/Comment/Comment";
import {
  createCart,
  getByCartId,
  updateCart,
} from "../../../services/cartService";
import { createCartItem } from "../../../services/cartItemServices";
import { Helmet } from "react-helmet";

const Pet_Details = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [selectedImage, setSelectedImage] = useState([]);
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

  console.log("pet", pet);

  const handleThumbnailClick = (index) => {
    const selectedImageURL = pet?.images[index];
    setSelectedImage(selectedImageURL);
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
        pet?.price * quantity
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
            toast.success("Sản phẩm đã được thêm vào giỏ hàng thành công");
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
    fetchPetById();
  }, [id]);

  const sliderRef = React.useRef();
  return (
    <div>
      <div className="container mx-auto p-4">
        <Helmet>
          <title>Chi tiết thú cưng</title>
        </Helmet>
        <Row className="gy-4">
          <Col md={6} className="d-flex flex-column flex-md-row gap-3">
            <div className="d-flex flex-column gap-3">
              {pet?.images?.map((image, index) => (
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
                {pet?.images?.map((image, index) => (
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
                <p className="pr-5 border-solid border-r-2 border-[#cccccc] customPetId">
                  Mã sản phẩm: {pet?.pet_id}
                </p>
                <p className="ml-5">
                  Giống loài: <strong>{pet?.breed}</strong>
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  Giống: <strong>{pet?.sex}</strong>
                </p>
                <p>
                  Tuổi: <strong>{pet?.age} tuổi</strong>
                </p>
                <p>
                  Màu lông: <strong>{pet?.coat_color}</strong>
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  Chiều cao: <strong>{pet?.height} cm</strong>
                </p>
                <p>
                  Cân nặng: <strong>{pet?.weight} kg</strong>
                </p>
                <p>
                  Phòng vecxin:{" "}
                  <strong>
                    {pet.available === true
                      ? "Đã tiêm vecxin"
                      : "Chưa tiêm vecxin"}
                  </strong>
                </p>
              </div>
              <h3 className="text-danger mb-3">
                {pet?.price?.toLocaleString()} đ
              </h3>
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
                  <div
                    className="mt-4 customDescription"
                    dangerouslySetInnerHTML={{ __html: pet?.description }}
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
          <Suggest pet={pet} />
        </div>
        <div>
          <Rating petId={id} />
          <Comment petId={id} />
        </div>
      </div>
    </div>
  );
};

export default Pet_Details;
