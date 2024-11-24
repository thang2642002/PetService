import db from "../models/index";
const { Op } = require("sequelize");
import { cloudinary } from "../config/cloudinaryConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const accessTokenSecret = process.env.ACCESS_TOKENS;
const refreshTokenSecret = process.env.REFRESH_TOKENS;

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
    var salt = bcrypt.genSaltSync(10);
    var hashPass = bcrypt.hashSync(password, salt);
    const dataUser = await db.User.create({
      email,
      password: hashPass,
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

    return result;
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

const handleRegister = async (email, user_name, phone, address, password) => {
  const existingUser = await db.User.findOne({ where: { email: email } });
  if (existingUser) {
    return { message: "User already exists" };
  }
  var salt = bcrypt.genSaltSync(10);
  var hashPass = bcrypt.hashSync(password, salt);
  const newUser = await db.User.create({
    email: email,
    user_name: user_name,
    phone: phone,
    address: address,
    password: hashPass,
    role: "customer",
  });
  return {
    message: "User registered successfully",
    user: newUser,
  };
};

const handleLogin = async (email, password) => {
  try {
    const login = await db.User.findOne({
      where: { email: email },
    });

    if (!login) {
      return {
        message: "User not found",
        errCode: 1,
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, login.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return {
        message: "Invalid email or password",
        errCode: 2,
      };
    }

    const accessToken = jwt.sign(
      { id: login.user_id, role: login.role },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: login.user_id, role: login.role },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    return {
      login,
      accessToken,
      refreshToken,
      errCode: 0,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      message: "An error occurred during login",
      errCode: -1,
    };
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  findName,
  findById,
  handleRegister,
  handleLogin,
};
