"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
exports.commentSchema = new mongoose_1.Schema({
    user: { required: true, type: User_1.userSchema },
    comment: { required: true, type: String },
    likes: { required: true, type: Number },
});
