import express, { Application, Request } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import os from "os";
import cluster from "cluster";

import { baseRouter } from "./routes/base.route";
import { compileRouter } from "./routes/compile.route";
import { corsOptions } from "./config/corsOptions";
import { logger } from "./middlewares/logger.middleware";
import { environment } from "./config/environment";

config();

const app: Application = express();
const coreTotal: number = 4;

app.use(logger);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors<Request>(corsOptions));
app.use(helmet());

app.use("/", baseRouter);
app.use("/compile", compileRouter);

if (cluster.isPrimary) {
  for (let i = 0; i < coreTotal; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const startServer = () => {
    app.listen(environment.PORT, () =>
      console.log(`Server running on port ${environment.PORT}🚀`)
    );
  };

  startServer();
}
