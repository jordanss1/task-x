"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const Comment = (0, mongoose_1.model)("comment");
const taskWallRoutes = (app) => {
    app.get("/api/task_wall/user", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            const data = await PublicTaskList.findOne({ _user: req.user._id })
                .select("tasks")
                .exec();
            res.send(data ? data.tasks.map((task) => task) : false);
            return;
        }
        catch (err) {
            res
                .status(500)
                .send("Issue retrieving user task wall tasks, server error");
            return;
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
            res.send(allPublicTasks || false);
        }
        catch (err) {
            res.status(500).send("Issue retrieving all wall tasks, server error");
        }
    });
    app.patch("/api/task_wall", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { userName, _id } = req.body;
        // in task likes and comment likes we have _id
        // in comments we have profile._id
        try {
            const found = await PublicTaskList.find({}, {}, { arrayFilters: [{ like: "users" }, { "user._id": _id }] }).exec();
            console.log(found);
            res.send([false, false]);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Problem");
        }
    });
    app.post("/api/task_wall/comment", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { comment, taskId } = req.body;
        if (!comment.length || comment.length > 80) {
            res.status(400).send("Comment does not meet required length");
            return;
        }
        const newComment = await new Comment({
            comment,
            user: req.user,
            created: new Date().toISOString(),
        }).save();
        try {
            await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, {
                $push: { "tasks.$[task].comments": newComment },
            }, { arrayFilters: [{ "task.taskId": taskId }] })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            res.send({ comment: newComment, taskId });
        }
        catch (err) {
            res.status(500).send("Error adding comment, try again");
        }
    });
    app.patch("/api/task_wall/comment", requireJwt_1.default, async (req, res) => {
        const { comment, _id, taskId } = req.body;
        if (!comment.length || comment.length > 80) {
            res.status(400).send("Comment does not meet required length");
            return;
        }
        try {
            const newComment = await PublicTaskList.findOneAndUpdate({ tasks: { $elemMatch: { taskId } } }, {
                $set: { "tasks.$[task].comments.$[comment].comment": comment },
            }, {
                new: true,
                arrayFilters: [{ "task.taskId": taskId }, { "comment._id": _id }],
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const updatedComment = newComment?.tasks[0]?.comments?.find((comment) => comment.id === _id);
            res.send({ comment: updatedComment, taskId });
        }
        catch (err) {
            res.status(500).send("Error editing comment, try again");
        }
    });
    app.delete("/api/task_wall/comment", requireJwt_1.default, async (req, res) => {
        const { _id, taskId } = req.body;
        try {
            const task = await PublicTaskList.findOneAndUpdate({ tasks: { $elemMatch: { taskId } } }, {
                $pull: { "tasks.$[task].comments": { _id: { _id } } },
            }, {
                new: true,
                arrayFilters: [{ "task.taskId": taskId }],
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const comments = task?.tasks[0]?.comments;
            res.send({ comments, taskId });
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Error deleting comment, try again");
        }
    });
    app.post("/api/task_wall/task/like", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { previousLikes, currentAwards, liked, taskId } = req.body;
        let awardArray = currentAwards?.length ? currentAwards : [];
        if (!liked) {
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
        const updateQuery = liked
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
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            res.send(likedTask?.tasks[0]);
        }
        catch (err) {
            res.status(500).send("Problem liking task, try again");
        }
    });
    app.post("/api/task_wall/comment/like", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { liked, _id, taskId } = req.body;
        const updateQuery = liked
            ? {
                $inc: { "tasks.$[task].comments.$[comment].likes.likes": -1 },
                $pull: {
                    "tasks.$[task].comments.$[comment].likes.users": req.user.profile,
                },
            }
            : {
                $inc: { "tasks.$[task].comments.$[comment].likes.likes": 1 },
                $push: {
                    "tasks.$[task].comments.$[comment].likes.users": req.user.profile,
                },
            };
        try {
            const comment = await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, updateQuery, {
                arrayFilters: [{ "task.taskId": taskId }, { "comment._id": _id }],
                new: true,
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const updatedComment = comment?.tasks[0]?.comments?.find((comment) => comment.id === _id);
            res.send({ comment: updatedComment, taskId });
        }
        catch (err) {
            res.status(500).send("Error liking comment, try again");
        }
    });
};
exports.default = taskWallRoutes;
