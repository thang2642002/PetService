import SideBar from "./Side_Bar/Side_Bar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Statistical from "../Client/views/Statistical/Statistical";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="admin-main">
          {/* <Statistical /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Admin;
