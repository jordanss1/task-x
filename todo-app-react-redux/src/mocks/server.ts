import { setupServer } from "msw/node";
import { todosGet } from "./handlers";
import { todosExistForLoggedInUser } from "./api";

const data = todosGet(todosExistForLoggedInUser);

export const server = setupServer(data);
