import { Request, Response } from "express";

const compile = async (req: Request, res: Response) => {
  return res.status(200).send("Compiled!");
};

export { compile };
