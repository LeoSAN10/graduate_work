const Router = require("express");
const router = new Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ReplyController = require("../controllers/ReplyController");
const ReplyRequestMiddleware = require("../middlewares/ValidationMiddlewares/ReplyMiddlewares/ReplyRequestMiddleware");
const PaginationRepliesMiddleware = require("../middlewares/ValidationMiddlewares/ReplyMiddlewares/PaginationRepliesMiddleware");
const UpdateReplyMiddleware = require("../middlewares/ValidationMiddlewares/ReplyMiddlewares/UpdateReplyMiddleware");

const path = {
    myReplies: "/me",
    repliesForMyRequests: "/requests",
    replyRequest: "/request/:id",
    rootId: "/:id",
}

router.get(path.myReplies, AuthMiddleware, PaginationRepliesMiddleware, ReplyController.getMyReplies);
router.post(path.replyRequest, AuthMiddleware, ReplyRequestMiddleware, ReplyController.newReply);
router.get(path.replyRequest, AuthMiddleware, PaginationRepliesMiddleware, ReplyController.getRepliesForRequest);
router.delete(path.rootId, AuthMiddleware, ReplyController.deleteReply);
router.put(path.rootId, AuthMiddleware, UpdateReplyMiddleware, ReplyController.updateReply);

module.exports = router;