import db from "../models/index.js";
import { Op, fn, col } from "sequelize";
const getAllOrder = async () => {
  try {
    const getAllOrder = await db.Order.findAll({
      include: [
        { model: db.User, as: "user" },
        { model: db.Carts, as: "cart" },
        { model: db.Payments, as: "payments" },
        {
          model: db.OrderItem,
          as: "orderItems",
          include: [
            { model: db.Products, as: "product_item" },
            { model: db.Pets, as: "pet_item" },
          ],
        },
      ],
    });
    return getAllOrder;
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (total_amount, user_id, cart_id, id_voucher) => {
  try {
    const createOrder = await db.Order.create({
      total_amount,
      status: "pending",
      user_id,
      cart_id,
      order_date: new Date(),
    });
    if (id_voucher) {
      const voucher = await db.Voucher.findByPk(id_voucher);
      await voucher.update({
        quantity: voucher.quantity - 1,
      });
    }
    return createOrder;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (
  order_id,
  total_amount,
  status,
  // order_date,
  user_id,
  cart_id
) => {
  try {
    const updateOrder = await db.Order.findByPk(order_id);
    if (!updateOrder) {
      return null;
    }
    await updateOrder.update({
      total_amount,
      status,
      // order_date,
      user_id,
      cart_id,
    });
    return updateOrder;
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (order_id) => {
  try {
    const deleteOrder = await db.Order.destroy({
      where: { order_id: order_id },
    });
    return deleteOrder;
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (user_id) => {
  try {
    const data = await db.Order.findAll({
      where: { user_id: user_id },
      include: [
        { model: db.User, as: "user" },
        { model: db.Carts, as: "cart" },
        { model: db.Payments, as: "payments" },
        {
          model: db.OrderItem,
          as: "orderItems",
          include: [
            { model: db.Products, as: "product_item" },
            { model: db.Pets, as: "pet_item" },
          ],
        },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderByOrder = async (order_id) => {
  try {
    const data = await db.Order.findByPk(order_id, {
      include: [
        { model: db.User, as: "user" },
        { model: db.Carts, as: "cart" },
        { model: db.Payments, as: "payments" },
        {
          model: db.OrderItem,
          as: "orderItems",
          include: [
            { model: db.Products, as: "product_item" },
            { model: db.Pets, as: "pet_item" },
          ],
        },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderPayment = async (order_id) => {
  try {
    const updateOrder = await db.Order.findByPk(order_id);
    if (!updateOrder) {
      return null;
    }
    await updateOrder.update({
      status: "completed",
    });
    return updateOrder;
  } catch (error) {
    console.log(error);
  }
};

const getRevenueStatsService = async (filters) => {
  const { year, month } = filters;
  const whereCondition = {};

  if (year) {
    whereCondition.createdAt = {
      [Op.gte]: new Date(`${year}-01-01`),
      [Op.lt]: new Date(`${parseInt(year) + 1}-01-01`),
    };
  }

  if (year && month) {
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    whereCondition.createdAt = {
      [Op.gte]: startOfMonth,
      [Op.lt]: endOfMonth,
    };
  } else if (month) {
    const startOfMonth = new Date(
      `${year || new Date().getFullYear()}-${month}-01`
    );
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    whereCondition.createdAt = {
      [Op.gte]: startOfMonth,
      [Op.lt]: endOfMonth,
    };
  }

  const revenueStats = await db.Order.findAll({
    attributes: [
      [fn("YEAR", col("createdAt")), "year"],
      [fn("MONTH", col("createdAt")), "month"],
      [fn("SUM", col("total_amount")), "totalRevenue"],
    ],
    where: whereCondition,
    group: [fn("YEAR", col("createdAt")), fn("MONTH", col("createdAt"))],
    order: [
      [fn("YEAR", col("createdAt")), "ASC"],
      [fn("MONTH", col("createdAt")), "ASC"],
    ],
  });

  return revenueStats;
};

const getOrderStatsByMonth = async (year, month) => {
  try {
    // Thống kê số đơn hàng đã giao thành công (status = "completed")
    const deliveredOrders = await db.Order.count({
      where: {
        status: "completed",
        createdAt: {
          [Op.gte]: new Date(`${year}-${month}-01`), // Ngày đầu tháng
          [Op.lt]: new Date(`${year}-${parseInt(month) + 1}-01`), // Ngày đầu tháng tiếp theo
        },
      },
    });

    // Thống kê số đơn hàng bị hủy (status = "cancelled")
    const cancelledOrders = await db.Order.count({
      where: {
        status: "cancelled",
        createdAt: {
          [Op.gte]: new Date(`${year}-${month}-01`),
          [Op.lt]: new Date(`${year}-${parseInt(month) + 1}-01`),
        },
      },
    });

    // Thống kê số đơn hàng đang chờ xử lý (status = "pending")
    const pendingOrders = await db.Order.count({
      where: {
        status: "pending",
        createdAt: {
          [Op.gte]: new Date(`${year}-${month}-01`),
          [Op.lt]: new Date(`${year}-${parseInt(month) + 1}-01`),
        },
      },
    });

    return {
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
    };
  } catch (error) {
    throw new Error("Error fetching order stats from service");
  }
};

export default {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByOrder,
  updateOrderPayment,
  getRevenueStatsService,
  getOrderStatsByMonth,
};
