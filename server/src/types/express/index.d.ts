import { Express } from "express";
import { Document, HydratedDocument } from "mongoose";
import { UserType, ValidUserType } from "../../models/User";

declare global {
  export namespace Express {
    export interface User
      extends HydratedDocument<UserType>,
        HydratedDocument<ValidUserType> {
      id?: string;
    }

    export interface Response {
      user?: Express.User;
    }
  }
}
