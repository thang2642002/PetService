import productService from "../services/productService";
const getAllProduct = async (req, res) => {
  try {
    const getAllProduct = await productService.getAllProduct();
    if (getAllProduct) {
      return res.status(200).json({
        message: "Get all product is the success",
        errCode: 0,
        data: getAllProduct,
      });
    } else {
      return res.status(400).json({
        message: "Get all product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Get all product is the fails",
      errCode: -1,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock } = req.body;
    const images = req.files;
   
    const createProduct = await productService.createProduct(
      name,
      description,
      price,
      category_id,
      stock,
      images ? images.map((file) => file.path) : []
    );
    if (createProduct) {
      return res.status(200).json({
        message: "Create product is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Create product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Create product is the fails",
      errCode: -1,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.id;
    const { name, description, price, category_id, stock } = req.body;
    const images = req.files;
    const updateProduct = await productService.updateProduct(
      product_id,
      name,
      description,
      price,
      category_id,
      stock,
      images ? images.map((file) => file.path) : []
    );
    if (updateProduct) {
      return res.status(200).json({
        message: "Update product is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Update product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Update product is the fails",
      errCode: -1,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.id;
    const deleteProductResult = await productService.deleteProduct(product_id);
    if (deleteProductResult) {
      return res.status(200).json({
        message: "Delete product is the success",
        errCode: 0,
      });
    } else {
      return res.status(400).json({
        message: "Delete product failed",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Delete product failed",
      errCode: -1,
    });
  }
};

const findByName = async (req, res) => {
  try {
    const { name } = req.query;
    const findByName = await productService.findByName(name);
    if (findByName) {
      return res.status(200).json({
        message: "Find product is the success",
        errCode: 0,
        data: findByName,
      });
    } else {
      return res.status(400).json({
        message: "Find product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find product is the fails",
      errCode: -1,
    });
  }
};

const findById = async (req, res) => {
  try {
    const product_id = req.params.id;
    const findById = await productService.findById(product_id);
    if (findById) {
      return res.status(200).json({
        message: "Find product is the success",
        errCode: 0,
        data: findById,
      });
    } else {
      return res.status(400).json({
        message: "Find product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find product is the fails",
      errCode: -1,
    });
  }
};

const findByCategory = async (req, res) => {
  const category_id = req.params.id;
  try {
    const data = await productService.findByCategory(category_id);
    if (data) {
      return res.status(200).json({
        message: "Find product is the success",
        errCode: 0,
        data: data,
      });
    } else {
      return res.status(400).json({
        message: "Find product is the fails",
        errCode: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, Find product is the fails",
      errCode: -1,
    });
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  findByName,
  findById,
  findByCategory,
};
