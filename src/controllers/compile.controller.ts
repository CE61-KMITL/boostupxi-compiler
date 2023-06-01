import { Request, Response } from "express";
import strip from "strip-comments";
import { RequestWithUser } from "../interfaces/auth.interface";
import { taskService } from "../services/task.service";
import { resultService } from "../services/result.service";
import tress from "tress";
import { submissionService } from "../services/submission.service";

const queue = tress((req: any, next: any) => {
  try {
    compile(req.body, (req as RequestWithUser).user.token).then(() => next());
  } catch (error) {
    console.log((error as Error).message);
  }
});

const add_request_to_queue = async (req: Request, res: Response) => {
  try {
    queue.push(req as any);
    res.status(200).json({
      message: "REQUEST_ADDED_TO_QUEUE",
    });
  } catch (error) {
    res.status(304).json({
      message: "FAILED_TO_ADD_REQUEST",
    });
  }
};

const compile = async (
  { sourceCode, questionId }: { sourceCode: string; questionId: string },
  token: string
) => {
  try {
    const updatedSourceCode = strip(sourceCode);

    const testcases = await taskService.getTestCases(questionId, token);

    const status = await resultService.checkResult(
      updatedSourceCode,
      testcases
    );

    await submissionService.submit(
      {
        questionId,
        compilationResult: status.result,
      },
      token
    );
  } catch (error) {
    console.log((error as Error).message);
  }
};

export { add_request_to_queue };
