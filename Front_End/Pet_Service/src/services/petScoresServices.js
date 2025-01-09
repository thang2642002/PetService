import axios from "../configs/axiosCustommize";

const getAllPetScores = () => {
  return axios.get("/pet-scores/get-all-pet-scores");
};

const createPetScores = (symptoms, disease_name, care_suggestions) => {
  const data = { symptoms, disease_name, care_suggestions };
  return axios.post("/pet-scores/create-pet-scores", data);
};

const updatePetScores = (
  score_id,
  symptoms,
  disease_name,
  care_suggestions
) => {
  const data = { symptoms, disease_name, care_suggestions };
  return axios.put(`/pet-scores/update-pet-scores/${score_id}`, data);
};

const deletePetScores = (score_id) => {
  return axios.delete(`/pet-scores/delete-pet-scores/${score_id}`, {
    data: { score_id },
  });
};

const checkHealth = (symptoms) => {
  return axios.post("/pet-scores/check-health", { symptoms });
};

export {
  getAllPetScores,
  createPetScores,
  updatePetScores,
  deletePetScores,
  checkHealth,
};
