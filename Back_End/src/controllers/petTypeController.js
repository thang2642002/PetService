import petTypeService from "../services/petTypeService";

const getAllPetType = async (req, res) => {
  try {
    const getAllPetType = await petTypeService.getAllPetType();
    if (getAllPetType) {
      return res.status(200).json({
        message: "Get all pet type is the success",
        errCode: 0,
        data: getAllPetType,
      });
    } else {
      return res.status(400).json({
        message: "Get all pet type is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Server error, Get all pet type is the fails",
      errCode: -1,
    });
  }
};

const createPetType = async (req, res) => {
  try {
    const { type_name, description } = req.body;
    const createPetType = await petTypeService.createPetType(
      type_name,
      description
    );
    if (createPetType) {
      return res.status(200).json({
        message: "Create pet type is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create pet type is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Server error, Create pet type is the fails",
      errCode: -1,
    });
  }
};

const updatePetType = async (req, res) => {
  try {
    const pet_type_id = req.params.id;
    const { type_name, description } = req.body;
    const updatePetType = await petTypeService.updatePetType(
      pet_type_id,
      type_name,
      description
    );
    if (updatePetType) {
      return res.status(200).json({
        message: "Update pet type is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update pet type is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Server error, Update pet type is the fails",
      errCode: -1,
    });
  }
};

const deletePetType = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePetType = await petTypeService.deletePetType(id);
    if (deletePetType) {
      return res.status(200).json({
        message: "Delete pet type is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete pet type is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Server error, Delete pet type is the fails",
      errCode: -1,
    });
  }
};

const getByName = async (req, res) => {
  try {
    const { type_name } = req.query;
    const name = await petTypeService.getByName(type_name);

    if (name) {
      return res.status(200).json({
        message: "Find pet type is successful",
        errCode: 0,
        data: name,
      });
    } else {
      return res.status(404).json({
        message: "Find pet type failed, not found",
        errCode: 1,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error, Find pet type failed",
      errCode: -1,
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const findById = await petTypeService.getById(id);
    if (findById) {
      return res.status(200).json({
        message: "Find pet type is successful",
        errCode: 0,
        data: findById,
      });
    } else {
      return res.status(404).json({
        message: "Find pet type failed, not found",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find pet type failed",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllPetType,
  createPetType,
  updatePetType,
  deletePetType,
  getByName,
  getById,
};
