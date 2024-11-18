import Slider from "react-slick";
const Slice = () => {
  const settings = {
    dots: true,
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
      <div className="mt-6">
        <Slider {...settings}>
          <div>
            <img
              src="https://theme.hstatic.net/200000263355/1001161916/14/slide_2_img.jpg?v=134"
              alt="Slide 1"
              className="h-[475px] w-full"
            />
          </div>
          <div>
            <img
              src="https://theme.hstatic.net/200000263355/1001161916/14/slide_4_img.jpg?v=134"
              alt="Slide 2"
              className="h-[475px] w-full"
            />
          </div>
          <div>
            <img
              src="https://theme.hstatic.net/200000263355/1001161916/14/slide_1_img.jpg?v=134"
              alt="Slide 3"
              className="h-[475px] w-full"
            />
          </div>
          <div>
            <img
              src="https://theme.hstatic.net/200000263355/1001161916/14/slide_3_img.jpg?v=134"
              alt="Slide 4"
              className="h-[475px] w-full"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Slice;
