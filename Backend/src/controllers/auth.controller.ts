import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/userServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

export const signup = async (
  req: Request,
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
    console.log(error);
    next(error);
  }
};
