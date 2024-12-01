import db from "../models/index";

const getAllCart = async () => {
  const data = await db.Carts.findAll({
    include: [
      { model: db.User, as: "user" },
      {
        model: db.CartItem,
        as: "cartItems",
        include: [
          {
            model: db.Products,
            as: "product_item",
          },
          {
            model: db.Pets,
            as: "pet_item",
          },
        ],
      },
    ],
  });
  return data;
};

const createCart = async (user_id, total_amount) => {
  const user = await db.User.findByPk(user_id);
  const cartUser = await db.Carts.findOne({
    where: { user_id: user_id },
  });
  if (cartUser) {
    return cartUser;
  }
  if (user && !cartUser) {
    const data = await db.Carts.create({ user_id, total_amount });
    return data;
  }
  return null;
};

const updateCart = async (cart_id, user_id, total_amount) => {
  const cartUpdate = await db.Carts.findByPk(cart_id);
  const checkUser = await db.User.findByPk(user_id);
  if (!checkUser) {
    return null;
  }
  await cartUpdate.update({ user_id, total_amount });
  return cartUpdate;
};

const deleteCart = async (cart_id) => {
  const data = await db.Carts.destroy({
    where: { cart_id: cart_id },
  });
  return data;
};

const getByCartId = async (cart_id) => {
  const data = await db.Carts.findByPk(cart_id, {
    include: [
      { model: db.User, as: "user" },
      {
        model: db.CartItem,
        as: "cartItems",
        include: [
          {
            model: db.Products,
            as: "product_item",
          },
          {
            model: db.Pets,
            as: "pet_item",
          },
        ],
      },
    ],
  });
  return data;
};

module.exports = {
  getAllCart,
  createCart,
  updateCart,
  deleteCart,
  getByCartId,
};
