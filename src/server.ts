import express, { Application, Request } from "express";
import { config } from "dotenv";
import cors from "cors";

import { baseRouter } from "./routes/base.route";
import { compileRouter } from "./routes/compile.route";

import { corsOptions } from "./config/corsOptions";
import { logger } from "./middleware/logger.middleware";

config();

const app: Application = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors<Request>(corsOptions));

app.use("/", baseRouter);
app.use("/compile", compileRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}🚀`)
);
