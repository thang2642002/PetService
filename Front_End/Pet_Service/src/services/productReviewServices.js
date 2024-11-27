import axios from "../configs/axiosCustommize";

const getAllProductReview = () => {
  return axios.get("/product-review/get-all-product-review");
};

const getProductReviewById = (id) => {
  return axios.get(`/product-review/get-product-review-by-id/${id}`, {
    data: { id },
  });
};
const createProductReview = (rating, comment, user_id, product_id) => {
  const data = { rating, comment, user_id, product_id };
  return axios.post("/product-review/create-product-review", data);
};

const updateProductReview = (
  product_review_id,
  rating,
  comment,
  user_id,
  product_id
) => {
  const data = { rating, comment, user_id, product_id };
  return axios.put(
    `/product-review/update-product-review/${product_review_id}`,
    data
  );
};

const deleteProductReview = (product_review_id) => {
  return axios.delete(
    `/product-review/delete-product-review/${product_review_id}`,
    { data: { product_review_id } }
  );
};

export {
  createProductReview,
  getAllProductReview,
  getProductReviewById,
  updateProductReview,
  deleteProductReview,
};
