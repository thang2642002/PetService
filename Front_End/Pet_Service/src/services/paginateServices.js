import axios from "../configs/axiosCustommize";

const getPaginate = (model, page, pageSize) => {
  return axios.get(
    `/paginate/get-paginated/${model}?page=${page}&pageSize=${pageSize}`
  );
};

export { getPaginate };
