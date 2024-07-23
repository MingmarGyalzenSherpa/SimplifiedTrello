import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as BoardServices from "../services/boardServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
export const getBoards = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    console.log(req.user);
    console.log(req.params);
    const users = await BoardServices.getBoards(userId!);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
