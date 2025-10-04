import serviceService from "../services/serviceService.js";

const getAllService = async (req, res) => {
  try {
    const getAllService = await serviceService.getAllService();
    if (getAllService) {
      return res.status(200).json({
        message: "Get all service is the success",
        errCode: 0,
        data: getAllService,
      });
    } else {
      return res.status(400).json({
        message: "Get all service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Get all service is the fails",
      errCode: -1,
    });
  }
};

const createService = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const createService = await serviceService.createService(
      name,
      price,
      description
    );
    if (createService) {
      return res.status(200).json({
        message: "Create service is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Create service is the fails",
      errCode: -1,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service_id = req.params.id;
    const { name, price, description } = req.body;
    const updateService = await serviceService.updateService(
      service_id,
      name,
      price,
      description
    );
    if (updateService) {
      return res.status(200).json({
        message: "Update service is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Update service is the fails",
      errCode: -1,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const service_id = req.params.id;
    const deleteService = await serviceService.deleteService(service_id);
    if (deleteService) {
      return res.status(200).json({
        message: "Delete service is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Delete service is the fails",
      errCode: -1,
    });
  }
};

const getById = async (req, res) => {
  try {
    const service_id = req.params.id;
    const findById = await serviceService.findById(service_id);
    if (findById) {
      return res.status(200).json({
        message: "Find service is the success",
        errCode: 0,
        data: findById,
      });
    } else {
      return res.status(400).json({
        message: "Find service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Find service is the fails",
      errCode: -1,
    });
  }
};

const getByName = async (req, res) => {
  try {
    const { name } = req.query;
    const findByName = await serviceService.findByName(name);
    if (findByName) {
      return res.status(200).json({
        message: "Find service is the success",
        errCode: 0,
        data: findByName,
      });
    } else {
      return res.status(400).json({
        message: "Find service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Find service is the fails",
      errCode: -1,
    });
  }
};

const countService = async (req, res) => {
  try {
    const countService = await serviceService.countService();
    if (countService) {
      return res.status(200).json({
        message: "Count service is the success",
        errCode: 0,
        data: countService,
      });
    } else {
      return res.status(400).json({
        message: "Count service is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server error, Count service is the fails",
      errCode: -1,
    });
  }
};

export default {
  getAllService,
  createService,
  updateService,
  deleteService,
  getById,
  getByName,
  countService,
};
