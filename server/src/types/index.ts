import { Request } from "express";
import types from "./express/index";

type RequestWithUser = Request & { user: Express.User };

export const assertRequestWithUser: (
  res: Request
) => asserts res is RequestWithUser = (res) => {
  if (res.user === undefined) {
    throw new Error("User not found on request object");
  }
};
