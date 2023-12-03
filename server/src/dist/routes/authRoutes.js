"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const keys_1 = __importDefault(require("../config/keys"));
const googleAuthRoutes = (app) => {
    app.get(`/auth/google`, passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
    app.get("/auth/google/callback", (req, res) => {
        res.redirect(`${keys_1.default.clientUrl}/dashboard`);
    });
};
exports.default = googleAuthRoutes;
