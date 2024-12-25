import db from "../models/index";
const fetchPaginatedData = async (model, page, pageSize) => {
  try {
    const totalItems = await model.count();
    const data = await model.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      totalItems,
      totalPages,
      data,
    };
  } catch (error) {
    console.error(
      `Error fetching paginated data for model ${model.name}:`,
      error
    );
    throw error;
  }
};

const paginateProducts = ({ listProduct, page = 1, limit = 8 }) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedProducts = listProduct.slice(startIndex, endIndex);

  return {
    paginatedProducts,
    currentPage: parseInt(page),
    totalItems: listProduct.length,
    totalPages: Math.ceil(listProduct.length / limit),
  };
};

const getPaginateProductSort = async ({
  modelName,
  page,
  limit,
  sortBy,
  order,
}) => {
  const offset = (page - 1) * limit;
  const orderCondition = [];
  console.log("offset", offset);

  if (sortBy && order) {
    orderCondition.push([sortBy, order]);
  }

  try {
    const products = await db[modelName].findAndCountAll({
      order: orderCondition,
      limit,
      offset,
    });
    return {
      errCode: 0,
      data: products.rows,
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
    };
  } catch (err) {
    throw new Error("Error from server");
  }
};

module.exports = {
  fetchPaginatedData,
  paginateProducts,
  getPaginateProductSort,
};
