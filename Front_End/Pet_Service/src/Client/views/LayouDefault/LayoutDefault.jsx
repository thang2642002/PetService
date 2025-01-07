import Header from "../../components/Header";
import Footer from "../../components/footer";
import Small_Slice from "../../components/Small_Slice";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LayouDefault.scss";

const LayoutDefault = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="container">
        <Small_Slice />
        <Header />
        <Outlet />
        <div>
          <df-messenger
            intent="WELCOME"
            chat-title="Shop"
            agent-id="3f37525c-df7a-42a3-848d-8c19dd66d233"
            language-code="en"
          ></df-messenger>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutDefault;
