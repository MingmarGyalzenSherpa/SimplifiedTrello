import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

export const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: +process.env.ACCESS_TOKEN_EXPIRY_MS!,
    refreshTokenExpiryMS: +process.env.REFRESH_TOKEN_EXPIRY_MS!,
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
