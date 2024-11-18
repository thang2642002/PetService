import Slider from "react-slick";
import "./Small_Slice.scss";
const Small_Slice = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };
  return (
    <>
      <div>
        <Slider {...settings}>
          <div className="small-slice">
            <p>Miễn phí đơn hàng vận chuyển 399K</p>
          </div>
          <div className="small-slice">
            <p>Giao hàng hỏa tốc 24h trong HCM</p>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Small_Slice;
