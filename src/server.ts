import express, { Application, Request } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { baseRouter } from "./routes/base.route";
import { compileRouter } from "./routes/compile.route";
import { corsOptions } from "./config/corsOptions";
import { logger } from "./middlewares/logger.middleware";
import { environment } from "./config/environment";

config();

const app: Application = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors<Request>(corsOptions));
app.use(helmet());

app.use("/", baseRouter);
app.use("/compile", compileRouter);

app.listen(environment.PORT, () =>
  console.log(`Server running on port ${environment.PORT}🚀`)
);
