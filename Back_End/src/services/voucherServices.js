import { where } from "sequelize";
import db from "../models/index";

const getAllVoucher = async () => {
  try {
    const data = await db.Voucher.findAll();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createVoucher = async (
  name_voucher,
  start_date,
  end_date,
  voucher_code,
  voucher_type,
  discount,
  quantity,
  total_price
) => {
  try {
    const data = await db.Voucher.create({
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateVoucher = async (
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
  try {
    const updateVoucher = await db.Voucher.findByPk(id);
    if (!updateVoucher) {
      return null;
    }
    await updateVoucher.update({
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price,
    });
    return updateVoucher;
  } catch (error) {
    console.log(error);
  }
};

const deleteVoucher = async (id) => {
  try {
    const data = await db.Voucher.destroy({
      where: { voucher_id: id },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getVoucher = async (id) => {
  try {
    const data = await db.Voucher.findByPk(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucher,
};
