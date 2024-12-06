import React from "react";
import Group_Menu from "../../components/Group_Menu";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";

const Contact = () => {
  return (
    <div>
      <Group_Menu />
      <div></div>
      <div>
        <Row>
          <Col xs={5}>
            <div className="text-[#522f1f] text-[25px] font-semibold py-8">
              Thông tin liên hệ
            </div>
            <div className="text-[15px] flex flex-col gap-4">
              <div className="flex items-center">
                <div className="p-[12px] border border-[#ddd] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="ml-4">
                  <div className="font-bold">Địa chỉ</div>
                  <div>
                    <span className="text-[#696969] font-medium">Địa chỉ:</span>{" "}
                    136 Huỳnh Văn Bánh, p. 11, quận Phú Nhuận, HCM
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-[12px] border border-[#ddd] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="ml-4">
                  <div className="font-bold">Email</div>
                  <div>
                    <span className="text-[#696969] font-medium">Email:</span>{" "}
                    info@mozzi.vn
                  </div>
                </div>
              </div>
              <div className="flex items-center ">
                <div className="p-[12px] border border-[#ddd] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="ml-4">
                  <div className="font-bold">Điện thoại</div>
                  <div>
                    <span className="text-[#696969] font-medium">
                      Điện thoại:
                    </span>{" "}
                    0342925377
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-[12px] border border-[#ddd] rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="ml-4">
                  <div className="font-bold">Thời gian làm việc</div>
                  <div>
                    <span className="text-[#696969] font-medium">
                      Thời gian làm việc:
                    </span>{" "}
                    Từ 8h30-17h tất cả các ngày trong tuần
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={7}>
            <div className="text-[#522f1f] text-[25px] font-semibold py-8">
              Gửi thắc mắc cho chúng tôi
            </div>
            <div className="mb-2">
              Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng
              tôi sẽ liên lạc lại với bạn sớm nhất có thể .
            </div>
            <div>
              <form className="space-y-4">
                <Row gutter={[24, 16]}>
                  <Col xs={12} className="mb-4">
                    <Input
                      placeholder="Tên của bạn"
                      className="w-full h-[45px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Input
                      placeholder="Email của bạn"
                      className="w-full h-[45px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Input
                      placeholder="Số điện thoại của bạn"
                      className="w-full h-[45px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Col>
                  <Col xs={12} className="mt-4">
                    <textarea
                      placeholder="Nội dung"
                      className="w-full h-[100px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Col>
                </Row>
                <button className="w-[200px] py-2 bg-[#6b4433] text-white uppercase">
                  Gửi cho chúng tôi
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
