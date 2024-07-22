import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/userServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";

/**
 * Signup a user
 *
 * @param req
 * @param res
 * @param next
 */
export const signup = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    await UserServices.createUser(body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "User" }),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login a user
 *
 * @param req
 * @param res
 * @param next
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    next(error);
  }
};
