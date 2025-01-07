import { useState } from "react";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { forgetPassword } from "../../../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleForgetPassword = async () => {
    const checkEmail = await forgetPassword(email);
    if (checkEmail && checkEmail.errCode === 0) {
      toast.success(checkEmail.message);
    } else {
      toast.success(checkEmail.message);
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
                  <div className="form-label mt-2">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      Nhập Email
                    </label>
                    <input
                      type="email"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
