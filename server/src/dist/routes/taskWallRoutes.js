"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const taskWallRoutes = (app) => {
    app.get("/api/task_wall/user", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            const data = await PublicTaskList.findOne({ _user: req.user._id })
                .select("tasks")
                .exec();
            return res.send(data ? data.tasks.map((task) => task) : false);
        }
        catch (err) {
            return res
                .status(500)
                .send("Issue retrieving user task wall tasks, server error");
        }
    });
    app.get("/api/task_wall/all", requireJwt_1.default, async (req, res) => {
        try {
            const publicTasks = await PublicTaskList.find({
                totalTasks: { $gt: 0 },
            })
                .select(["tasks", "-_id"])
                .exec();
            let allPublicTasks = [];
            publicTasks.forEach(({ tasks }) => {
                return allPublicTasks.push(...tasks);
            });
            return res.send(allPublicTasks || false);
        }
        catch (err) {
            return res
                .status(500)
                .send("Issue retrieving all wall tasks, server error");
        }
    });
    app.post("/api/task_wall/like", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { previousLikes, currentAwards, currentlyLiked, taskId } = req.body;
        let awardArray = currentAwards?.length ? currentAwards : [];
        if (!currentlyLiked) {
            const newAward = previousLikes === 24
                ? "supported"
                : previousLikes === 49
                    ? "superSupported"
                    : previousLikes === 99
                        ? "communityLegend"
                        : null;
            if (newAward && !awardArray.includes(newAward)) {
                awardArray.push(newAward);
            }
        }
        const updateQuery = currentlyLiked
            ? {
                $inc: { "tasks.$[task].likes.likes": -1 },
                $pull: {
                    "tasks.$[task].likes.users": {
                        userName: req.user.profile?.userName,
                    },
                },
            }
            : {
                $inc: { "tasks.$[task].likes.likes": 1 },
                $push: {
                    "tasks.$[task].likes.users": req.user.profile,
                },
            };
        try {
            const likedTask = await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, {
                $set: { "tasks.$[task].awards": awardArray },
                ...updateQuery,
            }, { arrayFilters: [{ "task.taskId": taskId }], new: true })
                .select(["-_id", "tasks"])
                .exec();
            res.send(likedTask?.tasks[0]);
        }
        catch (err) {
            res.status(500).send("Problem liking task, try again");
        }
    });
};
exports.default = taskWallRoutes;
