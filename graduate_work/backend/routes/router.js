const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const requestRouter = require("./requestRouter");
const categoryRouter = require("./categoryRouter");
const locationRouter = require("./locationRouter");
const replyRouter = require("./replyRouter");

const path = {
    users: "/users",
    requests: "/requests",
    category: "/category",
    location: "/location",
    replies: "/replies"
}

router.use(path.users, userRouter);
router.use(path.requests, requestRouter);
router.use(path.category, categoryRouter);
router.use(path.location, locationRouter);
router.use(path.replies, replyRouter);

module.exports = router;
