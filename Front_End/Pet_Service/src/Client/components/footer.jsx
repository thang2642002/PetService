import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const footer = () => {
  return (
    <>
      <div className="mt-10 pt-10 border-t-2 border-t-[#e7e7e7]">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div>
              <div className="text-lg  py-5">
                <b>Thông tin liên hệ</b>
              </div>
              <p className="text-sm">
                <b>Mozzi.vn </b>là trang mua sắm trực tuyến các sản phẩm bán lẻ
                dành cho thú cưng của <b>Mozzi Pet Shop. Công ty TNHH MOZZI</b>.
                Giấy chứng nhận Đăng ký Kinh doanh số 0315592769 do Sở Kế hoạch
                và Đầu tư Thành phố Hồ Chí Minh cấp ngày 28/03/2019.
              </p>
              <div className="mt-4">
                <img
                  src="https://theme.hstatic.net/200000263355/1001161916/14/footer_logobct_img.png?v=134"
                  alt=""
                />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className="text-lg  py-5">
              <b>Thông tin cửa hàng</b>
            </div>
            <div>
              <p>
                <b>Địa chỉ</b>: 136 Huỳnh Văn Bánh, p. 11, quận Phú Nhuận, HCM
              </p>
              <b className="mt-5">0988.004.089</b>
              <br />
              <b className="mt-5">info@mozzi.vn</b>
            </div>
          </Col>
          <Col span={6}>
            <div className="text-lg  py-5">
              <b>Thông tin cửa hàng</b>
            </div>
            <div>
              <ul>
                <li>Tìm kiếm</li>
                <li>Giới thiệu</li>
                <li>Chính sách bảo mật</li>
                <li>Chính sách thanh toán</li>
                <li>Chính sách giao hàng</li>
                <li>Chính sách đổi trả</li>
                <li>Hướng dẫn mua hàng</li>
                <li>Điều khoản dịch vụ</li>
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <div className="text-lg  py-5">
              <b>Chăm sóc khách hàng</b>
              <div className="mt-5 flex align-items-center">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 473.806 473.806"
                    style={{ enableBackground: "new 0 0 473.806 473.806" }}
                    width="30px"
                    height="30px"
                    stroke="#252a2b"
                  >
                    <g>
                      <g>
                        <path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806 C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20 c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6 c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1 c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3 c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5 c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8 c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9 l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1 C420.456,377.706,420.456,388.206,410.256,398.806z"></path>
                        <path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2 c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11 S248.656,111.506,256.056,112.706z"></path>
                        <path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11 c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2 c0.8,0,1.5-0.1,2.3-0.2C469.456,222.206,474.456,215.306,473.256,209.006z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="font-bold text-[#6b4433] text-xl">
                    0988.004.089
                  </p>
                  <p className="mt-2 text-[#252a2b] font-medium underline">
                    info@mozzi.vn
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-medium text-[#522f1f]">Follow Us</h4>
                <div className="flex gap-4 mt-4 ">
                  <div className="px-[20px] py-[10px] border-2 border-solid rounded-lg border-[#e7e7e7] hover:bg-[#522f1f] hover:text-white transition duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
                  </div>
                  <div className="px-[20px] py-[10px] border-2 border-solid rounded-lg border-[#e7e7e7] hover:bg-[#522f1f] hover:text-white transition duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                  </div>
                  <div className="px-[20px] py-[10px] border-2 border-solid rounded-lg border-[#e7e7e7] hover:bg-[#522f1f] hover:text-white transition duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faTiktok} className="text-lg" />
                  </div>
                  <div className="px-[20px] py-[10px] border-2 border-solid rounded-lg border-[#e7e7e7] hover:bg-[#522f1f] hover:text-white transition duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faBagShopping} className="text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default footer;
