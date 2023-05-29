import { ITestCase } from "../interfaces/testcase.interface";
import { compilerService } from "./compiler.service";
import { testCasesUtils } from "../utils/testcase.util";

export const resultService = {
  checkResult: async (sourceCode: string, testcases: ITestCase[]) => {
    let result = "";
    const index = 0;
    let status = 2;

    return new Promise(async (resolve, reject) => {
      try {
        await compilerService.create(
          sourceCode,
          `${process.pid}`,
          async (createError, filePath) => {
            if (createError) {
              result = "C";
              status = 1;
              if (createError.toString().includes("_IS_A_BANNED_LIBRARY")) {
                result = "L";
              }

              if (
                createError.toString().includes("SYSTEM_IS_A_BANNED_LIBRARY")
              ) {
                result = "H";
              }
              resolve({
                result,
                status,
              });
              return;
            }

            await compilerService.compile(
              filePath as string,
              async (compileError, filePath) => {
                if (compileError) {
                  result = "S";
                  status = 1;

                  if (
                    compileError.toString().includes("_IS_A_BANNED_FUNCTION")
                  ) {
                    result = "F";
                  }

                  resolve({
                    result,
                    status,
                  });
                }

                const inputs = testCasesUtils.input(testcases);
                const outputs = testCasesUtils.output(testcases);

                if (inputs.length !== outputs.length) {
                  result = "W";
                  resolve({
                    result,
                    status: 1,
                  });
                  return;
                }

                const outputsResult = inputs.map(
                  async (input: string) => {
                    return await compilerService.run(filePath as string, input);
                  }
                );

                const results = await Promise.all(outputsResult);

                console.log(results);

              }
            );
          }
        );
      } catch (error) {
        resolve({
          result: "Y",
          status: 0,
        });
      }
    });
  },
};
