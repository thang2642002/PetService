import db from "../models/index";

const getAllProductReview = async () => {
  try {
    const getAllProductReview = await db.Product_Review.findAll({
      include: [
        { model: db.User, as: "user" },
        { model: db.Products, as: "product" },
      ],
    });
    return getAllProductReview;
  } catch (error) {
    console.log(error);
  }
};

const createProductReview = async (rating, comment, user_id, product_id) => {
  try {
    const createProductReview = await db.Product_Review.create({
      rating,
      comment,
      user_id,
      product_id,
    });
    return createProductReview;
  } catch (error) {
    console.log(error);
  }
};

const updateProductReview = async (
  product_review_id,
  rating,
  comment,
  user_id,
  product_id
) => {
  try {
    const updateProductReview = await db.Product_Review.findByPk(
      product_review_id
    );
    if (!updateProductReview) {
      return null;
    }
    await updateProductReview.update({
      rating,
      comment,
      user_id,
      product_id,
    });
    return updateProductReview;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductReview = async (product_review_id) => {
  try {
    const deleteProductReview = await db.Product_Review.destroy({
      where: { product_review_id: product_review_id },
    });
    return deleteProductReview;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProductReview,
  createProductReview,
  updateProductReview,
  deleteProductReview,
};
