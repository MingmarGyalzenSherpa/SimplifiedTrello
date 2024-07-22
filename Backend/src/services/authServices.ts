import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { BadRequestError } from "../errors/BadRequestError";
import { IUser } from "../interfaces/IUser";

import { UserModel } from "../models/user";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";
import { ILoginCredential } from "../interfaces/ILoginCredential";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IUserPayload } from "../interfaces/IUserPayload";
import { config } from "../config";

/**
 * Create a new user
 * @param body
 */
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

/**
 * Login a user
 *
 * @param credentials - credentials of the user
 * @returns {Promise<object>} - object containing access and refresh token
 */
export const login = async (credentials: ILoginCredential): Promise<object> => {
  const user = await UserModel.getUserByEmail(credentials.email);

  if (!user) {
    throw new UnauthorizedError(
      interpolate(errorMessages.INCORRECT, { item: "email or password" })
    );
  }
  console.log(credentials);

  const isValidPassword = await compare(credentials.password, user.password);

  if (!isValidPassword) {
    throw new UnauthorizedError(
      interpolate(errorMessages.INCORRECT, { item: "email or password" })
    );
  }

  const payload: IUserPayload = {
    id: user.id!,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  const accessToken = jwt.sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = jwt.sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
};
