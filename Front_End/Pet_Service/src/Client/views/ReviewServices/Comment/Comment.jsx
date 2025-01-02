import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import {
  getAllServiceReview,
  deleteServiceReview,
  updateServiceReview,
} from "../../../../services/serviceReviewServices";
import { getAllServices } from "../../../../services/serviceServices";

const ServiceComments = () => {
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [rating, setRating] = useState(0);
  const [serviceId, setServiceId] = useState(null);
  const user = useSelector((state) => state.user);

  const fetchReviews = async () => {
    try {
      const response = await getAllServiceReview();
      setReviews(response.data);
    } catch (err) {
      console.error("Lỗi khi tải đánh giá dịch vụ:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách dịch vụ:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const data = await deleteServiceReview(reviewId);
      if (data && data.errCode === 0) {
        console.log("Xóa đánh giá thành công");
        fetchReviews();
      } else {
        console.log("Xóa đánh giá không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa đánh giá:", error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review.service_review_id);
    setEditedComment(review.comment);
    setRating(review.rating);
    setServiceId(review.service_id);
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      const data = await updateServiceReview(
        reviewId,
        serviceId,
        user?.user?.data?.user_id,
        rating,
        editedComment
      );
      if (data && data.errCode === 0) {
        console.log("Cập nhật đánh giá thành công");
        setEditingReviewId(null);
        fetchReviews();
      } else {
        console.log("Cập nhật đánh giá không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật đánh giá:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchServices(); // Lấy danh sách dịch vụ khi component được mount
  }, []);

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Danh sách đánh giá dịch vụ</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.service_review_id || review.user_id}
            className="flex items-start space-x-4"
          >
            <img
              src={review.userAvatar || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-700">
                {review?.user?.user_name}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                Dịch vụ:{" "}
                <span className="text-blue-500">{review?.service?.name}</span>
              </div>
              <StarRatings
                rating={review.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="15px"
                starSpacing="2px"
                name="read-only"
              />
              <div className="flex justify-between items-center text-gray-500">
                {editingReviewId === review.service_review_id ? (
                  <div className="flex flex-col">
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg mt-2"
                    >
                      <option value="">Chọn dịch vụ</option>
                      {services.map((service) => (
                        <option
                          key={service.service_id}
                          value={service.service_id}
                        >
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      placeholder="Chỉnh sửa bình luận..."
                      className="p-2 border border-gray-300 rounded-lg w-[1100px] mt-2"
                    />
                    <StarRatings
                      rating={rating}
                      starRatedColor="gold"
                      starDimension="20px"
                      starSpacing="2px"
                      changeRating={(newRating) => setRating(newRating)}
                      numberOfStars={5}
                      name="rating-edit"
                    />
                    <button
                      className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                      onClick={() =>
                        handleUpdateReview(review.service_review_id)
                      }
                    >
                      Cập nhật
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600">{review.comment}</p>
                )}

                {user?.user?.data?.user_id === review?.user?.user_id && (
                  <div className="flex space-x-4 text-[13px] text-blue-500">
                    {!editingReviewId && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleEditReview(review)}
                      >
                        Chỉnh sửa
                      </div>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteReview(review.service_review_id)
                      }
                    >
                      Xóa
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceComments;
