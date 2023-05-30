import { Request, Response } from "express";
import strip from "strip-comments";
import { RequestWithUser } from "../interfaces/auth.interface";
import { taskService } from "../services/task.service";
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
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

export { compile };
