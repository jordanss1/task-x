"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const mongoose_1 = require("mongoose");
exports.profileSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    profilePicture: { type: String, required: true },
});
