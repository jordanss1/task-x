"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicTaskListSchema = exports.publicTaskSchema = void 0;
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
const User_1 = require("./User");
exports.publicTaskSchema = new mongoose_1.Schema({
    task: { required: true, type: String },
    taskId: { required: true, type: String },
    user: { type: User_1.userSchema, required: true },
    enabledDueDate: { required: true, type: Boolean },
    dueDate: { required: false, type: String, default: null },
    created: { required: true, type: String },
    complete: { required: false, type: Boolean, default: false },
    awards: {
        required: false,
        type: Array,
        default: [],
    },
    likes: { required: false, type: Number, default: 0 },
    comments: { type: [Comment_1.commentSchema], required: false, default: [] },
});
exports.publicTaskListSchema = new mongoose_1.Schema({
    _user: { required: true, type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    tasks: { required: true, type: [exports.publicTaskSchema], default: null },
    totalTasks: { required: true, type: Number, default: 0 },
});
(0, mongoose_1.model)("publicTaskList", exports.publicTaskListSchema);
(0, mongoose_1.model)("publicTask", exports.publicTaskSchema);
