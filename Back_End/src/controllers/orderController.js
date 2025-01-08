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
    const { total_amount, user_id, cart_id } = req.body;
    const createOrder = await orderService.createOrder(
      total_amount,
      user_id,
      cart_id
    );
    if (createOrder) {
      return res.status(200).json({
        message: "Create order is the success",
        errCode: 0,
        data: createOrder,
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
    const { total_amount, status, user_id, cart_id } = req.body;
    const updateOrder = await orderService.updateOrder(
      order_id,
      total_amount,
      status,
      user_id,
      cart_id
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

const getOrderById = async (req, res) => {
  const user_id = req.params.id;
  try {
    const data = await orderService.getOrderById(user_id);
    if (data) {
      return res.status(200).json({
        message: "Get order is the success",
        errCode: 0,
        data: data,
      });
    } else {
      return res.status(400).json({
        message: "Get order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get order is the success",
      errCode: -1,
    });
  }
};

const getOrderByOrder = async (req, res) => {
  const order_id = req.params.id;
  try {
    const data = await orderService.getOrderByOrder(order_id);
    if (data) {
      return res.status(200).json({
        message: "Get order is the success",
        errCode: 0,
        data: data,
      });
    } else {
      return res.status(400).json({
        message: "Get order is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get order is the success",
      errCode: -1,
    });
  }
};

const updateOrderPayment = async (req, res) => {
  try {
    const order_id = req.params.id;

    const updateOrder = await orderService.updateOrderPayment(order_id);
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

const getRevenueStats = async (req, res) => {
  try {
    const { year, month } = req.query;

    const revenueStats = await orderService.getRevenueStatsService({
      year,
      month,
    });

    res.status(200).json({
      success: true,
      data: revenueStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê doanh thu",
    });
  }
};

const getOrderStatsByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    // Kiểm tra nếu year và month chưa được cung cấp
    if (!year || !month) {
      return res
        .status(400)
        .json({ success: false, message: "Year and Month are required" });
    }

    // Gọi service để lấy dữ liệu thống kê
    const stats = await orderService.getOrderStatsByMonth(year, month);

    // Trả kết quả thống kê
    res.status(200).json({
      success: true,
      data: {
        ...stats,
        year,
        month,
      },
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching order stats" });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByOrder,
  updateOrderPayment,
  getRevenueStats,
  getOrderStatsByMonth,
};
