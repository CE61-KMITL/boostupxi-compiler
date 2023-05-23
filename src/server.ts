import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";

import { baseRouter } from "./routes/base.route.js";
import { compileRouter } from "./routes/compile.route.js";

config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/", baseRouter);
app.use('/compile', compileRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}🚀`)
);
