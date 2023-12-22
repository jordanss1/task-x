"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
const { jwtSecret } = keys_1.default;
const createTokenAndCookie = (user, res) => {
    res.clearCookie("token");
    const token = jsonwebtoken_1.default.sign({ user }, jwtSecret, {
        expiresIn: "4h",
    });
    res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: (0, dayjs_1.default)().add(4, "hours").toDate(),
    });
    return res;
};
exports.default = createTokenAndCookie;
