import { rest } from "msw";

export const googleOAuth = [
  rest.get("https://accounts.google.com/gsi/client", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("https://accounts.google.com/gsi/button", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
