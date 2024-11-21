import petScoresService from "../services/petScoresService";

const getAllPetScores = async (req, res) => {
  try {
    const getAllPetScores = await petScoresService.getAllPetScores();
    if (getAllPetScores) {
      return res.status(200).json({
        message: "Get all pet scores is the success",
        errCode: 0,
        data: getAllPetScores,
      });
    } else {
      return res.status(400).json({
        message: "Get all pet scores is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all pet scores is the fails",
      errCode: -1,
    });
  }
};

const createPetScores = async (req, res) => {
  try {
    const {
      // score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id,
    } = req.body;
    const createPetScores = await petScoresService.createPetScores(
      // score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id
    );
    if (createPetScores) {
      return res.status(200).json({
        message: "Create  pet scores is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create pet scores is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create pet scores is the fails",
      errCode: -1,
    });
  }
};

const updatePetScores = async (req, res) => {
  try {
    const score_id = req.params.id;
    console.log(score_id);
    const {
      score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id,
    } = req.body;
    const updatePetScores = await petScoresService.updatePetScores(
      score_id,
      score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id
    );
    if (updatePetScores) {
      return res.status(200).json({
        message: "Update  pet scores is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update pet scores is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update pet scores is the fails",
      errCode: -1,
    });
  }
};

const deletePetScores = async (req, res) => {
  try {
    const score_id = req.params.id;
    const deletePetScores = await petScoresService.deletePetScores(score_id);
    if (deletePetScores) {
      return res.status(200).json({
        message: "Delete  pet scores is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete pet scores is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete pet scores is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllPetScores,
  createPetScores,
  updatePetScores,
  deletePetScores,
};
