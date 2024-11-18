import "./Register.scss";
import { Row, Col } from "react-bootstrap";
import background from "../../assets/img/background.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [confỉrmPassword, setConfirmPassword] = useState("");
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="signup-container">
        <div className="content-signup">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signup">Xin Chào</div>
                <span className="description-signup">
                  Đăng ký tài khoản BookStore
                </span>
                <form>
                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      id="exampleInputEmail1" // Unique id
                      className="form-control mt-2"
                      aria-describedby="emailHelp"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputUserName">Tên người dùng</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="exampleInputUserName" // Unique id
                      placeholder="Nhập tên người dùng"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputPhone">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="exampleInputPhone"
                      placeholder="Nhập số điện thoại"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputAddress">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="exampleInputAddress"
                      placeholder="Nhập địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-2 custom-input">
                    <label htmlFor="exampleInputPassword">Mật khẩu</label>
                    <input
                      type={isShowPassword ? "text" : "password"}
                      className="form-control mt-2"
                      id="exampleInputPassword"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="eye"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                  </div>

                  <div className="form-group mt-2 custom-input">
                    <label htmlFor="exampleInputConfirmPassword">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type={isShowConfirmPassword ? "text" : "password"}
                      id="exampleInputConfirmPassword"
                      className="form-control mt-2"
                      placeholder="Xác nhận mật khẩu"
                      value={confỉrmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className="eye"
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    >
                      {isShowConfirmPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary col-12 mt-4">
                    Đăng ký
                  </button>
                </form>
                <div className="info-account">
                  <div>
                    Trở về
                    <span className="create-account">Đăng nhập</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="sidebar-signup">
                <div className="img-signup">
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

export default Register;
