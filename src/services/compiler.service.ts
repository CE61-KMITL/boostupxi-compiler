import fs from "fs";
import path from "path";
import { exec, execFile } from "child_process";
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
      const folderPath = path.resolve(currentDirname, "../../../temp");
      const filePath = path.resolve(folderPath, `${filename}.cpp`);

      const [status, updatedSourceCode] = addBanned(sourceCode);

      if (status === -1) {
        callback(updatedSourceCode as string, null);
        return;
      }

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      fs.writeFileSync(filePath, updatedSourceCode as string);  
      callback(null, filePath);
    } catch (error: Error | any) {
      callback(error, null);
    }
  },
  compile: async (filepath: string, callback: () => void) => {},
  run: (filepath: string, input: string[]) => {},
  checkAnswer: (userOutout: string[], testcaseOutput: string[]) => {},
};
