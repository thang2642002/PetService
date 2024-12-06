import db from "../models/index";
const { Op } = require("sequelize");
const getAllCategory = async () => {
  try {
    const getAllCategory = await db.Category.findAll();
    return getAllCategory;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (name, description) => {
  try {
    const createCategory = await db.Category.create({ name, description });
    return createCategory;
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (category_id, name, description) => {
  try {
    const updateCategory = await db.Category.findByPk(category_id);
    if (!updateCategory) {
      return null;
    }
    updateCategory.name = name;
    updateCategory.description = description;
    updateCategory.save();
    return updateCategory;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (category_id) => {
  try {
    const deleteCategory = await db.Category.destroy({
      where: { category_id: category_id },
    });
    return deleteCategory;
  } catch (error) {
    console.log(error);
  }
};

const findByName = async (name) => {
  try {
    const nameCategory = await db.Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return nameCategory;
  } catch (error) {
    console.log(error);
  }
};

const findById = async (category_id) => {
  try {
    const findById = await db.Category.findByPk(category_id);
    return findById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  findByName,
  findById,
  updateCategory,
};
