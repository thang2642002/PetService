// models/PetScore.js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const PetScore = sequelize.define(
    "PetScore",
    {
      score_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      score_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      health_score: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      diet: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      height: {
        // Note: 'height' thay vì 'hight'
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_pet_id: {
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
      tableName: "Pet_scores",
      timestamps: true,
    }
  );

  PetScore.associate = function (models) {
    // Mối quan hệ giữa PetScore và UserPet
    PetScore.belongsTo(models.UserPet, {
      foreignKey: "user_pet_id",
      as: "user_pet", // Tên cho mối quan hệ này
      onDelete: "SET NULL", // Khi user_pet bị xóa, user_pet_id trong PetScore sẽ được đặt thành NULL
      onUpdate: "CASCADE", // Khi user_pet được cập nhật, các PetScore liên quan sẽ được cập nhật theo
    });
  };

  return PetScore;
};
