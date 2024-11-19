import axios from "../configs/axiosCustommize";

const fetchAllCategory = () => {
  return axios.get("/category/get-all-category");
};

const createCategory = (name, description) => {
  const data = { name, description };
  return axios.post("/category/create-category", data);
};

const deleteCategory = (category_id) => {
  return axios.delete(`/category/delete-category/${category_id}`, {
    data: { category_id },
  });
};

export { fetchAllCategory, createCategory, deleteCategory };
