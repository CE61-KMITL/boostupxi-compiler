import { ITestCase } from "../interfaces/testcase.interface";
import { compilerService } from "./compiler.service";
import { testCasesUtils } from "../utils/testcase.util";

export const resultService = {
  checkResult: async (sourceCode: string, testcases: ITestCase[]) => {
    try {
      const { result: createFileResult, filePath } =
        await compilerService.createFile(sourceCode, `${process.pid}`);

      if (createFileResult !== "") {
        return { result: createFileResult };
      }

      const { result: compileFileResult, executablePath } =
        await compilerService.compileFile(filePath);

      if (compileFileResult !== "") {
        return { result: compileFileResult };
      }

      const inputs = testCasesUtils.input(testcases);
      const expectedOutputs = testCasesUtils.output(testcases);

      if (inputs.length !== expectedOutputs.length) {
        return { result: "W" };
      }

      const executionResults = await Promise.all(
        inputs.map(async (input: string) => {
          return await compilerService.run(executablePath, input);
        })
      );

      const result = await compilerService.generateResultString(
        expectedOutputs,
        executionResults
      );
      return { result };
    } catch (error) {
      return { result: "Y" };
    }
  },
};
