"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const Profile_1 = require("./Profile");
const User_1 = require("./User");
exports.commentSchema = new mongoose_1.Schema({
    user: { required: true, type: User_1.userSchema },
    comment: { required: true, type: String },
    likes: {
        likes: { required: false, type: Number, default: 0 },
        users: { required: false, type: [Profile_1.profileSchema], default: [] },
    },
    created: { required: true, type: String },
});
