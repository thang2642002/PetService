import orderService from "../services/orderService";
const getAllOrder = async (req, res) => {
  try {
    const getAllOrder = await orderService.getAllOrder();
    if (getAllOrder) {
      return res.status(200).json({
        message: "Get all order is the success",
        errCode: 0,
        data: getAllOrder,
      });
    } else {
      return res.status(400).json({
        message: "Get all order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error, Get all order is the fails",
      errCode: -1,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { total_amount, status, user_id } = req.body;
    const createOrder = await orderService.createOrder(
      total_amount,
      status,
      user_id
    );
    if (createOrder) {
      return res.status(200).json({
        message: "Create order is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error, Create order is the fails",
      errCode: -1,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const {
      total_amount,
      status,
      // order_date,
      user_id,
    } = req.body;
    const updateOrder = await orderService.updateOrder(
      order_id,
      total_amount,
      status,
      // order_date,
      user_id
    );
    if (updateOrder) {
      return res.status(200).json({
        message: "Update order is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error, Update order is the fails",
      errCode: -1,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const deleteOrder = await orderService.deleteOrder(order_id);
    if (deleteOrder) {
      return res.status(200).json({
        message: "Delete order is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error, Delete order is the fails",
      errCode: -1,
    });
  }
};

module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder };
