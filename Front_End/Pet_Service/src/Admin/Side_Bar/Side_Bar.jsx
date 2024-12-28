import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/img/bg2.jpg";
import { Link } from "react-router-dom";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import "./Side_Bar.scss";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {/* <DiReact size={"3em"} color={"00bfff"} /> */}
            <div className="w-[40px] h-[40px]">
              <img
                src="https://theme.hstatic.net/200000263355/1001161916/14/logo.png?v=134"
                alt="logo"
                className="w-full h-full object-contain bg-transparent"
              />
            </div>
            <span>Mozzi</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <Link to="/admin" />
              Quản Lý
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Chức năng">
              <MenuItem>
                <Link to="/admin/managerUsers" />
                Quản lý người dùng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerCategory" />
                Quản lý thể loại sản phẩm
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPetType" />
                Quản lý thể loại thú cưng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerProduct" />
                Quản lý sản phẩm
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPets" />
                Quản lý thú cưng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerService" />
                Quản lý dịch vụ
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerAppointment" />
                Quản lý đặt lịch
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerCarts" />
                Quản lý giỏ hàng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerOrder" />
                Quản lý đơn hàng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerOrderItem" />
                Quản lý chi tiết đơn hàng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPetScores" />
                Manager Pet Scores
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerUserPet" />
                Quản lý thú cưng của người dùng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerProductReview" />
                Quản lý đánh giá sản phẩm
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPetReview" />
                Quản lý đánh giá thú cưng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerServiceReview" />
                Manager Service Review
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPost" />
                Quản lý bài đăng
              </MenuItem>
              <MenuItem>
                <Link to="/admin/statistical" />
                Thống kê
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/thang2642002"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Trần Quang Thắng
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
