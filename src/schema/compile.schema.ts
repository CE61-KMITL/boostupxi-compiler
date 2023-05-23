import { z } from "zod";

export const compileSchema = z.object({
  body: z.object({
    questionId: z.string({ required_error: "QuestionID is required" }).uuid(),
    sourceCode: z.string({ required_error: "SourceCode is required" }),
  }),
});
