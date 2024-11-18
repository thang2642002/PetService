import db from "../models/index";
const { Op } = require("sequelize");
const getAllPetType = async () => {
  try {
    const allPetType = await db.Pet_Type.findAll();
    return allPetType;
  } catch (error) {
    console.log(error);
  }
};

const createPetType = async (type_name, description) => {
  try {
    const createPetType = await db.Pet_Type.create({ type_name, description });
    if (createPetType) {
      return createPetType;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePetType = async (pet_type_id, type_name, description) => {
  try {
    const updatePetType = await db.Pet_Type.findByPk(pet_type_id);
    if (!updatePetType) {
      return null;
    }
    updatePetType.type_name = type_name;
    updatePetType.description = description;
    await updatePetType.save();
    return updatePetType;
  } catch (error) {
    console.log(error);
  }
};

const deletePetType = async (id) => {
  try {
    const deletePetType = await db.Pet_Type.destroy({
      where: { pet_type_id: id },
    });
    return deletePetType;
  } catch (error) {
    console.log(error);
  }
};

const getByName = async (type_name) => {
  const name = await db.Pet_Type.findAll({
    where: {
      type_name: {
        [Op.like]: `%${type_name}%`,
      },
    },
  });
  return name;
};

const getById = async (id) => {
  try {
    const findById = await db.Pet_Type.findByPk(id);
    return findById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPetType,
  createPetType,
  updatePetType,
  deletePetType,
  getByName,
  getById,
};
