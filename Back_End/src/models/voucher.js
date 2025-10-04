"use strict";
module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define(
    "Voucher",
    {
      voucher_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_voucher: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        unique: true,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      voucher_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      voucher_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      tableName: "Voucher",
      timestamps: true,
    }
  );

  Voucher.associate = function (models) {};

  return Voucher;
};
