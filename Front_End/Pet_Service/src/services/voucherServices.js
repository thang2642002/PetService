import axios from "../configs/axiosCustommize";

const getAllVoucher = () => {
  return axios.get("/voucher/get-all-voucher");
};

const createVoucher = (
  name_voucher,
  start_date,
  end_date,
  voucher_code,
  voucher_type,
  discount,
  quantity,
  total_price
) => {
  const data = {
    name_voucher,
    start_date,
    end_date,
    voucher_code,
    voucher_type,
    discount,
    quantity,
    total_price,
  };
  return axios.post("/voucher/create-voucher", data);
};

const updateVoucher = (
  id,
  name_voucher,
  start_date,
  end_date,
  voucher_code,
  voucher_type,
  discount,
  quantity,
  total_price
) => {
  const data = {
    name_voucher,
    start_date,
    end_date,
    voucher_code,
    voucher_type,
    discount,
    quantity,
    total_price,
  };
  return axios.put(`/voucher/update-voucher/${id}`, data);
};

const deleteVoucher = (id) => {
  return axios.delete(`/voucher/delete-voucher/${id}`);
};

const getVoucher = (id) => {
  return axios.get(`/voucher/get-voucher/${id}`);
};

export {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucher,
};
