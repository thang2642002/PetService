import React from "react";
import Group_Menu from "../../components/Group_Menu";
import { Col, Row } from "antd";

const ListPost = () => {
  return (
    <>
      <Group_Menu />
      <div>
        <div className="text-[28px] text-[#522f1f] font-bold py-3 ">
          Tin tức
        </div>
        <div>
          <Row gutter={[16, 16]} wrap>
            <Col span={18}>
              <div className="flex mt-4 pb-4 border-b-2">
                <div>
                  <img
                    src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                    alt="hình ảnh"
                    className="w-full h-auto max-w-[255px] max-h-[145px]"
                  />
                </div>
                <div className="ml-5 px-3">
                  <div className="flex flex-col justify-center">
                    <div className="text-[20px] font-medium text-[#522f1f] mb-2 ">
                      Những điều cần biết khi khắc thông tin lên bảng tên chó
                      mèo
                    </div>
                    <div className="text-[16px] break-words">
                      Bảng tên chó mèo không chỉ là một phụ kiện thời trang mà
                      còn là một giải pháp thiết thực để bảo vệ thú cưng....
                    </div>
                    <div className="text-[14px] mt-2">01 Tháng 12, 2024</div>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 pb-4 border-b-2">
                <div>
                  <img
                    src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                    alt="hình ảnh"
                    className="w-full h-auto max-w-[255px] max-h-[145px]"
                  />
                </div>
                <div className="ml-5 px-3">
                  <div className="flex flex-col justify-center">
                    <div className="text-[20px] font-medium text-[#522f1f] mb-2 ">
                      Những điều cần biết khi khắc thông tin lên bảng tên chó
                      mèo
                    </div>
                    <div className="text-[16px] break-words">
                      Bảng tên chó mèo không chỉ là một phụ kiện thời trang mà
                      còn là một giải pháp thiết thực để bảo vệ thú cưng....
                    </div>
                    <div className="text-[14px] mt-2">01 Tháng 12, 2024</div>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 pb-4 border-b-2">
                <div>
                  <img
                    src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                    alt="hình ảnh"
                    className="w-full h-auto max-w-[255px] max-h-[145px]"
                  />
                </div>
                <div className="ml-5 px-3">
                  <div className="flex flex-col justify-center">
                    <div className="text-[20px] font-medium text-[#522f1f] mb-2 ">
                      Những điều cần biết khi khắc thông tin lên bảng tên chó
                      mèo
                    </div>
                    <div className="text-[16px] break-words">
                      Bảng tên chó mèo không chỉ là một phụ kiện thời trang mà
                      còn là một giải pháp thiết thực để bảo vệ thú cưng....
                    </div>
                    <div className="text-[14px] mt-2">01 Tháng 12, 2024</div>
                  </div>
                </div>
              </div>
            </Col>
            {/* Sidebar hoặc nội dung phụ */}
            <Col span={6}>
              <div>
                <div className="text-[20px] text-[#522f1f] font-medium mb-3">
                  Bài viết mới nhất
                </div>
                <div className="flex mt-3  border-t-2 pt-3">
                  <div>
                    <img
                      src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                      alt="hình ảnh"
                      className="w-full h-auto max-w-[100px] max-h-[80px]"
                    />
                  </div>
                  <div>
                    <div className="pl-2">
                      Những điều cần biết khi khắc thông tin lên ...
                    </div>
                  </div>
                </div>
                <div className="flex mt-3  border-t-2 pt-3">
                  <div>
                    <img
                      src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                      alt="hình ảnh"
                      className="w-full h-auto max-w-[100px] max-h-[80px]"
                    />
                  </div>
                  <div>
                    <div className="pl-2">
                      Những điều cần biết khi khắc thông tin lên ...
                    </div>
                  </div>
                </div>
                <div className="flex mt-3 border-t-2 pt-3">
                  <div>
                    <img
                      src="https://file.hstatic.net/200000263355/article/bang_ten_cho_meo-3_1caac8d380aa4f4e83d515ff6bc477a6_large.png"
                      alt="hình ảnh"
                      className="w-full h-auto max-w-[100px] max-h-[80px]"
                    />
                  </div>
                  <div>
                    <div className="pl-2">
                      Những điều cần biết khi khắc thông tin lên ...
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[20px] text-[#522f1f] font-medium mb-3 mt-[100px]">
                  Dịch vụ Hot
                </div>
                <div className="mt-2 text-[16px] border-t-2 pt-2 font-medium">
                  Tắm cắt spa Chó Mèo
                </div>
                <div className="mt-2 text-[16px] border-t-2 pt-2 font-medium">
                  Dịch vụ đưa đón
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ListPost;
