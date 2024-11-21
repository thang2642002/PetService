import axios from "../configs/axiosCustommize";

const getAllPetScores = () => {
  return axios.get("/pet-scores/get-all-pet-scores");
};

const createPetScores = (
  health_score,
  diet,
  height,
  weight,
  note,
  user_pet_id
) => {
  const data = { health_score, diet, height, weight, note, user_pet_id };
  return axios.post("/pet-scores/create-pet-scores", data);
};

const deletePetScores = (score_id) => {
  return axios.delete(`/pet-scores/delete-pet-scores/${score_id}`, {
    data: { score_id },
  });
};

export { getAllPetScores, createPetScores, deletePetScores };
