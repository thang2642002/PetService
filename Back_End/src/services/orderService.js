import db from "../models/index";
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

const createOrder = async (total_amount, user_id, cart_id) => {
  try {
    const createOrder = await db.Order.create({
      total_amount,
      status: "pending",
      user_id,
      cart_id,
      order_date: new Date(),
    });
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

module.exports = {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByOrder,
  updateOrderPayment,
};
