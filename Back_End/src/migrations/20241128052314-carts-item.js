"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CartItems", {
      cart_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Carts", // Tên bảng Carts
          key: "cart_id", // Khóa chính trong bảng Carts
        },
        onDelete: "CASCADE", // Xóa mục trong giỏ hàng khi giỏ hàng bị xóa
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      item_type: {
        type: Sequelize.ENUM("product", "pet"), // Chỉ cho phép hai giá trị: product hoặc pet
        allowNull: false, // Không được để null vì chúng ta cần phân biệt sản phẩm và thú cưng
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false, // Giá trị không thể null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CartItems");
  },
};
