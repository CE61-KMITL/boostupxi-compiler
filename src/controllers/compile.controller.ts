import { Request, Response } from "express";
import strip from "strip-comments";
import { RequestWithUser } from "../interfaces/auth.interface";
import { taskService } from "../services/task.service";
import { compilerService } from "../services/compiler.service";
import { resultService } from "../services/result.service";

const compile = async (req: Request, res: Response) => {
  try {
    const sourceCode = strip(req.body.sourceCode);

    const testcases = await taskService.getTestCases(
      req.body.questionId,
      (req as RequestWithUser).user.token
    );

    if (!testcases) {
      return res.status(404).send("Question not found!");
    }

    const status = await resultService.checkResult(sourceCode, testcases);

    return res.status(200).json({
      status
    });

    // compilerService.create(
    //   sourceCode,
    //   `${process.pid}`,
    //   (createError, filePath) => {
    //     if (createError) {
    //       return res.status(500).json({
    //         message: "INTERNAL_SERVER_ERROR",
    //       });
    //     }

    //     console.log(filePath);

    //     compilerService.compile(
    //       filePath as string,
    //       (compileError, compiledFilePath) => {
    //         if (compileError) {
    //           return res.status(500).json({
    //             message: "INTERNAL_SERVER_ERROR",
    //           });
    //         }
    //         console.log(compileError, compiledFilePath);
    //         return res.status(200).send("Compiled!");
    //       }
    //     );
    //   }
    // );
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export { compile };
