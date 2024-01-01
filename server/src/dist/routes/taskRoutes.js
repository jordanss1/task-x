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
    app.post("/api/new_task", requireJwt_1.default, async (req, res) => {
        const newTask = new Task({
            ...req.body,
            created: new Date().toISOString(),
            taskId: crypto.randomUUID().toString(),
        });
        const taskList = await TaskList.findOne({ _user: req.user?._id }).exec();
        let updatedTaskList;
        let updatedPublicTaskList;
        if (taskList) {
            try {
                updatedTaskList = await TaskList.findOneAndUpdate({ _user: req.user?._id }, { $push: { tasks: newTask } }).exec();
            }
            catch (err) {
                return res.status(500).send("Unable to update task list, try again");
            }
        }
        else {
            try {
                updatedTaskList = await new TaskList({
                    _user: req.user?._id,
                    tasks: [newTask],
                }).save();
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
                    updatedPublicTaskList =
                        await PublicTaskList.findOneAndUpdate({ _user: req.user?._id }, { $push: { tasks: publicTask } }).exec();
                }
                catch (err) {
                    return res
                        .status(500)
                        .send("Unable to add your first task to task wall, try again");
                }
            }
            else {
                try {
                    updatedPublicTaskList = await new PublicTaskList({
                        _user: req.user?._id,
                        tasks: [publicTask],
                    }).save();
                }
                catch (err) {
                    return res
                        .status(500)
                        .send("Unable to add your task to task wall, try again");
                }
            }
        }
        res.send([updatedTaskList, updatedPublicTaskList || false]);
    });
};
exports.default = taskRoutes;