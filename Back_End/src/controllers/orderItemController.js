import orderItemService from "../services/orderItemService";
const getAllOrderItem = async (req, res) => {
  try {
    const getAllOrderItem = await orderItemService.getAllOrderItem();
    if (getAllOrderItem) {
      return res.status(200).json({
        message: "Get all order item is the success",
        errCode: 0,
        data: getAllOrderItem,
      });
    } else {
      return res.status(400).json({
        message: "Get all order item is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Get all order item is the fails",
      errCode: -1,
    });
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, total_price } = req.body;
    const createOrderItem = await orderItemService.createOrderItem(
      order_id,
      product_id,
      quantity,
      total_price
    );
    if (createOrderItem) {
      return res.status(200).json({
        message: "Create order item is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create order item is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Create order item is the fails",
      errCode: -1,
    });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const order_item_id = req.params.id;
    const { order_id, product_id, quantity, total_price } = req.body;
    const updateOrderItem = await orderItemService.updateOrderItem(
      order_item_id,
      order_id,
      product_id,
      quantity,
      total_price
    );
    if (updateOrderItem) {
      return res.status(200).json({
        message: "Update order item is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update order item is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Update order item is the fails",
      errCode: -1,
    });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const order_item_id = req.params.id;
    const deleteOrderItem = await orderItemService.deleteOrderItem(
      order_item_id
    );
    if (deleteOrderItem) {
      return res.status(200).json({
        message: "Delete order item is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete order item is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Server error, Delete order item is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
