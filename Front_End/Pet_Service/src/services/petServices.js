import axios from "../configs/axiosCustommize";

const getAllPets = () => {
  return axios.get("/pet/get-all-pet");
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

const deletePet = (pet_id) => {
  return axios.delete(`/pet/delete-pet/${pet_id}`, { data: { pet_id } });
};
export { getAllPets, createPets, deletePet };
