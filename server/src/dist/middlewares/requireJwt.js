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
        req.user = user;
        next();
    }
    catch (err) {
        res.clearCookie("token");
        res.status(401).send({ error: "You must be logged in" });
        res.redirect(clientUrl);
    }
};
exports.requireJwt = requireJwt;
exports.default = exports.requireJwt;
