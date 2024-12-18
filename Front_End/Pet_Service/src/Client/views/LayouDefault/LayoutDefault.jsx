import Header from "../../components/Header";
import Footer from "../../components/footer";
import Small_Slice from "../../components/Small_Slice";
import { Outlet } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";
import { useState } from "react";
import { Button } from "antd";
import { MessageOutlined, MinusOutlined } from "@ant-design/icons";
import "./LayouDefault.scss";

const LayoutDefault = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="container">
        <Small_Slice />
        <Header />
        <Outlet />
        <Footer />
        {/* Button to toggle chat visibility */}
        <div
          className={`fixed bottom-10 right-10 ${
            isChatOpen ? "hidden" : "block"
          }`}
        >
          <Button
            shape="circle"
            icon={<MessageOutlined style={{ fontSize: "28px" }} />}
            size="large"
            onClick={toggleChat}
            className="bg-blue-500 text-white transition-colors duration-300"
            classNames="btn-icon-chat"
          />
        </div>
        {/* ChatBox visible when isChatOpen is true */}
        {isChatOpen && (
          <div className="fixed bottom-10 right-10 z-50">
            <ChatBox />
            <Button
              shape="circle"
              icon={<MinusOutlined />}
              size="large"
              onClick={toggleChat}
              className="bg-transparent text-red-500 hover:text-red-700 text-xl absolute top-0 right-0 transition-colors duration-300 border-none rounded-none"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LayoutDefault;
