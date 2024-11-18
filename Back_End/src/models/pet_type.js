const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Pet_Type extends Model {}

  Pet_Type.init(
    {
      pet_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
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
      modelName: 'Pet_Type',
      tableName: 'Pet_Type',
      timestamps: true,
    }
  );

  // Thiết lập mối quan hệ hasMany với bảng Pets
  Pet_Type.associate = (models) => {
    Pet_Type.hasMany(models.Pets, {
      foreignKey: 'pet_type_id',
      as: 'pets',
    });
  };

  return Pet_Type;
};
