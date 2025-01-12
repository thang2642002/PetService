import voucherServices from "../services/voucherServices";

const getAllVoucher = async (req, res) => {
  try {
    const getVoucher = await voucherServices.getAllVoucher();
    if (getVoucher) {
      return res.status(200).json({
        errCode: 0,
        message: "Get all voucher is the success",
        data: getVoucher,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get all voucher is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error ,Get all voucher is the fails",
    });
  }
};

const createVoucher = async (req, res) => {
  try {
    const {
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price,
    } = req.body;
    const createVoucher = await voucherServices.createVoucher(
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price
    );
    if (createVoucher) {
      return res.status(200).json({
        errCode: 0,
        message: "Create voucher is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Create voucher is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error ,Create voucher is the fails",
    });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price,
    } = req.body;

    const updateVoucher = await voucherServices.updateVoucher(
      id,
      name_voucher,
      start_date,
      end_date,
      voucher_code,
      voucher_type,
      discount,
      quantity,
      total_price
    );
    if (updateVoucher) {
      return res.status(200).json({
        errCode: 0,
        message: "Update voucher is the success",
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        message: "Update voucher is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error ,Update voucher is the fails",
    });
  }
};

const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVoucher = await voucherServices.deleteVoucher(id);
    if (deleteVoucher) {
      return res.status(200).json({
        errCode: 0,
        message: "Delete voucher is the success",
      });
    } else {
      return res.status(200).json({
        errCode: 0,
        message: "Delete voucher is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Delete voucher is the fails",
    });
  }
};

const getVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await voucherServices.getVoucher(id);
    if (voucher) {
      return res.status(200).json({
        errCode: 0,
        message: "Find voucher is the success",
        data: voucher,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Find voucher is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Find voucher is the fails",
    });
  }
};

module.exports = {
  getAllVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucher,
};
