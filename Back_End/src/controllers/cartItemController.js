import cartItemService from "../services/cartItemService";

const createCartItem = async (req, res) => {
  const { cart_id, item_id, item_type, quantity, total_price } = req.body;

  try {
    const result = await cartItemService.createCartItem({
      cart_id,
      item_id,
      item_type,
      quantity,
      total_price,
    });

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error occurred while creating cart item.",
    });
  }
};

const getAllCartItem = async (req, res) => {
  try {
    const data = await cartItemService.getAllCartItem();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Get all cart item is the success",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get all cart item is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Server error, Get all cart item is the success",
    });
  }
};

const updateCartItem = async (req, res) => {
  const cart_item_id = req.params.id;
  const { quantity, total_price } = req.body;
  try {
    const data = await cartItemService.updateCartItem(
      cart_item_id,
      quantity,
      total_price
    );
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Update cart item is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Update cart item is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Server error, Update cart item is the fails",
    });
  }
};

const deleteCartItem = async (req, res) => {
  const cart_item_id = req.params.id;
  try {
    const data = await cartItemService.deleteCartItem(cart_item_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Delete is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Delete is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Delete is the fails",
    });
  }
};

module.exports = {
  createCartItem,
  getAllCartItem,
  updateCartItem,
  deleteCartItem,
};
