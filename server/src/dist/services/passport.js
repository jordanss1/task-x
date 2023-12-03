"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = __importDefault(require("../config/keys"));
const GoogleStrategy = passport_google_oauth20_1.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: keys_1.default.googleClientId,
    clientSecret: keys_1.default.googleSecret,
    callbackURL: `${keys_1.default.serverUrl}/auth/google/callback`,
}, (token) => console.log(token)));
