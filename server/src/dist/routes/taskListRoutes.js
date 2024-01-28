"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const mongoose_1 = require("mongoose");
const deleteNotificationsForTask_1 = __importDefault(require("../functions/deleteNotificationsForTask"));
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const Task = (0, mongoose_1.model)("task");
const TaskList = (0, mongoose_1.model)("taskList");
const PublicTask = (0, mongoose_1.model)("publicTask");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const Notifications = (0, mongoose_1.model)("notifications");
const LikeNotification = (0, mongoose_1.model)("likeNotification");
const CommentNotification = (0, mongoose_1.model)("commentNotification");
const taskListRoutes = (app) => {
    app.get("/api/tasks", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            const data = await TaskList.findOne({
                _user: req.user._user,
            })
                .select("tasks")
                .exec();
            res.send(data ? data.tasks.map((task) => task) : false);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Issue retrieving task list, server error");
        }
    });
    app.post("/api/task/edit", requireJwt_1.default, async (req, res) => {
        const { task, dueDate, enabledDueDate, onTaskWall } = req.body;
        (0, types_1.assertRequestWithUser)(req);
        let updatedUserPublicTasks;
        const publicTask = await PublicTaskList.findOne({
            _user: req.user?._user,
            tasks: { $elemMatch: { taskId: req.body.taskId } },
        })
            .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
            .exec();
        try {
            await TaskList.findOneAndUpdate({
                _user: req.user?._user,
                "tasks.taskId": req.body.taskId,
            }, {
                "tasks.$.task": task,
                "tasks.$.dueDate": enabledDueDate ? dueDate : null,
                "tasks.$.enabledDueDate": enabledDueDate,
                "tasks.$.onTaskWall": onTaskWall,
            }).exec();
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Issue editing task, try again");
        }
        if (publicTask && !onTaskWall) {
            const totalTasks = await PublicTaskList.findOne({
                _user: req.user?._user,
            })
                .select(["totalTasks", "-_id"])
                .exec();
            if (totalTasks?.totalTasks === 1) {
                try {
                    await PublicTaskList.findOneAndDelete({
                        _user: req.user?._user,
                    }).exec();
                    await (0, deleteNotificationsForTask_1.default)(req.user._user, req.body.taskId);
                    updatedUserPublicTasks = null;
                }
                catch (err) {
                    console.log(err);
                    res
                        .status(500)
                        .send("Edited task but unable to delete task wall task");
                }
            }
            else {
                try {
                    await PublicTaskList.findOneAndUpdate({ _user: req.user?._user }, {
                        $pull: { tasks: { taskId: req.body.taskId } },
                        $inc: { totalTasks: -1 },
                    }).exec();
                    await (0, deleteNotificationsForTask_1.default)(req.user._user, req.body.taskId);
                }
                catch (err) {
                    console.log(err);
                    res
                        .status(500)
                        .send("Edited task but unable to delete task wall task");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._user,
                    })
                        .select(["tasks", "-_id"])
                        .exec();
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
        }
        if (publicTask && onTaskWall) {
            try {
                await PublicTaskList.findOneAndUpdate({
                    _user: req.user?._user,
                    "tasks.taskId": req.body.taskId,
                }, {
                    "tasks.$.task": task,
                    "tasks.$.dueDate": enabledDueDate ? dueDate : null,
                    "tasks.$.enabledDueDate": enabledDueDate,
                    "tasks.$.onTaskWall": onTaskWall,
                }).exec();
                await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                    "userTaskLikes.$[task].task": task,
                    "userTaskComments.$[task].task": task,
                }, { arrayFilters: [{ "task.taskId": req.body.taskId }] }).exec();
                await Notifications.updateMany({}, {
                    "commentLikes.$[task].task": task,
                }, { arrayFilters: [{ "task.taskId": req.body.taskId }] }).exec();
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Unable to update task wall task, try again");
            }
            finally {
                const tasks = await PublicTaskList.findOne({
                    _user: req.user?._user,
                })
                    .select(["tasks", "-_id"])
                    .exec();
                updatedUserPublicTasks = tasks?.tasks.map((task) => task);
            }
        }
        else if (!publicTask && onTaskWall) {
            const totalTasks = await PublicTaskList.findOne({
                _user: req.user?._user,
            })
                .select(["-_id", "totalTasks"])
                .exec();
            const publicTask = new PublicTask({
                user: req.user.profile,
                created: new Date().toISOString(),
                dueDate,
                enabledDueDate,
                task,
                taskId: req.body.taskId,
            });
            const newLikeNotification = new LikeNotification({
                taskId: req.body.taskId,
                task,
            });
            const newCommentNotification = new CommentNotification({
                taskId: req.body.taskId,
                task,
                type: "newComment",
            });
            if (!totalTasks?.totalTasks || totalTasks.totalTasks === 0) {
                try {
                    const taskList = await new PublicTaskList({
                        _user: req.user._user,
                        tasks: [publicTask],
                        totalTasks: 1,
                    }).save();
                    await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                        $push: {
                            userTaskLikes: newLikeNotification,
                            userTaskComments: newCommentNotification,
                        },
                    }).exec();
                    updatedUserPublicTasks = taskList.tasks;
                }
                catch (err) {
                    console.log(err);
                    res
                        .status(500)
                        .send("Edited task but unable add task to task wall");
                }
            }
            else {
                try {
                    await PublicTaskList.findOneAndUpdate({ _user: req.user?._user }, {
                        $push: { tasks: publicTask },
                        $inc: { totalTasks: 1 },
                    }).exec();
                    await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                        $push: {
                            userTaskLikes: newLikeNotification,
                            userTaskComments: newCommentNotification,
                        },
                    }).exec();
                }
                catch (err) {
                    console.log(err);
                    res
                        .status(500)
                        .send("Edited task but unable add task to task wall");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._user,
                    })
                        .select(["tasks", "-_id"])
                        .exec();
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
        }
        const tasks = await TaskList.findOne({ _user: req.user?._user })
            .select("tasks")
            .exec();
        const userTasks = tasks?.tasks.map((task) => task);
        res.send([userTasks, updatedUserPublicTasks, false]);
    });
    app.post("/api/task/complete", requireJwt_1.default, async (req, res) => {
        const publicTask = await PublicTaskList.findOne({
            _user: req.user?._user,
            "tasks.taskId": req.body.taskId,
        })
            .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
            .exec();
        let updatedUserTasks;
        let updatedUserPublicTasks;
        try {
            await TaskList.findOneAndUpdate({
                _user: req.user?._user,
            }, { $set: { "tasks.$[task].complete": true } }, { arrayFilters: [{ "task.taskId": req.body.taskId }] }).exec();
            const tasks = await TaskList.findOne({
                _user: req.user?._user,
            })
                .select("tasks")
                .exec();
            updatedUserTasks = tasks?.tasks.map((task) => task);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .send("Unable to set task as complete, try again");
        }
        if (publicTask) {
            try {
                await PublicTaskList.findOneAndUpdate({
                    _user: req.user?._user,
                }, { $set: { "tasks.$[task].complete": true } }, { arrayFilters: [{ "task.taskId": req.body.taskId }] }).exec();
                const publicTasks = await PublicTaskList.findOne({
                    _user: req.user?._user,
                })
                    .select("tasks")
                    .exec();
                updatedUserPublicTasks = publicTasks?.tasks.map((task) => task);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .send("Unable to set task wall task as complete, try again");
            }
        }
        res.send([
            updatedUserTasks || false,
            updatedUserPublicTasks || false,
            false,
        ]);
    });
    app.post("/api/task", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const newTask = new Task({
            ...req.body,
            created: new Date().toISOString(),
            taskId: crypto.randomUUID().toString(),
        });
        const taskList = await TaskList.findOne({
            _user: req.user?._user,
        }).exec();
        let updatedUserTasks;
        let updatedUserPublicTasks;
        if (taskList) {
            try {
                await TaskList.findOneAndUpdate({ _user: req.user?._user }, { $push: { tasks: newTask }, $inc: { totalTasks: 1 } }).exec();
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Unable to update task list, try again");
                return;
            }
            finally {
                const tasks = await TaskList.findOne({
                    _user: req.user?._user,
                })
                    .select("tasks")
                    .exec();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
        }
        else {
            try {
                const tasks = await new TaskList({
                    _user: req.user?._user,
                    tasks: [newTask],
                    totalTasks: 1,
                }).save();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Unable to create new task, try again");
                return;
            }
        }
        if (newTask.onTaskWall) {
            const publicTaskList = await PublicTaskList.findOne({
                _user: req.user?._user,
            }).exec();
            const { created, dueDate, enabledDueDate, task, taskId } = newTask;
            const publicTask = new PublicTask({
                user: req.user.profile,
                created,
                dueDate,
                enabledDueDate,
                task,
                taskId,
            });
            const newCommentNotification = new CommentNotification({
                taskId,
                task,
                type: "newComment",
            });
            const newLikeNotification = new LikeNotification({
                taskId,
                task,
            });
            if (publicTaskList) {
                try {
                    await PublicTaskList.findOneAndUpdate({ _user: req.user?._user }, { $push: { tasks: publicTask }, $inc: { totalTasks: 1 } }).exec();
                    await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                        $push: {
                            userTaskLikes: newLikeNotification,
                            userTaskComments: newCommentNotification,
                        },
                    }).exec();
                }
                catch (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .send("Unable to add your first task to task wall, try again");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._user,
                    })
                        .select("tasks")
                        .exec();
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
            else {
                try {
                    await new PublicTaskList({
                        _user: req.user?._user,
                        tasks: [publicTask],
                        totalTasks: 1,
                    }).save();
                    await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                        $push: {
                            userTaskLikes: newLikeNotification,
                            userTaskComments: newCommentNotification,
                        },
                    }).exec();
                }
                catch (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .send("Unable to add your task to task wall, try again");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._user,
                    })
                        .select("tasks")
                        .exec();
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
        }
        const publicTasks = await PublicTaskList.find({
            totalTasks: { $gt: 0 },
        })
            .select("tasks")
            .exec();
        let allPublicTasks = [];
        publicTasks.forEach(({ tasks }) => {
            return allPublicTasks.push(...tasks);
        });
        res.send([
            updatedUserTasks || false,
            updatedUserPublicTasks || false,
            allPublicTasks || false,
        ]);
    });
    app.delete("/api/task", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        let updatedUserTasks;
        let updatedUserPublicTasks;
        const userWallTasks = await PublicTaskList.findOne({
            _user: req.user?._user,
        }).exec();
        updatedUserPublicTasks = userWallTasks?.tasks.map((task) => task);
        const tasks = await TaskList.findOne({
            _user: req.user?._user,
        })
            .select("totalTasks")
            .exec();
        const publicTasks = await PublicTaskList.findOne({
            _user: req.user?._user,
        })
            .select("totalTasks")
            .exec();
        const matchingPublicTask = await PublicTaskList.findOne({
            _user: req.user?._user,
            tasks: { $elemMatch: { taskId: req.body.taskId } },
        })
            .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
            .exec();
        if (tasks?.totalTasks && tasks.totalTasks > 1) {
            try {
                await TaskList.findOneAndUpdate({ _user: req.user?._user }, {
                    $pull: { tasks: { taskId: req.body.taskId } },
                    $inc: { totalTasks: -1 },
                }).exec();
                const tasks = await TaskList.findOne({ _user: req.user?._user })
                    .select("tasks")
                    .exec();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Unable to delete task, try again");
                return;
            }
        }
        if (tasks?.totalTasks && tasks.totalTasks === 1) {
            try {
                await TaskList.findOneAndDelete({
                    _user: req.user?._user,
                }).exec();
                updatedUserTasks = null;
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Unable to delete task, try again");
                return;
            }
        }
        if (publicTasks && publicTasks.totalTasks > 1 && matchingPublicTask) {
            try {
                await PublicTaskList.findOneAndUpdate({ _user: req.user?._user }, {
                    $pull: { tasks: { taskId: req.body.taskId } },
                    $inc: { totalTasks: -1 },
                }).exec();
                await (0, deleteNotificationsForTask_1.default)(req.user._user, req.body.taskId);
                const tasks = await PublicTaskList.findOne({
                    _user: req.user?._user,
                });
                updatedUserPublicTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                console.log(err);
                res
                    .status(500)
                    .send("Unable to delete task from Task Wall, try again");
                return;
            }
        }
        if (publicTasks && publicTasks.totalTasks === 1 && matchingPublicTask) {
            try {
                await PublicTaskList.findOneAndDelete({
                    _user: req.user?._user,
                }).exec();
                await (0, deleteNotificationsForTask_1.default)(req.user._user, req.body.taskId);
                updatedUserPublicTasks = null;
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .send("Unable to delete task from Task Wall, try again");
            }
        }
        res.send([updatedUserTasks, updatedUserPublicTasks, false]);
    });
};
exports.default = taskListRoutes;
