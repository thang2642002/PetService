import postService from "../services/postService.js";

const getAllPost = async (req, res) => {
  try {
    const getAllPost = await postService.getAllPost();
    if (getAllPost) {
      return res.status(200).json({
        message: "Get all post is the success",
        errCode: 0,
        data: getAllPost,
      });
    } else {
      return res.status(400).json({
        message: "Get all post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all post is the fails",
      errCode: -1,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, desc_title, content } = req.body;
    const image = req.file ? req.file.path : null;
    const createPost = await postService.createPost(
      title,
      desc_title,
      content,
      image
    );
    if (createPost) {
      return res.status(200).json({
        message: "Create post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create post is the fails",
      errCode: -1,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { title, desc_title, content } = req.body;
    const imageFile = req.file;
    console.log("check imageFile:", imageFile);
    const updatePost = await postService.updatePost(
      post_id,
      title,
      desc_title,
      content,
      imageFile
    );
    if (updatePost) {
      return res.status(200).json({
        message: "Update post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update post is the fails",
      errCode: -1,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const deletePost = await postService.deletePost(post_id);
    if (deletePost) {
      return res.status(200).json({
        message: "Delete post is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete post is the fails",
      errCode: -1,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post_id = req.params.id;
    const getPostById = await postService.getPostById(post_id);
    if (getPostById) {
      return res.status(200).json({
        message: "Get post is the success",
        errCode: 0,
        data: getPostById,
      });
    } else {
      return res.status(400).json({
        message: "Get post is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get post is the fails",
      errCode: -1,
    });
  }
};

const countPost = async (req, res) => {
  try {
    const countPost = await postService.countPost();
    if (countPost) {
      return res.status(200).json({
        message: "Count post is the success",
        errCode: 0,
        data: countPost,
      });
    } else {
      return res.status(400).json({
        message: "Count post is the success",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Count post is the success",
      errCode: -1,
    });
  }
};

export default {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  countPost,
};
