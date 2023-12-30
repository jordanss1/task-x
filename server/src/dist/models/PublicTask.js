"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicTaskSchema = void 0;
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
const User_1 = require("./User");
exports.publicTaskSchema = new mongoose_1.Schema({
    task: { required: true, type: String },
    taskId: { required: true, type: String, default: null },
    user: { type: User_1.userSchema, required: true },
    enabledDueDate: { required: true, type: Boolean },
    dueDate: { required: false, type: String },
    created: { required: true, type: String },
    awards: {
        required: true,
        type: Array,
    },
    likes: { required: true, type: Number, default: null },
    comments: { type: [Comment_1.commentSchema], required: false, default: null },
});
