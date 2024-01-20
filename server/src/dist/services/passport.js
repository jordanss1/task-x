"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = __importDefault(require("../config/keys"));
const { googleClientId, googleSecret } = keys_1.default;
const GoogleStrategy = passport_google_oauth20_1.Strategy;
const User = (0, mongoose_1.model)("users");
passport_1.default.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleSecret,
    callbackURL: "/api/auth/google/callback",
    proxy: true,
}, async (token, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ _user: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }
    const newUser = await new User({
        _user: profile.id,
    }).save();
    return done(null, newUser);
}));
