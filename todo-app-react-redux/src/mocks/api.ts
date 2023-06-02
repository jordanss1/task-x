import { TodoType } from "../features/todos/todosSlice";

export type MockedTodosResponseType = {
  todos: TodoType[] | [];
};

export const todosExistForLoggedInUser: MockedTodosResponseType = {
  todos: [
    {
      todo: "Go to gym",
      userId: "7286382",
      id: 4,
    },
    {
      todo: "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et olr",
      userId: "7286382",
      id: 10,
    },
    {
      todo: "t",
      userId: "117038401482671780523",
      id: 11,
    },
    {
      todo: "User added",
      userId: "12345678",
      id: 12,
    },
  ],
};

export const noTodosForLoggedInUser: MockedTodosResponseType = {
  todos: [
    {
      todo: "Go to gym",
      userId: "7286382",
      id: 4,
    },
    {
      todo: "Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut labore et olr",
      userId: "7286382",
      id: 10,
    },
    {
      todo: "t",
      userId: "117038401482671780523",
      id: 11,
    },
  ],
};
