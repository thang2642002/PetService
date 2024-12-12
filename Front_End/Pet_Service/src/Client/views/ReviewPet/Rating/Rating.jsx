import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { createPetReview } from "../../../../services/petReviewServices";
import { useState } from "react";

const Rating = ({ petId }) => {
  const { user } = useSelector((state) => state.user);
  const user_id = user && user.data ? user.data.user_id : null;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      setError("Vui lòng chọn số sao và nhập bình luận!");
      return;
    }
    setError("");
    try {
      const data = await createPetReview(rating, comment, user_id, petId);
      if (data && data.errCode === 0) {
        console.log("Bình luận thành công");
        setComment("");
        window.location.reload();
      } else {
        console.log("Bình luận không thành công");
      }
    } catch (error) {
      console.log(error);
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  if (!user || !user.data) {
    return (
      <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-4">Đánh giá sản phẩm</h3>
        <p className="text-red-500">Bạn cần đăng nhập để gửi đánh giá.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Đánh giá sản phẩm</h3>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        starHoverColor="gold"
        changeRating={handleRatingChange}
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
        name="rating"
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

export default Rating;
