import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { mkdir, appendFile } from "fs/promises";
import { existsSync } from "fs";

const logEvents = async (message: string, filename: string) => {
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logItem = `${date}\t${uuidv4()}\t${message}\n`;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const logFilePath = join(__dirname, "../../logs");
  const logFileName = join(logFilePath, filename);

  try {
    if (!existsSync(logFileName)) {
      await mkdir(logFilePath);
    }

    await appendFile(logFileName, logItem);
  } catch (err) {
    throw new Error("Error writing to log file");
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, ip } = req;
  const userAgent = req.headers["user-agent"];

  res.on("finish", () => {
    const contentLength = res.get("content-length");
    const { statusCode } = res;

    const logMessage = `${method}\t${originalUrl}\t${statusCode}\t${contentLength}\t${userAgent}\t${ip}`;
    logEvents(logMessage, "reqLog.log");
  });
  next();
};
