export type ExecutionResult =
  | { result: "TIMEOUT" }
  | { result: "OUT_OF_BUFFER" }
  | { result: "RUNTIME_ERROR" }
  | { result: "FAILED" }
  | { result: string };

export interface ICreateFile {
  result: string;
  filePath: string;
}

export interface ICompileFile {
  result: string;
  executablePath: string;
}
