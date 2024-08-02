import { Request } from "express";
import { IUser } from "./IUser";
import { IGetRequestQuery } from "./IGetRequestQuery";

export interface IExpressRequest
  extends Request<any, any, any, IGetRequestQuery> {
  user?: IUser;
}
