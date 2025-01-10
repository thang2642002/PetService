import { useEffect, useState } from "react";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { getToken, updatePassword } from "../../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

const CreatePassword = () => {
  const navigation = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
  };

  const fetchToken = async () => {
    const checkToken = await getToken(token);
    if (checkToken && checkToken.errCode === 0) {
      toast.success("Bạn có thể đổi mật khẩu");
    } else {
      toast.error("Thời gian thay đổi mật khẩu đã hết hạn");
      setTimeout(() => {
        navigation("/login");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const handleCreatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp");
    } else {
      const updatePass = await updatePassword(password, token);
      if (updatePass && updatePass.errCode === 0) {
        toast.success("Bạn đã thay đổi mật khẩu thanh công");
      }
    }
  };
  return (
    <>
      <div className="signin-container">
        <Helmet>
          <title>Đổi lại mật khẩu</title>
        </Helmet>
        <div className="content-signin">
          <Row>
            <Col lg={7}>
              <div className="sign-control">
                <div className="title-signin">Đổi lại mật khẩu</div>
                <span className="description-signin">
                  Nhập emai để lấy lại mật khẩu
                </span>
                <form onClick={(e) => handleClick(e)}>
                  <div className="form-label mb-4 relative mt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      * Vui lòng nhập mật khẩu
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                    />
                    <span
                      className="absolute top-10 right-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                    </span>
                  </div>

                  <div className="form-label mb-4 relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      * Vui lòng nhập lại mật khẩu
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                    />
                    <span
                      className="absolute top-10 right-3 cursor-pointer text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary col-12 mt-4"
                    onClick={handleCreatePassword}
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

export default CreatePassword;
