import { setupServer } from "msw/node";
import { todosEndpoint } from "./handlers";
import { todosExistForLoggedInUser } from "./api";

const data = todosEndpoint(todosExistForLoggedInUser);

export const server = setupServer(...data);
