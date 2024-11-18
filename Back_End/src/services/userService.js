import db from "../models/index";
const { Op } = require("sequelize");
import { cloudinary } from "../config/cloudinaryConfig";
const getAllUser = async () => {
  try {
    const dataUser = await db.User.findAll();
    return dataUser;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (
  email,
  password,
  user_name,
  phone,
  address,
  role,
  avatar
) => {
  try {
    const dataUser = await db.User.create({
      email,
      password,
      user_name,
      phone,
      address,
      role,
      avatar,
    });

    return dataUser;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (
  user_id,
  email,
  password,
  user_name,
  phone,
  address,
  role,
  avatarFile
) => {
  try {
    const user = await db.User.findByPk(user_id);
    if (!user) {
      return null;
    }
    user.email = email;
    user.password = password;
    user.user_name = user_name;
    user.address = address;
    user.phone = phone;
    user.role = role;
    if (avatarFile) {
      const result = await cloudinary.uploader.upload(avatarFile.path, {
        folder: "uploads_image",
      });

      user.avatar = result.secure_url;
    }
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return null;
    }
    if (user.avatar) {
      const publicId = user.avatar.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    const result = await db.User.destroy({
      where: { user_id: id },
    });

    return result; // Trả về kết quả
  } catch (error) {
    console.log(error);
  }
};

const findName = async (user_name) => {
  const name = await db.User.findAll({
    where: {
      user_name: {
        [Op.like]: `%${user_name}%`,
      },
    },
  });
  if (!name) {
    return null;
  }
  return name;
};

const findById = async (user_id) => {
  console.log(user_id);
  try {
    const user = await db.User.findOne({
      where: { user_id: user_id },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  findName,
  findById,
};
