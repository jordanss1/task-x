"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const TaskList = (0, mongoose_1.model)("taskList");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
const taskRoutes = (app) => {
    app.post("/api/new_task", requireJwt_1.default, async (req, res) => {
        const newTask = {
            ...req.body,
            created: new Date().toISOString(),
            taskId: "kih3y73h",
        };
        const taskList = await TaskList.findOne({ _user: req.user?._id });
        let updatedTaskList;
        if (taskList) {
            try {
                updatedTaskList = await TaskList.findOneAndUpdate({}, { $push: { tasks: newTask } });
            }
            catch (err) {
                res.status(500).send("Unable to update task list, try again");
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
                res.status(500).send("Unable to create task list, try again");
            }
        }
        if (newTask.onTaskWall) {
            const publicTaskList = await PublicTaskList.findOne({
                _user: req.user?._id,
            });
            if (publicTaskList) {
                try {
                }
                catch (err) {
                }
            }
        }
    });
};
exports.default = taskRoutes;
