import fs from "fs";
import path from "path";
import { execSync, execFile } from "child_process";
import { addBanned } from "../utils/banned.util";
import {
  ExecutionResult,
  ICreateFile,
  ICompileFile,
} from "../interfaces/compiler.interface";
import { testCasesUtils } from "../utils/testcase.util";

export const compilerService = {
  createFile: async (
    sourceCode: string,
    fileName: string
  ): Promise<ICreateFile> => {
    try {
      const updatedSourceCode = addBanned(sourceCode);

      if (
        updatedSourceCode.includes("_IS_A_BANNED_LIBRARY") &&
        !updatedSourceCode.includes("SYSTEM")
      ) {
        return { result: "L", filePath: "" };
      }

      if (updatedSourceCode.includes("SYSTEM_IS_A_BANNED_LIBRARY")) {
        return { result: "H", filePath: "" };
      }

      const folderPath = path.resolve(__dirname, "../../temp/cpp");
      const filePath = path.resolve(folderPath, `${fileName}.cpp`);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      fs.writeFileSync(filePath, updatedSourceCode);
      return { result: "", filePath };
    } catch (error) {
      console.log(error);
      return { result: "C", filePath: "" };
    }
  },
  compileFile: async (filePath: string): Promise<ICompileFile> => {
    try {
      const regex = /([^\\/:*?"<>|\r\n]+)\.\w+$/;
      const filenameMatch = filePath.match(regex);
      const filename = filenameMatch ? filenameMatch[1] : null;

      if (!filename) {
        throw new Error("INVALID_FILEPATH");
      }

      const exeFolderPath = "./temp/exe";
      if (!fs.existsSync(exeFolderPath)) {
        fs.mkdirSync(exeFolderPath, { recursive: true });
      }

      const executablePath = path.join(exeFolderPath, filename);
      execSync(`g++ -w -std=c++14 ${filePath} -o ${executablePath}`);
      return { result: "", executablePath: executablePath };
    } catch (error: any) {
      if (error.message.includes("_IS_A_BANNED_FUNCTION")) {
        return { result: "F", executablePath: "" };
      }
      return { result: "S", executablePath: "" };
    }
  },
  run: async (
    executablePath: string,
    input: string
  ): Promise<ExecutionResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          timeout: 1000,
          maxBuffer: 1024 * 1024,
        };

        const child = await execFile(
          executablePath,
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
        console.log(error);
      }
    });
  },
  generateResultString: (
    expectedOutputs: string[],
    executionResults: ExecutionResult[]
  ) => {
    let result = "";

    executionResults.forEach((executionResult, index) => {
      const expectedOutput = expectedOutputs[index];
      if (
        testCasesUtils.checkOutputEquality(
          expectedOutput,
          executionResult.result
        )
      ) {
        result += "P";
      } else {
        if (executionResult.result === "TIMEOUT") {
          result += "T";
        } else if (executionResult.result === "RUNTIME_ERROR") {
          result += "R";
        } else if (executionResult.result === "OUT_OF_BUFFER") {
          result += "O";
        } else if (executionResult.result === "ERROR") {
          result += "E";
        } else {
          result += "-";
        }
      }
    });

    return result;
  },
};
