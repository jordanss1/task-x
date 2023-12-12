"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCookies = (req, res, next) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const values = cookies.split(";").reduce((res, item) => {
            const data = item.trim().split("=");
            return { ...res, [data[0]]: data[1] };
        }, {});
        req.cookies = values;
        return next();
    }
    req.cookies = {};
    next();
};
exports.default = getCookies;
