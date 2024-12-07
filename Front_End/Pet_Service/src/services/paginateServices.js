import axios from "../configs/axiosCustommize";

const getPaginate = (model, page, pageSize) => {
  return axios.get(
    `/paginate/get-paginated/${model}?page=${page}&pageSize=${pageSize}`
  );
};

const getPaginateProduct = ({ listProduct, page = 1, limit = 8 }) =>{
  const data = { listProduct, page, limit  }
  return axios.post("/paginate/get-paginated-product", data)
}

export { getPaginate, getPaginateProduct };
