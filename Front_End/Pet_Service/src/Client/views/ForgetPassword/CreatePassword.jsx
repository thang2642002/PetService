import { useEffect, useState } from "react";
import background from "../../../assets/img/background.png";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { getToken, updatePassword } from "../../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

const CreatePassword = () => {
  const navigation = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
  };

  const fetchToken = async () => {
    const checkToken = await getToken(token);
    if (checkToken && checkToken.errCode === 0) {
      toast.success("Bạn có thể đổi mật khẩu");
    } else {
      toast.error("token đã hết hạn");
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
                  <div className="form-label mt-2">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      Nhập password
                    </label>
                    <input
                      type="password"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-label mt-2">
                    <label htmlFor="exampleInputEmail1" className="d-block">
                      Nhập lại password
                    </label>
                    <input
                      type="password"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
