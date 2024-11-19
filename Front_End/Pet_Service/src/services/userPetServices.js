import axios from "../configs/axiosCustommize";

const getAllUserPet = () => {
  return axios.get("/user-pet/get-all-user-pet");
};

const createUserPet = (
  name_pet,
  age,
  height,
  weight,
  coat_color,
  breed,
  description,
  user_id
) => {
  const data = {
    name_pet,
    age,
    height,
    weight,
    coat_color,
    breed,
    description,
    user_id,
  };
  return axios.post("/user-pet/create-user-pet", data);
};

const deleteUserPet = (user_pet_id) => {
  return axios.delete(`/user-pet/delete-user-pet/${user_pet_id}`, {
    data: { user_pet_id },
  });
};

export { getAllUserPet, createUserPet, deleteUserPet };
