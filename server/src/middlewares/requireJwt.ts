import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { model } from "mongoose";
import keys from "../config/keys";
import { UserType } from "../models/User";
import types from "../types/express";

const User = model<UserType>("users");

const { jwtSecret } = keys;

const verifyToken = (token: string) => {
  const { user } = jwt.verify(token, jwtSecret) as JwtPayload;

  return user;
};

export const requireJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const unprotectedPaths = req.path.includes("current_user");

  if (unprotectedPaths) {
    const user = req.cookies.token ? verifyToken(req.cookies.token) : undefined;

    const foundUser = await User.findOne({ _user: user?._user })
      .select(["-_id", "_user", "profile"])
      .exec();

    req.user = foundUser || undefined;

    next();
    return;
  }

  if (!req.cookies.token) {
    res.status(401).send("You must be logged in");
    return;
  }

  const { token } = req.cookies;

  const errorFunc = () => {
    req.user = undefined;
    res.clearCookie("token");
    res.status(401).send("You must be logged in");
    return;
  };

  try {
    const { user } = jwt.verify(token, jwtSecret) as JwtPayload;
    const foundUser = await User.findOne({ _user: user?._user }).exec();

    if (!foundUser) {
      errorFunc();
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    errorFunc();
  }
};

export default requireJwt;
