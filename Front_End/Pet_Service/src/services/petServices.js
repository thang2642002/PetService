import axios from "../configs/axiosCustommize";

const getAllPets = () => {
  return axios.get("/pet/get-all-pet");
};

const getByName = (name) => {
  return axios.get(`/pet/find-by-name?name=${name}`);
};

const createPets = (
  name,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  price,
  available,
  pet_type_id,
  images
) => {
  const dataPet = new FormData();
  dataPet.append("name", name);
  dataPet.append("age", age);
  dataPet.append("height", height);
  dataPet.append("weight", weight);
  dataPet.append("coat_color", coat_color);
  dataPet.append("breed", breed);
  dataPet.append("description", description);
  dataPet.append("price", price);
  dataPet.append("available", available);
  dataPet.append("pet_type_id", pet_type_id);
  images.forEach((image) => {
    dataPet.append("images", image);
  });

  return axios.post("/pet/create-pet", dataPet);
};

const updatePet = (
  pet_id,
  name,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  price,
  available,
  pet_type_id,
  images
) => {
  const dataPet = new FormData();
  dataPet.append("name", name);
  dataPet.append("age", age);
  dataPet.append("height", height);
  dataPet.append("weight", weight);
  dataPet.append("coat_color", coat_color);
  dataPet.append("breed", breed);
  dataPet.append("description", description);
  dataPet.append("price", price);
  dataPet.append("available", available);
  dataPet.append("pet_type_id", pet_type_id);
  images.forEach((image) => {
    dataPet.append("images", image);
  });
  return axios.put(`/pet/update-pet/${pet_id}`, dataPet);
};

const getPetById = (pet_id) => {
  return axios.get(`/pet/find-by-id/${pet_id}`, { data: { pet_id } });
};

const getCountPet = () => {
  return axios.get("/pet/count-pet");
};

const deletePet = (pet_id) => {
  return axios.delete(`/pet/delete-pet/${pet_id}`, { data: { pet_id } });
};
export {
  getAllPets,
  getByName,
  createPets,
  updatePet,
  deletePet,
  getPetById,
  getCountPet,
};
