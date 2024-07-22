import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as UserServices from "../services/userServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";
import { IExpressRequest } from "../interfaces/IExpressRequest";

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
    console.log(error);
    next(error);
  }
};

// export const login = async (req:)
