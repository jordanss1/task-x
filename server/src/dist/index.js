"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const keys_1 = __importDefault(require("./config/keys"));
const getCookies_1 = __importDefault(require("./middlewares/getCookies"));
require("./models/User");
const assetsRoutes_1 = __importDefault(require("./routes/assetsRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require("./services/passport");
const { mongoURI, clientUrl } = keys_1.default;
(0, mongoose_1.connect)(mongoURI);
const app = (0, express_1.default)();
app.use("/api", express_1.default.static("src/public"));
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use((0, cors_1.default)({ origin: clientUrl, credentials: true }));
app.use(body_parser_1.default.json());
app.use(getCookies_1.default);
(0, authRoutes_1.default)(app);
(0, assetsRoutes_1.default)(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
