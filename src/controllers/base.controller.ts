import { Request, Response } from "express";

const getHello = async (req: Request, res: Response) => {
  return res
    .status(200)
    .send("This is a compiler of grader website for CE Boostup XI.");
};

export { getHello };
