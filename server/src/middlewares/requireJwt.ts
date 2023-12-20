import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import keys from "../config/keys";
import types from "../types/express";

const { jwtSecret } = keys;

const verifyToken = (token: string) => {
  const { user } = jwt.verify(token, jwtSecret) as JwtPayload;

  return user;
};

export const requireJwt = (req: Request, res: Response, next: NextFunction) => {
  const unprotectedPaths = req.path.includes("current_user");

  if (unprotectedPaths) {
    req.user = req.cookies.token ? verifyToken(req.cookies.token) : undefined;
    return next();
  }

  if (!req.cookies.token) {
    res.status(401);
    return next("You must be logged in");
  }

  const { token } = req.cookies;

  try {
    const { user } = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    req.user = undefined;
    res.clearCookie("token");
    res.status(401).send("Error authenticating user, please login again");
    res.redirect("/");
  }
};

export default requireJwt;
