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
            <span>BookStore</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <Link to="/admin/dashboard" />
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
                <Link to="/admin/managerGenres" />
                Manager Genres
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerBooks" />
                Manager Books
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerAuthors" />
                Manager Author
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerPubliers" />
                Manager Publiers
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerReviews" />
                Manager Review
              </MenuItem>
              <MenuItem>
                <Link to="/admin/managerOrder" />
                Manager Order
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
