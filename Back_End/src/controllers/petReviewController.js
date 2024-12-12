import petReviewService from "../services/petReviewServices";
const getAllPetReview = async (req, res) => {
  try {
    const getAllPetReview = await petReviewService.getAllPetReview();
    if (getAllPetReview) {
      return res.status(200).json({
        message: "Get all product review is the success",
        errCode: 0,
        data: getAllPetReview,
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

const getByPetReviewId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await petReviewService.getPetReviewById(id);
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

const createPetReview = async (req, res) => {
  try {
    const { rating, comment, user_id, pet_id } = req.body;
    const createPetReview = await petReviewService.createPetReview(
      rating,
      comment,
      user_id,
      pet_id
    );
    if (createPetReview) {
      return res.status(200).json({
        message: "Create product review is the success",
        errCode: 0,
        data: createPetReview,
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

const updatePetReview = async (req, res) => {
  try {
    const pet_review_id = req.params.id;
    const { rating, comment, user_id, pet_id } = req.body;
    const updatePetReview = await petReviewService.updatePetReview(
      pet_review_id,
      rating,
      comment,
      user_id,
      pet_id
    );
    if (updatePetReview) {
      return res.status(200).json({
        message: "Update product review is the success",
        errCode: 0,
        data: updatePetReview,
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

const deletePetReview = async (req, res) => {
  try {
    const pet_review_id = req.params.id;
    const deletePetReview = await petReviewService.deletePetReview(
      pet_review_id
    );
    if (deletePetReview) {
      return res.status(200).json({
        message: "Delete product review is the success",
        errCode: 0,
        data: deletePetReview,
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

module.exports = {
  getAllPetReview,
  getByPetReviewId,
  createPetReview,
  updatePetReview,
  deletePetReview,
};
