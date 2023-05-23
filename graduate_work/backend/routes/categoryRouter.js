const Router = require("express");
const router = new Router();
const CategoryController = require("../controllers/CategoryController");
const NameMiddleWare = require("../middlewares/ValidationMiddlewares/CategoryLocationMiddlewares/CategoryLocationNameMiddleware");

const path = {
    root: "/",
    delete: "/:id",
}

router.get(path.root, CategoryController.allCategories);
router.post(path.root, NameMiddleWare, CategoryController.newCategory);
router.delete(path.delete, CategoryController.deleteCategory);

module.exports = router;
