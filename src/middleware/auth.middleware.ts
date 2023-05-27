import { Request, Response, NextFunction } from "express";
import { IJwt, RequestWithUser } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = <IJwt>jwt.verify(token, process.env.JWT_SECRET as string);
      (req as RequestWithUser).user = decoded;
      if (decoded.role !== "user") {
        return res.status(401).json({ message: "UNAUTHORIZED" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "UNAUTHORIZED" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "UNAUTHORIZED" });
  }
};
