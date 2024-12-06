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

const createOrderItem = async (order_id, items) => {
  try {
    const orderItems = items.map((item) => ({
      order_id,
      item_id: item.item_id,
      quantity: item.quantity,
      total_price: item.total_price,
    }));
    const createOrderItem = await db.OrderItem.bulkCreate(orderItems);
    return createOrderItem;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderItem = async (
  order_item_id,
  order_id,
  item_id,
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
      item_id,
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
