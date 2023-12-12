import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import keys from "../config/keys";
import types from "../types/express";

export const requireJwt = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    res.status(401);
    return next("You must be logged in");
  }
  const { token } = req.cookies;

  const { jwtSecret } = keys;

  try {
    const { user } = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(401).send({ error: "Incorrect token; please login" });
    res.redirect("/");
  }
};

export default requireJwt;
