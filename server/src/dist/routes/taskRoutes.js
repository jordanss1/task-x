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
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const Task = (0, mongoose_1.model)("task");
const TaskList = (0, mongoose_1.model)("taskList");
const PublicTask = (0, mongoose_1.model)("publicTask");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const taskRoutes = (app) => {
    app.get("/api/tasks/user", requireJwt_1.default, async (req, res) => {
        try {
            const data = await TaskList.findOne({ _user: req.user?._id })
                .select("tasks")
                .exec();
            return res.send(data ? data.tasks.map((task) => task) : false);
        }
        catch (err) {
            return res.status(500).send("Issue retrieving task list, server error");
        }
    });
    app.get("/api/wall_tasks/user", requireJwt_1.default, async (req, res) => {
        try {
            const data = await PublicTaskList.findOne({ _user: req.user?._id })
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
    app.get("/api/wall_tasks/all", requireJwt_1.default, async (req, res) => {
        try {
            const publicTasks = await PublicTaskList.find({
                totalTasks: { $gt: 0 },
            })
                .select("tasks")
                .exec();
            const allPublicTasks = publicTasks.map(({ tasks }) => {
                return tasks.reduce((task) => task);
            });
            return res.send(allPublicTasks || false);
        }
        catch (err) {
            return res
                .status(500)
                .send("Issue retrieving all wall tasks, server error");
        }
    });
    app.post("/api/task/edit", requireJwt_1.default, async (req, res) => {
        const { task, dueDate, enabledDueDate, onTaskWall } = req.body;
        let updatedUserPublicTasks;
        const publicTask = await PublicTaskList.findOne({
            _user: req.user?._id,
            tasks: { $elemMatch: { taskId: req.body.taskId } },
        })
            .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
            .exec();
        try {
            await TaskList.findOneAndUpdate({
                _user: req.user?._id,
                "tasks.taskId": req.body.taskId,
            }, {
                "tasks.$.task": task,
                "tasks.$.dueDate": dueDate,
                "tasks.$.enabledDueDate": enabledDueDate,
                "tasks.$.onTaskWall": onTaskWall,
            }).exec();
        }
        catch (err) {
            res.status(500).send("Issue editing task, try again");
        }
        if (publicTask && !onTaskWall) {
            const totalTasks = await PublicTaskList.findOne({
                _user: req.user?._id,
            })
                .select(["totalTasks", "-_id"])
                .exec();
            if (totalTasks?.totalTasks === 1) {
                try {
                    await PublicTaskList.findOneAndDelete({
                        _user: req.user?._id,
                    }).exec();
                    updatedUserPublicTasks = false;
                }
                catch (err) {
                    res
                        .status(500)
                        .send("Edited task but unable to delete task wall task");
                }
            }
            else {
                try {
                    await PublicTaskList.findOneAndUpdate({ _user: req.user?._id }, {
                        $pull: { tasks: { taskId: req.body.taskId } },
                        $inc: { totalTasks: -1 },
                    }).exec();
                }
                catch (err) {
                    res
                        .status(500)
                        .send("Edited task but unable to delete task wall task");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._id,
                    }).select(["tasks", "-_id"]);
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
        }
        const tasks = await TaskList.findOne({ _user: req.user?._id })
            .select("tasks")
            .exec();
        const userTasks = tasks?.tasks.map((task) => task);
        res.send([userTasks, updatedUserPublicTasks || false, false]);
    });
    app.post("/api/task/complete", requireJwt_1.default, async (req, res) => {
        try {
            await TaskList.findOneAndUpdate({
                _user: req.user?._id,
            }, { $set: { "tasks.$[task].complete": true } }, { arrayFilters: [{ "task.taskId": req.body.taskId }] }).exec();
            await PublicTaskList.findOneAndUpdate({
                _user: req.user?._id,
            }, { $set: { "tasks.$[task].complete": true } }, { arrayFilters: [{ "task.taskId": req.body.taskId }] });
            const tasks = await TaskList.findOne({
                _user: req.user?._id,
            })
                .select("tasks")
                .exec();
            const publicTasks = await PublicTaskList.findOne({
                _user: req.user?._id,
            })
                .select("tasks")
                .exec();
            const updatedUserTasks = tasks?.tasks.map((task) => task);
            const updatedUserPublicTasks = publicTasks?.tasks.map((task) => task);
            res.send([
                updatedUserTasks || false,
                updatedUserPublicTasks || false,
                false,
            ]);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .send("Unable to set task as complete, try again");
        }
    });
    app.post("/api/task", requireJwt_1.default, async (req, res) => {
        const newTask = new Task({
            ...req.body,
            created: new Date().toISOString(),
            taskId: crypto.randomUUID().toString(),
        });
        const taskList = await TaskList.findOne({ _user: req.user?._id }).exec();
        let updatedUserTasks;
        let updatedUserPublicTasks;
        if (taskList) {
            try {
                await TaskList.findOneAndUpdate({ _user: req.user?._id }, { $push: { tasks: newTask }, $inc: { totalTasks: 1 } }).exec();
            }
            catch (err) {
                return res.status(500).send("Unable to update task list, try again");
            }
            finally {
                const tasks = await TaskList.findOne({
                    _user: req.user?._id,
                })
                    .select("tasks")
                    .exec();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
        }
        else {
            try {
                const tasks = await new TaskList({
                    _user: req.user?._id,
                    tasks: [newTask],
                    totalTasks: 1,
                }).save();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                return res.status(500).send("Unable to create new task, try again");
            }
        }
        if (newTask.onTaskWall) {
            const publicTaskList = await PublicTaskList.findOne({
                _user: req.user?._id,
            }).exec();
            const { created, dueDate, enabledDueDate, task, taskId } = newTask;
            const publicTask = new PublicTask({
                user: req.user,
                created,
                dueDate,
                enabledDueDate,
                task,
                taskId,
            });
            if (publicTaskList) {
                try {
                    await PublicTaskList.findOneAndUpdate({ _user: req.user?._id }, { $push: { tasks: publicTask }, $inc: { totalTasks: 1 } }).exec();
                }
                catch (err) {
                    return res
                        .status(500)
                        .send("Unable to add your first task to task wall, try again");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._id,
                    })
                        .select("tasks")
                        .exec();
                    updatedUserPublicTasks = tasks?.tasks.map((task) => task);
                }
            }
            else {
                try {
                    await new PublicTaskList({
                        _user: req.user?._id,
                        tasks: [publicTask],
                        totalTasks: 1,
                    }).save();
                }
                catch (err) {
                    return res
                        .status(500)
                        .send("Unable to add your task to task wall, try again");
                }
                finally {
                    const tasks = await PublicTaskList.findOne({
                        _user: req.user?._id,
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
        const allPublicTasks = publicTasks.map(({ tasks }) => {
            return tasks.reduce((task) => task);
        });
        res.send([
            updatedUserTasks || false,
            updatedUserPublicTasks || false,
            allPublicTasks || false,
        ]);
    });
    app.delete("/api/task", requireJwt_1.default, async (req, res) => {
        let updatedUserTasks;
        let updatedUserPublicTasks;
        const tasks = await TaskList.findOne({
            _user: req.user?._id,
        })
            .select("totalTasks")
            .exec();
        const publicTasks = await PublicTaskList.findOne({
            _user: req.user?._id,
        })
            .select("totalTasks")
            .exec();
        if (tasks?.totalTasks && tasks.totalTasks > 1) {
            try {
                await TaskList.findOneAndUpdate({ _user: req.user?._id }, {
                    $pull: { tasks: { taskId: req.body.taskId } },
                    $inc: { totalTasks: -1 },
                }).exec();
                const tasks = await TaskList.findOne({ _user: req.user?._id })
                    .select("tasks")
                    .exec();
                updatedUserTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                return res.status(500).send("Unable to delete task, try again");
            }
        }
        if (tasks?.totalTasks && tasks.totalTasks === 1) {
            try {
                await TaskList.findOneAndDelete({
                    _user: req.user?._id,
                }).exec();
                updatedUserTasks = null;
            }
            catch (err) {
                return res.status(500).send("Unable to delete task, try again");
            }
        }
        if (publicTasks && publicTasks.totalTasks > 1) {
            try {
                await PublicTaskList.findOneAndUpdate({ _user: req.user?._id }, {
                    $pull: { tasks: { taskId: req.body.taskId } },
                    $inc: { totalTasks: -1 },
                }).exec();
                const tasks = await PublicTaskList.findOne({ _user: req.user?._id });
                updatedUserPublicTasks = tasks?.tasks.map((task) => task);
            }
            catch (err) {
                return res
                    .status(500)
                    .send("Unable to delete task from Task Wall, try again");
            }
        }
        if (publicTasks && publicTasks.totalTasks === 1) {
            try {
                await PublicTaskList.findOneAndDelete({
                    _user: req.user?._id,
                }).exec();
                updatedUserPublicTasks = null;
            }
            catch (err) {
                return res
                    .status(500)
                    .send("Unable to delete task from Task Wall, try again");
            }
        }
        res.send([updatedUserTasks, updatedUserPublicTasks, false]);
    });
};
exports.default = taskRoutes;
