import { ITestCase } from "../interfaces/testcase.interface";

export const testCasesUtils = {
  input: (testcases: ITestCase[]) =>
    testcases.map((testcase) => testcase.input),
  output: (testcases: ITestCase[]) =>
    testcases.map((testcase) => testcase.output),
};
