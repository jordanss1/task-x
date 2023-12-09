import { NextFunction, Request, Response } from "express";

const getCookies = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;

  if (cookies) {
    const values = cookies.split(";").reduce((res, item) => {
      const data = item.trim().split("=");

      return { ...res, [data[0] as string]: data[1] };
    }, {});

    req.cookies = values;
  }

  next();
};

export default getCookies;
