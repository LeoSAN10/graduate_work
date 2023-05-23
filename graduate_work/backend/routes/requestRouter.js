const Router = require("express");
const router = new Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const RequestController = require("../controllers/RequestController");
const NewRequestMiddleware = require("../middlewares/ValidationMiddlewares/RequestMiddlewares/NewRequestMiddleware");
const FilterMiddleware = require("../middlewares/ValidationMiddlewares/RequestMiddlewares/FilterMiddleware");
const ReportMiddleware = require("../middlewares/ValidationMiddlewares/RequestMiddlewares/ReportMiddleware");

const path = {
    root: "/",
    rootid: "/:id",
    me: "/me",
    archivation: "/:id/archivation",
    report: "/:id/report"
}

router.get(path.root, FilterMiddleware, RequestController.getAllRequests);
router.get(path.me, AuthMiddleware, FilterMiddleware, RequestController.getAllRequests);
router.post(path.root, AuthMiddleware, NewRequestMiddleware, RequestController.newRequest);
router.put(path.rootid, AuthMiddleware, NewRequestMiddleware, RequestController.updateRequest);
router.get(path.rootid, AuthMiddleware, RequestController.getByIdRequests);
router.put(path.archivation, AuthMiddleware, RequestController.archive);
router.post(path.report, ReportMiddleware, AuthMiddleware, RequestController.reportRequest);

module.exports = router;
