import axios from "../configs/axiosCustommize";

const getAllServiceReview = () => {
  return axios.get("/service-review/get-all-service-review");
};

const createServiceReview = (service_id, user_id, rating, comment) => {
  const data = { service_id, user_id, rating, comment };
  return axios.post("/service-review/create-service-review", data);
};

const updateServiceReview = (
  service_review_id,
  service_id,
  user_id,
  rating,
  comment
) => {
  const data = { service_id, user_id, rating, comment };
  return axios.put(
    `/service-review/update-service-review/${service_review_id}`,
    data
  );
};

const deleteServiceReview = (service_review_id) => {
  return axios.delete(
    `/service-review/delete-service-review/${service_review_id}`,
    { data: { service_review_id } }
  );
};

export {
  getAllServiceReview,
  createServiceReview,
  updateServiceReview,
  deleteServiceReview,
};
