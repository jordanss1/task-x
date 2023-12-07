"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const keys_1 = __importDefault(require("../config/keys"));
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const { clientUrl, jwtSecret } = keys_1.default;
const googleAuthRoutes = (app) => {
    app.get(`/auth/google`, passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
    }));
    app.get("/auth/google/callback", passport_1.default.authenticate("google", {
        session: false,
        failureRedirect: clientUrl,
        failureMessage: "Login error, try again",
    }), (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { user } = req;
        const token = jsonwebtoken_1.default.sign({ user }, jwtSecret, {
            expiresIn: "2h",
        });
        res.cookie("token", token, { httpOnly: true });
        req.user = user;
        if (user?.userDetails) {
            res.redirect(`${clientUrl}/dashboard`);
        }
        res.redirect(`${clientUrl}/setup`);
    });
    app.get("/api/logout", (req, res) => {
        req.logout({}, () => { });
        res.redirect("/");
    });
    app.get("/api/current_user", requireJwt_1.default, (req, res) => {
        res.send(req.user);
    });
};
exports.default = googleAuthRoutes;
