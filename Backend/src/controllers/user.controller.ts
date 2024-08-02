import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as UserServices from "../services/userServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
export const searchUsers = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const { id: userId } = req.user!;
    const data = await UserServices.searchUsers(query, userId!);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};
