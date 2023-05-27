import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";

const compile = async (req: Request, res: Response) => {
  console.log((req as RequestWithUser).user);
  return res.status(200).send("Compiled!");
};

export { compile };
