import db from "../models/index.js";
import { Op } from "sequelize";
const getAllService = async () => {
  try {
    const getAllService = await db.Services.findAll();
    return getAllService;
  } catch (error) {
    console.log(error);
  }
};

const createService = async (name, price, description) => {
  try {
    const createService = await db.Services.create({
      name,
      price,
      description,
    });
    return createService;
  } catch (error) {
    console.log(error);
  }
};

const updateService = async (service_id, name, price, description) => {
  try {
    const updateService = await db.Services.findByPk(service_id);
    if (!updateService) {
      return null;
    }
    updateService.name = name;
    updateService.price = price;
    updateService.description = description;
    updateService.save();
    return updateService;
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (service_id) => {
  try {
    const deleteService = await db.Services.destroy({
      where: {
        service_id: service_id,
      },
    });
    return deleteService;
  } catch (error) {
    console.log(error);
  }
};

const findById = async (service_id) => {
  try {
    const findById = await db.Services.findByPk(service_id);
    return findById;
  } catch (error) {
    console.log(error);
  }
};

const findByName = async (name) => {
  try {
    const findName = await db.Services.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (!findName) {
      return null;
    }
    return findName;
  } catch (error) {
    console.log(error);
  }
};

const countService = async () => {
  try {
    const serviceCount = await db.Services.count();
    return serviceCount;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllService,
  createService,
  updateService,
  deleteService,
  findById,
  findByName,
  countService,
};
