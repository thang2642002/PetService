import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaginate } from "../../services/paginateServices";

const Blog = () => {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const modelName = "Post";
  const [listPost, setListPost] = useState([]);

  const fetchPost = async () => {
    const data = await getPaginate(modelName, currentPage, pageSize);
    if (data && data.errCode === 0) {
      setListPost(data.data);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  };

  const handleNavigationPostDetail = (id) => {
    navigate(`/post-detail/${id}`);
  };

  const handleNavigationPost = () => {
    navigate("/post");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="blog mt-5">
        <Row gutter={[16, 16]}>
          {listPost &&
            listPost.length > 0 &&
            listPost.map((post, index) => {
              return (
                <Col span={8} key={index}>
                  <div
                    className="cart_blog flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => handleNavigationPostDetail(post.post_id)}
                  >
                    <div className="img w-[80px] h-[80px] flex-shrink-0">
                      <img
                        src={post.image}
                        alt="blog"
                        className="h-full w-full object-cover rounded"
                      />
                    </div>

                    <div className="content flex-1">
                      <p className="text-sm font-semibold truncate">
                        {post.title}
                      </p>
                      <span className="text-gray-400 text-xs">09/11/2024</span>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
      <div
        className="flex justify-center mt-10 font-normal cursor-pointer"
        onClick={handleNavigationPost}
      >
        Xem thêm &gt;&gt;
      </div>
    </>
  );
};

export default Blog;
