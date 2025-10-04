"use strict";
export default (sequelize, DataTypes) => {
  const Pet_Image = sequelize.define(
    "Pet_Image",
    {
      image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pet_id: {
        type: DataTypes.UUID,
        references: {
          model: "Pets",
          key: "pet_id",
        },
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: "Pet_Image",
      timestamps: true,
    }
  );

  Pet_Image.associate = function (models) {
    Pet_Image.belongsTo(models.Pets, {
      foreignKey: "pet_id",
      as: "pets",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Pet_Image;
};
