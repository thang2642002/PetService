

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

module.exports = { fetchPaginatedData };
