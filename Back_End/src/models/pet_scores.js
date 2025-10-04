"use strict";
export default (sequelize, DataTypes) => {
  const PetScore = sequelize.define(
    "PetScore",
    {
      score_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      symptoms: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Không cho phép chuỗi rỗng
        },
      },
      disease_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      care_suggestions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
    // Ví dụ: Nếu có bảng UserPet liên quan
    // PetScore.belongsTo(models.UserPet, { foreignKey: "user_pet_id" });
  };

  return PetScore;
};
