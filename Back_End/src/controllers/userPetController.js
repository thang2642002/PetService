import userPetService from "../services/userPetService";
const getAllUserPet = async (req, res) => {
  try {
    const getAllUserPet = await userPetService.getAllUserPet();
    if (getAllUserPet) {
      return res.status(200).json({
        message: "Get all user pet is the success",
        errCode: 0,
        data: getAllUserPet,
      });
    } else {
      return res.status(400).json({
        message: "Get all user pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all user pet is the fails",
      errCode: -1,
    });
  }
};

const createUserPet = async (req, res) => {
  try {
    const {
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id,
    } = req.body;
    const createUserPet = await userPetService.createUserPet(
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id
    );
    if (createUserPet) {
      return res.status(200).json({
        message: "Create user pet is the success",
        errCode: 0,
        data: createUserPet,
      });
    } else {
      return res.status(400).json({
        message: "Create user pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create user pet is the fails",
      errCode: -1,
    });
  }
};
const updateUserPet = async (req, res) => {
  try {
    const user_pet_id = req.params.id;
    const {
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id,
    } = req.body;
    const updateUserPet = await userPetService.updateUserPet(
      user_pet_id,
      name_pet,
      age,
      height,
      weight,
      coat_color,
      breed,
      description,
      user_id
    );
    if (updateUserPet) {
      return res.status(200).json({
        message: "Update user pet is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update user pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update user pet is the fails",
      errCode: -1,
    });
  }
};

const deleteUserPet = async (req, res) => {
  try {
    const user_pet_id = req.params.id;
    const deleteUserPet = await userPetService.deleteUserPet(user_pet_id);
    if (deleteUserPet) {
      return res.status(200).json({
        message: "Delete user pet is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete user pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete user pet is the fails",
      errCode: -1,
    });
  }
};

const findByName = async (req, res) => {
  try {
    const { name_pet } = req.query;
    console.log(req.query);
    const findByName = await userPetService.findByName(name_pet);
    if (findByName) {
      return res.status(200).json({
        message: "Find user pet is the success",
        errCode: 0,
        data: findByName,
      });
    } else {
      return res.status(400).json({
        message: "Find user pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find user pet is the fails",
      errCode: -1,
    });
  }
};
module.exports = {
  getAllUserPet,
  createUserPet,
  updateUserPet,
  deleteUserPet,
  findByName,
};
