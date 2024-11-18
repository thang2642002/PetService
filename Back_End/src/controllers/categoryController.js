import categoryService from "../services/categoryService";
const getAllCategory = async (req, res) => {
  try {
    const getAllCategory = await categoryService.getAllCategory();
    if (getAllCategory) {
      return res.status(200).json({
        message: "Get all category is the success",
        errCode: 0,
        data: getAllCategory,
      });
    } else {
      return res.status(400).json({
        message: "Get all category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all category is the fails",
      errCode: -1,
    });
  }
  y;
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createCategory = await categoryService.createCategory(
      name,
      description
    );
    if (createCategory) {
      return res.status(200).json({
        message: "Create category is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create category is the fails",
      errCode: -1,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const { name, description } = req.body;
    const updateCategory = await categoryService.updateCategory(
      category_id,
      name,
      description
    );
    if (updateCategory) {
      return res.status(200).json({
        message: "Update category is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update category is the fails",
      errCode: -1,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const deleteCategory = await categoryService.deleteCategory(category_id);
    if (deleteCategory) {
      return res.status(200).json({
        message: "Delete category is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete category is the fails",
      errCode: -1,
    });
  }
};

const findByName = async (req, res) => {
  try {
    const { name } = req.query;
    const findByName = await categoryService.findByName(name);
    if (findByName) {
      return res.status(200).json({
        message: "Find category is the success",
        errCode: 0,
        data: findByName,
      });
    } else {
      return res.status(400).json({
        message: "Find category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find category is the fails",
      errCode: -1,
    });
  }
};

const findById = async (req, res) => {
  try {
    const category_id = req.params.id;
    const findById = await categoryService.findById(category_id);
    if (findById) {
      return res.status(200).json({
        message: "Find category is the success",
        errCode: 0,
        data: findById,
      });
    } else {
      return res.status(400).json({
        message: "Find category is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find category is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  findByName,
  findById,
  updateCategory,
};
