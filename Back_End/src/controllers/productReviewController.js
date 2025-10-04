import productReviewService from "../services/productReviewService.js";
const getAllProductReview = async (req, res) => {
  try {
    const getAllProductReview =
      await productReviewService.getAllProductReview();
    if (getAllProductReview) {
      return res.status(200).json({
        message: "Get all product review is the success",
        errCode: 0,
        data: getAllProductReview,
      });
    } else {
      return res.status(400).json({
        message: "Get all product review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Server error, Get all product review is the fails",
      errCode: -1,
    });
  }
};

const getByProductReviewId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productReviewService.getProductReviewById(id);
    if (data) {
      return res.status(200).json({
        message: "Get product review by id is the success",
        errCode: 0,
        data: data,
      });
    } else {
      return res.status(400).json({
        message: "Get product review by id is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Server error, Get product review by id is the fails",
      errCode: -1,
    });
  }
};

const createProductReview = async (req, res) => {
  try {
    const { rating, comment, user_id, product_id } = req.body;
    const createProductReview = await productReviewService.createProductReview(
      rating,
      comment,
      user_id,
      product_id
    );
    if (createProductReview) {
      return res.status(200).json({
        message: "Create product review is the success",
        errCode: 0,
        data: getAllProductReview,
      });
    } else {
      return res.status(400).json({
        message: "Create product review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Server error, Create product review is the fails",
      errCode: -1,
    });
  }
};

const updateProductReview = async (req, res) => {
  try {
    const product_review_id = req.params.id;
    const { rating, comment, user_id, product_id } = req.body;
    const updateProductReview = await productReviewService.updateProductReview(
      product_review_id,
      rating,
      comment,
      user_id,
      product_id
    );
    if (updateProductReview) {
      return res.status(200).json({
        message: "Update product review is the success",
        errCode: 0,
        data: getAllProductReview,
      });
    } else {
      return res.status(400).json({
        message: "Update product review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Server error, Update product review is the fails",
      errCode: -1,
    });
  }
};

const deleteProductReview = async (req, res) => {
  try {
    const product_review_id = req.params.id;
    const deleteProductReview = await productReviewService.deleteProductReview(
      product_review_id
    );
    if (deleteProductReview) {
      return res.status(200).json({
        message: "Delete product review is the success",
        errCode: 0,
        data: getAllProductReview,
      });
    } else {
      return res.status(400).json({
        message: "Delete product review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Server error, Delete product review is the fails",
      errCode: -1,
    });
  }
};

export default {
  getAllProductReview,
  getByProductReviewId,
  createProductReview,
  updateProductReview,
  deleteProductReview,
};
