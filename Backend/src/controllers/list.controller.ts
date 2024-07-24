import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as CardServices from "../services/cardServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

/**
 * Create  a card
 * @param req
 * @param res
 * @param next
 */
export const createCard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;
    const { body } = req;

    await CardServices.createCard(+listId, body);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.CREATED, { item: "Card" }),
    });
  } catch (error) {
    next(error);
  }
};
