"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("../../config/keys"));
const awardUrls = [
    `${keys_1.default.serverUrl}/api/awards/gold-medal`,
    `${keys_1.default.serverUrl}/api/awards/heart-award.svg`,
    `${keys_1.default.serverUrl}/api/awards/medal-silver.svg`,
    `${keys_1.default.serverUrl}/api/awards/sparkles.svg`,
];
exports.default = awardUrls;
