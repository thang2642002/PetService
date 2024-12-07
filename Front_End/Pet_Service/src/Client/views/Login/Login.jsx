import "./Login.scss";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { loginUser, getUserById } from "../../../services/userServices";
import { login } from "../../../redux/Slices/userSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultvalid, setDefauValid] = useState({
    isValidEmail: true,
    isValidPassword: true,
  });
  const [objCheckValid, setObjCheckValid] = useState(defaultvalid);

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const checkInputLogin = () => {
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = emailRegex.test(email);
    if (!email) {
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidEmail: false,
      }));
      toast.error("Chưa nhập email");
    } else if (!password) {
      toast.error("Chưa nhập password ");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidPassword: false,
      }));
    } else if (!valid) {
      toast.error("Định dạng email chưa đúng");
      setObjCheckValid((prevState) => ({
        ...prevState,
        isValidEmail: false,
      }));
    } else {
      return true;
    }
  };

  const handleLogin = async () => {
    try {
      if (checkInputLogin()) {
        let userLogin = await loginUser(email, password);
        if (userLogin.data) {
          toast.success("Đăng nhập thành công");
          dispatch(login(userLogin));
          localStorage.setItem(
            "access_tokens",
            JSON.stringify(userLogin.access_tokens)
          );
          if (userLogin?.access_tokens) {
            const decoded = jwtDecode(userLogin?.access_tokens);
            getUserById(decoded?.id);
          }
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setTimeout(() => {
            toast.error("Tài khoản hoặc mật khẩu không chính xác");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="content-signin">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signin">Đăng nhập bằng email</div>
                <span className="description-signin">
                  Nhập emai và mật khẩu tài khoản Mozzi
                </span>
                <form onClick={(e) => handleClick(e)}>
                  <div className="form-label mt-2">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={
                        objCheckValid.isValidEmail
                          ? "form-control mt-2"
                          : "form-control mt-2 is-invalid"
                      }
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
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
                      className={
                        objCheckValid.isValidPassword
                          ? "form-control mt-2"
                          : "form-control mt-2 is-invalid"
                      }
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="position-absolute top-[50%] translate-middle-y"
                      style={{ right: "10px", cursor: "pointer", top: "50px" }}
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary col-12 mt-4"
                    onClick={() => handleLogin()}
                  >
                    Đăng nhập
                  </button>
                </form>
                <div className="info-account">
                  <div className="forget-password">Quên mật khẩu?</div>
                  <div>
                    Chưa có tài khoản
                    <span
                      className="create-account"
                      onClick={handleCreateAccount}
                    >
                      Tạo tài khoản
                    </span>
                  </div>
                </div>
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

export default Login;
