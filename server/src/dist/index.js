"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const keys_1 = __importDefault(require("./config/keys"));
const getCookies_1 = __importDefault(require("./middlewares/getCookies"));
const redirectToClient_1 = __importDefault(require("./middlewares/redirectToClient"));
require("./models/Notifications");
require("./models/PublicTaskList");
require("./models/TaskList");
require("./models/User");
const assetsRoutes_1 = __importDefault(require("./routes/assetsRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const notificationsRoutes_1 = __importDefault(require("./routes/notificationsRoutes"));
const taskListRoutes_1 = __importDefault(require("./routes/taskListRoutes"));
const taskWallRoutes_1 = __importDefault(require("./routes/taskWallRoutes"));
require("./services/passport");
const { mongoURI } = keys_1.default;
(0, mongoose_1.connect)(mongoURI);
const app = (0, express_1.default)();
app.use('/api', express_1.default.static('src/public'));
console.log(`Running Node.js version: ${process.version}`);
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            'script-src-elem': [
                'https://task-x.onrender.com',
                'https://fontawesome.com',
                'https://kit.fontawesome.com/b3cd848b13.js',
                'https://ka-f.fontawesome.com',
                'https://*.google.com',
                'https://accounts.google.com/gsi/client',
            ],
            'default-src': [
                'https://task-x.onrender.com',
                'https://fontawesome.com',
                'https://kit.fontawesome.com/b3cd848b13.js',
                'https://ka-f.fontawesome.com',
                'https://*.google.com',
                'https://accounts.google.com/gsi/client',
            ],
        },
    },
}));
app.use(body_parser_1.default.json());
app.use(getCookies_1.default);
if (process.env.NODE_ENV !== 'production') {
    (0, redirectToClient_1.default)(app);
}
(0, authRoutes_1.default)(app);
(0, assetsRoutes_1.default)(app);
(0, taskListRoutes_1.default)(app);
(0, taskWallRoutes_1.default)(app);
(0, notificationsRoutes_1.default)(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../client', 'dist', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
