import db from "../models/index";
const getAllServiceReview = async () => {
  try {
    const getAllServiceReview = await db.Service_Review.findAll({
      include: [
        { model: db.Services, as: "service" },
        { model: db.User, as: "user" },
      ],
    });
    return getAllServiceReview;
  } catch (error) {
    console.log(error);
  }
};

const createServiceReview = async (service_id, user_id, rating, comment) => {
  try {
    const createServiceReview = await db.Service_Review.create({
      service_id,
      user_id,
      rating,
      comment,
    });

    return createServiceReview;
  } catch (error) {
    console.log(error);
  }
};

const updateServiceReview = async (
  service_review_id,
  service_id,
  user_id,
  rating,
  comment
) => {
  try {
    const updateServiceReview = await db.Service_Review.findByPk(
      service_review_id
    );
    if (!updateServiceReview) {
      return null;
    }
    updateServiceReview.update({
      service_id,
      user_id,
      rating,
      comment,
    });
    return updateServiceReview;
  } catch (error) {
    console.log(error);
  }
};

const deleteServiceReview = async (service_review_id) => {
  try {
    const deleteServiceReview = await db.Service_Review.destroy({
      where: { service_review_id: service_review_id },
    });
    return deleteServiceReview;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllServiceReview,
  createServiceReview,
  updateServiceReview,
  deleteServiceReview,
};
