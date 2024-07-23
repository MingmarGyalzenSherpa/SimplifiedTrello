import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as WorkspaceServices from "../services/workspaceService";

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

  await WorkspaceServices.createWorkspace(userId!, body);
};
