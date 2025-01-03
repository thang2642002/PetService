import React, { useState } from "react";
import Group_Menu from "../../components/Group_Menu";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { createContact } from "../../../services/contactServices";

const Contact = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkEmail = () => {
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (checkEmail()) {
      const data = await createContact(userName, email, phone, content);
      if (data && data.errCode === 0) {
        toast.success("Quý khách đã gửi thành công");
        setUserName("");
        setEmail("");
        setPhone("");
        setContent("");
      }
    } else {
      toast.error("Quý khách đã nhập sai định dạng email");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Liên hệ</title>
      </Helmet>
      <Group_Menu />
      <div className="mt-4">
        <div style={{ width: "100%", height: "450px" }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.560215766145!2d106.78983976291934!3d10.844928789308085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527158a0a5b81%3A0xf45c5d34ac580517!2zUGjDom4gaGnhu4d1IFRyxrDhu51uZyDEkOG6oWkgaOG7jWMgR1RWVCB04bqhaSBUcC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1sen!2s!4v1733647802640!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
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
                    450-451 Lê Văn Việt, Phường Tăng Nhơn Phú A, Hồ Chí Minh,
                    Vietnam
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
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Input
                      placeholder="Email của bạn"
                      className="w-full h-[45px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Input
                      placeholder="Số điện thoại của bạn"
                      className="w-full h-[45px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} className="mt-4">
                    <textarea
                      placeholder="Nội dung"
                      className="w-full h-[100px] p-3 border border-[#ddd] rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Col>
                </Row>
                <div
                  className="w-[200px] py-2 bg-[#6b4433] text-white uppercase text-center cursor-pointer"
                  onClick={handleSubmit}
                >
                  Gửi cho chúng tôi
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
