import paymentServices from "../services/paymentServices";

const getAllPayment = async (req, res) => {
  try {
    const getAllPayment = await paymentServices.getAllPayment();
    if (getAllPayment) {
      return res.status(200).json({
        errCode: 0,
        message: "Get all payment is the success",
        data: getAllPayment,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get all payment is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Get all payment is the fails",
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const { order_id, payment_method, payment_status, amount_paid } = req.body;
    const createPayment = await paymentServices.createPayment(
      order_id,
      payment_method,
      payment_status,
      amount_paid
    );
    if (createPayment) {
      return res.status(200).json({
        errCode: 0,
        message: "Create payment is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Create payment is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Create payment is the fails",
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayment = await paymentServices.updatePayment(id);
    if (updatePayment) {
      return res.status(200).json({
        errCode: 0,
        message: "Update payment is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Update payment is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Update payment is the fails",
    });
  }
};

module.exports = { getAllPayment, createPayment, updatePayment };
