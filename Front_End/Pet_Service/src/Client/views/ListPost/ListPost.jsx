import React, { useEffect, useState } from "react";
import Group_Menu from "../../components/Group_Menu";
import { Col, Row } from "antd";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getPaginate } from "../../../services/paginateServices";

const ListPost = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const pageSizeSuggest = 4;
  const modelName = "Post";
  const [listPost, setListPost] = useState([]);
  const [listPostSuggest, setListPostSuggest] = useState([]);

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  const fetchAllPost = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListPost(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };


  const fetchPostSuggest = async () => {
    const data = await getPaginate(modelName, currentPage, pageSizeSuggest);
    if (data && data.errCode === 0) {
      setListPostSuggest(data.data);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, [currentPage]);

  useEffect(() => {
    fetchPostSuggest();
  }, []);
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
              {listPost &&
                listPost.length > 0 &&
                listPost.map((post, index) => {
                  return (
                    <Link
                      to={`/post-detail/${post.post_id}`}
                      key={post.post_id}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="flex mt-4 pb-4 border-b-2">
                        <div>
                          <img
                            src={post.image}
                            alt="hình ảnh"
                            className="w-full h-auto max-w-[255px] max-h-[145px]"
                          />
                        </div>
                        <div className="ml-5 px-3 flex flex-col mt-2">
                          <div className="flex flex-col justify-center">
                            <div className="text-[20px] font-medium text-[#522f1f] mb-2 ">
                              {post.title}
                            </div>
                            <div className="text-[16px] break-words mt-2 text-black">
                              {post.desc_title}
                            </div>
                            <div className="text-[14px] mt-4 text-black">
                              {formatDate(post.updatedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              <div className="flex justify-center mt-4">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </Col>
            {/* Sidebar hoặc nội dung phụ */}
            <Col span={6}>
              <div>
                <div className="text-[20px] text-[#522f1f] font-medium mb-3">
                  Bài viết mới nhất
                </div>
                {listPostSuggest &&
                  listPostSuggest.length > 0 &&
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
