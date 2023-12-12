"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redirectToClient = (app) => {
    const paths = ["/setup", "/dashboard"];
    paths.forEach((path) => app.use(path, (req, res, next) => {
        res.redirect(`http://localhost:5173${path}`);
        next();
    }));
};
exports.default = redirectToClient;
