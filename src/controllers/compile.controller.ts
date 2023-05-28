import { Request, Response } from "express";
import strip from "strip-comments";
import { RequestWithUser } from "../interfaces/auth.interface";

const compile = async (req: Request, res: Response) => {
  const sourceCode = strip(req.body.sourceCode);
  console.log((req as RequestWithUser).user);
  return res.status(200).send("Compiled!");
};

export { compile };
