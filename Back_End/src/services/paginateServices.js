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

module.exports = { fetchPaginatedData, paginateProducts };
