import petServive from "../services/petService";

const getAllPet = async (req, res) => {
  try {
    const getAllPet = await petServive.getAllPet();
    if (getAllPet) {
      return res.status(200).json({
        message: "Get all pet is the success",
        errCode: 0,
        data: getAllPet,
      });
    } else {
      return res.status(400).json({
        message: "Get all pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all pet is the fails",
      errCode: -1,
    });
  }
};

const createPet = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const images = req.files;
    const createPet = await petServive.createPet(
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
      images ? images.map((file) => file.path) : []
    );
    if (createPet) {
      return res.status(200).json({
        message: "Create pet is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create pet is the fails",
      errCode: -1,
    });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet_id = req.params.id;
    const {
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
    } = req.body;
    const images = req.files;
    const updatePet = await petServive.updatePet(
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
      images ? images.map((file) => file.path) : []
    );
    if (updatePet) {
      return res.status(200).json({
        message: "Update pet is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update pet is the fails",
      errCode: -1,
    });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet_id = req.params.id;
    const deletePet = await petServive.deletePet(pet_id);
    if (deletePet) {
      return res.status(200).json({
        message: "Delete pet is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete pet is the fails",
      errCode: -1,
    });
  }
};

const findByName = async (req, res) => {
  try {
    const { name } = req.query;
    const findByName = await petServive.findByName(name);
    if (findByName) {
      return res.status(200).json({
        message: "Find pet is the success",
        errCode: 0,
        data: findByName,
      });
    } else {
      return res.status(400).json({
        message: "Find pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find pet is the fails",
      errCode: -1,
    });
  }
};

const findById = async (req, res) => {
  try {
    const pet_id = req.params.id;
    const findById = await petServive.findById(pet_id);
    if (findById) {
      return res.status(200).json({
        message: "Find pet is the success",
        errCode: 0,
        data: findById,
      });
    } else {
      return res.status(400).json({
        message: "Find pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find pet is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllPet,
  createPet,
  updatePet,
  deletePet,
  findByName,
  findById,
};
