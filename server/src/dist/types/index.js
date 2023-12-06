"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRequestWithUser = void 0;
const assertRequestWithUser = (res) => {
    if (res.user === undefined) {
        throw new Error("User not found on request object");
    }
};
exports.assertRequestWithUser = assertRequestWithUser;
