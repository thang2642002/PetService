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
            <DiReact size={"3em"} color={"00bfff"} />
            <span>Mozzi</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <Link to="/admin" />
              Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                <Link to="/admin/managerUsers" />
                Manager Users
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerCategory" />
                Manager Category
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPetType" />
                Manager Pet Type
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPets" />
                Manager Pets
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerProduct" />
                Manager Product
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerService" />
                Manager Service
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerAppointment" />
                Manager Appointment
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerOrder" />
                Manager Order
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerOrderItem" />
                Manager Order Item
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPetScores" />
                Manager Pet Scores
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerUserPet" />
                Manager User Pet
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerProductReview" />
                Manager Product Review
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerServiceReview" />
                Manager Service Review
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPost" />
                Manager Post
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerCarts" />
                Manager Cart
              </MenuItem>
              <MenuItem>
                <Link to="/admin/statistical" />
                Statistical
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
