import axios from "../configs/axiosCustommize";

const getAllProductReview = () => {
  return axios.get("/product-review/get-all-product-review");
};

const createProductReview = (rating, comment, user_id, product_id) => {
  const data = { rating, comment, user_id, product_id };
  return axios.post("/product-review/create-product-review", data);
};

const deleteProductReview = (product_review_id) => {
  return axios.delete(
    `/product-review/delete-product-review/${product_review_id}`,
    { data: { product_review_id } }
  );
};

export { createProductReview, getAllProductReview, deleteProductReview };
