import db from "../models/index";
const getAllOrderItem = async () => {
  try {
    const getAllOrderItem = await db.OrderItem.findAll({
      include: [
        { model: db.Products, as: "product" },
        { model: db.Order, as: "order" },
      ],
    });
    return getAllOrderItem;
  } catch (error) {
    console.log(error);
  }
};

const createOrderItem = async (order_id, product_id, quantity, total_price) => {
  try {
    const createOrderItem = await db.OrderItem.create({
      order_id,
      product_id,
      quantity,
      total_price,
    });
    return createOrderItem;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderItem = async (
  order_item_id,
  order_id,
  product_id,
  quantity,
  total_price
) => {
  try {
    const updateOrderItem = await db.OrderItem.findByPk(order_item_id);
    if (!updateOrderItem) {
      return null;
    }
    await updateOrderItem.update({
      order_id,
      product_id,
      quantity,
      total_price,
    });
    return updateOrderItem;
  } catch (error) {
    console.log(error);
  }
};

const deleteOrderItem = async (order_item_id) => {
  try {
    const deleteOrderItem = await db.OrderItem.destroy({
      where: { order_item_id: order_item_id },
    });
    return deleteOrderItem;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
