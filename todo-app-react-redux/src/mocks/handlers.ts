import { MockedRequest, RestHandler, rest } from "msw";
import { server } from "./server";
import { MockedTodosResponseType } from "./api";

export const todosEndpoint = (
  data: MockedTodosResponseType
): RestHandler<MockedRequest<MockedTodosResponseType>>[] => {
  return [
    rest.get("http://localhost:3001/todos", (req, res, ctx) =>
      res(ctx.status(200), ctx.json(data))
    ),
    rest.delete("http://localhost:3001/todos/", (req, res, ctx) =>
      res(ctx.status(200))
    ),
    rest.patch("http://localhost:3001/todos/", (req, res, ctx) =>
      res(ctx.status(200))
    ),
    rest.post("http://localhost:3001/todos/", (req, res, ctx) =>
      res(ctx.status(200))
    ),
  ];
};

export const changeResponse = (response: MockedTodosResponseType): void => {
  let data = todosEndpoint(response);
  server.use(...data);
};

// export const googleOAuth = [
//   rest.get("https://accounts.google.com/gsi/client", (req, res, ctx) => {
//     return res(ctx.status(200));
//   }),
//   rest.get("https://accounts.google.com/gsi/button", (req, res, ctx) => {
//     return res(ctx.status(200));
//   }),
// ];
