import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { createServiceReview } from "../../../../services/serviceReviewServices";
import { getAllServices } from "../../../../services/serviceServices";

const ServiceRating = () => {
  const { user } = useSelector((state) => state.user);
  const user_id = user?.data?.user_id || null;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const data = await getAllServices();
      setServices(data.data);
    } catch (err) {
      console.error("Lỗi khi tải đánh giá:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!selectedService || !rating || !comment.trim()) {
      setError("Vui lòng chọn dịch vụ, số sao và nhập bình luận!");
      return;
    }
    setError("");

    try {
      const data = await createServiceReview(
        selectedService,
        user_id,
        rating,
        comment
      );
      if (data && data.errCode === 0) {
        toast.success("Đánh giá thành công");
        setComment("");
        setRating(0);
        setSelectedService("");
        fetchReviews();
      } else {
        toast.error("Đánh giá không thành công");
      }
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Đánh giá dịch vụ</h3>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      >
        <option value="">Chọn dịch vụ</option>
        {services.map((service) => (
          <option key={service.service_id} value={service.service_id}>
            {service.name}
          </option>
        ))}
      </select>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        starHoverColor="gold"
        changeRating={setRating}
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nhập bình luận ..."
        className="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Gửi đánh giá
      </button>
    </div>
  );
};

export default ServiceRating;
