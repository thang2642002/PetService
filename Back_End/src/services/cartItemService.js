import { where } from "sequelize";
import db from "../models/index";
import { validate as validateUUID } from "uuid";

const isValidUUID = (id) => {
  return validateUUID(id); // Kiểm tra UUID hợp lệ
};

const createCartItem = async ({
  cart_id,
  item_id,
  item_type,
  quantity,
  total_price,
}) => {
  try {
    // Kiểm tra item_type hợp lệ
    if (!["product", "pet"].includes(item_type)) {
      return {
        status: 400,
        data: {
          errCode: 1,
          message: "Invalid item_type. Accepted values are 'product' or 'pet'.",
        },
      };
    }

    // Kiểm tra item_id có hợp lệ
    if (!item_id || !isValidUUID(item_id)) {
      return {
        status: 400,
        data: {
          errCode: 2,
          message: "Invalid or missing item_id. It must be a valid UUID.",
        },
      };
    }

    // Kiểm tra cart_id có hợp lệ
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

    // Kiểm tra item_id có tồn tại trong bảng Products hoặc Pets
    let existingItem;
    if (item_type === "product") {
      existingItem = await db.Products.findByPk(item_id);
    } else if (item_type === "pet") {
      existingItem = await db.Pets.findByPk(item_id);
    }

    if (!existingItem) {
      return {
        status: 404,
        data: {
          errCode: 4,
          message: `${item_type} with ID ${item_id} not found.`,
        },
      };
    }

    // Kiểm tra số lượng và giá trị tổng giá
    if (quantity < 1 || total_price < 0) {
      return {
        status: 400,
        data: {
          errCode: 5,
          message:
            "Quantity must be at least 1 and total_price must be non-negative.",
        },
      };
    }

    // Tạo CartItem mới
    const newCartItem = await db.CartItem.create({
      cart_id,
      item_id,
      item_type,
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
    console.error(error.stack); // Log chi tiết stack trace để kiểm tra lỗi
    throw new Error("Server error occurred while creating cart item.");
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

module.exports = {
  createCartItem,
  getAllCartItem,
  updateCartItem,
  deleteCartItem,
};
