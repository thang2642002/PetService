import axios from "../configs/axiosCustommize";

const getAllPost = () => {
  return axios.get("/post/get-all-post");
};

const getPostById = (post_id) => {
  return axios.get(`/post/get-post-by-id/${post_id}`);
};

const getCountPost = () => {
  return axios.get("/post/count-post");
};

const createPost = (title, desc_title, content, image) => {
  const dataPost = new FormData();
  dataPost.append("title", title);
  dataPost.append("desc_title", desc_title);
  dataPost.append("content", content);
  dataPost.append("image", image);
  return axios.post("/post/create-post", dataPost);
};

const updatePost = (post_id, title, desc_title, content, imageFile) => {
  const dataPost = new FormData();
  dataPost.append("title", title);
  dataPost.append("desc_title", desc_title);
  dataPost.append("content", content);
  dataPost.append("image", imageFile);
  console.log("check dataPost", dataPost);
  return axios.put(`/post/update-post/${post_id}`, dataPost);
};

const deletePost = (post_id) => {
  return axios.delete(`/post/delete-post/${post_id}`, { data: { post_id } });
};

export {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getCountPost,
  getPostById,
};
