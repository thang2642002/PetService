import axios from "../configs/axiosCustommize";

const getAllPetReview = () => {
  return axios.get("/pet-review/get-all-pet-review");
};

const getPetReviewById = (id) => {
  return axios.get(`/pet-review/get-pet-review-by-id/${id}`, {
    data: { id },
  });
};
const createPetReview = (rating, comment, user_id, pet_id) => {
  const data = { rating, comment, user_id, pet_id };
  return axios.post("/pet-review/create-pet-review", data);
};

const updatePetReview = (pet_review_id, rating, comment, user_id, pet_id) => {
  const data = { rating, comment, user_id, pet_id };
  return axios.put(`/pet-review/update-pet-review/${pet_review_id}`, data);
};

const deletePetReview = (pet_review_id) => {
  return axios.delete(`/pet-review/delete-pet-review/${pet_review_id}`, {
    data: { pet_review_id },
  });
};

export {
  getAllPetReview,
  getPetReviewById,
  createPetReview,
  updatePetReview,
  deletePetReview,
};
