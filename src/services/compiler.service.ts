import fs from "fs";
import path from "path";
import { execFile, execSync } from "child_process";
import { fileURLToPath } from "url";
import { addBanned } from "../utils/banned.util";

export const compilerService = {
  create: async (
    sourceCode: string,
    filename: string,
    callback: (args1: Error | null | string, args2: string | null) => void
  ) => {
    try {
      const currentDirname = fileURLToPath(import.meta.url);
      const folderPath = path.resolve(currentDirname, "../../../temp/cpp");
      const filePath = path.resolve(folderPath, `${filename}.cpp`);

      const [status, updatedSourceCode] = addBanned(sourceCode);

      if (status === -1) {
        callback(updatedSourceCode as string, null);
        return;
      }

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      fs.writeFileSync(filePath, updatedSourceCode as string);
      callback(null, filePath);
    } catch (error: Error | any) {
      callback(error, null);
    }
  },
  compile: async (
    filepath: string,
    callback: (args1: Error | null | string, args2: string | null) => void
  ) => {
    try {
      const regex = /([^\\/:*?"<>|\r\n]+)\.\w+$/;
      const filenameMatch = filepath.match(regex);
      const filename = filenameMatch ? filenameMatch[1] : null;

      if (!filename) {
        throw new Error("INVALID_FILEPATH");
      }
      if (!fs.existsSync("./temp/exe")) {
        fs.mkdirSync("./temp/exe", { recursive: true });
      }

      execSync(`g++ -w -std=c++14 ${filepath} -o ./temp/exe/${filename}`);
      callback(null, `./temp/exe/${filename}`);
    } catch (error: Error | any) {
      callback(error instanceof Error ? error.message : error, null);
    }
  },
  run: (filepath: string, input: string[]) => {},
  checkAnswer: (userOutout: string[], testcaseOutput: string[]) => {},
};
