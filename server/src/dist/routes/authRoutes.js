"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const keys_1 = __importDefault(require("../config/keys"));
const createTokenAndCookie_1 = __importDefault(require("../functions/createTokenAndCookie"));
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
        const response = (0, createTokenAndCookie_1.default)(user, res);
        if (user?.profile) {
            response.redirect("/dashboard/home");
            return;
        }
        response.redirect("/setup");
    });
    app.get("/api/logout", requireJwt_1.default, (req, res) => {
        req.user = undefined;
        res.clearCookie("token");
        res.redirect("/");
    });
    app.get("/api/current_user", requireJwt_1.default, (req, res) => {
        res.send(req.user);
    });
    app.post("/api/username_check", requireJwt_1.default, async (req, res) => {
        const match = await User.findOne({
            "profile.userName": req.body.username,
        })
            .select("profile.userName")
            .exec();
        res.send(match ? true : false);
    });
    app.post("/api/profileUpdate", requireJwt_1.default, async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.user?._id }, {
                profile: req.body,
            }, { new: true });
            const response = (0, createTokenAndCookie_1.default)(updatedUser, res);
            req.user = updatedUser;
            response.send(updatedUser);
        }
        catch (err) {
            res.status(500).send("Server error please try again");
        }
    });
};
exports.default = googleAuthRoutes;
