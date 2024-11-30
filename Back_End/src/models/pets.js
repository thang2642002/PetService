const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Pets extends Model {}

  Pets.init(
    {
      pet_id: {
        type: DataTypes.UUID, // Chuyển thành UUID
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Tự động sinh UUID
      },
      name: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      coat_color: {
        type: DataTypes.STRING,
      },
      breed: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      pet_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pet_Type",
          key: "pet_type_id",
        },
      },
      images: {
        type: DataTypes.JSON, // Dùng JSON để lưu danh sách URL ảnh
        allowNull: true,
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
      modelName: "Pets",
      tableName: "Pets",
      timestamps: true,
    }
  );

  // Thiết lập mối quan hệ belongsTo với bảng Pet_Type
  Pets.associate = (models) => {
    Pets.belongsTo(models.Pet_Type, {
      foreignKey: "pet_type_id",
      as: "petType",
    });

    Pets.hasMany(models.Pet_Image, {
      foreignKey: "pet_id",
      as: "pet_images",
    });

    Pets.hasMany(models.CartItem, {
      foreignKey: "item_id",
      constraints: false,
      scope: {
        item_type: "pet",
      },
      as: "pet",
    });

    Pets.hasMany(models.OrderItem, {
      foreignKey: "item_id",
      constraints: false,
      scope: {
        item_type: "pet",
      },
      as: "orderItems",
    });
  };

  return Pets;
};
