import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { BadRequestError } from "../errors/BadRequestError";
import { IUser } from "../interfaces/IUser";

import { UserModel } from "../models/user";
import { interpolate } from "../utils/interpolate";
import { errorMessages } from "../utils/message";
import { ILoginPayload } from "../interfaces/ILoginCredential";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IUserPayload } from "../interfaces/IUserPayload";
import { config } from "../config";

/**
 * Create a new user
 * @param body
 */
export const createUser = async (body: IUser) => {
  const { email } = body;
  const users = await UserModel.getUsersByEmail(email);

  if (users?.length > 0) {
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
export const login = async (credentials: ILoginPayload): Promise<object> => {
  const users = await UserModel.getUsersByEmail(credentials.email);
  const user = users && users[0];

  if (!user) {
    throw new UnauthorizedError(
      interpolate(errorMessages.INCORRECT, { item: "email or password" })
    );
  }

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
    firstName: user.firstName,
    lastName: user.lastName,
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

/**
 * Refresh token
 *
 * @param refreshToken - refresh token
 * @returns
 */
export const refresh = (refreshToken: string) => {
  try {
    const payload = jwt.verify(
      refreshToken,
      config.jwt.secret!
    ) as IUserPayload;

    const { id, username, email, firstName, lastName } = payload;

    const newPayload = {
      id,
      username,
      email,
      firstName,
      lastName,
    };
    const accessToken = jwt.sign(newPayload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryMS,
    });
    const newRefreshToken = jwt.sign(newPayload, config.jwt.secret!, {
      expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new UnauthorizedError(errorMessages.UNAUTHORIZED_ACCESS);
  }
};
