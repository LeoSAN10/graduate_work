const Router = require("express");
const router = new Router();
const LocationController = require("../controllers/LocationController");
const NameMiddleWare = require("../middlewares/ValidationMiddlewares/CategoryLocationMiddlewares/CategoryLocationNameMiddleware");

const path = {
    root: "/",
    delete: "/:id",
}

router.get(path.root, LocationController.allLocations);
router.post(path.root, NameMiddleWare, LocationController.newLocation);
router.delete(path.delete, LocationController.deleteLocation);

module.exports = router;
