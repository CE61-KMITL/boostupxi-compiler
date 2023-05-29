import fs from "fs";
import path from "path";
import { execSync, execFile } from "child_process";
import { fileURLToPath } from "url";
import { addBanned } from "../utils/banned.util";

interface ExecutionResult {
  result: string;
}

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
  run: async (filepath: string, input: string): Promise<ExecutionResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          timeout: 1000,
          maxBuffer: 1024 * 1024,
        };

        const child = await execFile(
          filepath,
          options,
          (error, stdout, stderr) => {
            if (error) {
              if (error.signal && error.signal === "SIGTERM") {
                resolve({
                  result: "TIMEOUT",
                });
              } else if (
                error.code &&
                error.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
              ) {
                resolve({
                  result: "OUT_OF_BUFFER",
                });
              } else {
                resolve({
                  result: "RUNTIME_ERROR",
                });
              }
            } else if (stderr) {
              resolve({
                result: "FAILED",
              });
            } else {
              resolve({
                result: stdout,
              });
              return;
            }
          }
        );
        if (input !== "") {
          child.stdin?.pipe(child.stdin);
          child.stdin?.setDefaultEncoding("utf-8");
          child.stdin?.write(input);
          child.stdin?.end();
          child.stdin?.on("error", (error: Error) => {
            if (error.message !== "write") {
              resolve({ result: "ERROR" });
            }
          });
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    });
  },
  checkOutputEquality: (userOutput: string, testcaseOutput: string) => {
    try {
      const userLines = userOutput.trim().split(/\r?\n/);
      const testcaseLines = testcaseOutput.trim().split(/\r?\n/);
  
      if (userLines.length !== testcaseLines.length) {
        return false;
      }
  
      for (let i = 0; i < userLines.length; i++) {
        if (userLines[i].trim() !== testcaseLines[i].trim()) {
          return false;
        }
      }
  
      return true;
    } catch (error) {
      return false;
    }
  },
};
