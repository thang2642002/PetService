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

const getAllProduct = async () => {
  try {
    const getAllProduct = await db.Products.findAll({
      include: [
        { model: db.Category, as: "category" },
        {
          model: db.Product_Image,
          as: "product_images",
          attributes: ["image_url"],
        },
      ],
    });
    return getAllProduct;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (
  name,
  description,
  price,
  category_id,
  stock,
  images
) => {
  try {
    const createdProduct = await db.Products.create({
      name,
      description,
      price,
      category_id,
      stock,
    });
    if (images && images.length > 0) {
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image);
        await db.Product_Image.create({
          product_id: createdProduct.product_id,
          image_url: imageUrl,
        });
      }
    }

    return createdProduct;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (
  product_id,
  name,
  description,
  price,
  category_id,
  stock,
  images
) => {
  try {
    const updateProduct = await db.Products.findByPk(product_id);
    if (!updateProduct) {
      return null;
    }
    await updateProduct.update({
      name,
      description,
      price,
      category_id,
      stock,
    });
    if (images && images.length > 0) {
      await db.Product_Image.destroy({ where: { product_id: product_id } });
      for (let image of images) {
        const imageUrl = await uploadImageToCloudinary(image); // Upload ảnh lên Cloudinary
        await db.Product_Image.create({
          product_id: product_id,
          image_url: imageUrl,
        });
      }
    }
    return updateProduct;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (product_id) => {
  try {
    const product = await db.Products.findByPk(product_id, {
      include: [{ model: db.Product_Image, as: "product_images" }],
    });
    console.log("product", product);
    if (!product) {
      return null;
    }
    for (let image of product.product_images) {
      const public_id = image.image_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id);
      await image.destroy();
    }

    const deletedProduct = await product.destroy();
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
};

const findByName = async (name) => {
  try {
    const findByName = await db.Products.findAll({
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

const findById = async (product_id) => {
  try {
    const findById = await db.Products.findByPk(product_id);
    return findById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  findByName,
  findById,
};
