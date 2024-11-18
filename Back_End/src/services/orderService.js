import db from "../models/index";
const getAllOrder = async () => {
  try {
    const getAllOrder = await db.Order.findAll({
      include: [{ model: db.User, as: "user" }],
    });
    return getAllOrder;
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (total_amount, status, order_date, user_id) => {
  try {
    const createOrder = await db.Order.create({
      total_amount,
      status,
      order_date,
      user_id,
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
  order_date,
  user_id
) => {
  try {
    const updateOrder = await db.Order.findByPk(order_id);
    if (!updateOrder) {
      return null;
    }
    await updateOrder.update({
      total_amount,
      status,
      order_date,
      user_id,
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
module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder };
