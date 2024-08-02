import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as AuthServices from "../services/authServices";
import { interpolate } from "../utils/interpolate";
import { errorMessages, successMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import { BadRequestError } from "../errors/BadRequestError";

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

    await AuthServices.createUser(body);

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
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: credentials } = req;

    const data = await AuthServices.login(credentials);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Refresh tokens
 *
 * @param req
 * @param res
 * @param next
 */
export const refresh = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new BadRequestError(errorMessages.BAD_REQUEST);
    }
    const data = AuthServices.refresh(refreshToken);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    res.status(HttpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};
