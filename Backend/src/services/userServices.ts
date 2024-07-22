import { hash } from "bcrypt";
import { BadRequestError } from "../errors/BadRequestError";
import { IUser } from "../interfaces/user.interface";

import { UserModel } from "../models/user";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";

export const createUser = async (body: IUser) => {
  const { email } = body;

  const userExists = await UserModel.getUserByEmail(email);

  if (userExists) {
    throw new BadRequestError(
      interpolate(errorMessages.EXISTS, { item: "User" })
    );
  }

  const hashedPassword = await hash(body.password, 10);

  await UserModel.createUser({ ...body, password: hashedPassword });
};
