import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "./config";
import router from "./routes/index.routes";
const app = express();

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

//routes
app.use(router);
//server start
app.listen(config.port, () => {
  console.log(`Server listening at port: ${config.port}`);
});
