import { z } from "zod";

export const compileSchema = z.object({
  body: z.object({
    questionId: z.string({ required_error: "QuestionID is required" }).nonempty(),
    sourceCode: z.string({ required_error: "SourceCode is required" }).nonempty(),
  }),
});
