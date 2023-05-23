const { Category } = require("../models");
const { DAOError } = require("../error/DAOError");

class RequestDataAccess {
  findAllCategories() {
    return Category.findAll();
  }

  createCategory(name) {
    return Category.create({ name });
  }

  findCategoryByName(name) {
    return Category.findOne({
      where: {
        name,
      },
    });
  }

  async deleteCategoryById(id) {
    const category = await Category.destroy({
      where: {
        id,
      },
    });
    if (!category) throw DAOError.notFound("There is no category with this id");
    return category;
  }
}

module.exports = new RequestDataAccess();
