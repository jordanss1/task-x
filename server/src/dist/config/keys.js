"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prod_1 = __importDefault(require("./prod"));
let keys;
if (process.env.NODE_ENV === "production") {
    keys = prod_1.default;
}
else {
    keys = require("./dev").default;
}
exports.default = keys;
