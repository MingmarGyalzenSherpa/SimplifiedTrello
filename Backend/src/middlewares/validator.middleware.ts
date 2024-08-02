import { Schema } from "joi";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import { NextFunction, Response } from "express";
import { BadRequestError } from "../errors/BadRequestError";

export const validateReqBody =
  (schema: Schema) =>
  (req: IExpressRequest, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      next(new BadRequestError(error.message));
    }

    req.body = value;
    next();
  };

export const validateReqQuery =
  (schema: Schema) =>
  (req: IExpressRequest, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      next(new BadRequestError(error.message));
    }
    req.query = value;
    next();
  };
