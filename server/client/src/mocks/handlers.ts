import { rest } from "msw";
import { TodoType } from "../features/todos/todosSlice";
import { server } from "./server";

type ResponseTypes = TodoType[] | TodoType;

export const changeTodoHandler = (data?: ResponseTypes) => {
  let selectedHandler;

  if (data && data instanceof Array) {
    selectedHandler = [
      rest.get(
        "http://localhost:3001/todos",
        async (req, res, ctx) => await res(ctx.status(200), ctx.json(data))
      ),
    ];
  } else if (data && data.id) {
    selectedHandler = [
      rest.patch(
        "http://localhost:3001/todos/:id",
        async (req, res, ctx) => await res(ctx.status(200), ctx.json(data))
      ),
      rest.post(
        "http://localhost:3001/todos",
        async (req, res, ctx) => await res(ctx.status(200), ctx.json(data))
      ),
    ];
  } else {
    selectedHandler = [
      rest.delete(
        "http://localhost:3001/todos/:id",
        async (req, res, ctx) => await res(ctx.status(200))
      ),
    ];
  }

  server.use(...selectedHandler);
};
