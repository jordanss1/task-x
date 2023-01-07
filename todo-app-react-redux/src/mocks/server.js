import { setupServer } from "msw/node";
import { googleOAuth } from "./handlers";

export const server = setupServer(...googleOAuth);
