import db from "../models/index";
import { cloudinary } from "../config/cloudinaryConfig";
const getAllPost = async () => {
  try {
    const getAllPost = await db.Post.findAll();
    return getAllPost;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (title, content, image) => {
  try {
    const createPost = await db.Post.create({
      title,
      content,
      image,
      created_date: new Date().toISOString(),
    });
    return createPost;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (post_id, title, content, imageFile) => {
  try {
    const updatePost = await db.Post.findByPk(post_id);
    console.log(updatePost.title);
    if (!updatePost) {
      return null;
    }
    updatePost.title = title;
    updatePost.content = content;
    updatePost.created_date = new Date().toISOString();
    if (imageFile) {
      const result = await cloudinary.uploader.upload(avatarFile.path, {
        folder: "uploads_image",
      });
      user.image = result.secure_url;
    }

    updatePost.save();
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

const countPost = async () => {
  try {
    const postCount = await db.Post.count();
    return postCount;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPost, createPost, updatePost, deletePost, countPost };
