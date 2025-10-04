"use strict";
export default (sequelize, DataTypes) => {
  const Appointments = sequelize.define(
    "Appointments",
    {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date_appointment: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time_date: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_pet_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appointment_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Đảm bảo mã này là duy nhất
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
      tableName: "Appointments",
      timestamps: true,
    }
  );

  Appointments.associate = function (models) {
    // Mối quan hệ với UserPet
    Appointments.belongsTo(models.UserPet, {
      foreignKey: "user_pet_id",
      as: "user_pet", // Tên cho mối quan hệ này
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Mối quan hệ với Services
    Appointments.belongsTo(models.Services, {
      foreignKey: "service_id",
      as: "service", // Tên cho mối quan hệ này
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Appointments;
};
