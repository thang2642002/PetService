import CartService from "../services/cartService.js";
const getAllCart = async (req, res) => {
  try {
    const data = await CartService.getAllCart();
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Get all cart is the success",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get all cart is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Get all cart is the fails",
    });
  }
};

const createCart = async (req, res) => {
  const { user_id, total_amount } = req.body;
  try {
    const data = await CartService.createCart(user_id, total_amount);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Create cart is the success",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Create cart is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Create cart is the fails",
    });
  }
};

const updateCart = async (req, res) => {
  const cart_id = req.params.id;
  const { user_id, total_amount } = req.body;
  try {
    const data = await CartService.updateCart(cart_id, user_id, total_amount);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Update cart is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Update cart is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Server error, Update cart is the success",
    });
  }
};

const deleteCart = async (req, res) => {
  const cart_id = req.params.id;
  try {
    const data = await CartService.deleteCart(cart_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Delete cart is the success",
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Delete cart is the fails",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Server error, Delete cart is the fails",
    });
  }
};

const getByCartId = async (req, res) => {
  const user_id = req.params.id;
  try {
    const data = await CartService.getByCartId(user_id);
    if (data) {
      return res.status(200).json({
        errCode: 0,
        message: "Get cart is the success",
        data: data,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Get cart is the fails",
      });
    }
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Server error, Get cart is the fails",
    });
  }
};

export default {
  getAllCart,
  createCart,
  updateCart,
  deleteCart,
  getByCartId,
};
