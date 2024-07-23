import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as WorkspaceServices from "../services/workspaceService";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

/**
 * Create a workspace
 *
 * @param req
 * @param res
 * @param next
 */
export const createWorkspace = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user!;
  const { body } = req;

  const data = await WorkspaceServices.createWorkspace(userId!, body);

  res.status(HttpStatusCodes.CREATED).json({
    message: interpolate(successMessages.CREATED, { item: "Workspace" }),
    data,
  });
};
