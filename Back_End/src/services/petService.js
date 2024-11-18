import db from "../models/index";
const { Op } = require("sequelize");
import { cloudinary } from "../config/cloudinaryConfig";

const uploadImageToCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "uploads_image",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Image upload to Cloudinary failed");
  }
};

const getAllPet = async () => {
  try {
    const getAllPet = await db.Pets.findAll({
      include: [
        { model: db.Pet_Type, as: "petType" },
        {
          model: db.Pet_Image,
          as: "pet_images",
          attributes: ["image_url"],
        },
      ],
    });
    return getAllPet;
  } catch (error) {
    console.log(error);
  }
};

const createPet = async (
  name,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  price,
  available,
  pet_type_id,
  images
) => {
  try {
    const createPet = await db.Pets.create({
      name,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      price,
      available,
      pet_type_id,
    });
    if (images && images.length > 0) {
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        await db.Pet_Image.create({
          pet_id: createPet.pet_id,
          image_url: imageUrl,
        });
      }
    }
    return createPet;
  } catch (error) {
    console.log(error);
  }
};

const updatePet = async (
  pet_id,
  name,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  price,
  available,
  pet_type_id,
  images
) => {
  try {
    const updatePet = await db.Pets.findByPk(pet_id);
    if (!updatePet) {
      return null;
    }
    await updatePet.update({
      name,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      price,
      available,
      pet_type_id,
    });
    if (images && images.length > 0) {
      await db.Pet_Image.destroy({ where: { pet_id: pet_id } });
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        await db.Pet_Image.create({
          pet_id: pet_id,
          image_url: imageUrl,
        });
      }
    }
    return updatePet;
  } catch (error) {
    console.log(error);
  }
};

const deletePet = async (pet_id) => {
  try {
    const deletePet = await db.Pets.findByPk(pet_id, {
      include: [{ model: db.Pet_Image, as: "pet_images" }],
    });
    if (!deletePet) {
      return null;
    }
    for (let image of deletePet.pet_images) {
      const public_id = image.image_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id);
      await image.destroy();
    }
    const deletedProductResult = await deletePet.destroy();
    return deletedProductResult;
  } catch (error) {}
};

const findByName = async (name) => {
  try {
    const findByName = await db.Pets.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (!findByName) {
      return null;
    }
    return findByName;
  } catch (error) {
    console.log(error);
  }
};

const findById = async (pet_id) => {
  try {
    const findById = await db.Pets.findByPk(pet_id);
    return findById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPet,
  createPet,
  updatePet,
  deletePet,
  findByName,
  findById,
};
