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
      message: interpolate(successMessages.FETCHED, { item: "Boards" }),
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUsersByBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: boardId } = req.params;
    const data = await BoardServices.getUsersByBoard(+boardId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const { id: boardId } = req.params;
    const { body } = req;

    await BoardServices.updateBoard(userId!, +boardId, body);
  } catch (error) {
    next(error);
  }
};
