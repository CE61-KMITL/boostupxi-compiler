import express, { Application, Request } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import os from "os";
import cluster from "cluster";

import { baseRouter } from "./routes/base.route";
import { compileRouter } from "./routes/compile.route";
import { corsOptions } from "./config/corsOptions";
import { environment } from "./config/environment";

config();

const app: Application = express();
const coreTotal: number = os.cpus().length;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors<Request>(corsOptions));
app.use(helmet());

app.use("/", baseRouter);
app.use("/compile", compileRouter);

const errorHandler = async (err: any, req: Request, res: any, next: any) => {
  console.log(err);

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
  });
  next();
};

app.use(errorHandler);

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
