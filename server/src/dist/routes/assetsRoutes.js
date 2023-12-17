"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awardUrls_1 = __importDefault(require("../public/awards/awardUrls"));
const profileUrls_1 = __importDefault(require("../public/profileIcons/profileUrls"));
const assetsRoutes = (app) => {
    app.get("/api/assets/profileIcons", (req, res) => {
        res.send(profileUrls_1.default);
    });
    app.get("/api/assets/awards", (req, res) => {
        res.send(awardUrls_1.default);
    });
};
exports.default = assetsRoutes;
