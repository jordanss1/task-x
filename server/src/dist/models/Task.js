"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    task: { required: true, type: String },
    taskId: { required: true, type: String, default: null },
    enabledDueDate: { required: true, type: Boolean },
    dueDate: { required: false, type: Date },
    created: { required: true, type: Date },
    onTaskWall: { required: true, type: Boolean },
});
