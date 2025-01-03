import React, { useEffect, useState } from "react";
import Group_Menu from "../../components/Group_Menu";
import { Col, Row } from "antd";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { getPaginate } from "../../../services/paginateServices";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../services/postServices";
import { Helmet } from "react-helmet";

const ListPost = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeSuggest = 4;
  const modelName = "Post";
  const [post, setPost] = useState({});
  const [listPostSuggest, setListPostSuggest] = useState([]);

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };
  const fetchPostSuggest = async () => {
    const data = await getPaginate(modelName, currentPage, pageSizeSuggest);
    if (data && data.errCode === 0) {
      setListPostSuggest(data.data);
    }
  };

  const fetchPostById = async () => {
    try {
      const data = await getPostById(id);
      if (data && data.errCode === 0) {
        setPost(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
    fetchPostSuggest();
  }, []);
  return (
    <>
      <Helmet>
        <title>Chi tiết bài đăng</title>
      </Helmet>
      <Group_Menu />
      <div className="mt-5">
        <div>
          <Row gutter={[16, 16]} wrap>
            <Col span={18}>
              <div className="text-[16px] pr-20">
                {post && post.title ? (
                  <div>
                    <h3 className="text-[#522f1f]">
                      <strong>{post.title}</strong>
                    </h3>
                    <div className="mb-2">
                      Đăng bởi <strong>Admin</strong>:{" "}
                      {formatDate(post.updatedAt)}
                    </div>
                    <div
                      className="text-justify leading-6"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                  </div>
                ) : (
                  <div>Không có bài viết</div>
                )}
              </div>
            </Col>
            {/* Sidebar hoặc nội dung phụ */}
            <Col span={6}>
              <div>
                <div className="text-[20px] text-[#522f1f] font-medium mb-3">
                  Bài viết mới nhất
                </div>
                {listPostSuggest &&
                  listPostSuggest.map((postSuggest, index) => {
                    return (
                      <div className="flex mt-3  border-t-2 pt-3" key={index}>
                        <div>
                          <img
                            src={postSuggest.image}
                            alt="hình ảnh"
                            className="w-full h-auto max-w-[100px] max-h-[80px]"
                          />
                        </div>
                        <div>
                          <div className="pl-2">{postSuggest.title}</div>
                          <div className="text-[14px] pl-2 mt-2">
                            {" "}
                            {formatDate(postSuggest.updatedAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
