"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Profile_1 = require("./Profile");
exports.userSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true },
    profile: { type: Profile_1.profileSchema, default: null, required: false },
});
(0, mongoose_1.model)("users", exports.userSchema);
