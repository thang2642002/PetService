import e from "express";
import petService from "../services/petService.js";

const getAllPet = async (req, res) => {
  try {
    const getAllPet = await petService.getAllPet();
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
      stock,
      sex,
    } = req.body;
    const images = req.files;
    const createPet = await petService.createPet(
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
      stock,
      sex,
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
      stock,
      sex,
    } = req.body;
    const images = req.files;
    const updatePet = await petService.updatePet(
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
      stock,
      sex,
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
    const deletePet = await petService.deletePet(pet_id);
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
    const findByName = await petService.findByName(name);
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
    const findById = await petService.findById(pet_id);
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

const countPet = async (req, res) => {
  try {
    const countPet = await petService.countPet();
    if (countPet) {
      return res.status(200).json({
        message: "Count pet is the success",
        errCode: 0,
        data: countPet,
      });
    } else {
      return res.status(400).json({
        message: "Count pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Count pet is the fails",
      errCode: -1,
    });
  }
};

const getPetsByBreed = async (req, res) => {
  try {
    const { breed } = req.query;
    const pets = await petService.getPetsByBreed(breed);
    if (pets) {
      return res.status(200).json({
        message: "Get pet is the success",
        errCode: 0,
        data: pets,
      });
    } else {
      return res.status(400).json({
        message: "Get pet is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get pet is the fails",
      errCode: -1,
    });
  }
};

const getAllBreed = async (req, res) => {
  try {
    const breed = await petService.getAllBreed();
    if (breed) {
      return res.status(200).json({
        message: "Get pet is the success",
        errCode: 0,
        data: breed,
      });
    } else {
      return res.status(400).json({
        message: "Get pet is the fails",
        errCode: 0,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get pet is the fails",
      errCode: -1,
    });
  }
};

export default {
  getAllPet,
  createPet,
  updatePet,
  deletePet,
  findByName,
  findById,
  countPet,
  getPetsByBreed,
  getAllBreed,
};
