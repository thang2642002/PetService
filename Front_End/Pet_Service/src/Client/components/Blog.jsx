import { Col, Row } from "antd";
const Blog = () => {
  return (
    <>
      <div className="blog mt-5">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className="cart_blog flex align-items-center justify-center gap-3 mt-4">
              <div className="img">
                <img
                  src="https://file.hstatic.net/200000263355/article/sua_tam_cho_cho-1_07b89bd79dcd47229a4458faa13a200a_small.png"
                  alt="blog"
                  className="h-full w-full"
                />
              </div>
              <div className="">
                <p className=" text-sm">
                  Top 10 loại sữa tắm cho chó tốt nhất hiện nay dddd
                </p>
                <span className="text-gray-400">09/11/2024</span>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="cart_blog flex align-items-center justify-center gap-3 mt-4">
              <div className="img h-full ">
                <img
                  src="https://file.hstatic.net/200000263355/article/sua_tam_cho_cho-1_07b89bd79dcd47229a4458faa13a200a_small.png"
                  alt="blog"
                />
              </div>
              <div className="">
                <p className=" text-sm">
                  Top 10 loại sữa tắm cho chó tốt nhất hiện nay dddd
                </p>
                <span className="text-gray-400">09/11/2024</span>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="cart_blog flex align-items-center justify-center gap-3 mt-4">
              <div className="img h-full ">
                <img
                  src="https://file.hstatic.net/200000263355/article/sua_tam_cho_cho-1_07b89bd79dcd47229a4458faa13a200a_small.png"
                  alt="blog"
                />
              </div>
              <div className="">
                <p className=" text-sm">
                  Top 10 loại sữa tắm cho chó tốt nhất hiện nay dddd
                </p>
                <span className="text-gray-400">09/11/2024</span>
              </div>
            </div>
          </Col>

          <Col span={8}>
            <div className="cart_blog flex align-items-center justify-center gap-3 mt-4">
              <div className="img h-full ">
                <img
                  src="https://file.hstatic.net/200000263355/article/sua_tam_cho_cho-1_07b89bd79dcd47229a4458faa13a200a_small.png"
                  alt="blog"
                />
              </div>
              <div className="">
                <p className=" text-sm">
                  Top 10 loại sữa tắm cho chó tốt nhất hiện nay dddd
                </p>
                <span className="text-gray-400">09/11/2024</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Blog;
