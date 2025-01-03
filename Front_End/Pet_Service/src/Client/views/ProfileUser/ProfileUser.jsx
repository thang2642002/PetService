import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfileUser from "./UpdateProfileUser";
import { Helmet } from "react-helmet";

const ProfileUser = () => {
  const user = useSelector((state) => state.user);
  const dataUser = user.user.data;
  const [show, setShow] = useState(false);
  const userUpdate = dataUser;

  return (
    <div>
      <>
        <Helmet>
          <title>Thông tin</title>
        </Helmet>
        <div className="content-info-user flex justify-center gap-[400px]">
          <div className="content-left">
            <div className="title_info py-2">Thông tin cá nhân</div>
            <div className="info flex gap-10">
              <div className="avatar mt-3">
                <img
                  src={dataUser?.avatar}
                  alt="avatar"
                  className="w-[100px] h-[100px] rounded-full "
                />
              </div>
              <div>
                <div className="username py-2">
                  Họ tên: <span className="ml-2">{dataUser?.user_name}</span>
                </div>
                <div className="nickname py-2">
                  Nick name: <span className="ml-2">{dataUser?.user_name}</span>
                </div>
                <div className="address py-2">
                  Address: <span className="ml-2">{dataUser?.address}</span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-3 ml-[140px]"
              onClick={() => setShow(true)}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
          <div className="content-right mt-4">
            <div className="info-more">
              <div className="phone-email py-2">Số điện thoại và Email</div>
              <div className="username py-2">
                Số điện thoại: <span className="ml-2">{dataUser?.phone}</span>
              </div>
              <div className="username py-2">
                Địa chỉ Email: <span className="ml-2">{dataUser?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <UpdateProfileUser
          show={show}
          setShow={setShow}
          userUpdate={userUpdate}
        />
      </>
    </div>
  );
};

export default ProfileUser;
