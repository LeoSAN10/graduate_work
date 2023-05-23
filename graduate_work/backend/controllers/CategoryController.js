const CategoryDataAccess = require("../data_requests/CategoryDataAccess");
const ResponseCreator = require("../response_creators/ResponseCreator");


class CategoryController {
  async allCategories(req, res, next) {
    const data = await CategoryDataAccess.findAllCategories();
    return res.json(ResponseCreator.response(data));
  }

  async newCategory(req, res, next) {
    const { name } = req.body;
    try{
      const category = await CategoryDataAccess.createCategory(name);
      return res.json(
        ResponseCreator.response({
          message: "Category created",
          category
        })
      );
    } catch(error) {
      return next(error);
    }
  }

  async deleteCategory(req, res, next) {
    const id  = req.param('id').slice(1);
    try {
      await CategoryDataAccess.deleteCategoryById(id)
      return res.json(ResponseCreator.response({ 
        message: "Category deleted" 
      }));
    } catch(error) {
      return next(error);
    }
  }
}

module.exports = new CategoryController();
