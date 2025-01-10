import { useState } from "react";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { forgetPassword } from "../../../services/userServices";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleForgetPassword = async () => {
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = emailRegex.test(email);
    if (!valid) {
      toast.error("Định dạng email chưa chính xác");
    } else {
      const checkEmail = await forgetPassword(email);
      if (checkEmail && checkEmail.errCode === 0) {
        toast.success(checkEmail.message);
      } else {
        toast.success(checkEmail.message);
      }
    }
  };
  return (
    <>
      <div className="signin-container">
        <Helmet>
          <title>Lấy lại mật khẩu</title>
        </Helmet>
        <div className="content-signin">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signin">Lấy lại mật khẩu</div>
                <span className="description-signin">
                  Nhập emai để lấy lại mật khẩu
                </span>
                <form onClick={(e) => handleClick(e)}>
                  <div className="form-label mt-4">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      * Vui lòng nhập Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary col-12 mt-4"
                    onClick={handleForgetPassword}
                  >
                    Xác nhận
                  </button>
                </form>
              </div>
            </Col>
            <Col lg={5}>
              <div className="sidebar-signin">
                <div className="img-signin h-full ">
                  <img src={background} alt="background" />
                </div>
                <div className="title-introduce">Mua sắm tại Mozzi</div>
                <span className="desc-month">Siêu ưu đãi mỗi ngày</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
