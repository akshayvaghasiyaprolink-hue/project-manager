const paginate = async ({
    model,
    page = 1,
    limit = 10,
    searchFields = [],
    searchTerm = '',
    filters = {},
    projection = {},
    sort = { createdAt: -1 },
    populate=null
  }) => {
    const skip = (page - 1) * limit;
    // 🔍 Build search query (case-insensitive)
    let searchQuery = {};
    if (searchTerm && searchFields.length > 0) {
      searchQuery = {
        $or: searchFields.map(field => ({
          [field]: { $regex: decodeURIComponent(searchTerm), $options: 'i' }
        }))
      };
    }

    const query = { ...filters, ...searchQuery };

  let dbQuery = model.find(query, projection).sort(sort).skip(skip).limit(limit);

  if (populate) {
    // Support single or multiple populate fields
    if (Array.isArray(populate)) {
      populate.forEach(p => {
        dbQuery = dbQuery.populate(p);
      });
    } else {
      dbQuery = dbQuery.populate(populate);
    }
  }

    const [data, total] = await Promise.all([
      dbQuery,
      model.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      totalPages,
      totalItems: total,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      data
    };
  };

  module.exports = paginate;