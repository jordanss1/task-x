import dayjs from "dayjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import keys from "../config/keys";

const { jwtSecret } = keys;

const createTokenAndCookie = (user: Express.User, res: Response) => {
  res.clearCookie("token");

  const token = jwt.sign({ user }, jwtSecret, {
    expiresIn: "4h",
  });

  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: dayjs().add(4, "hours").toDate(),
  });

  return res;
};

export default createTokenAndCookie;
