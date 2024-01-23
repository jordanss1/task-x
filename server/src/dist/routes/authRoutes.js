"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const createTokenAndCookie_1 = __importDefault(require("../functions/createTokenAndCookie"));
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const User = (0, mongoose_1.model)("users");
const TaskList = (0, mongoose_1.model)("taskList");
const PublicTaskList = (0, mongoose_1.model)("publicTaskList");
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
            "profile.nameLowerCase": req.body.username.toLowerCase(),
        })
            .select("profile.userName")
            .exec();
        res.send(match ? true : false);
    });
    app.post("/api/profile", requireJwt_1.default, async (req, res) => {
        const { userName, profilePicture } = req.body;
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.user?._id }, {
                profile: {
                    _user: req.user?._user,
                    userName,
                    profilePicture,
                    nameLowerCase: userName.toLowerCase(),
                },
            }, { new: true }).exec();
            const response = (0, createTokenAndCookie_1.default)(updatedUser, res);
            req.user = updatedUser;
            response.send(updatedUser);
        }
        catch (err) {
            res.status(500).send("Server error please try again");
        }
    });
    app.patch("/api/profile", requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { userName, profilePicture } = req.body;
        try {
            const user = await User.findOneAndUpdate({ _id: req.user?._id }, {
                profile: {
                    _user: req.user._user,
                    userName,
                    profilePicture,
                    nameLowerCase: userName.toLowerCase(),
                },
            }, { new: true }).exec();
            const response = (0, createTokenAndCookie_1.default)(user, res);
            response.send(user);
        }
        catch (err) {
            res.status(500).send("Problem updating profile, try again");
        }
    });
    app.delete("/api/profile", requireJwt_1.default, async (req, res) => {
        try {
            await TaskList.findOneAndDelete({ _user: req.user?._user });
        }
        catch (err) {
            res.status(500).send("Problem deleting your tasks, try again");
            return;
        }
        try {
            await PublicTaskList.findOneAndDelete({ _user: req.user?._user }).exec();
        }
        catch (err) {
            res.status(500).send("Problem deleting your tasks, try again");
            return;
        }
        try {
            await PublicTaskList.updateMany({}, {
                $pull: {
                    "tasks.$[].comments": {
                        "user._user": req.user?._user,
                    },
                    "tasks.$[].likes.users": {
                        _user: req.user?._user,
                    },
                },
                $inc: {
                    "tasks.$[like].likes.likes": -1,
                },
            }, { arrayFilters: [{ "like.likes.users._user": req.user?._user }] });
            await PublicTaskList.updateMany({}, {
                $inc: {
                    "tasks.$[].comments.$[like].likes.likes": -1,
                },
                $pull: {
                    "tasks.$[].comments.$[].likes.users": {
                        _user: req.user?._user,
                    },
                },
            }, { arrayFilters: [{ "like.likes.users._user": req.user?._user }] }).exec();
        }
        catch (err) {
            res.status(500).send("Problem deleting your content, try again");
            return;
        }
        try {
            await User.findOneAndDelete({
                _user: req.user?._user,
            }).exec();
            req.user = undefined;
            res.clearCookie("token");
        }
        catch (err) {
            res.status(500).send("Problem deleting your account, try again");
        }
        res.status(200).send();
    });
};
exports.default = googleAuthRoutes;
