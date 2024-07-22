import { Request } from "express";
import { IUser } from "./IUser";

export interface IExpressRequest extends Request {
  user?: IUser;
}
