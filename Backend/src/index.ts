import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "./config";
import router from "./routes/index.routes";
import {
  genericErrorHandler,
  notFound,
} from "./middlewares/errorHandler.middleware";
import rateLimiter from "express-rate-limit";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many request",
});

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(limiter);

//routes
app.use("/api/v1", router);

//error handler middleware
app.use(notFound);
app.use(genericErrorHandler);

//server start
app.listen(config.port, () => {
  console.log(`Server listening at port: ${config.port}`);
});
