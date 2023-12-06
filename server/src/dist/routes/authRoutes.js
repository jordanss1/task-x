"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const keys_1 = __importDefault(require("../config/keys"));
const { clientUrl, jwtSecret } = keys_1.default;
const User = (0, mongoose_1.model)("users");
const googleAuthRoutes = (app) => {
    app.get(`/auth/google`, passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", {
        session: false,
        failureRedirect: clientUrl,
        failureMessage: "Login error, try again",
    }), (req, res) => {
        const { user } = req;
        const token = jsonwebtoken_1.default.sign({ ...user }, jwtSecret, {
            expiresIn: "1h",
        });
        res.cookie("token", token);
        if (user?.userDetails) {
            res.redirect(`${clientUrl}/dashboard`);
        }
        res.redirect(`${clientUrl}/setup`);
    });
    app.get("/api/logout", (req, res) => {
        req.logout({}, () => { });
        res.redirect("/");
    });
    app.get("/api/current_user", (req, res) => {
        console.log(req.user);
        res.send(req.user);
    });
};
exports.default = googleAuthRoutes;
