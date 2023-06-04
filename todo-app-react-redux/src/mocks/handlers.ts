import { MockedRequest, RestHandler, rest } from "msw";
import { server } from "./server";
import { TodoType } from "../features/todos/todosSlice";

export const todosGet = (
  data: TodoType[] | []
): RestHandler<MockedRequest<TodoType[] | []>> => {
  return rest.get("http://localhost:3001/todos", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(data))
  );
};

export const todosPost = (
  data: TodoType
): RestHandler<MockedRequest<TodoType>> => {
  return rest.post("http://localhost:3001/todos", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(data))
  );
};

export const todosDelete = () =>
  rest.delete("http://localhost:3001/todos", (req, res, ctx) =>
    res(ctx.status(200))
  );

export const todosPatch = (
  data: TodoType
): RestHandler<MockedRequest<TodoType>> => {
  return rest.patch(
    "http://localhost:3001/todos",
    async (req, res, ctx) => await res(ctx.status(200), ctx.json(data))
  );
};

type MockRestTypes =
  | typeof todosGet
  | typeof todosPatch
  | typeof todosDelete
  | typeof todosPost;

const handlerIsTodosDelete = (
  handler: MockRestTypes
): handler is typeof todosDelete => handler.name === "todosDelete";

const handlerIsTodosGet = (
  handler: MockRestTypes,
  name: string
): handler is typeof todosGet => handler.name === name;

export const changeHandlerAndResponse = (
  handler: MockRestTypes,
  response?: TodoType[] | TodoType | []
): void => {
  if (handlerIsTodosDelete(handler)) {
    let data = handler();
    server.use(data);
  } else if (handlerIsTodosGet(handler, "todosGet") && response) {
    let data = handler(response as TodoType[] | []);
    server.use(data);
  } else if (!handlerIsTodosGet(handler, "todosGet") && response) {
    let data = handler(response as TodoType);
    server.use(data);
  }
};

// export const googleOAuth = [
//   rest.get("https://accounts.google.com/gsi/client", (req, res, ctx) => {
//     return res(ctx.status(200));
//   }),
//   rest.get("https://accounts.google.com/gsi/button", (req, res, ctx) => {
//     return res(ctx.status(200));
//   }),
// ];
