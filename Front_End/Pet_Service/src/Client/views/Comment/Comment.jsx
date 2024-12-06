import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import {
  getProductReviewById,
  deleteProductReview,
  updateProductReview,
} from "../../../services/productReviewServices";
import { useSelector } from "react-redux";

const Comment = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state.user);

  const fetchComments = async () => {
    try {
      const response = await getProductReviewById(productId);
      setComments(response.data);
    } catch (err) {
      console.error("Lỗi khi tải bình luận:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const data = await deleteProductReview(commentId);
    if (data && data.errCode === 0) {
      console.log("Xóa thành công");
      fetchComments();
    } else {
      console.log("Xóa không thành công");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.product_review_id);
    setEditedComment(comment.comment);
    setRating(comment.rating);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const data = await updateProductReview(
        commentId,
        rating,
        editedComment,
        user?.user?.data?.user_id,
        productId
      );
      if (data && data.errCode === 0) {
        console.log("Cập nhật thành công");
        setEditingCommentId(null);
        fetchComments();
      } else {
        console.log("Cập nhật không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  return (
    <div className="container mx-auto my-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Bình luận</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.product_review_id || comment.user_id}
            className="flex items-start space-x-4"
          >
            <img
              src={comment.userAvatar || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-700">
                {comment?.user?.user_name}
              </div>
              <StarRatings
                rating={comment.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="15px"
                starSpacing="2px"
                name="read-only"
              />
              <div className="flex justify-between items-center text-gray-500">
                {editingCommentId === comment.product_review_id ? (
                  <div className="flex flex-col">
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
                        handleUpdateComment(comment.product_review_id)
                      }
                    >
                      Cập nhật
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600">{comment.comment}</p>
                )}

                {user?.user?.data?.user_id === comment?.user?.user_id && (
                  <div className="flex space-x-4 text-[13px] text-blue-500">
                    {!editingCommentId && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleEditComment(comment)}
                      >
                        Chỉnh sửa
                      </div>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteComment(comment.product_review_id)
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

export default Comment;
