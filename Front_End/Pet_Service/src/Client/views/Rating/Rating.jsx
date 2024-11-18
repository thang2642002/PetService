import { useState } from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ onSave }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
    onSave(newRating); // Gửi rating về backend
  };

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
      <p className="mt-4 text-gray-600">Bạn đã đánh giá: {rating} sao</p>
    </div>
  );
};

export default StarRating;
