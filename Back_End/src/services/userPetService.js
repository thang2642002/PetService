import db from "../models/index";
const { Op } = require("sequelize");
const getAllUserPet = async () => {
  try {
    const getAllUserPet = await db.UserPet.findAll({
      include: [{ model: db.User, as: "user" }],
    });
    return getAllUserPet;
  } catch (error) {
    console.log(error);
  }
};

const createUserPet = async (
  name_pet,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  user_id
) => {
  try {
    const createUserPet = await db.UserPet.create({
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id,
    });
    return createUserPet;
  } catch (error) {
    console.log(error);
  }
};

const updateUserPet = async (
  user_pet_id,
  name_pet,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  user_id
) => {
  try {
    const updateUserPet = await db.UserPet.findByPk(user_pet_id);
    if (!updateUserPet) {
      return null;
    }
    await updateUserPet.update({
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id,
    });
    return updateUserPet;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserPet = async (user_pet_id) => {
  try {
    const deleteUserPet = await db.UserPet.destroy({
      where: {
        user_pet_id: user_pet_id,
      },
    });
    return deleteUserPet;
  } catch (error) {
    console.log(error);
  }
};

const findByName = async (name_pet) => {
  try {
    console.log(name_pet);
    const name = await db.UserPet.findAll({
      where: {
        name_pet: {
          [Op.like]: `%${name_pet}%`,
        },
      },
      include: [
        {
          model: db.User,
          as: "user",
        },
      ],
    });

    if (!name || name.length === 0) {
      return null;
    }
    console.log(name);
    return name;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUserPet,
  createUserPet,
  updateUserPet,
  deleteUserPet,
  findByName,
};
