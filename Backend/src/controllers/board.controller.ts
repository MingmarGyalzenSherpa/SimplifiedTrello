import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as BoardServices from "../services/boardServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

export const getBoardsByUser = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const users = await BoardServices.getBoardsByUser(userId!);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const { id: workspaceId } = req.params;
    const { body } = req;
    await BoardServices.createBoard(userId!, +workspaceId, body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "Board" }),
    });
  } catch (error) {
    next(error);
  }
};
