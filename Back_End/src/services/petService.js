import db from "../models/index.js";
import { Op } from "sequelize";
import { cloudinary } from "../config/cloudinaryConfig.js";

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
  stock,
  sex,
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
      stock,
      sex,
    });
    const imageUrls = [];
    if (images && images.length > 0) {
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        const newImage = await db.Pet_Image.create({
          pet_id: createPet.pet_id,
          image_url: imageUrl,
        });
        imageUrls.push(imageUrl);
      }
    }
    await createPet.update({
      images: imageUrls,
    });
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
  stock,
  sex,
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
      stock,
      sex,
    });
    if (images && images.length > 0) {
      await db.Pet_Image.destroy({ where: { pet_id: pet_id } });
      const imageUrls = [];
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        await db.Pet_Image.create({
          pet_id: pet_id,
          image_url: imageUrl,
        });
        imageUrls.push(imageUrl);
      }
      await updatePet.update({
        images: imageUrls,
      });
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

const countPet = async () => {
  try {
    const petCount = await db.Pets.count();
    return petCount;
  } catch (error) {
    console.log(error);
  }
};

const getPetsByBreed = async (breed) => {
  try {
    const pets = await db.Pets.findAll({
      where: {
        breed: breed,
      },
    });
    return pets;
  } catch (error) {
    console.log(error);
  }
};

const getAllBreed = async () => {
  try {
    const breeds = await db.Pets.findAll({
      attributes: ["breed"],
      group: ["breed"],
    });

    // Trả về danh sách các breed
    return breeds.map((breed) => breed.breed);
  } catch (error) {
    console.log(error);
  }
};
export default {
  getAllPet,
  createPet,
  updatePet,
  deletePet,
  findByName,
  findById,
  countPet,
  getPetsByBreed,
  getAllBreed,
};
