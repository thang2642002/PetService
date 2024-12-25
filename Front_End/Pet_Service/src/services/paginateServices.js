import axios from "../configs/axiosCustommize";

const getPaginate = (model, page, pageSize) => {
  return axios.get(
    `/paginate/get-paginated/${model}?page=${page}&pageSize=${pageSize}`
  );
};

const getPaginateProduct = ({ listProduct, page = 1, limit = 8 }) => {
  const data = { listProduct, page, limit };
  return axios.post("/paginate/get-paginated-product", data);
};

const getPaginateProductSort = ({ modelName, page, limit, sortBy, order }) => {
  const data = { modelName, page, limit, sortBy, order };
  return axios.post("/paginate/get-paginated-product-sort", data);
};

export { getPaginate, getPaginateProduct, getPaginateProductSort };
