"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
const requireJwt = (req, res, next) => {
    const { token } = req.cookies;
    const { jwtSecret, clientUrl } = keys_1.default;
    try {
        const { user } = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log(user);
        req.user = user;
        next();
    }
    catch (err) {
        res.clearCookie("token");
        res.redirect(clientUrl);
    }
};
exports.requireJwt = requireJwt;
exports.default = exports.requireJwt;
