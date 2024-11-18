const ReviewProduct = () => {
  return (
    <>
      <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Bình luận
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Viết bình luận ..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div>
              <div className="font-semibold text-gray-700">Thắng Trần</div>
              <p className="text-gray-600">Sản phẩm này rất tuyệt</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div>
              <div className="font-semibold text-gray-700">User khác</div>
              <p className="text-gray-600">Tôi cũng rất thích sản phẩm này!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewProduct;
