import db from "../models/index.js";
import { validate as validateUUID } from "uuid";

const isValidUUID = (id) => validateUUID(id);

const createCartItem = async ({ cart_id, item_id, quantity, total_price }) => {
  try {
    if (!item_id || !isValidUUID(item_id)) {
      return {
        status: 400,
        data: {
          errCode: 2,
          message: "Invalid or missing item_id. It must be a valid UUID.",
        },
      };
    }

    const existingCart = await db.Carts.findByPk(cart_id);
    if (!existingCart) {
      return {
        status: 404,
        data: {
          errCode: 3,
          message: "Cart not found. Please provide a valid cart_id.",
        },
      };
    }

    const existingCartItem = await db.CartItem.findOne({
      where: { cart_id, item_id },
    });

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + quantity;
      const updatedTotalPrice = existingCartItem.total_price + total_price;

      await existingCartItem.update({
        quantity: updatedQuantity,
        total_price: updatedTotalPrice,
      });

      return {
        status: 200,
        data: {
          errCode: 0,
          message: "Cart item updated successfully.",
          data: existingCartItem,
        },
      };
    }

    const newCartItem = await db.CartItem.create({
      cart_id,
      item_id,
      quantity,
      total_price,
    });

    return {
      status: 201,
      data: {
        errCode: 0,
        message: "Cart item created successfully.",
        data: newCartItem,
      },
    };
  } catch (error) {
    console.error("Error in createCartItem service:", error.message);
    throw new Error(
      "Server error occurred while creating or updating cart item."
    );
  }
};

const getAllCartItem = async () => {
  try {
    const data = await db.CartItem.findAll({
      include: [
        {
          model: db.Products,
          as: "product_item",
          required: false,
        },
        {
          model: db.Pets,
          as: "pet_item",
          required: false,
        },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateCartItem = async (cart_item_id, quantity, total_price) => {
  try {
    const cartItemUpdate = await db.CartItem.findByPk(cart_item_id);
    if (!cartItemUpdate) {
      return null;
    }
    await cartItemUpdate.update({ quantity, total_price });
    return cartItemUpdate;
  } catch (error) {
    console.log(error);
  }
};

const deleteCartItem = async (cart_item_id) => {
  try {
    const data = await db.CartItem.destroy({
      where: { cart_item_id: cart_item_id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  createCartItem,
  getAllCartItem,
  updateCartItem,
  deleteCartItem,
};
