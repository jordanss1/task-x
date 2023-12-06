"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const UserDetails_1 = require("./UserDetails");
exports.userSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true },
    userDetails: { type: UserDetails_1.userDetailsSchema, default: null, required: false },
});
(0, mongoose_1.model)("users", exports.userSchema);
