import { Request, Response } from "express";
import strip from "strip-comments";
import { RequestWithUser } from "../interfaces/auth.interface";
import { taskService } from "../services/task.service";
import { compilerService } from "../services/compiler.service";

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

    compilerService.create(sourceCode, `${process.pid}`, (error, filePath) => {
      if (error) {
        return res.status(500).json({
          message: "INTERNAL_SERVER_ERROR",
        });
      }
      console.log(error, filePath);
      return res.status(200).send("Compiled!");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export { compile };
