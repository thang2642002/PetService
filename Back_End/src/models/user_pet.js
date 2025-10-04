"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPet = sequelize.define(
    "UserPet",
    {
      user_pet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_pet: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coat_color: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      breed: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
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
      tableName: "user_pet",
      timestamps: true,
    }
  );

  UserPet.associate = function (models) {
    // Mối quan hệ với Appointments
    UserPet.hasMany(models.Appointments, {
      foreignKey: "user_pet_id",
      as: "appointments",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    // Mối quan hệ với User
    UserPet.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // Mối quan hệ với PetScore
    // UserPet.hasMany(models.PetScore, {
    //   foreignKey: "user_pet_id",
    //   as: "scores", // Tên cho mối quan hệ này
    //   onDelete: "CASCADE", // Khi user_pet bị xóa, các PetScore liên quan sẽ bị xóa
    //   onUpdate: "CASCADE", // Khi user_pet được cập nhật, các PetScore liên quan sẽ được cập nhật theo
    // });
  };

  return UserPet;
};
