import paginateServices from "../services/paginateServices";
import db from "../models/index";
const getPaginate = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const modelName = req.params.model;

  try {
    const model = db[modelName];
    if (!model) {
      return res.status(400).json({
        message: `Model ${modelName} does not exist`,
        errCode: -1,
      });
    }

    const { totalItems, totalPages, data } =
      await paginateServices.fetchPaginatedData(model, page, pageSize);

    res.status(200).json({
      message: "Paginated data success",
      errCode: 0,
      data,
      totalItems,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    res.status(500).json({
      message: "Paginated data error",
      errCode: -1,
    });
  }
};

module.exports = {
  getPaginate,
};
