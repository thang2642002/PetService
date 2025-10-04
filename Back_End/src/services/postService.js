import db from "../models/index.js";
import { cloudinary } from "../config/cloudinaryConfig.js";
const getAllPost = async () => {
  try {
    const getAllPost = await db.Post.findAll();
    return getAllPost;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (title, desc_title, content, image) => {
  try {
    const createPost = await db.Post.create({
      title,
      desc_title,
      content,
      image,
      created_date: new Date().toISOString(),
    });
    return createPost;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (post_id, title, desc_title, content, imageFile) => {
  try {
    const updatePost = await db.Post.findByPk(post_id);
    if (!updatePost) {
      return null;
    }
    updatePost.title = title;
    updatePost.desc_title = desc_title;
    updatePost.content = content;
    updatePost.created_date = new Date().toISOString();
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "uploads_image",
      });
      updatePost.image = result.secure_url;
    }

    await updatePost.save();
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (post_id) => {
  try {
    const deletePost = await db.Post.destroy({
      where: { post_id: post_id },
    });
    return deletePost;
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (post_id) => {
  try {
    const getPostById = await db.Post.findOne({
      where: { post_id: post_id },
    });
    return getPostById;
  } catch (error) {
    console.log(error);
  }
};

const countPost = async () => {
  try {
    const postCount = await db.Post.count();
    return postCount;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  countPost,
  getPostById,
};
