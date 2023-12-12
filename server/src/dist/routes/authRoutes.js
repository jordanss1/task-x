"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const keys_1 = __importDefault(require("../config/keys"));
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const { jwtSecret } = keys_1.default;
const User = (0, mongoose_1.model)("users");
const googleAuthRoutes = (app) => {
    app.get(`/api/auth/google`, passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    }));
    app.get("/api/auth/google/callback", passport_1.default.authenticate("google", {
        session: false,
        failureRedirect: "/",
        failureMessage: "Login error, try again",
    }), (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { user } = req;
        const token = jsonwebtoken_1.default.sign({ user }, jwtSecret, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            expires: (0, dayjs_1.default)().add(1, "day").toDate(),
        });
        if (user?.userDetails) {
            res.redirect("/dashboard");
        }
        res.redirect("/setup");
    });
    app.get("/api/logout", requireJwt_1.default, (req, res) => {
        req.user = undefined;
        res.clearCookie("token");
        res.redirect("/");
    });
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
    app.post("/api/username_check", requireJwt_1.default, async (req, res) => {
        const match = await User.findOne({
            "userDetails.userName": req.body.username,
        })
            .select("userDetails.userName")
            .exec();
        res.send(match ? true : false);
    });
};
exports.default = googleAuthRoutes;
