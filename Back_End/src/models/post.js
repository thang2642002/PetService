const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Post extends Model {}

  Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_date: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Post",
      timestamps: true, // Tự động cập nhật `createdAt` và `updatedAt`
    }
  );

  return Post;
};
