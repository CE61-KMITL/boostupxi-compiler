import { Request, Response } from "express";
import strip from "strip-comments";

const compile = async (req: Request, res: Response) => {
  const sourceCode = strip(req.body.sourceCode);
  console.log(sourceCode);
  return res.status(200).send("Compiled!");
};

export { compile };
