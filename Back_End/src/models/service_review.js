"use strict";
export default (sequelize, DataTypes) => {
  const Service_Review = sequelize.define(
    "Service_Review", // Tên model
    {
      service_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "service_reviews", // Tên bảng (đảm bảo đúng)
      timestamps: true, // Tự động tạo các trường createdAt và updatedAt
    }
  );

  // Định nghĩa mối quan hệ giữa các bảng
  Service_Review.associate = function (models) {
    Service_Review.belongsTo(models.Services, {
      foreignKey: "service_id", // Khóa ngoại liên kết với bảng Services
      as: "service",
    });
    Service_Review.belongsTo(models.User, {
      foreignKey: "user_id", // Khóa ngoại liên kết với bảng User
      as: "user",
    });
  };

  return Service_Review;
};
