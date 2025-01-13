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
    const { symptoms, disease_name, care_suggestions } = req.body;
    const createPetScores = await petScoresService.createPetScores(
      symptoms,
      disease_name,
      care_suggestions
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
    const { symptoms, disease_name, care_suggestions } = req.body;
    const updatePetScores = await petScoresService.updatePetScores(
      score_id,
      symptoms,
      disease_name,
      care_suggestions
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

const checkHealth = async (req, res) => {
  try {
    const { symptoms } = req.body;
    const result = await petScoresService.checkPetHealth(symptoms);
    if (result) {
      return res.status(200).json({
        errCode: 0,
        message: "Gợi ý chẩn đoán và chăm sóc",
        data: result,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Sai dữ liệu",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi server",
      data: result,
    });
  }
};

module.exports = {
  getAllPetScores,
  createPetScores,
  updatePetScores,
  deletePetScores,
  checkHealth,
};
