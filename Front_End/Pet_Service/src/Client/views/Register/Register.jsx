import "./Register.scss";
import { Row, Col } from "react-bootstrap";
import background from "../../../assets/img/background.png";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/userServices";
import { Helmet } from "react-helmet";
const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [defaultvalid, setDefauValid] = useState({
    isValidEmail: true,
    isValidConfirmPassword: true,
  });
  const [objCheckValid, setObjCheckValid] = useState(defaultvalid);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
  };

  const checkInputRegister = () => {
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = emailRegex.test(email);
    setObjCheckValid(defaultvalid);

    if (
      !email ||
      !userName ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Chưa nhập đầy đủ thông tin");
      return false;
    } else if (!valid) {
      toast.error("Định dạng email chưa chính xác");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidEmail: false,
      }));
      return false;
    } else if (confirmPassword !== password) {
      toast.error("Xác nhận mật khẩu và mật khẩu không trùng nhau");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidConfirmPassword: false,
      }));
      return false;
    } else {
      return true;
    }
  };

  const handRegister = async () => {
    if (checkInputRegister()) {
      let dataUser = await registerUser(
        email,
        userName,
        phone,
        address,
        password
      );
      if (dataUser.errCode === 0) {
        toast.success("Tạo tài khoản thành công");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error("Tạo tài khoản không thành công");
        setTimeout(() => {
          toast.warning("Vui lòng tạo lại tài khoản");
        }, 2000);
      }
    }
  };

  const handleLoginAccount = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="signup-container">
        <Helmet>
          <title>Trang đăng ký</title>
        </Helmet>
        <div className="content-signup">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signup">Xin Chào</div>
                <span className="description-signup">
                  Đăng ký tài khoản Mozzi
                </span>
                <form onClick={(e) => handleClick(e)}>
                  <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      id="exampleInputEmail1"
                      className={
                        objCheckValid.isValidEmail
                          ? "form-control mt-2"
                          : "form-control mt-2 is-invalid"
                      }
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
                      id="exampleInputUserName"
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
                      className={
                        objCheckValid.isValidConfirmPassword
                          ? "form-control mt-2"
                          : "form-control mt-2 is-invalid"
                      }
                      placeholder="Xác nhận mật khẩu"
                      value={confirmPassword}
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

                  <button
                    type="submit"
                    className="btn btn-primary col-12 mt-4"
                    onClick={() => handRegister()}
                  >
                    Đăng ký
                  </button>
                </form>
                <div className="info-account">
                  <div>
                    Trở về
                    <span
                      className="create-account"
                      onClick={() => handleLoginAccount()}
                    >
                      Đăng nhập
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="sidebar-signup">
                <div className="img-signup">
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

export default Register;
