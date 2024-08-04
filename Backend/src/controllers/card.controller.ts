import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as CardServices from "../services/cardServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
export const getCardsOfUser = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user);
    const { id } = req.user!;
    const data = await CardServices.getCardsOfUser(id!);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users card" }),
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addUserToCard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const { email } = req.body;
    await CardServices.addUserToCard(cardId, email);
    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.ADDED, { item: "User " }),
    });
  } catch (error) {
    next(error);
  }
};
