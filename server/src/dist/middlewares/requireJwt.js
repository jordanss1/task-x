"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
const { jwtSecret } = keys_1.default;
const verifyToken = (token) => {
    const { user } = jsonwebtoken_1.default.verify(token, jwtSecret);
    return user;
};
const requireJwt = (req, res, next) => {
    const unprotectedPaths = req.path.includes("current_user");
    if (unprotectedPaths) {
        req.user = req.cookies.token ? verifyToken(req.cookies.token) : undefined;
        return next();
    }
    if (!req.cookies.token) {
        res.status(401);
        return next("You must be logged in");
    }
    const { token } = req.cookies;
    try {
        const { user } = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = user;
        next();
    }
    catch (err) {
        req.user = undefined;
        res.clearCookie("token");
        res.status(401).send("Error authenticating user, please login again");
        res.redirect("/");
    }
};
exports.requireJwt = requireJwt;
exports.default = exports.requireJwt;
