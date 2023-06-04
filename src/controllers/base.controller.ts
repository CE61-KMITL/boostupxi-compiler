import { Request, Response } from "express";

export const getHello = async (req: Request, res: Response) => {
  res
    .status(200)
    .send("This is a compiler of grader website for CE Boostup XI.");
};
