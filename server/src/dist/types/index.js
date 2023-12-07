"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRequestWithUser = void 0;
const assertRequestWithUser = (req) => {
    if (req.user === undefined) {
        throw new Error("User not found on request object");
    }
};
exports.assertRequestWithUser = assertRequestWithUser;
// export const assertRequestHasProperties: <Properties>(
//   req: Request,
//   props: PropTypes[]
// ) => asserts req is RequestWithProperties<Properties> = (req, props) => {
//   if (props && props.some((prop) => req[prop] === undefined)) {
//     throw new Error("Request does not have these properties");
//   }
// };
