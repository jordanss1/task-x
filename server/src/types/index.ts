import { Request } from "express";
import types from "./express/index";

type RequestWithUser<reqBody> = Request<{}, any, reqBody> & {
  user: Express.User;
};

type RequestWithProperties<Props> = Request & Props;

export const assertRequestWithUser: <reqBody>(
  req: Request
) => asserts req is RequestWithUser<reqBody> = (req) => {
  if (req.user === undefined) {
    throw new Error("User not found on request object");
  }
};

type PropTypes = "cookie";

// export const assertRequestHasProperties: <Properties>(
//   req: Request,
//   props: PropTypes[]
// ) => asserts req is RequestWithProperties<Properties> = (req, props) => {
//   if (props && props.some((prop) => req[prop] === undefined)) {
//     throw new Error("Request does not have these properties");
//   }
// };
