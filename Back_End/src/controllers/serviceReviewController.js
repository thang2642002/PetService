import serviceReviewService from "../services/serviceReviewService.js";
const getAllServiceReview = async (req, res) => {
  try {
    const getAllServiceReview =
      await serviceReviewService.getAllServiceReview();
    if (getAllServiceReview) {
      return res.status(200).json({
        message: "Get all service review is the success",
        errCode: 0,
        data: getAllServiceReview,
      });
    } else {
      return res.status(400).json({
        message: "Get all service review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all service review is the fails",
      errCode: -1,
    });
  }
};

const createServiceReview = async (req, res) => {
  try {
    const { service_id, user_id, rating, comment } = req.body;
    const createServiceReview = await serviceReviewService.createServiceReview(
      service_id,
      user_id,
      rating,
      comment
    );

    if (createServiceReview) {
      return res.status(200).json({
        message: "Create service review is the success",
        errCode: 0,
        data: getAllServiceReview,
      });
    } else {
      return res.status(400).json({
        message: "Create service review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create service review is the fails",
      errCode: -1,
    });
  }
};

const updateServiceReview = async (req, res) => {
  try {
    const service_review_id = req.params.id;
    const { service_id, user_id, rating, comment } = req.body;
    const updateServiceReview = await serviceReviewService.updateServiceReview(
      service_review_id,
      service_id,
      user_id,
      rating,
      comment
    );
    if (updateServiceReview) {
      return res.status(200).json({
        message: "Update service review is the success",
        errCode: 0,
        data: getAllServiceReview,
      });
    } else {
      return res.status(400).json({
        message: "Update service review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update service review is the fails",
      errCode: -1,
    });
  }
};

const deleteServiceReview = async (req, res) => {
  try {
    const service_review_id = req.params.id;
    const deleteServiceReview = await serviceReviewService.deleteServiceReview(
      service_review_id
    );
    if (deleteServiceReview) {
      return res.status(200).json({
        message: "Delete service review is the success",
        errCode: 0,
        data: getAllServiceReview,
      });
    } else {
      return res.status(400).json({
        message: "Delete service review is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete service review is the fails",
      errCode: -1,
    });
  }
};

export default {
  getAllServiceReview,
  createServiceReview,
  updateServiceReview,
  deleteServiceReview,
};
