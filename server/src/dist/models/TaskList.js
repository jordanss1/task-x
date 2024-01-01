"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskListSchema = exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    task: { required: true, type: String },
    taskId: { required: true, type: String },
    enabledDueDate: { required: true, type: Boolean },
    dueDate: { required: false, type: String, default: undefined },
    created: { required: true, type: String },
    onTaskWall: { required: true, type: Boolean },
});
exports.taskListSchema = new mongoose_1.Schema({
    _user: { required: true, type: mongoose_1.Types.ObjectId, ref: "User" },
    tasks: { required: true, type: [exports.taskSchema], default: null },
});
(0, mongoose_1.model)("taskList", exports.taskListSchema);
(0, mongoose_1.model)("task", exports.taskSchema);
