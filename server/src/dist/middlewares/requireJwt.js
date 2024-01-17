"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const keys_1 = __importDefault(require("../config/keys"));
const User = (0, mongoose_1.model)("users");
const { jwtSecret } = keys_1.default;
const verifyToken = (token) => {
    const { user } = jsonwebtoken_1.default.verify(token, jwtSecret);
    return user;
};
const requireJwt = async (req, res, next) => {
    const unprotectedPaths = req.path.includes("current_user");
    if (unprotectedPaths) {
        const user = req.cookies.token ? verifyToken(req.cookies.token) : undefined;
        const foundUser = await User.findOne({ userId: user?.userId })
            .select(["-_id", "userId", "profile"])
            .exec();
        req.user = foundUser || undefined;
        next();
        return;
    }
    if (!req.cookies.token) {
        res.status(401).send("You must be logged in");
        return;
    }
    const { token } = req.cookies;
    const errorFunc = () => {
        req.user = undefined;
        res.clearCookie("token");
        res.status(401).send("You must be logged in");
        return;
    };
    try {
        const { user } = jsonwebtoken_1.default.verify(token, jwtSecret);
        const foundUser = await User.findOne({ userId: user?.userId }).exec();
        if (!foundUser) {
            errorFunc();
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        errorFunc();
    }
};
exports.requireJwt = requireJwt;
exports.default = exports.requireJwt;
