import db from "../models/index";

const getAllPetReview = async () => {
  try {
    const getAllPetReview = await db.Pet_Review.findAll({
      include: [
        { model: db.User, as: "user" },
        { model: db.Pets, as: "pet" },
      ],
    });
    return getAllPetReview;
  } catch (error) {
    console.log(error);
  }
};

const getPetReviewById = async (id) => {
  try {
    const data = await db.Pet_Review.findAll({
      where: { pet_id: id },
      order: [["createdAt", "DESC"]],
      include: [
        { model: db.User, as: "user" },
        { model: db.Pets, as: "pet" },
      ],
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPetReview = async (rating, comment, user_id, pet_id) => {
  try {
    const createPetReview = await db.Pet_Review.create({
      rating,
      comment,
      user_id,
      pet_id,
    });
    return createPetReview;
  } catch (error) {
    console.log(error);
  }
};

const updatePetReview = async (
  pet_review_id,
  rating,
  comment,
  user_id,
  pet_id
) => {
  try {
    const updatePetReview = await db.Pet_Review.findByPk(pet_review_id);
    if (!updatePetReview) {
      return null;
    }
    await updatePetReview.update({
      rating,
      comment,
      user_id,
      pet_id,
    });
    return updatePetReview;
  } catch (error) {
    console.log(error);
  }
};

const deletePetReview = async (pet_review_id) => {
  try {
    const deletePetReview = await db.Pet_Review.destroy({
      where: { pet_review_id: pet_review_id },
    });
    return deletePetReview;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPetReview,
  getPetReviewById,
  createPetReview,
  updatePetReview,
  deletePetReview,
};
