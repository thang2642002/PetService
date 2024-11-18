import db from "../models/index";
const getAllPost = async () => {
  try {
    const getAllPost = await db.Post.findAll();
    return getAllPost;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (title, content) => {
  try {
    const createPost = await db.Post.create({
      title,
      content,
    });
    return createPost;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (post_id, title, content) => {
  try {
    const updatePost = await db.Post.findByPk(post_id);
    console.log(updatePost.title);
    if (!updatePost) {
      return null;
    }
    updatePost.title = title;
    updatePost.content = content;
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

module.exports = { getAllPost, createPost, updatePost, deletePost };
