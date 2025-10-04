"use strict";
export default (sequelize, DataTypes) => {
  const Product_Image = sequelize.define(
    "Product_Image",
    {
      image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "product_id",
        },
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Product_Image",
      timestamps: true,
    }
  );

  Product_Image.associate = function (models) {
    Product_Image.belongsTo(models.Products, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Product_Image;
};
