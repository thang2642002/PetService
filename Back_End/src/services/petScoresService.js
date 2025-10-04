import db from "../models/index.js";
import { Op } from "sequelize";
const getAllPetScores = async () => {
  try {
    const getAllPetScores = await db.PetScore.findAll();
    return getAllPetScores;
  } catch (error) {
    console.log(error);
  }
};

const createPetScores = async (symptoms, disease_name, care_suggestions) => {
  try {
    const createPetScores = await db.PetScore.create({
      symptoms,
      disease_name,
      care_suggestions,
    });
    return createPetScores;
  } catch (error) {
    console.log(error);
  }
};

const updatePetScores = async (
  score_id,
  symptoms,
  disease_name,
  care_suggestions
) => {
  try {
    const updatePetScores = await db.PetScore.findByPk(score_id);
    if (!updatePetScores) {
      return null;
    }
    await updatePetScores.update({
      symptoms,
      disease_name,
      care_suggestions,
    });
    return updatePetScores;
  } catch (error) {
    console.log(error);
  }
};

const deletePetScores = async (score_id) => {
  try {
    const deletePetScores = await db.PetScore.destroy({
      where: { score_id: score_id },
    });
    return deletePetScores;
  } catch (error) {
    console.log(error);
  }
};

const checkPetHealth = async (symptoms) => {
  if (!symptoms) {
    throw new Error("Hãy nhập triệu chứng!");
  }

  const matchingScores = await db.PetScore.findAll({
    where: { symptoms: { [Op.like]: `%${symptoms}%` } },
  });

  if (matchingScores.length === 0) {
    throw new Error("Không tìm thấy kết quả phù hợp!");
  }

  return matchingScores.map((score) => ({
    disease_name: score.disease_name,
    care_suggestions: score.care_suggestions,
  }));
};

export default {
  getAllPetScores,
  createPetScores,
  updatePetScores,
  deletePetScores,
  checkPetHealth,
};
