import "./Login.scss";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="signin-container">
        <div className="content-signin">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signin">Đăng nhập bằng email</div>
                <span className="description-signin">
                  Nhập emai và mật khẩu tài khoản BookStore
                </span>
                <form>
                  <div className="form-label mt-2">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2 position-relative">
                    <label htmlFor="exampleInputPassword1" className="d-block">
                      Password
                    </label>
                    <input
                      type={isShowPassword ? "text" : "password"}
                      id="exampleInputPassword1"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="position-absolute top-[50%] translate-middle-y"
                      style={{ right: "10px", cursor: "pointer", top: "42px" }}
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary col-12 mt-4">
                    Submit
                  </button>
                </form>
                <div className="info-account">
                  <div className="forget-password">Quên mật khẩu?</div>
                  <div>
                    Chưa có tài khoản
                    <span className="create-account">Tạo tài khoản</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="sidebar-signin">
                <div className="img-signin h-full ">
                  <img src={background} alt="background" />
                </div>
                <div className="title-introduce">Mua sắm tại Tiki</div>
                <span className="desc-month">Siêu ưu đãi mỗi ngày</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Login;
