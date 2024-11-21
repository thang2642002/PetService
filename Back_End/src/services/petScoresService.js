import db from "../models/index";
const getAllPetScores = async () => {
  try {
    const getAllPetScores = await db.PetScore.findAll({
      include: [{ model: db.UserPet, as: "user_pet" }],
    });
    return getAllPetScores;
  } catch (error) {
    console.log(error);
  }
};

const createPetScores = async (
  // score_date,
  health_score,
  diet,
  height,
  weight,
  note,
  user_pet_id
) => {
  try {
    const createPetScores = await db.PetScore.create({
      // score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id,
    });
    return createPetScores;
  } catch (error) {
    console.log(error);
  }
};

const updatePetScores = async (
  score_id,
  score_date,
  health_score,
  diet,
  height,
  weight,
  note,
  user_pet_id
) => {
  try {
    const updatePetScores = await db.PetScore.findByPk(score_id);
    if (!updatePetScores) {
      return null;
    }
    await updatePetScores.update({
      score_date,
      health_score,
      diet,
      height,
      weight,
      note,
      user_pet_id,
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

module.exports = {
  getAllPetScores,
  createPetScores,
  updatePetScores,
  deletePetScores,
};
