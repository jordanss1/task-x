"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    mongoURI: process.env.MONGO_URI,
};
exports.default = keys;
