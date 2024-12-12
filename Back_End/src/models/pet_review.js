"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pet_Review = sequelize.define(
    "Pet_Review",
    {
      pet_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pet_id: {
        type: DataTypes.UUID,
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
      tableName: "Pet_Review",
      timestamps: true,
    }
  );

  Pet_Review.associate = function (models) {
    // Mối quan hệ với User
    Pet_Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Mối quan hệ với Pets
    Pet_Review.belongsTo(models.Pets, {
      foreignKey: "pet_id",
      as: "pet",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Pet_Review;
};
