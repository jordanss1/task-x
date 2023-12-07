import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import keys from "../config/keys";
import types from "../types/express";

export const requireJwt = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  const { jwtSecret, clientUrl } = keys;

  try {
    const { user } = jwt.verify(token, jwtSecret) as JwtPayload;
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect(clientUrl);
  }
};

export default requireJwt;
