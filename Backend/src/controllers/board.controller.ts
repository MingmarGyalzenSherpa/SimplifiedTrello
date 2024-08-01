import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as BoardServices from "../services/boardServices";
import * as ListServices from "../services/ListServices";
import { interpolate } from "../utils/interpolate";
import { successMessages } from "../utils/message";

/**
 * Get boards by user
 *
 * @param req
 * @param res
 * @param next
 */
export const getBoardsByUser = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const boards = await BoardServices.getBoardsByUser(userId!);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Boards" }),
      data: boards,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getBoardById = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const board = await BoardServices.getBoardById(+boardId);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Boards" }),
      data: board,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Get users by board
 *
 * @param req
 * @param res
 * @param next
 */
export const getUsersByBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const data = await BoardServices.getUsersByBoard(+boardId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Users" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update the board
 * @param req
 * @param res
 * @param next
 */
export const updateBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user!;
    const { boardId } = req.params;
    const { body } = req;

    await BoardServices.updateBoard(userId!, +boardId, body);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.UPDATED, { item: "Board" }),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteBoardById = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;

    await BoardServices.deleteBoardById(+boardId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.DELETED, { item: "Board" }),
    });
  } catch (error) {
    next(error);
  }
};

export const getLabelsByBoard = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;

    const data = await BoardServices.getLabelsByBoard(+boardId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Labels" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new list
 *
 * @param req
 * @param res
 * @param next
 */
export const createList = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const { body } = req;

    const data = await ListServices.createList(+boardId, body);

    res.status(HttpStatusCodes.CREATED).json({
      message: interpolate(successMessages.CREATED, { item: "List" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get lists in  a board
 * @param req
 * @param res
 * @param next
 */
export const getLists = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;

    const data = await ListServices.getLists(+boardId);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.FETCHED, { item: "Lists" }),
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update list
 * @param req
 * @param res
 * @param next
 */
export const updateList = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;
    const { body } = req;
    await ListServices.updateList(+listId, body);

    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.UPDATED, { item: "List" }),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (
  req: IExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params;
    await ListServices.deleteList(+listId);
    res.status(HttpStatusCodes.OK).json({
      message: interpolate(successMessages.DELETED, { item: "List" }),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
